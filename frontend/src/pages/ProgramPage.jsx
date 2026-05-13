// src/pages/ProgramPage.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

export default function ProgramPage({ onBack }) {
    const { t } = useTranslation();

    return (
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-14 space-y-10 md:space-y-14">
            <button
                onClick={onBack}
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
                className="grid gap-8 md:grid-cols-[1.3fr,1fr] items-start"
            >
                <div className="space-y-4">
                    <p className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] text-white border border-slate-200/60">
                        {t('program.guidedPath')}
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                        {t('program.title')}
                    </h1>

                    <p className="text-sm md:text-base text-slate-600">
                        {t('program.subtitle')}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-xs md:text-sm text-slate-700 space-y-3 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">
                        {t('program.idealIf')}
                    </h2>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                        <li>{t('program.ideal1')}</li>
                        <li>{t('program.ideal2')}</li>
                        <li>{t('program.ideal3')}</li>
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
                    {t('program.threeStageTitle')}
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {t('program.level1.label')}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {t('program.level1.title')}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {t('program.level1.desc')}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>• {t('program.level1.point1')}</li>
                            <li>• {t('program.level1.point2')}</li>
                            <li>• {t('program.level1.point3')}</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {t('program.level2.label')}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {t('program.level2.title')}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {t('program.level2.desc')}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>• {t('program.level2.point1')}</li>
                            <li>• {t('program.level2.point2')}</li>
                            <li>• {t('program.level2.point3')}</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            {t('program.level3.label')}
                        </p>
                        <h3 className="font-semibold text-slate-900">
                            {t('program.level3.title')}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {t('program.level3.desc')}
                        </p>
                        <ul className="text-xs text-slate-600 space-y-1">
                            <li>• {t('program.level3.point1')}</li>
                            <li>• {t('program.level3.point2')}</li>
                            <li>• {t('program.level3.point3')}</li>
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
                    {t('program.exampleWeekTitle')}
                </h2>

                <p className="text-sm text-slate-600 max-w-3xl">
                    {t('program.exampleWeekDesc')}
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-7 text-[11px] md:text-xs text-slate-700 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <div key={day} className="p-3 md:p-4 space-y-1">
                                <p className="font-semibold text-slate-900">{day}</p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                                    {t('program.durationLabel')}
                                </p>
                                <p className="text-xs text-slate-700">
                                    {i === 5 || i === 6
                                        ? "20–25 min"
                                        : i === 2
                                            ? "10–15 min"
                                            : "15–20 min"}
                                </p>
                                <p className="text-[10px] uppercase tracking-wide text-slate-500 pt-1">
                                    {t('program.practiceLabel')}
                                </p>
                                <p className="text-xs text-slate-600">
                                    {i === 0 && t('program.monday')}
                                    {i === 1 && t('program.tuesday')}
                                    {i === 2 && t('program.wednesday')}
                                    {i === 3 && t('program.thursday')}
                                    {i === 4 && t('program.friday')}
                                    {i === 5 && t('program.saturday')}
                                    {i === 6 && t('program.sunday')}
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
                    {t('program.combineTitle')}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {t('program.healthFocus.title')}
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• {t('program.healthFocus.point1')}</li>
                            <li>• {t('program.healthFocus.point2')}</li>
                            <li>• {t('program.healthFocus.point3')}</li>
                            <li>• {t('program.healthFocus.point4')}</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {t('program.martialFocus.title')}
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-1.5">
                            <li>• {t('program.martialFocus.point1')}</li>
                            <li>• {t('program.martialFocus.point2')}</li>
                            <li>• {t('program.martialFocus.point3')}</li>
                            <li>• {t('program.martialFocus.point4')}</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5 text-sm space-y-2 md:col-span-2 shadow-sm">
                        <h3 className="font-semibold text-slate-900">
                            {t('program.spaceFocus.title')}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {t('program.spaceFocus.desc')}
                        </p>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}
