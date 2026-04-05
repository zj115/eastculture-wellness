// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

import FaceYogaPage from "./pages/FaceYogaPage";
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
    { id: 1, titleEn: "Wing Chun Health Qigong – 10 Forms", duration: "~7 min", coverImage: "/images/wing-chun-yangsheng-cover.jpg", fallbackImage: "/images/martial-staff-demo.jpg", priceNow: "NZD 39", priceOld: "NZD 69", sale: true, page: "wingchun" },
    { id: 2, titleEn: "Wing Chun Fang Wei Self-Defense", duration: "~12 min", coverImage: "/images/wing-chun-fangwei-cover.png", fallbackImage: "/images/martial-staff-demo.jpg", priceNow: "NZD 39", priceOld: "NZD 69", sale: true, page: "wingchun" },
];

// ─── Acupoint lessons ─────────────────────────────────────────────────────────
const ACUPOINT_LESSONS = [
    { id: 1, titleEn: "Head & Face Discomfort Relief", subtitle: "23 Conditions • 3 Pressure Points Each", duration: "~60 min", coverImage: "/images/acupressure-lesson-01.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 2, titleEn: "Women's Private Wellness", subtitle: "7 Conditions • Natural Relief at Home", duration: "~45 min", coverImage: "/images/acupressure-lesson-02.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 3, titleEn: "Hand & Foot Pain Relief", subtitle: "28 Conditions • 3 Pressure Points Each", duration: "~90 min", coverImage: "/images/acupressure-lesson-03.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 4, titleEn: "Common Daily Discomforts Relief", subtitle: "16 Conditions • Fast Relief at Home", duration: "~70 min", coverImage: "/images/acupressure-lesson-04.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 5, titleEn: "Neck & Shoulder Pain Relief", subtitle: "8 Conditions • 3 Key Pressure Points", duration: "~40 min", coverImage: "/images/acupressure-lesson-05.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
    { id: 6, titleEn: "Waist & Leg Pain Relief", subtitle: "18 Conditions • 3 Pressure Points Each", duration: "~80 min", coverImage: "/images/acupressure-lesson-06.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "NZD 99", priceOld: "NZD 149", sale: true, page: "qigong" },
];

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
                    <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        Sale
                    </span>
                )}
            </div>
            <div className="p-3">
                <p className="text-sm font-medium text-slate-900 leading-snug mb-1 line-clamp-2">
                    {lesson.titleEn}
                </p>
                {lesson.subtitle && (
                    <p className="text-[11px] text-slate-500 mb-2 leading-snug">{lesson.subtitle}</p>
                )}
                <p className="text-[11px] text-slate-400 mb-2">{lesson.duration}</p>
                {lesson.priceOld && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-slate-400 line-through">{lesson.priceOld} USD</span>
                        <span className="text-sm font-semibold text-slate-900">{lesson.priceNow} USD</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, subtitle, onViewAll, viewAllPage, onNavigate }) {
    return (
        <div className="flex items-end justify-between mb-6">
            <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-slate-500 max-w-xl">{subtitle}</p>}
            </div>
            {onViewAll && (
                <button
                    onClick={() => onNavigate(viewAllPage)}
                    className="text-xs text-amber-700 hover:text-amber-600 transition shrink-0 ml-4"
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
                <section className="w-full">
                    <img
                        src="/images/hero-eastculture.jpg"
                        alt="Ancient Eastern mountain temple"
                        className="w-full h-auto block"
                        style={{ display: "block" }}
                    />
                </section>

                {/* ── WHAT YOU CAN LEARN ───────────────────────────────────── */}
                <motion.section
                    className="mx-auto max-w-6xl px-4 pt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">What You Can Learn Here</h2>
                        <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
                            Ancient Eastern practices for modern health — rooted in tradition, made simple for everyday life.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            {
                                title: "Tai Chi Practice",
                                desc: "Soft, flowing Tai Chi routines to nourish your joints, restore balance, and calm the nervous system.",
                                img: "/images/taiji-mountain.jpg",
                                page: "qimen",
                            },
                            {
                                title: "Wing Chun Foundations",
                                desc: "Body coordination, centerline structure, and gentle movement — from authentic Wing Chun lineage.",
                                img: "/images/martial-staff-demo.jpg",
                                page: "wingchun",
                            },
                            {
                                title: "Acupoint Self-Care",
                                desc: "Simple pressure-point routines for pain relief, internal wellness, and daily self-healing at home.",
                                img: "/images/tai-chi/acupressure-cover.jpg",
                                page: "qigong",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                                onClick={() => setActivePage(item.page)}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    <div className="absolute bottom-3 left-4 right-4">
                                        <h3 className="text-white font-semibold text-base">{item.title}</h3>
                                    </div>
                                </div>
                                <div className="bg-white border border-t-0 border-slate-200 rounded-b-2xl px-4 py-3">
                                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                                    <p className="mt-2 text-xs text-amber-700 font-medium">View lessons →</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ── TAI CHI SECTION ──────────────────────────────────────── */}
                <motion.section
                    className="mx-auto max-w-6xl px-4 pt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <SectionHeading
                        title="Tai Chi"
                        subtitle="Wudang Sanfeng series — gentle movement for joints, organs, sleep, and inner calm."
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

                {/* ── WING CHUN SECTION ────────────────────────────────────── */}
                <motion.section
                    className="mx-auto max-w-6xl px-4 pt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
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

                {/* ── ACUPOINT SECTION ─────────────────────────────────────── */}
                <motion.section
                    className="mx-auto max-w-6xl px-4 pt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
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

                {/* ── MEMBERSHIP ───────────────────────────────────────────── */}
                <motion.section
                    className="mx-auto max-w-6xl px-4 pt-16"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">Choose Your Membership</h2>
                        <p className="mt-2 text-sm text-slate-500">Unlock all courses with one simple plan.</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            { name: "Monthly", price: "NZD 30", per: "/ month", desc: "Flexible month-to-month access.", purchaseType: "membership_monthly", highlight: false, items: ["Unlimited access to all video courses", "New lessons added monthly", "Watch on any device", "Cancel anytime"] },
                            { name: "Quarterly", price: "NZD 100", per: "/ 3 months", desc: "Save NZD 10 vs monthly.", purchaseType: "membership_quarterly", highlight: true, items: ["Unlimited access to all video courses", "New lessons added monthly", "Watch on any device", "Best for consistent practice"] },
                            { name: "Annual", price: "NZD 168", per: "/ year", desc: "Best value — save NZD 192 vs monthly.", purchaseType: "membership_annual", highlight: false, items: ["Unlimited access to all video courses", "New lessons added monthly", "Watch on any device", "Lowest price per month"] },
                        ].map((plan) => (
                            <div
                                key={plan.name}
                                className={`flex flex-col rounded-2xl border p-5 shadow-sm ${plan.highlight ? "border-amber-300 bg-white shadow-amber-100" : "border-slate-200 bg-white"}`}
                            >
                                {plan.highlight && (
                                    <span className="self-start mb-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">Most Popular</span>
                                )}
                                <h3 className="text-base font-semibold text-slate-900">{plan.name}</h3>
                                <div className="mt-1">
                                    <span className="text-2xl font-bold text-amber-700">{plan.price}</span>
                                    <span className="text-sm text-slate-500 ml-1">{plan.per}</span>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">{plan.desc}</p>
                                <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-700">
                                    {plan.items.map((it, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500 shrink-0">✓</span>{it}</li>)}
                                </ul>
                                <button
                                    className={`mt-5 rounded-full px-4 py-2 text-sm font-semibold transition ${plan.highlight ? "bg-amber-600 text-white hover:bg-amber-500" : "border border-slate-300 bg-white text-slate-900 hover:border-amber-300 hover:text-amber-700"}`}
                                    onClick={() => handlePurchase(plan.purchaseType)}
                                >
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </main>
        );
    } else if (activePage === "faceyoga") {
        pageContent = <FaceYogaPage lang="en" currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("faceyoga")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qimen") {
        pageContent = <QimenPage lang="en" currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("taichi")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qigong") {
        pageContent = <QigongPage lang="en" currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("qigong")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "wingchun") {
        pageContent = <WingChunPage lang="en" currentUser={currentUser} authLoading={authLoading} isOwned={hasCourseAccess("wingchun")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "tcm") {
        pageContent = <TcmPage lang="en" />;
    } else if (activePage === "fengshui") {
        pageContent = <FengShuiPage lang="en" />;
    } else if (activePage === "login") {
        pageContent = (
            <LoginPage
                lang="en"
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
                lang="en"
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
        pageContent = <ProgramPage lang="en" onBack={goHome} />;
    } else if (activePage === "shop") {
        pageContent = <ShopPage lang="en" onBackHome={goHome} />;
    } else if (activePage === "about") {
        pageContent = <AboutPage lang="en" onBackHome={goHome} />;
    } else if (activePage === "contact") {
        pageContent = <ContactPage lang="en" onBackHome={goHome} />;
    } else if (activePage === "mycourses") {
        pageContent = (
            <MyCoursesPage
                lang="en"
                purchases={purchases}
                currentUser={currentUser}
                onNavigate={setActivePage}
                onPurchase={handlePurchase}
            />
        );
    } else if (activePage === "account") {
        pageContent = (
            <AccountPage
                lang="en"
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
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white text-lg font-bold shadow-sm md:cursor-default"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open menu"
                        >
                            太
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
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qimen")}>Tai Chi</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("wingchun")}>Wing Chun</button>
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={() => setActivePage("qigong")}>Acupoint</button>
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
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white text-lg font-bold">太</span>
                                <span className="text-base font-semibold text-slate-900">EastCulture</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none" aria-label="Close menu">×</button>
                        </div>
                        <nav className="flex flex-col gap-1 px-4 py-4 text-sm">
                            {[
                                { label: "Home", action: () => { goHome(); setSidebarOpen(false); } },
                                { label: "Tai Chi", action: () => { setActivePage("qimen"); setSidebarOpen(false); } },
                                { label: "Wing Chun", action: () => { setActivePage("wingchun"); setSidebarOpen(false); } },
                                { label: "Acupoint", action: () => { setActivePage("qigong"); setSidebarOpen(false); } },
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
