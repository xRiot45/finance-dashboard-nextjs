"use client"

import { ArchiveIcon, CopyIcon, EyeIcon, FilePenLineIcon, MoreHorizontalIcon, PiggyBankIcon } from "lucide-react"

import { BudgetStatusBadge, BudgetUsageStatusBadge } from "@/features/budgets/components/budget-status-badge"
import { BudgetUsageRunway } from "@/features/budgets/components/budget-usage-runway"
import { getBudgetPeriodOption } from "@/features/budgets/constants/budget-options"
import type { BudgetTableRow } from "@/features/budgets/utils/budget-view-models"
import { Badge } from "@/shared/components/ui/badge"
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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { cn } from "@/shared/lib/utils"
import { formatCurrency, formatDate } from "@/shared/utils"

type BudgetsTableProps = {
    isLoading?: boolean
    onArchiveBudget: (budget: BudgetTableRow) => void
    onEditBudget: (budget: BudgetTableRow) => void
    onViewBudget: (budget: BudgetTableRow) => void
    rows: BudgetTableRow[]
}

export function BudgetsTable({
    isLoading = false,
    onArchiveBudget,
    onEditBudget,
    onViewBudget,
    rows,
}: BudgetsTableProps) {
    if (isLoading) {
        return <BudgetsTableLoadingState />
    }

    if (rows.length === 0) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <PiggyBankIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No matching budgets</EmptyTitle>
                    <EmptyDescription>
                        Adjust the search, lifecycle, period, or usage filters to bring budgets back into view.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>Create a budget when you need a reusable spending guardrail for a category.</p>
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
                            <TableHead>Budget</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden xl:table-cell">Runway</TableHead>
                            <TableHead className="text-right">Spent / Limit</TableHead>
                            <TableHead className="w-12 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((budget) => (
                            <TableRow className="cursor-pointer" key={budget.id} onClick={() => onViewBudget(budget)}>
                                <TableCell>
                                    <div className="flex min-w-64 flex-col gap-2">
                                        <span className="truncate font-medium">{budget.name}</span>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant="outline">{budget.categoryName}</Badge>
                                            <BudgetUsageStatusBadge status={budget.usageStatus} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex min-w-32 flex-col gap-1">
                                        <span>{getBudgetPeriodOption(budget.period).label}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(budget.startDate, { dateStyle: "medium" })} -{" "}
                                            {formatDate(budget.endDate, { dateStyle: "medium" })}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <BudgetStatusBadge status={budget.status} />
                                </TableCell>
                                <TableCell className="hidden xl:table-cell">
                                    <BudgetUsageRunway
                                        thresholdPercentage={budget.thresholdPercentage}
                                        usagePercentage={budget.usagePercentage}
                                        usageStatus={budget.usageStatus}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-col gap-1">
                                        <span
                                            className={cn(
                                                "font-mono font-medium",
                                                budget.usageStatus === "exceeded" && "text-destructive"
                                            )}
                                        >
                                            {formatCurrency(budget.spentAmount, { currency: budget.currency })}
                                        </span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            of {formatCurrency(budget.amount, { currency: budget.currency })}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                                    <BudgetRowActions
                                        budget={budget}
                                        onArchive={() => onArchiveBudget(budget)}
                                        onEdit={() => onEditBudget(budget)}
                                        onView={() => onViewBudget(budget)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {rows.map((budget) => (
                    <button
                        className="rounded-3xl border border-border/70 bg-muted/20 p-4 text-left transition-colors hover:bg-muted/40"
                        key={budget.id}
                        onClick={() => onViewBudget(budget)}
                        type="button"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate font-medium">{budget.name}</p>
                                <p className="text-xs text-muted-foreground">{budget.categoryName}</p>
                            </div>
                            <BudgetUsageStatusBadge status={budget.usageStatus} />
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <BudgetStatusBadge status={budget.status} />
                            <Badge variant="outline">{getBudgetPeriodOption(budget.period).label}</Badge>
                        </div>
                        <div className="mt-4">
                            <BudgetUsageRunway
                                thresholdPercentage={budget.thresholdPercentage}
                                usagePercentage={budget.usagePercentage}
                                usageStatus={budget.usageStatus}
                            />
                        </div>
                        <div className="mt-4 grid gap-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Spent</span>
                                <span className="font-mono font-medium">
                                    {formatCurrency(budget.spentAmount, { currency: budget.currency })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Limit</span>
                                <span className="font-mono">
                                    {formatCurrency(budget.amount, { currency: budget.currency })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Ends</span>
                                <span>{formatDate(budget.endDate, { dateStyle: "medium" })}</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}

type BudgetRowActionsProps = {
    budget: BudgetTableRow
    onArchive: () => void
    onEdit: () => void
    onView: () => void
}

function BudgetRowActions({ budget, onArchive, onEdit, onView }: BudgetRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label={`Open actions for ${budget.name}`} size="icon-sm" variant="ghost">
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
                        Edit budget
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CopyIcon aria-hidden="true" />
                        Copy budget ID
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem disabled={budget.status === "archived"} onClick={onArchive} variant="destructive">
                        <ArchiveIcon aria-hidden="true" />
                        Archive budget
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function BudgetsTableLoadingState() {
    return (
        <div className="flex flex-col gap-3" aria-label="Loading budgets">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    className="grid gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4 md:grid-cols-[1.4fr_0.8fr_0.7fr_1fr_0.8fr]"
                    key={index}
                >
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
            ))}
        </div>
    )
}
