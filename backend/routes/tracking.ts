import { FastifyInstance } from "fastify";
import { visitors, pageViews, downloads, geoCache } from "../db";
import crypto from "crypto";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  // Browser detection
  if (ua.includes("Firefox/")) browser = "Firefox " + (ua.match(/Firefox\/(\d+)/)?.[1] || "");
  else if (ua.includes("Edg/")) browser = "Edge " + (ua.match(/Edg\/(\d+)/)?.[1] || "");
  else if (ua.includes("Chrome/")) browser = "Chrome " + (ua.match(/Chrome\/(\d+)/)?.[1] || "");
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari " + (ua.match(/Version\/(\d+)/)?.[1] || "");

  // OS detection
  if (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS " + (ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace(/_/g, ".") || "");
  else if (ua.includes("Android")) os = "Android " + (ua.match(/Android (\d+)/)?.[1] || "");
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS " + (ua.match(/OS (\d+)/)?.[1] || "");
  else if (ua.includes("Linux")) os = "Linux";

  // Device detection
  if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

  return { browser: browser.trim(), os: os.trim(), device };
}

async function getGeoData(ip: string) {
  // Skip private/local IPs
  if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
    return { city: "Local", region: "Local", country: "Local", lat: 0, lon: 0, isp: "Local" };
  }

  // Check cache first
  const cached = await geoCache().findOne({ ip });
  if (cached) return cached.data;

  // Fetch from ip-api.com (free, no key needed, 45 req/min)
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=city,regionName,country,lat,lon,isp,status`);
    const data = await res.json() as { status: string; city?: string; regionName?: string; country?: string; lat?: number; lon?: number; isp?: string };

    if (data.status === "success") {
      const geo = {
        city: data.city || "Unknown",
        region: data.regionName || "Unknown",
        country: data.country || "Unknown",
        lat: data.lat || 0,
        lon: data.lon || 0,
        isp: data.isp || "Unknown",
      };

      // Cache the result
      await geoCache().updateOne(
        { ip },
        { $set: { ip, data: geo, cached_at: new Date() } },
        { upsert: true }
      );

      return geo;
    }
  } catch (err) {
    console.error("Geo lookup failed for", ip, err);
  }

  return { city: "Unknown", region: "Unknown", country: "Unknown", lat: 0, lon: 0, isp: "Unknown" };
}

export function registerTrackingRoutes(server: FastifyInstance) {
  // Track page view
  server.post("/api/track", async (request, reply) => {
    try {
      const body = typeof request.body === "string" ? JSON.parse(request.body) : (request.body || {});
      const { path, title, referrer } = body as { path?: string; title?: string; referrer?: string };

      // Get or create session ID
      let sessionId = (request.cookies as Record<string, string>).session_id;
      if (!sessionId) {
        sessionId = crypto.randomUUID();
      }

      const ip = (request.headers["x-real-ip"] as string) ||
                 (request.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
                 request.ip;

      const userAgent = request.headers["user-agent"] || "";
      const { browser, os, device } = parseUserAgent(userAgent);
      const geo = await getGeoData(ip);

      // Upsert visitor
      await visitors().updateOne(
        { session_id: sessionId },
        {
          $set: {
            ip,
            city: geo.city,
            region: geo.region,
            country: geo.country,
            lat: geo.lat,
            lon: geo.lon,
            isp: geo.isp,
            user_agent: userAgent,
            browser,
            os,
            device,
            last_seen: new Date(),
          },
          $setOnInsert: {
            session_id: sessionId,
            referrer: referrer || "",
            first_seen: new Date(),
          },
        },
        { upsert: true }
      );

      // Insert page view
      if (path) {
        await pageViews().insertOne({
          session_id: sessionId,
          path,
          title: title || "",
          timestamp: new Date(),
        });
      }

      reply.setCookie("session_id", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60, // 1 year
      });

      return { ok: true };
    } catch (err) {
      console.error("Track error:", err);
      return { ok: false };
    }
  });

  // Track download
  server.post("/api/track/download", async (request, reply) => {
    try {
      const body = typeof request.body === "string" ? JSON.parse(request.body) : (request.body || {});
      const { file_name, file_path } = body as { file_name?: string; file_path?: string };
      const sessionId = (request.cookies as Record<string, string>).session_id;

      if (sessionId && file_name) {
        await downloads().insertOne({
          session_id: sessionId,
          file_name: file_name || "",
          file_path: file_path || "",
          timestamp: new Date(),
        });
      }

      return { ok: true };
    } catch (err) {
      console.error("Download track error:", err);
      return { ok: false };
    }
  });
}
