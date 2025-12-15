import { NotifyFavoriteJob } from "@/src/lib/clients/notify-favorite-job-queue";
import { prisma } from "@/src/lib/clients/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as NotifyFavoriteJob;

    await prisma.favoriteCryptoCoin.update({
        where: { symbol_userId: { symbol: data.symbol, userId: data.userId } },
        data: { notifiedAt: new Date() },
    });
    console.log("[LOCAL QUEUE] Sending email →", data.userId, data.message);

    return new NextResponse();
}
