"use client";
import { useState, useEffect } from "react";

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

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"orders" | "users" | "summary">("summary");
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
        fetch(`${API_BASE}/api/admin/users`, {
          headers: { "x-admin-key": key },
        }),
        fetch(`${API_BASE}/api/admin/orders`, {
          headers: { "x-admin-key": key },
        }),
      ]);

      if (usersRes.status === 401 || ordersRes.status === 401) {
        setError("Invalid admin key");
        return;
      }

      const { users: u } = await usersRes.json();
      const { orders: o } = await ordersRes.json();
      setUsers(u || []);
      setOrders(o || []);
      setLoggedIn(true);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + Number(o.amount_nzd), 0);

  // Sales summary grouped by course/type
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

  const summaryMap: Record<string, { name: string; count: number; revenue: number }> = {};
  orders
    .filter((o) => o.status === "paid")
    .forEach((o) => {
      const key = o.course_id ?? o.purchase_type;
      if (!summaryMap[key]) {
        summaryMap[key] = { name: COURSE_NAMES[key] ?? key, count: 0, revenue: 0 };
      }
      summaryMap[key].count += 1;
      summaryMap[key].revenue += Number(o.amount_nzd);
    });
  const summary = Object.values(summaryMap).sort((a, b) => b.revenue - a.revenue);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-slate-900 mb-6">EastCulture Admin</h1>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData(adminKey)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                placeholder="Enter admin key"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
            <button
              onClick={() => fetchData(adminKey)}
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Enter Admin"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">EastCulture Admin</h1>
          <button
            onClick={() => setLoggedIn(false)}
            className="text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-slate-900">{orders.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-xs text-amber-700 mb-1">Revenue (NZD)</p>
            <p className="text-3xl font-bold text-amber-700">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setTab("summary")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === "summary"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Sales Summary
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === "orders"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setTab("users")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === "users"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            Users ({users.length})
          </button>
        </div>

        {/* Sales summary */}
        {tab === "summary" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-700">Revenue by Course (paid orders only)</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Course / Product</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Times Sold</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Total Revenue (NZD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summary.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                      <td className="px-4 py-3 text-slate-700">{s.count}</td>
                      <td className="px-4 py-3 font-semibold text-amber-700">${s.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                  {summary.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-xs text-slate-400">
                        No paid orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders table */}
        {tab === "orders" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Item</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{o.users?.username ?? "—"}</div>
                        <div className="text-xs text-slate-500">{o.users?.email ?? "—"}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          o.purchase_type === "membership"
                            ? "bg-amber-100 text-amber-700"
                            : o.purchase_type === "course"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {o.purchase_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {o.course_id ?? o.video_key ?? "membership"}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        NZD ${Number(o.amount_nzd).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          o.status === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : o.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {new Date(o.paid_at ?? o.created_at).toLocaleDateString("en-NZ")}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-xs text-slate-400">
                        No orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users table */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Username</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{u.username}</td>
                      <td className="px-4 py-3 text-slate-600">{u.email}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {new Date(u.created_at).toLocaleDateString("en-NZ")}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-xs text-slate-400">
                        No users yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
