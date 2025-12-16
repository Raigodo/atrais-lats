"use client";

import { useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect } from "react";

function IntervalRefresh({ children, interval }: { children: ReactNode; interval: number }) {
    const router = useRouter();

    useEffect(() => {
        const intervalId = setInterval(() => {
            router.refresh();
        }, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [router, interval]);

    return <Suspense>{children}</Suspense>;
}

export default IntervalRefresh;
