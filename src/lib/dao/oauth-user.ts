import { cacheTag, revalidateTag } from "next/cache";
import { ulid } from "ulid";
import { prisma } from "../clients/prisma";

export const OAuthUsers = {
    exists: async (provider: string, providerUserId: string) => {
        "use cache";
        cacheTag("users");
        cacheTag(`users:${provider}_${providerUserId}`);

        return prisma.oAuthUsers
            .findFirst({
                where: { provider, providerUserId },
                include: { user: true },
            })
            .then((value) => !!value?.user);
    },

    find: async (provider: string, providerUserId: string) => {
        "use cache";
        cacheTag("users");
        cacheTag(`users:${provider}_${providerUserId}`);

        return prisma.oAuthUsers
            .findFirst({
                where: { provider, providerUserId },
                include: { user: true },
            })
            .then((value) => value?.user);
    },

    create: async ({
        provider,
        providerUserId,
        name,
        email,
    }: {
        provider: string;
        providerUserId: string;
        name: string;
        email?: string;
    }) => {
        const userId = ulid();
        return prisma
            .$transaction([
                prisma.user.create({ data: { id: userId, name, email } }),
                prisma.oAuthUsers.create({ data: { provider, providerUserId, userId } }),
            ])
            .then((result: any) => {
                revalidateTag("users", "max");
                return result;
            });
    },
};
