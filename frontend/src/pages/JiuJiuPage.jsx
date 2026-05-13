// src/pages/JiuJiuPage.jsx
// 9.9 Quick Relief Course — 3 Lessons

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
    titleEn: "Quick Relief Self-Care Course",
    subtitleEn: "Fast Relief for Common Daily Discomforts. 4 Simple Acupoint Routines, 5-10 Minutes Each, Instant Comfort at Home.",
    priceNow: "$9.9",
    priceOld: "$29.99",
    sale: true,
    lessonCount: 4,
    lessonPrice: "$9.9",
};

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Lower Back Pain Relief",
        subtitleEn: "Fast Relief • 3 Acupoints • Feel Better Fast",
        duration: "~5 min",
        s3Key: "9.9/腰腿疼痛.mp4",
        coverImage: "/images/jiujiu-waist.png",
        fallbackImage: "/images/acupoint-waist-legs.png",

        intro: "Suffering from stubborn lower back pain? Tired of temporary relief from creams and treatments?\n\nThis course helps you quickly relax tight muscles, release tension, and ease discomfort with 3 powerful acupressure points.\n\nNo tools, no help needed. Just 10–20 minutes a day.\n\nFollow Master Qing Ji and feel warmth, relaxation, and relief in minutes.",

        painPoints: [
            "Long sitting hours causing recurring back pain",
            "Bending, lifting, or overwork leading to lower back strain",
            "Stiffness, soreness, coldness in the lower back",
            "Temporary relief from patches and therapy, but pain returns",
            "Want natural, drug-free pain relief at home",
        ],

        benefits: [
            { title: "Fast relief", desc: "3 core acupoints quickly unblock and relax tight lower back" },
            { title: "No tools needed", desc: "Do it yourself at home, no equipment required" },
            { title: "10-20 minutes daily", desc: "Short, effective routine that fits any schedule" },
            { title: "Feel warmth & relaxation", desc: "Immediate sensation of heat and looseness in the back" },
            { title: "Root-cause improvement", desc: "Regular practice improves blood flow and prevents recurring pain" },
        ],

        instructor: {
            name: "Master Qing Ji",
            title: "Traditional Chinese Medicine Practitioner",
            points: [
                "Certified TCM practitioner with years of clinical experience",
                "Specializes in acupressure and meridian therapy",
                "Easy-to-follow teaching style for complete beginners",
            ],
        },

        audience: [
            "Office workers & people with long sitting hours",
            "Those with recurring stiffness, soreness, or fatigue",
            "People who prefer gentle, natural self-care",
            "Complete beginners welcome",
        ],

        closingEn: "One purchase → lifetime access. Practice anytime, feel better fast.",
    },

    {
        id: 2,
        titleEn: "Neck & Shoulder Relief",
        subtitleEn: "Release Tension • Move Freely • Fast Relief",
        duration: "~5 min",
        s3Key: "9.9/肩颈课.mp4",
        coverImage: "/images/jiujiu-neck.png",
        fallbackImage: "/images/acupoint-neck-shoulder.png",

        intro: "Stiff neck? Tight shoulders? Heavy, painful, hard to move?\n\nThis routine helps you release tension quickly and unlock tight neck & shoulders.\n\nJust 10 minutes a day.\n\nFollow along and feel instant relief—no force, no equipment.",

        painPoints: [
            "Phone & computer use causing stiff, heavy neck and shoulders",
            "Neck cracking sounds when turning head",
            "Shoulders feel like carrying heavy stones",
            "Dizziness or hand numbness from neck tension",
            "Want quick relief without massage or equipment",
        ],

        benefits: [
            { title: "Quick tension release", desc: "3 acupoints instantly unlock stiff neck and shoulders" },
            { title: "10 minutes daily", desc: "Short routine, immediate relief" },
            { title: "No force, no equipment", desc: "Gentle pressure, safe and effective" },
            { title: "Restore flexibility", desc: "Move your neck and shoulders freely again" },
            { title: "Feel lighter & energized", desc: "Release the heavy burden, feel refreshed" },
        ],

        instructor: {
            name: "Master Qing Ji",
            title: "Traditional Chinese Medicine Practitioner",
            points: [
                "Certified TCM practitioner with years of clinical experience",
                "Specializes in acupressure and meridian therapy",
                "Easy-to-follow teaching style for complete beginners",
            ],
        },

        audience: [
            "Office workers & people with long sitting hours",
            "Those with recurring stiffness, soreness, or fatigue",
            "People who prefer gentle, natural self-care",
            "Complete beginners welcome",
        ],

        closingEn: "One purchase → lifetime access. Unlock your neck & shoulders in minutes.",
    },

    {
        id: 3,
        titleEn: "Sleep & Calm Support",
        subtitleEn: "10-Min Bedtime Routine • Fall Asleep Faster",
        duration: "~5 min",
        s3Key: "9.9/失眠.mp4",
        coverImage: "/images/jiujiu-sleep.png",
        fallbackImage: "/images/acupoint-daily.png",

        intro: "Tossing, turning, racing thoughts? Can't fall asleep?\n\nThis bedtime routine calms your mind fast and helps you sleep deeper—naturally.\n\n10 minutes in bed. No pills, no devices.\n\nFall asleep quicker, wake up less.",

        painPoints: [
            "Tossing and turning, can't fall asleep",
            "Racing thoughts, mind won't stop",
            "Waking up in the middle of the night, can't go back to sleep",
            "Want natural sleep support without medication",
            "Need a simple bedtime routine",
        ],

        benefits: [
            { title: "Fast relaxation", desc: "3 calming acupoints quickly relax nerves and emotions" },
            { title: "10 minutes in bed", desc: "Do it lying down, right before sleep" },
            { title: "No pills, no devices", desc: "Natural, safe, drug-free sleep support" },
            { title: "Fall asleep faster", desc: "Calm your mind and enter sleep state quickly" },
            { title: "Sleep deeper", desc: "Regular practice improves sleep quality and energy" },
        ],

        instructor: {
            name: "Master Qing Ji",
            title: "Traditional Chinese Medicine Practitioner",
            points: [
                "Certified TCM practitioner with years of clinical experience",
                "Specializes in acupressure and meridian therapy",
                "Easy-to-follow teaching style for complete beginners",
            ],
        },

        audience: [
            "Office workers & people with long sitting hours",
            "Those with recurring stiffness, soreness, or fatigue",
            "People who prefer gentle, natural self-care",
            "Complete beginners welcome",
        ],

        closingEn: "One purchase → lifetime access. Sleep better tonight.",
    },

    {
        id: 4,
        titleEn: "Men's Health & Vitality",
        subtitleEn: "Male Wellness • Natural Support • Restore Energy",
        duration: "~5 min",
        s3Key: "9.9/男科.mp4",
        coverImage: "/images/jiujiu-mens-health.png",
        fallbackImage: "/images/acupoint-daily.png",

        intro: "Feeling low energy? Struggling with vitality and wellness concerns?\n\nThis course helps you understand men's physiological health and learn scientific self-care methods to improve quality of life.\n\nJust 10-15 minutes a day.\n\nFollow along and restore your natural vitality—safe, natural, effective.",

        painPoints: [
            "Low energy and fatigue affecting daily life",
            "Concerns about men's health and vitality",
            "Stress and lifestyle affecting wellness",
            "Want natural, holistic approaches to men's health",
            "Looking for safe, effective self-care methods",
        ],

        benefits: [
            { title: "Restore vitality", desc: "Learn acupoints that support men's health and energy" },
            { title: "10-15 minutes daily", desc: "Simple routine that fits your schedule" },
            { title: "Natural & safe", desc: "Drug-free, holistic approach to wellness" },
            { title: "Scientific methods", desc: "Based on Traditional Chinese Medicine principles" },
            { title: "Improve quality of life", desc: "Feel more energized and balanced" },
        ],

        instructor: {
            name: "Master Qing Ji",
            title: "Traditional Chinese Medicine Practitioner",
            points: [
                "Certified TCM practitioner with years of clinical experience",
                "Specializes in acupressure and meridian therapy",
                "Easy-to-follow teaching style for complete beginners",
            ],
        },

        audience: [
            "Men seeking natural wellness support",
            "Those experiencing low energy or vitality concerns",
            "People interested in holistic health approaches",
            "Complete beginners welcome",
        ],

        closingEn: "One purchase → lifetime access. Restore your vitality naturally.",
    },
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

function PainPointsList({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">✕</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function BenefitsList({ items }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {items.map((b, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                        <span className="text-emerald-600 mr-1.5">✓</span>{b.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pl-5">{b.desc}</p>
                </div>
            ))}
        </div>
    );
}

function InstructorCard({ instructor }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div>
                <p className="text-sm font-bold text-slate-900">{instructor.name}</p>
                <p className="text-xs text-amber-700 mt-0.5">{instructor.title}</p>
            </div>
            <ul className="space-y-1.5">
                {instructor.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="shrink-0 text-slate-400 mt-0.5">•</span>
                        <span>{pt}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AudienceList({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-emerald-500 font-bold text-base leading-none">→</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LessonDetail({ lesson }) {
    return (
        <div className="space-y-5">
            {/* Intro */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {lesson.titleEn}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {lesson.subtitleEn}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {lesson.intro}
                </p>
            </div>

            {/* Pain Points */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>Who Is This For?</SectionTitle>
                <PainPointsList items={lesson.painPoints} />
            </div>

            {/* Benefits */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>Course Benefits</SectionTitle>
                <BenefitsList items={lesson.benefits} />
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>Instructor</SectionTitle>
                <InstructorCard instructor={lesson.instructor} />
            </div>

            {/* Audience */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                <SectionTitle>Perfect For</SectionTitle>
                <AudienceList items={lesson.audience} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {lesson.closingEn}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                Disclaimer: This program is for wellness purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns.
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function JiuJiuPage({
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [activeLessonId, setActiveLessonId] = useState(1);
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imgError, setImgError] = useState(false);

    const activeLesson = useMemo(
        () => LESSONS.find((x) => x.id === activeLessonId) || LESSONS[0],
        [activeLessonId]
    );

    useEffect(() => { setImgError(false); }, [activeLessonId]);

    function hasAccess(lesson) {
        if (isOwned) return true;
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === lesson.s3Key;
        });
    }

    const canPlayActive = useMemo(() => hasAccess(activeLesson), [isOwned, activeLesson, purchases]);

    const fetchSignedUrl = async (s3Key) => {
        setLoading(true);
        setError("");
        setVideoUrl("");
        try {
            const token = localStorage.getItem("ec_token");
            const res = await fetch(
                `${API_BASE}/api/video-url?key=${encodeURIComponent(s3Key)}`,
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

    function handleSelectLesson(lesson) {
        if (!hasAccess(lesson)) {
            if (authLoading) return;
            if (!isLoggedIn) { onGoLogin?.(); return; }
            onPurchase?.("video", {
                courseId: "jiujiu",
                videoKey: lesson.s3Key,
                videoTitle: lesson.titleEn,
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("jj-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: "jiujiu" });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: "jiujiu",
            videoKey: activeLesson.s3Key,
            videoTitle: activeLesson.titleEn,
        });
    }

    useEffect(() => {
        if (!canPlayActive) {
            setVideoUrl("");
            setError("");
            setLoading(false);
            return;
        }
        fetchSignedUrl(activeLesson.s3Key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeLessonId, activeLesson.s3Key, canPlayActive]);

    const heroSrc = imgError ? activeLesson.fallbackImage : activeLesson.coverImage;

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-4xl px-4 pb-20 pt-6 md:pt-10">

                {/* ══ HERO IMAGE ══ */}
                <motion.div
                    key={`hero-${activeLessonId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
                >
                    <img
                        src={heroSrc}
                        alt={activeLesson.titleEn}
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
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {COURSE.titleEn}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {COURSE.subtitleEn}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-base text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {COURSE.lessonCount} lessons · lifetime access
                        </span>
                    </div>
                </motion.div>

                {/* ══ PURCHASE BUTTONS ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-6 space-y-3"
                >
                    {canPlayActive ? (
                        <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                            ✓ Lesson {activeLesson.id} Unlocked
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                Buy Lesson {activeLesson.id} · $9.9 USD
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    Please sign in to purchase and watch.
                                </p>
                            )}
                        </>
                    )}
                </motion.div>

                {/* ══ LESSON SELECTOR ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-5"
                >
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
                        Lessons
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {LESSONS.map((lesson) => {
                            const unlocked = hasAccess(lesson);
                            const active = lesson.id === activeLessonId;
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={[
                                        "relative flex flex-col items-start gap-1 rounded-2xl border px-3 py-3 text-left transition-all",
                                        active
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" />
                                    )}
                                    <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                        Lesson {lesson.id}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {lesson.titleEn}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            Unlocked
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[9px] text-amber-700">
                                            🔒 $9.9 USD
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="jj-video-player"
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mb-6"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                        {canPlayActive ? (
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
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {!error && !loading && videoUrl && (
                                    <video
                                        key={activeLesson.id}
                                        controls playsInline preload="metadata"
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
                                        <p className="text-sm text-white/70">
                                            Select a lesson above to play.
                                        </p>
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
                                            onClick={handleBuyActiveVideo}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Buy This Lesson · $9.9
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
                            Now Playing
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            Lesson {activeLesson.id} · {activeLesson.titleEn}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {activeLesson.subtitleEn}
                        </p>
                    </div>
                </motion.div>

                {/* ══ LESSON DETAIL ══ */}
                <motion.div
                    key={activeLessonId}
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-4">
                        <h2 className="text-base font-bold text-slate-900">
                            Lesson {activeLesson.id} — Full Description
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Switch lessons above to see details for each
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} />
                </motion.div>

            </main>
        </div>
    );
}
