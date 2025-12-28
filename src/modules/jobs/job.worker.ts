import { Worker } from "bullmq";
import { redisClient } from "../../config/redis";
import { client } from "../../config/dbConnect";

new Worker(
  "jobs",
  async (job) => {
    try {
      // Mark job as PROCESSING (idempotent)
      await client.query(
        `
        INSERT INTO jobs (id, status)
        VALUES ($1, 'PROCESSING')
        ON CONFLICT (id)
        DO UPDATE SET status = 'PROCESSING'
        `,
        [job.id]
      );

      // Simulate heavy work
      await new Promise((res) => setTimeout(res, 2000));

      // Mark job as COMPLETED
      await client.query(
        `
        UPDATE jobs
        SET status = 'COMPLETED',
            result = $2
        WHERE id = $1
        `,
        [job.id, JSON.stringify(job.data)]
      );

      return { success: true };
    } catch (error) {
      // Mark job as FAILED
      await client.query(
        `
        UPDATE jobs
        SET status = 'FAILED',
            result = $2
        WHERE id = $1
        `,
        [job.id, JSON.stringify({ error: (error as Error).message })]
      );

      throw error; // BullMQ will retry
    }
  },
  {
    connection: redisClient,
    concurrency: 5,
  }
);
