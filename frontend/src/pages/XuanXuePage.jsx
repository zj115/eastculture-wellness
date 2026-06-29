// src/pages/XuanXuePage.jsx
// Metaphysics / Taoist Folk Services Page - 4 Services

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

// ─────────────────────────────────────────────
// SERVICE DATA
// ─────────────────────────────────────────────
const SERVICES = [
    {
        id: "hehe",
        titleKey: "xuanxue.services.hehe.title",
        subtitleKey: "xuanxue.services.hehe.subtitle",
        price: 176,
        priceDisplay: "$176 USD",
        coverImage: "/images/xuanxue/hehe.png",
        introKey: "xuanxue.services.hehe.intro",
        painPointKeys: [
            "xuanxue.services.hehe.painPoint1",
            "xuanxue.services.hehe.painPoint2",
            "xuanxue.services.hehe.painPoint3",
        ],
        solutionKey: "xuanxue.services.hehe.solution",
        benefitKeys: [
            "xuanxue.services.hehe.benefit1",
            "xuanxue.services.hehe.benefit2",
            "xuanxue.services.hehe.benefit3",
            "xuanxue.services.hehe.benefit4",
        ],
        serviceDetailsKeys: [
            "xuanxue.services.hehe.detail1",
            "xuanxue.services.hehe.detail2",
            "xuanxue.services.hehe.detail3",
            "xuanxue.services.hehe.detail4",
        ],
        disclaimerKey: "xuanxue.services.hehe.disclaimer",
    },
    {
        id: "bucaiku",
        titleKey: "xuanxue.services.bucaiku.title",
        subtitleKey: "xuanxue.services.bucaiku.subtitle",
        price: 176,
        priceDisplay: "$176 USD",
        coverImage: "/images/xuanxue/bucaiku.png",
        introKey: "xuanxue.services.bucaiku.intro",
        painPointKeys: [
            "xuanxue.services.bucaiku.painPoint1",
            "xuanxue.services.bucaiku.painPoint2",
            "xuanxue.services.bucaiku.painPoint3",
            "xuanxue.services.bucaiku.painPoint4",
        ],
        solutionKey: "xuanxue.services.bucaiku.solution",
        benefitKeys: [
            "xuanxue.services.bucaiku.benefit1",
            "xuanxue.services.bucaiku.benefit2",
            "xuanxue.services.bucaiku.benefit3",
        ],
        serviceDetailsKeys: [
            "xuanxue.services.bucaiku.detail1",
            "xuanxue.services.bucaiku.detail2",
            "xuanxue.services.bucaiku.detail3",
            "xuanxue.services.bucaiku.detail4",
        ],
        disclaimerKey: "xuanxue.services.bucaiku.disclaimer",
    },
    {
        id: "qimen",
        titleKey: "xuanxue.services.qimen.title",
        subtitleKey: "xuanxue.services.qimen.subtitle",
        price: 29,
        priceDisplay: "$29 USD",
        coverImage: "/images/xuanxue/qimen.png",
        introKey: "xuanxue.services.qimen.intro",
        painPointKeys: [
            "xuanxue.services.qimen.painPoint1",
            "xuanxue.services.qimen.painPoint2",
            "xuanxue.services.qimen.painPoint3",
            "xuanxue.services.qimen.painPoint4",
            "xuanxue.services.qimen.painPoint5",
        ],
        solutionKey: "xuanxue.services.qimen.solution",
        benefitKeys: [
            "xuanxue.services.qimen.benefit1",
            "xuanxue.services.qimen.benefit2",
        ],
        serviceDetailsKeys: [
            "xuanxue.services.qimen.detail1",
            "xuanxue.services.qimen.detail2",
            "xuanxue.services.qimen.detail3",
            "xuanxue.services.qimen.detail4",
            "xuanxue.services.qimen.detail5",
        ],
        disclaimerKey: "xuanxue.services.qimen.disclaimer",
    },
    {
        id: "huanyinzhai",
        titleKey: "xuanxue.services.huanyinzhai.title",
        subtitleKey: "xuanxue.services.huanyinzhai.subtitle",
        price: 440,
        priceDisplay: "$440 USD",
        coverImage: "/images/xuanxue/huanyinzhai.png",
        introKey: "xuanxue.services.huanyinzhai.intro",
        painPointKeys: [
            "xuanxue.services.huanyinzhai.painPoint1",
            "xuanxue.services.huanyinzhai.painPoint2",
            "xuanxue.services.huanyinzhai.painPoint3",
            "xuanxue.services.huanyinzhai.painPoint4",
            "xuanxue.services.huanyinzhai.painPoint5",
        ],
        solutionKey: "xuanxue.services.huanyinzhai.solution",
        benefitKeys: [
            "xuanxue.services.huanyinzhai.benefit1",
            "xuanxue.services.huanyinzhai.benefit2",
            "xuanxue.services.huanyinzhai.benefit3",
        ],
        serviceDetailsKeys: [
            "xuanxue.services.huanyinzhai.detail1",
            "xuanxue.services.huanyinzhai.detail2",
            "xuanxue.services.huanyinzhai.detail3",
            "xuanxue.services.huanyinzhai.detail4",
        ],
        disclaimerKey: "xuanxue.services.huanyinzhai.disclaimer",
    },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function ServiceCard({ service, onClick }) {
    const { t } = useTranslation();
    const [imgErr, setImgErr] = useState(false);

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            onClick={onClick}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={imgErr ? "/images/hero-eastculture-new.jpg" : service.coverImage}
                    alt={t(service.titleKey)}
                    loading="lazy"
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {t(service.titleKey)}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed line-clamp-2">
                    {t(service.subtitleKey)}
                </p>
                <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-700">{service.priceDisplay}</span>
                    <span className="text-xs text-amber-600 font-semibold">
                        {t("xuanxue.bookNow")} →
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

function ServiceDetail({ service, onClose, onPurchase, currentUser, authLoading }) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6 px-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition"
                    aria-label="Close"
                >
                    ×
                </button>

                {/* Hero Image */}
                <div className="w-full overflow-hidden rounded-t-3xl">
                    <img
                        src={service.coverImage}
                        alt={t(service.titleKey)}
                        className="w-full object-cover"
                        style={{ maxHeight: "300px" }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {/* Title & Price */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                            {t(service.titleKey)}
                        </h2>
                        <p className="text-sm text-amber-700 font-medium mb-3">
                            {t(service.subtitleKey)}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-amber-700">{service.priceDisplay}</span>
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {t(service.introKey)}
                        </p>
                    </div>

                    {/* Pain Points */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("xuanxue.whoNeedsThis")}
                        </h3>
                        <ul className="space-y-2">
                            {service.painPointKeys.map((key, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-700 leading-snug">
                                    <span className="text-amber-600 font-bold shrink-0">✕</span>
                                    <span>{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solution */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("xuanxue.solution")}
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {t(service.solutionKey)}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("xuanxue.benefits")}
                        </h3>
                        <ul className="space-y-2">
                            {service.benefitKeys.map((key, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-700 leading-snug">
                                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                                    <span>{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Service Details */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
                            {t("xuanxue.serviceDetails")}
                        </h3>
                        <ul className="space-y-2">
                            {service.serviceDetailsKeys.map((key, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-700 leading-snug">
                                    <span className="text-slate-400 shrink-0">✓</span>
                                    <span>{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                        <p className="text-xs text-amber-900 leading-relaxed">
                            {t(service.disclaimerKey)}
                        </p>
                    </div>

                    {/* Purchase Button */}
                    <button
                        onClick={() => {
                            if (authLoading) return;
                            onPurchase(service);
                        }}
                        disabled={authLoading}
                        className="w-full rounded-2xl bg-amber-600 px-6 py-4 text-base font-bold text-white hover:bg-amber-500 transition active:scale-[0.98] disabled:opacity-50"
                    >
                        {authLoading ? t("common.loading") : t("xuanxue.bookNow")}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function XuanXuePage({
    currentUser,
    authLoading = false,
    onPurchase,
    onGoLogin,
}) {
    const { t } = useTranslation();
    const [selectedService, setSelectedService] = useState(null);

    function handlePurchase(service) {
        // Allow guest checkout for services - no login required
        onPurchase?.("service", {
            serviceId: service.id,
            serviceTitle: t(service.titleKey),
        });
    }

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <main className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:pt-10">
                {/* ══ HEADER ══ */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
                        {t("xuanxue.pageTitle")}
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        {t("xuanxue.pageSubtitle")}
                    </p>
                </motion.div>

                {/* ══ SERVICE CARDS GRID ══ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {SERVICES.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onClick={() => setSelectedService(service)}
                        />
                    ))}
                </div>

                {/* ══ GENERAL DISCLAIMER ══ */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5 }}
                    variants={fadeInUp}
                    className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                    <p className="text-xs text-slate-600 leading-relaxed text-center">
                        {t("xuanxue.generalDisclaimer")}
                    </p>
                </motion.div>
            </main>

            {/* ══ SERVICE DETAIL MODAL ══ */}
            {selectedService && (
                <ServiceDetail
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    onPurchase={handlePurchase}
                    currentUser={currentUser}
                    authLoading={authLoading}
                />
            )}
        </div>
    );
}
