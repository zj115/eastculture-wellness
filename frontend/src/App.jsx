// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

import FaceYogaPage from "./pages/FaceYogaPage";
import GuaShaPage from "./pages/GuaShaPage";
import QimenPage from "./pages/QimenPage";
import QigongPage from "./pages/QigongPage";
import WingChunPage from "./pages/WingChunPage";
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

// ─── Tai Chi lessons (from QimenPage data) ───────────────────────────────────
const TAICHI_LESSONS = [
    { id: 1, titleEn: "Bone-Invigorating Health Qigong", duration: "~11 min", coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 2, titleEn: "Hunyuan Wuji Stance", duration: "~10 min", coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 3, titleEn: "Wudang Taoist Baduanjin", duration: "~17 min", coverImage: "/images/tai-chi/lesson-05-baduanjin.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 4, titleEn: "Tai Chi for Heart Calming", duration: "~11 min", coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 5, titleEn: "Tai Chi for Soothing the Liver", duration: "~11 min", coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 6, titleEn: "Tai Chi for Nourishing the Lungs", duration: "~28 min", coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
    { id: 7, titleEn: "Tai Chi for Qi and Blood Regulation", duration: "~30 min", coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "NZD 49", priceOld: "NZD 79", sale: true, page: "qimen" },
];

// ─── Wing Chun lessons ────────────────────────────────────────────────────────
const WINGCHUN_LESSONS = [
    { id: 1, titleEn: "Wing Chun Health Qigong – 10 Forms", duration: "~7 min", coverImage: "/images/wingchun-yangsheng.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "NZD 39", priceOld: "NZD 69", sale: true, page: "wingchun" },
    { id: 2, titleEn: "Wing Chun Fang Wei Self-Defense", duration: "~12 min", coverImage: "/images/wingchun-fangwei.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "NZD 39", priceOld: "NZD 69", sale: true, page: "wingchun" },
];

// ─── Acupoint lessons ─────────────────────────────────────────────────────────
const ACUPOINT_LESSONS = [
    { id: 1, titleEn: "Head & Face Discomfort Relief", subtitle: "23 Conditions • 3 Pressure Points Each", duration: "~60 min", coverImage: "/images/acupoint-head.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 2, titleEn: "Women's Private Wellness", subtitle: "7 Conditions • Natural Relief at Home", duration: "~45 min", coverImage: "/images/acupoint-womens.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 3, titleEn: "Hand & Foot Pain Relief", subtitle: "28 Conditions • 3 Pressure Points Each", duration: "~90 min", coverImage: "/images/acupoint-hands-feet.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 4, titleEn: "Common Daily Discomforts Relief", subtitle: "16 Conditions • Fast Relief at Home", duration: "~70 min", coverImage: "/images/acupoint-daily.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 5, titleEn: "Neck & Shoulder Pain Relief", subtitle: "8 Conditions • 3 Key Pressure Points", duration: "~40 min", coverImage: "/images/acupoint-neck-shoulder.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 6, titleEn: "Waist & Leg Pain Relief", subtitle: "18 Conditions • 3 Pressure Points Each", duration: "~80 min", coverImage: "/images/acupoint-waist-legs.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
];

// ─── Gua Sha course (single product card) ────────────────────────────────────
const GUASHA_COURSE = {
    titleEn: "16 Facial Anti-Aging Gua Sha",
    subtitle: "16 Chapters · 1 Full Course · 2h 34min total",
    coverImage: "/images/face-yoga-masterclass.jpg",
    fallbackImage: "/images/face-yoga-before-after.jpg",
    priceNow: "NZD 99",
    priceOld: "NZD 149",
    sale: true,
    page: "guasha",
};

// ─── Card component ───────────────────────────────────────────────────────────
function LessonCard({ lesson, onNavigate }) {
    const [imgErr, setImgErr] = useState(false);
    return (
        <div
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            onClick={() => onNavigate(lesson.page)}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={imgErr ? lesson.fallbackImage : lesson.coverImage}
                    alt={lesson.titleEn}
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                {lesson.sale && (
                    <span className="absolute bottom-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        Sale
                    </span>
                )}
            </div>
            <div className="p-3">
                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">
                    {lesson.titleEn}
                </p>
                {lesson.subtitle && (
                    <p className="text-[11px] text-slate-500 mb-2 leading-snug line-clamp-2">{lesson.subtitle}</p>
                )}
                {lesson.duration && (
                    <p className="text-[11px] text-slate-400 mb-2">{lesson.duration}</p>
                )}
                {lesson.priceOld && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-slate-400 line-through">{lesson.priceOld}</span>
                        <span className="text-sm font-bold text-slate-900">{lesson.priceNow}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle, onViewAll, viewAllPage, onNavigate }) {
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
                    View all →
                </button>
            )}
        </div>
    );
}

function App() {
    const [activePage, setActivePage] = useState("home");
    const [currentUser, setCurrentUser] = useState(null);
    const [purchases, setPurchases] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
            // membership (any variant) grants all access
            if (p.purchase_type === "membership" || p.purchase_type === "membership_monthly" || p.purchase_type === "membership_quarterly" || p.purchase_type === "membership_annual") return true;
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
                <section className="w-full md:max-h-[520px] overflow-hidden">
                    <img
                        src="/images/hero-eastculture.jpg"
                        alt="Ancient Eastern mountain temple"
                        className="w-full h-auto block md:h-[520px] md:object-cover md:object-top"
                        style={{ display: "block" }}
                    />
                </section>

                {/* ── COURSE SECTIONS ────────────────────────────────────────
                    Both mobile and desktop use flex-col + order classes.
                    Mobile order:  Acupoint(1) → Tai Chi(2) → Gua Sha(3) → Wing Chun(4)
                    Desktop order: Gua Sha(1)  → Acupoint(2) → Tai Chi(3) → Wing Chun(4)
                ─────────────────────────────────────────────────────────────── */}
                <div className="mx-auto max-w-6xl px-4 pt-10 flex flex-col gap-12">

                    {/* GUA SHA — mobile: 3rd / desktop: 1st */}
                    <motion.section
                        className="order-3 md:order-1"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title="16 Facial Anti-Aging Gua Sha"
                            subtitle="No Surgery • No Needles • Just 5 Min a Day — Fades Wrinkles, Lifts Sagging, Brightens Skin AT HOME."
                            onViewAll
                            viewAllPage="guasha"
                            onNavigate={setActivePage}
                        />
                        {/* Single course card — full width on mobile, quarter-width on lg */}
                        <div
                            className="cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden md:max-w-xs"
                            onClick={() => setActivePage("guasha")}
                        >
                            <div className="relative overflow-hidden aspect-[16/9] md:aspect-[4/3]">
                                <img
                                    src={GUASHA_COURSE.coverImage}
                                    alt={GUASHA_COURSE.titleEn}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = GUASHA_COURSE.fallbackImage; }}
                                />
                                <span className="absolute bottom-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                                    Sale
                                </span>
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1">{GUASHA_COURSE.titleEn}</p>
                                <p className="text-[11px] text-slate-500 mb-2">{GUASHA_COURSE.subtitle}</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] text-slate-400 line-through">{GUASHA_COURSE.priceOld}</span>
                                    <span className="text-sm font-bold text-slate-900">{GUASHA_COURSE.priceNow}</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ACUPOINT — mobile: 1st / desktop: 2nd */}
                    <motion.section
                        className="order-1 md:order-2"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title="Acupoint Self-Care"
                            subtitle="Drug-free, at-home pressure point routines — 3 simple points for each condition."
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

                    {/* TAI CHI — mobile: 2nd / desktop: 3rd */}
                    <motion.section
                        className="order-2 md:order-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title="Tai Chi — Wudang Sanfeng"
                            subtitle="Relieve joint pain, reduce stress & improve sleep — authentic Wudang Tai Chi, 10–30 min per session."
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

                    {/* WING CHUN — mobile: 4th / desktop: 4th */}
                    <motion.section
                        className="order-4 mb-8"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        variants={fadeInUp}
                    >
                        <SectionHeading
                            title="Wing Chun"
                            subtitle="Authentic Wing Chun fundamentals — body coordination, structure, and self-care routines."
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
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={goHome}>Home</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("guasha")}>Gua Sha</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qigong")}>Acupoint</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qimen")}>Tai Chi</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("wingchun")}>Wing Chun</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("about")}>About</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("contact")}>Contact</button>
                        {currentUser && (
                            <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("mycourses")}>My Courses</button>
                        )}
                    </nav>

                    <div className="flex items-center gap-3">
                        {!currentUser ? (
                            <button
                                className="hidden rounded-full border border-amber-300 bg-white px-3 py-1 text-xs text-amber-700 hover:bg-amber-50 md:inline-flex transition"
                                onClick={() => setActivePage("login")}
                            >
                                Login
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
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
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
                                { label: "Home", action: () => { goHome(); setSidebarOpen(false); } },
                                { label: "Gua Sha", action: () => { setActivePage("guasha"); setSidebarOpen(false); } },
                                { label: "Acupoint", action: () => { setActivePage("qigong"); setSidebarOpen(false); } },
                                { label: "Tai Chi", action: () => { setActivePage("qimen"); setSidebarOpen(false); } },
                                { label: "Wing Chun", action: () => { setActivePage("wingchun"); setSidebarOpen(false); } },
                                { label: "About", action: () => { setActivePage("about"); setSidebarOpen(false); } },
                                { label: "Contact", action: () => { setActivePage("contact"); setSidebarOpen(false); } },
                            ].map(({ label, action }) => (
                                <button key={label} onClick={action} className="rounded-lg px-3 py-2.5 text-left text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition">
                                    {label}
                                </button>
                            ))}
                            {currentUser && (
                                <button onClick={() => { setActivePage("mycourses"); setSidebarOpen(false); }} className="rounded-lg px-3 py-2.5 text-left text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition">
                                    My Courses
                                </button>
                            )}
                        </nav>
                        <div className="mt-auto border-t border-slate-100 px-4 py-4">
                            {!currentUser ? (
                                <button
                                    onClick={() => { setActivePage("login"); setSidebarOpen(false); }}
                                    className="w-full rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition"
                                >
                                    Login
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
                        Back to home
                    </button>
                </div>
            )}

            <footer className="border-t border-slate-200 bg-white py-4 text-[11px] text-slate-500">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
                    <span>© {new Date().getFullYear()} EastCulture · Tai Chi · Traditional Arts Online</span>
                    <span>All educational content is provided for wellness and cultural learning. It does not replace medical advice.</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
