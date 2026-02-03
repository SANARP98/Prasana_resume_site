import { MongoClient, Db, Collection } from "mongodb";

let client: MongoClient;
let db: Db;

export interface Visitor {
  session_id: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lon?: number;
  isp?: string;
  user_agent: string;
  browser: string;
  os: string;
  device: string;
  referrer?: string;
  first_seen: Date;
  last_seen: Date;
}

export interface PageView {
  session_id: string;
  path: string;
  title?: string;
  timestamp: Date;
}

export interface Download {
  session_id: string;
  file_name: string;
  file_path: string;
  timestamp: Date;
}

export interface GeoCache {
  ip: string;
  data: {
    city: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    isp: string;
  };
  cached_at: Date;
}

export async function connectDB(): Promise<Db> {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "portfolio_analytics";

  if (!uri) {
    throw new Error("MONGO_URI environment variable is required");
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  // Create indexes
  await db.collection("visitors").createIndex({ session_id: 1 }, { unique: true });
  await db.collection("visitors").createIndex({ first_seen: -1 });
  await db.collection("visitors").createIndex({ ip: 1 });
  await db.collection("page_views").createIndex({ session_id: 1 });
  await db.collection("page_views").createIndex({ timestamp: -1 });
  await db.collection("downloads").createIndex({ session_id: 1 });
  await db.collection("downloads").createIndex({ timestamp: -1 });
  await db.collection("geo_cache").createIndex({ ip: 1 }, { unique: true });
  await db.collection("geo_cache").createIndex(
    { cached_at: 1 },
    { expireAfterSeconds: 86400 } // TTL: 24 hours
  );

  console.log(`Connected to MongoDB: ${dbName}`);
  return db;
}

export function getDB(): Db {
  return db;
}

export function visitors(): Collection<Visitor> {
  return db.collection<Visitor>("visitors");
}

export function pageViews(): Collection<PageView> {
  return db.collection<PageView>("page_views");
}

export function downloads(): Collection<Download> {
  return db.collection<Download>("downloads");
}

export function geoCache(): Collection<GeoCache> {
  return db.collection<GeoCache>("geo_cache");
}

export async function closeDB(): Promise<void> {
  if (client) await client.close();
}
