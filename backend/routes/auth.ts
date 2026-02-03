import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "default-secret-change-me";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

function signToken(payload: string): string {
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET);
  hmac.update(payload);
  return payload + "." + hmac.digest("hex");
}

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length < 2) return false;
  const signature = parts.pop()!;
  const payload = parts.join(".");
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET);
  hmac.update(payload);
  return hmac.digest("hex") === signature;
}

export function isAuthenticated(request: FastifyRequest): boolean {
  const token = (request.cookies as Record<string, string>).admin_token;
  if (!token) return false;
  return verifyToken(token);
}

export function registerAuthRoutes(server: FastifyInstance) {
  // Login
  server.post("/api/auth/login", {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: "1 minute",
      },
    },
  }, async (request, reply) => {
    const body = request.body as { password?: string };
    const password = body?.password;

    if (!password || !ADMIN_PASSWORD_HASH) {
      reply.status(401);
      return { error: "Invalid credentials" };
    }

    const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!valid) {
      reply.status(401);
      return { error: "Invalid credentials" };
    }

    // Create signed token with expiry
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24h
    const token = signToken(`admin:${expiry}`);

    reply.setCookie("admin_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24h
    });

    return { ok: true };
  });

  // Logout
  server.post("/api/auth/logout", async (request, reply) => {
    reply.clearCookie("admin_token", { path: "/" });
    return { ok: true };
  });

  // Check auth status
  server.get("/api/auth/check", async (request) => {
    return { authenticated: isAuthenticated(request) };
  });
}
