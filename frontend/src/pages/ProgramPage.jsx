// src/pages/ProgramPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

export default function ProgramPage({ onBack }) {
    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10 md:space-y-14">
            <button
                onClick={onBack}
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
                className="grid gap-8 md:grid-cols-[1.3fr,1fr] items-start"
            >
                <div className="space-y-4">
                    <p className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] text-white border border-slate-200/60">
                        Guided Learning Path · Program
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                        Build your own Tai Chi & traditional arts practice, step by step
                    </h1>

                    <p className="text-sm md:text-base text-slate-600">
                        This Program page connects all courses into one clear path: start with foundations, then grow into Qigong, Tai Chi, Wing Chun, TCM thinking and Feng Shui. You can follow the suggested order or choose the path that fits your current life.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-xs md:text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">
                        This program is ideal if:
                    </h2>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                        <li>
                            You prefer a guided sequence instead of "start anywhere you like".
                        </li>
                        <li>
                            You have 10–30 minutes a day and want to make it count.
                        </li>
                        <li>
                            You want both physical practice and cultural understanding.
                        </li>
                    </ul>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="space-y-5"
            >
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Three-stage learning path
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Level 1 · Foundations
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            Posture, breathing & basic Tai Chi
                        </h3>
                        <p className="text-xs text-slate-600">
                            Focus on safety and consistency. You'll start with standing, breathing and simple, gentle movements to build stability.
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>• Qigong & breathing intro</li>
                            <li>
                                • Tai Chi Mountain Practice · Part 1: stance, steps, basic hand shapes
                            </li>
                            <li>
                                • 10–15 minutes daily, feeling breath and body weight changes
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Level 2 · Build a habit
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            8-week balance & wellness plan
                        </h3>
                        <p className="text-xs text-slate-600">
                            Once you can follow the basics, move into an 8-week plan combining Tai Chi, Qigong and gentle face relaxation.
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>
                                • 3 days/week: Tai Chi Mountain + standing practice
                            </li>
                            <li>
                                • 2 days/week: face yoga & neck-shoulder release
                            </li>
                            <li>
                                • 1 day/week: TCM for daily life – body types & routines
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Level 3 · Deep dive & expansion
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            Wing Chun, Feng Shui & culture
                        </h3>
                        <p className="text-xs text-slate-600">
                            When your body feels stable, choose a more martial or more cultural focus to deepen your journey.
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>
                                • Wing Chun Foundations for structure & partner drills
                            </li>
                            <li>
                                • Feng Shui & Space Harmony for home and workspace
                            </li>
                            <li>
                                • Combine with TCM for a body–energy–space perspective
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-5"
            >
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    A realistic example week
                </h2>

                <p className="text-sm text-slate-600 max-w-3xl">
                    Here is a very practical weekly schedule: 10–25 minutes per day, even with a busy job. You can copy it or adjust it to your life.
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-7 text-[11px] md:text-xs text-slate-700 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <div key={day} className="p-3 md:p-4 space-y-1">
                                <p className="font-semibold text-slate-900">{day}</p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                    Duration
                                </p>
                                <p className="text-xs text-slate-700">
                                    {i === 5 || i === 6
                                        ? "20–25 min"
                                        : i === 2
                                            ? "10–15 min"
                                            : "15–20 min"}
                                </p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500 pt-1">
                                    Practice
                                </p>
                                <p className="text-xs text-slate-600">
                                    {(() => {
                                        if (i === 0) return "Tai Chi Mountain basics + standing";
                                        if (i === 1) return "Qigong breathing + neck release";
                                        if (i === 2) return "Face yoga · eyes & expression";
                                        if (i === 3) return "Tai Chi Mountain · review";
                                        if (i === 4) return "TCM thinking · body type & routine";
                                        if (i === 5) return "Wing Chun basics or Feng Shui";
                                        return "Free practice · review favourite moves";
                                    })()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5"
            >
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    How to combine the courses?
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            If your focus is health & stress
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• Qigong & Breathing</li>
                            <li>• Tai Chi Mountain Practice</li>
                            <li>• Face Yoga & Massage for sleep and soft expression</li>
                            <li>• TCM for Daily Life to understand why you feel tired</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            If you enjoy martial structure & power
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• Tai Chi Mountain Practice (full series)</li>
                            <li>• Wing Chun Foundations</li>
                            <li>• Standing Qigong for rooting and stamina</li>
                            <li>• Add a little TCM knowledge to avoid overtraining</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 md:col-span-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            If you start from space & lifestyle
                        </h3>
                        <p className="text-xs text-slate-600">
                            Begin with Feng Shui & Space Harmony plus TCM for Daily Life: tidy your space and routines first, then add gentle Tai Chi and Qigong. This order is very friendly if you've been under stress and movement feels hard at the moment.
                        </p>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}
