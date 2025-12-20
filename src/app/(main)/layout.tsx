"use server";

import Link from "next/link";
import LoginButton from "@/src/components/buttons/login-button";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import MySessionProvider from "@/src/components/my-session-provider";
import { ReactNode, Suspense } from "react";
import ModalManagerContextProvider from "@/src/components/dialogs/modal-manager-context-provider";
import LogoutButton from "@/src/components/buttons/logout-button";
import { getServerSession } from "next-auth";

async function Layout({ children }: { children: ReactNode }) {
    return (
        <MySessionProvider>
            <ModalManagerContextProvider>
                <header className="h-16 px-4 bg-background2 sticky top-0 z-50 shadow-md">
                    <Suspense>
                        <RootLayoutHeader />
                    </Suspense>
                </header>
                <div className="h-fit min-h-[calc(100vh-64px)] shadow-2xl max-w-7xl mx-auto">
                    <Suspense>{children}</Suspense>
                </div>
            </ModalManagerContextProvider>
        </MySessionProvider>
    );
}

export default Layout;

async function RootLayoutHeader() {
    const session = await getServerSession();

    return (
        <div className="grid h-full max-w-7xl mx-auto items-center grid-cols-[auto_1fr]">
            <Link href="/currencies">
                <img className="h-16 py-2" src="/logo1.png" alt="atrais lats" />
            </Link>
            <nav className="grow justify-self-end">
                <ul className="flex gap-2">
                    <li>
                        <Link href="/currencies">
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "border-border2"
                                )}
                            >
                                Homepage
                            </div>
                        </Link>
                    </li>
                    {session && (
                        <li>
                            <Link href="/favorites">
                                <div
                                    className={cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "border-border2"
                                    )}
                                >
                                    Favorites
                                </div>
                            </Link>
                        </li>
                    )}
                    <li>{!session && <LoginButton />}</li>
                    <li>{session && <LogoutButton />}</li>
                </ul>
            </nav>
        </div>
    );
}
