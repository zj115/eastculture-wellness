// src/pages/TcmPage.jsx
// Traditional Chinese Medicine for Daily Life 课程二级页面
// 之后从 App.jsx 传入：lang ("zh" / "en") 和 onBack()

import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function TcmPage({ lang, onBack }) {
    const isZh = lang === "zh";

    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:pt-12 space-y-10 text-slate-900">
            {/* 标题 + 封面图 */}
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
                            ? "生活里的中医思维：经络、体质与日常调养"
                            : "Traditional Chinese Medicine for Daily Life: Meridians, Body Types & Everyday Care"}
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        {isZh
                            ? "这门课不是让你“学会看病”，而是用很生活化的方式认识中医：什么是经络？什么是寒、热、虚、实？为什么同样是熬夜，有的人第二天精神还行，有的人立刻感冒？我们会用简单的例子帮你看懂身体的信号，做出更适合自己的作息与饮食选择。"
                            : "This course is not about turning you into a doctor. Instead, we use everyday language and stories to explain TCM ideas: What are meridians? What do cold, heat, deficiency and excess really mean? Why do some people handle late nights better than others? You will learn to read the signals of your own body and make kinder choices in rest, food and lifestyle."}
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    {/* 用首页卡片同一张图 */}
                    <img
                        src="/images/tcm-herb-grinding.jpg"
                        alt={
                            isZh
                                ? "中药研磨与草药细节"
                                : "Herbs being ground for Traditional Chinese Medicine"
                        }
                        className="w-full max-h-[420px] object-cover"
                    />
                </div>
            </motion.section>

            {/* 中医视角有什么不一样 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "中医看身体：整体、平衡与流动" : "How TCM Sees the Body"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "中医不会只看“哪里疼”，而是看整个人的状态：气血流不流畅？睡眠、情绪、饮食有没有失衡？这门课会用图示和生活场景介绍“整体观”和“平衡观”，让你知道为什么同一种问题可以有不同的调理方式。"
                            : "Instead of only focusing on the painful spot, TCM looks at the whole person: Is your qi and blood flowing? Are sleep, emotions and digestion in balance? Through diagrams and real-life examples we introduce the ideas of ‘wholeness’ and ‘balance’, and why the same symptom can come from very different patterns."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "课程形式与节奏" : "How the Course is Structured"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "课程分为多个短模块：基础概念、小案例分析、简单自测与日常建议。每节视频 8–15 分钟，你可以边看边在心里对照自己或家人的情况，不需要记一堆术语，只要抓住几个“方向感”就够用。"
                            : "The course is divided into short modules: basic concepts, case stories, mini self-checks and everyday tips. Each lesson is 8–15 minutes so you can easily relate the content to yourself or your family without memorising heavy terminology—just a few clear guiding ideas you can reuse."}
                    </p>
                </div>
            </motion.section>

            {/* 学什么内容 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    {isZh ? "你将学到的重点模块" : "Key Modules You’ll Learn"}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        •{" "}
                        {isZh
                            ? "经络与气血基础：用“水管”和“马路”的比喻，理解气血运行、堵塞与调理的思路。"
                            : "Meridians & Qi-Blood Basics: using simple ‘water pipe’ and ‘road traffic’ analogies to understand flow, blockage and regulation."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "常见体质类型：偏寒、偏热、气虚、血虚等特点，以及在饮食与作息上的注意点。"
                            : "Common body types: tendencies toward cold, heat, qi deficiency, blood deficiency and how each pattern reacts to food, weather and stress."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "脾胃与消化：为什么中医说“脾胃为后天之本”，以及如何在忙碌生活中照顾好消化系统。"
                            : "Digestive health & the Spleen-Stomach system: why TCM calls it ‘the root of post-heaven qi’ and what that means in modern life."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "情绪与五脏：用易懂的方式讲“肝主疏泄、心主神明”等概念，帮助你理解情绪与身体之间的互相影响。"
                            : "Emotions & the five organs: accessible explanations of ideas like ‘the Liver governs free flow’ so you can see how mood and body affect each other."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "四季养生思路：春夏秋冬分别适合怎样的作息节奏与小调整。"
                            : "Seasonal care: how to gently adjust lifestyle and habits across spring, summer, autumn and winter."}
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
                    {isZh ? "适合哪些人？" : "Who This Course is For"}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        •{" "}
                        {isZh
                            ? "经常容易手脚冰凉、容易上火、或者同样的小问题反复出现的人。"
                            : "People who often feel cold hands and feet, get ‘heat’ symptoms easily, or experience the same minor issues again and again."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "想用更温和、长期的方式照顾自己，而不是只靠止痛和“硬扛”的上班族。"
                            : "Office workers who want to care for themselves in a gentle, long-term way instead of only relying on painkillers and pushing through."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "对中医感兴趣，但以前看书觉得太难、太“玄”的同学。"
                            : "Learners interested in TCM who tried reading books before but found them too abstract or complicated."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "正在练太极、气功或其他身心练习，希望多一点“身体地图”和内在理解的人。"
                            : "Students of Tai Chi, qigong or other mind–body practices who want a clearer ‘map’ of the body’s internal logic."}
                    </li>
                </ul>
            </motion.section>

            {/* 温馨提示 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                    {isZh
                        ? "重要说明：课程内容仅为传统中医理论与生活方式建议分享，不构成任何诊断或处方。对于具体疾病或持续不适，请务必优先咨询当地正规医疗机构或专业医生。"
                        : "Important: This course is for sharing traditional TCM theory and lifestyle ideas only. It does not provide diagnosis or prescriptions. For any concrete illness or ongoing discomfort, please consult qualified medical professionals first."}
                </div>
            </motion.section>
        </div>
    );
}

export default TcmPage;