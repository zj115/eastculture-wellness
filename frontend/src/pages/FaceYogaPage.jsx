// src/pages/FaceYogaPage.jsx
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

const S3_PREFIX = "face-yoga/";

const LESSONS = [
    {
        id: 1,
        titleEn: "Intro & Guide",
        duration: "—",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-01-introduction-guide.mp4`,
    },
    {
        id: 2,
        titleEn: "Forehead Wrinkle Relief",
        duration: "—",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-02-forehead-wrinkle-relief.mp4`,
    },
    {
        id: 3,
        titleEn: "Frown Line Relief",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-03-frown-line-relief.mp4`,
    },
    {
        id: 4,
        titleEn: "Under-Eye Puffiness Relief",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-04-under-eye-puffiness-relief.mp4`,
    },
    {
        id: 5,
        titleEn: "Dark Circle Improvement",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-05-dark-circle-improvement.mp4`,
    },
    {
        id: 6,
        titleEn: "Crow's Feet Reduction",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-06-crows-feet-reduction.mp4`,
    },
    {
        id: 7,
        titleEn: "Tear Trough Smoothing",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-07-tear-trough-smoothing.mp4`,
    },
    {
        id: 8,
        titleEn: "Nasolabial Fold Smoothing",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-08-nasolabial-fold-smoothing.mp4`,
    },
    {
        id: 9,
        titleEn: "Nasal Base Lifting",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-09-nasal-base-lifting.mp4`,
    },
    {
        id: 10,
        titleEn: "Cheek Lifting",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-10-cheek-lifting.mp4`,
    },
    {
        id: 11,
        titleEn: "Full Face Lifting",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-11-full-face-lifting.mp4`,
    },
    {
        id: 12,
        titleEn: "Perioral Fine Line Smoothing",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-12-perioral-fine-line-smoothing.mp4`,
    },
    {
        id: 13,
        titleEn: "Mouth Corner Lifting",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-13-mouth-corner-lifting.mp4`,
    },
    {
        id: 14,
        titleEn: "Jawline Definition",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-14-jawline-definition.mp4`,
    },
    {
        id: 15,
        titleEn: "Skin Tone Brightening",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-15-skin-tone-brightening.mp4`,
    },
    {
        id: 16,
        titleEn: "Facial De-puffing",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-16-facial-de-puffing.mp4`,
    },
];

const DETAILS = {
    titleEn: "Face Yoga & Facial Massage Masterclass",
    priceNow: "$149 USD",
    priceOld: "$199 USD",
    sale: true,
    introEn:
        "A complete program combining muscle training and traditional techniques. 16 lessons, lifetime access.",
    highlights: [
        "Gentle & beginner-friendly (no tools needed)",
        "Short lessons for daily consistency",
    ],
    basedOnTitle: "The course is based on",
    basedOn: [
        "System thinking: treat the body as a whole system, not isolated symptoms.",
        "Daily maintenance: consistent practice supports circulation and function.",
        "Prevention first: small daily work is better than fixing problems later.",
        "Balanced training: avoid overworking one area; restore overall balance.",
    ],
    suitableTitle: "This course is suitable for",
    suitable: [
        "People who feel facial tension, puffiness or tired look",
        "Beginners who want safe, slow, guided routines",
        "Anyone who prefers gentle wellness over intense workouts",
    ],
};

export default function FaceYogaPage({ onBack, currentUser, authLoading = false, isOwned: isOwnedProp, purchases = [], onPurchase, onGoLogin }) {
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [activeLessonId, setActiveLessonId] = useState(1);
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [qty, setQty] = useState(1);

    const activeLesson = useMemo(
        () => LESSONS.find((x) => x.id === activeLessonId) || LESSONS[0],
        [activeLessonId]
    );

    const canPlayActive = useMemo(() => {
        if (isOwned) return true;
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === activeLesson.s3Key;
        });
    }, [isOwned, activeLesson, purchases]);

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
                    headers: token ? { "Authorization": `Bearer ${token}` } : {},
                }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.error || "Failed to load video URL");
                return;
            }

            if (!data?.url || typeof data.url !== "string") {
                setError("Backend returned no usable url");
                return;
            }

            if (!data.url.startsWith("https://")) {
                setError("URL is not https (may be blocked)");
                return;
            }

            setVideoUrl(data.url);
        } catch (e) {
            setError("Network error: cannot reach backend");
        } finally {
            setLoading(false);
        }
    };

    function handleSelectLesson(lesson) {
        const hasAccess = isOwned || purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === lesson.s3Key;
        });
        if (!hasAccess) {
            if (authLoading) return;
            if (!isLoggedIn) {
                onGoLogin?.();
            } else {
                onPurchase?.("video", { courseId: "faceyoga", videoKey: lesson.s3Key, videoTitle: lesson.titleEn });
            }
            return;
        }
        setActiveLessonId(lesson.id);
        const el = document.getElementById("video-player");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function handleUnlockCourse() {
        onPurchase?.("course", { courseId: "faceyoga" });
    }

    function handleBuyVideo() {
        onPurchase?.("video", {
            courseId: "faceyoga",
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
    }, [activeLessonId, activeLesson.s3Key, canPlayActive]);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-[1.6fr_1fr] items-start"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img
                            src="/images/face-yoga-masterclass.jpg"
                            alt="Course cover"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                VIDEO COURSE
                            </div>
                            {DETAILS.sale && (
                                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                                    Sale
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl font-semibold leading-tight md:text-3xl">
                            {DETAILS.titleEn}
                        </h1>

                        <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-slate-900">{DETAILS.priceNow}</span>
                            <span className="text-sm text-slate-400 line-through">{DETAILS.priceOld}</span>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                            <div>• {LESSONS.length} lessons · lifetime access</div>
                            <div>• {DETAILS.introEn}</div>
                        </div>

                        <div className="space-y-1 text-xs text-slate-600">
                            {DETAILS.highlights.map((it, idx) => (
                                <div key={idx}>• {it}</div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="text-xs text-slate-500">Quantity</div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                                >
                                    −
                                </button>
                                <div className="h-10 min-w-[56px] rounded-xl border border-slate-200 bg-white px-3 flex items-center justify-center text-sm">
                                    {qty}
                                </div>
                                <button
                                    type="button"
                                    className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                    onClick={() => setQty((v) => v + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleBuyVideo}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                            >
                                Buy This Lesson $10 USD
                            </button>

                            {!isLoggedIn && (
                                <p className="text-xs text-amber-700">
                                    Please sign in to purchase and watch.
                                </p>
                            )}
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    id="video-player"
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-10 grid gap-8 md:grid-cols-[1fr_360px] items-start"
                >
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                            {canPlayActive ? (
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
                                                    onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                    className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400"
                                                >
                                                    Retry
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {!error && !loading && videoUrl && (
                                        <video
                                            key={activeLesson.id}
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
                                            <div className="max-w-md">
                                                <p className="text-lg font-semibold">Ready</p>
                                                <p className="mt-2 text-sm text-white/80">
                                                    Select a lesson on the right to start.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                    <div className="max-w-md">
                                        <p className="text-lg font-semibold">Locked</p>
                                        <p className="mt-2 text-sm text-white/80">
                                            Purchase a lesson or the full course to start watching.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                            <p className="text-xs text-slate-500">Now playing</p>
                            <p className="mt-1 text-base font-semibold text-slate-900">
                                Lesson {activeLesson.id}: {activeLesson.titleEn}
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {DETAILS.basedOnTitle}
                            </h2>
                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                                {DETAILS.basedOn.map((it, idx) => (
                                    <li key={idx}>{it}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {DETAILS.suitableTitle}
                            </h2>
                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                                {DETAILS.suitable.map((it, idx) => (
                                    <li key={idx}>{it}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                            Disclaimer: This program is for wellness purposes only and is not medical advice.
                        </div>
                    </div>

                    <aside className="space-y-3">
                        <div className="flex items-end justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                                Lessons
                            </h2>
                            <p className="text-xs text-slate-500">{LESSONS.length} total</p>
                        </div>

                        <div className="max-h-[720px] space-y-2 overflow-auto pr-1">
                            {LESSONS.map((lesson) => {
                                const hasAccess = isOwned || purchases.some((p) => {
                                    if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                                    return p.purchase_type === "video" && p.video_key === lesson.s3Key;
                                });
                                const locked = !hasAccess;
                                const active = lesson.id === activeLessonId;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleSelectLesson(lesson)}
                                        className={[
                                            "flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition",
                                            active
                                                ? "border-amber-300 bg-amber-50"
                                                : "border-slate-200 bg-white hover:bg-slate-50",
                                            locked ? "opacity-70" : "opacity-100",
                                        ].join(" ")}
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                Lesson {lesson.id} · {lesson.titleEn}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2 text-xs">
                                            {locked && (
                                                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
                                                    🔒 Buy $10 USD
                                                </span>
                                            )}
                                            {!locked && (
                                                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                                                    Unlocked
                                                </span>
                                            )}
                                            <span className="text-slate-400">{lesson.duration}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>
                </motion.section>
            </main>
        </div>
    );
}
