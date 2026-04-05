// src/pages/MyCoursesPage.jsx
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

// All available courses
const ALL_COURSES = [
    {
        id: "faceyoga",
        page: "faceyoga",
        titleEn: "Face Yoga & Facial Massage",
        descEn: "Gentle routines to lift, relax and refresh your facial muscles.",
        image: "/images/face-yoga-masterclass.jpg",
        lessons: 16,
        tag: "Face Yoga",
    },
    {
        id: "taichi",
        page: "qimen",
        titleEn: "Tai Chi System Course",
        descEn: "Soft, flowing Tai Chi routines to nourish your joints, balance and inner calm.",
        image: "/images/taiji-mountain.jpg",
        lessons: 4,
        tag: "Tai Chi",
    },
    {
        id: "qigong",
        page: "qigong",
        titleEn: "Acupressure Therapy",
        descEn: "Simple acupressure routines to release tension and restore calm.",
        image: "/images/tai-chi/acupressure-cover.jpg",
        lessons: 6,
        tag: "Acupressure",
    },
    {
        id: "wingchun",
        page: "wingchun",
        titleEn: "Wing Chun Foundations",
        descEn: "Health Qigong 10 Forms + Self-Defense 9 Forms. ~7 min each, for all ages.",
        image: "/images/wing-chun-yangsheng-cover.jpg",
        lessons: 2,
        tag: "Wing Chun",
    },
];

const COURSE_VIDEO_PREFIXES = {
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
        if (p.purchase_type === "membership") {
            ALL_COURSES.forEach((c) => accessed.add(c.id));
        } else if (p.purchase_type === "course" && p.course_id) {
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

function hasMembership(purchases) {
    if (!purchases) return false;
    const now = new Date();
    return purchases.some(
        (p) =>
            p.purchase_type === "membership" &&
            (!p.expires_at || new Date(p.expires_at) > now)
    );
}

export default function MyCoursesPage({ purchases = [], currentUser, onNavigate, onPurchase }) {
    const accessibleCourses = getAccessibleCourses(purchases);
    const isMember = hasMembership(purchases);

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
                    My Courses
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Welcome back, {currentUser?.username}. Here are all your unlocked courses.
                </p>
                {isMember && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs text-amber-800 font-medium">
                        <span>★</span>
                        All-Access Member · Unlimited course access
                    </div>
                )}
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
                        Unlocked Courses
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {accessibleCourses.map((course) => (
                            <motion.div
                                key={course.id}
                                className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                                whileHover={{ y: -2 }}
                                onClick={() => onNavigate(course.page)}
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.titleEn}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] text-white font-semibold">
                                        Unlocked
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-1 text-[10px] uppercase tracking-wider text-amber-700 font-medium">
                                        {course.tag}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {course.titleEn}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {course.descEn}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-slate-400">
                                            {course.lessons} lessons
                                        </span>
                                        <span className="text-xs font-medium text-amber-700 group-hover:text-amber-600 transition">
                                            Continue →
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
                        You haven't purchased any courses yet
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Browse courses and start your first lesson
                    </p>
                    <button
                        onClick={() => onNavigate("home")}
                        className="mt-4 rounded-full bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition"
                    >
                        Browse Courses
                    </button>
                </motion.div>
            )}

            {/* Locked courses - upsell */}
            {lockedCourses.length > 0 && !isMember && (
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
                        More Courses
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {lockedCourses.map((course) => (
                            <div
                                key={course.id}
                                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden opacity-70"
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.titleEn}
                                        className="h-full w-full object-cover grayscale"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-2 right-2 rounded-full bg-slate-700 px-2 py-0.5 text-[10px] text-white">
                                        🔒 Locked
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                                        {course.tag}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-700">
                                        {course.titleEn}
                                    </h3>
                                    <button
                                        onClick={() => onPurchase("course", { courseId: course.id })}
                                        className="mt-3 w-full rounded-full border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition"
                                    >
                                        Purchase to unlock
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Membership upsell */}
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="text-sm font-semibold text-slate-900">
                                All-Access Membership · from NZD 30/month
                            </div>
                            <div className="mt-0.5 text-xs text-slate-600">
                                One subscription, unlock all courses, new content monthly
                            </div>
                        </div>
                        <button
                            onClick={() => onPurchase("membership_monthly")}
                            className="shrink-0 rounded-full bg-amber-600 px-5 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </motion.section>
            )}
        </main>
    );
}
