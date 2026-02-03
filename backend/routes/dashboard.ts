import { FastifyInstance } from "fastify";
import { visitors, pageViews, downloads } from "../db";
import { isAuthenticated } from "./auth";

function authGuard(server: FastifyInstance) {
  server.addHook("onRequest", async (request, reply) => {
    if (!isAuthenticated(request)) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });
}

export function registerDashboardRoutes(server: FastifyInstance) {
  server.register(async (instance) => {
    authGuard(instance);

    // Summary stats
    instance.get("/api/dashboard/summary", async () => {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart);
      weekStart.setDate(weekStart.getDate() - 7);
      const monthStart = new Date(todayStart);
      monthStart.setDate(monthStart.getDate() - 30);

      const [
        totalVisitors,
        totalPageViews,
        totalDownloads,
        visitorsToday,
        visitorsWeek,
        visitorsMonth,
        topPages,
        topDownloads,
        recentVisitors,
      ] = await Promise.all([
        visitors().countDocuments(),
        pageViews().countDocuments(),
        downloads().countDocuments(),
        visitors().countDocuments({ first_seen: { $gte: todayStart } }),
        visitors().countDocuments({ first_seen: { $gte: weekStart } }),
        visitors().countDocuments({ first_seen: { $gte: monthStart } }),
        pageViews().aggregate([
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]).toArray(),
        downloads().aggregate([
          { $group: { _id: "$file_name", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]).toArray(),
        visitors()
          .find()
          .sort({ last_seen: -1 })
          .limit(5)
          .toArray(),
      ]);

      return {
        totalVisitors,
        totalPageViews,
        totalDownloads,
        visitorsToday,
        visitorsWeek,
        visitorsMonth,
        topPages: topPages.map((p) => ({ path: p._id, count: p.count })),
        topDownloads: topDownloads.map((d) => ({ file: d._id, count: d.count })),
        recentVisitors,
      };
    });

    // Paginated visitor list
    instance.get("/api/dashboard/visitors", async (request) => {
      const query = request.query as { page?: string; limit?: string; sort?: string };
      const page = Math.max(1, parseInt(query.page || "1"));
      const limit = Math.min(100, Math.max(1, parseInt(query.limit || "50")));
      const sortField = query.sort || "last_seen";
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        visitors()
          .find()
          .sort({ [sortField]: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        visitors().countDocuments(),
      ]);

      return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
    });

    // Single visitor detail with page views and downloads
    instance.get("/api/dashboard/visitors/:sessionId", async (request) => {
      const { sessionId } = request.params as { sessionId: string };

      const [visitor, views, dls] = await Promise.all([
        visitors().findOne({ session_id: sessionId }),
        pageViews()
          .find({ session_id: sessionId })
          .sort({ timestamp: -1 })
          .toArray(),
        downloads()
          .find({ session_id: sessionId })
          .sort({ timestamp: -1 })
          .toArray(),
      ]);

      if (!visitor) {
        return { error: "Visitor not found" };
      }

      return { visitor, pageViews: views, downloads: dls };
    });

    // Geo breakdown
    instance.get("/api/dashboard/geo", async () => {
      const byCountry = await visitors().aggregate([
        { $group: { _id: { country: "$country", city: "$city" }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).toArray();

      // Group by country
      const countries: Record<string, { total: number; cities: { city: string; count: number }[] }> = {};
      for (const item of byCountry) {
        const country = item._id.country || "Unknown";
        const city = item._id.city || "Unknown";
        if (!countries[country]) {
          countries[country] = { total: 0, cities: [] };
        }
        countries[country].total += item.count;
        countries[country].cities.push({ city, count: item.count });
      }

      return Object.entries(countries)
        .map(([country, data]) => ({ country, ...data }))
        .sort((a, b) => b.total - a.total);
    });

    // Download stats
    instance.get("/api/dashboard/downloads", async () => {
      const stats = await downloads().aggregate([
        {
          $group: {
            _id: "$file_name",
            count: { $sum: 1 },
            last_downloaded: { $max: "$timestamp" },
          },
        },
        { $sort: { count: -1 } },
      ]).toArray();

      const recent = await downloads()
        .find()
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray();

      return { stats, recent };
    });
  });
}
