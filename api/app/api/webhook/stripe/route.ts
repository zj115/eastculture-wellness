import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

async function grantAccess(
  userId: string,
  orderId: string,
  type: "video" | "course" | "service",
  courseId?: string,
  videoKey?: string,
  serviceId?: string
) {
  await supabaseAdmin.from("user_purchases").insert({
    user_id: userId,
    order_id: orderId,
    purchase_type: type,
    course_id: courseId || null,
    video_key: videoKey || null,
    service_id: serviceId || null,
    status: "active",
    expires_at: null,
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata ?? {};
      const userId = metadata.userId;
      const type = metadata.type;

      if (!userId) {
        console.error("Webhook: missing userId in metadata");
        return NextResponse.json({ ok: true });
      }

      // Handle guest purchases (userId === "guest")
      if (userId === "guest") {
        // For guest service purchases, create order record with guest identifier
        const customerEmail = session.customer_details?.email || session.customer_email;
        const amount = session.amount_total ? session.amount_total / 100 : 0;

        const { data: guestOrder } = await supabaseAdmin
          .from("orders")
          .insert({
            user_id: null, // No user ID for guest purchases
            stripe_session_id: session.id,
            amount_nzd: amount,
            currency: session.currency || "usd",
            purchase_type: type as "video" | "course" | "membership" | "service",
            course_id: metadata.courseId || null,
            video_key: metadata.videoKey || null,
            status: "paid",
            paid_at: new Date().toISOString(),
            metadata: { guest_email: customerEmail },
          })
          .select("id")
          .single();

        console.log(`✅ Guest service purchase recorded: email=${customerEmail} session=${session.id} type=${type}`);
        return NextResponse.json({ ok: true });
      }

      // Update order status for logged-in users
      const { data: order } = await supabaseAdmin
        .from("orders")
        .update({ status: "paid", paid_at: new Date().toISOString() })
        .eq("stripe_session_id", session.id)
        .select("id")
        .single();

      if (!order) {
        console.error("Webhook: order not found for session", session.id);
        return NextResponse.json({ ok: true });
      }

      // Grant access for logged-in users
      await grantAccess(
        userId,
        order.id,
        type as "video" | "course" | "service",
        metadata.courseId,
        metadata.videoKey,
        metadata.serviceId
      );

      console.log(`✅ Access granted: user=${userId} type=${type} course=${metadata.courseId} video=${metadata.videoKey} service=${metadata.serviceId}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
