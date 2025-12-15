import { MailerClient } from "@/src/lib/clients/mailer";
import { NotifyFavoriteJob } from "@/src/lib/clients/notify-favorite-job-queue";
import { prisma } from "@/src/lib/clients/prisma";
import { Users } from "@/src/lib/dao/users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as NotifyFavoriteJob;

    const receivingUser = await Users.findById(data.userId);

    if (!receivingUser || !receivingUser.email) throw Error("User can not be notified");

    const ok = await MailerClient.send(receivingUser!.email!, "Crypto Alert!", data.message);

    if (!ok) throw Error("User can not be notified");

    await prisma.favoriteCryptoCoin.update({
        where: { symbol_userId: { symbol: data.symbol, userId: data.userId } },
        data: { notifiedAt: new Date() },
    });

    return new NextResponse();
}
