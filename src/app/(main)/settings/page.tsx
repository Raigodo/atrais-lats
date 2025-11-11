import { PrismaClient } from "@/generated/prisma/client";
import { ModalKeys } from "@/src/components/dialogs/modal-keys";
import { useModalManager } from "@/src/components/dialogs/modal-manager-context-provider";

const prisma = new PrismaClient();

async function Page() {
    // await prisma.user.create({
    //     data: {
    //         name: "Alice",
    //         email: "alice@prisma.io",
    //         posts: {
    //             create: { title: "Hello World" },
    //         },
    //         profile: {
    //             create: { bio: "I like turtles" },
    //         },
    //     },
    // });

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    });
    console.dir(allUsers, { depth: null });

    useModalManager().openModal({ key: ModalKeys.CREATE_FAVOTITE });

    return <div>settings</div>;
}

export default Page;
