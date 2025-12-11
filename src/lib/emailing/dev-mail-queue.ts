import { NotiffyJob, JobQueueProvider } from ".";
import "dotenv/config";

const queue: NotiffyJob[] = [];

async function processJob(job: NotiffyJob) {
    console.log("[LOCAL QUEUE] Sending email →", job.userId, job.message);
    await new Promise((r) => setTimeout(r, 500));
}

export const LocalQueue: JobQueueProvider = {
    async enqueue(job: NotiffyJob) {
        queue.push(job);
        console.log("[LOCAL QUEUE] Job added:", job);
    },
};

setInterval(async () => {
    const job = queue.shift();
    if (job) await processJob(job);
}, 1000);
