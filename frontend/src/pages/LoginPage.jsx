import { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

export default function LoginPage({
  lang,
  onBackHome,
  onGoRegister,
  onLoginSuccess,
}) {
  const isZh = lang === "zh";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            (isZh ? "登录失败，请重试。" : "Login failed. Please try again.")
        );
        return;
      }

      onLoginSuccess(data.user);
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
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <button
        onClick={onBackHome}
        className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
      >
        <span className="text-lg">←</span>
        {isZh ? "返回首页" : "Back to home"}
      </button>

      <div className="grid gap-12 md:grid-cols-[minmax(0,420px),1fr] items-start">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {isZh ? "会员登录" : "Member access"}
            </div>

            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {isZh ? "会员登录" : "Member Login"}
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              {isZh
                ? "登录后即可查看已购课程、订单记录和学习进度。"
                : "Log in to access your courses, orders and learning progress."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {isZh ? "邮箱 / 用户名" : "Email / Username"}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  isZh ? "请输入邮箱或用户名" : "Enter your email or username"
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">
                {isZh ? "密码" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isZh ? "请输入密码" : "Enter your password"}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
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
              {loading ? (isZh ? "登录中..." : "Logging in...") : (isZh ? "登录" : "Login")}
            </button>
          </form>

          <div className="mt-4 text-[11px] text-slate-500">
            <button
              onClick={onGoRegister}
              className="underline hover:text-slate-700"
            >
              {isZh ? "还没有账号？点击注册" : "No account yet? Create one"}
            </button>
          </div>
        </section>

        <section className="hidden md:block space-y-4 text-sm text-slate-600">
          <h2 className="text-lg font-semibold text-slate-900">
            {isZh ? "为什么要创建账号？" : "Why create an account?"}
          </h2>

          <ul className="space-y-2 text-xs leading-6">
            <li>• {isZh ? "同步你的学习进度。" : "Sync your learning progress."}</li>
            <li>• {isZh ? "查看购买与课程记录。" : "View your purchased courses."}</li>
            <li>
              •{" "}
              {isZh
                ? "参与会员问答与直播课程。"
                : "Join member Q&A and live sessions."}
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
