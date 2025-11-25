import { cacheTag, revalidateTag } from "next/cache";
import { ulid } from "ulid";
import { prisma } from "../clients/prisma";

export const Users = {
    exists: async (id: string) => {
        "use cache";
        cacheTag("users");
        cacheTag(`users:${id}`);

        return prisma.user.findUnique({ where: { id } }).then((value) => !!value);
    },

    create: async ({ name, email }: { name: string; email?: string }) => {
        return prisma.user.create({ data: { id: ulid(), name, email } }).then((result) => {
            revalidateTag("users", "max");
            return result;
        });
    },
};
