import type { Metadata } from "next";
import Link from "next/link";
import LoginButton from "@/src/components/page/login-button";
import LogoutButton from "@/src/components/page/buttons/logout-button";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Atrais Lats",
    icons: {
        icon: "../public/logo1.png",
        apple: "../public/logo1.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="h-16 px-4 bg-background2 sticky top-0 z-50 shadow-md">
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
                                        Sākumlapa
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites">
                                    <div
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "border-border2"
                                        )}
                                    >
                                        Favorīti
                                    </div>
                                </Link>
                            </li>
                            <li>
                                {true && <LoginButton />}
                                {false && <LogoutButton />}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="h-fit min-h-[calc(100vh-64px)] shadow-2xl max-w-7xl mx-auto">
                <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </div>
        </>
    );
}
