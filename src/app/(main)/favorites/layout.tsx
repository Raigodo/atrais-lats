import IntervalRefresh from "@/src/components/interval-refresh";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return <IntervalRefresh interval={1000 * 60 * 5}>{children}</IntervalRefresh>;
}

export default Layout;
