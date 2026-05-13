// src/pages/FaceYogaPage.jsx
// Face Yoga & Facial Massage Masterclass — single video course

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    courseId: "faceyoga",
    s3Key: "face-yoga/4月10日_x264.mp4",
    coverImage: "/images/face-yoga-masterclass.jpg",
};

export default function FaceYogaPage({
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

    const canPlay = isOwned || purchases.some((p) => {
        if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
        return (
            (p.purchase_type === "course" && p.course_id === COURSE.courseId) ||
            (p.purchase_type === "video" && p.video_key === COURSE.s3Key)
        );
    });

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
                setError(data?.error || t("faceYoga.playbackError"));
                return;
            }
            if (!data?.url || typeof data.url !== "string" || !data.url.startsWith("https://")) {
                setError(t("faceYoga.playbackError"));
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError(t("faceYoga.playbackError"));
        } finally {
            setLoading(false);
        }
    };

    function handleBuy() {
        if (!isLoggedIn) { onGoLogin?.(); return; }
        onPurchase?.("video", {
            courseId: COURSE.courseId,
            videoKey: COURSE.s3Key,
            videoTitle: t("faceYoga.title"),
        });
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
                        src={COURSE.coverImage}
                        alt={t("faceYoga.title")}
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
                            {t("faceYoga.videoCourse")}
                        </span>
                        <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                            {t("faceYoga.sale")}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                        {t("faceYoga.title")}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {t("faceYoga.subtitle")}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{t("faceYoga.priceNow")}</span>
                        <span className="text-base text-slate-400 line-through">{t("faceYoga.priceOld")}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {t("faceYoga.courseInfo")}
                        </span>
                    </div>
                </motion.div>

                {/* ══ PURCHASE BUTTON ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-6 space-y-3"
                >
                    {canPlay ? (
                        <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                            {t("faceYoga.unlocked")}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleBuy}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                {t("faceYoga.buyButton", { price: t("faceYoga.priceNow") })}
                            </button>
                            {!isLoggedIn && (
                                <p className="text-center text-xs text-amber-700 pt-1">
                                    {t("faceYoga.signInPrompt")}
                                </p>
                            )}
                        </>
                    )}
                </motion.div>

                {/* ══ VIDEO PLAYER ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                        {canPlay ? (
                            <div className="relative w-full">
                                {loading && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                                            {t("faceYoga.loading")}
                                        </div>
                                    </div>
                                )}
                                {error && !loading && (
                                    <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                        <div>
                                            <p className="text-base font-semibold">{t("faceYoga.playbackError")}</p>
                                            <p className="mt-2 text-sm text-white/70">{error}</p>
                                            <button
                                                onClick={fetchSignedUrl}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900"
                                            >
                                                {t("faceYoga.retry")}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {!error && !loading && videoUrl && (
                                    <video
                                        controls playsInline preload="metadata"
                                        crossOrigin="anonymous"
                                        className="w-full"
                                        style={{ display: "block", aspectRatio: "16/9" }}
                                    >
                                        <source src={videoUrl} type="video/mp4" />
                                        {t("faceYoga.videoNotSupported")}
                                    </video>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">{t("faceYoga.locked")}</p>
                                    <p className="text-sm text-white/70">
                                        {t("faceYoga.purchasePrompt")}
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleBuy}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            {t("faceYoga.buyCourseButton", { price: t("faceYoga.priceNow") })}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onGoLogin?.()}
                                            className="mt-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
                                        >
                                            {t("faceYoga.signInToPurchase")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ══ DISCLAIMER ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.4, delay: 0.15 }}
                >
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                        {t("faceYoga.disclaimer")}
                    </div>
                </motion.div>

            </main>
        </div>
    );
}
