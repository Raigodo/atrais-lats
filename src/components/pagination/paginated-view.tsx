"use server";

import { ReactNode } from "react";
import Pagination from "./pagination";
import { redirect } from "next/navigation";

async function PaginatedView({
    children,
    path,
    currentPage,
    totalItemCount,
    itemsPerPage = 5,
}: {
    children: ReactNode;
    path: string;
    currentPage: number;
    totalItemCount: number;
    itemsPerPage?: number;
}) {
    const lastPage = Math.ceil(totalItemCount / itemsPerPage);

    if (lastPage < currentPage) {
        return redirect(generatePageUrl(path, lastPage));
    }

    return (
        <div>
            {children}
            <Pagination
                currentPage={currentPage}
                generatePageUrl={(page: number) => generatePageUrl(path, page)}
                slidingWindow={getPageWindow(currentPage, lastPage, itemsPerPage)}
                lastPage={lastPage}
            />
        </div>
    );
}

export default PaginatedView;

function generatePageUrl(localUrl: string, page: number) {
    const url = new URL(localUrl, "http://dummy");
    url.searchParams.set("page", page.toString());

    return url.pathname + url.search;
}

function getPageWindow(currentPage: number, lastPage: number, windowSize = 5) {
    // current page should be at index 1 (second position)
    let start = currentPage - 1;
    let end = start + windowSize - 1;

    // If window goes past lastPage, shift it left
    if (end > lastPage) {
        end = lastPage;
        start = Math.max(1, end - windowSize + 1);
    }

    // If start is before page 1, clamp it
    start = Math.max(1, start);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
}
