import { ReactNode } from "react";
import "./globals.css";

function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-background">{children}</body>
        </html>
    );
}

export default Layout;
