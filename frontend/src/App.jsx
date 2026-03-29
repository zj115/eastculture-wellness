// src/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

import FaceYogaPage from "./pages/FaceYogaPage";
import QimenPage from "./pages/QimenPage"; // 现在作为太极二级页使用
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

const content = {
    en: {
        brand: "EastCulture",
        subtitle: "Tai Chi & Traditional Arts Online Academy",
        heroTitle: "Learn Tai Chi for Health, Balance and Inner Peace",
        heroText:
            "Inspired by traditional teaching methods, EastCulture brings you step-by-step Tai Chi and traditional Chinese arts courses you can follow at home, at your own pace.",
        heroPrimary: "Browse Courses",
        heroSecondary: "Watch Intro Video",
        navCourses: "Courses",
        navProgram: "Program",
        navShop: "Shop",
        navAbout: "About",
        navContact: "Contact",
        forWhoTitle: "Who is this program for?",
        forWhoItems: [
            "Beginners who want a safe and structured way to start Tai Chi.",
            "Busy people who need short, easy-to-follow lessons.",
            "Students looking to improve balance, flexibility and calmness.",
            "Practitioners of traditional Chinese arts who want deeper understanding.",
        ],
        stylesTitle: "What you can learn here",
        stylesIntro:
            "Our curriculum is rooted in traditional Chinese culture, with clear explanations and modern teaching methods.",
        styles: [
            {
                key: "qigong",
                title: "Acupressure Therapy",
                desc: "Simple, practical acupressure routines to release tension, support daily self-care, and restore calm.",
            },
            {
                key: "baji",
                title: "Tai Chi Practice",
                desc: "Soft, flowing Tai Chi routines to nourish your joints, balance and inner calm.",
            },
            {
                key: "wingchun",
                title: "Wing Chun Foundations",
                desc: "Centerline theory, structure, and partner drills explained step by step.",
            },
            {
                key: "tcm",
                title: "Traditional Chinese Medicine for Daily Life",
                desc: "Meridian basics, body types, and practical lifestyle suggestions.",
            },
            {
                key: "fengshui",
                title: "Feng Shui & Space Harmony",
                desc: "Understand directions, layout and simple adjustments for home and office.",
            },
            {
                key: "faceyoga",
                title: "Face Yoga & Facial Massage",
                desc: "Gentle routines to lift, relax and refresh your facial muscles.",
            },
        ],
        pathTitle: "A clear learning path",
        pathSteps: [
            {
                title: "1. Start with the Foundations",
                text: "Short beginner modules teach posture, breathing and safe movement. No previous experience needed.",
            },
            {
                title: "2. Build a Weekly Practice",
                text: "Follow guided routines 10–20 minutes per day, with clear video breakdowns and reminders.",
            },
            {
                title: "3. Go Deeper with Series Courses",
                text: "Enroll in full series on Tai Chi, Wing Chun, Qigong, Feng Shui and more.",
            },
            {
                title: "4. Join Live Sessions (optional)",
                text: "Members can join live online practice sessions and Q&A with instructors.",
            },
        ],
        membershipTitle: "Choose your membership",
        membershipSubtitle: "Unlock all courses with one simple plan.",
        plans: [
            {
                name: "Monthly",
                price: "NZD 30 / month",
                desc: "Flexible month-to-month access.",
                purchaseType: "membership_monthly",
                items: [
                    "Unlimited access to all video courses",
                    "New lessons added monthly",
                    "Watch on any device",
                    "Cancel anytime",
                ],
                highlight: false,
            },
            {
                name: "Quarterly",
                price: "NZD 100 / 3 months",
                desc: "Save NZD 10 vs monthly.",
                purchaseType: "membership_quarterly",
                items: [
                    "Unlimited access to all video courses",
                    "New lessons added monthly",
                    "Watch on any device",
                    "Best for consistent practice",
                ],
                highlight: true,
            },
            {
                name: "Annual",
                price: "NZD 168 / year",
                desc: "Best value — save NZD 192 vs monthly.",
                purchaseType: "membership_annual",
                items: [
                    "Unlimited access to all video courses",
                    "New lessons added monthly",
                    "Watch on any device",
                    "Lowest price per month",
                ],
                highlight: false,
            },
        ],
        shopTitle: "Culture shop",
        shopText:
            "Support your practice with carefully selected bracelets, Taoist items and traditional tools, shipped worldwide.",
        shopButton: "Visit Shop",
        footerText:
            "All educational content is provided for wellness and cultural learning. It does not replace medical advice.",
        languageLabel: "Language",
        langEn: "EN",
        langZh: "中文",
        galleryTitle: "Practice & Culture Moments",
        galleryText:
            "Real practice, real spaces and real tools that support your body, mind and spirit.",
        login: "Login",
        logout: "Log out",
    },
    zh: {
        brand: "EastCulture",
        subtitle: "太极与东方传统文化线上学院",
        heroTitle: "在家系统学习太极，提高健康、平衡与内心宁静",
        heroText:
            "EastCulture 结合传统师承与现代教学方式，让你在家也能跟着老师一步一步练太极、气功以及其他中华传统文化课程。",
        heroPrimary: "查看全部课程",
        heroSecondary: "观看介绍视频",
        navCourses: "课程中心",
        navProgram: "学习路径",
        navShop: "文化商城",
        navAbout: "关于我们",
        navContact: "联系我们",
        forWhoTitle: "适合哪些人？",
        forWhoItems: [
            "零基础，希望安全、系统地开始太极练习的人。",
            "工作繁忙，只能利用碎片时间练习的人。",
            "想改善平衡感、柔韧性和情绪压力的学习者。",
            "对中华传统文化有兴趣，希望深入理解的人。",
        ],
        stylesTitle: "在这里你可以学到",
        stylesIntro:
            "课程以传统文化为根基，用清晰易懂的方式讲解，让你真正理解动作背后的原理。",
        styles: [
            {
                key: "qigong",
                title: "穴位疗程与自我调理",
                desc: "用简单易学的穴位按压与放松流程，缓解紧张与疲劳，帮助日常自我调理。",
            },
            {
                key: "baji",
                title: "太极系统课",
                desc: "学习太极基础，从站桩、步法到整套演练，循序渐进打好基础。",
            },
            {
                key: "wingchun",
                title: "咏春基础",
                desc: "中线理论、结构与黐手训练，逐步分解讲解。",
            },
            {
                key: "tcm",
                title: "生活中的中医思维",
                desc: "经络基础、体质类型与日常调养建议。",
            },
            {
                key: "fengshui",
                title: "家居风水与空间和谐",
                desc: "方位、布局与简单调整思路，适合日常应用。",
            },
            {
                key: "faceyoga",
                title: "面部瑜伽与按摩",
                desc: "温和的面部练习，帮助提升紧致、放松表情，恢复光泽。",
            },
        ],
        pathTitle: "清晰的学习路径",
        pathSteps: [
            {
                title: "1. 从基础开始",
                text: "先学站姿、呼吸、安全动作要领，不需要任何经验。",
            },
            {
                title: "2. 养成每周练习习惯",
                text: "跟着 10–20 分钟的引导练习，逐步建立身体记忆。",
            },
            {
                title: "3. 深入系列课程",
                text: "系统学习太极、咏春、气功、风水等完整系列。",
            },
            {
                title: "4. 参加在线直播（可选）",
                text: "会员可参与线上练习课与老师问答，获得个性化建议。",
            },
        ],
        membershipTitle: "选择你的会员方案",
        membershipSubtitle: "一次订阅，解锁全站所有课程。",
        plans: [
            {
                name: "月卡",
                price: "NZD 30 / 月",
                desc: "灵活按月订阅，随时可取消。",
                purchaseType: "membership_monthly",
                items: [
                    "全站所有视频课程不限次观看",
                    "每月持续新增课程",
                    "手机 / 平板 / 电脑均可观看",
                    "随时可取消",
                ],
                highlight: false,
            },
            {
                name: "季卡",
                price: "NZD 100 / 3个月",
                desc: "比月卡节省 NZD 10。",
                purchaseType: "membership_quarterly",
                items: [
                    "全站所有视频课程不限次观看",
                    "每月持续新增课程",
                    "手机 / 平板 / 电脑均可观看",
                    "适合持续练习者",
                ],
                highlight: true,
            },
            {
                name: "年卡",
                price: "NZD 168 / 年",
                desc: "最超值 — 比月卡节省 NZD 192。",
                purchaseType: "membership_annual",
                items: [
                    "全站所有视频课程不限次观看",
                    "每月持续新增课程",
                    "手机 / 平板 / 电脑均可观看",
                    "最低月均价格",
                ],
                highlight: false,
            },
        ],
        shopTitle: "文化商城",
        shopText:
            "精心挑选练功手串、道家用品与传统器具，让修习与日常生活自然融合，支持全球寄送。",
        shopButton: "进入商城",
        footerText:
            "本平台内容仅用于身心健康与文化学习，不构成任何医疗或诊断建议。",
        languageLabel: "语言",
        langEn: "EN",
        langZh: "中文",
        galleryTitle: "练功与文化瞬间",
        galleryText:
            "真实的练功场景、香火与中药细节，让东方传统文化变得可以触摸、可以实践。",
        login: "登录",
        logout: "退出",
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const styleImages = {
    qigong: "/images/tai-chi/acupressure-cover.jpg",
    baji: "/images/taiji-mountain.jpg",
    wingchun: "/images/martial-staff-demo.jpg",
    tcm: "/images/tcm-herb-grinding.jpg",
    fengshui: "/images/temple-incense-hall.jpg",
    faceyoga: "/images/face-yoga-before-after.jpg",
};

function App() {
    const [lang, setLang] = useState("en");
    const [activePage, setActivePage] = useState("home");
    const [currentUser, setCurrentUser] = useState(null);
    const [purchases, setPurchases] = useState([]);

    const [touchStartX, setTouchStartX] = useState(null);

    const t = content[lang];

    // Restore session on page load
    useEffect(() => {
        async function refreshPurchases() {
            try {
                const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setCurrentUser(data.user);
                        setPurchases(data.purchases || []);
                    }
                }
            } catch { /* ignore */ }
        }

        refreshPurchases();

        // Handle payment success redirect
        const params = new URLSearchParams(window.location.search);
        const payment = params.get("payment");
        if (payment === "success") {
            window.history.replaceState({}, "", window.location.pathname);
            // Webhook may need a moment to write to DB, poll a few times
            setTimeout(() => refreshPurchases(), 1500);
            setTimeout(() => refreshPurchases(), 4000);
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
            });
        } catch {
            // Ignore
        }
        setCurrentUser(null);
        setPurchases([]);
        setActivePage("home");
    }

    function hasCourseAccess(courseId) {
        if (!currentUser) return false;
        const now = new Date();
        return purchases.some((p) => {
            if (p.expires_at && new Date(p.expires_at) < now) return false;
            if (p.purchase_type === "membership") return true;
            if (p.purchase_type === "course" && p.course_id === courseId) return true;
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
        if (!currentUser) {
            setActivePage("login");
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ type, lang, ...options }),
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

    const galleryImages = [
        { src: "/images/martial-beach-group-training.jpg", alt: "Group practice at the beach" },
        { src: "/images/temple-offering-table.jpg", alt: "Temple offering table" },
        { src: "/images/tcm-acupuncture.jpg", alt: "TCM acupuncture practice" },
        { src: "/images/temple-incense-burner.jpg", alt: "Temple incense burner" },
        { src: "/images/tcm-herb-drawers.jpg", alt: "TCM herb drawers" },
        { src: "/images/tcm-herb-spoon.jpg", alt: "Herbal spoon and spices" },
    ];

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
            <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-14 space-y-16 md:space-y-24">
                <motion.section
                    className="grid gap-10 md:grid-cols-[1.08fr,1fr] items-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-amber-700/90">
                            {t.subtitle}
                        </p>
                        <h1 className="mb-4 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                            {t.heroTitle}
                        </h1>
                        <p className="mb-6 max-w-xl text-sm text-slate-600 md:text-base">
                            {t.heroText}
                        </p>

                        {/* ✅ 这里改：两个按钮都跳转到太极页 qimen */}
                        <div className="flex flex-wrap gap-3 text-sm">
                            <button
                                onClick={() => setActivePage("qimen")}
                                className="rounded-full bg-amber-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-amber-500 transition"
                            >
                                {t.heroPrimary}
                            </button>
                            <button
                                onClick={() => setActivePage("qimen")}
                                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-slate-900 hover:border-amber-300 hover:text-amber-700 transition"
                            >
                                {t.heroSecondary}
                            </button>
                        </div>
                    </div>

                    <motion.div
                        className="relative h-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] md:h-80"
                        variants={fadeIn}
                    >
                        <img
                            src="/images/martial-beach-group-training.jpg"
                            alt="Tai chi group training at the beach"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
                        <div className="absolute bottom-3 left-4 text-xs text-white/95">
                            <div className="rounded-full bg-black/50 px-3 py-1 text-[11px] backdrop-blur">
                                {lang === "en" ? "Morning practice • Calm body, calm mind" : "清晨练功 · 身心安稳"}
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                    className="space-y-6"
                >
                    <div className="space-y-3 text-sm text-slate-700 md:max-w-3xl">
                        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                            {t.galleryTitle}
                        </h2>
                        <p className="text-sm md:text-base">{t.galleryText}</p>
                        <p className="text-xs md:text-sm text-slate-500">
                            {lang === "en"
                                ? "All images on this page are for demonstration of the learning atmosphere. Course videos will be filmed with clear angles and slow, safe demonstrations."
                                : "本页图片用于展示学习氛围与文化场景。正式课程视频会使用清晰机位与慢速、安全的示范讲解。"}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="h-40 w-full object-cover md:h-48"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <h2 className="mb-4 text-xl font-semibold text-slate-900 md:text-2xl">
                        {t.forWhoTitle}
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {t.forWhoItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                                {t.stylesTitle}
                            </h2>
                            <p className="mt-1 max-w-xl text-sm text-slate-600">
                                {t.stylesIntro}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {t.styles.map((style) => (
                            <div
                                key={style.key}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div
                                    className="relative h-32 w-full overflow-hidden cursor-pointer"
                                    onClick={() => {
                                        if (style.key === "faceyoga") setActivePage("faceyoga");
                                        if (style.key === "baji") setActivePage("qimen");
                                        if (style.key === "qigong") setActivePage("qigong");
                                        if (style.key === "wingchun") setActivePage("wingchun");
                                        if (style.key === "tcm") setActivePage("tcm");
                                        if (style.key === "fengshui") setActivePage("fengshui");
                                    }}
                                >
                                    <img
                                        src={styleImages[style.key]}
                                        alt={style.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <div className="absolute bottom-2 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] text-slate-900 backdrop-blur">
                                        {lang === "en" ? "Course preview" : "课程预览图"}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-base font-semibold text-slate-900">
                                            {style.title}
                                        </h3>
                                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700">
                      Video course
                    </span>
                                    </div>

                                    <p className="mb-3 text-xs text-slate-600">{style.desc}</p>

                                    <button
                                        className="mt-2 inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-600 transition"
                                        onClick={() => {
                                            if (style.key === "faceyoga") setActivePage("faceyoga");
                                            if (style.key === "baji") setActivePage("qimen");
                                            if (style.key === "qigong") setActivePage("qigong");
                                            if (style.key === "wingchun") setActivePage("wingchun");
                                            if (style.key === "tcm") setActivePage("tcm");
                                            if (style.key === "fengshui") setActivePage("fengshui");
                                        }}
                                    >
                                        {lang === "en" ? "View lessons" : "查看课程"}
                                        <span className="inline-block translate-x-0 group-hover:translate-x-1 transition">
                      →
                    </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <h2 className="mb-4 text-xl font-semibold text-slate-900 md:text-2xl">
                        {t.pathTitle}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        {t.pathSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4"
                            >
                                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-slate-700">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                            {t.membershipTitle}
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            {t.membershipSubtitle}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {t.plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col rounded-2xl border p-4 shadow-sm ${
                                    plan.highlight
                                        ? "border-amber-300 bg-white shadow-[0_18px_60px_-40px_rgba(217,119,6,0.35)]"
                                        : "border-slate-200 bg-white"
                                }`}
                            >
                                <h3 className="text-sm font-semibold text-slate-900">{plan.name}</h3>
                                <div className="mt-1 text-lg font-bold text-amber-700">{plan.price}</div>
                                <p className="mt-1 text-xs text-slate-600">{plan.desc}</p>

                                <ul className="mt-3 flex-1 space-y-1.5 text-xs text-slate-700">
                                    {plan.items.map((it, i) => (
                                        <li key={i}>• {it}</li>
                                    ))}
                                </ul>

                                <button
                                    className={`mt-3 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                        plan.highlight
                                            ? "bg-amber-600 text-white hover:bg-amber-500"
                                            : "border border-slate-300 bg-white text-slate-900 hover:border-amber-300 hover:text-amber-700"
                                    }`}
                                    onClick={() => handlePurchase(plan.purchaseType)}
                                >
                                    {lang === "en" ? "Choose plan" : "选择此方案"}
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={fadeInUp}
                >
                    <div className="grid gap-4 md:grid-cols-[1.2fr,1fr] md:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                                {t.shopTitle}
                            </h2>
                            <p className="mt-1 max-w-xl text-sm text-slate-600">{t.shopText}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 md:block">
                                <img
                                    src="/images/temple-offering-table.jpg"
                                    alt="Temple offerings"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <button
                                className="w-full rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition md:w-auto"
                                onClick={() => setActivePage("shop")}
                            >
                                {t.shopButton}
                            </button>
                        </div>
                    </div>
                </motion.section>
            </main>
        );
    } else if (activePage === "faceyoga") {
        pageContent = <FaceYogaPage lang={lang} currentUser={currentUser} isOwned={hasCourseAccess("faceyoga")} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qimen") {
        pageContent = <QimenPage lang={lang} currentUser={currentUser} isOwned={hasCourseAccess("taichi")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "qigong") {
        pageContent = <QigongPage lang={lang} currentUser={currentUser} isOwned={hasCourseAccess("qigong")} purchases={purchases} onPurchase={handlePurchase} onGoLogin={() => setActivePage("login")} />;
    } else if (activePage === "wingchun") {
        pageContent = <WingChunPage lang={lang} />;
    } else if (activePage === "tcm") {
        pageContent = <TcmPage lang={lang} />;
    } else if (activePage === "fengshui") {
        pageContent = <FengShuiPage lang={lang} />;
    } else if (activePage === "login") {
        pageContent = (
            <LoginPage
                lang={lang}
                onBackHome={goHome}
                onGoRegister={() => setActivePage("register")}
                onLoginSuccess={(user) => {
                    setCurrentUser(user);
                    setActivePage("home");
                    // Refresh purchases after login
                    fetch(`${API_BASE}/api/auth/me`, { credentials: "include" })
                        .then(r => r.json())
                        .then(d => { if (d.purchases) setPurchases(d.purchases); })
                        .catch(() => {});
                }}
            />
        );
    } else if (activePage === "register") {
        pageContent = (
            <RegisterPage
                lang={lang}
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
        pageContent = <ProgramPage lang={lang} onBack={goHome} />;
    } else if (activePage === "shop") {
        pageContent = <ShopPage lang={lang} onBackHome={goHome} />;
    } else if (activePage === "about") {
        pageContent = <AboutPage lang={lang} onBackHome={goHome} />;
    } else if (activePage === "contact") {
        pageContent = <ContactPage lang={lang} onBackHome={goHome} />;
    } else if (activePage === "mycourses") {
        pageContent = (
            <MyCoursesPage
                lang={lang}
                purchases={purchases}
                currentUser={currentUser}
                onNavigate={setActivePage}
                onPurchase={handlePurchase}
            />
        );
    } else if (activePage === "account") {
        pageContent = (
            <AccountPage
                lang={lang}
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
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white text-lg font-bold shadow-sm">
              太
            </span>
                        <div>
                            <div className="text-lg font-semibold tracking-wide text-slate-900">
                                {t.brand}
                            </div>
                            <div className="text-[11px] text-slate-500">Tai Chi · Traditional Arts</div>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-6 text-sm md:flex">
                        <button className="text-slate-700 hover:text-amber-700 transition" onClick={goHome}>
                            {t.navCourses}
                        </button>
                        <button
                            className="text-slate-700 hover:text-amber-700 transition"
                            onClick={() => setActivePage("program")}
                        >
                            {t.navProgram}
                        </button>
                        <button
                            className="text-slate-700 hover:text-amber-700 transition"
                            onClick={() => setActivePage("shop")}
                        >
                            {t.navShop}
                        </button>
                        <button
                            className="text-slate-700 hover:text-amber-700 transition"
                            onClick={() => setActivePage("about")}
                        >
                            {t.navAbout}
                        </button>
                        <button
                            className="text-slate-700 hover:text-amber-700 transition"
                            onClick={() => setActivePage("contact")}
                        >
                            {t.navContact}
                        </button>
                    </nav>

                    <div className="flex items-center gap-3">
                        {!currentUser ? (
                            <button
                                className="hidden rounded-full border border-amber-300 bg-white px-3 py-1 text-xs text-amber-700 hover:bg-amber-50 md:inline-flex"
                                onClick={() => setActivePage("login")}
                            >
                                {t.login}
                            </button>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <button
                                    className="text-xs text-slate-600 hover:text-amber-700 transition"
                                    onClick={() => setActivePage("mycourses")}
                                >
                                    {lang === "en" ? "My Courses" : "我的课程"}
                                </button>
                                <button
                                    className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-amber-300 hover:text-amber-700 transition"
                                    onClick={() => setActivePage("account")}
                                >
                                    {lang === "en" ? `${currentUser.username}` : `${currentUser.username}`}
                                </button>
                            </div>
                        )}

                        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] shadow-sm">
                            <span className="hidden text-slate-500 md:inline">{t.languageLabel}:</span>
                            <button
                                className={`px-2 py-0.5 rounded-full transition ${
                                    lang === "en"
                                        ? "bg-amber-600 text-white font-semibold"
                                        : "text-slate-700 hover:text-amber-700"
                                }`}
                                onClick={() => setLang("en")}
                            >
                                {t.langEn}
                            </button>
                            <button
                                className={`px-2 py-0.5 rounded-full transition ${
                                    lang === "zh"
                                        ? "bg-amber-600 text-white font-semibold"
                                        : "text-slate-700 hover:text-amber-700"
                                }`}
                                onClick={() => setLang("zh")}
                            >
                                {t.langZh}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {pageContent}

            {activePage !== "home" && (
                <div className="mx-auto max-w-6xl px-4 pb-6">
                    <button
                        onClick={goHome}
                        className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-slate-600 hover:text-amber-700 transition"
                    >
                        <span className="text-lg">←</span>
                        {lang === "zh" ? "返回首页" : "Back to home"}
                    </button>
                </div>
            )}

            <footer className="border-t border-slate-200 bg-white py-4 text-[11px] text-slate-500">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
          <span>
            © {new Date().getFullYear()} EastCulture · Tai Chi · Traditional Arts Online
          </span>
                    <span>{t.footerText}</span>
                </div>
            </footer>
        </div>
    );
}

export default App;