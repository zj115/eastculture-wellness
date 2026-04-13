// src/pages/GuaShaPage.jsx
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// The full course is one single video file
const FULL_VIDEO_KEY = "FacialGuaSha/guasha-course.mp4";

const LESSONS = [
    {
        id: 1,
        titleEn: "Beginner Foundation Class",
        desc: "Master core Gua Sha logic, tools, pressure, and safety rules. ZERO experience → FULL confidence in 10 minutes.",
        timestamp: null,
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 2,
        titleEn: "Forehead Lines",
        desc: "Smooth horizontal wrinkles, tighten forehead skin, erase the \"aged forehead\" look.",
        timestamp: "02：34",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 3,
        titleEn: "11s / Glabellar Lines",
        desc: "Release tension between brows, fade vertical frown lines, remove angry/tired appearance.",
        timestamp: "16：00",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 4,
        titleEn: "Under-Eye Bags",
        desc: "Drain puffiness, tighten loose skin, shrink bulging bags — eyes look awake and lifted.",
        timestamp: "26：40",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 5,
        titleEn: "Dark Circles",
        desc: "Boost circulation, brighten under-eyes, eliminate \"panda eyes\" from stress & late nights.",
        timestamp: "39：07",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 6,
        titleEn: "Crow's Feet",
        desc: "Smooth fine lines at the corners, firm delicate eye area, slow aging around eyes.",
        timestamp: "52：11",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 7,
        titleEn: "Tear Troughs",
        desc: "Plump sunken hollows naturally, reduce tired look, restore youthful fullness.",
        timestamp: "1：02：07",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 8,
        titleEn: "Nasolabial Folds",
        desc: "Lift cheeks, soften deep smile lines, reverse the #1 sign of facial aging.",
        timestamp: "1：12：47",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 9,
        titleEn: "Sunken Mid-Face / Nasal Base",
        desc: "Lift and plump flat mid-face, create natural volume, improve \"sunken\" appearance.",
        timestamp: "1：26：07",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 10,
        titleEn: "Droopy Cheekbones",
        desc: "Lift fallen cheekbones, restore apple fullness, reverse sagging at the source.",
        timestamp: "1：36：08",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 11,
        titleEn: "Full-Face Sagging",
        desc: "Total facial lifting routine — re-tighten skin, redefine contour, reverse full-face collapse.",
        timestamp: "1：45：43",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 12,
        titleEn: "Fine Lines Around Mouth",
        desc: "Smooth dry lines, moisturize lip area, erase \"smoker's lines\" & aging mouth texture.",
        timestamp: "1：57：00",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 13,
        titleEn: "Downturned Mouth Corners",
        desc: "Lift sad, downturned lips, create a gentle, youthful, friendly expression.",
        timestamp: "2：06：44",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 14,
        titleEn: "Blurred Jawline & Double Chin",
        desc: "Sculpt a sharp jawline, reduce fat pad, eliminate puffiness — face looks SLIMMER instantly.",
        timestamp: "2：14：57",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 15,
        titleEn: "Dark Spots & Acne Scars",
        desc: "Fade melasma, sun spots, and post-acne marks — reveal clear, bright, even skin.",
        timestamp: "2：23：17",
        s3Key: FULL_VIDEO_KEY,
    },
    {
        id: 16,
        titleEn: "Facial Puffiness & Bloating",
        desc: "Drain excess fluid, de-puff quickly, get a tight, lifted, V-shape face in minutes.",
        timestamp: "2：34：27",
        s3Key: FULL_VIDEO_KEY,
    },
];

const PAIN_POINTS = [
    "Wrinkles are taking over: forehead lines, 11s, crow's feet, nasolabial folds, mouth wrinkles — getting deeper by the month",
    "Eye area collapsed: puffy bags, dark circles, sunken tear troughs — you look tired, old, and worn-out",
    "Mid-face flattened & sagging: cheekbones dropped, smile lines deepened, mouth corners turned down — sad, bitter, aged look",
    "Jawline gone: double chin, puffy face, undefined contour — you look bigger, older, less photogenic",
    "Skin dull & muddy: melasma, sun spots, acne scars, yellow tone — expensive creams do NOTHING",
    "Skincare not absorbing: products sit on top, waste money, no glow, no lift, no real change",
    "Scared of needles & fillers: pain, risk, lumps, rebound, huge cost, unnatural look",
    "Tired of salon scams: temporary results, pushy sales, monthly bills, zero long-term fix",
    "Sensitive skin: redness, itching, broken capillaries — you can't use harsh treatments",
];

const WHY_POINTS = [
    {
        title: "100% Natural, Safe, No Risk",
        desc: "No needles, no lasers, no downtime, no scarring — safe for sensitive skin & pregnancy.",
    },
    {
        title: "Targeted, Step-by-Step, No Guesswork",
        desc: "Each lesson fixes one specific issue. You see results FAST — no random techniques.",
    },
    {
        title: "Just 5 Minutes a Day",
        desc: "Do it while you wash your face. Fits into any busy lifestyle.",
    },
    {
        title: "INSTANT + LONG-TERM Results",
        desc: "After one session: less puffiness, brighter skin, tighter face. After 28 days: wrinkles softer, sagging lifted, skin glowing.",
    },
    {
        title: "Save THOUSANDS on Facials & Fillers",
        desc: "One purchase = lifelong beauty tool. No subscriptions, no repeat costs.",
    },
    {
        title: "For EVERYONE — Men & Women, All Ages",
        desc: "Office workers, moms, seniors, students — anyone can learn, anyone can benefit.",
    },
    {
        title: "Fixes Skin FROM THE INSIDE",
        desc: "Boost circulation, release tension, clear blockages. This is not \"surface beauty\" — this is real anti-aging.",
    },
];

const WHO_POINTS = [
    "You look tired even when you're not",
    "You hate your deepening wrinkles & sagging",
    "You want a slimmer face, sharper jawline",
    "You spend money on skincare with NO real results",
    "You fear needles, fillers, and cosmetic procedures",
    "You want safe, natural, long-lasting anti-aging",
    "You want to look younger — WITHOUT expensive treatments",
];

// Price placeholder — not final
const PRICE_NOW = "NZD 99";
const PRICE_OLD = "NZD 149";

export default function GuaShaPage({
    onBack,
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const canPlay = isOwned;

    const fetchSignedUrl = async () => {
        setLoading(true);
        setError("");
        setVideoUrl("");
        try {
            const token = localStorage.getItem("ec_token");
            const res = await fetch(
                `${API_BASE}/api/video-url?key=${encodeURIComponent(FULL_VIDEO_KEY)}`,
                {
                    cache: "no-store",
                    credentials: "include",
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data?.error || "Failed to load video URL");
                return;
            }
            if (!data?.url || !data.url.startsWith("https://")) {
                setError("Backend returned no usable url");
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError("Network error: cannot reach backend");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!canPlay) {
            setVideoUrl("");
            setError("");
            setLoading(false);
            return;
        }
        fetchSignedUrl();
    }, [canPlay]);

    function handleUnlockCourse() {
        if (!isLoggedIn) {
            onGoLogin?.();
            return;
        }
        onPurchase?.("course", { courseId: "guasha" });
    }

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-6xl px-4 pb-20">

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="pt-8 md:pt-14"
                >
                    <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-start">
                        {/* Left: locked video block or live player */}
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-sm">
                            {canPlay ? (
                                <div className="relative">
                                    {loading && (
                                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                                            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                                                Loading...
                                            </div>
                                        </div>
                                    )}
                                    {error && !loading && (
                                        <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                            <div className="max-w-md">
                                                <p className="text-lg font-semibold">Playback error</p>
                                                <p className="mt-2 text-sm text-white/80">{error}</p>
                                                <button
                                                    onClick={fetchSignedUrl}
                                                    className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {!error && !loading && videoUrl && (
                                        <video
                                            controls
                                            playsInline
                                            preload="metadata"
                                            crossOrigin="anonymous"
                                            className="h-full w-full"
                                        >
                                            <source src={videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {!error && !loading && !videoUrl && (
                                        <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                            <p className="text-sm text-white/80">Loading course video…</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                    <div className="max-w-sm space-y-3">
                                        <p className="text-3xl">🔒</p>
                                        <p className="text-lg font-semibold">Course Locked</p>
                                        <p className="text-sm text-white/70">
                                            Purchase the full course to unlock this video.
                                        </p>
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Get Full Course — {PRICE_NOW}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: headline + CTA */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">
                                    Sale
                                </span>
                                <span className="text-[11px] uppercase tracking-widest text-slate-500">
                                    VIDEO COURSE · 16 LESSONS
                                </span>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-widest text-rose-600 mb-1">
                                    No Surgery • No Needles • No Skincare Scams • Just 5 Minutes a Day at Home
                                </p>
                                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900">
                                    16 Facial Aging Issues SOLVED! Expensive Facials &amp; Injections Not Working?
                                </h1>
                                <p className="mt-2 text-base md:text-lg font-medium text-slate-700">
                                    Gua Sha Naturally Fades Wrinkles, Lifts Sagging, Brightens Skin — AT HOME.
                                </p>
                            </div>

                            {/* Price — placeholder, not final */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-slate-900">{PRICE_NOW}</span>
                                <span className="text-sm text-slate-400 line-through">{PRICE_OLD}</span>
                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">On Sale</span>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 space-y-1">
                                <div>• 16 lessons covering every major facial aging issue</div>
                                <div>• One full-length course video with timestamps for each section</div>
                                <div>• Lifetime access — watch anytime, anywhere</div>
                                <div>• Safe for sensitive skin & pregnancy</div>
                            </div>

                            {isOwned ? (
                                <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                                    ✓ Full Course Unlocked — video is playing above
                                </div>
                            ) : (
                                <button
                                    onClick={handleUnlockCourse}
                                    className="w-full rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition"
                                >
                                    Get Full Course — {PRICE_NOW}
                                </button>
                            )}

                            {!isLoggedIn && (
                                <p className="text-xs text-amber-700">Please sign in to purchase and watch.</p>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* ── PAIN POINTS ──────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-16"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                        The Aging Nightmare You're Living Every Day
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {PAIN_POINTS.map((pt, i) => {
                            const colon = pt.indexOf(":");
                            const label = colon !== -1 ? pt.slice(0, colon) : pt;
                            const rest = colon !== -1 ? pt.slice(colon + 1).trim() : "";
                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                                    {rest && <p className="mt-1 text-xs text-slate-600">{rest}</p>}
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* ── 16-STEP TRANSFORMATION ───────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-16"
                >
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                            YOUR FULL 16-STEP TRANSFORMATION
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Structured exactly as your course lessons — professional, clear, powerful
                        </p>
                    </div>

                    <div className="space-y-3">
                        {LESSONS.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                    {lesson.id}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-semibold text-slate-900">{lesson.titleEn}</p>
                                        {lesson.timestamp && (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 font-mono shrink-0">
                                                （{lesson.timestamp}）
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-600">{lesson.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ── WHY THIS COURSE ───────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-16"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                        WHY THIS COURSE BEATS EVERY OTHER TREATMENT
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {WHY_POINTS.map((pt, i) => (
                            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-1">
                                <p className="text-sm font-semibold text-slate-900">✅ {pt.title}</p>
                                <p className="text-xs text-slate-600">{pt.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ── WHO NEEDS THIS ────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-16"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                        WHO NEEDS THIS COURSE?
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {WHO_POINTS.map((pt, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <span className="text-emerald-500 shrink-0 font-bold">✅</span>
                                <p className="text-sm text-slate-700">{pt}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ── CLOSING CTA ───────────────────────────────────────────── */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-16"
                >
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm space-y-4">
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            You don't need expensive facials.<br />
                            You don't need risky injections.<br />
                            You don't need endless skincare products.
                        </p>
                        <p className="text-base md:text-lg font-semibold text-slate-900">
                            You just need the RIGHT GUA SHA METHOD — targeted, gentle, and proven.
                        </p>
                        <p className="text-sm text-slate-600">
                            In 5 minutes a day, you can:<br />
                            <span className="font-medium">Lift sagging • Fade wrinkles • Slim face • Brighten skin • Erase dark spots • Look 5–10 years younger.</span>
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            This course is your at-home beauty clinic — forever.
                        </p>

                        {!isOwned && (
                            <button
                                onClick={handleUnlockCourse}
                                className="mt-2 inline-block rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 transition"
                            >
                                Get Full Course — {PRICE_NOW}
                                <span className="ml-2 text-slate-400 line-through text-xs">{PRICE_OLD}</span>
                            </button>
                        )}

                        {isOwned && (
                            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                                ✓ You own this course — scroll up to watch
                            </div>
                        )}

                        <p className="text-[11px] text-slate-400">
                            Disclaimer: This program is for wellness purposes only and is not medical advice.
                        </p>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
