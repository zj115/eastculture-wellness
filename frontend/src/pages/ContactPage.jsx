// src/pages/ContactPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const content = {
    en: {
        title: "Contact",
        subtitle:
            "Questions about courses, cooperation or custom programs? Send us a message and we’ll respond as soon as we can.",
        sections: {
            waysTitle: "Ways to reach us",
            emailLabel: "Email",
            emailValue: "jzc1998926@gmail.com",
            socialLabel: "Social & communities",
            socialItems: [
                "WeChat group for enrolled students (details inside the course area).",
                "Occasional updates on Instagram and YouTube (coming soon).",
            ],
            supportTitle: "Support hours",
            supportText:
                "We usually reply within 24–48 hours on weekdays. For urgent technical issues (such as login problems), please mention your device and browser in the message.",
        },
        form: {
            title: "Send us a message",
            name: "Name",
            email: "Email",
            topic: "Topic",
            topics: [
                "Course question",
                "Billing / membership",
                "Collaboration",
                "Other",
            ],
            message: "Message",
            messagePlaceholder:
                "Tell us briefly what you need help with, and which course or page you were on.",
            submit: "Send message",
            success: "Thank you! Your message has been recorded (demo form only).",
        },
    },
    zh: {
        title: "联系我们",
        subtitle:
            "如果你对课程、付费方式或合作有任何疑问，都可以在这里留言，我们会尽快回复你。",
        sections: {
            waysTitle: "联系方式",
            emailLabel: "邮箱",
            emailValue: "jzc1998926@gmail.com",
            socialLabel: "社群与平台",
            socialItems: [
                "已购学员可加入微信练功群（课程里会提供具体方式）。",
                "后续会在 Instagram / YouTube 不定期更新练习片段。",
            ],
            supportTitle: "回复时间",
            supportText:
                "一般在工作日 24–48 小时内回复。若是登录或技术问题，建议在留言里写明你使用的设备和浏览器，方便排查。",
        },
        form: {
            title: "发送留言",
            name: "姓名",
            email: "邮箱",
            topic: "主题",
            topics: ["课程相关", "付费 / 会员", "合作与邀约", "其他"],
            message: "留言内容",
            messagePlaceholder:
                "简单描述你遇到的问题或想咨询的内容，可以顺便写一下你正在看的课程或页面。",
            submit: "发送",
            success: "已收到你的留言（当前为演示表单）。非常感谢！",
        },
    },
};

export default function ContactPage({ lang = "en", onBackHome }) {
    const isZh = lang === "zh";
    const t = content[isZh ? "zh" : "en"];

    function handleSubmit(e) {
        e.preventDefault();
        alert(t.form.success);
        e.target.reset();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10">
            <button
                onClick={onBackHome}
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
                className="grid gap-6 md:grid-cols-3"
            >
                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs md:text-sm text-slate-700 space-y-2 shadow-sm">
                    <h2 className="text-sm md:text-base font-semibold mb-1 text-slate-900">
                        {t.sections.emailLabel}
                    </h2>
                    <p className="text-slate-700">
                        <a
                            href={`mailto:${t.sections.emailValue}`}
                            className="text-slate-900 underline underline-offset-2 hover:text-slate-700"
                        >
                            {t.sections.emailValue}
                        </a>
                    </p>
                    <p className="text-[11px] text-slate-500">
                        {isZh
                            ? "如果你不习惯填表单，可以直接发邮件。"
                            : "You can also email us directly if you prefer."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs md:text-sm text-slate-700 space-y-2 shadow-sm">
                    <h2 className="text-sm md:text-base font-semibold mb-1 text-slate-900">
                        {t.sections.socialLabel}
                    </h2>
                    <ul className="space-y-1.5 text-slate-600">
                        {t.sections.socialItems.map((line, idx) => (
                            <li key={idx}>• {line}</li>
                        ))}
                    </ul>
                </div>

                {/* 回复时间（去掉绿色） */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs md:text-sm text-slate-700 space-y-2 shadow-sm">
                    <h2 className="text-sm md:text-base font-semibold mb-1 text-slate-900">
                        {t.sections.supportTitle}
                    </h2>
                    <p className="text-slate-700">{t.sections.supportText}</p>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid gap-8 md:grid-cols-[minmax(0,420px),1fr] items-start"
            >
                <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
                    <h2 className="text-lg md:text-xl font-semibold mb-3 text-slate-900">
                        {t.form.title}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700">
                                {t.form.name}
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700">
                                {t.form.email}
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700">
                                {t.form.topic}
                            </label>
                            <select
                                name="topic"
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
                            >
                                {t.form.topics.map((topic, idx) => (
                                    <option key={idx} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700">
                                {t.form.message}
                            </label>
                            <textarea
                                name="message"
                                rows={4}
                                required
                                placeholder={t.form.messagePlaceholder}
                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                        >
                            {t.form.submit}
                        </button>
                    </form>
                </section>

                <section className="hidden md:block space-y-4 text-sm text-slate-600">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
                        <h3 className="text-base font-semibold text-slate-900">
                            {isZh ? "给你的小提示" : "Helpful tip"}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600">
                            {isZh
                                ? "如果你有具体课程问题（例如“某一节第几分钟看不懂”），可以在留言里写下模块名称和时间点，我们会更快地帮你解答。"
                                : "If your question is about a specific lesson, mentioning the course name and time stamp will help us respond more precisely."}
                        </p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
                        <h3 className="text-base font-semibold text-slate-900">
                            {isZh ? "隐私说明" : "Privacy note"}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600">
                            {isZh
                                ? "我们只会用你的联系方式来回复本次问题，不会随意公开或转卖你的信息。"
                                : "We only use your contact details to reply to your message. Your information is never sold or shared for unrelated purposes."}
                        </p>
                    </div>
                </section>
            </motion.section>
        </main>
    );
}