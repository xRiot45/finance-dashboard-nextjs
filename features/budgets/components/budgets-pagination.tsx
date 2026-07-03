"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/components/ui/pagination"
import { formatNumber } from "@/shared/utils"

type BudgetsPaginationProps = {
    currentPage: number
    onPageChange: (page: number) => void
    pageCount: number
    totalCount: number
}

export function BudgetsPagination({ currentPage, onPageChange, pageCount, totalCount }: BudgetsPaginationProps) {
    const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
        (page) => page === 1 || page === pageCount || Math.abs(page - currentPage) <= 1
    )

    return (
        <div className="flex flex-col gap-3 border-t border-border/70 pt-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">{formatNumber(totalCount)} budgets</p>
            <Pagination className="mx-0 w-auto justify-start md:justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            aria-disabled={currentPage === 1}
                            href="#"
                            onClick={(event) => {
                                event.preventDefault()
                                onPageChange(Math.max(1, currentPage - 1))
                            }}
                        />
                    </PaginationItem>
                    {pages.map((page, index) => {
                        const previousPage = pages[index - 1]
                        const shouldShowEllipsis = previousPage && page - previousPage > 1

                        return (
                            <PaginationItem key={page}>
                                {shouldShowEllipsis ? <PaginationEllipsis /> : null}
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        onPageChange(page)
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={currentPage === pageCount}
                            href="#"
                            onClick={(event) => {
                                event.preventDefault()
                                onPageChange(Math.min(pageCount, currentPage + 1))
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
