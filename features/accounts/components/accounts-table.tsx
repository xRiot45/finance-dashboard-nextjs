"use client"

import { ArchiveIcon, CopyIcon, EyeIcon, FilePenLineIcon, MoreHorizontalIcon, WalletCardsIcon } from "lucide-react"

import { AccountStatusBadge } from "@/features/accounts/components/account-status-badge"
import { AccountTypeBadge } from "@/features/accounts/components/account-type-badge"
import type { AccountTableRow } from "@/features/accounts/utils/account-view-models"
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
import { cn } from "@/shared/lib/utils"
import { formatCurrency, formatDate, formatPercentage } from "@/shared/utils"

type AccountsTableProps = {
    isLoading?: boolean
    onArchiveAccount: (account: AccountTableRow) => void
    onEditAccount: (account: AccountTableRow) => void
    onViewAccount: (account: AccountTableRow) => void
    rows: AccountTableRow[]
}

export function AccountsTable({
    isLoading = false,
    onArchiveAccount,
    onEditAccount,
    onViewAccount,
    rows,
}: AccountsTableProps) {
    if (isLoading) {
        return <AccountsTableLoadingState />
    }

    if (rows.length === 0) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <WalletCardsIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No matching accounts</EmptyTitle>
                    <EmptyDescription>
                        Adjust the search, type, or status filters to bring account sources back into view.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>New accounts can be created from the primary action above.</p>
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
                            <TableHead>Account</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="hidden lg:table-cell">Institution</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden xl:table-cell">Share</TableHead>
                            <TableHead className="text-right">Current balance</TableHead>
                            <TableHead className="w-12 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((account) => (
                            <TableRow
                                className="cursor-pointer"
                                key={account.id}
                                onClick={() => onViewAccount(account)}
                            >
                                <TableCell>
                                    <div className="flex min-w-56 flex-col gap-1">
                                        <span className="truncate font-medium">{account.name}</span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {account.displayMaskedNumber}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <AccountTypeBadge type={account.type} />
                                </TableCell>
                                <TableCell className="hidden text-muted-foreground lg:table-cell">
                                    <span className="block max-w-44 truncate">{account.displayInstitutionName}</span>
                                </TableCell>
                                <TableCell>
                                    <AccountStatusBadge status={account.status} />
                                </TableCell>
                                <TableCell className="hidden xl:table-cell">
                                    <div className="flex min-w-32 flex-col gap-2">
                                        <Progress value={account.balanceWeightPercentage} />
                                        <span className="text-xs text-muted-foreground">
                                            {formatPercentage(account.balanceWeightPercentage / 100)} of active balance
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        "text-right font-mono font-medium",
                                        account.hasNegativeBalance && "text-destructive"
                                    )}
                                >
                                    {formatCurrency(account.currentBalance, { currency: account.currency })}
                                </TableCell>
                                <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                                    <AccountRowActions
                                        account={account}
                                        onArchive={() => onArchiveAccount(account)}
                                        onEdit={() => onEditAccount(account)}
                                        onView={() => onViewAccount(account)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {rows.map((account) => (
                    <button
                        className="rounded-3xl border border-border/70 bg-muted/20 p-4 text-left transition-colors hover:bg-muted/40"
                        key={account.id}
                        onClick={() => onViewAccount(account)}
                        type="button"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate font-medium">{account.name}</p>
                                <p className="font-mono text-xs text-muted-foreground">{account.displayMaskedNumber}</p>
                            </div>
                            <AccountStatusBadge status={account.status} />
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <AccountTypeBadge type={account.type} />
                        </div>
                        <div className="mt-4 grid gap-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Institution</span>
                                <span className="truncate">{account.displayInstitutionName}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Updated</span>
                                <span>{formatDate(account.updatedAt, { dateStyle: "medium" })}</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">Balance</span>
                                <span
                                    className={cn(
                                        "font-mono font-medium",
                                        account.hasNegativeBalance && "text-destructive"
                                    )}
                                >
                                    {formatCurrency(account.currentBalance, { currency: account.currency })}
                                </span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}

type AccountRowActionsProps = {
    account: AccountTableRow
    onArchive: () => void
    onEdit: () => void
    onView: () => void
}

function AccountRowActions({ account, onArchive, onEdit, onView }: AccountRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-label={`Open actions for ${account.name}`} size="icon-sm" variant="ghost">
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
                        Edit account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CopyIcon aria-hidden="true" />
                        Copy account ID
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        disabled={account.status === "archived"}
                        onClick={onArchive}
                        variant="destructive"
                    >
                        <ArchiveIcon aria-hidden="true" />
                        Archive account
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AccountsTableLoadingState() {
    return (
        <div className="flex flex-col gap-3" aria-label="Loading accounts">
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
