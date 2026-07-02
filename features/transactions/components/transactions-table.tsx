"use client"

import { CopyIcon, EyeIcon, FilePenLineIcon, MoreHorizontalIcon, PaperclipIcon, ReceiptTextIcon } from "lucide-react"

import { TransactionStatusBadge } from "@/features/transactions/components/transaction-status-badge"
import { TransactionTypeBadge } from "@/features/transactions/components/transaction-type-badge"
import type { TransactionTableRow } from "@/features/transactions/utils/transaction-view-models"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Checkbox } from "@/shared/components/ui/checkbox"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { cn } from "@/shared/lib/utils"
import { formatCurrency, formatDate } from "@/shared/utils"

type TransactionsTableProps = {
    allVisibleSelected: boolean
    onEditTransaction: (transaction: TransactionTableRow) => void
    onSelectAllVisible: (selected: boolean) => void
    onSelectedChange: (transactionId: string, selected: boolean) => void
    onViewTransaction: (transaction: TransactionTableRow) => void
    rows: TransactionTableRow[]
    selectedIds: string[]
    someVisibleSelected: boolean
}

export function TransactionsTable({
    allVisibleSelected,
    onEditTransaction,
    onSelectAllVisible,
    onSelectedChange,
    onViewTransaction,
    rows,
    selectedIds,
    someVisibleSelected,
}: TransactionsTableProps) {
    const selectedIdSet = new Set(selectedIds)

    if (rows.length === 0) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ReceiptTextIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No matching transactions</EmptyTitle>
                    <EmptyDescription>
                        Try another keyword, account, status, or date range to bring transactions back into view.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>New transactions can still be created from the form panel.</p>
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
                            <TableHead className="w-10">
                                <Checkbox
                                    aria-label="Select visible transactions"
                                    checked={allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false}
                                    onCheckedChange={(checked) => onSelectAllVisible(checked === true)}
                                />
                            </TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden xl:table-cell">Category</TableHead>
                            <TableHead className="hidden lg:table-cell">Account</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="w-12 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((transaction) => {
                            const isSelected = selectedIdSet.has(transaction.id)
                            const isExpense = transaction.type === "expense"

                            return (
                                <TableRow
                                    className="cursor-pointer"
                                    data-state={isSelected ? "selected" : undefined}
                                    key={transaction.id}
                                    onClick={() => onViewTransaction(transaction)}
                                >
                                    <TableCell onClick={(event) => event.stopPropagation()}>
                                        <Checkbox
                                            aria-label={`Select ${transaction.referenceNumber}`}
                                            checked={isSelected}
                                            onCheckedChange={(checked) =>
                                                onSelectedChange(transaction.id, checked === true)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatDate(transaction.date, { dateStyle: "medium" })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex min-w-64 flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate font-medium">{transaction.description}</span>
                                                {transaction.attachmentCount > 0 ? (
                                                    <PaperclipIcon
                                                        aria-label={`${transaction.attachmentCount} attachments`}
                                                        className="size-3.5 shrink-0 text-muted-foreground"
                                                    />
                                                ) : null}
                                            </div>
                                            <span className="font-mono text-xs text-muted-foreground">
                                                {transaction.referenceNumber}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <TransactionTypeBadge type={transaction.type} />
                                    </TableCell>
                                    <TableCell className="hidden text-muted-foreground xl:table-cell">
                                        {transaction.categoryName}
                                    </TableCell>
                                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                                        <span className="block max-w-40 truncate">{transaction.accountName}</span>
                                    </TableCell>
                                    <TableCell>
                                        <TransactionStatusBadge status={transaction.status} />
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            "text-right font-mono font-medium",
                                            isExpense && "text-destructive"
                                        )}
                                    >
                                        {isExpense ? "-" : ""}
                                        {formatCurrency(transaction.amount, { currency: transaction.currency })}
                                    </TableCell>
                                    <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                                        <TransactionRowActions
                                            onEdit={() => onEditTransaction(transaction)}
                                            onView={() => onViewTransaction(transaction)}
                                            transaction={transaction}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {rows.map((transaction) => {
                    const isSelected = selectedIdSet.has(transaction.id)
                    const isExpense = transaction.type === "expense"

                    return (
                        <button
                            className={cn(
                                "rounded-3xl border border-border/70 bg-muted/20 p-4 text-left transition-colors hover:bg-muted/40",
                                isSelected && "bg-muted"
                            )}
                            key={transaction.id}
                            onClick={() => onViewTransaction(transaction)}
                            type="button"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{transaction.description}</p>
                                    <p className="font-mono text-xs text-muted-foreground">
                                        {transaction.referenceNumber}
                                    </p>
                                </div>
                                <Checkbox
                                    aria-label={`Select ${transaction.referenceNumber}`}
                                    checked={isSelected}
                                    onClick={(event) => event.stopPropagation()}
                                    onCheckedChange={(checked) => onSelectedChange(transaction.id, checked === true)}
                                />
                            </div>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <TransactionTypeBadge type={transaction.type} />
                                <TransactionStatusBadge status={transaction.status} />
                                {transaction.attachmentCount > 0 ? (
                                    <Badge variant="outline">
                                        <PaperclipIcon aria-hidden="true" data-icon="inline-start" />
                                        {transaction.attachmentCount}
                                    </Badge>
                                ) : null}
                            </div>
                            <div className="mt-4 grid gap-2 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground">Date</span>
                                    <span>{formatDate(transaction.date, { dateStyle: "medium" })}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground">Account</span>
                                    <span className="truncate">{transaction.accountName}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground">Amount</span>
                                    <span className={cn("font-mono font-medium", isExpense && "text-destructive")}>
                                        {isExpense ? "-" : ""}
                                        {formatCurrency(transaction.amount, { currency: transaction.currency })}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </>
    )
}

type TransactionRowActionsProps = {
    onEdit: () => void
    onView: () => void
    transaction: TransactionTableRow
}

function TransactionRowActions({ onEdit, onView, transaction }: TransactionRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label={`Open actions for ${transaction.referenceNumber}`} size="icon-sm" variant="ghost">
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
                        Edit transaction
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CopyIcon aria-hidden="true" />
                        Duplicate
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">Void transaction</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
