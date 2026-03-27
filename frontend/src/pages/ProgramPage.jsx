// src/pages/ProgramPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

export default function ProgramPage({ lang, onBack }) {
    const isZh = lang === "zh";

    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10 md:space-y-14">
            <button
                onClick={onBack}
                className="mb-2 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
            >
                <span className="text-lg">←</span>
                {isZh ? "返回首页" : "Back to home"}
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
                        {isZh ? "学习路径 · Program" : "Guided Learning Path · Program"}
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                        {isZh
                            ? "从零开始，一步步建立属于你的太极与传统文化练习"
                            : "Build your own Tai Chi & traditional arts practice, step by step"}
                    </h1>

                    <p className="text-sm md:text-base text-slate-600">
                        {isZh
                            ? "Program 页面帮你把站内所有课程拼成一条清晰的路线：先打基础，再根据你的时间与兴趣，慢慢扩展到气功、太极、咏春、中医思维和家居风水。你可以按下面的顺序学习，也可以选最适合当下状态的一条路径。"
                            : "This Program page connects all courses into one clear path: start with foundations, then grow into Qigong, Tai Chi, Wing Chun, TCM thinking and Feng Shui. You can follow the suggested order or choose the path that fits your current life."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-xs md:text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">
                        {isZh ? "适合这样的你：" : "This program is ideal if:"}
                    </h2>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                        <li>
                            {isZh
                                ? "希望有人替你安排顺序，不想“从哪里开始都可以”。"
                                : "You prefer a guided sequence instead of “start anywhere you like”."}
                        </li>
                        <li>
                            {isZh
                                ? "每天只有 10–30 分钟，希望用最少的时间，坚持最长久。"
                                : "You have 10–30 minutes a day and want to make it count."}
                        </li>
                        <li>
                            {isZh
                                ? "想在身体练习之外，也理解背后的文化与思维方式。"
                                : "You want both physical practice and cultural understanding."}
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
                    {isZh ? "三阶段学习路径" : "Three-stage learning path"}
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {isZh ? "Level 1 · 打基础" : "Level 1 · Foundations"}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "站桩、呼吸与基础太极" : "Posture, breathing & basic Tai Chi"}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {isZh
                                ? "目标是“安全、不累、能坚持”。你会先从站姿、呼吸和简单动作开始，慢慢建立身体的稳定感。"
                                : "Focus on safety and consistency. You’ll start with standing, breathing and simple, gentle movements to build stability."}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>• {isZh ? "【站桩与气功】入门小课程" : "Qigong & breathing intro"}</li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "【太极山景系统课】第一阶段：站姿、步法与基本手型"
                                    : "Tai Chi Mountain Practice · Part 1: stance, steps, basic hand shapes"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "每天 10–15 分钟，感受呼吸和身体重量的变化"
                                    : "10–15 minutes daily, feeling breath and body weight changes"}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {isZh ? "Level 2 · 养习惯" : "Level 2 · Build a habit"}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "8 周身心调理计划" : "8-week balance & wellness plan"}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {isZh
                                ? "当你能稳定跟完入门课程，就可以进入一个更完整的 8 周练习计划：把太极、气功与面部放松结合起来。"
                                : "Once you can follow the basics, move into an 8-week plan combining Tai Chi, Qigong and gentle face relaxation."}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>
                                •{" "}
                                {isZh
                                    ? "每周 3 天：太极山景主练 + 站桩巩固"
                                    : "3 days/week: Tai Chi Mountain + standing practice"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "每周 2 天：面部瑜伽与颈肩放松"
                                    : "2 days/week: face yoga & neck-shoulder release"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "每周 1 天：中医思维课程，理解体质与作息调整"
                                    : "1 day/week: TCM for daily life – body types & routines"}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {isZh ? "Level 3 · 深入与扩展" : "Level 3 · Deep dive & expansion"}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "咏春、风水与文化理解" : "Wing Chun, Feng Shui & culture"}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {isZh
                                ? "当你的身体已经适应稳定练习，可以开始选择一个“武术向”或“文化向”的深入方向。"
                                : "When your body feels stable, choose a more martial or more cultural focus to deepen your journey."}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>
                                •{" "}
                                {isZh
                                    ? "【咏春基础】适合想体验对练与结构力量的人"
                                    : "Wing Chun Foundations for structure & partner drills"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "【家居风水与空间和谐】适合希望调整居住环境的人"
                                    : "Feng Shui & Space Harmony for home and workspace"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "搭配中医思维课程，形成“身 · 气 · 环境”整体观"
                                    : "Combine with TCM for a body–energy–space perspective"}
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
                    {isZh ? "一个简单可行的“理想一周”" : "A realistic example week"}
                </h2>

                <p className="text-sm text-slate-600 max-w-3xl">
                    {isZh
                        ? "下面是一个非常接地气的一周安排示例：每天 10–25 分钟，工作再忙也可以完成。你可以直接照抄，也可以根据自己的情况改动。"
                        : "Here is a very practical weekly schedule: 10–25 minutes per day, even with a busy job. You can copy it or adjust it to your life."}
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-7 text-[11px] md:text-xs text-slate-700 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {[
                            isZh ? "周一" : "Mon",
                            isZh ? "周二" : "Tue",
                            isZh ? "周三" : "Wed",
                            isZh ? "周四" : "Thu",
                            isZh ? "周五" : "Fri",
                            isZh ? "周六" : "Sat",
                            isZh ? "周日" : "Sun",
                        ].map((day, i) => (
                            <div key={day} className="p-3 md:p-4 space-y-1">
                                <p className="font-semibold text-slate-900">{day}</p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                    {isZh ? "建议时长" : "Duration"}
                                </p>
                                <p className="text-xs text-slate-700">
                                    {i === 5 || i === 6
                                        ? "20–25 min"
                                        : i === 2
                                            ? "10–15 min"
                                            : "15–20 min"}
                                </p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500 pt-1">
                                    {isZh ? "内容" : "Practice"}
                                </p>
                                <p className="text-xs text-slate-600">
                                    {(() => {
                                        if (i === 0)
                                            return isZh
                                                ? "太极山景 · 基础套路 + 站桩"
                                                : "Tai Chi Mountain basics + standing";
                                        if (i === 1)
                                            return isZh
                                                ? "气功呼吸 · 肩颈放松"
                                                : "Qigong breathing + neck release";
                                        if (i === 2)
                                            return isZh
                                                ? "面部瑜伽 · 眼周与表情放松"
                                                : "Face yoga · eyes & expression";
                                        if (i === 3)
                                            return isZh
                                                ? "太极山景 · 进阶动作复习"
                                                : "Tai Chi Mountain · review";
                                        if (i === 4)
                                            return isZh
                                                ? "中医思维课程 · 体质与作息"
                                                : "TCM thinking · body type & routine";
                                        if (i === 5)
                                            return isZh
                                                ? "咏春基础 / 家居风水（二选一）"
                                                : "Wing Chun basics or Feng Shui";
                                        return isZh
                                            ? "自由练习 · 温习一周重点动作"
                                            : "Free practice · review favourite moves";
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
                    {isZh ? "如何组合本站课程？" : "How to combine the courses?"}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "如果你更关心“身体和情绪压力”" : "If your focus is health & stress"}
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• Qigong & Breathing</li>
                            <li>• Tai Chi Mountain Practice</li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "面部瑜伽与按摩（放松表情与睡前练习）"
                                    : "Face Yoga & Massage for sleep and soft expression"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "生活中的中医思维（理解“为什么总是累”）"
                                    : "TCM for Daily Life to understand why you feel tired"}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "如果你更喜欢“武术与结构力量”" : "If you enjoy martial structure & power"}
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• Tai Chi Mountain Practice (full series)</li>
                            <li>• Wing Chun Foundations</li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "站桩与气功（增强下盘与耐力）"
                                    : "Standing Qigong for rooting and stamina"}
                            </li>
                            <li>
                                •{" "}
                                {isZh
                                    ? "配合一点中医 / 经络知识，避免过度训练"
                                    : "Add a little TCM knowledge to avoid overtraining"}
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 md:col-span-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {isZh ? "如果你想从“空间与生活方式”入手" : "If you start from space & lifestyle"}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {isZh
                                ? "可以先从【家居风水与空间和谐】与【生活中的中医思维】开始，先整理房间与作息，再逐步加入轻柔的太极与气功。这种顺序对长期压力大、难以直接运动的人特别友好。"
                                : "Begin with Feng Shui & Space Harmony plus TCM for Daily Life: tidy your space and routines first, then add gentle Tai Chi and Qigong. This order is very friendly if you’ve been under stress and movement feels hard at the moment."}
                        </p>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}