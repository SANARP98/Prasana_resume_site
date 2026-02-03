"use client";

import { useState, useEffect, useCallback } from "react";

interface Summary {
  totalVisitors: number;
  totalPageViews: number;
  totalDownloads: number;
  visitorsToday: number;
  visitorsWeek: number;
  visitorsMonth: number;
  topPages: { path: string; count: number }[];
  topDownloads: { file: string; count: number }[];
  recentVisitors: Visitor[];
}

interface Visitor {
  session_id: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  browser: string;
  os: string;
  device: string;
  referrer?: string;
  first_seen: string;
  last_seen: string;
}

interface VisitorDetail {
  visitor: Visitor;
  pageViews: { path: string; title: string; timestamp: string }[];
  downloads: { file_name: string; file_path: string; timestamp: string }[];
}

interface GeoEntry {
  country: string;
  total: number;
  cities: { city: string; count: number }[];
}

type Tab = "overview" | "visitors" | "geo" | "downloads";

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [visitors, setVisitors] = useState<{ items: Visitor[]; total: number; page: number; totalPages: number } | null>(null);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorDetail | null>(null);
  const [geo, setGeo] = useState<GeoEntry[] | null>(null);
  const [downloadStats, setDownloadStats] = useState<{ stats: { _id: string; count: number; last_downloaded: string }[]; recent: { session_id: string; file_name: string; timestamp: string }[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    const res = await fetch("/api/dashboard/summary");
    if (res.ok) setSummary(await res.json());
  }, []);

  const fetchVisitors = useCallback(async (page = 1) => {
    const res = await fetch(`/api/dashboard/visitors?page=${page}&limit=25`);
    if (res.ok) setVisitors(await res.json());
  }, []);

  const fetchVisitorDetail = async (sessionId: string) => {
    const res = await fetch(`/api/dashboard/visitors/${sessionId}`);
    if (res.ok) setSelectedVisitor(await res.json());
  };

  const fetchGeo = useCallback(async () => {
    const res = await fetch("/api/dashboard/geo");
    if (res.ok) setGeo(await res.json());
  }, []);

  const fetchDownloads = useCallback(async () => {
    const res = await fetch("/api/dashboard/downloads");
    if (res.ok) setDownloadStats(await res.json());
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchSummary(), fetchVisitors(), fetchGeo(), fetchDownloads()])
      .finally(() => setLoading(false));
  }, [fetchSummary, fetchVisitors, fetchGeo, fetchDownloads]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-mediumGray">Loading...</div>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "visitors", label: "Visitors" },
    { id: "geo", label: "Geography" },
    { id: "downloads", label: "Downloads" },
  ];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-semibold text-darkGray uppercase tracking-widest">Analytics Dashboard</h1>
        <button onClick={handleLogout} className="text-xs text-mediumGray hover:text-accent transition-colors">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-darkGray/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelectedVisitor(null); }}
            className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              tab === t.id ? "text-accent border-b-2 border-accent" : "text-mediumGray hover:text-darkGray"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && summary && (
        <div>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <StatCard label="Total Visitors" value={summary.totalVisitors} />
            <StatCard label="Page Views" value={summary.totalPageViews} />
            <StatCard label="Downloads" value={summary.totalDownloads} />
            <StatCard label="Today" value={summary.visitorsToday} />
            <StatCard label="This Week" value={summary.visitorsWeek} />
            <StatCard label="This Month" value={summary.visitorsMonth} />
          </div>

          {/* Top Pages & Downloads */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">Top Pages</h2>
              <div className="border border-darkGray/10 rounded-md overflow-hidden">
                {summary.topPages.map((p, i) => (
                  <div key={i} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
                    <span className="text-darkGray truncate flex-1">{p.path}</span>
                    <span className="text-mediumGray ml-4">{p.count}</span>
                  </div>
                ))}
                {summary.topPages.length === 0 && (
                  <div className="px-4 py-3 text-xs text-mediumGray text-center">No data yet</div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">Top Downloads</h2>
              <div className="border border-darkGray/10 rounded-md overflow-hidden">
                {summary.topDownloads.map((d, i) => (
                  <div key={i} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
                    <span className="text-darkGray truncate flex-1">{d.file}</span>
                    <span className="text-mediumGray ml-4">{d.count}</span>
                  </div>
                ))}
                {summary.topDownloads.length === 0 && (
                  <div className="px-4 py-3 text-xs text-mediumGray text-center">No downloads yet</div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Visitors */}
          <div className="mt-6">
            <h2 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">Recent Visitors</h2>
            <VisitorTable
              items={summary.recentVisitors}
              onSelect={(v) => { setTab("visitors"); fetchVisitorDetail(v.session_id); }}
            />
          </div>
        </div>
      )}

      {/* Visitors Tab */}
      {tab === "visitors" && (
        <div>
          {selectedVisitor ? (
            <div>
              <button
                onClick={() => setSelectedVisitor(null)}
                className="text-xs text-accent hover:underline mb-4"
              >
                &larr; Back to list
              </button>
              <VisitorDetailView detail={selectedVisitor} />
            </div>
          ) : visitors ? (
            <div>
              <VisitorTable
                items={visitors.items}
                onSelect={(v) => fetchVisitorDetail(v.session_id)}
              />
              {/* Pagination */}
              {visitors.totalPages > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {Array.from({ length: Math.min(visitors.totalPages, 10) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => fetchVisitors(i + 1)}
                      className={`w-8 h-8 text-xs rounded ${
                        visitors.page === i + 1 ? "bg-accent text-cream" : "border border-darkGray/20 text-darkGray hover:border-accent"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Geo Tab */}
      {tab === "geo" && geo && (
        <div>
          {geo.map((g, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-semibold text-darkGray uppercase tracking-wider">{g.country}</h3>
                <span className="text-xs text-mediumGray">{g.total} visitors</span>
              </div>
              <div className="border border-darkGray/10 rounded-md overflow-hidden">
                {g.cities.map((c, j) => (
                  <div key={j} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
                    <span className="text-darkGray">{c.city}</span>
                    <span className="text-mediumGray">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {geo.length === 0 && (
            <div className="text-xs text-mediumGray text-center py-8">No geo data yet</div>
          )}
        </div>
      )}

      {/* Downloads Tab */}
      {tab === "downloads" && downloadStats && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">Download Counts</h2>
            <div className="border border-darkGray/10 rounded-md overflow-hidden">
              {downloadStats.stats.map((s, i) => (
                <div key={i} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
                  <span className="text-darkGray truncate flex-1">{s._id}</span>
                  <span className="text-mediumGray ml-4">{s.count} downloads</span>
                </div>
              ))}
              {downloadStats.stats.length === 0 && (
                <div className="px-4 py-3 text-xs text-mediumGray text-center">No downloads yet</div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">Recent Downloads</h2>
            <div className="border border-darkGray/10 rounded-md overflow-hidden">
              {downloadStats.recent.map((d, i) => (
                <div key={i} className="px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
                  <div className="text-darkGray">{d.file_name}</div>
                  <div className="text-mediumGray mt-0.5">
                    {new Date(d.timestamp).toLocaleString()} &middot; {d.session_id.slice(0, 8)}...
                  </div>
                </div>
              ))}
              {downloadStats.recent.length === 0 && (
                <div className="px-4 py-3 text-xs text-mediumGray text-center">No downloads yet</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-darkGray/10 rounded-md p-4">
      <div className="text-2xl font-semibold text-darkGray">{value}</div>
      <div className="text-[10px] text-mediumGray uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function VisitorTable({ items, onSelect }: { items: Visitor[]; onSelect: (v: Visitor) => void }) {
  return (
    <div className="border border-darkGray/10 rounded-md overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-darkGray/10 bg-darkGray/5">
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">Location</th>
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">Browser</th>
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">OS</th>
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">Device</th>
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">First Seen</th>
            <th className="text-left px-4 py-2 font-semibold text-darkGray uppercase tracking-wider">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {items.map((v, i) => (
            <tr
              key={i}
              onClick={() => onSelect(v)}
              className="border-b border-darkGray/5 last:border-0 hover:bg-accent/5 cursor-pointer transition-colors"
            >
              <td className="px-4 py-2 text-darkGray">
                {v.city && v.city !== "Unknown" ? `${v.city}, ` : ""}{v.country || "Unknown"}
              </td>
              <td className="px-4 py-2 text-mediumGray">{v.browser}</td>
              <td className="px-4 py-2 text-mediumGray">{v.os}</td>
              <td className="px-4 py-2 text-mediumGray">{v.device}</td>
              <td className="px-4 py-2 text-mediumGray">{new Date(v.first_seen).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-mediumGray">{new Date(v.last_seen).toLocaleString()}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-6 text-center text-mediumGray">No visitors yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function VisitorDetailView({ detail }: { detail: VisitorDetail }) {
  const { visitor, pageViews, downloads } = detail;

  return (
    <div>
      {/* Visitor Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <InfoItem label="IP" value={visitor.ip} />
        <InfoItem label="Location" value={`${visitor.city || "?"}, ${visitor.region || "?"}, ${visitor.country || "?"}`} />
        <InfoItem label="Browser" value={visitor.browser} />
        <InfoItem label="OS" value={visitor.os} />
        <InfoItem label="Device" value={visitor.device} />
        <InfoItem label="Referrer" value={visitor.referrer || "Direct"} />
        <InfoItem label="First Seen" value={new Date(visitor.first_seen).toLocaleString()} />
        <InfoItem label="Last Seen" value={new Date(visitor.last_seen).toLocaleString()} />
      </div>

      {/* Page Views Timeline */}
      <h3 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">
        Pages Visited ({pageViews.length})
      </h3>
      <div className="border border-darkGray/10 rounded-md overflow-hidden mb-6">
        {pageViews.map((pv, i) => (
          <div key={i} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
            <span className="text-darkGray">{pv.path}</span>
            <span className="text-mediumGray">{new Date(pv.timestamp).toLocaleString()}</span>
          </div>
        ))}
        {pageViews.length === 0 && (
          <div className="px-4 py-3 text-xs text-mediumGray text-center">No page views recorded</div>
        )}
      </div>

      {/* Downloads */}
      <h3 className="text-xs font-semibold text-darkGray uppercase tracking-wider mb-3">
        Downloads ({downloads.length})
      </h3>
      <div className="border border-darkGray/10 rounded-md overflow-hidden">
        {downloads.map((dl, i) => (
          <div key={i} className="flex justify-between px-4 py-2 text-xs border-b border-darkGray/5 last:border-0">
            <span className="text-darkGray">{dl.file_name}</span>
            <span className="text-mediumGray">{new Date(dl.timestamp).toLocaleString()}</span>
          </div>
        ))}
        {downloads.length === 0 && (
          <div className="px-4 py-3 text-xs text-mediumGray text-center">No downloads</div>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-darkGray/10 rounded-md p-3">
      <div className="text-[10px] text-mediumGray uppercase tracking-wider">{label}</div>
      <div className="text-xs text-darkGray mt-0.5 break-all">{value}</div>
    </div>
  );
}
