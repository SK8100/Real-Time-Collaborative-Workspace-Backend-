import { createClient } from "ioredis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect();

// 👇 ADD THIS EXPORT
export const redisConnection = {
  host: "localhost",
  port: 6379,
};




