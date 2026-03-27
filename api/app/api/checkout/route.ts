import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getUserFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// Course/product definitions - prices in NZD cents
const PRODUCTS = {
  // Individual video - 10 NZD each
  video: {
    price: 1000, // 10.00 NZD in cents
    name: (videoTitle: string) => `EastCulture - ${videoTitle}`,
  },
  // Course series
  courses: {
    faceyoga: {
      price: 14900, // 149 NZD
      name: "Face Yoga & Facial Massage Masterclass",
      nameZh: "面部瑜伽与按摩大师课",
    },
    taichi: {
      price: 3000, // 30 NZD per series (as specified)
      name: "Tai Chi System Course Series",
      nameZh: "太极系统课程",
    },
    qigong: {
      price: 9900, // 99 NZD
      name: "Acupressure Masterclass",
      nameZh: "穴位疗程大师课",
    },
  },
  // Membership - 29 NZD/month (as shown on website)
  membership: {
    price: 2900, // 29 NZD per month
    name: "EastCulture All-Access Membership",
    nameZh: "全站会员",
  },
} as const;

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const body = await req.json();
    const { type, courseId, videoKey, videoTitle, lang } = body;

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_FRONTEND_URL || "https://eastculture.vercel.app";

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, string> = {
      userId: user.id,
      type,
    };

    if (type === "video") {
      if (!videoKey || !videoTitle) {
        return NextResponse.json({ error: "Missing video info" }, { status: 400 });
      }
      lineItems = [
        {
          price_data: {
            currency: "nzd",
            product_data: { name: PRODUCTS.video.name(videoTitle) },
            unit_amount: PRODUCTS.video.price,
          },
          quantity: 1,
        },
      ];
      metadata.videoKey = videoKey;
      // Derive courseId from videoKey prefix
      metadata.courseId = courseId || videoKey.split("/")[0];
    } else if (type === "course") {
      const course = PRODUCTS.courses[courseId as keyof typeof PRODUCTS.courses];
      if (!course) {
        return NextResponse.json({ error: "Unknown course" }, { status: 400 });
      }
      const productName = lang === "zh" ? course.nameZh : course.name;
      lineItems = [
        {
          price_data: {
            currency: "nzd",
            product_data: { name: productName },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ];
      metadata.courseId = courseId;
    } else if (type === "membership") {
      const productName = lang === "zh" ? PRODUCTS.membership.nameZh : PRODUCTS.membership.name;
      lineItems = [
        {
          price_data: {
            currency: "nzd",
            product_data: { name: productName },
            unit_amount: PRODUCTS.membership.price,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        },
      ] as Stripe.Checkout.SessionCreateParams.LineItem[];
    } else {
      return NextResponse.json({ error: "Invalid purchase type" }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const mode = type === "membership" ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      customer_email: user.email,
      metadata,
      payment_method_types: ["card"],
      locale: lang === "zh" ? "zh" : "en",
    });

    // Create pending order record
    const amountNzd =
      type === "video"
        ? 10
        : type === "course"
        ? (PRODUCTS.courses[courseId as keyof typeof PRODUCTS.courses]?.price ?? 0) / 100
        : 29;

    await supabaseAdmin.from("orders").insert({
      user_id: user.id,
      stripe_session_id: session.id,
      amount_nzd: amountNzd,
      currency: "nzd",
      purchase_type: type,
      course_id: metadata.courseId || null,
      video_key: metadata.videoKey || null,
      status: "pending",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
