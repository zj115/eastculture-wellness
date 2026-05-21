// src/pages/WingChunPage.jsx
// Wing Chun course portal — Multilingual

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

function FormsList({ forms }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {forms.map((f, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2"
                >
                    <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 mt-0.5">
                            {f.num}
                        </span>
                        <p className="text-sm font-semibold text-slate-900 leading-snug">
                            {f.name}
                        </p>
                    </div>
                    <div className="pl-10 space-y-1.5">
                        <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-amber-700">{f.forLabel} </span>
                            {f.relieves}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">{f.howLabel} </span>
                            {f.core}
                        </p>
                        {f.benefit && (
                            <p className="text-xs text-emerald-700 leading-relaxed">
                                <span className="font-semibold">{f.benefitLabel} </span>
                                {f.benefit}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AdvantagesGrid({ items }) {
    return (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {items.map((a, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5"
                >
                    <div className="text-2xl">{a.icon}</div>
                    <p className="text-sm font-semibold text-slate-900 leading-snug">{a.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                </div>
            ))}
        </div>
    );
}

function CheckList({ items, color = "emerald" }) {
    const dotColor = color === "emerald" ? "text-emerald-600" : "text-amber-600";
    return (
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-snug">
                    <span className={`mt-0.5 shrink-0 font-bold text-base leading-none ${dotColor}`}>✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function LessonDetail({ lesson, lessonId, t }) {
    const lessonKey = `wingchun.lessons.lesson${lessonId}`;

    // Build pain points array
    const painPoints = [];
    let i = 0;
    while (t(`${lessonKey}.painPoints.${i}`, { defaultValue: null })) {
        painPoints.push(t(`${lessonKey}.painPoints.${i}`));
        i++;
    }

    // Build forms array
    const formsCount = lessonId === 1 ? 10 : 9;
    const forms = [];
    for (let j = 0; j < formsCount; j++) {
        const formKey = `${lessonKey}.forms.${j}`;
        forms.push({
            num: j + 1,
            name: t(`${formKey}.name`),
            relieves: t(`${formKey}.relieves`),
            core: t(`${formKey}.core`),
            benefit: t(`${formKey}.benefit`, { defaultValue: '' }),
            forLabel: t('wingchun.forLabel'),
            howLabel: t('wingchun.howLabel'),
            benefitLabel: t('wingchun.benefitLabel'),
        });
    }

    // Build advantages array
    const advantages = [];
    let k = 0;
    while (t(`${lessonKey}.advantages.${k}.title`, { defaultValue: null })) {
        advantages.push({
            icon: t(`${lessonKey}.advantages.${k}.icon`),
            title: t(`${lessonKey}.advantages.${k}.title`),
            desc: t(`${lessonKey}.advantages.${k}.desc`),
        });
        k++;
    }

    // Build audience array
    const audience = [];
    let m = 0;
    while (t(`${lessonKey}.audience.${m}`, { defaultValue: null })) {
        audience.push(t(`${lessonKey}.audience.${m}`));
        m++;
    }

    // Build gains array
    const gains = [];
    let n = 0;
    while (t(`${lessonKey}.gains.${n}`, { defaultValue: null })) {
        gains.push(t(`${lessonKey}.gains.${n}`));
        n++;
    }

    const label = t(`${lessonKey}.formsLabel`, { defaultValue: t('wingchun.courseContent') });

    return (
        <div className="space-y-5">
            {/* ── Intro card ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {t(`${lessonKey}.title`)}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {t(`${lessonKey}.subtitle`)}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                    {t(`${lessonKey}.intro`)}
                </p>
            </div>

            {/* ── Pain Points ── */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>{t('wingchun.painPointsTitle')}</SectionTitle>
                <PainPointsList items={painPoints} />
            </div>

            {/* ── Forms / Scenarios ── */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <SectionTitle>{label}</SectionTitle>
                    <span className="mb-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {label}
                    </span>
                </div>
                <FormsList forms={forms} />
            </div>

            {/* ── Advantages ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>{t('wingchun.advantagesTitle')}</SectionTitle>
                <AdvantagesGrid items={advantages} />
            </div>

            {/* ── Audience + Gains side by side on desktop, stacked on mobile ── */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                    <SectionTitle>{t('wingchun.audienceTitle')}</SectionTitle>
                    <CheckList items={audience} color="amber" />
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                    <SectionTitle>{t('wingchun.gainsTitle')}</SectionTitle>
                    <CheckList items={gains} color="emerald" />
                </div>
            </div>

            {/* ── Closing ── */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {t(`${lessonKey}.closing`)}
                </p>
            </div>

            {/* ── Disclaimer ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                {t('wingchun.disclaimer')}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function WingChunPage({
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

    // Build lessons from translations
    const LESSONS = useMemo(() => [
        {
            id: 1,
            s3Key: "wingchun/lesson-01-yangsheng-ten-styles.mp4",
            coverImage: "/images/wingchun-yangsheng.png",
            fallbackImage: "/images/wingchun-hero.jpg",
        },
        {
            id: 2,
            s3Key: "wingchun/lesson-02-fangwei-nine-styles.mp4",
            coverImage: "/images/wingchun-fangwei.png",
            fallbackImage: "/images/wingchun-hero.jpg",
        },
    ], []);

    const COURSE = useMemo(() => ({
        lessonPrice: t('wingchun.lessonPrice'),
        lessonPriceOld: t('wingchun.lessonPriceOld'),
        sale: true,
    }), [t]);

    const activeLesson = useMemo(
        () => LESSONS.find((x) => x.id === activeLessonId) || LESSONS[0],
        [activeLessonId, LESSONS]
    );

    // reset imgError when lesson changes
    useEffect(() => { setImgError(false); }, [activeLessonId]);

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
        const hasAccess =
            isOwned ||
            purchases.some((p) => {
                if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                return p.purchase_type === "video" && p.video_key === lesson.s3Key;
            });

        if (!hasAccess) {
            if (authLoading) return;
            if (!isLoggedIn) { onGoLogin?.(); return; }
            onPurchase?.("video", {
                courseId: "wingchun",
                videoKey: lesson.s3Key,
                videoTitle: t(`wingchun.lessons.lesson${lesson.id}.title`),
            });
            return;
        }
        setActiveLessonId(lesson.id);
        setTimeout(() => {
            const el = document.getElementById("wc-video-player");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }

    function handleBuyActiveVideo() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: "wingchun",
            videoKey: activeLesson.s3Key,
            videoTitle: t(`wingchun.lessons.lesson${activeLesson.id}.title`),
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
                        alt={t(`wingchun.lessons.lesson${activeLesson.id}.title`)}
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
                            {t('wingchun.videoCourse')}
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                {t('wingchun.sale')}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {t('wingchun.courseTitle')}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {t('wingchun.courseSubtitle')}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {t('wingchun.lessonsInfo')}
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
                            {t('wingchun.lessonUnlocked', { lessonId: activeLesson.id })}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {t('wingchun.buyLesson', { lessonId: activeLesson.id, price: COURSE.lessonPrice })}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {t('wingchun.signInPrompt')}
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
                        {t('wingchun.lessonsLabel')}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {LESSONS.map((lesson) => {
                            const hasAccess =
                                isOwned ||
                                purchases.some((p) => {
                                    if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                                    return p.purchase_type === "video" && p.video_key === lesson.s3Key;
                                });
                            const active = lesson.id === activeLessonId;
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleSelectLesson(lesson)}
                                    className={[
                                        "relative flex flex-col items-start gap-1.5 rounded-2xl border px-4 py-3.5 text-left transition-all",
                                        active
                                            ? "border-amber-400 bg-amber-50 shadow-sm"
                                            : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-amber-500" />
                                    )}
                                    {!hasAccess && !active && (
                                        <span className="absolute right-3 top-3 text-[13px] text-slate-400">🔒</span>
                                    )}
                                    <span className="text-[11px] uppercase tracking-wide text-slate-400">
                                        {t('wingchun.lessonLabel', { lessonId: lesson.id })}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 leading-snug pr-4">
                                        {t(`wingchun.lessons.lesson${lesson.id}.title`)}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {t(`wingchun.lessons.lesson${lesson.id}.tag`)} · {t(`wingchun.lessons.lesson${lesson.id}.duration`)}
                                    </span>
                                    {hasAccess ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                            {t('wingchun.unlocked')}
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] text-amber-700">
                                            {t('wingchun.pricePerLesson')}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    id="wc-video-player"
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
                                            {t('wingchun.loading')}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{t('wingchun.playbackError')}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {t('wingchun.retry')}
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
                                        {t('wingchun.videoNotSupported')}
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">
                                            {t('wingchun.selectLesson')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{t('wingchun.locked')}</p>
                                    <p className="text-sm text-white/70">
                                        {t('wingchun.purchasePrompt')}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleBuyActiveVideo}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {t('wingchun.buyLesson', { lessonId: activeLesson.id, price: COURSE.lessonPrice })}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {t('wingchun.signInToPurchase')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            {t('wingchun.nowPlaying')}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {t('wingchun.lessonLabel', { lessonId: activeLesson.id })} · {t(`wingchun.lessons.lesson${activeLesson.id}.title`)}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t(`wingchun.lessons.lesson${activeLesson.id}.subtitle`)}
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
                            {t('wingchun.lessonDetailTitle', { lessonId: activeLesson.id })}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {t('wingchun.lessonDetailSubtitle')}
                        </p>
                    </div>
                    <LessonDetail lesson={activeLesson} lessonId={activeLesson.id} t={t} />
                </motion.div>

            </main>
        </div>
    );
}
