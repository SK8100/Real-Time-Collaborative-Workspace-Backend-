import { jobQueue } from "./job.queue";

export const createJob = async (req: any, res: any) => {
  const payload = req.body;

  const job = await jobQueue.add(
    "code-execution",
    payload,
    {
      jobId: payload.requestId, // 🔥 Idempotency
    }
  );

  res.status(202).json({
    jobId: job.id,
    status: "QUEUED",
  });
};
