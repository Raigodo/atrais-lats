import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationRoot,
} from "../ui/pagination";

function Pagination({
    currentPage,
    generatePageUrl,
    slidingWindow,
    lastPage,
}: {
    currentPage: number;
    generatePageUrl: (page: number) => string;
    slidingWindow: number[];
    lastPage: number;
}) {
    return (
        <PaginationRoot>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={generatePageUrl(currentPage - 1)} />
                    </PaginationItem>
                )}
                {slidingWindow.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href={generatePageUrl(page)}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {currentPage < lastPage && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href={generatePageUrl(currentPage + 1)} />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </PaginationRoot>
    );
}

export default Pagination;
