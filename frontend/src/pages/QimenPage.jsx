// src/pages/QimenPage.jsx
// Tai Chi System Course 二级页面（4节课版）
// App.jsx 传入 lang（zh/en）与 onBack（返回课程列表）

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ✅ 关键：你 S3 里文件夹叫 taichi/（不是 tai-chi/）
const S3_PREFIX = "taichi/";

// ✅ 图片放在 frontend/public/images/tai-chi/ 下面（Vite 会从 /images 读）
const IMG_PREFIX = "/images/tai-chi/";

// ✅ 每节课都带：标题 + 多段落 + 列表 + 亮点（切换课时自动换）
const LESSONS = [
    {
        id: 1,
        titleZh: "五行养生功",
        titleEn: "Five Elements Guiding Qigong",
        image: `${IMG_PREFIX}lesson-01-five-element-wellness-qigong.png`,
        duration: "10–20 min",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-01-five-element-wellness-qigong.mp4`,

        introTitleZh: "本节课介绍",
        introTitleEn: "Lesson Introduction",

        introZh: {
            paragraphs: [
                "这一节你可以理解成：一套“有方向”的养生功，不是随便拉伸活动一下就结束。",
                "它用“五行对应五脏”的思路，把五个动物式（龟、龙、鹤、虎、蛇）串成一套系统练法：你练的每一个动作，都更像是在“对准”某个身体系统去调。",
                "如果你平时压力大、睡不稳、容易累、气血不顺，或者你练过一些养生视频但总觉得乱，这套就很适合当你的“固定日常”。",
                "练的时候不用追求用力大，也不需要大空间。你只要跟着节奏走：站稳→放松→呼吸顺→动作连贯，身体就会慢慢记住那种“稳、松、顺”的感觉。",
            ],
            bulletsTitle: "你可能正在遇到这些情况：",
            bullets: [
                "情绪容易烦躁，压力一大就睡不好、心很乱",
                "总是疲惫，精力不够用，腰膝容易酸",
                "消化一般，吃一点就胀，或胃口不稳定",
                "一换季就容易不舒服，气短、没劲、容易感冒",
                "网上视频看了一堆，但越练越乱，不知道先练什么",
            ],
            highlightTitle: "你练完通常会有这些感觉：",
            highlight: [
                "身体更“顺”，肩颈/胸口那种紧的感觉会松一点",
                "呼吸更深更稳，脑子更安静，睡前练也很舒服",
                "动作不难，但很“整体”，更容易坚持下去",
            ],
        },

        introEn: {
            paragraphs: [
                "This lesson is a structured daily routine—not random stretching or isolated movements.",
                "Based on the Five Elements and Five Zang-Organs framework, you’ll practise five animal-inspired forms (Turtle, Dragon, Crane, Tiger, Snake) in a connected sequence, so each movement feels purposeful and targeted.",
                "If you feel tired, stressed, sleep lightly, or you’ve tried scattered videos but never built a stable foundation, this lesson gives you a clear path: stand well → relax → breathe naturally → move smoothly.",
                "No large space or advanced flexibility is required. Keep it gentle, consistent, and your body will gradually absorb that “stable + relaxed + flowing” Tai Chi rhythm.",
            ],
            bulletsTitle: "This helps if you often feel:",
            bullets: [
                "Stressed or restless with light sleep",
                "Low energy with soreness in the waist/knees",
                "Digestive discomfort or bloating",
                "Seasonal sensitivity, fatigue, breathlessness",
                "Confused by scattered online videos without a system",
            ],
            highlightTitle: "After practice, many people notice:",
            highlight: [
                "More openness and smoothness in the body",
                "Calmer breathing and a quieter mind",
                "A routine that feels simple yet complete—and easy to stick with",
            ],
        },
    },

    {
        id: 2,
        titleZh: "六字诀呼吸法",
        titleEn: "Six Healing Sounds Breathing",
        image: `${IMG_PREFIX}lesson-02-six-healing-sounds-breathing.png`,
        duration: "10–20 min",
        canPreview: true,
        s3Key: `${S3_PREFIX}lesson-02-six-healing-sounds-breathing.mp4`,

        introTitleZh: "本节课介绍",
        introTitleEn: "Lesson Introduction",

        introZh: {
            paragraphs: [
                "这一节超级适合“想快速恢复状态”的人：主打用呼吸 + 发声来调气。",
                "你会练到六个音：嘘、呵、呼、思、吹、嘻。听起来像在念字，其实是配合口型、呼气长度、节奏，让身体慢慢从紧绷切回“放松模式”。",
                "它的优点就是：动作很少、几乎不挑场地，办公室、家里、睡前都能做。你忙的时候，只做 10 分钟也很有用。",
                "如果你经常脑子停不下来、睡不踏实、胸口闷、容易累，这节可以当你的“每日重启键”。",
            ],
            bulletsTitle: "适合你如果你：",
            bullets: [
                "压力大，情绪紧，晚上躺下脑子还在转",
                "睡眠浅，半夜容易醒，醒了又很难睡回去",
                "经常疲惫、气短、没精神，恢复很慢",
                "消化容易不舒服，吃完感觉堵、胀、沉",
                "想要一个随时随地能做的放松方法",
            ],
            highlightTitle: "这节课的特点：",
            highlight: [
                "不需要器材，不需要大空间，动作极简",
                "特别适合：午休/睡前/练功前的“清理一下”",
                "你会更清楚“呼气怎么放松”，而不是硬憋着",
            ],
        },

        introEn: {
            paragraphs: [
                "This lesson is perfect when you want a quick reset—using breath + sound to regulate qi.",
                "You’ll practise six syllables: Xu (嘘), He (呵), Hu (呼), Si (思), Chui (吹), Xi (嘻). The key is the mouth shape, breathing rhythm, and slow exhale—helping your body shift from tension into calm.",
                "Minimal movement, no equipment, and easy to do anywhere—home, office, or before bed. Even 10 minutes can make a real difference on a busy day.",
                "If you often feel mentally overactive, sleep lightly, or get fatigued easily, this is a practical daily tool.",
            ],
            bulletsTitle: "Helpful if you struggle with:",
            bullets: [
                "Stress and restlessness",
                "Light sleep or waking up at night",
                "Low energy and slow recovery",
                "Digestive heaviness or bloating",
                "Needing a quick calming practice",
            ],
            highlightTitle: "Why people love it:",
            highlight: [
                "Simple and beginner-friendly",
                "Works well as a pre-sleep or break-time practice",
                "Teaches you how to release tension through exhale",
            ],
        },
    },

    {
        id: 3,
        titleZh: "十二段锦",
        titleEn: "Twelve-Section Brocade",
        image: `${IMG_PREFIX}lesson-03-twelve-pieces-of-brocade.png`,
        duration: "10–20 min",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-03-twelve-pieces-of-brocade.mp4`,

        introTitleZh: "本节课介绍",
        introTitleEn: "Lesson Introduction",

        introZh: {
            paragraphs: [
                "十二段锦属于“练完全身都舒服”的那种经典养生功：12 个动作覆盖经络、脊柱、肩颈、腰胯、腿部的整体打开。",
                "如果你是久坐党、肩颈背紧、腰也硬，或者你一运动就容易觉得身体不顺，这节课特别适合当“每日全身保养”。",
                "它的节奏不会很激烈，但练完通常会觉得更松、更暖、呼吸更顺，整个人像被“重新拉直”了一遍。",
                "建议你把它当成固定套餐：比如每周 3–5 次，长期坚持效果更明显。",
            ],
            bulletsTitle: "你会明显受益如果你：",
            bullets: [
                "肩颈背紧，坐久就难受，转头都卡",
                "腰背僵，弯腰费劲，站久也累",
                "气血不畅，手脚容易凉，没精神",
                "压力大、睡不稳，想要温和的规律练习",
            ],
            highlightTitle: "这节课的好处：",
            highlight: [
                "全身覆盖：不只是局部放松",
                "动作清楚好跟练，越练越顺手",
                "适合长期坚持，做成生活习惯",
            ],
        },

        introEn: {
            paragraphs: [
                "Twelve-Section Brocade is a classic full-body wellness routine with 12 movements designed to open the body and support circulation.",
                "It’s especially useful for modern life—long sitting, stiffness, low energy—and works well as a stable daily maintenance practice.",
                "The pace is gentle, but many people feel warmer, looser, and more upright after practice, with smoother breathing and less tightness.",
                "For best results, treat it like a weekly routine (3–5 times/week) rather than a one-off workout.",
            ],
            bulletsTitle: "Great for people who:",
            bullets: [
                "Feel stiff in neck/shoulders/back",
                "Have tight hips/waist and limited mobility",
                "Want better circulation and steady energy",
                "Prefer a gentle, repeatable practice for stress relief",
            ],
            highlightTitle: "What you’ll get:",
            highlight: [
                "Whole-body mobility and opening",
                "A warmer, looser body after practice",
                "A sustainable routine you can stick with",
            ],
        },
    },

    {
        id: 4,
        titleZh: "太极十三式",
        titleEn: "Tai Chi 13 Forms",
        image: `${IMG_PREFIX}lesson-04-tai-chi-13-forms.png`,
        duration: "10–20 min",
        canPreview: false,
        s3Key: `${S3_PREFIX}lesson-04-tai-chi-13-forms.mp4`,

        introTitleZh: "本节课介绍",
        introTitleEn: "Lesson Introduction",

        introZh: {
            paragraphs: [
                "这一节是“系统入门太极”的关键：把 13 个基础动作先拆开讲清楚，再教你怎么把它们连成一整套。",
                "很多人学太极卡住，不是因为笨，而是因为：动作多 + 转换难 + 没人讲重心。你看视频跟着比划，越练越不稳。",
                "这节课会重点讲：重心怎么换、脚怎么落、腰怎么带手。你只要跟着练，慢慢就会从“乱动”变成“有控制的流动”。",
                "每天 10 分钟也够用，特别适合没时间线下上课的人。",
            ],
            bulletsTitle: "很多人会卡在这些地方：",
            bullets: [
                "动作看着简单，但一连起来就乱、就忘",
                "不知道重心怎么换，膝盖和腰容易顶着不舒服",
                "练了很久还是像体操，没有太极那种“稳”和“松”",
            ],
            highlightTitle: "这节课会帮你解决：",
            highlight: [
                "先拆分再串联：学得清楚，不容易乱",
                "重点讲重心与转换：更安全、更稳",
                "形成可坚持的练法：每天 10 分钟也能进步",
            ],
        },

        introEn: {
            paragraphs: [
                "This is the key lesson for learning Tai Chi in a systematic way: first we break down 13 core movements clearly, then we connect them into one flowing routine.",
                "Many people struggle not because they’re bad at it, but because transitions and weight shifts are rarely explained. Without that, practice can feel unstable and confusing.",
                "This lesson focuses on weight transfer, stepping, and how the waist guides the hands—so your movement becomes controlled, stable, and smooth over time.",
                "Designed for busy schedules: practise around 10 minutes a day at home.",
            ],
            bulletsTitle: "Common struggles this addresses:",
            bullets: [
                "Moves feel easy alone but fall apart when connected",
                "Unclear weight shift leads to knee/lower back discomfort",
                "Practice looks like exercise but doesn’t feel ‘Tai Chi’ (stable + relaxed)",
            ],
            highlightTitle: "You’ll like this approach because:",
            highlight: [
                "Step-by-step breakdown + connection training",
                "Clear emphasis on safer alignment and transitions",
                "A practical routine you can keep daily",
            ],
        },
    },
];

function IntroBlock({ isZh, lesson }) {
    const data = isZh ? lesson.introZh : lesson.introEn;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">{isZh ? lesson.introTitleZh : lesson.introTitleEn}</p>

            <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                {data?.paragraphs?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                ))}
            </div>

            {data?.bulletsTitle && (
                <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-900">{data.bulletsTitle}</p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {data?.bullets?.map((b, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="mt-[2px] text-slate-500">•</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data?.highlightTitle && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-semibold text-amber-700">{data.highlightTitle}</p>
                    <ul className="mt-2 space-y-2 text-sm text-slate-900">
                        {data?.highlight?.map((h, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="mt-[2px] text-amber-700">✓</span>
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function QimenPage({ lang, onBack, currentUser, isOwned: isOwnedProp, onPurchase, onGoLogin }) {
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

    const canPlayActive = useMemo(() => {
        if (isOwned) return true;
        return !!activeLesson.canPreview;
    }, [isOwned, activeLesson]);

    const fetchSignedUrl = async (s3Key) => {
        setLoading(true);
        setError("");
        setVideoUrl("");

        try {
            const res = await fetch(`${API_BASE}/api/video-url?key=${encodeURIComponent(s3Key)}`, {
                cache: "no-store",
                credentials: "include",
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data?.error || (isZh ? "获取视频链接失败" : "Failed to load video URL"));
                return;
            }

            if (!data?.url || typeof data.url !== "string") {
                setError(isZh ? "后端没有返回可用的 url" : "Backend returned no usable url");
                return;
            }

            if (!data.url.startsWith("https://")) {
                setError(isZh ? "视频链接不是 https，浏览器可能会拦截" : "URL is not https (may be blocked)");
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
        if (!lesson.canPreview && !isOwned) {
            if (!isLoggedIn) onGoLogin?.();
            return;
        }
        setActiveLessonId(lesson.id);
    }

    function handleUnlockCourse() {
        onPurchase?.("course", { courseId: "taichi" });
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
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:pt-12">
                {/* 顶部栏 */}
            <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
            </div>

                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-[1fr_360px]"
                >
                    {/* ✅ 左侧主内容（手机：上；电脑：左） */}
                    <div className="space-y-4">
                        {/* 封面图 */}
                        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
                            <div className="relative aspect-[16/9]">
                                <img
                                    src={activeLesson.image}
                                    alt={isZh ? activeLesson.titleZh : activeLesson.titleEn}
                                    className="h-full w-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.7))]" />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <p className="text-xs text-slate-600">{isZh ? "正在学习" : "Now learning"}</p>
                                    <p className="mt-1 text-xl font-semibold">
                                        {isZh
                                            ? `第 ${activeLesson.id} 课：${activeLesson.titleZh}`
                                            : `Lesson ${activeLesson.id}: ${activeLesson.titleEn}`}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        {isZh ? activeLesson.titleEn : activeLesson.titleZh}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ✅ 本节课介绍（每节课不同文案，全放这里） */}
                        <IntroBlock isZh={isZh} lesson={activeLesson} />

                        {/* 视频播放器 */}
                        <div className="rounded-3xl border border-slate-200 bg-slate-100 p-3">
                            <div className="overflow-hidden rounded-2xl bg-white">
                                {canPlayActive ? (
                                    <div className="relative">
                                        {loading && (
                                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                                                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                                                    {isZh ? "加载中..." : "Loading..."}
                                                </div>
                                            </div>
                                        )}

                                        {error && !loading && (
                                            <div className="flex aspect-video items-center justify-center p-8 text-center">
                                                <div className="max-w-md">
                                                    <p className="text-lg font-semibold">{isZh ? "播放失败" : "Playback error"}</p>
                                                    <p className="mt-2 text-sm text-slate-600">{error}</p>
                                                    <button
                                                        onClick={() => fetchSignedUrl(activeLesson.s3Key)}
                                                        className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
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
                                            <div className="flex aspect-video items-center justify-center p-8 text-center">
                                                <div className="max-w-md">
                                                    <p className="text-lg font-semibold">{isZh ? "准备播放" : "Ready"}</p>
                                                    <p className="mt-2 text-sm text-slate-600">
                                                        {isZh ? "点击右侧课时开始播放。" : "Select a lesson on the right to start."}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex aspect-video items-center justify-center p-8 text-center">
                                        <div className="max-w-md">
                                            <p className="text-lg font-semibold">{isZh ? "内容已锁定" : "Locked"}</p>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {isZh
                                                    ? "登录并购买后即可观看全部 4 节课程。未购买用户可试看前 2 节。"
                                                    : "Sign in and unlock to watch all lessons. Preview is available for the first 2 lessons."}
                                            </p>
                                            <button
                                                onClick={handleUnlockCourse}
                                                className="mt-4 rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                                            >
                                                {isZh ? "立即解锁" : "Unlock now"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-amber-200/40 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-700">
                            {isZh
                                ? "提醒：本课程不构成医疗建议。如有严重不适，请咨询专业医生。"
                                : "Disclaimer: This program is for wellness purposes only and is not medical advice."}
                        </div>
                    </div>

                    {/* ✅ 右侧目录（手机：会自然排到下方；电脑：右侧固定一栏） */}
                    <aside className="space-y-3">
                        <div className="flex items-end justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                                {isZh ? "课程目录" : "Lessons"}
                            </h2>
                            <p className="text-xs text-slate-500">
                                {LESSONS.length} {isZh ? "节" : "total"}
                            </p>
                        </div>

                        <div className="space-y-2 overflow-auto pr-1 md:max-h-[720px]">
                            {LESSONS.map((lesson) => {
                                const locked = !isOwned && !lesson.canPreview;
                                const active = lesson.id === activeLessonId;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleSelectLesson(lesson)}
                                        className={[
                                            "flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition",
                                            active
                                                ? "border-amber-300/60 bg-amber-50"
                                                : "border-slate-200 bg-white hover:bg-slate-100",
                                            locked ? "opacity-70" : "opacity-100",
                                        ].join(" ")}
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {isZh ? `第 ${lesson.id} 课 · ${lesson.titleZh}` : `Lesson ${lesson.id} · ${lesson.titleEn}`}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">{isZh ? lesson.titleEn : lesson.titleZh}</p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2 text-xs">
                                            {!isOwned && lesson.canPreview && (
                                                <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
                          {isZh ? "试看" : "Preview"}
                        </span>
                                            )}
                                            {!isOwned && !lesson.canPreview && (
                                                <span className="rounded-full bg-white px-2 py-1 text-[11px] text-slate-600 border border-slate-200">
                          🔒 {isZh ? "锁定" : "Locked"}
                        </span>
                                            )}
                                            {isOwned && (
                                                <span className="rounded-full bg-white px-2 py-1 text-[11px] text-slate-700 border border-slate-200">
                          {isZh ? "已解锁" : "Unlocked"}
                        </span>
                                            )}
                                            <span className="text-slate-500">{lesson.duration}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>
                </motion.section>
            </div>
        </div>
    );
}