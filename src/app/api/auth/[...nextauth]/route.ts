import { OAuthUsers } from "@/src/lib/dao/oauth-user";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const hander = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        session: async ({ session, user, token }) => {
            if (session?.user) {
                (session.user as any).id = token.uid;
            }
            return session;
        },
        jwt: async ({ token, user, account, profile }) => {
            const localUser = await OAuthUsers.find(account?.provider!, account?.userId!);
            if (localUser) token.uid = localUser.id;
            token.email = localUser?.id;
            return token;
        },
        signIn: async ({ user, account, profile, email, credentials }) => {
            if (!account) return false;

            const exists = true;

            if (!exists && account) {
                let success = true;

                await OAuthUsers.create({
                    provider: account.provider,
                    providerUserId: user.id,
                    name: user.name || `user:${user.id}`,
                    email: user.email || undefined,
                });

                return success;
            }

            return !!exists;
        },
    },
});

export { hander as GET, hander as POST };

// import "dotenv/config";
// import authHandler from "@/src/lib/auth";

// export { authHandler as GET, authHandler as POST };

// app/api/auth/[...nextauth]/route.ts  (your auth file)

// export const {
//     handlers: { GET, POST },
//     auth, // ← This is your magic function
//     signIn,
//     signOut,
// } = NextAuth({
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_ID!,
//             clientSecret: process.env.GITHUB_SECRET!,
//         }),
//     ],
//     session: { strategy: "jwt" },
//     callbacks: {
//         jwt({ token, account, user }) {
//             token.xxx = 111;
//             if (account?.provider && account?.providerAccountId) {
//                 // Your DB lookup
//                 // const dbUser = await OAuthUsers.find(...);
//                 // if (dbUser) token.id = dbUser.id;
//                 token.id = 123; // For testing
//             }
//             if (user) token.id = user.id;
//             return token;
//         },
//         session({ session, token }) {
//             if (token.id) (session.user as any).id = token.id as string;
//             if (token.xxx) (session.user as any).xxx = token.xxx as number;
//             return session;
//         },
//         async signIn({ user, account }) {
//             if (!account) return false;
//             const exists = await OAuthUsers.exists(account.provider, user.id!); // Adjust to your method
//             if (!exists) {
//                 await OAuthUsers.create({
//                     provider: account.provider,
//                     providerUserId: user.id!,
//                     name: user.name || `user:${user.id}`,
//                     email: user.email ?? undefined,
//                 });
//             }
//             return true;
//         },
//     },
// });
