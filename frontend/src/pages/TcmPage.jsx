// src/pages/TcmPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function TcmPage({ onBack }) {
    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:pt-12 space-y-10 text-slate-900">
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        Traditional Chinese Medicine for Daily Life: Meridians, Body Types & Everyday Care
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        This course is not about turning you into a doctor. Instead, we use everyday language and stories to explain TCM ideas: What are meridians? What do cold, heat, deficiency and excess really mean? Why do some people handle late nights better than others? You will learn to read the signals of your own body and make kinder choices in rest, food and lifestyle.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    <img
                        src="/images/tcm-herb-grinding.jpg"
                        alt="Herbs being ground for Traditional Chinese Medicine"
                        className="w-full max-h-[420px] object-cover"
                    />
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        How TCM Sees the Body
                    </h2>
                    <p className="text-slate-600">
                        Instead of only focusing on the painful spot, TCM looks at the whole person: Is your qi and blood flowing? Are sleep, emotions and digestion in balance? Through diagrams and real-life examples we introduce the ideas of 'wholeness' and 'balance', and why the same symptom can come from very different patterns.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        How the Course is Structured
                    </h2>
                    <p className="text-slate-600">
                        The course is divided into short modules: basic concepts, case stories, mini self-checks and everyday tips. Each lesson is 8–15 minutes so you can easily relate the content to yourself or your family without memorising heavy terminology—just a few clear guiding ideas you can reuse.
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    Key Modules You'll Learn
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        • Meridians & Qi-Blood Basics: using simple 'water pipe' and 'road traffic' analogies to understand flow, blockage and regulation.
                    </li>
                    <li>
                        • Common body types: tendencies toward cold, heat, qi deficiency, blood deficiency and how each pattern reacts to food, weather and stress.
                    </li>
                    <li>
                        • Digestive health & the Spleen-Stomach system: why TCM calls it 'the root of post-heaven qi' and what that means in modern life.
                    </li>
                    <li>
                        • Emotions & the five organs: accessible explanations of ideas like 'the Liver governs free flow' so you can see how mood and body affect each other.
                    </li>
                    <li>
                        • Seasonal care: how to gently adjust lifestyle and habits across spring, summer, autumn and winter.
                    </li>
                </ul>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    Who This Course is For
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        • People who often feel cold hands and feet, get 'heat' symptoms easily, or experience the same minor issues again and again.
                    </li>
                    <li>
                        • Office workers who want to care for themselves in a gentle, long-term way instead of only relying on painkillers and pushing through.
                    </li>
                    <li>
                        • Learners interested in TCM who tried reading books before but found them too abstract or complicated.
                    </li>
                    <li>
                        • Students of Tai Chi, qigong or other mind–body practices who want a clearer 'map' of the body's internal logic.
                    </li>
                </ul>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                    Important: This course is for sharing traditional TCM theory and lifestyle ideas only. It does not provide diagnosis or prescriptions. For any concrete illness or ongoing discomfort, please consult qualified medical professionals first.
                </div>
            </motion.section>
        </div>
    );
}

export default TcmPage;
