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

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL environment variable is not defined");
}

export const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis connection error:", err));


