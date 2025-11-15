import { NextResponse } from "next/server";
import "dotenv/config";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
    console.log("Cron job");

    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    revalidateTag("coins", "max");

    return NextResponse.json({ success: true, message: "Cron complete" });
}
