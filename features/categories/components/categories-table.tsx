"use client"

import { ArchiveIcon, CopyIcon, EyeIcon, FilePenLineIcon, MoreHorizontalIcon, TagsIcon } from "lucide-react"

import { CategoryBadge } from "@/features/categories/components/category-badge"
import { CategoryStatusBadge } from "@/features/categories/components/category-status-badge"
import { CategoryTypeBadge } from "@/features/categories/components/category-type-badge"
import type { CategoryTableRow } from "@/features/categories/utils/category-view-models"
import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components/ui/empty"
import { Progress } from "@/shared/components/ui/progress"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { formatCurrency, formatDate, formatNumber, formatPercentage } from "@/shared/utils"

type CategoriesTableProps = {
    isLoading?: boolean
    onArchiveCategory: (category: CategoryTableRow) => void
    onEditCategory: (category: CategoryTableRow) => void
    onViewCategory: (category: CategoryTableRow) => void
    rows: CategoryTableRow[]
}

export function CategoriesTable({
    isLoading = false,
    onArchiveCategory,
    onEditCategory,
    onViewCategory,
    rows,
}: CategoriesTableProps) {
    if (isLoading) {
        return <CategoriesTableLoadingState />
    }

    if (rows.length === 0) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <TagsIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No matching categories</EmptyTitle>
                    <EmptyDescription>
                        Try another keyword, category type, or status to bring category records back into view.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>New categories can still be created from the primary action above.</p>
                </EmptyContent>
            </Empty>
        )
    }

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden lg:table-cell">Parent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden xl:table-cell">Usage</TableHead>
                            <TableHead className="text-right">Approved amount</TableHead>
                            <TableHead className="w-12 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((category) => (
                            <TableRow
                                className="cursor-pointer"
                                key={category.id}
                                onClick={() => onViewCategory(category)}
                            >
                                <TableCell>
                                    <div className="flex min-w-56 flex-col gap-1">
                                        <CategoryBadge category={category} />
                                        <span className="font-mono text-xs text-muted-foreground">{category.id}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <CategoryTypeBadge type={category.type} />
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground lg:table-cell">
                                    <span className="block max-w-44 truncate">{category.parentName}</span>
                                </TableCell>
                                <TableCell>
                                    <CategoryStatusBadge status={category.status} />
                                </TableCell>
                                <TableCell className="hidden xl:table-cell">
                                    <div className="flex min-w-36 flex-col gap-2">
                                        <Progress value={category.usageWeightPercentage} />
                                        <span className="text-xs text-muted-foreground">
                                            {formatPercentage(category.usageWeightPercentage / 100)} /{" "}
                                            {formatNumber(category.directTransactionCount)} transactions
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-mono font-medium">
                                    {formatCurrency(category.approvedUsageAmount)}
                                </TableCell>
                                <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                                    <CategoryRowActions
                                        category={category}
                                        onArchive={() => onArchiveCategory(category)}
                                        onEdit={() => onEditCategory(category)}
                                        onView={() => onViewCategory(category)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {rows.map((category) => (
                    <button
                        className="rounded-3xl border border-border/70 bg-muted/20 p-4 text-left transition-colors hover:bg-muted/40"
                        key={category.id}
                        onClick={() => onViewCategory(category)}
                        type="button"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <CategoryBadge category={category} />
                                <p className="mt-2 font-mono text-xs text-muted-foreground">{category.id}</p>
                            </div>
                            <CategoryStatusBadge status={category.status} />
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <CategoryTypeBadge type={category.type} />
                        </div>
                        <div className="mt-4 grid gap-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Parent</span>
                                <span className="truncate">{category.parentName}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Updated</span>
                                <span>{formatDate(category.updatedAt, { dateStyle: "medium" })}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Usage</span>
                                <span className="font-mono">{formatCurrency(category.approvedUsageAmount)}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}

type CategoryRowActionsProps = {
    category: CategoryTableRow
    onArchive: () => void
    onEdit: () => void
    onView: () => void
}

function CategoryRowActions({ category, onArchive, onEdit, onView }: CategoryRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label={`Open actions for ${category.name}`} size="icon-sm" variant="ghost">
                    <MoreHorizontalIcon aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onView}>
                        <EyeIcon aria-hidden="true" />
                        View detail
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        <FilePenLineIcon aria-hidden="true" />
                        Edit category
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CopyIcon aria-hidden="true" />
                        Copy category ID
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        disabled={category.status === "archived"}
                        onClick={onArchive}
                        variant="destructive"
                    >
                        <ArchiveIcon aria-hidden="true" />
                        Archive category
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function CategoriesTableLoadingState() {
    return (
        <div className="flex flex-col gap-3" aria-label="Loading categories">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    className="grid gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4 md:grid-cols-[1.4fr_0.8fr_1fr_0.7fr_1fr]"
                    key={index}
                >
                    <Skeleton className="h-9" />
                    <Skeleton className="h-9" />
                    <Skeleton className="h-9" />
                    <Skeleton className="h-9" />
                    <Skeleton className="h-9" />
                </div>
            ))}
        </div>
    )
}
