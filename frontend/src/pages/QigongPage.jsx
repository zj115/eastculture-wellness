// src/pages/QigongPage.jsx
// Acupressure Masterclass — 6 Lessons
// Same structure as QimenPage (Tai Chi): hero image + lesson selector + video + full detail
// App.jsx: activePage === "qigong" → <QigongPage courseId="qigong" />

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
    titleEn: "Acupressure Masterclass",
    titleZh: "穴位按摩完全课",
    priceNow: "NZD 99",
    priceOld: "NZD 149",
    sale: true,
    lessonCount: 6,
    courseId: "qigong",   // keep existing courseId so purchases still match
};

// ─────────────────────────────────────────────
// LESSON DATA
// S3 keys exactly match uploaded files in s3://eastculture-video-nz/acupressure/
// Cover images copied to /public/images/acupressure-lesson-0X.png
// ─────────────────────────────────────────────
const LESSONS = [
    {
        id: 1,
        titleEn: "Head & Face Discomfort Relief",
        titleZh: "头部穴位按摩",
        subtitleEn: "26 Conditions • 3 Pressure Points Each • Drug-Free Relief at Home",
        duration: "~60 min",
        s3Key: "acupressure/lesson-01-head.mp4",
        coverImage: "/images/acupressure-lesson-01.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "Stop reaching for pills every time your head or face plays up. This lesson teaches 3 simple pressure points for each of 26 common head and face conditions — headaches, tinnitus, dry eyes, toothache, nasal congestion, stiff neck, and more. Taught by an experienced TCM practitioner, every technique is 100% natural, requires no tools, and can be done at home in minutes.",

        conditions: [
            "Back of Head Headache (Occipital Pain)",
            "Top of Head Pain & Tightness",
            "Frontal Headache & Forehead Tightness",
            "Migraine & Temple Pain",
            "Scalp Pain & Tight Fascia",
            "Stiff Neck (Cannot Turn / Lower / Raise Head)",
            "Tinnitus (Ear Ringing / Buzzing)",
            "Otitis Media, Ear Discharge & Pus",
            "Upper Toothache",
            "Lower Toothache",
            "Gum Swelling & Facial Puffiness",
            "Excessive Tearing (Wind-Induced)",
            "Dry Eyes & Eye Fatigue",
            "Eyeball Swelling & Bulging Feeling",
            "Blurred Vision & Poor Clarity",
            "Styes (Eyelid Bumps)",
            "Saggy Eyelids (Droopy Upper Lids)",
            "Eye Bags & Under-Eye Puffiness",
            "Nasal Congestion & Stuffy Nose",
            "Sore Throat & Painful Swallowing",
            "Persistent Hiccups (Diaphragm Spasm)",
            "Scalp Folliculitis & Bumps",
            "Dizziness & Poor Blood Circulation to Head",
            "Facial Nerve Tension & Sensitivity",
            "Inflammation-Related Head & Face Issues",
            "Head & Face Stiffness & Discomfort",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no injections, no side effects" },
            { title: "3 Fixed Points Per Condition", desc: "Easy to find, remember and use every time" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Relief", desc: "Headaches, toothaches, hiccups and congestion reduce quickly" },
            { title: "Root-Cause Repair", desc: "Long-term improvement for tinnitus, dry eyes, scalp issues" },
            { title: "Zero Experience Needed", desc: "No anatomy or meridian knowledge required" },
        ],

        audience: [
            "People with frequent headaches, migraines, dizziness",
            "Those with eye strain, dry eyes, blurred vision from screen use",
            "People suffering from toothache, gum swelling, oral discomfort",
            "Those with tinnitus, ear infections, ear discharge",
            "People with stiff neck or limited neck movement",
            "Those with nasal congestion, sore throat, recurring hiccups",
            "People with scalp pain, folliculitis, eye bags, saggy eyelids",
            "Anyone who wants safe, natural, drug-free relief at home",
        ],

        closingEn: "One course solves 26 head & face problems. Learn once, benefit for life.",
    },

    {
        id: 2,
        titleEn: "Women's Private Wellness",
        titleZh: "女性私密健康课",
        subtitleEn: "7 Common Women's Issues • 3–5 Pressure Points • Natural Relief at Home",
        duration: "~40 min",
        s3Key: "acupressure/lesson-02-women.mp4",
        coverImage: "/images/acupressure-lesson-02.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "Seven of the most common private women's health issues — addressed naturally, privately, and effectively at home. No embarrassing hospital visits, no side effects from medication. Using 3–5 targeted pressure points per condition, this lesson covers breast hyperplasia, menstrual cramps, irregular periods, heavy bleeding, popliteal cysts, private area itching, and urine leakage. Safe for all ages including postpartum women.",

        conditions: [
            "Breast Hyperplasia – breast lumps, menstrual pain, tenderness on the sides",
            "Popliteal Cyst – bulge behind knee, pain with squatting, walking discomfort",
            "Private Area Itching – recurring itch, quick relief for acute symptoms, long-term root repair",
            "Menstrual Cramps – acute abdominal pain, fast pain relief during attacks",
            "Urine Leakage – leakage with cough/laugh, postnatal weakness, pelvic floor relaxation",
            "Delayed / Missed Periods – irregular cycles, amenorrhea (not menopause)",
            "Heavy Menstrual Bleeding – uncontrollable flow, physical weakness",
        ],

        highlights: [
            { title: "100% Natural", desc: "No drugs, no needles, no rinsing, no side effects" },
            { title: "Fixed Pressure Points", desc: "3–5 key points per issue, easy to find, remember and use" },
            { title: "Private & Safe", desc: "Do it yourself at home, no help needed, no embarrassment" },
            { title: "Save Time & Money", desc: "No hospital visits, no expensive treatments, 5–10 minutes a day" },
            { title: "Acute + Chronic Care", desc: "Fast relief for sudden symptoms, long-term prevention" },
            { title: "Gentle & Effective", desc: "Safe for all ages including postpartum women" },
        ],

        audience: [
            "Women with breast lumps, tenderness, or menstrual breast pain",
            "People with popliteal cysts and knee movement discomfort",
            "Women suffering from recurring private itching",
            "Women with severe menstrual cramps relying on painkillers",
            "Postpartum women or those with urine leakage when coughing/laughing",
            "Women with irregular, delayed, or missed periods",
            "Women with heavy, prolonged menstrual bleeding",
            "Anyone who wants to stop wasting time and money on private health issues",
        ],

        closingEn: "One course solves 7 common women's problems. Learn once, benefit for life — gentle, natural, and completely private.",
    },

    {
        id: 3,
        titleEn: "Hand & Foot Pain Relief",
        titleZh: "手脚穴位按摩",
        subtitleEn: "28 Conditions • 3 Pressure Points Each • Drug-Free Relief at Home",
        duration: "~90 min",
        s3Key: "acupressure/lesson-03-hands-feet.mp4",
        coverImage: "/images/acupressure-lesson-03.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "From trigger finger and tennis elbow to plantar fasciitis and restless legs — this lesson covers 28 of the most common hand and foot problems using just 3 pressure points each. Whether you're dealing with work-related strain, sports injuries, or age-related stiffness, every technique is safe, natural and can be done without any tools or medical knowledge.",

        conditions: [
            "Middle Trigger Finger",
            "Golfer's Elbow (Medial Epicondylitis)",
            "Heel Pain (Worse When Walking)",
            "Athlete's Foot (Beriberi)",
            "Morning Hand Stiffness & Weak Grip",
            "Pinky & Ring Finger Numbness",
            "Ankle Sprain (Inversion & Eversion)",
            "Tinea Manuum (Palmer Blisters & Itch)",
            "Tennis Elbow (Lateral Epicondylitis)",
            "Senior Walking Weakness & Fatigue",
            "Thumb Tenosynovitis",
            "Fingertip Numbness",
            "Wrist Pain When Flipping",
            "Restless Legs Syndrome",
            "Arm Cannot Reach Back (Anterior Shoulder Pain)",
            "Plantar Fasciitis (Morning First Step Pain)",
            "Night Arm Radiating Pain",
            "Forearm Outer Stabbing Pain",
            "Armpit Cyst & Lymphatic Congestion",
            "Palm Pain When Gripping",
            "Front Shin Pain (Tibialis Anterior Pain)",
            "Foot Arch Pain",
            "Mom's Wrist (De Quervain's Tenosynovitis)",
            "Bunion (Hallux Valgus)",
            "Arm Cannot Reach Back (Posterior Shoulder Pain)",
            "Finger Joint Stiffness & Locking",
            "Wrist Sprain & Overuse Pain",
            "Hand & Foot Numbness, Soreness, Weakness",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no injections, no side effects" },
            { title: "3 Points Per Problem", desc: "Fixed, easy to find, remember and use" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Pain Relief", desc: "Acute pain reduces immediately" },
            { title: "Root-Cause Repair", desc: "Improve tenosynovitis, numbness, strain long-term" },
            { title: "For the Whole Family", desc: "Workers, housewives, seniors, kids" },
        ],

        audience: [
            "People with hand/wrist pain from phone & computer use",
            "Housewives & parents with hand strain from housework & childcare",
            "Seniors with heel pain, numbness, weak walking",
            "People with elbow pain, ankle sprain, sports or work injuries",
            "People with embarrassing issues like athlete's foot & restless legs",
            "Anyone who wants to avoid medicine, doctors, and expensive bills",
            "Anyone who wants a self-healing system for hand & foot pain",
        ],

        closingEn: "One course solves 28 hand & foot problems. Learn once, benefit for life.",
    },

    {
        id: 4,
        titleEn: "Common Daily Discomforts Relief",
        titleZh: "日常常见问题穴位按摩",
        subtitleEn: "16 Daily Aches & Pains • 3 Pressure Points Each • Drug-Free Relief at Home",
        duration: "~60 min",
        s3Key: "acupressure/lesson-04-daily-issues.mp4",
        coverImage: "/images/acupressure-lesson-04.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "Insomnia, anxiety, carsickness, bloating, palpitations, mouth ulcers, night sweats — these everyday problems quietly wear you down. This lesson addresses 16 common daily health issues using 3 natural pressure points each. Quick relief for acute symptoms, long-term improvement for chronic patterns. No clinic visits, no side effects, suitable for the whole family.",

        conditions: [
            "Tongue Tip Pain – burning, stabbing pain, recurring discomfort",
            "Motion Sickness – nausea, vomiting, dizziness, travel anxiety",
            "Visceral Ptosis – protruding lower belly, postpartum relaxation",
            "Stomach Bloating – slow digestion, fullness, discomfort after meals",
            "Chest Tightness – pressure, fake heart symptoms, unexplained discomfort",
            "Facial / Mouth Twitching – involuntary spasms, nerve-related tics",
            "Emotional Restlessness – anxiety, irritability, inner panic",
            "Night Sweats – nighttime sweating, yin deficiency, weak sleep",
            "Rapid Heartbeat – sudden palpitations, fast heart rate",
            "Insomnia – difficulty falling asleep, restlessness, poor sleep",
            "Loss of Appetite – no desire to eat, low energy",
            "Burning Urination – discomfort, urgency, frequent urination",
            "Side Stitch – sharp rib pain when breathing or moving",
            "Night Teeth Grinding – sleep grinding, jaw pain, worn teeth",
            "Mouth Ulcers – recurring sores, pain, slow healing",
            "Thyroid Nodules / Cysts – neck tightness, lumps, discomfort",
            "Frequent Night Urination – nighttime bathroom trips, disturbed sleep",
            "Acute Diarrhea – stomach cramps, loose bowels, sudden attacks",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, no needles, no side effects" },
            { title: "3 Points Per Issue", desc: "Easy to find, remember and use" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Results", desc: "Quick relief for acute symptoms, long-term improvement" },
            { title: "Save Time & Money", desc: "No clinic visits, no expensive bills" },
            { title: "For the Whole Family", desc: "Adults, seniors, daily common problems all covered" },
        ],

        audience: [
            "People troubled by repeated small daily discomforts",
            "Office workers with insomnia, anxiety, carsickness, stomach issues",
            "Postpartum women with visceral ptosis and protruding belly",
            "Middle-aged and elderly people with thyroid issues and frequent night urination",
            "Anyone who prefers natural healing and avoids medicine side effects",
            "People who want to save time, money and solve problems at home",
            "Families who want a simple, safe self-healing system for daily health",
        ],

        closingEn: "One course solves 16 common daily health problems. Learn once, benefit for life.",
    },

    {
        id: 5,
        titleEn: "Neck & Shoulder Pain Relief",
        titleZh: "肩颈穴位按摩",
        subtitleEn: "8 Neck & Shoulder Conditions • 3 Key Pressure Points • No Doctor Needed",
        duration: "~45 min",
        s3Key: "acupressure/lesson-05-neck-shoulders.mp4",
        coverImage: "/images/acupressure-lesson-05.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "Chronic shoulder blade pain, morning back stiffness, frozen shoulder, Dowager's hump, intercostal neuralgia — this lesson targets 8 of the most persistent neck and shoulder problems using just 3 key pressure points each. No needles, no drugs, no helper needed. Designed for office workers, drivers, and anyone whose pain keeps coming back.",

        conditions: [
            "Shoulder blade pain (dull pain at inner edge, worse with sitting)",
            "Back pain (morning stiffness, night pain, better after moving)",
            "Shoulder pain & coldness (constant pain, fear of cold, easy to become frozen shoulder)",
            "Frozen shoulder – cannot lift arm (muscle adhesion, limited upward movement)",
            "Frozen shoulder – cannot reach back (sharp pain at back of shoulder)",
            "Dowager's hump discomfort (stiffness, pain when tilting head back)",
            "Intercostal neuralgia (stabbing, radiating pain between ribs)",
            "Neck & shoulder stiffness from long-term sitting & phone use",
        ],

        highlights: [
            { title: "All-Natural Physical Method", desc: "No needles, no drugs, no side effects" },
            { title: "3 Key Pressure Points", desc: "Easy to find, easy to remember, fast relief" },
            { title: "Self-Treatment at Home", desc: "Do it yourself, no helper needed" },
            { title: "Save Time & Money", desc: "No clinic visits, no expensive bills" },
            { title: "Root-Cause Relief", desc: "Treat front for back pain, target deep fascia" },
            { title: "Zero Basics Needed", desc: "No anatomy knowledge required" },
        ],

        audience: [
            "Office workers, drivers and people who use phones for long hours",
            "People with chronic, recurring neck & shoulder pain",
            "People with frozen shoulder, limited movement and muscle adhesion",
            "People who prefer safe, natural pain relief",
            "Anyone who wants to stop wasting time and money on pain",
        ],

        closingEn: "One course, solve 8 neck & shoulder problems. Learn once, benefit for life.",
    },

    {
        id: 6,
        titleEn: "Waist & Leg Pain Relief",
        titleZh: "腰腿穴位按摩",
        subtitleEn: "22 Waist & Leg Conditions • 3 Pressure Points Each • No Surgery Needed",
        duration: "~75 min",
        s3Key: "acupressure/lesson-06-waist-legs-description.mp4",
        coverImage: "/images/acupressure-lesson-06.png",
        fallbackImage: "/images/tai-chi/acupressure-cover.jpg",

        intro: "Sciatica, knee pain, cold legs, calf cramps, tailbone pain, acute lumbar sprains, hemorrhoids — this lesson covers 22 waist and leg problems that affect daily movement and sleep. Every condition is addressed with 3 simple, fixed pressure points. No surgery, no drugs, no side effects. Suitable for seniors, office workers, and anyone who suffers from lower body pain.",

        conditions: [
            "Crawling Sensation & Numbness on Outer Lower Leg",
            "Chronically Cold Lower Legs (Poor Circulation)",
            "Calf Cramps (Nocturnal & Cold-Induced)",
            "Outer Thigh Numbness & Sensory Loss",
            "Cold Kneecaps & Knee Cold Intolerance",
            "Inability to Squat or Bend Knees",
            "Knee Pain When Climbing Upstairs",
            "Knee Pain When Going Downstairs",
            "Knee Effusion (Fluid / Water on the Knee)",
            "Back of Knee Pain (Medial / Lateral / Central)",
            "Sciatica (Radiating Pain from Buttock to Leg)",
            "Tailbone (Coccyx) Pain & Discomfort When Sitting",
            "Lower Back Pain When Bending While Seated",
            "Acute Lumbar Sprain & Locked Waist",
            "Sacroiliac Joint Pain & Instability",
            "Back Thigh Aches & Tightness from Sitting",
            "Lower Back Pain from Sneezing / Coughing",
            "Weak Legs & General Fatigue",
            "Acute Hemorrhoids (Pain, Burning, Swelling)",
            "Lumbar Muscle Strain & Stiffness",
            "Poor Lower Body Blood Circulation",
            "Chronic Waist & Leg Overuse Injuries",
        ],

        highlights: [
            { title: "100% Natural", desc: "No pills, injections, or side effects" },
            { title: "3 Fixed Points Per Condition", desc: "Easy to find, remember & apply" },
            { title: "Self-Treatment at Home", desc: "Do it yourself anytime, anywhere" },
            { title: "Fast Pain Relief", desc: "Acute sprains, cramps & sharp pain reduce quickly" },
            { title: "Root-Cause Repair", desc: "Long-term improvement for numbness, cold & stiffness" },
            { title: "For All Ages", desc: "Seniors, office workers, manual workers, athletes" },
        ],

        audience: [
            "People with chronic waist, hip, knee or leg pain",
            "Seniors with cold legs, cramps, numbness & weakness",
            "Those who sit or stand for long hours daily",
            "People with sciatica, knee pain, limited mobility",
            "Those who suffer from hemorrhoids, tailbone pain, back stiffness",
            "Anyone who wants safe, drug-free, low-cost pain relief",
            "Anyone who wants a self-healing system for waist & leg health",
        ],

        closingEn: "One course solves 22 waist & leg problems. Learn once, benefit for life.",
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

function ConditionsList({ items }) {
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

function LessonDetail({ lesson }) {
    return (
        <div className="space-y-5">
            {/* Intro */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug">{lesson.titleEn}</h2>
                    <p className="text-sm text-amber-700 mt-1 font-medium">{lesson.subtitleEn}</p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{lesson.intro}</p>
            </div>

            {/* Conditions Covered */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <SectionTitle>
                    {lesson.conditions.length} Conditions Covered
                </SectionTitle>
                <ConditionsList items={lesson.conditions} />
            </div>

            {/* Course Highlights */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <SectionTitle>Course Highlights</SectionTitle>
                <HighlightGrid items={lesson.highlights} />
            </div>

            {/* Who Is This For */}
            <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
                <SectionTitle>Who Is This For?</SectionTitle>
                <AudienceList items={lesson.audience} />
            </div>

            {/* Closing */}
            <div className="rounded-3xl bg-slate-900 px-5 py-5 text-center">
                <p className="text-sm font-medium text-white/90 leading-relaxed">{lesson.closingEn}</p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 leading-relaxed">
                Disclaimer: This program is for wellness and educational purposes only and is not medical advice. Please consult a qualified healthcare professional if you have any health concerns.
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function QigongPage({
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
                            Video Course · 视频课程
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
                    <p className="mt-1 text-sm text-slate-500">{COURSE.titleZh}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-bold text-slate-900">{COURSE.priceNow}</span>
                        <span className="text-sm text-slate-400 line-through">{COURSE.priceOld}</span>
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
                            ✓ Full Course Unlocked · 全套课程已解锁
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
                                Buy Lesson {activeLesson.id} Only · NZD 10
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
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">Lessons</p>
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
                                            🔒 NZD 10
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
                                        <p className="text-sm text-white/70">Select a lesson above to play.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center p-6 text-center text-white">
                                <div className="max-w-sm space-y-3">
                                    <p className="text-3xl">🔒</p>
                                    <p className="text-base font-bold">Locked</p>
                                    <p className="text-sm text-white/70">Purchase to unlock and watch.</p>
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
                        <p className="text-[10px] uppercase tracking-widest text-slate-400">Now Playing</p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            Lesson {activeLesson.id} · {activeLesson.titleEn}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{activeLesson.subtitleEn}</p>
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
