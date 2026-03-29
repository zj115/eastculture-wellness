import { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

export default function RegisterPage({
  lang,
  onBackHome,
  onGoLogin,
  onRegisterSuccess,
}) {
  const isZh = lang === "zh";
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
      setError(isZh ? "密码至少 6 位。" : "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError(isZh ? "两次输入的密码不一致。" : "Passwords do not match.");
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
        setError(
          data.error ||
            (isZh ? "注册失败，请重试。" : "Registration failed. Please try again.")
        );
        return;
      }

      // Store token in localStorage for cross-site requests (iOS Safari cookie fix)
      if (data.token) {
        localStorage.setItem("ec_token", data.token);
      }

      onRegisterSuccess(data.user);
    } catch {
      setError(
        isZh
          ? "网络错误，请稍后再试。"
          : "Network error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:pt-12">
      <button
        onClick={onBackHome}
        className="mb-6 inline-flex items-center gap-2 text-xs text-slate-300/80 hover:text-amber-300 transition"
      >
        <span className="text-lg">←</span>
        {isZh ? "返回首页" : "Back to home"}
      </button>

      <div className="grid gap-10 md:grid-cols-[minmax(0,420px),1fr] items-start">
        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 md:p-8 shadow-2xl shadow-black/60">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
            {isZh ? "创建新账号" : "Create Your Account"}
          </h1>
          <p className="text-sm text-slate-300/80 mb-6">
            {isZh
              ? "注册后即可保存你的奇门、面部瑜伽与太极课程进度。"
              : "Sign up to save your Qi Men, face yoga and Tai Chi course progress."}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                {isZh ? "用户名" : "Username"}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isZh ? "用于显示在站内的昵称" : "Name shown inside the site"}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                {isZh ? "邮箱" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZh ? "用于登录和接收课程通知" : "Used for login and updates"}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                {isZh ? "设置密码" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isZh ? "至少 6 位" : "At least 6 characters"}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                {isZh ? "确认密码" : "Confirm password"}
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={isZh ? "再次输入密码" : "Enter password again"}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(245,158,11,0.55)] hover:bg-amber-400 transition disabled:opacity-50"
            >
              {loading
                ? (isZh ? "注册中..." : "Creating account...")
                : (isZh ? "注册并登录" : "Sign up and log in")}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400/90">
            <button
              type="button"
              onClick={onGoLogin}
              className="text-amber-300 hover:text-amber-200 underline-offset-2 hover:underline"
            >
              {isZh ? "已经有账号？直接登录" : "Already have an account? Log in"}
            </button>
          </div>
        </section>

        <section className="hidden md:block text-sm text-slate-300/85 space-y-3">
          <h2 className="text-lg font-semibold">
            {isZh ? "账号权益一览" : "What you get with an account"}
          </h2>
          <ul className="space-y-2 text-xs text-slate-300/90">
            <li>• {isZh ? "保存和同步你的学习进度。" : "Save & sync your practice progress."}</li>
            <li>• {isZh ? "记录奇门、风水咨询与课程订单。" : "Track course and consultation orders."}</li>
            <li>
              •{" "}
              {isZh
                ? "接收课程更新与活动通知（可随时退订）。"
                : "Receive course updates (opt-out anytime)."}
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
