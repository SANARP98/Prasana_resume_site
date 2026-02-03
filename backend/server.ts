import Fastify from "fastify";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import { connectDB, closeDB } from "./db";
import { registerTrackingRoutes } from "./routes/tracking";
import { registerAuthRoutes } from "./routes/auth";
import { registerDashboardRoutes } from "./routes/dashboard";

const server = Fastify({ logger: true });

async function start() {
  // Register plugins
  await server.register(cookie, {
    secret: process.env.ADMIN_SECRET || "default-secret-change-me",
  });

  await server.register(rateLimit, {
    global: false,
  });

  // Connect to MongoDB
  await connectDB();

  // Register routes
  registerTrackingRoutes(server);
  registerAuthRoutes(server);
  registerDashboardRoutes(server);

  // Health check
  server.get("/api/health", async () => ({ status: "ok" }));

  // Start server
  const port = parseInt(process.env.PORT || "3001");
  await server.listen({ port, host: "0.0.0.0" });
  console.log(`Analytics backend running on port ${port}`);
}

// Graceful shutdown
const shutdown = async () => {
  await server.close();
  await closeDB();
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
