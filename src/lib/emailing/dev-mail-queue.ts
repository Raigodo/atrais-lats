import { NotiffyJob, JobQueueProvider } from ".";
import "dotenv/config";
import { prisma } from "../clients/prisma";

const queue: NotiffyJob[] = [];

async function processJob(job: NotiffyJob) {
    await prisma.favoriteCryptoCoin.update({
        where: { symbol_userId: { symbol: job.symbol, userId: job.userId } },
        data: { notifiedAt: new Date() },
    });
    console.log("[LOCAL QUEUE] Sending email →", job.userId, job.message);
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
