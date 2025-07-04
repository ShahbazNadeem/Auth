// const username = process.env.MONGODB_USERNAME
// const password = process.env.MONGODB_PASSWORD

// export const connectDB = `mongodb+srv://${username}:${password}@cluster0.frfhgzh.mongodb.net/userAuth?retryWrites=true&w=majority&appName=Cluster0`

// app/lib/db.js
import mongoose from "mongoose";
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.frfhgzh.mongodb.net/userAuth?...`;

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then(m => m);
  }
  cached.conn = cached.promise;
  return cached.conn;
}
