// src/pages/GuaShaPage.jsx
// 16 Facial Anti-Aging Gua Sha Course — single course, one video file

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
    const { t } = useTranslation();
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imgError, setImgError] = useState(false);

    // Build course data from translations
    const COURSE = {
        titleEn: t("guasha.title"),
        tagline: t("guasha.tagline"),
        mainTitle: t("guasha.mainTitle"),
        cardTitle: t("guasha.cardTitle"),
        cardSubtitle: t("guasha.cardSubtitle"),
        priceNow: t("guasha.priceNow"),
        priceOld: t("guasha.priceOld"),
        sale: true,
        courseId: "guasha",
        s3Key: "FacialGuaSha/guasha-course.mp4",
        coverImage: "/images/guasha-face.jpg",
        fallbackImage: "/images/face-yoga-masterclass.jpg",
    };

    // Build chapters from translations
    const CHAPTERS = Array.from({ length: 16 }, (_, i) => {
        const id = i + 1;
        return {
            id,
            titleEn: t(`guasha.chapters.chapter${id}.title`),
            desc: t(`guasha.chapters.chapter${id}.desc`),
            timestamp: t(`guasha.chapters.chapter${id}.timestamp`),
        };
    });

    const PAIN_POINTS = Array.from({ length: 9 }, (_, i) =>
        t(`guasha.painPoints.${i}`)
    );

    const WHY_POINTS = Array.from({ length: 7 }, (_, i) => ({
        title: t(`guasha.whyPoints.${i}.title`),
        desc: t(`guasha.whyPoints.${i}.desc`),
    }));

    const WHO_POINTS = Array.from({ length: 7 }, (_, i) =>
        t(`guasha.whoPoints.${i}`)
    );

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
                setError(data?.error || t("guasha.videoError"));
                return;
            }
            if (!data?.url || typeof data.url !== "string" || !data.url.startsWith("https://")) {
                setError(t("guasha.videoInvalid"));
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError(t("guasha.networkError"));
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
                            {t("guasha.videoCourse")}
                        </span>
                        {COURSE.sale && (
                            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                                {t("guasha.sale")}
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {COURSE.titleEn}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {COURSE.tagline}
                    </p>
                    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                        <p className="text-sm font-bold text-slate-900 leading-relaxed">
                            {COURSE.mainTitle}
                        </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-base text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {t("guasha.chaptersInfo")}
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
                            {t("guasha.unlocked")}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleUnlockCourse}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {t("guasha.unlockButton", { price: COURSE.priceNow })}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {t("guasha.signInPrompt")}
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
                    <p className="text-sm font-bold uppercase tracking-wide text-slate-900 mb-3">
                        {t("guasha.transformationTitle")}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                        {t("guasha.timestampNote")}
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
                                        {ch.timestamp && ch.timestamp !== "null" && (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-500 shrink-0">
                                                （{ch.timestamp}）
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
                                </div>
                                {isOwned ? (
                                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                        {t("guasha.chapterUnlocked")}
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
                                            {t("guasha.loading")}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{t("guasha.playbackError")}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={fetchSignedUrl}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {t("guasha.retry")}
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
                                        {t("guasha.videoNotSupported")}
                                    </video>
                                )}
                                {!error && !loading && !videoUrl && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <p className="text-sm text-white/70">{t("guasha.loadingVideo")}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{t("guasha.locked")}</p>
                                    <p className="text-sm text-white/70">
                                        {t("guasha.purchasePrompt")}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {t("guasha.unlockCourseButton", { price: COURSE.priceNow })}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {t("guasha.signInToPurchase")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Now Playing bar */}
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">
                            {t("guasha.courseVideoLabel")}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {t("guasha.courseVideoTitle")}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {t("guasha.videoInfo")}
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
                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("guasha.painPointsTitle")}
                        </h3>
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
                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("guasha.whyTitle")}
                        </h3>
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
                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("guasha.whoTitle")}
                        </h3>
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
                            {t("guasha.ctaLine1")}<br />
                            {t("guasha.ctaLine2")}<br />
                            {t("guasha.ctaLine3")}
                        </p>
                        <p className="text-base font-semibold text-white">
                            {t("guasha.ctaMain")}
                        </p>
                        <p className="text-sm text-white/70">
                            {t("guasha.ctaBenefitsIntro")}<br />
                            <span className="text-white font-medium">{t("guasha.ctaBenefits")}</span>
                        </p>
                        <p className="text-sm font-semibold text-amber-400">
                            {t("guasha.ctaClosing")}
                        </p>
                        {!isOwned && (
                            <button
                                onClick={handleUnlockCourse}
                                className="mt-2 inline-block rounded-2xl bg-amber-500 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400 transition"
                            >
                                {t("guasha.ctaButton", { price: COURSE.priceNow })}
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* ══ DISCLAIMER ══ */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                    {t("guasha.disclaimer")}
                </div>

            </main>
        </div>
    );
}
