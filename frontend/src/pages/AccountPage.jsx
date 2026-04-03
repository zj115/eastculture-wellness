// src/pages/AccountPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

function formatDate(str) {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function PurchaseBadge({ type, lang }) {
    const t = lang === "zh";
    if (type === "membership") return (
        <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-semibold">
            {t ? "会员" : "Membership"}
        </span>
    );
    if (type === "course") return (
        <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-semibold">
            {t ? "课程" : "Course"}
        </span>
    );
    return (
        <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
            {t ? "单节" : "Video"}
        </span>
    );
}

function courseLabel(purchase, lang) {
    const t = lang === "zh";
    if (purchase.purchase_type === "membership") return t ? "全站会员" : "All-Access Membership";
    const map = {
        faceyoga: t ? "面部瑜伽与按摩" : "Face Yoga & Facial Massage",
        taichi: t ? "太极系统课" : "Tai Chi System Course",
        qigong: t ? "穴位疗程" : "Acupressure Therapy",
        wingchun: t ? "咏春基础课" : "Wing Chun Foundations",
    };
    if (purchase.course_id && map[purchase.course_id]) return map[purchase.course_id];
    if (purchase.video_key) {
        const parts = purchase.video_key.split("/");
        return parts[parts.length - 1].replace(/-/g, " ").replace(".mp4", "");
    }
    return "—";
}

export default function AccountPage({ lang, currentUser, purchases = [], onLogout }) {
    const t = lang === "zh";
    const [tab, setTab] = useState("overview"); // overview | purchases | password
    const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
    const [pwStatus, setPwStatus] = useState(null); // null | "loading" | "success" | "error"
    const [pwError, setPwError] = useState("");

    const now = new Date();
    const activePurchases = purchases.filter(
        (p) => !p.expires_at || new Date(p.expires_at) > now
    );
    const isMember = activePurchases.some((p) => p.purchase_type === "membership");
    const memberPurchase = activePurchases.find((p) => p.purchase_type === "membership");

    async function handleChangePassword(e) {
        e.preventDefault();
        if (pwForm.next !== pwForm.confirm) {
            setPwError(t ? "两次密码不一致" : "Passwords do not match");
            return;
        }
        if (pwForm.next.length < 6) {
            setPwError(t ? "密码至少6位" : "Password must be at least 6 characters");
            return;
        }
        setPwStatus("loading");
        setPwError("");
        try {
            const res = await fetch(`${API_BASE}/api/auth/change-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
            });
            const data = await res.json();
            if (res.ok) {
                setPwStatus("success");
                setPwForm({ current: "", next: "", confirm: "" });
            } else {
                setPwStatus("error");
                setPwError(data.error || (t ? "修改失败" : "Failed to change password"));
            }
        } catch {
            setPwStatus("error");
            setPwError(t ? "网络错误，请重试" : "Network error. Please try again.");
        }
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
            {/* Header */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                        {t ? "我的账户" : "My Account"}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {currentUser?.email}
                    </p>
                </div>
                <button
                    onClick={onLogout}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-red-200 hover:text-red-600 transition"
                >
                    {t ? "退出登录" : "Log out"}
                </button>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1 text-xs font-medium w-fit">
                {[
                    { key: "overview", label: t ? "概览" : "Overview" },
                    { key: "purchases", label: t ? "购买记录" : "Purchases" },
                    { key: "password", label: t ? "修改密码" : "Change Password" },
                ].map((tab_) => (
                    <button
                        key={tab_.key}
                        onClick={() => setTab(tab_.key)}
                        className={`rounded-lg px-4 py-1.5 transition ${
                            tab === tab_.key
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {tab_.label}
                    </button>
                ))}
            </div>

            {/* Overview tab */}
            {tab === "overview" && (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                >
                    {/* Account info */}
                    <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100">
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t ? "用户名" : "Username"}</span>
                            <span className="text-sm font-medium text-slate-900">{currentUser?.username}</span>
                        </div>
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t ? "邮箱" : "Email"}</span>
                            <span className="text-sm text-slate-700">{currentUser?.email}</span>
                        </div>
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t ? "会员状态" : "Membership"}</span>
                            {isMember ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs text-amber-800 font-medium">
                                    ★ {t ? "全站会员" : "All-Access Member"}
                                    {memberPurchase?.expires_at && (
                                        <span className="text-amber-600">
                                            · {t ? "到期" : "until"} {formatDate(memberPurchase.expires_at)}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <span className="text-xs text-slate-400">{t ? "普通用户" : "Standard"}</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t ? "已购课程" : "Courses Purchased"}</span>
                            <span className="text-sm font-medium text-slate-900">
                                {isMember
                                    ? (t ? "全部课程" : "All courses")
                                    : `${activePurchases.filter((p) => p.purchase_type === "course").length}`}
                            </span>
                        </div>
                    </div>

                    {/* Summary stats */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                            <div className="text-2xl font-bold text-amber-700">
                                {activePurchases.length}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{t ? "有效购买" : "Active Purchases"}</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                            <div className="text-2xl font-bold text-amber-700">
                                {activePurchases.filter((p) => p.purchase_type === "course").length}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{t ? "课程" : "Courses"}</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                            <div className="text-2xl font-bold text-amber-700">
                                {isMember ? "★" : "—"}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{t ? "会员" : "Member"}</div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Purchases tab */}
            {tab === "purchases" && (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                >
                    {purchases.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                            <p className="text-sm text-slate-500">
                                {t ? "暂无购买记录" : "No purchases yet"}
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">
                            {purchases.map((p, i) => {
                                const expired = p.expires_at && new Date(p.expires_at) < now;
                                return (
                                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${expired ? "opacity-50" : ""}`}>
                                        <div className="flex items-center gap-3">
                                            <PurchaseBadge type={p.purchase_type} lang={lang} />
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">
                                                    {courseLabel(p, lang)}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {formatDate(p.created_at)}
                                                    {p.expires_at && (
                                                        <span className="ml-2">
                                                            · {expired
                                                                ? (t ? "已过期" : "Expired")
                                                                : `${t ? "到期" : "Expires"} ${formatDate(p.expires_at)}`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {expired ? (
                                                <span className="text-red-400">{t ? "已过期" : "Expired"}</span>
                                            ) : (
                                                <span className="text-emerald-600">{t ? "有效" : "Active"}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            )}

            {/* Change Password tab */}
            {tab === "password" && (
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                >
                    <form
                        onSubmit={handleChangePassword}
                        className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
                    >
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                {t ? "当前密码" : "Current Password"}
                            </label>
                            <input
                                type="password"
                                value={pwForm.current}
                                onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                                required
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                {t ? "新密码" : "New Password"}
                            </label>
                            <input
                                type="password"
                                value={pwForm.next}
                                onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                {t ? "确认新密码" : "Confirm New Password"}
                            </label>
                            <input
                                type="password"
                                value={pwForm.confirm}
                                onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                                required
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                            />
                        </div>

                        {pwError && (
                            <p className="text-xs text-red-500">{pwError}</p>
                        )}
                        {pwStatus === "success" && (
                            <p className="text-xs text-emerald-600">
                                {t ? "密码修改成功" : "Password changed successfully"}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={pwStatus === "loading"}
                            className="w-full rounded-full bg-amber-600 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition disabled:opacity-60"
                        >
                            {pwStatus === "loading"
                                ? (t ? "提交中..." : "Saving...")
                                : (t ? "修改密码" : "Change Password")}
                        </button>
                    </form>
                </motion.div>
            )}
        </main>
    );
}
