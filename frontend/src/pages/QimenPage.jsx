// src/pages/QimenPage.jsx
// Tai Chi System Course — 7 Lessons (Wudang Sanfeng series)

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
// COURSE META
// ─────────────────────────────────────────────
const COURSE = {
    titleKey: "qimen.courseTitle",
    subtitleKey: "qimen.courseSubtitle",
    sale: true,
    lessonCount: 7,
    lessonPrice: "$39",
    lessonPriceOld: "$59.99",
};

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleKey: "qimen.lessons.lesson1.title",
        subtitleKey: "qimen.lessons.lesson1.subtitle",
        duration: "~11 min",
        s3Key: "taichi/lesson-07-huogu-yangsheng-gong.mp4",
        coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson1.intro",
        painPointKeys: [
            "qimen.lessons.lesson1.painPoint1",
            "qimen.lessons.lesson1.painPoint2",
            "qimen.lessons.lesson1.painPoint3",
            "qimen.lessons.lesson1.painPoint4",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson1.instructorName",
            titleKey: "qimen.lessons.lesson1.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson1.instructorPoint1",
                "qimen.lessons.lesson1.instructorPoint2",
                "qimen.lessons.lesson1.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson1.benefit1Title", descKey: "qimen.lessons.lesson1.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson1.benefit2Title", descKey: "qimen.lessons.lesson1.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson1.benefit3Title", descKey: "qimen.lessons.lesson1.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson1.benefit4Title", descKey: "qimen.lessons.lesson1.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson1.benefit5Title", descKey: "qimen.lessons.lesson1.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson1.closing",
    },

    {
        id: 2,
        titleKey: "qimen.lessons.lesson2.title",
        subtitleKey: "qimen.lessons.lesson2.subtitle",
        duration: "~10 min",
        s3Key: "taichi/lesson-06-wuji-hunyuan-zhuang.mp4",
        coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson2.intro",
        painPointKeys: [
            "qimen.lessons.lesson2.painPoint1",
            "qimen.lessons.lesson2.painPoint2",
            "qimen.lessons.lesson2.painPoint3",
            "qimen.lessons.lesson2.painPoint4",
            "qimen.lessons.lesson2.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson2.instructorName",
            titleKey: "qimen.lessons.lesson2.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson2.instructorPoint1",
                "qimen.lessons.lesson2.instructorPoint2",
                "qimen.lessons.lesson2.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson2.benefit1Title", descKey: "qimen.lessons.lesson2.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson2.benefit2Title", descKey: "qimen.lessons.lesson2.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson2.benefit3Title", descKey: "qimen.lessons.lesson2.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson2.benefit4Title", descKey: "qimen.lessons.lesson2.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson2.benefit5Title", descKey: "qimen.lessons.lesson2.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson2.closing",
    },

    {
        id: 3,
        titleKey: "qimen.lessons.lesson3.title",
        subtitleKey: "qimen.lessons.lesson3.subtitle",
        duration: "~17 min",
        s3Key: "taichi/lesson-05-wudang-daomen-baduanjin.mp4",
        coverImage: "/images/tai-chi/lesson-05-baduanjin.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson3.intro",
        painPointKeys: [
            "qimen.lessons.lesson3.painPoint1",
            "qimen.lessons.lesson3.painPoint2",
            "qimen.lessons.lesson3.painPoint3",
            "qimen.lessons.lesson3.painPoint4",
            "qimen.lessons.lesson3.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson3.instructorName",
            titleKey: "qimen.lessons.lesson3.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson3.instructorPoint1",
                "qimen.lessons.lesson3.instructorPoint2",
                "qimen.lessons.lesson3.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson3.benefit1Title", descKey: "qimen.lessons.lesson3.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson3.benefit2Title", descKey: "qimen.lessons.lesson3.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson3.benefit3Title", descKey: "qimen.lessons.lesson3.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson3.benefit4Title", descKey: "qimen.lessons.lesson3.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson3.benefit5Title", descKey: "qimen.lessons.lesson3.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson3.closing",
    },

    {
        id: 4,
        titleKey: "qimen.lessons.lesson4.title",
        subtitleKey: "qimen.lessons.lesson4.subtitle",
        duration: "~11 min",
        s3Key: "taichi/lesson-03-wudang-sanfeng-taichi-18-forms.mp4",
        coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson4.intro",
        painPointKeys: [
            "qimen.lessons.lesson4.painPoint1",
            "qimen.lessons.lesson4.painPoint2",
            "qimen.lessons.lesson4.painPoint3",
            "qimen.lessons.lesson4.painPoint4",
            "qimen.lessons.lesson4.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson4.instructorName",
            titleKey: "qimen.lessons.lesson4.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson4.instructorPoint1",
                "qimen.lessons.lesson4.instructorPoint2",
                "qimen.lessons.lesson4.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson4.benefit1Title", descKey: "qimen.lessons.lesson4.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson4.benefit2Title", descKey: "qimen.lessons.lesson4.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson4.benefit3Title", descKey: "qimen.lessons.lesson4.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson4.benefit4Title", descKey: "qimen.lessons.lesson4.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson4.benefit5Title", descKey: "qimen.lessons.lesson4.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson4.closing",
    },

    {
        id: 5,
        titleKey: "qimen.lessons.lesson5.title",
        subtitleKey: "qimen.lessons.lesson5.subtitle",
        duration: "~11 min",
        s3Key: "taichi/lesson-02-wudang-sanfeng-taichi-13-forms.mp4",
        coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson5.intro",
        painPointKeys: [
            "qimen.lessons.lesson5.painPoint1",
            "qimen.lessons.lesson5.painPoint2",
            "qimen.lessons.lesson5.painPoint3",
            "qimen.lessons.lesson5.painPoint4",
            "qimen.lessons.lesson5.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson5.instructorName",
            titleKey: "qimen.lessons.lesson5.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson5.instructorPoint1",
                "qimen.lessons.lesson5.instructorPoint2",
                "qimen.lessons.lesson5.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson5.benefit1Title", descKey: "qimen.lessons.lesson5.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson5.benefit2Title", descKey: "qimen.lessons.lesson5.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson5.benefit3Title", descKey: "qimen.lessons.lesson5.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson5.benefit4Title", descKey: "qimen.lessons.lesson5.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson5.benefit5Title", descKey: "qimen.lessons.lesson5.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson5.closing",
    },

    {
        id: 6,
        titleKey: "qimen.lessons.lesson6.title",
        subtitleKey: "qimen.lessons.lesson6.subtitle",
        duration: "~28 min",
        s3Key: "taichi/lesson-01-wudang-sanfeng-taichi-28-forms.mp4",
        coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson6.intro",
        painPointKeys: [
            "qimen.lessons.lesson6.painPoint1",
            "qimen.lessons.lesson6.painPoint2",
            "qimen.lessons.lesson6.painPoint3",
            "qimen.lessons.lesson6.painPoint4",
            "qimen.lessons.lesson6.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson6.instructorName",
            titleKey: "qimen.lessons.lesson6.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson6.instructorPoint1",
                "qimen.lessons.lesson6.instructorPoint2",
                "qimen.lessons.lesson6.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson6.benefit1Title", descKey: "qimen.lessons.lesson6.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson6.benefit2Title", descKey: "qimen.lessons.lesson6.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson6.benefit3Title", descKey: "qimen.lessons.lesson6.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson6.benefit4Title", descKey: "qimen.lessons.lesson6.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson6.benefit5Title", descKey: "qimen.lessons.lesson6.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson6.closing",
    },

    {
        id: 7,
        titleKey: "qimen.lessons.lesson7.title",
        subtitleKey: "qimen.lessons.lesson7.subtitle",
        duration: "~30 min",
        s3Key: "taichi/lesson-04-wudang-sanfeng-taichi-108-forms.mp4",
        coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",
        introKey: "qimen.lessons.lesson7.intro",
        painPointKeys: [
            "qimen.lessons.lesson7.painPoint1",
            "qimen.lessons.lesson7.painPoint2",
            "qimen.lessons.lesson7.painPoint3",
            "qimen.lessons.lesson7.painPoint4",
            "qimen.lessons.lesson7.painPoint5",
        ],
        instructor: {
            nameKey: "qimen.lessons.lesson7.instructorName",
            titleKey: "qimen.lessons.lesson7.instructorTitle",
            pointKeys: [
                "qimen.lessons.lesson7.instructorPoint1",
                "qimen.lessons.lesson7.instructorPoint2",
                "qimen.lessons.lesson7.instructorPoint3",
            ],
        },
        benefits: [
            { titleKey: "qimen.lessons.lesson7.benefit1Title", descKey: "qimen.lessons.lesson7.benefit1Desc" },
            { titleKey: "qimen.lessons.lesson7.benefit2Title", descKey: "qimen.lessons.lesson7.benefit2Desc" },
            { titleKey: "qimen.lessons.lesson7.benefit3Title", descKey: "qimen.lessons.lesson7.benefit3Desc" },
            { titleKey: "qimen.lessons.lesson7.benefit4Title", descKey: "qimen.lessons.lesson7.benefit4Desc" },
            { titleKey: "qimen.lessons.lesson7.benefit5Title", descKey: "qimen.lessons.lesson7.benefit5Desc" },
        ],
        closingKey: "qimen.lessons.lesson7.closing",
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

function PainPointsList({ items, t }) {
    return (
        <ul className="space-y-2.5">
            {items.map((itemKey, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className="mt-0.5 shrink-0 text-amber-500 font-bold text-base leading-none">✕</span>
                    <span>{t(itemKey)}</span>
                </li>
            ))}
        </ul>
    );
}

function BenefitsList({ items, t }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {items.map((b, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                        <span className="text-emerald-600 mr-1.5">✓</span>{t(b.titleKey)}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pl-5">{t(b.descKey)}</p>
                </div>
            ))}
        </div>
    );
}

function InstructorCard({ instructor, t }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div>
                <p className="text-sm font-bold text-slate-900">{t(instructor.nameKey)}</p>
                <p className="text-xs text-amber-700 mt-0.5">{t(instructor.titleKey)}</p>
            </div>
            <ul className="space-y-1.5">
                {instructor.pointKeys.map((ptKey, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="shrink-0 text-slate-400 mt-0.5">•</span>
                        <span>{t(ptKey)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LessonDetail({ lesson, t }) {
    return (
        <div className="space-y-5">
            {/* Intro */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {t(lesson.titleKey)}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {t(lesson.subtitleKey)}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                    {t(lesson.introKey)}
                </p>
            </div>

            {/* Pain Points */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>{t("qimen.whoIsThisFor")}</SectionTitle>
                <PainPointsList items={lesson.painPointKeys} t={t} />
            </div>

            {/* Benefits */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>{t("qimen.coreBenefits")}</SectionTitle>
                <BenefitsList items={lesson.benefits} t={t} />
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{t("qimen.instructor")}</SectionTitle>
                <InstructorCard instructor={lesson.instructor} t={t} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {t(lesson.closingKey)}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                {t("qimen.disclaimer")}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QimenPage({
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
                courseId: "taichi",
                videoKey: lesson.s3Key,
                videoTitle: t(lesson.titleKey),
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("tc-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleUnlockCourse() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("course", { courseId: "taichi" });
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: "taichi",
            videoKey: activeLesson.s3Key,
            videoTitle: t(activeLesson.titleKey),
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
                        alt={t(activeLesson.titleKey)}
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
                            {t("qimen.videoCourse")}
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                {t("qimen.sale")}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {t(COURSE.titleKey)}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {t(COURSE.subtitleKey)}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {t("qimen.lessonCount", { count: COURSE.lessonCount })}
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
                            {t("qimen.lessonUnlocked", { lessonId: activeLesson.id })}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {t("qimen.buyLesson", { lessonId: activeLesson.id, price: COURSE.lessonPrice })}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {t("qimen.signInToPurchase")}
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
                        {t("qimen.lessons")}
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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
                                        {t("qimen.lessonNumber", { number: lesson.id })}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {t(lesson.titleKey)}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            {t("qimen.unlocked")}
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
                    id="tc-video-player"
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
                                            {t("qimen.loading")}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{t("qimen.playbackError")}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {t("qimen.retry")}
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
                                        {t("qimen.videoNotSupported")}
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">
                                            {t("qimen.selectLesson")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{t("qimen.locked")}</p>
                                    <p className="text-sm text-white/70">
                                        {t("qimen.purchaseToUnlock")}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleBuyActiveVideo}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {t("qimen.buyLessonShort", { lessonId: activeLesson.id, price: COURSE.lessonPrice })}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {t("qimen.signInToPurchaseShort")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            {t("qimen.nowPlaying")}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {t("qimen.lessonNumberWithTitle", { number: activeLesson.id, title: t(activeLesson.titleKey) })}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t(activeLesson.subtitleKey)}
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
                            {t("qimen.lessonFullDescription", { number: activeLesson.id })}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {t("qimen.switchLessons")}
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} t={t} />
                </motion.div>

            </main>
        </div>
    );
}
