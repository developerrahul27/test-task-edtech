import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI)
  throw new Error("Please define the MONGODB_URI environment variable");

let cached = (global as { mongoose?: { conn: unknown; promise: unknown } }).mongoose;

if (!cached) {
  cached = (global as unknown as { mongoose: { conn: unknown; promise: unknown } }).mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached?.conn) {
    return cached.conn;
  }
  if (!cached?.promise) {
    const opts = { bufferCommands: false } as mongoose.ConnectOptions;
    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m.connection);
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
