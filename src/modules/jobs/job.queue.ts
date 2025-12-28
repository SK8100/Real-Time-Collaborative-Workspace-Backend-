import { Queue } from "bullmq";
import { redisClient } from "../../config/redis";

export const jobQueue = new Queue("jobs", {
  connection: redisConnection,

  defaultJobOptions: {
    attempts: 3,              // Retry failed jobs
    backoff: {
      type: "exponential",
      delay: 2000,            // 2s, 4s, 8s
    },
    removeOnComplete: false,  // Keep for audit
    removeOnFail: false,
  },
});
