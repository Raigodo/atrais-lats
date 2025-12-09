import { getServerSession } from "next-auth";
import { Users } from "../dao/users";

export async function getServerUserId() {
    const session = await getServerSession();
    return session?.user.email!;
}

export async function getServerUser() {
    const session = await getServerSession();
    return Users.findById(session?.user.email!);
}
