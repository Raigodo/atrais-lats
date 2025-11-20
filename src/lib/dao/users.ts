import { cacheTag, revalidateTag } from "next/cache";
import { PrismaClient } from "@/generated/prisma/client";
import { ulid } from "ulid";

const prisma = new PrismaClient();

export const Users = {
    exists: async (id: string) => {
        "use cache";
        cacheTag("users");
        cacheTag(`users:${id}`);

        return prisma.user.findUnique({ where: { id } }).then((value) => !!value);
    },
    existsByOAuth: async (provider: string, providerUserId: string) => {
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
    findByOAuth: async (provider: string, providerUserId: string) => {
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
    create: async ({ name, email }: { name: string; email?: string }) => {
        return prisma.user.create({ data: { id: ulid(), name, email } }).then((result) => {
            revalidateTag("users", "max");
            return result;
        });
    },
    createOAuthUser: async ({
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
            .then((result) => {
                revalidateTag("users", "max");
                return result;
            });
    },
};
