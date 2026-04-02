// src/pages/WingChunPage.jsx
// Wing Chun (咏春) 课程门户页
// 完全复用 QigongPage (AcupressurePage) 的架构模式
// App.jsx 传入：lang, currentUser, authLoading, isOwned, purchases, onPurchase, onGoLogin

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// S3 视频文件夹前缀（上传视频时需对应此路径）
const S3_PREFIX = "wingchun/";

// ---- 课程列表 ----
// 用户需要将以下视频上传至 S3 对应路径：
//   wingchun/lesson-01-yangsheng-ten-styles.mp4   ← 咏春拳养生十式
//   wingchun/lesson-02-fangwei-nine-styles.mp4    ← 咏春拳防卫九式
const LESSONS = [
    {
        id: 1,
        titleZh: "咏春拳养生十式",
        titleEn: "Wing Chun Health Qigong – 10 Forms",
        duration: "~7 min",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-01-yangsheng-ten-styles.mp4`,
        coverImage: "/images/wing-chun-yangsheng-cover.jpg",
        tagZh: "养生·全身调理",
        tagEn: "Wellness · Full-body care",
        descZh: "只需 7 分钟，针对颈肩酸痛、腰腿僵硬、睡眠不好、手脚冰凉等常见亚健康问题，安全轻柔，老少皆宜。",
        descEn: "Just 7 minutes a day. Targets neck stiffness, lower back pain, poor sleep and cold limbs. Gentle, safe, suitable for all ages.",
        highlights: [
            { zh: "招式 1：站桩根基式 — 增强体力，改善手脚冰凉", en: "Form 1: Stance Foundation – boost energy, warm cold limbs" },
            { zh: "招式 2：颈肩放松式 — 缓解颈肩僵硬、头晕、手麻", en: "Form 2: Neck & Shoulder Release – ease stiffness, dizziness, numb hands" },
            { zh: "招式 3：开胸调气式 — 改善胸闷、呼吸短、情绪低落", en: "Form 3: Chest Opening – relieve chest tightness, improve breathing and mood" },
            { zh: "招式 4：腰髋放松式 — 缓解久坐腰酸、脊椎僵硬", en: "Form 4: Waist & Hip Relax – ease sitting-induced back pain and spine stiffness" },
            { zh: "招式 5–10：全身拉伸、膝踝护理、手腕激活、呼吸调息、经络疏通、收功归气", en: "Forms 5–10: full-body stretch, knee/ankle care, wrist activation, breath regulation, meridian opening, closing form" },
        ],
    },
    {
        id: 2,
        titleZh: "咏春拳防卫九式",
        titleEn: "Wing Chun Self-Defense – 9 Forms",
        duration: "~7 min",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-02-fangwei-nine-styles.mp4`,
        coverImage: "/images/wing-chun-fangwei-cover.png",
        tagZh: "防身·实用自卫",
        tagEn: "Self-defense · Real situations",
        descZh: "以技巧胜力量，不需要体力和武术基础。针对街头、电梯、被抓等真实危险场景，即学即用，女性、老人同样适用。",
        descEn: "Skill over strength. No fitness or martial arts background needed. Covers real scenarios: street attacks, elevators, grabs and bear hugs. Works for women and seniors too.",
        highlights: [
            { zh: "第1式：摊手+步法+连环冲拳 — 面对直拳快速化解反击", en: "Form 1: Tan Sau + Step + Chain Punch – deflect and counter a straight punch" },
            { zh: "第2式：伏手+冲拳 — 卸力反推，化解重力攻击", en: "Form 2: Fu Sau + Punch – redirect heavy attacks and push attacker off balance" },
            { zh: "第3式：拉手对摆拳 — 化解摆拳，控制攻击路径", en: "Form 3: Lap Sau vs. Swing Punch – redirect hooks and open counter gaps" },
            { zh: "第4式：膀手+滚+挂捶 — 电梯近身，防守反击", en: "Form 4: Bong Sau + Roll + Hook – close-quarters defense in tight spaces" },
            { zh: "第5–9式：双手拍打控制、冲拳控距、摧劲截击、肘控脱险、马步后击（后抱解脱）", en: "Forms 5–9: double slap control, step & slap, cross finger strike, elbow escape, horse stance rear counter" },
        ],
    },
];

// ---- 课程整体信息 ----
const DETAILS = {
    titleEn: "Wing Chun Foundations",
    titleZh: "咏春基础课",
    categoryEn: "VIDEO COURSE",
    categoryZh: "视频课程",
    priceNow: "NZD 29",
    priceOld: "NZD 49",
    sale: true,
    introEn: "2 complete video lessons — Health Qigong + Self-Defense. Lifetime access.",
    introZh: "2 节完整视频课：养生十式 + 防卫九式，购买后永久观看。",
    highlights: [
        { en: "No martial arts background needed", zh: "无需武术基础，零门槛上手" },
        { en: "Each video is ~7 min — easy to fit in your day", zh: "每节约 7 分钟，随时练习" },
    ],
};

export default function WingChunPage({
    lang,
    currentUser,
    authLoading = false,
    isOwned: isOwnedProp,
    purchases = [],
    onPurchase,
    onGoLogin,
}) {
    const isZh = lang === "zh";
    const isLoggedIn = !!currentUser;
    const isOwned = !!isOwnedProp;

    const [activeLessonId, setActiveLessonId] = useState(1);
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const activeLesson = useMemo(
        () => LESSONS.find((x) => x.id === activeLessonId) || LESSONS[0],
        [activeLessonId]
    );

    // 判断当前选中课时是否有播放权限
    const canPlayActive = useMemo(() => {
        if (isOwned) return true;
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
            return p.purchase_type === "video" && p.video_key === activeLesson.s3Key;
        });
    }, [isOwned, activeLesson, purchases]);

    // 从后端请求 S3 presigned URL（含鉴权，未购买者后端会拒绝）
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
                setError(data?.error || (isZh ? "获取视频链接失败" : "Failed to load video URL"));
                return;
            }
            if (!data?.url || typeof data.url !== "string") {
                setError(isZh ? "后端没有返回可用的链接" : "Backend returned no usable URL");
                return;
            }
            if (!data.url.startsWith("https://")) {
                setError(isZh ? "视频链接格式异常" : "URL is not https (may be blocked)");
                return;
            }
            setVideoUrl(data.url);
        } catch {
            setError(isZh ? "网络错误：无法连接后端" : "Network error: cannot reach backend");
        } finally {
            setLoading(false);
        }
    };

    // 点击课时列表中的某节课
    function handleSelectLesson(lesson) {
        const hasAccess =
            isOwned ||
            purchases.some((p) => {
                if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                return p.purchase_type === "video" && p.video_key === lesson.s3Key;
            });

        if (!hasAccess) {
            if (authLoading) return;
            if (!isLoggedIn) {
                onGoLogin?.();
            } else {
                const title = isZh ? lesson.titleZh : lesson.titleEn;
                onPurchase?.("video", {
                    courseId: "wingchun",
                    videoKey: lesson.s3Key,
                    videoTitle: title,
                });
            }
            return;
        }
        setActiveLessonId(lesson.id);
        const el = document.getElementById("wc-video-player");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // 购买整套课程
    function handleUnlockCourse() {
        if (!isLoggedIn) {
            onGoLogin?.();
            return;
        }
        onPurchase?.("course", { courseId: "wingchun" });
    }

    // 购买单节课
    function handleBuyActiveVideo() {
        if (!isLoggedIn) {
            onGoLogin?.();
            return;
        }
        const title = isZh ? activeLesson.titleZh : activeLesson.titleEn;
        onPurchase?.("video", {
            courseId: "wingchun",
            videoKey: activeLesson.s3Key,
            videoTitle: title,
        });
    }

    // 权限变化 / 切换课时时重新请求 presigned URL
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

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">

                {/* ── 顶部：封面 + 购买卡片 ── */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-[1.6fr_1fr] items-start"
                >
                    {/* 封面图 */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img
                            src={activeLesson.coverImage}
                            alt={isZh ? "咏春课程封面" : "Wing Chun course cover"}
                            className="h-full w-full object-cover max-h-[380px]"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/images/martial-staff-demo.jpg";
                            }}
                        />
                    </div>

                    {/* 购买卡片 */}
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
                            <span className="text-lg font-semibold text-slate-900">{DETAILS.priceNow}</span>
                            <span className="text-sm text-slate-400 line-through">{DETAILS.priceOld}</span>
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
                                <div key={idx}>• {isZh ? it.zh : it.en}</div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-2">
                            {/* 整套课程购买按钮 */}
                            {isOwned ? (
                                <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                                    {isZh ? "✓ 已解锁 · 全套课程" : "✓ Unlocked · Full Course"}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleUnlockCourse}
                                    className="w-full rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition"
                                >
                                    {isZh
                                        ? `购买并解锁全套课程 ${DETAILS.priceNow}`
                                        : `Unlock Full Course ${DETAILS.priceNow}`}
                                </button>
                            )}

                            {/* 购买单节课按钮 */}
                            {!isOwned && (
                                <button
                                    type="button"
                                    onClick={handleBuyActiveVideo}
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                                >
                                    {isZh
                                        ? `单独购买本课时 NZD 10`
                                        : `Buy This Lesson Only NZD 10`}
                                </button>
                            )}

                            {!isLoggedIn && (
                                <p className="text-xs text-amber-700">
                                    {isZh
                                        ? "请先登录后购买并观看课程。"
                                        : "Please sign in to purchase and watch."}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* ── 视频播放器 + 课时列表 ── */}
                <motion.section
                    id="wc-video-player"
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-10 grid gap-8 md:grid-cols-[1fr_360px] items-start"
                >
                    {/* 左：视频播放区 */}
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
                                        <p className="text-2xl mb-2">🔒</p>
                                        <p className="text-lg font-semibold">{isZh ? "内容已锁定" : "Locked"}</p>
                                        <p className="mt-2 text-sm text-white/80">
                                            {isZh
                                                ? "购买后即可解锁并观看全部视频。"
                                                : "Purchase the course to unlock all videos."}
                                        </p>
                                        {isLoggedIn ? (
                                            <button
                                                onClick={handleUnlockCourse}
                                                className="mt-4 rounded-2xl bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400"
                                            >
                                                {isZh ? `解锁全套课程 ${DETAILS.priceNow}` : `Unlock Course ${DETAILS.priceNow}`}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onGoLogin?.()}
                                                className="mt-4 rounded-2xl bg-white/20 border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/30"
                                            >
                                                {isZh ? "登录后购买" : "Sign in to purchase"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 当前播放信息 */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                            <p className="text-xs text-slate-500">{isZh ? "正在播放" : "Now playing"}</p>
                            <p className="mt-1 text-base font-semibold text-slate-900">
                                {isZh
                                    ? `第 ${activeLesson.id} 课：${activeLesson.titleZh}`
                                    : `Lesson ${activeLesson.id}: ${activeLesson.titleEn}`}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                {isZh ? activeLesson.tagZh : activeLesson.tagEn}
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                                {isZh ? activeLesson.descZh : activeLesson.descEn}
                            </p>
                        </div>

                        {/* 课时要点 */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-2">
                            <h3 className="text-sm font-semibold text-slate-900">
                                {isZh ? "本课要点" : "Lesson Highlights"}
                            </h3>
                            <ul className="space-y-1.5 text-xs text-slate-600">
                                {activeLesson.highlights.map((h, idx) => (
                                    <li key={idx}>• {isZh ? h.zh : h.en}</li>
                                ))}
                            </ul>
                        </div>

                        {/* 免责声明 */}
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                            {isZh
                                ? "温馨提示：请在安全、空间足够的环境下练习。所有示范仅为教学用途，不鼓励任何形式的暴力冲突。"
                                : "Note: Please train in a safe environment with enough space. All demonstrations are for educational purposes only and do not encourage violence."}
                        </div>
                    </div>

                    {/* 右：课时列表 */}
                    <aside className="space-y-3">
                        <div className="flex items-end justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                                {isZh ? "课程目录" : "Lessons"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {LESSONS.length} {isZh ? "节" : "total"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            {LESSONS.map((lesson) => {
                                const hasAccess =
                                    isOwned ||
                                    purchases.some((p) => {
                                        if (p.expires_at && new Date(p.expires_at) < new Date()) return false;
                                        return (
                                            p.purchase_type === "video" &&
                                            p.video_key === lesson.s3Key
                                        );
                                    });
                                const locked = !hasAccess;
                                const active = lesson.id === activeLessonId;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleSelectLesson(lesson)}
                                        className={[
                                            "flex w-full items-start justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition",
                                            active
                                                ? "border-amber-300 bg-amber-50"
                                                : "border-slate-200 bg-white hover:bg-slate-50",
                                            locked ? "opacity-70" : "opacity-100",
                                        ].join(" ")}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {isZh
                                                    ? `第 ${lesson.id} 课 · ${lesson.titleZh}`
                                                    : `Lesson ${lesson.id} · ${lesson.titleEn}`}
                                            </p>
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {isZh ? lesson.tagZh : lesson.tagEn}
                                            </p>
                                            <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                                                {isZh ? lesson.descZh : lesson.descEn}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 flex-col items-end gap-1 text-xs pt-0.5">
                                            {locked ? (
                                                <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
                                                    🔒 {isZh ? "购买解锁" : "Buy NZD 10"}
                                                </span>
                                            ) : (
                                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                                                    {isZh ? "已解锁" : "Unlocked"}
                                                </span>
                                            )}
                                            <span className="text-slate-400">{lesson.duration}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* 课程介绍卡 */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-3 mt-4">
                            <h3 className="text-sm font-semibold text-slate-900">
                                {isZh ? "为什么选择咏春？" : "Why Wing Chun?"}
                            </h3>
                            <p className="text-xs text-slate-600">
                                {isZh
                                    ? "咏春是一套紧凑、实用、讲究结构与效率的拳法。无论是用于日常养生调理，还是掌握实用防卫技能，都不需要强壮的体格或大量时间投入。每节课约 7 分钟，随时可以练习。"
                                    : "Wing Chun is compact, efficient and structure-based — whether you want daily health benefits or practical self-defense skills, no special fitness or large time commitment is needed. Each lesson is around 7 minutes."}
                            </p>
                            <ul className="space-y-1 text-xs text-slate-600">
                                <li>• {isZh ? "零基础友好，老少皆宜" : "Beginner-friendly, all ages welcome"}</li>
                                <li>• {isZh ? "每节约 7 分钟，随时随地练" : "~7 min per lesson, anywhere anytime"}</li>
                                <li>• {isZh ? "购买后永久访问，不限次观看" : "Lifetime access after purchase"}</li>
                                <li>• {isZh ? "安全低强度，不会受伤" : "Safe, low-impact, no injury risk"}</li>
                            </ul>
                        </div>
                    </aside>
                </motion.section>
            </main>
        </div>
    );
}
