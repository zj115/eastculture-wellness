// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
    { id: 1, titleEn: "Lower Back Pain Relief", subtitle: "Fast Relief • 3 Acupoints • Feel Better Fast", duration: "~5 min", coverImage: "/images/jiujiu-waist.png", fallbackImage: "/images/acupoint-waist-legs.png", priceNow: "$3.99", priceOld: "$9.99", sale: true, page: "jiujiu" },
    { id: 2, titleEn: "Neck & Shoulder Relief", subtitle: "Release Tension • Move Freely • Fast Relief", duration: "~5 min", coverImage: "/images/jiujiu-neck.png", fallbackImage: "/images/acupoint-neck-shoulder.png", priceNow: "$3.99", priceOld: "$9.99", sale: true, page: "jiujiu" },
    { id: 3, titleEn: "Sleep & Calm Support", subtitle: "10-Min Bedtime Routine • Fall Asleep Faster", duration: "~5 min", coverImage: "/images/jiujiu-sleep.png", fallbackImage: "/images/acupoint-daily.png", priceNow: "$3.99", priceOld: "$9.99", sale: true, page: "jiujiu" },
];

// ─── Acupoint lessons ─────────────────────────────────────────────────────────
const ACUPOINT_LESSONS = [
    { id: 1, titleEn: "Head Tension & Heavy Discomfort Release", subtitle: "Ease 23 Types Of Head & Neck Tightness | 3 Simple Moves For Instant Calm At Home", duration: "~60 min", coverImage: "/images/acupoint-head.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 2, titleEn: "Hand & Foot Stiff & Tired Recovery", subtitle: "Relax 28 Kinds Of Limb Stiffness & Discomfort | Easy Daily Self Care", duration: "~90 min", coverImage: "/images/acupoint-hands-feet.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 3, titleEn: "Full Body Daily Fatigue & Tension Care", subtitle: "Ease 16 Common Everyday Body Stiffness | No Extra Tools Needed", duration: "~70 min", coverImage: "/images/acupoint-daily.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 4, titleEn: "Neck & Shoulder Tightness Relief", subtitle: "Release 8 Types Of Upper Body Soreness | Quick 5-Minute Daily Routine", duration: "~40 min", coverImage: "/images/acupoint-neck-shoulder.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 5, titleEn: "Back & Leg Stiffness & Weariness Care", subtitle: "Ease 18 Kinds Of Lower Body Discomfort | Natural Gentle Daily Practices", duration: "~80 min", coverImage: "/images/acupoint-waist-legs.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
    { id: 6, titleEn: "Women's Private Body Comfort Care", subtitle: "Soothe 7 Common Female Daily Discomforts | Gentle, Private At-Home Wellness", duration: "~45 min", coverImage: "/images/acupoint-womens.png", fallbackImage: "/images/tai-chi/acupressure-cover.jpg", priceNow: "$29", priceOld: "$99.99", sale: true, page: "qigong" },
];

// ─── Tai Chi lessons (from QimenPage data) ───────────────────────────────────
const TAICHI_LESSONS = [
    { id: 1, titleEn: "Kidney Essence & Masculine Vitality", subtitle: "Deep core energy restoration, support lasting inner strength, ease body weariness & maintain peak daily male performance", duration: "~11 min", coverImage: "/images/tai-chi/lesson-07-huogu-yangsheng.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 2, titleEn: "Liver & Mood Stability Care", subtitle: "Clear internal stagnation, soothe irritability, release daily pressure & keep steady calm mindset", duration: "~10 min", coverImage: "/images/tai-chi/lesson-06-hunyuan-zhuang.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 3, titleEn: "Spleen & All-Day Energy Boost", subtitle: "Optimize internal energy absorption, banish constant sluggishness & maintain consistent high vitality", duration: "~17 min", coverImage: "/images/tai-chi/lesson-05-baduanjin.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 4, titleEn: "Lung Power & Physical Stamina", subtitle: "Deep breath regulation, expand lung capacity, build natural endurance & anti-fatigue reserve", duration: "~11 min", coverImage: "/images/tai-chi/lesson-03-wudang-18forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 5, titleEn: "Heart Calm & Mental Focus", subtitle: "Nourish heart spirit, calm overthinking, relieve inner anxiety & restore sharp clear mind", duration: "~11 min", coverImage: "/images/tai-chi/lesson-02-wudang-13forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 6, titleEn: "Deep Night Recovery & Quality Sleep", subtitle: "Calm nightly restlessness, ease frequent waking, enjoy deep uninterrupted sleep & fully refreshed mornings", duration: "~28 min", coverImage: "/images/tai-chi/lesson-01-wudang-28forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
    { id: 7, titleEn: "Five Organs Full System Deep Conditioning", subtitle: "Comprehensive heart/liver/spleen/lung/kidney balance, full body deep maintenance for long term prime wellness", duration: "~30 min", coverImage: "/images/tai-chi/lesson-04-wudang-108forms.png", fallbackImage: "/images/taiji-mountain.jpg", priceNow: "$39", priceOld: "$59.99", sale: true, page: "qimen" },
];

// ─── Gua Sha course (single product card) ────────────────────────────────────
const GUASHA_COURSE = {
    titleEn: "Natural Facial Gua Sha Full Care Course",
    subtitle: "Daily 5-Min Routine | Relieve Facial Stiffness, Reduce Puffiness, Brighten Dull Skin & Keep Fresh Rested Look. No Surgery, No Salon Costs.",
    cardTitle: "16 Step-by-Step Facial Gua Sha Master Course",
    cardSubtitle: "16 Complete Tutorials | Full 2h 34min Training | Lifetime Access",
    coverImage: "/images/guasha-face.jpg",
    fallbackImage: "/images/face-yoga-masterclass.jpg",
    priceNow: "$45",
    priceOld: "$99.99",
    sale: true,
    page: "guasha",
};

// ─── Wing Chun lessons ────────────────────────────────────────────────────────
const WINGCHUN_LESSONS = [
    { id: 1, titleEn: "Wing Chun 10 Health Qigong Full Course", subtitle: "Structured Daily Gentle Training. Correct Bad Posture, Build Solid Core Strength & Boost All-Day Consistent Energy", duration: "Full Step-by-Step Lessons | ~7 Min Per Routine", coverImage: "/images/wingchun-yangsheng.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "$49.98", priceOld: "$99.98", sale: true, page: "wingchun" },
    { id: 2, titleEn: "Wing Chun Practical Self-Defense Full Course", subtitle: "Easy Real-Life Protection Techniques. Gain Solid Confidence, Stay Calm & Feel Safe In Any Situation", duration: "Beginner Friendly Guide | ~12 Min Per Lesson", coverImage: "/images/wingchun-fangwei.png", fallbackImage: "/images/wingchun-hero.png", priceNow: "$49.98", priceOld: "$99.98", sale: true, page: "wingchun" },
];

// ─── Card component ───────────────────────────────────────────────────────────
function LessonCard({ lesson, onNavigate }) {
    const [imgErr, setImgErr] = useState(false);
    return (
        <div
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
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
                    <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        Sale
                    </span>
                )}
            </div>
            <div className="p-3 flex flex-col flex-1">
                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">
                    {lesson.titleEn}
                </p>
                {lesson.subtitle && (
                    <p className="text-[11px] text-slate-500 mb-2 leading-snug line-clamp-2">{lesson.subtitle}</p>
                )}
                {lesson.duration && (
                    <p className="text-[11px] text-slate-400 mb-2">{lesson.duration}</p>
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

    // Page view tracking — fires on every page navigation
    useEffect(() => {
        fetch("https://eastculture-api.vercel.app/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                path: "/" + activePage,
                referrer: document.referrer || null,
            }),
        }).catch(() => {}); // silently ignore errors
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
                            title="Quick Relief Self-Care Course"
                            subtitle="Fast Relief for Common Daily Discomforts. 3 Simple Acupoint Routines, 5-10 Minutes Each, Instant Comfort at Home."
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
                            title="Quick Relief Acupressure Self-Care Master Course"
                            subtitle="Full Step-by-Step Acupressure Course. No Medication, No Professional Help Needed. Easy Guided Home Routines, Fast Gentle Body Comfort & Build Long-Lasting Natural Daily Wellness."
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
                            title="Nourish Five Internal Organs, Calm Deep Inner Imbalance & Restore Long-Term Masculine Vitality"
                            subtitle="Ancient Wudang Tai Chi Full Course. Seven Major Viscera Systematic Deep Nourishment, Step-by-Step Guided Practice, Eliminate Root Fatigue & Rebalance Full-Body Natural Wellness."
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
                            title="Natural Facial Gua Sha Full Care Course"
                            subtitle="Daily 5-Min Routine | Relieve Facial Stiffness, Reduce Puffiness, Brighten Dull Skin & Keep Fresh Rested Look. No Surgery, No Salon Costs."
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
                                    alt={GUASHA_COURSE.titleEn}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = GUASHA_COURSE.fallbackImage; }}
                                />
                                <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                                    Sale
                                </span>
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                                <p className="text-xs font-semibold text-slate-900 leading-snug mb-1">{GUASHA_COURSE.titleEn}</p>
                                <p className="text-[11px] text-slate-500 mb-2">{GUASHA_COURSE.subtitle}</p>
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
                            title="Wing Chun Complete Self-Defense & Vitality Master Course"
                            subtitle="Systematic Practical Wing Chun Training. Master Easy Real-World Protection, Fix Posture, Build Core Strength & Unshakable Inner Confidence."
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
                    <span>© 2015 EastCulture · Tai Chi · Traditional Arts Online</span>
                    <span>All educational content is provided for wellness and cultural learning. It does not replace medical advice.</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
