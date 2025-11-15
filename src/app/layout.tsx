import { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Atrais Lats",
    icons: {
        icon: "../public/logo1.png",
        apple: "../public/logo1.png",
    },
};

async function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-background">{children}</body>
        </html>
    );
}

export default Layout;
