// src/pages/AboutPage.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function AboutPage({ onBackHome }) {
    const { t } = useTranslation();
    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10">
            <button
                onClick={onBackHome}
                className="mb-2 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
            >
                <span className="text-lg">←</span>
                {t('common.backToHome')}
            </button>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="space-y-3"
            >
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                    {t('about.title')}
                </h1>
                <p className="max-w-3xl text-sm md:text-base text-slate-600">
                    {t('about.subtitle')}
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
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t('about.storyTitle')}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t('about.storyText1')}
                    </p>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t('about.storyText2')}
                    </p>
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t('about.philosophyTitle')}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                        <li>• {t('about.philosophy1')}</li>
                        <li>• {t('about.philosophy2')}</li>
                        <li>• {t('about.philosophy3')}</li>
                        <li>• {t('about.philosophy4')}</li>
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
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t('about.instructorTitle')}</h2>
                    <p className="text-xs md:text-sm text-slate-600">
                        {t('about.instructorText')}
                    </p>
                    <div className="relative mt-2 h-40 overflow-hidden rounded-2xl border border-slate-200 md:h-44">
                        <img
                            src="/images/martial-taichi-group.jpg"
                            alt="Instructor and students practicing"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/0" />
                        <div className="absolute bottom-2 left-3 rounded-full bg-white/85 px-3 py-1 text-[11px] text-slate-700 border border-slate-200 backdrop-blur">
                            {t('about.realPracticeMoment')}
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-lg font-semibold mb-1 text-slate-900">{t('about.designTitle')}</h2>
                    <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                        <li>• {t('about.design1')}</li>
                        <li>• {t('about.design2')}</li>
                        <li>• {t('about.design3')}</li>
                        <li>• {t('about.design4')}</li>
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
                <h2 className="text-lg font-semibold mb-3 text-slate-900">{t('about.whoTitle')}</h2>
                <div className="grid gap-3 md:grid-cols-2 text-xs md:text-sm text-slate-700">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                        {t('about.who1')}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                        {t('about.who2')}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                        {t('about.who3')}
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                        {t('about.who4')}
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
            >
                <h2 className="text-lg font-semibold mb-3 text-slate-900">{t('about.faqTitle')}</h2>
                <div className="space-y-3 text-xs md:text-sm">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="font-semibold text-slate-900 mb-1">
                            Q: {t('about.faq1Q')}
                        </div>
                        <div className="text-slate-700">A: {t('about.faq1A')}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="font-semibold text-slate-900 mb-1">
                            Q: {t('about.faq2Q')}
                        </div>
                        <div className="text-slate-700">A: {t('about.faq2A')}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="font-semibold text-slate-900 mb-1">
                            Q: {t('about.faq3Q')}
                        </div>
                        <div className="text-slate-700">A: {t('about.faq3A')}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="font-semibold text-slate-900 mb-1">
                            Q: {t('about.faq4Q')}
                        </div>
                        <div className="text-slate-700">A: {t('about.faq4A')}</div>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}
