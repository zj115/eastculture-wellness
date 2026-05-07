// src/pages/WingChunPage.jsx
// Wing Chun course portal — English only

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const API_BASE =
    import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Wing Chun 10 Health Qigong Full Course",
        subtitleEn: "Structured Daily Gentle Training. Correct Bad Posture, Build Solid Core Strength & Boost All-Day Consistent Energy",
        duration: "Full Step-by-Step Lessons | ~7 Min Per Routine",
        s3Key: "wingchun/lesson-01-yangsheng-ten-styles.mp4",
        coverImage: "/images/wingchun-yangsheng.png",
        fallbackImage: "/images/wingchun-hero.png",
        tagEn: "Wellness · Full-body care",

        introEn: "You don't need long workouts or difficult moves. This Wing Chun Health Qigong – 10 Forms comes from authentic Wing Chun stances, breathing and meridian principles. No fighting, no jumping, no intense effort, zero injury. The full routine is only about 7 minutes, perfect for busy modern life. It relaxes your body, improves blood circulation, calms your mind, and helps you sleep better.",

        painPoints: [
            "Long hours working and phone use make your neck and shoulders stiff, with dizziness, numb hands, and a visible neck hump",
            "Lower back pain and tightness from sitting too long; you can't sit or stand long, bending down is hard",
            "Joints feel stiff and creaky — knees weak, wrists sore, fingers numb, movement not flexible",
            "Body feels tight and heavy, hard to relax, low flexibility, easy to feel sore all over",
            "Cold hands and feet all year, weak energy, easily tired, lack of strength",
            "Poor sleep: hard to fall asleep, light sleep, easy to wake up, still tired after sleeping",
            "Stress, anxiety, chest tightness, irritable, cannot relax even when resting",
            "Low immunity, easily tired and sick, body getting weaker",
            "Tried yoga, running, gym, massage — too tiring, hard to keep, or causes joint pressure",
            "Want to keep healthy but no time, no space, no foundation, don't know where to start",
        ],

        forms: [
            { num: 1, name: "Stance Foundation Form", relieves: "Weak energy, cold limbs, unsteady lower body, fatigue", core: "Steady stance, gather energy, improve vitality" },
            { num: 2, name: "Neck & Shoulder Relaxation Form", relieves: "Stiff neck, sore shoulders, dizziness, numb hands, neck hump", core: "Loosen neck and shoulders, relieve tension quickly" },
            { num: 3, name: "Chest Opening & Qi Balancing Form", relieves: "Chest tightness, shortness of breath, stress, low mood", core: "Open the chest, smooth breathing, calm the mind" },
            { num: 4, name: "Waist & Hip Relaxation Form", relieves: "Sore waist, stiff lower back, limited movement from sitting", core: "Relax waist, protect the spine, restore flexibility" },
            { num: 5, name: "Body & Muscle Stretching Form", relieves: "Full-body tightness, stiff muscles, poor flexibility", core: "Stretch gently, release tension, make the body supple" },
            { num: 6, name: "Knee & Ankle Care Form", relieves: "Knee discomfort, weak ankles, stiff joints", core: "Protect joints gently, improve stability, no knee pressure" },
            { num: 7, name: "Wrist & Finger Activation Form", relieves: "Sore wrists, numb fingers, mouse hand, poor circulation", core: "Activate fingers and wrists, ease overuse strain" },
            { num: 8, name: "Breathing & Calming Form", relieves: "Insomnia, anxiety, restlessness, poor sleep", core: "Regulate breath, calm nerves, help you sleep well" },
            { num: 9, name: "Body Twisting & Meridian Opening Form", relieves: "Heavy body, slow blood flow, body aches, tiredness", core: "Improve circulation, reduce stagnation, lighten the body" },
            { num: 10, name: "Closing Form & Qi Returning", relieves: "Scattered energy, restlessness after practice", core: "Gather Qi, consolidate effects, fully relax body and mind" },
        ],

        advantages: [
            { icon: "⏱", title: "Only 7 Minutes", desc: "Short, efficient, fits any schedule" },
            { icon: "🛡", title: "100% Safe", desc: "No jumping, no kneeling, no hard force, no injury" },
            { icon: "🌿", title: "Full-Body Care", desc: "Neck, shoulders, waist, joints, sleep, mood all covered" },
            { icon: "✨", title: "Super Easy", desc: "Zero experience needed, just follow and practice" },
            { icon: "👥", title: "For Everyone", desc: "Office workers, seniors, busy people, all ages" },
            { icon: "♾", title: "Lifetime Benefit", desc: "Learn once, benefit for life" },
        ],

        audience: [
            "Office workers with neck, shoulder and waist pain",
            "People with poor sleep, anxiety and low energy",
            "People with cold limbs, weak body and low immunity",
            "Seniors and those who cannot do intense exercise",
            "Stressed people who need to relax",
            "Wing Chun lovers who want gentle, healthy practice",
            "Anyone who wants simple, safe daily health practice",
        ],

        gains: [
            "Relief from neck, shoulder and waist discomfort",
            "More flexible joints and looser muscles",
            "Better blood circulation and warmer hands and feet",
            "Calmer mind and improved sleep",
            "A simple 7-minute daily health routine you can do anywhere",
        ],

        closingEn: "Start today. Just 7 minutes a day to relax, refresh and recharge. Wing Chun Health Qigong 10 Forms – simple, safe, effective.",
        formsLabel: "10 Forms",
        scenariosLabel: null,
    },
    {
        id: 2,
        titleEn: "Wing Chun Practical Self-Defense Full Course",
        subtitleEn: "Easy Real-Life Protection Techniques. Gain Solid Confidence, Stay Calm & Feel Safe In Any Situation",
        duration: "Beginner Friendly Guide | ~12 Min Per Lesson",
        s3Key: "wingchun/lesson-02-fangwei-nine-styles.mp4",
        coverImage: "/images/wingchun-fangwei.png",
        fallbackImage: "/images/wingchun-hero.png",
        tagEn: "Self-defense · Real situations",

        introEn: "You don't need strength, height, or long-term training. This Wing Chun Self-Defense 9 Forms comes from real combat principles. It uses skill over strength, controls angles, neutralizes attacks instantly, and works in real dangerous situations: street attacks, elevator traps, wrist grabs, bear hugs, front punches, and more. Simple, safe, highly effective — beginners can learn in minutes.",

        painPoints: [
            "Walking alone at night, taking elevators, feeling unsafe and anxious",
            "Meeting taller / stronger attackers, too weak to block and easy to get hurt",
            "Attacked with punches, grabs, or chokes — panicked with no idea what to do",
            "Trapped in small spaces (elevator, corridor, bus), nowhere to run",
            "Grabbed from behind, struggling makes it more dangerous",
            "Tried other martial arts: too hard, too tiring, too violent, not practical",
            "No martial arts experience, small body, worried you can't defend yourself",
            "Forced to fight back blindly, making the attacker more aggressive",
        ],

        forms: [
            { num: 1, name: "Tan Sau + Step + Chain Punches", relieves: "Right straight punch from a taller attacker", core: "Deflect, not block; expose gaps; counter fast", benefit: "Neutralize heavy punches without strength" },
            { num: 2, name: "Fu Sau + Punch", relieves: "Strong direct punch / full-force attack", core: "Change angle, seal power, push attacker off balance", benefit: "Stop even big attackers instantly" },
            { num: 3, name: "Lap Sau vs. Swing Punch", relieves: "Big swings, left-right hooks", core: "Stick to the arm, change attack path, open gaps", benefit: "Avoid being knocked out; counter quickly" },
            { num: 4, name: "Bong Sau + Roll + Hook Punch", relieves: "Elevator attack, front assault, no room to retreat", core: "Turn waist, seal the arm, close-quarters strike", benefit: "Works in tight spaces; defend and counter at once" },
            { num: 5, name: "Double Slap Control", relieves: "Face grabbing, chest grabbing, provocation", core: "Dual slap to disable attack ability", benefit: "Shut down all incoming moves in 1 second" },
            { num: 6, name: "Tan Sau + Step + Block & Slap", relieves: "Sudden rush, close control", core: "Step forward, block face, control distance", benefit: "Keep attacker away and take control" },
            { num: 7, name: "Cross Finger Strike vs. Straight Punch", relieves: "Direct punch to body", core: "Deflect first, strike lower body", benefit: "One move to weaken the attacker" },
            { num: 8, name: "Elbow Control & Escape", relieves: "Wrist grab, clothes grab, held arm", core: "Lift, guide, redirect force", benefit: "Break free in 1 second even if grabbed tight" },
            { num: 9, name: "Horse Stance + Rear Strike", relieves: "Bear hug from behind, sudden restraint", core: "Stable stance, rear counter, break free", benefit: "Life-saving move for women in real danger" },
        ],

        advantages: [
            { icon: "💪", title: "Skill beats strength", desc: "Women, seniors, and small builds can all use it" },
            { icon: "⚡", title: "Learn in 7 minutes", desc: "Simple moves, no complex routines" },
            { icon: "📍", title: "Works anywhere", desc: "Elevator, street, corridor, no space needed" },
            { icon: "🤝", title: "Safe & non-violent", desc: "Deflect and control, not brutal fighting" },
            { icon: "🚀", title: "Zero experience needed", desc: "No flexibility or fitness required" },
            { icon: "🛡", title: "Covers 90% dangers", desc: "Punches, grabs, hugs, traps — all solved" },
        ],

        audience: [
            "Women who walk alone or work late",
            "Office workers who fear conflict",
            "Students and people who use elevators often",
            "Parents who want to protect their family",
            "Anyone who wants practical, easy self-defense",
            "Beginners with no time or energy for hard training",
        ],

        gains: [
            "Stay calm when attacked — no panic, no blind fight",
            "Escape grabs, hugs, and punches in seconds",
            "Defend yourself even in small spaces",
            "Protect yourself with skill, not strength",
            "A lifetime self-defense skill for you and your family",
        ],

        closingEn: "Danger comes without warning. Wing Chun Self-Defense 9 Forms – simple, real, effective. Stay safe, stay confident.",
        formsLabel: null,
        scenariosLabel: "9 Real Scenarios",
    },
];

// ─────────────────────────────────────────────
// COURSE META
// ─────────────────────────────────────────────
const COURSE = {
    lessonPrice: "$49.98",
    lessonPriceOld: "$99.98",
    sale: true,
};

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
            {forms.map((f) => (
                <div
                    key={f.num}
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
                            <span className="font-semibold text-amber-700">For: </span>
                            {f.relieves}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">How: </span>
                            {f.core}
                        </p>
                        {f.benefit && (
                            <p className="text-xs text-emerald-700 leading-relaxed">
                                <span className="font-semibold">Benefit: </span>
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

function LessonDetail({ lesson }) {
    const label = lesson.formsLabel || lesson.scenariosLabel || "Course Content";

    return (
        <div className="space-y-5">
            {/* ── Intro card ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">
                        {lesson.titleEn}
                    </h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">
                        {lesson.subtitleEn}
                    </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                    {lesson.introEn}
                </p>
            </div>

            {/* ── Pain Points ── */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>Do Any of These Sound Familiar?</SectionTitle>
                <PainPointsList items={lesson.painPoints} />
            </div>

            {/* ── Forms / Scenarios ── */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-4">
                    <SectionTitle>{label}</SectionTitle>
                    <span className="mb-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {label}
                    </span>
                </div>
                <FormsList forms={lesson.forms} />
            </div>

            {/* ── Advantages ── */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>Course Advantages</SectionTitle>
                <AdvantagesGrid items={lesson.advantages} />
            </div>

            {/* ── Audience + Gains side by side on desktop, stacked on mobile ── */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                    <SectionTitle>Who Is This For?</SectionTitle>
                    <CheckList items={lesson.audience} color="amber" />
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                    <SectionTitle>What You Will Gain</SectionTitle>
                    <CheckList items={lesson.gains} color="emerald" />
                </div>
            </div>

            {/* ── Closing ── */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {lesson.closingEn}
                </p>
            </div>

            {/* ── Disclaimer ── */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                Note: Please train in a safe environment with enough space. All demonstrations are for educational purposes only and do not encourage violence.
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
                videoTitle: lesson.titleEn,
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
                        Wing Chun Complete Self-Defense & Vitality Master Course
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Systematic Practical Wing Chun Training. Master Easy Real-World Protection, Fix Posture, Build Core Strength & Unshakable Inner Confidence.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            2 lessons · buy individually
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
                                Buy Lesson {activeLesson.id} · {COURSE.lessonPrice} USD
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
                                        Lesson {lesson.id}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 leading-snug pr-4">
                                        {lesson.titleEn}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {lesson.tagEn} · {lesson.duration}
                                    </span>
                                    {hasAccess ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                                            Unlocked
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] text-amber-700">
                                            $29 USD per lesson
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
                                        Purchase this lesson to unlock and watch.
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleBuyActiveVideo}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Buy Lesson {activeLesson.id} · {COURSE.lessonPrice}
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
