"use client";
import { useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

interface Order {
  id: string;
  amount_nzd: number;
  currency: string;
  purchase_type: string;
  course_id: string | null;
  video_key: string | null;
  service_id: string | null;
  status: string;
  created_at: string;
  paid_at: string | null;
  stripe_session_id: string | null;
  users: { username: string; email: string } | null;
}

interface Analytics {
  totalViews: number;
  last7Days: number;
  daily: { date: string; views: number }[];
  topPages: { path: string; views: number }[];
}

const COURSE_NAMES: Record<string, string> = {
  faceyoga: "Face Yoga Masterclass",
  taichi: "Tai Chi System",
  qigong: "Acupressure Masterclass",
  wingchun: "Wing Chun Foundations",
  guasha: "16 Facial Gua Sha",
};

const SERVICE_NAMES: Record<string, string> = {
  hehe: "Relationship Harmony Adjustment",
  bucaiku: "Wealth Treasury Restoration",
  qimen: "Qi Men Dun Jia Time-Space Reading",
  huanyinzhai: "Karmic Debt Clearance",
};

function orderLabel(order: Order) {
  if (order.course_id) return COURSE_NAMES[order.course_id] ?? order.course_id;
  if (order.service_id) return SERVICE_NAMES[order.service_id] ?? order.service_id;
  if (order.video_key) return order.video_key;
  return order.purchase_type;
}

function fmt(amount: number) {
  return `$${amount.toFixed(2)} USD`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function fmtShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", { day: "numeric", month: "short" });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    pending: "bg-amber-100 text-amber-700 ring-amber-200",
    failed: "bg-red-100 text-red-700 ring-red-200",
    cancelled: "bg-red-100 text-red-700 ring-red-200",
  };
  const s = styles[status] ?? "bg-slate-100 text-slate-600 ring-slate-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${s}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    course: "bg-blue-100 text-blue-700",
    video: "bg-purple-100 text-purple-700",
  };
  const s = styles[type] ?? "bg-slate-100 text-slate-600";
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s}`}>
      {label}
    </span>
  );
}

function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-sm font-semibold text-slate-600 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 max-w-xs">{subtitle}</p>}
    </div>
  );
}

function StatCard({
  label, value, sub, accent, icon,
}: {
  label: string; value: string | number; sub?: string; accent?: boolean; icon?: string;
}) {
  return (
    <div className={`rounded-2xl border p-4 md:p-5 shadow-sm flex flex-col gap-1 ${accent ? "bg-amber-50 border-amber-200" : "bg-white border-slate-200"}`}>
      <div className="flex items-center justify-between mb-1">
        <p className={`text-xs font-semibold uppercase tracking-wide ${accent ? "text-amber-600" : "text-slate-500"}`}>{label}</p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className={`text-2xl md:text-3xl font-bold leading-none ${accent ? "text-amber-700" : "text-slate-900"}`}>{value}</p>
      {sub && <p className={`text-xs mt-1 ${accent ? "text-amber-500" : "text-slate-400"}`}>{sub}</p>}
    </div>
  );
}

// Simple bar chart for daily views
function MiniBarChart({ data }: { data: { date: string; views: number }[] }) {
  const maxVal = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
          <div
            className="w-full rounded-t bg-amber-400 group-hover:bg-amber-500 transition-all"
            style={{ height: `${Math.max((d.views / maxVal) * 52, d.views > 0 ? 4 : 2)}px` }}
          />
          <span className="text-[9px] text-slate-400 leading-none">{fmtShortDate(d.date)}</span>
          {/* tooltip */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
            {d.views}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"overview" | "summary" | "orders" | "users">("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function fetchData(key: string) {
    setLoading(true);
    setError("");
    try {
      const [usersRes, ordersRes, analyticsRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/users`, { headers: { "x-admin-key": key } }),
        fetch(`${API_BASE}/api/admin/orders`, { headers: { "x-admin-key": key } }),
        fetch(`${API_BASE}/api/admin/analytics`, { headers: { "x-admin-key": key } }),
      ]);
      if (usersRes.status === 401 || ordersRes.status === 401) {
        setError("Incorrect admin key. Please try again.");
        return;
      }
      const { users: u } = await usersRes.json();
      const { orders: o } = await ordersRes.json();
      const analyticsData = analyticsRes.ok ? await analyticsRes.json() : null;
      setUsers(u || []);
      setOrders(o || []);
      setAnalytics(analyticsData);
      setLoggedIn(true);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Computed stats ──────────────────────────────────────────────────────────
  const paidOrders = orders.filter((o) => o.status === "paid");
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.amount_nzd), 0);

  const summaryMap: Record<string, { name: string; count: number; revenue: number }> = {};
  paidOrders.forEach((o) => {
    const key = o.course_id ?? o.service_id ?? o.purchase_type;
    if (!summaryMap[key]) {
      summaryMap[key] = { name: COURSE_NAMES[key] ?? SERVICE_NAMES[key] ?? key, count: 0, revenue: 0 };
    }
    summaryMap[key].count += 1;
    summaryMap[key].revenue += Number(o.amount_nzd);
  });
  const summary = Object.values(summaryMap).sort((a, b) => b.revenue - a.revenue);
  const bestSeller = summary[0] ?? null;
  const recentOrders = [...orders].slice(0, 10);
  const recentUsers = [...users].slice(0, 8);

  const purchaseCountByEmail: Record<string, number> = {};
  paidOrders.forEach((o) => {
    const email = o.users?.email ?? "";
    if (email) purchaseCountByEmail[email] = (purchaseCountByEmail[email] ?? 0) + 1;
  });

  // ── Login screen ─────────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 w-full max-w-sm">
          <div className="mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white text-sm font-bold mb-4">
              EC
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">WellnessEastern · Internal use only</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData(adminKey)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                placeholder="Enter your admin key"
              />
            </div>
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}
            <button
              onClick={() => fetchData(adminKey)}
              disabled={loading || !adminKey}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const TABS: { id: typeof tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "summary", label: "Sales" },
    { id: "orders", label: `Orders (${orders.length})` },
    { id: "users", label: `Users (${users.length})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top nav ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              EC
            </div>
            <span className="font-bold text-slate-900 text-sm">WellnessEastern Admin</span>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="text-xs text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 transition hover:border-slate-300"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-6">

        {/* ── KPI cards row ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total Users" value={users.length} sub="registered" icon="👤" />
          <StatCard label="Paid Orders" value={paidOrders.length} sub="completed" icon="✅" />
          <StatCard label="Pending" value={pendingOrders.length} sub="awaiting" icon="⏳" />
          <StatCard label="Total Revenue" value={fmt(totalRevenue)} sub="paid only" accent icon="💰" />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best Seller</p>
              <span className="text-lg">🏆</span>
            </div>
            {bestSeller ? (
              <>
                <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{bestSeller.name}</p>
                <p className="text-xs text-slate-400 mt-1">{bestSeller.count} sale{bestSeller.count !== 1 ? "s" : ""}</p>
              </>
            ) : (
              <p className="text-sm text-slate-400 font-medium mt-1">No sales yet</p>
            )}
          </div>
          <StatCard
            label="Page Views"
            value={analytics ? analytics.totalViews.toLocaleString() : "—"}
            sub={analytics ? `${analytics.last7Days} this week` : "tracking active"}
            icon="📈"
          />
        </div>

        {/* ── Tab nav ── */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                tab === t.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW ══ */}
        {tab === "overview" && (
          <div className="space-y-5">

            {/* ── Analytics row ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traffic chart */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Website Traffic</p>
                    <p className="text-xs text-slate-400 mt-0.5">Page views — last 7 days</p>
                  </div>
                  {analytics && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 rounded-lg px-2.5 py-1">
                      {analytics.last7Days} views
                    </span>
                  )}
                </div>
                {analytics && analytics.daily.length > 0 ? (
                  <MiniBarChart data={analytics.daily} />
                ) : (
                  <div className="h-16 flex items-center justify-center">
                    <p className="text-xs text-slate-400">
                      {analytics === null ? "Analytics not available" : "No traffic data yet — add the tracking snippet to your frontend"}
                    </p>
                  </div>
                )}
              </div>

              {/* Top pages */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p className="text-sm font-bold text-slate-900 mb-4">Top Pages</p>
                {analytics && analytics.topPages.length > 0 ? (
                  <div className="space-y-2">
                    {analytics.topPages.map((p) => {
                      const pct = analytics.totalViews > 0 ? (p.views / analytics.totalViews) * 100 : 0;
                      return (
                        <div key={p.path} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-medium text-slate-700 truncate max-w-[160px]">{p.path || "/"}</span>
                              <span className="text-xs text-slate-500 shrink-0 ml-2">{p.views}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-20">
                    <p className="text-xs text-slate-400 text-center max-w-xs">
                      {analytics === null
                        ? "No analytics data"
                        : "No page view data yet. See below to add tracking to your website."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── 2-col: Recent Orders + Recent Users ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

              {/* Recent orders (wider) */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Recent Orders</p>
                    <p className="text-xs text-slate-400 mt-0.5">Latest 10 orders</p>
                  </div>
                  {orders.length > 0 && (
                    <button onClick={() => setTab("orders")} className="text-xs text-amber-600 hover:text-amber-700 font-semibold transition shrink-0 ml-2">
                      View all →
                    </button>
                  )}
                </div>
                {recentOrders.length === 0 ? (
                  <EmptyState icon="📭" title="No orders yet" subtitle="Orders will appear here once customers start purchasing." />
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {recentOrders.map((o) => (
                            <tr key={o.id} className="hover:bg-slate-50 transition">
                              <td className="px-5 py-3">
                                <p className="font-semibold text-slate-900 text-xs">{o.users?.username ?? "—"}</p>
                                <p className="text-xs text-slate-400">{o.users?.email ?? "—"}</p>
                              </td>
                              <td className="px-4 py-3">
                                <p className="text-xs font-medium text-slate-700 leading-snug">
                                  {orderLabel(o)}
                                </p>
                                <TypeBadge type={o.purchase_type} />
                              </td>
                              <td className="px-4 py-3 text-sm font-bold text-slate-900 whitespace-nowrap">{fmt(Number(o.amount_nzd))}</td>
                              <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile cards */}
                    <div className="md:hidden divide-y divide-slate-100">
                      {recentOrders.map((o) => (
                        <div key={o.id} className="px-5 py-3.5 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 truncate">{o.users?.username ?? "—"}</p>
                            <p className="text-xs text-slate-400 truncate">{orderLabel(o)}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{fmtDate(o.paid_at ?? o.created_at)}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <span className="text-sm font-bold text-slate-900">{fmt(Number(o.amount_nzd))}</span>
                            <StatusBadge status={o.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Recent users (narrower) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Recent Users</p>
                    <p className="text-xs text-slate-400 mt-0.5">Latest registrations</p>
                  </div>
                  {users.length > 0 && (
                    <button onClick={() => setTab("users")} className="text-xs text-amber-600 hover:text-amber-700 font-semibold transition shrink-0 ml-2">
                      View all →
                    </button>
                  )}
                </div>
                {recentUsers.length === 0 ? (
                  <EmptyState icon="👥" title="No users yet" subtitle="Registered customers will appear here." />
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentUsers.map((u) => {
                      const count = purchaseCountByEmail[u.email] ?? 0;
                      return (
                        <div key={u.id} className="px-5 py-3 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                            {(u.username?.[0] ?? u.email[0]).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-900 truncate">{u.username || u.email}</p>
                            <p className="text-xs text-slate-400">{fmtDate(u.created_at)}</p>
                          </div>
                          {count > 0 ? (
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5 shrink-0">{count}</span>
                          ) : (
                            <span className="text-xs text-slate-300 shrink-0">—</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ── Sales by course (compact) ── */}
            {summary.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Sales by Product</p>
                    <p className="text-xs text-slate-400 mt-0.5">Revenue breakdown</p>
                  </div>
                  <button onClick={() => setTab("summary")} className="text-xs text-amber-600 hover:text-amber-700 font-semibold transition">
                    Full breakdown →
                  </button>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {summary.map((s, i) => (
                    <div key={s.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-bold text-slate-800 leading-snug line-clamp-1">{s.name}</p>
                        {i === 0 && <span className="text-xs">🏆</span>}
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-sm font-bold text-amber-700">{fmt(s.revenue)}</p>
                        <p className="text-xs text-slate-400">{s.count} sale{s.count !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${totalRevenue > 0 ? (s.revenue / totalRevenue) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── How to add tracking (only if analytics is missing data) ── */}
            {analytics && analytics.totalViews === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <p className="text-sm font-bold text-blue-900 mb-1">📡 Enable Website Traffic Tracking</p>
                <p className="text-xs text-blue-700 mb-3 leading-relaxed">
                  Your admin can now receive page view data. To start tracking, add this snippet to your frontend React app (e.g. in a <code className="bg-blue-100 rounded px-1">useEffect</code> at the top level):
                </p>
                <pre className="bg-blue-900 text-blue-100 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed">
{`useEffect(() => {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || null,
    }),
  }).catch(() => {}); // ignore errors
}, []);`}
                </pre>
                <p className="text-xs text-blue-600 mt-2">
                  You also need to create a <code className="bg-blue-100 rounded px-1">page_views</code> table in Supabase — see instructions below.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ══ SALES SUMMARY ══ */}
        {tab === "summary" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">Revenue by Course</p>
              <p className="text-xs text-slate-400 mt-0.5">Paid orders only — sorted by revenue</p>
            </div>
            {summary.length === 0 ? (
              <EmptyState icon="📊" title="No course sales yet" subtitle="Revenue and sales count per course will appear once customers make purchases." />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Course / Product</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Times Sold</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Revenue</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {summary.map((s) => (
                        <tr key={s.name} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-semibold text-slate-900">{s.name}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                              {s.count}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-bold text-amber-700">{fmt(s.revenue)}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-amber-500"
                                  style={{ width: `${totalRevenue > 0 ? (s.revenue / totalRevenue) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">
                                {totalRevenue > 0 ? Math.round((s.revenue / totalRevenue) * 100) : 0}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {summary.map((s) => (
                    <div key={s.name} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm font-semibold text-slate-900 leading-snug">{s.name}</p>
                        <p className="text-sm font-bold text-amber-700 shrink-0">{fmt(s.revenue)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{ width: `${totalRevenue > 0 ? (s.revenue / totalRevenue) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">{s.count} sold · {totalRevenue > 0 ? Math.round((s.revenue / totalRevenue) * 100) : 0}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══ ORDERS ══ */}
        {tab === "orders" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">All Orders</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {paidOrders.length} paid · {pendingOrders.length} pending
              </p>
            </div>
            {orders.length === 0 ? (
              <EmptyState icon="🛒" title="No orders yet" subtitle="All customer orders will appear here, including pending and paid." />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-3.5">
                            <p className="font-semibold text-slate-900 text-xs">{o.users?.username ?? "—"}</p>
                            <p className="text-xs text-slate-400">{o.users?.email ?? "—"}</p>
                          </td>
                          <td className="px-4 py-3.5"><TypeBadge type={o.purchase_type} /></td>
                          <td className="px-4 py-3.5 text-xs font-medium text-slate-700">
                            {orderLabel(o)}
                          </td>
                          <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">{fmt(Number(o.amount_nzd))}</td>
                          <td className="px-4 py-3.5"><StatusBadge status={o.status} /></td>
                          <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{fmtDate(o.paid_at ?? o.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {orders.map((o) => (
                    <div key={o.id} className="px-5 py-3.5">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">{o.users?.username ?? "—"}</p>
                          <p className="text-xs text-slate-400 truncate">{o.users?.email ?? "—"}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900 shrink-0">{fmt(Number(o.amount_nzd))}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <TypeBadge type={o.purchase_type} />
                        <StatusBadge status={o.status} />
                        <span className="text-xs text-slate-400">{fmtDate(o.paid_at ?? o.created_at)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {orderLabel(o)}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══ USERS ══ */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">Registered Users</p>
              <p className="text-xs text-slate-400 mt-0.5">{users.length} total account{users.length !== 1 ? "s" : ""}</p>
            </div>
            {users.length === 0 ? (
              <EmptyState icon="👥" title="No users yet" subtitle="Registered customers will appear here." />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Joined</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Purchases</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => {
                        const count = purchaseCountByEmail[u.email] ?? 0;
                        return (
                          <tr key={u.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                  {(u.username?.[0] ?? u.email[0]).toUpperCase()}
                                </div>
                                <span className="font-semibold text-slate-900 text-xs">{u.username || "—"}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-slate-600">{u.email}</td>
                            <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{fmtDate(u.created_at)}</td>
                            <td className="px-4 py-3.5">
                              {count > 0 ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                                  {count} paid
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">No purchases</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden divide-y divide-slate-100">
                  {users.map((u) => {
                    const count = purchaseCountByEmail[u.email] ?? 0;
                    return (
                      <div key={u.id} className="px-5 py-3.5 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 shrink-0">
                          {(u.username?.[0] ?? u.email[0]).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">{u.username || u.email}</p>
                          <p className="text-xs text-slate-400 truncate">{u.email}</p>
                          <p className="text-xs text-slate-400">{fmtDate(u.created_at)}</p>
                        </div>
                        {count > 0 ? (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-1 shrink-0">{count} paid</span>
                        ) : (
                          <span className="text-xs text-slate-300 shrink-0">—</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
