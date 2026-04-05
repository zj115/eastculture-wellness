import { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

export default function RegisterPage({
  onBackHome,
  onGoLogin,
  onRegisterSuccess,
}) {
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
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
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
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      // Store token in localStorage for cross-site requests (iOS Safari cookie fix)
      if (data.token) {
        localStorage.setItem("ec_token", data.token);
      }

      onRegisterSuccess(data.user);
    } catch {
      setError("Network error. Please try again later.");
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
        Back to home
      </button>

      <div className="grid gap-10 md:grid-cols-[minmax(0,420px),1fr] items-start">
        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 md:p-8 shadow-2xl shadow-black/60">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-300/80 mb-6">
            Sign up to save your course progress and access purchased content.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name shown inside the site"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Used for login and updates"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/70 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200/90">
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Enter password again"
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
              {loading ? "Creating account..." : "Sign up and log in"}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400/90">
            <button
              type="button"
              onClick={onGoLogin}
              className="text-amber-300 hover:text-amber-200 underline-offset-2 hover:underline"
            >
              Already have an account? Log in
            </button>
          </div>
        </section>

        <section className="hidden md:block text-sm text-slate-300/85 space-y-3">
          <h2 className="text-lg font-semibold">
            What you get with an account
          </h2>
          <ul className="space-y-2 text-xs text-slate-300/90">
            <li>• Save & sync your practice progress.</li>
            <li>• Track course and consultation orders.</li>
            <li>• Receive course updates (opt-out anytime).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
