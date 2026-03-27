// src/pages/FengShuiPage.jsx
// Feng Shui & Space Harmony 二级页面
// 从 App.jsx 传入：lang ("zh" / "en") 和 onBack()

import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function FengShuiPage({ lang, onBack }) {
    const isZh = lang === "zh";

    return (
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:pt-12 space-y-10 text-slate-900">
            {/* 标题 & 封面图 */}
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
                            ? "家居风水与空间和谐：让家和办公桌都“帮你一把”"
                            : "Feng Shui & Space Harmony: Let Your Home and Desk Support You"}
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        {isZh
                            ? "这门课从实用角度讲解风水：不需要你背复杂的口诀，也不鼓励恐惧和迷信，而是回到最基础的感觉——空间是否让你放松、有安全感、愿意待在这里？通过方向、动线、光线与收纳的小调整，让家和工作环境更顺着你的目标。"
                            : "This course approaches Feng Shui in a practical way: no heavy formulas, no fear-based superstition. We return to the simple question: does this space help you feel calm, safe and focused? By adjusting directions, movement paths, light and clutter, we gently align your home and workspace with your intentions."}
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    {/* 可以改成你自己的风水封面图 */}
                    <img
                        src="/images/temple-offering-table.jpg"
                        alt={isZh ? "风水与空间布置课程封面" : "Feng Shui & space harmony cover"}
                        className="w-full max-h-[420px] object-cover"
                    />
                </div>
            </motion.section>

            {/* 核心思路 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "课程核心：方向 + 动线 + 情绪感受" : "Core Ideas: Direction, Flow & Feeling"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "我们会从“人”的感受出发，而不是只看罗盘数字：进门先看到什么？坐下时背后有没有空落落？工作时眼前是墙还是开阔？这些都会影响你对生活的期待感与行动力。课程中会用很多前后对比图解释调整前后的区别。"
                            : "We start from how a person feels, not only from compass numbers: What is the first thing you see when you enter? Is your back supported when you sit? When you work, do you face a wall or an open view? These details influence your sense of possibility and motivation. We use simple before/after examples to show the impact of each change."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {isZh ? "适合现代生活的小调整" : "Small Adjustments for Modern Life"}
                    </h2>
                    <p className="text-slate-600">
                        {isZh
                            ? "不要求你大装修或搬家，而是教你在现有条件下做“小步修正”：例如改变办公桌朝向、调整床头位置、处理门对门、补光与绿植等，让空间更有“向前”的感觉。"
                            : "We don’t ask you to renovate or move. Instead, the focus is on small corrections within your current space: adjusting desk direction, slightly shifting the bed, softening harsh door-to-door lines, improving light and adding living elements like plants."}
                    </p>
                </div>
            </motion.section>

            {/* 学到什么 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3"
            >
                <h2 className="text-lg font-semibold">
                    {isZh ? "你将学到的主要主题" : "Main Topics You’ll Learn"}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    <li>
                        •{" "}
                        {isZh
                            ? "基础方位与“家中气口”概念，用简单方式看懂门、窗、走廊给空间带来的流动感。"
                            : "Basic directions and the idea of a ‘qi mouth’ of the home—how doors, windows and corridors influence movement and energy."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "卧室布置原则：床位、床头、镜子与电器的摆放思路，帮助睡眠与恢复。"
                            : "Bedroom principles: bed position, headboard, mirrors and electronics arrangement for better rest and recovery."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "书桌与工作区：怎样布置更有专注感与掌控感，减少被打断和拖延。"
                            : "Desk & workspace layout: creating a sense of focus and control, reducing constant distractions and procrastination."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "玄关、客厅与储物：通过收纳和视觉焦点调整，让“回家”这件事变得更轻松。"
                            : "Entrance, living room and storage: decluttering and creating visual anchors so coming home feels lighter and more welcoming."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "常见风水担心的场景（如梁压床、门对门、卫生间位置等），给出温和、可操作的缓解方案。"
                            : "Gentle remedies for common Feng Shui worries (beams over the bed, door facing door, bathroom positions) without creating fear."}
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
                            ? "总觉得家里“东西很多、气氛很乱”，却不知道从哪里开始整理的人。"
                            : "People who feel their home is cluttered or chaotic but don’t know where to start."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "想在租房、合租空间里做一点力所能及的小改变的同学。"
                            : "Renters or flatmates who want small, affordable tweaks instead of big renovations."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "经常在家或在小空间里工作，希望提升专注度和“事业感”的自由职业者与远程工作者。"
                            : "Freelancers and remote workers who spend many hours at home and want their space to support their career."}
                    </li>
                    <li>
                        •{" "}
                        {isZh
                            ? "对风水好奇，但希望用理性、温和、尊重传统又不迷信的方式来接触它的人。"
                            : "Anyone curious about Feng Shui who wants a balanced, respectful yet down-to-earth introduction."}
                    </li>
                </ul>
            </motion.section>

            {/* 免责声明 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                    {isZh
                        ? "说明：本课程以传统风水与环境心理学思路为参考，旨在帮助你更有意识地布置生活空间。内容不构成房地产、建筑或财务投资建议，实际搬家、购房与装修决策请结合当地专业人士意见。"
                        : "Note: This program draws on traditional Feng Shui concepts and elements of environmental psychology, aimed at helping you make more mindful choices about your space. It is not real-estate, architectural or financial advice—please consult local professionals for major housing or renovation decisions."}
                </div>
            </motion.section>
        </div>
    );
}

export default FengShuiPage;