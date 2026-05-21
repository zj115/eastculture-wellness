// src/pages/QigongPage.jsx
// Acupressure Masterclass — 6 Lessons
// App.jsx: activePage === "qigong" → <QigongPage courseId="qigong" />

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─────────────────────────────────────────────
// HELPER: Build lessons from translations
// ─────────────────────────────────────────────
function getLessonsFromTranslations(t) {
    const lessonCount = 6;
    return Array.from({ length: lessonCount }, (_, i) => {
        const id = i + 1;
        return {
            id,
            titleEn: t(`qigong.lessons.${id}.title`),
            subtitleEn: t(`qigong.lessons.${id}.subtitle`),
            duration: t(`qigong.lessons.${id}.duration`),
            s3Key: t(`qigong.lessons.${id}.s3Key`),
            coverImage: t(`qigong.lessons.${id}.coverImage`),
            fallbackImage: t(`qigong.lessons.${id}.fallbackImage`),
            intro: t(`qigong.lessons.${id}.intro`),
            conditions: t(`qigong.lessons.${id}.conditions`, { returnObjects: true }),
            highlights: t(`qigong.lessons.${id}.highlights`, { returnObjects: true }),
            audience: t(`qigong.lessons.${id}.audience`, { returnObjects: true }),
            closingEn: t(`qigong.lessons.${id}.closing`),
        };
    });
}

// Removed hardcoded COURSE and LESSONS - now loaded from translations
// Removed hardcoded COURSE and LESSONS - now loaded from translations

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

function ConditionsList({ items, conditionsLabel }) {
    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item, i) => (
                <div key={i} className="flex gap-2.5 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-emerald-500 font-bold text-xs leading-none pt-1">✓</span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    );
}

function HighlightGrid({ items }) {
    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {items.map((h, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5">
                    <p className="text-sm font-bold text-slate-900 leading-snug">{h.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
                </div>
            ))}
        </div>
    );
}

function AudienceList({ items }) {
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">→</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LessonDetail({ lesson, t }) {
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

            {/* Conditions Covered */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>
                    {lesson.conditions.length} {t('qigong.conditionsCovered')}
                </SectionTitle>
                <ConditionsList items={lesson.conditions} />
            </div>

            {/* Course Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{t('qigong.courseHighlights')}</SectionTitle>
                <HighlightGrid items={lesson.highlights} />
            </div>

            {/* Who Is This For */}
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                <SectionTitle>{t('qigong.whoIsThisFor')}</SectionTitle>
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
                {t('qigong.disclaimer')}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QigongPage({
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
    const { t } = useTranslation();
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const COURSE = useMemo(() => ({
        titleEn: t('qigong.course.title'),
        subtitleEn: t('qigong.course.subtitle'),
        lessonCount: 6,
        lessonPrice: t('qigong.course.lessonPrice'),
        lessonPriceOld: t('qigong.course.lessonPriceOld'),
        sale: true,
        courseId: "qigong",
    }), [t]);

    const LESSONS = useMemo(() => getLessonsFromTranslations(t), [t]);

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
                courseId: COURSE.courseId,
                videoKey: lesson.s3Key,
                videoTitle: lesson.titleEn,
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("ap-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: COURSE.courseId });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: COURSE.courseId,
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
                        loading="eager"
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
                            {t('qigong.videoCourse')}
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                {t('qigong.sale')}
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
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {COURSE.lessonCount} {t('qigong.lessonsIndividual')}
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
                            ✓ {t('qigong.lessonUnlocked', { lessonId: activeLesson.id })}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {t('qigong.buyLesson', { lessonId: activeLesson.id, price: COURSE.lessonPrice })}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {t('qigong.signInToPurchase')}
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
                        {t('qigong.lessonsLabel')}
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
                                        {t('qigong.lesson')} {lesson.id}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {lesson.titleEn}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            {t('qigong.unlocked')}
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[9px] text-amber-700">
                                            🔒 {COURSE.lessonPrice}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="ap-video-player"
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
                                            {t('qigong.loading')}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{t('qigong.playbackError')}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {t('qigong.retry')}
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
                                        {t('qigong.videoNotSupported')}
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">
                                            {t('qigong.selectLesson')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{t('qigong.locked')}</p>
                                    <p className="text-sm text-white/70">
                                        {t('qigong.purchaseToUnlock')}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleBuyActiveVideo}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {t('qigong.buyThisLesson', { price: COURSE.lessonPrice })}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {t('qigong.signInToPurchaseShort')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            {t('qigong.nowPlaying')}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {t('qigong.lesson')} {activeLesson.id} · {activeLesson.titleEn}
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
                            {t('qigong.lessonFullDescription', { lessonId: activeLesson.id })}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {t('qigong.switchLessons')}
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} t={t} />
                </motion.div>

            </main>
        </div>
    );
}
