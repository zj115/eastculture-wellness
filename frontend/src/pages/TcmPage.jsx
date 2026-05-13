// src/pages/TcmPage.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

function TcmPage({ onBack }) {
    const { t } = useTranslation();

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
                        {t("tcm.title")}
                    </h1>
                    <p className="max-w-3xl text-sm md:text-base text-slate-600">
                        {t("tcm.subtitle")}
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    <img
                        src="/images/tcm-herb-grinding.jpg"
                        alt={t("tcm.title")}
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
                        {t("tcm.section1Title")}
                    </h2>
                    <p className="text-slate-600">
                        {t("tcm.section1Content")}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm space-y-3">
                    <h2 className="text-lg font-semibold">
                        {t("tcm.section2Title")}
                    </h2>
                    <p className="text-slate-600">
                        {t("tcm.section2Content")}
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
                    {t("tcm.modulesTitle")}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    {[0, 1, 2, 3, 4].map((index) => (
                        <li key={index}>
                            • {t(`tcm.modules.${index}`)}
                        </li>
                    ))}
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
                    {t("tcm.audienceTitle")}
                </h2>
                <ul className="space-y-2 text-slate-600">
                    {[0, 1, 2, 3].map((index) => (
                        <li key={index}>
                            • {t(`tcm.audience.${index}`)}
                        </li>
                    ))}
                </ul>
            </motion.section>

            <motion.section
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[11px] md:text-xs text-amber-900">
                    {t("tcm.disclaimer")}
                </div>
            </motion.section>
        </div>
    );
}

export default TcmPage;
