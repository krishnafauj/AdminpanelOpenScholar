// lib/mongodb.ts
import { MongoClient, MongoClientOptions, Db } from "mongodb";

declare global {
 
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string | undefined;
const dbName = process.env.MONGODB_DB || "Soundverse";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const options: MongoClientOptions = {
 
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;

/**
 * Convenience helper to get a connected db instance with proper types.
 */
export async function getDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { client, db };
}
