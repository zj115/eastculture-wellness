// src/pages/FengShuiPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function FengShuiPage({ onBack }) {
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
                        Feng Shui & Space Harmony: Let Your Home and Desk Support You
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        This course approaches Feng Shui in a practical way: no heavy formulas, no fear-based superstition. We return to the simple question: does this space help you feel calm, safe and focused? By adjusting directions, movement paths, light and clutter, we gently align your home and workspace with your intentions.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    <img
                        src="/images/temple-offering-table.jpg"
                        alt="Feng Shui & space harmony cover"
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
                        Core Ideas: Direction, Flow & Feeling
                    </h2>
                    <p className="text-slate-600">
                        We start from how a person feels, not only from compass numbers: What is the first thing you see when you enter? Is your back supported when you sit? When you work, do you face a wall or an open view? These details influence your sense of possibility and motivation. We use simple before/after examples to show the impact of each change.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        Small Adjustments for Modern Life
                    </h2>
                    <p className="text-slate-600">
                        We don't ask you to renovate or move. Instead, the focus is on small corrections within your current space: adjusting desk direction, slightly shifting the bed, softening harsh door-to-door lines, improving light and adding living elements like plants.
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
                    Main Topics You'll Learn
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        • Basic directions and the idea of a 'qi mouth' of the home—how doors, windows and corridors influence movement and energy.
                    </li>
                    <li>
                        • Bedroom principles: bed position, headboard, mirrors and electronics arrangement for better rest and recovery.
                    </li>
                    <li>
                        • Desk & workspace layout: creating a sense of focus and control, reducing constant distractions and procrastination.
                    </li>
                    <li>
                        • Entrance, living room and storage: decluttering and creating visual anchors so coming home feels lighter and more welcoming.
                    </li>
                    <li>
                        • Gentle remedies for common Feng Shui worries (beams over the bed, door facing door, bathroom positions) without creating fear.
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
                        • People who feel their home is cluttered or chaotic but don't know where to start.
                    </li>
                    <li>
                        • Renters or flatmates who want small, affordable tweaks instead of big renovations.
                    </li>
                    <li>
                        • Freelancers and remote workers who spend many hours at home and want their space to support their career.
                    </li>
                    <li>
                        • Anyone curious about Feng Shui who wants a balanced, respectful yet down-to-earth introduction.
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
                    Note: This program draws on traditional Feng Shui concepts and elements of environmental psychology, aimed at helping you make more mindful choices about your space. It is not real-estate, architectural or financial advice—please consult local professionals for major housing or renovation decisions.
                </div>
            </motion.section>
        </div>
    );
}

export default FengShuiPage;
