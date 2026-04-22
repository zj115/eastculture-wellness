// src/pages/GuaShaPage.jsx
// 16 Facial Anti-Aging Gua Sha Course — single course, one video file

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─────────────────────────────────────────────
// COURSE META
// ─────────────────────────────────────────────
const COURSE = {
    titleEn: "16 Facial Anti-Aging Gua Sha",
    tagline: "No Surgery • No Needles • No Skincare Scams • Just 5 Minutes a Day at Home",
    priceNow: "$59.99",
    priceOld: "$99.99",
    sale: true,
    courseId: "guasha",
    // Single video — 16 chapters are timestamps within this one file
    s3Key: "FacialGuaSha/guasha-course.mp4",
    coverImage: "/images/guasha-face.jpg",
    fallbackImage: "/images/face-yoga-masterclass.jpg",
};

// ─────────────────────────────────────────────
// 16 CHAPTERS (timestamps inside one video)
// ─────────────────────────────────────────────
const CHAPTERS = [
    { id: 1,  titleEn: "Beginner Foundation Class",         desc: "Master core Gua Sha logic, tools, pressure, and safety rules. ZERO experience → FULL confidence in 10 minutes.",                                          timestamp: null },
    { id: 2,  titleEn: "Forehead Lines",                    desc: "Smooth horizontal wrinkles, tighten forehead skin, erase the \"aged forehead\" look.",                                                                    timestamp: "02：34" },
    { id: 3,  titleEn: "11s / Glabellar Lines",             desc: "Release tension between brows, fade vertical frown lines, remove angry/tired appearance.",                                                               timestamp: "16：00" },
    { id: 4,  titleEn: "Under-Eye Bags",                    desc: "Drain puffiness, tighten loose skin, shrink bulging bags — eyes look awake and lifted.",                                                                 timestamp: "26：40" },
    { id: 5,  titleEn: "Dark Circles",                      desc: "Boost circulation, brighten under-eyes, eliminate \"panda eyes\" from stress & late nights.",                                                            timestamp: "39：07" },
    { id: 6,  titleEn: "Crow's Feet",                       desc: "Smooth fine lines at the corners, firm delicate eye area, slow aging around eyes.",                                                                     timestamp: "52：11" },
    { id: 7,  titleEn: "Tear Troughs",                      desc: "Plump sunken hollows naturally, reduce tired look, restore youthful fullness.",                                                                         timestamp: "1：02：07" },
    { id: 8,  titleEn: "Nasolabial Folds",                  desc: "Lift cheeks, soften deep smile lines, reverse the #1 sign of facial aging.",                                                                           timestamp: "1：12：47" },
    { id: 9,  titleEn: "Sunken Mid-Face / Nasal Base",      desc: "Lift and plump flat mid-face, create natural volume, improve \"sunken\" appearance.",                                                                   timestamp: "1：26：07" },
    { id: 10, titleEn: "Droopy Cheekbones",                 desc: "Lift fallen cheekbones, restore apple fullness, reverse sagging at the source.",                                                                       timestamp: "1：36：08" },
    { id: 11, titleEn: "Full-Face Sagging",                 desc: "Total facial lifting routine — re-tighten skin, redefine contour, reverse full-face collapse.",                                                        timestamp: "1：45：43" },
    { id: 12, titleEn: "Fine Lines Around Mouth",           desc: "Smooth dry lines, moisturize lip area, erase \"smoker's lines\" & aging mouth texture.",                                                               timestamp: "1：57：00" },
    { id: 13, titleEn: "Downturned Mouth Corners",          desc: "Lift sad, downturned lips, create a gentle, youthful, friendly expression.",                                                                           timestamp: "2：06：44" },
    { id: 14, titleEn: "Blurred Jawline & Double Chin",     desc: "Sculpt a sharp jawline, reduce fat pad, eliminate puffiness — face looks SLIMMER instantly.",                                                         timestamp: "2：14：57" },
    { id: 15, titleEn: "Dark Spots & Acne Scars",           desc: "Fade melasma, sun spots, and post-acne marks — reveal clear, bright, even skin.",                                                                     timestamp: "2：23：17" },
    { id: 16, titleEn: "Facial Puffiness & Bloating",       desc: "Drain excess fluid, de-puff quickly, get a tight, lifted, V-shape face in minutes.",                                                                  timestamp: "2：34：27" },
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
    { title: "100% Natural, Safe, No Risk",          desc: "No needles, no lasers, no downtime, no scarring — safe for sensitive skin & pregnancy." },
    { title: "Targeted, Step-by-Step, No Guesswork", desc: "Each lesson fixes one specific issue. You see results FAST — no random techniques." },
    { title: "Just 5 Minutes a Day",                 desc: "Do it while you wash your face. Fits into any busy lifestyle." },
    { title: "INSTANT + LONG-TERM Results",          desc: "After one session: less puffiness, brighter skin, tighter face. After 28 days: wrinkles softer, sagging lifted, skin glowing." },
    { title: "Save THOUSANDS on Facials & Fillers",  desc: "One purchase = lifelong beauty tool. No subscriptions, no repeat costs." },
    { title: "For EVERYONE — Men & Women, All Ages", desc: "Office workers, moms, seniors, students — anyone can learn, anyone can benefit." },
    { title: "Fixes Skin FROM THE INSIDE",           desc: "Boost circulation, release tension, clear blockages. This is not \"surface beauty\" — this is real anti-aging." },
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

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────
function SectionTitle({ children }) {
    return (
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
            {children}
        </h3>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function GuaShaPage({
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
    const [imgError, setImgError] = useState(false);

    // Single course — no per-lesson purchase for Gua Sha
    const canPlay = isOwned;

    const fetchSignedUrl = async () => {
        setLoading(true);
        setError("");
        setVideoUrl("");
        try {
            const token = localStorage.getItem("ec_token");
            const res = await fetch(
                `${API_BASE}/api/video-url?key=${encodeURIComponent(COURSE.s3Key)}`,
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
            if (!data?.url || typeof data.url !== "string" || !data.url.startsWith("https://")) {
                setError("Unable to get a valid video link");
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError("Network error: cannot reach backend");
        } finally {
            setLoading(false);
        }
    };

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: COURSE.courseId });
    }

    useEffect(() => {
        if (!canPlay) {
            setVideoUrl("");
            setError("");
            setLoading(false);
            return;
        }
        fetchSignedUrl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canPlay]);

    const heroSrc = imgError ? COURSE.fallbackImage : COURSE.coverImage;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 md:pt-10">

                {/* ══ HERO IMAGE ══ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
                >
                    <img
                        src={heroSrc}
                        alt={COURSE.titleEn}
                        onError={() => setImgError(true)}
                        className="w-full object-cover object-center"
                        style={{ display: "block", aspectRatio: "16/9", maxHeight: "420px" }}
                    />
                </motion.div>

                {/* ══ COURSE HEADER ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] uppercase tracking-widest text-slate-500">
                            Video Course
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                Sale
                            </span>
                        )}
                    </div>
                    <p className="text-xs font-medium text-rose-600 mb-1">
                        {COURSE.tagline}
                    </p>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        Youthful Glow Without The Effort
                    </h1>
                    <p className="mt-1 text-base text-slate-700 font-medium">
                        Beginner-Friendly Gua Sha Massage. No Tools Expertise, No Pain, Just Natural Anti-Aging Results.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-base text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            16 chapters · lifetime access
                        </span>
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs text-rose-700">
                            On Sale
                        </span>
                    </div>
                </motion.div>

                {/* ══ PURCHASE BUTTON ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-6 space-y-3"
                >
                    {isOwned ? (
                        <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                            ✓ Full Course Unlocked
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleUnlockCourse}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                Unlock Full Course (All 16 Chapters) · {COURSE.priceNow}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    Please sign in to purchase and watch.
                                </p>
                            )}
                        </>
                    )}
                </motion.div>

                {/* ══ CHAPTER LIST ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                >
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
                        Course Contents · 16 Chapters
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                        This is one full-length video. Numbers in brackets are timestamps you can jump to directly.
                    </p>
                    <div className="space-y-2">
                        {CHAPTERS.map((ch) => (
                            <div
                                key={ch.id}
                                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                                    {ch.id}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-semibold text-slate-900">{ch.titleEn}</p>
                                        {ch.timestamp && (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-500 shrink-0">
                                                （{ch.timestamp}）
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
                                </div>
                                {isOwned ? (
                                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                        Unlocked
                                    </span>
                                ) : (
                                    <span className="shrink-0 text-slate-300 text-sm">🔒</span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="gs-video-player"
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-6"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                        {canPlay ? (
                            <div className="relative w-full">
                                {loading && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                                            Loading…
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">Playback error</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={fetchSignedUrl}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
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
                                        className="w-full"
                                        style={{ display: "block", aspectRatio: "16/9" }}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        Your browser does not support video.
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">Loading video…</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">Locked</p>
                                    <p className="text-sm text-white/70">
                                        Purchase to unlock and watch.
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Unlock Full Course {COURSE.priceNow}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            Sign in to purchase
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            Course Video
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            16 Facial Anti-Aging Gua Sha — Full Course
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            2h 34min · Use timestamps in chapter list above to navigate
                        </p>
                    </div>
                </motion.div>

                {/* ══ PAIN POINTS ══ */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp} transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                        <SectionTitle>The Aging Nightmare You're Living Every Day</SectionTitle>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {PAIN_POINTS.map((pt, i) => {
                                const colon = pt.indexOf(":");
                                const label = colon !== -1 ? pt.slice(0, colon) : pt;
                                const rest  = colon !== -1 ? pt.slice(colon + 1).trim() : "";
                                return (
                                    <div key={i} className="flex gap-2.5 text-sm text-slate-700 leading-snug">
                                        <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-xs leading-none pt-1">→</span>
                                        <span><span className="font-semibold">{label}</span>{rest ? `: ${rest}` : ""}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ══ WHY THIS COURSE ══ */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp} transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="rounded-3xl border border-slate-200 bg-white p-5">
                        <SectionTitle>WHY THIS COURSE BEATS EVERY OTHER TREATMENT</SectionTitle>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                            {WHY_POINTS.map((pt, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5">
                                    <p className="text-sm font-bold text-slate-900 leading-snug">✅ {pt.title}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{pt.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ══ WHO NEEDS THIS ══ */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp} transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                        <SectionTitle>WHO NEEDS THIS COURSE?</SectionTitle>
                        <ul className="space-y-2.5">
                            {WHO_POINTS.map((pt, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">✅</span>
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* ══ CLOSING CTA ══ */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp} transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="rounded-3xl bg-slate-900 px-5 py-6 text-center space-y-3">
                        <p className="text-sm text-white/80 leading-relaxed">
                            You don't need expensive facials.<br />
                            You don't need risky injections.<br />
                            You don't need endless skincare products.
                        </p>
                        <p className="text-base font-semibold text-white">
                            You just need the RIGHT GUA SHA METHOD — targeted, gentle, and proven.
                        </p>
                        <p className="text-sm text-white/70">
                            In 5 minutes a day, you can:<br />
                            <span className="text-white font-medium">Lift sagging • Fade wrinkles • Slim face • Brighten skin • Erase dark spots • Look 5–10 years younger.</span>
                        </p>
                        <p className="text-sm font-semibold text-amber-400">
                            This course is your at-home beauty clinic — forever.
                        </p>
                        {!isOwned && (
                            <button
                                onClick={handleUnlockCourse}
                                className="mt-2 inline-block rounded-2xl bg-amber-500 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400 transition"
                            >
                                Unlock Full Course · {COURSE.priceNow}
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* ══ DISCLAIMER ══ */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                    Disclaimer: This program is for wellness and educational purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns.
                </div>

            </main>
        </div>
    );
}
