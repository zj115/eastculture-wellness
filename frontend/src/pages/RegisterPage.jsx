import { useState } from "react";
import { useTranslation } from "react-i18next";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

export default function RegisterPage({
  onBackHome,
  onGoLogin,
  onRegisterSuccess,
}) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t("register.passwordTooShort"));
      return;
    }
    if (password !== confirm) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("register.registrationFailed"));
        return;
      }

      if (data.token) {
        localStorage.setItem("ec_token", data.token);
      }

      onRegisterSuccess(data.user);
    } catch {
      setError(t("register.networkError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <button
        onClick={onBackHome}
        className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
      >
        <span className="text-lg">←</span>
        {t("common.backToHome")}
      </button>

      <div className="grid gap-12 md:grid-cols-[minmax(0,420px),1fr] items-start">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {t("register.freeAccount")}
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {t("register.title")}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {t("register.subtitle")}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {t("register.username")}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("register.usernamePlaceholder")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {t("register.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("register.emailPlaceholder")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {t("register.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("register.passwordPlaceholder")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {t("register.confirmPassword")}
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={t("register.confirmPlaceholder")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? t("register.creatingAccount") : t("register.createButton")}
            </button>
          </form>

          <div className="mt-4 text-[11px] text-slate-500">
            <button
              type="button"
              onClick={onGoLogin}
              className="underline hover:text-slate-700"
            >
              {t("register.alreadyHaveAccount")}
            </button>
          </div>
        </section>

        <section className="hidden md:block space-y-4 text-sm text-slate-600">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("register.whatYouGet")}
          </h2>
          <ul className="space-y-2 text-xs leading-6 text-slate-600">
            <li>• {t("register.benefit1")}</li>
            <li>• {t("register.benefit2")}</li>
            <li>• {t("register.benefit3")}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
