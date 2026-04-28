// src/pages/QimenPage.jsx
// Tai Chi System Course — 7 Lessons (Wudang Sanfeng series)

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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
    titleEn: "Nourish Five Internal Organs, Calm Deep Inner Imbalance & Restore Long-Term Masculine Vitality",
    subtitleEn: "Ancient Wudang Tai Chi Full Course. Seven Major Viscera Systematic Deep Nourishment, Step-by-Step Guided Practice, Eliminate Root Fatigue & Rebalance Full-Body Natural Wellness.",
    priceNow: "$273",
    priceOld: "$419.99",
    sale: true,
    lessonCount: 7,
};

// ─────────────────────────────────────────────
// LESSON DATA
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Kidney Essence & Masculine Vitality",
        subtitleEn: "Deep core energy restoration, support lasting inner strength, ease body weariness & maintain peak daily male performance",
        duration: "~11 min",
        s3Key: "taichi/lesson-07-huogu-yangsheng-gong.mp4",
        coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop enduring joint pain! Don't rely on painkillers and massages that only treat the symptoms, not the root cause! Bone-Invigorating Health Qigong is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute course is specially designed for stiff joints, cold and aching bone cavities, and sedentary strain. It unblocks stagnation deep in the joints, relieves pain in the shoulders, neck, lower back and knees, and restores flexibility to your joints.",

        painPoints: [
            "Office workers: Stiff and sore shoulders, neck and lower back, difficulty standing after sitting, limited range of motion when turning or bending",
            "Middle-aged and elderly people with joint discomfort: Knee pain, joint cracking, difficulty climbing stairs, worsened symptoms on rainy days",
            "People with minor sports injuries: Mild waist and knee strain, unable to do intense exercise, in need of gentle recovery",
            "People with cold-damp constitution: Cold and tight joints, cold hands and feet, persistent cold pain deep in the bones year-round",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Disciple of Grandmaster Zhong Yunlong, the 14th-generation leader of the Wudang Sanfeng Sect",
                "Professional Achievements: Double champion in international Tai Chi and Tai Chi Sword competitions",
                "Precise Teaching: Trained systematically at the Wudang Zixiao Palace since childhood",
            ],
        },

        benefits: [
            { title: "Qi-guided joint clearing", desc: "Qi penetrates the bone cavities, dissolves cold-damp stagnation, quickly relieves stabbing and cold pain in shoulders, waist and knees" },
            { title: "Activate joints, eliminate stiffness", desc: "Stretches ligaments and joint capsules, improves range of motion, ends joint cracking and difficulty bending" },
            { title: "Dispel cold and dampness", desc: "Draws Yang Qi inward, expels deep cold-damp from joints, reduces discomfort on rainy days" },
            { title: "Strengthen tendons and bones", desc: "Enhances muscle and ligament support, reduces joint wear, prevents recurring strain" },
            { title: "Time-efficient and easy to maintain", desc: "11-minute short practice, no equipment needed, can be done at home or in the office" },
        ],

        closingEn: "Stop enduring joint pain at a young age. Bone-Invigorating Health Qigong — 11 minutes to unblock, warm and strengthen your joints every day.",
    },

    {
        id: 2,
        titleEn: "Liver & Mood Stability Care",
        subtitleEn: "Clear internal stagnation, soothe irritability, release daily pressure & keep steady calm mindset",
        duration: "~10 min",
        s3Key: "taichi/lesson-06-wuji-hunyuan-zhuang.mp4",
        coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from physical weakness, fatigue and sore waist and knees! Stop relying blindly on supplements that only make you weaker! Hunyuan Wuji Stance is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 10-minute ancient standing practice is specially designed for those with insufficient kidney Qi, depleted primordial energy, cold hands and feet, and poor concentration. It gathers Qi and consolidates your foundation, replenishing your exhausted body from the root.",

        painPoints: [
            "People with insufficient kidney Qi: Sore, weak waist and knees, low energy",
            "People with cold constitution: Cold hands and feet, cold lower abdomen, aversion to wind and cold",
            "People with high stress and late nights: Fatigue, poor concentration, easy palpitations",
            "People with insomnia and restless sleep: Difficulty falling asleep, light sleep, easy waking",
            "People with weak immunity: Prone to colds and frequent minor illnesses",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Bestowed the Taoist name \"Shigao\" — core 15th-generation inheritor, decades of Wudang internal stance practice",
                "Professional Achievements: Double champion in international Tai Chi and Tai Chi Sword competitions",
                "Precise Teaching: Proficient in the essence of \"gathering Qi through standing and returning to origin\"",
            ],
        },

        benefits: [
            { title: "Strengthens kidneys and consolidates primordial Qi", desc: "Quickly gathers scattered vital energy, relieves soreness and fatigue" },
            { title: "Warms Yang and dispels cold", desc: "Improves circulation in the lower body, warms hands, feet and abdomen from within" },
            { title: "Calms the mind and stabilizes emotions", desc: "Relieves irritation, calms the heart, deepens sleep" },
            { title: "Boosts energy and eliminates drowsiness", desc: "Keeps you alert and focused during the day" },
            { title: "Zero-threshold and easy to stick to", desc: "10-minute standing practice, no space or equipment required, suitable for all ages" },
        ],

        closingEn: "Just 10 minutes a day to gradually recover your scattered vital energy. Hunyuan Wuji Stance — simple, deep, effective.",
    },

    {
        id: 3,
        titleEn: "Spleen & All-Day Energy Boost",
        subtitleEn: "Optimize internal energy absorption, banish constant sluggishness & maintain consistent high vitality",
        duration: "~17 min",
        s3Key: "taichi/lesson-05-wudang-daomen-baduanjin.mp4",
        coverImage: "/images/tai-chi/lesson-05-baduanjin.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from weak spleen and stomach, indigestion, bloating and edema! Wudang Taoist Baduanjin is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 17-minute ancient Daoyin practice specially regulates the spleen and stomach, enhances digestion, improves absorption and speeds up metabolism, solving the root problems of poor appetite, malabsorption, weight gain and weakness.",

        painPoints: [
            "People with weak spleen and stomach: Indigestion, bloating, poor appetite",
            "People with intestinal disorders: Recurring constipation or loose stools, abdominal discomfort",
            "People with bloating and edema: Slow metabolism, fat accumulation, heavy body",
            "People with sallow complexion: Malnutrition, poor absorption, fatigue and laziness",
            "Middle-aged and elderly health seekers: Weak physique, unable to do intense exercise, in need of gentle conditioning",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Holding the complete ancient Baduanjin Daoyin tradition passed down from Grandmaster Zhong Yunlong",
                "Professional Achievements: International martial arts champion, proficient in internal organ regulation",
                "Precise Teaching: Breaks down ancient Baduanjin into simple moves, no empty theories — only tangible effects",
            ],
        },

        benefits: [
            { title: "Strengthens spleen and stomach", desc: "Improves digestion and absorption, relieves bloating, helps nutrients absorb effectively" },
            { title: "Regulates intestines", desc: "Eases constipation and diarrhea, balances intestinal rhythm, stops recurring discomfort" },
            { title: "Boosts metabolism", desc: "Reduces bloating and fat, improves circulation, reduces excess fat and edema" },
            { title: "Replenishes Qi", desc: "Improves sallow complexion, restores rosy color and stronger energy" },
            { title: "Gentle and safe for the whole family", desc: "Soft movements, suitable for beginners, the elderly and weak people" },
        ],

        closingEn: "17 minutes of authentic Wudang Baduanjin — feel your spleen and stomach improve with every practice.",
    },

    {
        id: 4,
        titleEn: "Lung Power & Physical Stamina",
        subtitleEn: "Deep breath regulation, expand lung capacity, build natural endurance & anti-fatigue reserve",
        duration: "~11 min",
        s3Key: "taichi/lesson-03-wudang-sanfeng-taichi-18-forms.mp4",
        coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop being destroyed by insomnia, palpitations, irritation and internal friction! Tai Chi for Heart Calming is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute gentle Tai Chi set specially calms the mind, relieves stress, improves sleep and soothes emotions, helping you relax mentally and physically.",

        painPoints: [
            "People with insomnia: Difficulty falling asleep, light sleep, easy waking, tired after rest",
            "Anxious and stressed people: Irritability, overthinking, mental tension",
            "People with palpitations: Chest tightness, shortness of breath, easy nervousness",
            "People with mental fatigue: Nerve weakness, poor concentration, brain fog",
            "People with internal friction: Low mood, physical and mental exhaustion",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Proficient in Tai Chi static practice and heart-nourishing methods",
                "Professional Achievements: International Tai Chi champion, steady and gentle movements",
                "Practical Teaching: Specially designed for stressed, insomniac and anxious people",
            ],
        },

        benefits: [
            { title: "Calms the heart and relieves anxiety", desc: "Releases mental pressure, stabilizes emotions" },
            { title: "Improves insomnia and sleep quality", desc: "Faster onset, deeper sleep, more energy upon waking" },
            { title: "Relieves palpitations and chest tightness", desc: "Balances breathing, eases discomfort" },
            { title: "Relaxes the brain and reduces fatigue", desc: "Sharpens the mind, improves focus" },
            { title: "Time-efficient and sustainable", desc: "11-minute practice, suitable for morning or night" },
        ],

        closingEn: "The heart governs the spirit. An unsettled heart leads to poor sleep and weak health. Practice daily — more peace with every session.",
    },

    {
        id: 5,
        titleEn: "Heart Calm & Mental Focus",
        subtitleEn: "Nourish heart spirit, calm overthinking, relieve inner anxiety & restore sharp clear mind",
        duration: "~11 min",
        s3Key: "taichi/lesson-02-wudang-sanfeng-taichi-13-forms.mp4",
        coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop letting liver Qi stagnation, chest tightness, irritation and acne harm your body! Tai Chi for Soothing the Liver is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 11-minute stretching Tai Chi set specially soothes the liver, regulates Qi, releases stagnation and clears liver fire, making your body free of blockage, tightness and irritation.",

        painPoints: [
            "People with liver Qi stagnation: Chest tightness, frequent sighing, rib pain",
            "Irritable people: Bad temper, depression, strong mood swings",
            "People with liver damage from late nights: Bitter mouth, acne, dry eyes",
            "People with Qi stagnation: Dizziness, body tightness, blocked meridians",
            "Women in need of regulation: Breast tenderness and mood swings before menstruation",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Proficient in meridian stretching and Qi regulation",
                "Professional Achievements: International Tai Chi champion, open and smooth movements with clear Qi paths",
                "Precise Teaching: Simple and easy to learn, specially designed for liver meridian blockage",
            ],
        },

        benefits: [
            { title: "Soothes the liver and regulates Qi", desc: "Eliminates chest tightness and sighing, relaxes the body" },
            { title: "Clears liver fire", desc: "Relieves bitter mouth, dry eyes and irritation" },
            { title: "Smooths Qi flow and unblocks meridians", desc: "Reduces body tightness and soreness" },
            { title: "Calms emotions", desc: "Less anger, less internal friction, more ease" },
            { title: "Simple and efficient", desc: "11-minute stretching, usable at work or home" },
        ],

        closingEn: "The liver governs free flow of Qi. Once unblocked, the whole body flows. Soothe the liver — feel the difference every day.",
    },

    {
        id: 6,
        titleEn: "Deep Night Recovery & Quality Sleep",
        subtitleEn: "Calm nightly restlessness, ease frequent waking, enjoy deep uninterrupted sleep & fully refreshed mornings",
        duration: "~28 min",
        s3Key: "taichi/lesson-01-wudang-sanfeng-taichi-28-forms.mp4",
        coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop catching colds every season and feeling uncomfortable in the wind! Tai Chi for Nourishing the Lungs is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 28-minute breath-coordinated Tai Chi set specially moistens the lungs, strengthens lung Qi, improves immunity and relieves dry throat, making you full of energy with stronger defense.",

        painPoints: [
            "People with weak lung Qi: Prone to colds, low immunity, weak health",
            "People with throat discomfort: Dry throat, easy coughing, phlegm discomfort",
            "People with shallow breathing: Shortness of breath, weak voice, chest tightness",
            "Public speakers and voice users: Teachers, streamers with chronic throat fatigue",
            "People in dry environments: Nasal dryness, skin dryness, sensitive lungs",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Direct inheritor, proficient in breath Daoyin and lung regulation",
                "Professional Achievements: International Tai Chi champion, expert in guiding Qi with form",
                "Practical Teaching: Movements matched with breathing, easy to learn, obvious long-term effects",
            ],
        },

        benefits: [
            { title: "Moistens lungs and boosts lung function", desc: "Deepens breathing, relieves shortness of breath" },
            { title: "Enhances immunity", desc: "Reduces seasonal colds, strengthens external defense" },
            { title: "Relieves dry throat and coughing", desc: "Moistens nose and throat, reduces irritation" },
            { title: "Replenishes Qi and improves complexion", desc: "Boosts energy, strengthens voice" },
            { title: "Gentle health care", desc: "Suitable for the weak, elderly and beginners" },
        ],

        closingEn: "The lungs govern Qi of the whole body. Strong lung Qi means a strong body. Practice daily — breathe deeper, live better.",
    },

    {
        id: 7,
        titleEn: "Five Organs Full System Deep Conditioning",
        subtitleEn: "Comprehensive heart/liver/spleen/lung/kidney balance, full body deep maintenance for long term prime wellness",
        duration: "~30 min",
        s3Key: "taichi/lesson-04-wudang-sanfeng-taichi-108-forms.mp4",
        coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png",
        fallbackImage: "/images/taiji-mountain.jpg",

        intro: "Stop suffering from Qi and blood deficiency, organ imbalance and overall sub-health! Tai Chi for Qi and Blood Regulation is taught personally by Master Liu Shigao, the 15th-generation authentic inheritor of the Wudang Sanfeng Sect. This 30-minute complete Tai Chi set balances Qi and blood, nourishes the heart, liver, spleen, lungs and kidneys, unblocks meridians, providing full-body conditioning in one practice.",

        painPoints: [
            "People with Qi and blood deficiency: Sallow complexion, dizziness, fatigue, numb hands and feet",
            "People with organ disorders: Combined heart, liver, spleen, lung and kidney weakness",
            "People with full-body sub-health: Aches, fatigue, poor sleep, bad complexion",
            "Middle-aged and elderly health seekers: Declining health, in need of comprehensive anti-aging care",
            "Systematic health lovers: Want one complete routine instead of mixed fragments",
        ],

        instructor: {
            name: "Master Liu Shigao",
            title: "15th-Generation Authentic Inheritor of the Wudang Sanfeng Sect",
            points: [
                "Authentic Lineage: Holding the complete Wudang Tai Chi system, proficient in Qi, blood and organ regulation",
                "Professional Achievements: International Tai Chi champion, integrating heart, liver, spleen, lung and kidney nourishment",
                "Systematic Teaching: Step-by-step, full-body coverage in one complete set",
            ],
        },

        benefits: [
            { title: "Balances full-body Qi and blood", desc: "Improves pale complexion, dizziness and fatigue" },
            { title: "Nourishes five internal organs", desc: "Synchronously balances heart, liver, spleen, lungs and kidneys" },
            { title: "Unblocks full-body meridians", desc: "Relieves soreness, stiffness and stagnation" },
            { title: "Strengthens foundation and immunity", desc: "Slows aging, boosts energy" },
            { title: "All-in-one full-body practice", desc: "One set completes full-body conditioning without switching routines" },
        ],

        closingEn: "Imbalanced Qi and blood lead to disordered organs. This comprehensive practice regulates both — nourishing all at once, leaving you fully open after every session.",
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

function BenefitsList({ items }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {items.map((b, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-1.5">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                        <span className="text-emerald-600 mr-1.5">✓</span>{b.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pl-5">{b.desc}</p>
                </div>
            ))}
        </div>
    );
}

function InstructorCard({ instructor }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <div>
                <p className="text-sm font-bold text-slate-900">{instructor.name}</p>
                <p className="text-xs text-amber-700 mt-0.5">{instructor.title}</p>
            </div>
            <ul className="space-y-1.5">
                {instructor.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="shrink-0 text-slate-400 mt-0.5">•</span>
                        <span>{pt}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LessonDetail({ lesson }) {
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
                <p className="text-sm text-slate-700 leading-relaxed">
                    {lesson.intro}
                </p>
            </div>

            {/* Pain Points */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <SectionTitle>Who Is This For?</SectionTitle>
                <PainPointsList items={lesson.painPoints} />
            </div>

            {/* Benefits */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>Core Benefits</SectionTitle>
                <BenefitsList items={lesson.benefits} />
            </div>

            {/* Instructor */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>Instructor</SectionTitle>
                <InstructorCard instructor={lesson.instructor} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">
                    {lesson.closingEn}
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                Disclaimer: This program is for wellness purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns.
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
                videoTitle: lesson.titleEn,
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
                        {COURSE.titleEn}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-base text-slate-400 line-through">{COURSE.priceOld}</span>
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs text-amber-700">
                            {COURSE.lessonCount} lessons · lifetime access
                        </span>
                    </div>
                </motion.div>

                {/* ══ PURCHASE BUTTONS ══ */}
                <motion.div
                    initial="hidden" animate="show" variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-6 space-y-3"
                >
                    {isOwned ? (
                        <div className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
                            ✓ Full Course Unlocked
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleUnlockCourse}
                                className="w-full rounded-2xl bg-amber-600 px-4 py-4 text-sm font-bold text-white hover:bg-amber-500 transition active:scale-[0.98]"
                            >
                                Unlock Full Course (All {COURSE.lessonCount} Lessons) · {COURSE.priceNow}
                            </button>
                            <button
                                onClick={handleBuyActiveVideo}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition active:scale-[0.98]"
                            >
                                Buy Lesson {activeLesson.id} Only · $39 USD
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
                                        Lesson {lesson.id}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 leading-snug pr-3 line-clamp-2">
                                        {lesson.titleEn}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                                    {unlocked ? (
                                        <span className="mt-0.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                            Unlocked
                                        </span>
                                    ) : (
                                        <span className="mt-0.5 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[9px] text-amber-700">
                                            🔒 $39 USD
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
                                        Purchase to unlock and watch.
                                    </p>
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleUnlockCourse}
                                            className="mt-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                                        >
                                            Unlock Full Course {COURSE.priceNow}
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
