import { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE || "https://eastculture-api.vercel.app";

// ─── Forgot-password inline panel ────────────────────────────────────────────
function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "request", email }),
      });
      // Always show success (don't reveal whether email exists)
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">
          ✉️
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Check your email</p>
          <p className="mt-1 text-xs text-slate-500">
            If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your spam folder too.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-amber-700 underline hover:text-amber-600"
        >
          Back to login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition"
        >
          <span>←</span> Back to login
        </button>
        <p className="text-base font-semibold text-slate-900">Forgot your password?</p>
        <p className="mt-1 text-xs text-slate-500">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your registered email"
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
          className="w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </div>
  );
}

// ─── Reset-password form (shown when ?reset_token= is in the URL) ─────────────
function ResetPassword({ token, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "confirm", token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Reset failed."); return; }
      setDone(true);
      setTimeout(onDone, 2000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">✅</div>
        <p className="text-sm font-semibold text-slate-900">Password updated!</p>
        <p className="text-xs text-slate-500">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-base font-semibold text-slate-900">Set a new password</p>
        <p className="mt-1 text-xs text-slate-500">Choose a new password for your account.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">New password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
            required />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Confirm new password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            placeholder="Enter password again"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
            required />
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
        )}
        <button type="submit" disabled={loading}
          className="w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50">
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </div>
  );
}

// ─── Main LoginPage ────────────────────────────────────────────────────────────
export default function LoginPage({
  onBackHome,
  onGoRegister,
  onLoginSuccess,
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check URL for reset token
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const resetToken = params.get("reset_token");

  const [view, setView] = useState(resetToken ? "reset" : "login");

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
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      if (data.token) {
        localStorage.setItem("ec_token", data.token);
      }

      onLoginSuccess(data.user);
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function handleResetDone() {
    // Clear ?reset_token= from URL and show login
    window.history.replaceState({}, "", window.location.pathname);
    setView("login");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <button
        onClick={onBackHome}
        className="mb-8 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 transition"
      >
        <span className="text-lg">←</span>
        Back to home
      </button>

      <div className="grid gap-12 md:grid-cols-[minmax(0,420px),1fr] items-start">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">

          {/* ── Reset password view (arrived from email link) ── */}
          {view === "reset" && (
            <ResetPassword token={resetToken} onDone={handleResetDone} />
          )}

          {/* ── Forgot password view ── */}
          {view === "forgot" && (
            <ForgotPassword onBack={() => setView("login")} />
          )}

          {/* ── Normal login view ── */}
          {view === "login" && (
            <>
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Member access
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                  Member Login
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Log in to access your courses, orders and learning progress.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Email / Username
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-[11px] text-amber-700 hover:text-amber-600 underline-offset-2 hover:underline transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                  {loading ? "Logging in…" : "Login"}
                </button>
              </form>

              <div className="mt-4 text-[11px] text-slate-500">
                <button
                  onClick={onGoRegister}
                  className="underline hover:text-slate-700"
                >
                  No account yet? Create one
                </button>
              </div>
            </>
          )}
        </section>

        <section className="hidden md:block space-y-4 text-sm text-slate-600">
          <h2 className="text-lg font-semibold text-slate-900">
            Why create an account?
          </h2>
          <ul className="space-y-2 text-xs leading-6">
            <li>• Access all your purchased courses anytime.</li>
            <li>• Sync your learning progress.</li>
            <li>• Join member Q&amp;A and live sessions.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
