import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import "dotenv/config";
import { Users } from "./dao/users";

const authHandler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) (session.user as any).id = token.uid;
            return session;
        },
        jwt: async ({ token, account }) => {
            const user = await Users.findByOAuth(account?.provider!, account?.userId!);
            if (user) token.uid = user.id;
            return token;
        },
        signIn: async ({ user, account }) => {
            if (!account) return false;

            const exists = true;
            console.log(await Users.existsByOAuth(account.provider, user.id));

            console.log(account.provider, user.id);

            if (!exists && account) {
                let success = true;

                await Users.createOAuthUser({
                    provider: account.provider,
                    providerUserId: user.id,
                    name: user.name || `user:${user.id}`,
                    email: user.email || undefined,
                });

                return success;
            }

            console.log(exists);

            return !!exists;
        },
    },
    session: {
        strategy: "jwt",
    },
});

export default authHandler;
