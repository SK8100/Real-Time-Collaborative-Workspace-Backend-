// import { createClient } from "ioredis";

// export const redisClient = createClient({
//   url: process.env.REDIS_URL,
// });

// redisClient.connect();

// // 👇 ADD THIS EXPORT
// export const redisConnection = {
//   host: "localhost",
//   port: 6379,
// };

import Redis from "ioredis";

// Ensure REDIS_URL is defined
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not defined");
}

// Create Redis client
export const redisClient = new Redis(process.env.REDIS_URL);

// Log when connected
redisClient.on("connect", () => console.log("Redis connected"));

// Catch errors properly
redisClient.on("error", (err) => console.error("Redis connection error:", err));




