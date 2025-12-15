import { JobQueue } from "./job-queue";

export const NotifyFavoriteJobQueue = {
    enqueue: async (data: NotifyFavoriteJob) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));

        await JobQueue.publish({
            url: "http://localhost:3000/api/notify/favorite",
            body: formData,
        });
    },
};

export type NotifyFavoriteJob = {
    symbol: string;
    userId: string;
    message: string;
};
