import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}

export default Layout;
