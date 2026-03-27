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

const aboutContent = {
    en: {
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
                a: "Yes, lessons are being prepared with both English and Chinese subtitles so you can switch according to your preference.",
            },
            {
                q: "Is this medical treatment?",
                a: "No. All content is for wellness and cultural learning only. Please follow your doctor’s advice for any medical condition.",
            },
        ],
    },
    zh: {
        title: "关于 EastCulture",
        subtitle: "一个安静的线上空间，让你一步一步练太极、懂传统。",
        storyTitle: "我们想做什么？",
        storyText1:
            "EastCulture 是为那些“很想学太极和传统文化、但不知道从哪里开始”的人准备的。很多同学说，本地课堂太远、时间对不上，或者节奏太快、听不懂，只能刷零散的视频，越看越迷茫。",
        storyText2:
            "在这里，我们选择把一切都放慢。动作拆得更细、讲解更清楚，同时把背后的文化和思路讲给你听，让你即使在小小的客厅里，也能安全、稳定地建立自己的练功节奏。",
        philosophyTitle: "我们的教学理念",
        philosophyPoints: [
            "慢一点、稳一点：比起好看，我们更在意你的关节、呼吸和长期状态。",
            "有根可寻：动作不是体操，而是和中医、武术、道家思想连在一起的整体练习。",
            "结构清晰：短节奏课程 + 明确学习路径，从入门到进阶一步一步来。",
            "贴近现实：所有设计都考虑到“上班、上课、带娃”的真实生活，不需要完美条件。",
        ],
        instructorTitle: "授课老师与团队",
        instructorText:
            "主讲老师长期在海外教授太极、气功与传统文化，熟悉零基础同学常见的问题与卡点。团队中还包括心理学、教育学与设计背景的成员，一起把课程做得更温和、清晰，也更符合现代审美。",
        designTitle: "课程是怎样设计出来的？",
        designPoints: [
            "每个模块只专注一个主题：站姿、呼吸、步伐或者一小段套路。",
            "大部分单节课控制在 10–20 分钟，方便反复练习。",
            "尽量使用多个机位与慢速示范，让你看得清、跟得上。",
            "后续会逐步加入直播课、练功计划和节气相关的小课程。",
        ],
        whoTitle: "我们主要服务这些人",
        whoPoints: [
            "零基础但一直对太极感兴趣的人。",
            "生活节奏很快、需要一个安静仪式感的人。",
            "在海外生活、想重新连回中文和中国文化的同学。",
            "不喜欢高强度健身，更希望通过柔和运动调整身心的人。",
        ],
        faqTitle: "常见小问题",
        faq: [
            {
                q: "完全没有基础可以学吗？",
                a: "可以。入门路径就是为零基础准备的，只要有一点点空间、穿宽松衣服就可以开始。",
            },
            {
                q: "一定要买太极服和太极鞋吗？",
                a: "一开始不需要，平底、柔软的鞋子就可以。以后如果你想要更完整的仪式感，可以考虑我们的练功服和太极剑。",
            },
            {
                q: "会有中英文字幕吗？",
                a: "会的。课程会逐步补全中英文字幕，你可以根据习惯自由切换。",
            },
            {
                q: "这些内容算不算治疗？",
                a: "不算。平台只提供身心健康与文化学习相关信息，任何疾病请以医生意见为准。",
            },
        ],
    },
};

export default function AboutPage({ lang = "en", onBackHome }) {
    const isZh = lang === "zh";
    const t = aboutContent[isZh ? "zh" : "en"];

    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10">
            {/* 返回按钮 */}
            <button
                onClick={onBackHome}
                className="mb-2 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
            >
                <span className="text-lg">←</span>
                {isZh ? "返回首页" : "Back to home"}
            </button>

            {/* 标题 & 简介 */}
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

            {/* 故事 + 教学理念 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="grid gap-6 md:grid-cols-2"
            >
                {/* 左：故事 */}
                <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.storyTitle}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.storyText1}
                    </p>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.storyText2}
                    </p>
                </div>

                {/* 右：教学理念（去除绿色） */}
                <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.philosophyTitle}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                        {t.philosophyPoints.map((line, idx) => (
                            <li key={idx}>• {line}</li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            {/* 老师 & 课程设计 */}
            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid gap-6 md:grid-cols-[1.1fr,1.1fr]"
            >
                {/* 老师 */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.instructorTitle}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t.instructorText}
                    </p>
                    <div className="relative mt-2 h-40 overflow-hidden rounded-2xl border border-slate-200 md:h-44">
                        <img
                            src="/images/martial-taichi-group.jpg"
                            alt={isZh ? "老师与学员练功场景" : "Instructor and students practicing"}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/0" />
                        <div className="absolute bottom-2 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-slate-700 border border-slate-200 backdrop-blur">
                            {isZh ? "真实练功场景照片" : "Real practice moment"}
                        </div>
                    </div>
                </div>

                {/* 课程设计 */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t.designTitle}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                        {t.designPoints.map((line, idx) => (
                            <li key={idx}>• {line}</li>
                        ))}
                    </ul>
                </div>
            </motion.section>

            {/* 适合谁 */}
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

            {/* 小 FAQ */}
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