import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getUserFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// Course/product definitions - prices in USD cents
const PRODUCTS = {
  // Individual video - 29 USD each (default for most courses)
  video: {
    price: 2900, // 29.00 USD
    name: (videoTitle: string) => `EastCulture - ${videoTitle}`,
  },
  // 9.9 Quick Relief videos - special pricing
  jiujiuVideo: {
    price: 990, // 9.90 USD
    name: (videoTitle: string) => `EastCulture - ${videoTitle}`,
  },
  // Course series
  courses: {
    faceyoga: {
      price: 14900, // 149.00 USD
      name: "Face Yoga & Facial Massage Masterclass",
      nameZh: "面部瑜伽与按摩大师课",
    },
    taichi: {
      price: 2999, // 29.99 USD
      name: "Tai Chi System Course Series",
      nameZh: "太极系统课程",
    },
    qigong: {
      price: 17400, // 174.00 USD
      name: "Acupressure Masterclass",
      nameZh: "穴位疗程大师课",
    },
    wingchun: {
      price: 4998, // 49.98 USD
      name: "Wing Chun Foundations – Health & Self-Defense",
      nameZh: "咏春基础课：养生十式 + 防卫九式",
    },
    guasha: {
      price: 4500, // 45.00 USD
      name: "16 Facial Anti-Aging Gua Sha Course",
      nameZh: "16 节面部抗衰刮痧课程",
    },
    jiujiu: {
      price: 990, // 9.90 USD (per video, no full course option)
      name: "Quick Relief Self-Care Course",
      nameZh: "9.9 快速缓解课程",
    },
  },
  // Metaphysics / Taoist Folk Services - USD pricing
  services: {
    hehe: {
      price: 17600, // 176.00 USD
      name: "Relationship Harmony Adjustment",
      nameZh: "情缘磁场调和",
    },
    bucaiku: {
      price: 17600, // 176.00 USD
      name: "Wealth Treasury Restoration",
      nameZh: "修补先天禄库",
    },
    qimen: {
      price: 2900, // 29.00 USD
      name: "Qi Men Dun Jia Time-Space Reading",
      nameZh: "奇门遁甲时空推演",
    },
    huanyinzhai: {
      price: 44000, // 440.00 USD
      name: "Karmic Debt Clearance",
      nameZh: "清偿先天受生阴债",
    },
  },
} as const;

const STRIPE_LOCALES: Record<string, Stripe.Checkout.SessionCreateParams.Locale> = {
  en: "en",
  ja: "ja",
  ko: "ko",
  zh: "zh",
};

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    const body = await req.json();
    const { type, courseId, videoKey, videoTitle, serviceId, serviceTitle, lang, guestEmail } = body;

    // Allow guest checkout for services only, require login for courses/videos
    if (!user && type !== "service") {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_FRONTEND_URL || "https://wellnesseastern.com";

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let metadata: Record<string, string> = {
      userId: user?.id || "guest",
      type: type === "service" ? "course" : type,
    };

    if (type === "video") {
      if (!videoKey || !videoTitle) {
        return NextResponse.json({ error: "Missing video info" }, { status: 400 });
      }
      // Check if this is a 9.9 course video
      const isJiuJiuVideo = videoKey.startsWith("9.9/");
      const videoProduct = isJiuJiuVideo ? PRODUCTS.jiujiuVideo : PRODUCTS.video;

      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: { name: videoProduct.name(videoTitle) },
            unit_amount: videoProduct.price,
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
            currency: "usd",
            product_data: { name: productName },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ];
      metadata.courseId = courseId;
    } else if (type === "service") {
      const service = PRODUCTS.services[serviceId as keyof typeof PRODUCTS.services];
      if (!service) {
        return NextResponse.json({ error: "Unknown service" }, { status: 400 });
      }
      const productName = lang === "zh" ? service.nameZh : service.name;
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: service.price,
          },
          quantity: 1,
        },
      ];
      metadata.courseId = `service:${serviceId}`;
      metadata.catalogType = "service";
    } else {
      return NextResponse.json({ error: "Invalid purchase type" }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}?payment=success`,
      cancel_url: `${origin}?payment=cancelled`,
      metadata,
      payment_method_types: ["card"],
      locale: STRIPE_LOCALES[lang] ?? "auto",
    };

    // For logged-in users, use their email; for guests (services only), collect email at checkout
    if (user) {
      sessionParams.customer_email = user.email;
    } else {
      sessionParams.billing_address_collection = "required";
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Create pending order record only if user is logged in
    if (user) {
      const amount =
        type === "video"
          ? videoKey?.startsWith("9.9/") ? 9.9 : 29
          : type === "course"
          ? (PRODUCTS.courses[courseId as keyof typeof PRODUCTS.courses]?.price ?? 0) / 100
          : type === "service"
          ? (PRODUCTS.services[serviceId as keyof typeof PRODUCTS.services]?.price ?? 0) / 100
          : 0;

      const currency = "usd";
      const dbPurchaseType = metadata.type as "video" | "course" | "membership" | "service";

      await supabaseAdmin.from("orders").insert({
        user_id: user.id,
        stripe_session_id: session.id,
        amount_nzd: amount,
        currency: currency,
        purchase_type: dbPurchaseType,
        course_id: metadata.courseId || null,
        video_key: metadata.videoKey || null,
        status: "pending",
      });
    }
    // For guest purchases, order will be created by webhook when payment succeeds

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Checkout error:", msg);
    return NextResponse.json({ error: "Failed to create checkout", detail: msg }, { status: 500 });
  }
}
