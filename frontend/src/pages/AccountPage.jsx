// src/pages/AccountPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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

function PurchaseBadge({ type }) {
    const { t } = useTranslation();
    if (type === "course") return (
        <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-semibold">
            {t("account.course")}
        </span>
    );
    if (type === "service") return (
        <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-semibold">
            {t("account.service")}
        </span>
    );
    return (
        <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-semibold">
            {t("account.video")}
        </span>
    );
}

function courseLabel(purchase, t) {
    const map = {
        faceyoga: t("account.courseFaceYoga"),
        taichi: t("account.courseTaiChi"),
        qigong: t("account.courseAcupressure"),
        wingchun: t("account.courseWingChun"),
        jiujiu: t("account.courseQuickRelief"),
        guasha: t("account.courseGuaSha"),
    };
    if (purchase.course_id && map[purchase.course_id]) return map[purchase.course_id];
    if (purchase.service_id) {
        return t(`xuanxue.services.${purchase.service_id}.title`, { defaultValue: purchase.service_id });
    }
    if (purchase.video_key) {
        const parts = purchase.video_key.split("/");
        return parts[parts.length - 1].replace(/-/g, " ").replace(".mp4", "");
    }
    return "—";
}

export default function AccountPage({ currentUser, purchases = [], onLogout }) {
    const { t } = useTranslation();
    const [tab, setTab] = useState("overview"); // overview | purchases | password
    const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
    const [pwStatus, setPwStatus] = useState(null); // null | "loading" | "success" | "error"
    const [pwError, setPwError] = useState("");

    const now = new Date();
    const activePurchases = purchases.filter(
        (p) => !p.expires_at || new Date(p.expires_at) > now
    );

    async function handleChangePassword(e) {
        e.preventDefault();
        if (pwForm.next !== pwForm.confirm) {
            setPwError(t("account.passwordMismatch"));
            return;
        }
        if (pwForm.next.length < 6) {
            setPwError(t("account.passwordTooShort"));
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
                setPwError(data.error || t("account.passwordChangeFailed"));
            }
        } catch {
            setPwStatus("error");
            setPwError(t("account.networkError"));
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
                        {t("account.title")}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {currentUser?.email}
                    </p>
                </div>
                <button
                    onClick={onLogout}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-red-200 hover:text-red-600 transition"
                >
                    {t("account.logOut")}
                </button>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl bg-slate-100 p-1 text-xs font-medium w-fit">
                {[
                    { key: "overview", label: t("account.overview") },
                    { key: "purchases", label: t("account.purchases") },
                    { key: "password", label: t("account.changePassword") },
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
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t("account.username")}</span>
                            <span className="text-sm font-medium text-slate-900">{currentUser?.username}</span>
                        </div>
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t("account.email")}</span>
                            <span className="text-sm text-slate-700">{currentUser?.email}</span>
                        </div>
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-xs text-slate-500 uppercase tracking-wider">{t("account.coursesPurchased")}</span>
                            <span className="text-sm font-medium text-slate-900">
                                {activePurchases.filter((p) => p.purchase_type === "course").length}
                            </span>
                        </div>
                    </div>

                    {/* Summary stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                            <div className="text-2xl font-bold text-amber-700">
                                {activePurchases.length}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{t("account.activePurchases")}</div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                            <div className="text-2xl font-bold text-amber-700">
                                {activePurchases.filter((p) => p.purchase_type === "course").length}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{t("account.courses")}</div>
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
                                {t("account.noPurchases")}
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">
                            {purchases.map((p, i) => {
                                const expired = p.expires_at && new Date(p.expires_at) < now;
                                return (
                                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${expired ? "opacity-50" : ""}`}>
                                        <div className="flex items-center gap-3">
                                            <PurchaseBadge type={p.purchase_type} />
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">
                                                    {courseLabel(p, t)}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {formatDate(p.created_at)}
                                                    {p.expires_at && (
                                                        <span className="ml-2">
                                                            · {expired
                                                                ? t("account.expired")
                                                                : `${t("account.expires")} ${formatDate(p.expires_at)}`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {expired ? (
                                                <span className="text-red-400">{t("account.expired")}</span>
                                            ) : (
                                                <span className="text-emerald-600">{t("account.active")}</span>
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
                                {t("account.currentPassword")}
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
                                {t("account.newPassword")}
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
                                {t("account.confirmNewPassword")}
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
                                {t("account.passwordChangedSuccess")}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={pwStatus === "loading"}
                            className="w-full rounded-full bg-amber-600 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition disabled:opacity-60"
                        >
                            {pwStatus === "loading" ? t("account.saving") : t("account.changePasswordButton")}
                        </button>
                    </form>
                </motion.div>
            )}
        </main>
    );
}
