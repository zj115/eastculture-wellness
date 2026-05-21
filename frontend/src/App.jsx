// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

import FaceYogaPage from "./pages/FaceYogaPage";
import GuaShaPage from "./pages/GuaShaPage";
import QimenPage from "./pages/QimenPage";
import QigongPage from "./pages/QigongPage";
import WingChunPage from "./pages/WingChunPage";
import JiuJiuPage from "./pages/JiuJiuPage";
import TcmPage from "./pages/TcmPage";
import FengShuiPage from "./pages/FengShuiPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProgramPage from "./pages/ProgramPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import AccountPage from "./pages/AccountPage";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

// ─── 9.9 Quick Relief lessons ─────────────────────────────────────────────────
const JIUJIU_LESSONS = [
    { id: 1, titleKey: "jiujiu.lessons.lesson1.title", subtitleKey: "jiujiu.lessons.lesson1.subtitle", durationKey: "jiujiu.lessons.lesson1.duration", coverImage: "/images/jiujiu-waist.jpg", fallbackImage: "/images/acupoint-waist-legs.png", priceNow: "$9.9", priceOld: "$29.99", sale: true, page: "jiujiu" },
    { id: 2, titleKey: "jiujiu.lessons.lesson2.title", subtitleKey: "jiujiu.lessons.lesson2.subtitle", durationKey: "jiujiu.lessons.lesson2.duration", coverImage: "/images/jiujiu-neck.png", fallbackImage: "/images/acupoint-neck-shoulder.png", priceNow: "$9.9", priceOld: "$29.99", sale: true, page: "jiujiu" },
    { id: 3, titleKey: "jiujiu.lessons.lesson3.title", subtitleKey: "jiujiu.lessons.lesson3.subtitle", durationKey: "jiujiu.lessons.lesson3.duration", coverImage: "/images/jiujiu-sleep.png", fallbackImage: "/images/acupoint-daily.png", priceNow: "$9.9", priceOld: "$29.99", sale: true, page: "jiujiu" },
    { id: 4, titleKey: "jiujiu.lessons.lesson4.title", subtitleKey: "jiujiu.lessons.lesson4.subtitle", durationKey: "jiujiu.lessons.lesson4.duration", coverImage: "/images/jiujiu-mens-health.png", fallbackImage: "/images/acupoint-daily.png", priceNow: "$9.9", priceOld: "$29.99", sale: true, page: "jiujiu" },
];

// ─── Acupoint lessons ─────────────────────────────────────────────────────────
const ACUPOINT_LESSONS = [
    { id: 1, titleKey: "qigong.lessons.1.title", subtitleKey: "qigong.lessons.1.subtitle", durationKey: "qigong.lessons.1.duration", coverImage: "/images/acupoint-head.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 2, titleKey: "qigong.lessons.2.title", subtitleKey: "qigong.lessons.2.subtitle", durationKey: "qigong.lessons.2.duration", coverImage: "/images/acupoint-hands-feet.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 3, titleKey: "qigong.lessons.3.title", subtitleKey: "qigong.lessons.3.subtitle", durationKey: "qigong.lessons.3.duration", coverImage: "/images/acupoint-daily.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 4, titleKey: "qigong.lessons.4.title", subtitleKey: "qigong.lessons.4.subtitle", durationKey: "qigong.lessons.4.duration", coverImage: "/images/acupoint-neck-shoulder.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 5, titleKey: "qigong.lessons.5.title", subtitleKey: "qigong.lessons.5.subtitle", durationKey: "qigong.lessons.5.duration", coverImage: "/images/acupoint-waist-legs.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 6, titleKey: "qigong.lessons.6.title", subtitleKey: "qigong.lessons.6.subtitle", durationKey: "qigong.lessons.6.duration", coverImage: "/images/acupoint-womens.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
];

// ─── Tai Chi lessons (from QimenPage data) ───────────────────────────────────
const TAICHI_LESSONS = [
    { id: 1, titleKey: "qimen.lessons.lesson1.title", subtitleKey: "qimen.lessons.lesson1.subtitle", durationKey: "qimen.lessons.lesson1.duration", coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 2, titleKey: "qimen.lessons.lesson2.title", subtitleKey: "qimen.lessons.lesson2.subtitle", durationKey: "qimen.lessons.lesson2.duration", coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 3, titleKey: "qimen.lessons.lesson3.title", subtitleKey: "qimen.lessons.lesson3.subtitle", durationKey: "qimen.lessons.lesson3.duration", coverImage: "/images/tai-chi/lesson-05-baduanjin.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 4, titleKey: "qimen.lessons.lesson4.title", subtitleKey: "qimen.lessons.lesson4.subtitle", durationKey: "qimen.lessons.lesson4.duration", coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 5, titleKey: "qimen.lessons.lesson5.title", subtitleKey: "qimen.lessons.lesson5.subtitle", durationKey: "qimen.lessons.lesson5.duration", coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 6, titleKey: "qimen.lessons.lesson6.title", subtitleKey: "qimen.lessons.lesson6.subtitle", durationKey: "qimen.lessons.lesson6.duration", coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 7, titleKey: "qimen.lessons.lesson7.title", subtitleKey: "qimen.lessons.lesson7.subtitle", durationKey: "qimen.lessons.lesson7.duration", coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png", fallbackImage: "/images/taiji-mountain-new.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
];

// ─── Gua Sha course (single product card) ────────────────────────────────────
const GUASHA_COURSE = {
    titleKey: "guasha.title",
    subtitleKey: "guasha.mainTitle",
    cardTitleKey: "guasha.cardTitle",
    cardSubtitleKey: "guasha.cardSubtitle",
    coverImage: "/images/guasha-face.jpg",
    fallbackImage: "/images/face-yoga-masterclass.jpg",
    priceNow: "$45",
    priceOld: "$99.99",
    sale: true,
    page: "guasha",
};

// ─── Wing Chun lessons ────────────────────────────────────────────────────────
const WINGCHUN_LESSONS = [
    { id: 1, titleKey: "wingchun.lessons.lesson1.title", subtitleKey: "wingchun.lessons.lesson1.subtitle", durationKey: "wingchun.lessons.lesson1.duration", coverImage: "/images/wingchun-yangsheng.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "$49.98", priceOld: "$99.98", sale: true, page: "wingchun" },
    { id: 2, titleKey: "wingchun.lessons.lesson2.title", subtitleKey: "wingchun.lessons.lesson2.subtitle", durationKey: "wingchun.lessons.lesson2.duration", coverImage: "/images/wingchun-fangwei.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "$49.98", priceOld: "$99.98", sale: true, page: "wingchun" },
];

// ─── Card component ───────────────────────────────────────────────────────────
function LessonCard({ lesson, onNavigate }) {
    const { t } = useTranslation();
    const [imgErr, setImgErr] = useState(false);

    const handleClick = () => {
        console.log('LessonCard clicked:', lesson.page, 'onNavigate:', typeof onNavigate);
        if (onNavigate && typeof onNavigate === 'function') {
            onNavigate(lesson.page);
        } else {
            console.error('onNavigate is not a function:', onNavigate);
        }
    };

    return (
        <div
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            onClick={handleClick}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={imgErr ? lesson.fallbackImage : lesson.coverImage}
                    alt={t(lesson.titleKey)}
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                {lesson.sale && (
                    <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {t("common.sale")}
                    </span>
                )}
            </div>
            <div className="p-3 flex flex-col flex-1">
                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">
                    {t(lesson.titleKey)}
                </p>
                {lesson.subtitleKey && (
                    <p className="text-[11px] text-slate-500 mb-2 leading-snug line-clamp-2">{t(lesson.subtitleKey)}</p>
                )}
                {lesson.durationKey && (
                    <p className="text-[11px] text-slate-400 mb-2">{t(lesson.durationKey)}</p>
                )}
                <div className="mt-auto pt-2">
                    {lesson.priceOld && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xl font-bold text-slate-900">{lesson.priceNow}</span>
                            <span className="text-xs text-slate-400 line-through">{lesson.priceOld}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle, onViewAll, viewAllPage, onNavigate }) {
    const { t } = useTranslation();
    return (
        <div className="flex items-start justify-between mb-4 gap-3">
            <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-bold text-slate-900 leading-snug">{title}</h2>
                {subtitle && <p className="mt-1 text-xs md:text-sm text-slate-500">{subtitle}</p>}
            </div>
            {onViewAll && (
                <button
                    onClick={() => onNavigate(viewAllPage)}
                    className="text-xs text-amber-700 hover:text-amber-600 transition shrink-0 mt-1"
                >
                    {t("common.viewAll")}
                </button>
            )}
        </div>
    );
}

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", name: t("language.en"), nativeName: "English" },
        { code: "zh", name: t("language.zh"), nativeName: "中文" },
        { code: "ja", name: t("language.ja"), nativeName: "日本語" },
        { code: "ko", name: t("language.ko"), nativeName: "한국어" },
        { code: "ur", name: t("language.ur"), nativeName: "اردو" },
        { code: "ar", name: t("language.ar"), nativeName: "العربية" },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-amber-300 hover:text-amber-700 transition"
                aria-label="Select language"
            >
                <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
                <span className="sm:hidden">🌐</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-slate-200 bg-white shadow-lg z-50 py-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full px-4 py-2 text-left text-sm transition ${
                                    i18n.language === lang.code
                                        ? "bg-amber-50 text-amber-700 font-semibold"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {lang.nativeName}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function App() {
    const { t } = useTranslation();
    const [activePage, setActivePage] = useState("home");
    const [currentUser, setCurrentUser] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Debug: log sidebar state changes
    useEffect(() => {
        console.log('Sidebar state changed:', sidebarOpen);
    }, [sidebarOpen]);
    const [authLoading, setAuthLoading] = useState(true);

    const [touchStartX, setTouchStartX] = useState(null);

    function getAuthHeaders() {
        const token = localStorage.getItem("ec_token");
        return token ? { "Authorization": `Bearer ${token}` } : {};
    }

    useEffect(() => {
        async function refreshPurchases() {
            try {
                const res = await fetch(`${API_BASE}/api/auth/me`, {
                    credentials: "include",
                    headers: getAuthHeaders(),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setCurrentUser(data.user);
                        setPurchases(data.purchases || []);
                    } else {
                        localStorage.removeItem("ec_token");
                    }
                }
            } catch { /* ignore */ } finally {
                setAuthLoading(false);
            }
        }

        refreshPurchases();

        const params = new URLSearchParams(window.location.search);
        const payment = params.get("payment");
        if (payment === "success") {
            window.history.replaceState({}, "", window.location.pathname);
            setTimeout(() => refreshPurchases(), 1500);
            setTimeout(() => refreshPurchases(), 4000);
            setTimeout(() => refreshPurchases(), 8000);
            setActivePage("mycourses");
        } else if (payment === "cancelled") {
            window.history.replaceState({}, "", window.location.pathname);
        }
    }, []);

    // Page view tracking — fires on every page navigation with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("https://eastculture-api.vercel.app/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    path: "/" + activePage,
                    referrer: document.referrer || null,
                }),
            }).catch(() => {}); // silently ignore errors
        }, 300); // debounce 300ms to avoid rapid fire requests

        return () => clearTimeout(timer);
    }, [activePage]);

    async function handleLogout() {
        try {
            await fetch(`${API_BASE}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: getAuthHeaders(),
            });
        } catch { /* ignore */ }
        localStorage.removeItem("ec_token");
        setCurrentUser(null);
        setPurchases([]);
        setActivePage("home");
    }

    const COURSE_VIDEO_PREFIXES = {
        jiujiu: "9.9/",
        taichi: "taichi/",
        qigong: "acupressure/",
        wingchun: "wingchun/",
        faceyoga: "face-yoga/",
        guasha: "FacialGuaSha/",
    };

    function hasCourseAccess(courseId) {
        if (!currentUser) return false;
        const now = new Date();
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < now) return false;
            // full course purchase
            if (p.purchase_type === "course" && p.course_id === courseId) return true;
            // individual video purchase from this course also grants course page access
            const prefix = COURSE_VIDEO_PREFIXES[courseId];
            if (p.purchase_type === "video" && prefix && p.video_key && p.video_key.startsWith(prefix)) return true;
            return false;
        });
    }

    function hasVideoAccess(courseId, videoKey) {
        if (!currentUser) return false;
        if (hasCourseAccess(courseId)) return true;
        const now = new Date();
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < now) return false;
            return p.purchase_type === "video" && p.video_key === videoKey;
        });
    }

    async function handlePurchase(type, options = {}) {
        if (authLoading) return;
        if (!currentUser) {
            setActivePage("login");
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                credentials: "include",
                body: JSON.stringify({ type, lang: "en", ...options }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to start checkout");
            }
        } catch {
            alert("Network error. Please try again.");
        }
    }

    const goHome = () => setActivePage("home");

    const handleTouchStart = (e) => {
        if (e.touches && e.touches.length > 0) {
            setTouchStartX(e.touches[0].clientX);
        }
    };

    const handleTouchEnd = (e) => {
        if (touchStartX == null) return;
        if (e.changedTouches && e.changedTouches.length > 0) {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - touchStartX;
            if (activePage !== "home" && touchStartX < 80 && deltaX > 80) {
                goHome();
            }
        }
        setTouchStartX(null);
    };

    let pageContent;

    if (activePage === "home") {
        pageContent = (
            <main className="pb-20">
                {/* ── HERO ─────────────────────────────────────────────────── */}
                <section className="w-full">
                    <img
                        src="/images/hero-eastculture-new.jpg"
                        alt="Ancient Eastern mountain temple"
                        className="w-full h-auto block"
                        style={{ display: "block" }}
                    />
                </section>

                {/* ── COURSE SECTIONS ────────────────────────────────────────
                    Fixed order: 9.9(1) → Acupoint(2) → Tai Chi(3) → Gua Sha(4) → Wing Chun(5)
                ─────────────────────────────────────────────────────────────── */}
                <div className="mx-auto max-w-6xl px-4 pt-10 flex flex-col gap-12">

                    {/* 9.9 QUICK RELIEF — 1st */}
                    <motion.section
                        className="order-1"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title={t("jiujiu.title")}
                            subtitle={t("jiujiu.subtitle")}
                            onViewAll
                            viewAllPage="jiujiu"
                            onNavigate={setActivePage}
                        />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {JIUJIU_LESSONS.map((lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} onNavigate={setActivePage} />
                            ))}
                        </div>
                    </motion.section>

                    {/* ACUPOINT — 2nd */}
                    <motion.section
                        className="order-2"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title={t("qigong.course.title")}
                            subtitle={t("qigong.course.subtitle")}
                            onViewAll
                            viewAllPage="qigong"
                            onNavigate={setActivePage}
                        />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {ACUPOINT_LESSONS.map((lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} onNavigate={setActivePage} />
                            ))}
                        </div>
                    </motion.section>

                    {/* TAI CHI — 3rd */}
                    <motion.section
                        className="order-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title={t("qimen.courseTitle")}
                            subtitle={t("qimen.courseSubtitle")}
                            onViewAll
                            viewAllPage="qimen"
                            onNavigate={setActivePage}
                        />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {TAICHI_LESSONS.map((lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} onNavigate={setActivePage} />
                            ))}
                        </div>
                    </motion.section>

                    {/* GUA SHA — 4th */}
                    <motion.section
                        className="order-4"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title={t(GUASHA_COURSE.titleKey)}
                            subtitle={t(GUASHA_COURSE.subtitleKey)}
                            onViewAll
                            viewAllPage="guasha"
                            onNavigate={setActivePage}
                        />
                        {/* Single course card — half-width on mobile (matches 2-col grid), quarter-width on lg */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        <div
                            className="cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                            onClick={() => setActivePage("guasha")}
                        >
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img
                                    src={GUASHA_COURSE.coverImage}
                                    alt={t(GUASHA_COURSE.titleKey)}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = GUASHA_COURSE.fallbackImage; }}
                                />
                                <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                                    {t("common.sale")}
                                </span>
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1">{t(GUASHA_COURSE.cardTitleKey)}</p>
                                <p className="text-[11px] text-slate-500 mb-2">{t(GUASHA_COURSE.cardSubtitleKey)}</p>
                                <div className="mt-auto pt-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-slate-900">{GUASHA_COURSE.priceNow}</span>
                                        <span className="text-xs text-slate-400 line-through">{GUASHA_COURSE.priceOld}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </motion.section>

                    {/* WING CHUN — 5th */}
                    <motion.section
                        className="order-5 mb-8"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title={t("wingchun.courseTitle")}
                            subtitle={t("wingchun.courseSubtitle")}
                            onViewAll
                            viewAllPage="wingchun"
                            onNavigate={setActivePage}
                        />
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {WINGCHUN_LESSONS.map((lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} onNavigate={setActivePage} />
                            ))}
                        </div>
                    </motion.section>

                </div>
            </main>
        );
    } else if (activePage === "faceyoga") {
        pageContent = <FaceYogaPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("faceyoga")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "jiujiu") {
        pageContent = <JiuJiuPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("jiujiu")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "guasha") {
        pageContent = <GuaShaPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("guasha")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qimen") {
        pageContent = <QimenPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("taichi")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qigong") {
        pageContent = <QigongPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("qigong")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "wingchun") {
        pageContent = <WingChunPage currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("wingchun")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "tcm") {
        pageContent = <TcmPage />;
    } else if (activePage === "fengshui") {
        pageContent = <FengShuiPage />;
    } else if (activePage === "login") {
        pageContent = (
            <LoginPage
                onBackHome={goHome}
                onGoRegister={() => setActivePage("register")}
                onLoginSuccess={(user) => {
                    setCurrentUser(user);
                    setActivePage("home");
                    fetch(`${API_BASE}/api/auth/me`, { credentials: "include", headers: getAuthHeaders() })
                        .then(r => r.json())
                        .then(d => { if (d.purchases) setPurchases(d.purchases); })
                        .catch(() => {});
                }}
            />
        );
    } else if (activePage === "register") {
        pageContent = (
            <RegisterPage
                onBackHome={goHome}
                onGoLogin={() => setActivePage("login")}
                onRegisterSuccess={(user) => {
                    setCurrentUser(user);
                    setPurchases([]);
                    setActivePage("home");
                }}
            />
        );
    } else if (activePage === "program") {
        pageContent = <ProgramPage onBack={goHome} />;
    } else if (activePage === "shop") {
        pageContent = <ShopPage onBackHome={goHome} />;
    } else if (activePage === "about") {
        pageContent = <AboutPage onBackHome={goHome} />;
    } else if (activePage === "contact") {
        pageContent = <ContactPage onBackHome={goHome} />;
    } else if (activePage === "mycourses") {
        pageContent = (
            <MyCoursesPage
                purchases={purchases}
                currentUser={currentUser}
                onNavigate={setActivePage}
                onPurchase={handlePurchase}
            />
        );
    } else if (activePage === "account") {
        pageContent = (
            <AccountPage
                currentUser={currentUser}
                purchases={purchases}
                onLogout={handleLogout}
            />
        );
    }

    return (
        <div
            className="min-h-screen bg-white text-slate-900"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* ── HEADER ───────────────────────────────────────────────── */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white text-xs font-bold shadow-sm md:cursor-default"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                        >
                            EC
                        </button>
                        <div
                            className="cursor-pointer"
                            onClick={goHome}
                        >
                            <div className="text-lg font-semibold tracking-wide text-slate-900">EastCulture</div>
                            <div className="text-[11px] text-slate-500">Tai Chi · Traditional Arts</div>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-6 text-sm md:flex">
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={goHome}>{t("nav.home")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("jiujiu")}>{t("nav.quickRelief")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("guasha")}>{t("nav.guaSha")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qigong")}>{t("nav.acupoint")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qimen")}>{t("nav.taiChi")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("wingchun")}>{t("nav.wingChun")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("about")}>{t("nav.about")}</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("contact")}>{t("nav.contact")}</button>
                        {currentUser && (
                            <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("mycourses")}>{t("nav.myCourses")}</button>
                        )}
                    </nav>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        {!currentUser ? (
                            <button
                                className="hidden rounded-full border border-amber-300 bg-white px-3 py-1 text-xs text-amber-700 hover:bg-amber-50 md:inline-flex transition"
                                onClick={() => setActivePage("login")}
                            >
                                {t("nav.login")}
                            </button>
                        ) : (
                            <button
                                className="hidden rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-amber-300 hover:text-amber-700 transition md:inline-flex"
                                onClick={() => setActivePage("account")}
                            >
                                {currentUser.username}
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* ── MOBILE SIDEBAR ───────────────────────────────────────── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => {
                        console.log('Overlay clicked, closing sidebar');
                        setSidebarOpen(false);
                    }} />
                    <div className="relative flex w-72 flex-col bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white text-xs font-bold">EC</span>
                                <span className="text-base font-semibold text-slate-900">EastCulture</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none" aria-label="Close menu">×</button>
                        </div>
                        <nav className="flex flex-col gap-1 px-4 py-4 text-sm">
                            {[
                                { label: t("nav.home"), action: () => { goHome(); setSidebarOpen(false); } },
                                { label: t("nav.quickRelief"), action: () => { setActivePage("jiujiu"); setSidebarOpen(false); } },
                                { label: t("nav.guaSha"), action: () => { setActivePage("guasha"); setSidebarOpen(false); } },
                                { label: t("nav.acupoint"), action: () => { setActivePage("qigong"); setSidebarOpen(false); } },
                                { label: t("nav.taiChi"), action: () => { setActivePage("qimen"); setSidebarOpen(false); } },
                                { label: t("nav.wingChun"), action: () => { setActivePage("wingchun"); setSidebarOpen(false); } },
                                { label: t("nav.about"), action: () => { setActivePage("about"); setSidebarOpen(false); } },
                                { label: t("nav.contact"), action: () => { setActivePage("contact"); setSidebarOpen(false); } },
                            ].map(({ label, action }) => (
                                <button key={label} onClick={action} className="rounded-lg px-3 py-2.5 text-left text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition">
                                    {label}
                                </button>
                            ))}
                            {currentUser && (
                                <button onClick={() => { setActivePage("mycourses"); setSidebarOpen(false); }} className="rounded-lg px-3 py-2.5 text-left text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition">
                                    {t("nav.myCourses")}
                                </button>
                            )}
                        </nav>
                        <div className="mt-auto border-t border-slate-100 px-4 py-4 space-y-3">
                            <LanguageSwitcher />
                            {!currentUser ? (
                                <button
                                    onClick={() => { setActivePage("login"); setSidebarOpen(false); }}
                                    className="w-full rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition"
                                >
                                    {t("nav.login")}
                                </button>
                            ) : (
                                <button
                                    onClick={() => { setActivePage("account"); setSidebarOpen(false); }}
                                    className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-amber-300 hover:text-amber-700 transition"
                                >
                                    {currentUser.username}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {pageContent}

            {activePage !== "home" && (
                <div className="mx-auto max-w-6xl px-4 pb-6">
                    <button
                        onClick={goHome}
                        className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-slate-600 hover:text-amber-700 transition"
                    >
                        <span className="text-lg">←</span>
                        {t("common.backToHome")}
                    </button>
                </div>
            )}

            <footer className="border-t border-slate-200 bg-white py-4 text-[11px] text-slate-500">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
                    <span>{t("footer.copyright")}</span>
                    <span>{t("footer.disclaimer")}</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
