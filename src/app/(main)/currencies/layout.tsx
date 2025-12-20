import IntervalRefresh from "@/src/components/interval-refresh";
import { ReactNode, Suspense } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <IntervalRefresh interval={1000 * 60 * 5}>
            <Suspense>{children}</Suspense>
        </IntervalRefresh>
    );
}

export default Layout;
