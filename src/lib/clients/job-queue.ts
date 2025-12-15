import "dotenv/config";
import { Client } from "@upstash/qstash";

export const JobQueue = new Client({
    token: process.env.QSTASH_TOKEN!,
});
