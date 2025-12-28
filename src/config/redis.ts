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

// Create Redis client using the environment variable
export const redisClient = new Redis(process.env.REDIS_URL);

// Log when connected
redisClient.on("connect", () => console.log("Redis connected"));

// Handle errors properly
redisClient.on("error", (err) => console.error("Redis connection error:", err));

