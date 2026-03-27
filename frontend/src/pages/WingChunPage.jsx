// src/pages/WingChunPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function WingChunPage({ lang, onBack }) {
    const isZh = lang === "zh";

    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:pt-12 space-y-10 text-slate-900">
            {/* 标题 + 大图 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                        {isZh
                            ? "咏春基础课：从中线到实战应用"
                            : "Wing Chun Foundations: From Centerline to Practical Skills"}
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        {isZh
                            ? "这门课会带你从零开始理解咏春的中线理论、结构和基本黐手练习，适合完全没基础，或者学过一点想重新打好根基的同学。你可以在家跟着视频一步一步练，不需要固定搭档，也不需要大量器械。"
                            : "This course takes you from zero to a solid foundation in Wing Chun. You’ll learn centerline theory, body structure, basic drills and solo practice you can do at home—even without a regular training partner or equipment."}
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    <img
                        src="/images/martial-staff-demo.jpg"
                        alt={isZh ? "咏春课程封面" : "Wing Chun training cover"}
                        className="w-full max-h-[420px] object-cover"
                    />
                </div>
            </motion.section>

            {/* 为什么学咏春 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "为什么学咏春？" : "Why Wing Chun?"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "咏春是一套紧凑、实用、讲究结构与效率的拳法。它不像花拳绣腿，更适合日常自我防护、提升身体协调与专注力。通过系统练习，你会学会如何在小空间内合理发力、保护中线，并且让动作更加经济、省力。"
                            : "Wing Chun is compact, efficient and structure-based. It’s not about flashy movements, but about practical self-defence, body awareness and calm focus. With systematic practice you’ll learn to protect your centerline, generate power from structure and move with economy and precision."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "课程风格与节奏" : "How This Course Is Taught"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "每一节课都以“慢讲解 + 示范 + 重复练习”的方式进行，你可以随时暂停、倒回看。老师会反复强调站姿、放松和呼吸，不会一上来就高难度对打，而是帮助你一点点搭建稳定的基础。"
                            : "Each lesson follows a clear pattern: slow explanation, demonstration, then guided repetitions. You can pause and replay anytime. The instructor focuses on posture, relaxation and breathing first, before moving into partner drills, so you build a safe and solid base."}
                    </p>
                </div>
            </motion.section>

            {/* 学什么 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    {isZh ? "你将学到的核心内容" : "What You’ll Learn"}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        •{" "}
                        {isZh
                            ? "站姿与结构：如何站得稳、放得松，让身体自然地“连成一体”。"
                            : "Stance & structure: how to stand stable yet relaxed, and connect the body as one unit."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "中线概念：为什么咏春强调保护中线、攻击中线，以及在实战中的意义。"
                            : "Centerline theory: what the centerline is and why protecting and attacking it matters in Wing Chun."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "基本手法与脚步：摊手、伏手、膀手等常用手型，以及配合的步法移动。"
                            : "Fundamental hand techniques and footwork: tan sau, fuk sau, bong sau and more, with matching steps."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "单人功架与短组合：即使一个人在家，也能完整练习的一套流程。"
                            : "Solo drills & short combinations you can practice at home without a partner."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "黐手入门思路：如何通过轻黏、感知对方力量方向，而不是靠蛮力互推。"
                            : "Intro to chi sau: learning to stick, listen and redirect rather than push with brute force."}
                    </li>
                </ul>
            </motion.section>

            {/* 适合人群 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    {isZh ? "适合哪些人？" : "Who This Course Is For"}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        •{" "}
                        {isZh
                            ? "对功夫电影、咏春文化好奇，希望真正理解背后原理的同学。"
                            : "Students who love kung fu movies and want to understand the real principles behind Wing Chun."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "没时间去道馆，但希望在家系统练习一门武术的人。"
                            : "People who can’t always go to a gym but want a structured martial art to train at home."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "已经学过其他拳种，想通过咏春提升结构和近身实战理解的练习者。"
                            : "Practitioners of other styles who want better structure and close-range understanding."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "希望增强自信、改善身体协调性与专注力的上班族和学生。"
                            : "Anyone who wants more confidence, coordination and focus in daily life."}
                    </li>
                </ul>
            </motion.section>

            {/* 小提示 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                    {isZh
                        ? "温馨提示：请在安全、空间足够的环境下练习。所有示范仅为教学用途，不鼓励任何形式的冲突或暴力。"
                        : "Note: Please train in a safe environment with enough space. All demonstrations are for educational purposes only and are not an encouragement to engage in violence."}
                </div>
            </motion.section>
        </div>
    );
}

export default WingChunPage;