// src/pages/MyCoursesPage.jsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

// All available courses
const ALL_COURSES = [
    {
        id: "jiujiu",
        page: "jiujiu",
        titleKey: "myCourses.courseQuickRelief",
        descKey: "myCourses.courseQuickReliefDesc",
        image: "/images/jiujiu-waist.jpg",
        lessons: 4,
        tagKey: "myCourses.tagQuickRelief",
    },
    {
        id: "faceyoga",
        page: "faceyoga",
        titleKey: "myCourses.courseFaceYoga",
        descKey: "myCourses.courseFaceYogaDesc",
        image: "/images/face-yoga-masterclass.jpg",
        lessons: 16,
        tagKey: "myCourses.tagFaceYoga",
    },
    {
        id: "taichi",
        page: "qimen",
        titleKey: "myCourses.courseTaiChi",
        descKey: "myCourses.courseTaiChiDesc",
        image: "/images/taiji-mountain-new.jpg",
        lessons: 7,
        tagKey: "myCourses.tagTaiChi",
    },
    {
        id: "qigong",
        page: "qigong",
        titleKey: "myCourses.courseAcupressure",
        descKey: "myCourses.courseAcupressureDesc",
        image: "/images/tai-chi/acupressure-cover.jpg",
        lessons: 6,
        tagKey: "myCourses.tagAcupressure",
    },
    {
        id: "wingchun",
        page: "wingchun",
        titleKey: "myCourses.courseWingChun",
        descKey: "myCourses.courseWingChunDesc",
        image: "/images/wingchun-hero.jpg",
        lessons: 2,
        tagKey: "myCourses.tagWingChun",
    },
    {
        id: "guasha",
        page: "guasha",
        titleKey: "myCourses.courseGuaSha",
        descKey: "myCourses.courseGuaShaDesc",
        image: "/images/guasha-face.jpg",
        lessons: 16,
        tagKey: "myCourses.tagGuaSha",
    },
];

const COURSE_VIDEO_PREFIXES = {
    jiujiu: "9.9/",
    faceyoga: "face-yoga/",
    taichi: "taichi/",
    qigong: "acupressure/",
    wingchun: "wingchun/",
};

function getAccessibleCourses(purchases) {
    if (!purchases || purchases.length === 0) return [];
    const now = new Date();
    const accessed = new Set();

    for (const p of purchases) {
        if (p.expires_at && new Date(p.expires_at) < now) continue;
        if (p.purchase_type === "course" && p.course_id) {
            accessed.add(p.course_id);
        } else if (p.purchase_type === "video" && p.video_key) {
            // Any video purchase from a course counts as having access to that course page
            for (const [courseId, prefix] of Object.entries(COURSE_VIDEO_PREFIXES)) {
                if (p.video_key.startsWith(prefix)) {
                    accessed.add(courseId);
                }
            }
        }
    }
    return ALL_COURSES.filter((c) => accessed.has(c.id));
}

export default function MyCoursesPage({ purchases = [], currentUser, onNavigate, onPurchase }) {
    const { t } = useTranslation();
    const accessibleCourses = getAccessibleCourses(purchases);

    // Locked courses = not yet purchased
    const lockedCourses = ALL_COURSES.filter(
        (c) => !accessibleCourses.find((a) => a.id === c.id)
    );

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 space-y-10">
            {/* Header */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {t("myCourses.title")}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    {t("myCourses.welcomeBack", { username: currentUser?.username })}
                </p>
            </motion.div>

            {/* Accessible courses */}
            {accessibleCourses.length > 0 ? (
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        {t("myCourses.unlockedCourses")}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {accessibleCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                                whileHover={{ y: -2 }}
                                onClick={() => onNavigate(course.page)}
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={t(course.titleKey)}
                                        loading={index < 3 ? "eager" : "lazy"}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] text-white font-semibold">
                                        {t("myCourses.unlocked")}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-1 text-[10px] uppercase tracking-wider text-amber-700 font-medium">
                                        {t(course.tagKey)}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {t(course.titleKey)}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {t(course.descKey)}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-slate-400">
                                            {t("myCourses.lessonsCount", { count: course.lessons })}
                                        </span>
                                        <span className="text-xs font-medium text-amber-700 group-hover:text-amber-600 transition">
                                            {t("myCourses.continue")}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center"
                >
                    <div className="text-3xl mb-3">📚</div>
                    <p className="text-sm font-medium text-slate-700">
                        {t("myCourses.noPurchases")}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        {t("myCourses.noPurchasesSubtitle")}
                    </p>
                    <button
                        onClick={() => onNavigate("home")}
                        className="mt-4 rounded-full bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition"
                    >
                        {t("myCourses.browseCourses")}
                    </button>
                </motion.div>
            )}

            {/* Locked courses - upsell */}
            {lockedCourses.length > 0 && (
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        {t("myCourses.moreCourses")}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {lockedCourses.map((course, index) => (
                            <div
                                key={course.id}
                                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden opacity-70"
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={t(course.titleKey)}
                                        loading={index < 3 ? "eager" : "lazy"}
                                        className="h-full w-full object-cover grayscale"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-2 right-2 rounded-full bg-slate-700 px-2 py-0.5 text-[10px] text-white">
                                        {t("myCourses.locked")}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                                        {t(course.tagKey)}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-700">
                                        {t(course.titleKey)}
                                    </h3>
                                    <button
                                        onClick={() => onPurchase("course", { courseId: course.id })}
                                        className="mt-3 w-full rounded-full border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition"
                                    >
                                        {t("myCourses.purchaseToUnlock")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}
        </main>
    );
}
