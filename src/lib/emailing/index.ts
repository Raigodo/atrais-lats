import { LocalQueue } from "./dev-mail-queue";

export interface NotiffyJob {
    symbol: string;
    userId: string;
    message: any;
}

export interface JobQueueProvider {
    enqueue(job: NotiffyJob): Promise<void>;
}

export function getNNotiffyQueue() {
    return LocalQueue;
}
