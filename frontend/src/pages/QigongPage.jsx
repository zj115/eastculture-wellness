// src/pages/AcupressurePage.jsx
// Acupressure (穴位按摩) 二级页面（课程门户页）
// 需要 App.jsx 传入 lang（zh/en）与 onBack（返回课程列表）

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

const S3_PREFIX = "acupressure/";

const LESSONS = [
    {
        id: 1,
        titleZh: "头部穴位按摩",
        titleEn: "Head Acupressure",
        duration: "—",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-01-head-acupressure.mp4`,
    },
    {
        id: 2,
        titleZh: "面部穴位按摩",
        titleEn: "Face Acupressure",
        duration: "—",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-02-face-acupressure.mp4`,
    },
    {
        id: 3,
        titleZh: "手脚穴位按摩",
        titleEn: "Hands & Feet Acupressure",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-03-hands-feet-acupressure.mp4`,
    },
    {
        id: 4,
        titleZh: "日常穴位按摩",
        titleEn: "Daily Acupressure Routine",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-04-daily-acupressure.mp4`,
    },
    {
        id: 5,
        titleZh: "肩颈穴位按摩",
        titleEn: "Neck & Shoulder Acupressure",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-05-neck-shoulder-acupressure.mp4`,
    },
    {
        id: 6,
        titleZh: "腰腿穴位按摩",
        titleEn: "Waist & Leg Acupressure",
        duration: "—",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-06-waist-leg-acupressure.mp4`,
    },
];

const DETAILS = {
    titleEn: "Acupressure Masterclass",
    titleZh: "穴位按摩课程 · 轻松自我调理",
    categoryEn: "VIDEO COURSE",
    categoryZh: "视频课程",
    priceNow: "NZD 99",
    priceOld: "NZD 149",
    sale: true,
    introEn:
        "A practical acupressure program for daily self-care. 6 lessons, lifetime access.",
    introZh:
        "一套可以每天使用的穴位按摩自我调理课。6 节课，支持随时回看，帮助你放松、缓解紧张与疲劳。",
    highlights: [
        { en: "Beginner-friendly (no tools needed)", zh: "零基础友好（不需要工具）" },
        { en: "Short, practical routines for daily use", zh: "短而实用，适合日常坚持" },
        { en: "Preview available for the first 2 lessons", zh: "前 2 节可试看" },
    ],
    basedOnTitleEn: "The course is based on",
    basedOnTitleZh: "课程核心理念",
    basedOn: [
        {
            en: "Simple & repeatable: easy routines you can actually stick with.",
            zh: "简单可重复：每个动作都能在日常坚持下来。",
        },
        {
            en: "Relaxation first: release tension, then the body recovers better.",
            zh: "先放松：紧张松开了，身体更容易恢复。",
        },
        {
            en: "Whole-body thinking: head, face, neck/shoulders, hands/feet, waist/legs.",
            zh: "全身系统：从头脸到肩颈、手脚、腰腿整体照顾。",
        },
    ],
    suitableTitleEn: "This course is suitable for",
    suitableTitleZh: "适合人群",
    suitable: [
        { en: "People who feel stressed, tense, or fatigued", zh: "压力大、紧张、疲劳的人" },
        { en: "Office workers with neck/shoulder discomfort", zh: "久坐导致肩颈不舒服的人" },
        { en: "Anyone who wants gentle daily self-care", zh: "想要温和日常自我调理的人" },
    ],
};

export default function AcupressurePage({ lang, onBack, currentUser, isOwned: isOwnedProp, purchases = [], onPurchase, onGoLogin }) {
    const isZh = lang === "zh";

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
            const res = await fetch(
                `${API_BASE}/api/video-url?key=${encodeURIComponent(s3Key)}`,
                { cache: "no-store", credentials: "include" }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(
                    data?.error || (isZh ? "获取视频链接失败" : "Failed to load video URL")
                );
                return;
            }

            if (!data?.url || typeof data.url !== "string") {
                setError(isZh ? "后端没有返回可用的 url" : "Backend returned no usable url");
                return;
            }

            if (!data.url.startsWith("https://")) {
                setError(
                    isZh ? "视频链接不是 https，浏览器可能会拦截" : "URL is not https (may be blocked)"
                );
                return;
            }

            setVideoUrl(data.url);
        } catch {
            setError(isZh ? "网络错误：无法连接后端" : "Network error: cannot reach backend");
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
            if (!isLoggedIn) {
                onGoLogin?.();
            } else {
                const title = isZh ? lesson.titleZh : lesson.titleEn;
                onPurchase?.("video", { courseId: "qigong", videoKey: lesson.s3Key, videoTitle: title });
            }
            return;
        }
        setActiveLessonId(lesson.id);
        const el = document.getElementById("video-player");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function handleUnlockCourse() {
        onPurchase?.("course", { courseId: "qigong" });
    }

    function handleBuyVideo() {
        const title = isZh ? activeLesson.titleZh : activeLesson.titleEn;
        onPurchase?.("video", {
            courseId: "qigong",
            videoKey: activeLesson.s3Key,
            videoTitle: title,
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
                <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    </div>
                </div>

                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-[1.6fr_1fr] items-start"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img
                            src="/images/tai-chi/acupressure-cover.jpg"
                            alt={isZh ? "课程封面" : "Course cover"}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                {DETAILS.categoryEn}
                                <span className="mx-2 text-slate-300">•</span>
                                {DETAILS.categoryZh}
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
                        <p className="text-sm text-slate-600">{DETAILS.titleZh}</p>

                        <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-slate-900">
                {DETAILS.priceNow}
              </span>
                            <span className="text-sm text-slate-400 line-through">
                {DETAILS.priceOld}
              </span>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                            <div>
                                • {LESSONS.length} {isZh ? "节课" : "lessons"} ·{" "}
                                {isZh ? "终身访问" : "lifetime access"}
                            </div>
                            <div>• {DETAILS.introEn}</div>
                            <div className="text-slate-600">• {DETAILS.introZh}</div>
                        </div>

                        <div className="space-y-1 text-xs text-slate-600">
                            {DETAILS.highlights.map((it, idx) => (
                                <div key={idx}>• {it.en} / {it.zh}</div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="text-xs text-slate-500">{isZh ? "数量" : "Quantity"}</div>
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
                                {isZh ? `购买本课时 NZD 10` : `Buy This Lesson NZD 10`}
                            </button>

                            {!isLoggedIn && (
                                <p className="text-xs text-amber-700">
                                    {isZh ? "请先登录后购买并观看课程。" : "Please sign in to purchase and watch."}
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
                                                {isZh ? "加载中..." : "Loading..."}
                                            </div>
                                        </div>
                                    )}

                                    {error && !loading && (
                                        <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                            <div className="max-w-md">
                                                <p className="text-lg font-semibold">{isZh ? "播放失败" : "Playback error"}</p>
                                                <p className="mt-2 text-sm text-white/80">{error}</p>
                                                <button
                                                    onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                    className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400"
                                                >
                                                    {isZh ? "重试" : "Retry"}
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
                                            {isZh ? "你的浏览器不支持视频播放。" : "Your browser does not support the video tag."}
                                        </video>
                                    )}

                                    {!error && !loading && !videoUrl && (
                                        <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                            <div className="max-w-md">
                                                <p className="text-lg font-semibold">{isZh ? "准备播放" : "Ready"}</p>
                                                <p className="mt-2 text-sm text-white/80">
                                                    {isZh ? "点击右侧课时开始播放。" : "Select a lesson on the right to start."}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex aspect-video items-center justify-center p-8 text-center text-white">
                                    <div className="max-w-md">
                                        <p className="text-lg font-semibold">{isZh ? "内容已锁定" : "Locked"}</p>
                                        <p className="mt-2 text-sm text-white/80">
                                            {isZh
                                                ? "登录并购买后即可观看全部 6 节课程。未购买用户可试看前 2 节。"
                                                : "Sign in and unlock to watch all lessons. Preview is available for the first 2 lessons."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                            <p className="text-xs text-slate-500">{isZh ? "正在播放" : "Now playing"}</p>
                            <p className="mt-1 text-base font-semibold text-slate-900">
                                {isZh ? `第 ${activeLesson.id} 课：` : `Lesson ${activeLesson.id}: `}
                                {activeLesson.titleEn}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">{activeLesson.titleZh}</p>
                        </div>

                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                            {isZh
                                ? "提醒：本课程不构成医疗建议。如有严重不适，请咨询专业医生。"
                                : "Disclaimer: This program is for wellness purposes only and is not medical advice."}
                            <div className="mt-1 text-amber-800/90">
                                {isZh
                                    ? "Disclaimer (EN): This program is for wellness purposes only and is not medical advice."
                                    : "免责声明（中文）：本课程不构成医疗建议。如有严重不适，请咨询专业医生。"}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-3">
                        <div className="flex items-end justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                                {isZh ? "课程目录" : "Lessons"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {LESSONS.length} {isZh ? "节" : "total"}
                            </p>
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
                                            active ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white hover:bg-slate-50",
                                            locked ? "opacity-70" : "opacity-100",
                                        ].join(" ")}
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {isZh
                                                    ? `第 ${lesson.id} 课 · ${lesson.titleZh}`
                                                    : `Lesson ${lesson.id} · ${lesson.titleEn}`}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                {isZh ? lesson.titleEn : lesson.titleZh}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2 text-xs">
                                            {locked && (
                                                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
                                                    🔒 {isZh ? "购买解锁" : "Buy NZD 10"}
                                                </span>
                                            )}
                                            {!locked && (
                                                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                                                    {isZh ? "已解锁" : "Unlocked"}
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