// Local MongoDB connection. Reads MONGODB_URI from the runtime environment.
// On YOUR server (where you'll ship this), set:
//   MONGODB_URI=mongodb://localhost:27017
//   MONGODB_DB=vishra
// Default falls back to a local mongod on the standard port + "vishra" db.
//
// NOTE: This will NOT work inside the Lovable preview — the preview runs on
// Cloudflare's edge runtime and cannot reach your machine's localhost. It is
// designed to start working the moment you deploy this code to your own server
// (where Node.js + local mongod are reachable).

import { MongoClient, type Db } from "mongodb";

const URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";
const DB_NAME = process.env.MONGODB_DB ?? "vishra";

// Reuse a single client across hot reloads / serverless warm starts.
declare global {
  // eslint-disable-next-line no-var
  var __vishraMongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var __vishraMongoConnect: Promise<MongoClient> | undefined;
}

function getClient(): Promise<MongoClient> {
  if (globalThis.__vishraMongoConnect) return globalThis.__vishraMongoConnect;
  const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 5000,
  });
  globalThis.__vishraMongoClient = client;
  globalThis.__vishraMongoConnect = client.connect();
  return globalThis.__vishraMongoConnect;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(DB_NAME);
}
