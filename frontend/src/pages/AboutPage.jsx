// src/pages/AboutPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const t = {
    title: "About EastCulture",
    subtitle: "A quiet online space to learn Tai Chi and traditional Chinese arts, step by step.",
    storyTitle: "Our story",
    storyText1:
        "EastCulture was created for people who love traditional Chinese culture but feel lost about where to start. Many students tell us they want to learn Tai Chi or Qigong, but local classes are far away, or the teaching style is too fast and hard to follow.",
    storyText2:
        "Here, we slow everything down. We break movements into small, clear steps and explain the ideas behind them, so you can build a calm, safe practice at home—even in a small living room.",
    philosophyTitle: "Teaching philosophy",
    philosophyPoints: [
        "Slow and safe: we care more about your joints and breathing than about looking cool on video.",
        "Rooted in tradition: movements are taught together with their cultural and philosophical background.",
        "Clear structure: short lessons, visible progress, and a simple learning path from beginner to advanced.",
        "Realistic practice: we design sequences that fit into busy modern life, not just ideal retreat schedules.",
    ],
    instructorTitle: "Instructor & team",
    instructorText:
        "Our main instructor has years of experience in Tai Chi, Qigong and traditional culture teaching for overseas students. The wider team includes people with backgrounds in psychology, education, and design, all helping to make the learning experience gentle, clear and visually calm.",
    designTitle: "How the courses are designed",
    designPoints: [
        "Each module focuses on one theme only: posture, breathing, stepping, or a short form.",
        "Most lessons are 10–20 minutes so you can repeat them easily.",
        "We use multiple camera angles and slow demonstrations whenever possible.",
        "Future updates will add more live sessions, practice plans and seasonal programs.",
    ],
    whoTitle: "Who we make this for",
    whoPoints: [
        "Beginners who want to start Tai Chi without pressure.",
        "People who are busy, stressed, and need a calm daily ritual.",
        "Overseas Chinese and international students who miss a connection to Chinese culture.",
        "Anyone who likes the idea of moving meditation more than intense workouts.",
    ],
    faqTitle: "Small FAQ",
    faq: [
        {
            q: "Do I need any experience?",
            a: "No. The beginner path is designed for complete newcomers. You only need a little space and comfortable clothing.",
        },
        {
            q: "Do I need special shoes or uniform?",
            a: "At the beginning, no. Soft, flat shoes and loose clothes are enough. Later, if you wish, our shop offers simple Tai Chi clothing and swords.",
        },
        {
            q: "Will there be subtitles?",
            a: "Yes, lessons are being prepared with English subtitles.",
        },
        {
            q: "Is this medical treatment?",
            a: "No. All content is for wellness and cultural learning only. Please follow your doctor's advice for any medical condition.",
        },
    ],
};

export default function AboutPage({ onBackHome }) {
    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10">
            <button
                onClick={onBackHome}
                className="mb-2 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
            >
                <span className="text-lg">←</span>
                Back to home
            </button>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-3"
            >
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    {t.title}
                </h1>
                <p className="max-w-3xl text-sm md:text-base text-slate-600">
                    {t.subtitle}
                </p>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.storyTitle}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.storyText1}
                    </p>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.storyText2}
                    </p>
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.philosophyTitle}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                        {t.philosophyPoints.map((line, idx) => (
                            <li key={idx}>• {line}</li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid gap-6 md:grid-cols-[1.1fr,1.1fr]"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.instructorTitle}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.instructorText}
                    </p>
                    <div className="relative mt-2 h-40 overflow-hidden rounded-2xl border border-slate-200 md:h-44">
                        <img
                            src="/images/martial-taichi-group.jpg"
                            alt="Instructor and students practicing"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/0" />
                        <div className="absolute bottom-2 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-slate-700 border border-slate-200 backdrop-blur">
                            Real practice moment
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.designTitle}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                        {t.designPoints.map((line, idx) => (
                            <li key={idx}>• {line}</li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
            >
                <h2 className="text-lg font-semibold mb-3 text-slate-900">{t.whoTitle}</h2>
                <div className="grid gap-3 md:grid-cols-2 text-xs md:text-sm text-slate-700">
                    {t.whoPoints.map((line, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
                        >
                            {line}
                        </div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
            >
                <h2 className="text-lg font-semibold mb-3 text-slate-900">{t.faqTitle}</h2>
                <div className="space-y-3 text-xs md:text-sm">
                    {t.faq.map((item, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                        >
                            <div className="font-semibold text-slate-900 mb-1">
                                Q: {item.q}
                            </div>
                            <div className="text-slate-700">A: {item.a}</div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
}
