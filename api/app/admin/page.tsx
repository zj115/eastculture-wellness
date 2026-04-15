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
  status: string;
  created_at: string;
  paid_at: string | null;
  stripe_session_id: string | null;
  users: { username: string; email: string } | null;
}

const COURSE_NAMES: Record<string, string> = {
  faceyoga: "Face Yoga Masterclass",
  taichi: "Tai Chi System",
  qigong: "Acupressure Masterclass",
  wingchun: "Wing Chun Foundations",
  guasha: "16 Facial Gua Sha",
  membership_monthly: "Monthly Membership",
  membership_quarterly: "Quarterly Membership",
  membership_annual: "Annual Membership",
};

function fmt(amount: number) {
  return `NZD $${amount.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric", month: "short", year: "numeric",
  });
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
    membership: "bg-amber-100 text-amber-700",
    membership_monthly: "bg-amber-100 text-amber-700",
    membership_quarterly: "bg-amber-100 text-amber-700",
    membership_annual: "bg-amber-100 text-amber-700",
  };
  const s = styles[type] ?? "bg-slate-100 text-slate-600";
  const label = type.startsWith("membership") ? "membership" : type;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s}`}>
      {label}
    </span>
  );
}

function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm font-semibold text-slate-600 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 max-w-xs">{subtitle}</p>}
    </div>
  );
}

function StatCard({
  label, value, sub, accent,
}: {
  label: string; value: string | number; sub?: string; accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${accent ? "bg-amber-50 border-amber-200" : "bg-white border-slate-200"}`}>
      <p className={`text-xs font-medium uppercase tracking-wide mb-2 ${accent ? "text-amber-600" : "text-slate-500"}`}>{label}</p>
      <p className={`text-3xl font-bold leading-none ${accent ? "text-amber-700" : "text-slate-900"}`}>{value}</p>
      {sub && <p className={`text-xs mt-2 ${accent ? "text-amber-500" : "text-slate-400"}`}>{sub}</p>}
    </div>
  );
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"overview" | "summary" | "orders" | "users">("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function fetchData(key: string) {
    setLoading(true);
    setError("");
    try {
      const [usersRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/users`, { headers: { "x-admin-key": key } }),
        fetch(`${API_BASE}/api/admin/orders`, { headers: { "x-admin-key": key } }),
      ]);
      if (usersRes.status === 401 || ordersRes.status === 401) {
        setError("Incorrect admin key. Please try again.");
        return;
      }
      const { users: u } = await usersRes.json();
      const { orders: o } = await ordersRes.json();
      setUsers(u || []);
      setOrders(o || []);
      setLoggedIn(true);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  // ── Computed stats ─────────────────────────────────────────────────────────
  const paidOrders = orders.filter((o) => o.status === "paid");
  const pendingOrders = orders.filter((o) => o.status === "pending");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.amount_nzd), 0);

  const summaryMap: Record<string, { name: string; count: number; revenue: number }> = {};
  paidOrders.forEach((o) => {
    const key = o.course_id ?? o.purchase_type;
    if (!summaryMap[key]) {
      summaryMap[key] = { name: COURSE_NAMES[key] ?? key, count: 0, revenue: 0 };
    }
    summaryMap[key].count += 1;
    summaryMap[key].revenue += Number(o.amount_nzd);
  });
  const summary = Object.values(summaryMap).sort((a, b) => b.revenue - a.revenue);
  const bestSeller = summary[0] ?? null;
  const recentOrders = [...orders].slice(0, 10);

  // ── Purchase count per user ─────────────────────────────────────────────────
  const purchaseCountByEmail: Record<string, number> = {};
  paidOrders.forEach((o) => {
    const email = o.users?.email ?? "";
    if (email) purchaseCountByEmail[email] = (purchaseCountByEmail[email] ?? 0) + 1;
  });

  // ── Login screen ───────────────────────────────────────────────────────────
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
    { id: "summary", label: "Sales Summary" },
    { id: "orders", label: `Orders (${orders.length})` },
    { id: "users", label: `Users (${users.length})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Top nav ── */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
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

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatCard label="Total Users" value={users.length} sub="registered accounts" />
          <StatCard label="Paid Orders" value={paidOrders.length} sub="completed payments" />
          <StatCard label="Pending" value={pendingOrders.length} sub="awaiting payment" />
          <StatCard label="Total Revenue" value={fmt(totalRevenue)} sub="paid orders only" accent />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm col-span-2 md:col-span-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Best Seller</p>
            {bestSeller ? (
              <>
                <p className="text-sm font-bold text-slate-900 leading-snug">{bestSeller.name}</p>
                <p className="text-xs text-slate-400 mt-1">{bestSeller.count} sale{bestSeller.count !== 1 ? "s" : ""} · {fmt(bestSeller.revenue)}</p>
              </>
            ) : (
              <p className="text-sm text-slate-400 font-medium">No sales yet</p>
            )}
          </div>
        </div>

        {/* ── Tab nav ── */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
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
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Recent Orders</p>
                  <p className="text-xs text-slate-400 mt-0.5">Latest 10 orders across all statuses</p>
                </div>
                {orders.length > 0 && (
                  <button
                    onClick={() => setTab("orders")}
                    className="text-xs text-amber-600 hover:text-amber-700 font-semibold transition"
                  >
                    View all →
                  </button>
                )}
              </div>
              {recentOrders.length === 0 ? (
                <EmptyState icon="📭" title="No orders yet" subtitle="Orders will appear here once customers start purchasing." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-3.5">
                            <p className="font-semibold text-slate-900 text-xs">{o.users?.username ?? "—"}</p>
                            <p className="text-xs text-slate-400">{o.users?.email ?? "—"}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-xs font-medium text-slate-700">
                              {COURSE_NAMES[o.course_id ?? o.purchase_type] ?? o.course_id ?? o.purchase_type}
                            </p>
                            <TypeBadge type={o.purchase_type} />
                          </td>
                          <td className="px-4 py-3.5 text-sm font-bold text-slate-900">{fmt(Number(o.amount_nzd))}</td>
                          <td className="px-4 py-3.5"><StatusBadge status={o.status} /></td>
                          <td className="px-4 py-3.5 text-xs text-slate-400">{fmtDate(o.paid_at ?? o.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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
              <EmptyState icon="📊" title="No course sales yet" subtitle="This section will show revenue and sales count per course once customers make purchases." />
            ) : (
              <div className="overflow-x-auto">
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
            )}
          </div>
        )}

        {/* ══ ORDERS ══ */}
        {tab === "orders" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">All Orders</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {paidOrders.length} paid · {pendingOrders.length} pending
                </p>
              </div>
            </div>
            {orders.length === 0 ? (
              <EmptyState icon="🛒" title="No orders yet" subtitle="All customer orders will appear here, including pending and paid." />
            ) : (
              <div className="overflow-x-auto">
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
                          {COURSE_NAMES[o.course_id ?? ""] ?? o.course_id ?? o.video_key ?? "—"}
                        </td>
                        <td className="px-4 py-3.5 font-bold text-slate-900">{fmt(Number(o.amount_nzd))}</td>
                        <td className="px-4 py-3.5"><StatusBadge status={o.status} /></td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">{fmtDate(o.paid_at ?? o.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ USERS ══ */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">Registered Users</p>
              <p className="text-xs text-slate-400 mt-0.5">{users.length} total account{users.length !== 1 ? "s" : ""}</p>
            </div>
            {users.length === 0 ? (
              <EmptyState icon="👥" title="No users yet" subtitle="Registered customers will appear here." />
            ) : (
              <div className="overflow-x-auto">
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
                          <td className="px-4 py-3.5 text-xs text-slate-400">{fmtDate(u.created_at)}</td>
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
            )}
          </div>
        )}

      </div>
    </div>
  );
}
