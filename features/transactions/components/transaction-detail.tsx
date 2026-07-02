import { ArrowRightIcon, CalendarDaysIcon, Clock3Icon, PaperclipIcon, TagsIcon } from "lucide-react"

import { TransactionStatusBadge } from "@/features/transactions/components/transaction-status-badge"
import { TransactionTypeBadge } from "@/features/transactions/components/transaction-type-badge"
import type { TransactionTableRow } from "@/features/transactions/utils/transaction-view-models"
import { Badge } from "@/shared/components/ui/badge"
import { Separator } from "@/shared/components/ui/separator"
import { formatCurrency, formatDate, formatDateTime } from "@/shared/utils"

type TransactionDetailProps = {
    transaction: TransactionTableRow | null
}

export function TransactionDetail({ transaction }: TransactionDetailProps) {
    if (!transaction) {
        return null
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
                <TransactionTypeBadge type={transaction.type} />
                <TransactionStatusBadge status={transaction.status} />
                {transaction.attachmentCount > 0 ? (
                    <Badge variant="outline">
                        <PaperclipIcon aria-hidden="true" data-icon="inline-start" />
                        {transaction.attachmentCount} attachments
                    </Badge>
                ) : null}
            </div>

            <div className="rounded-3xl border border-border/70 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="mt-1 font-mono text-2xl font-semibold">
                    {transaction.type === "expense" ? "-" : ""}
                    {formatCurrency(transaction.amount, { currency: transaction.currency })}
                </p>
            </div>

            <div className="grid gap-3 text-sm">
                <DetailRow label="Date" value={formatDate(transaction.date, { dateStyle: "full" })} />
                <DetailRow label="Account" value={transaction.accountName} />
                {transaction.destinationAccountName ? (
                    <DetailRow
                        label="Transfer path"
                        value={`${transaction.accountName} to ${transaction.destinationAccountName}`}
                    />
                ) : null}
                <DetailRow label="Category" value={transaction.categoryName} />
                <DetailRow label="Merchant" value={transaction.merchant ?? "No merchant"} />
            </div>

            <Separator />

            <div className="grid gap-3 text-sm">
                <div className="flex items-start gap-3">
                    <Clock3Icon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Timeline</p>
                        <p className="text-muted-foreground">
                            Created {formatDateTime(transaction.createdAt)}. Updated{" "}
                            {formatDateTime(transaction.updatedAt)}.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <CalendarDaysIcon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Approval</p>
                        <p className="text-muted-foreground">
                            {transaction.approvedAt
                                ? `Approved ${formatDateTime(transaction.approvedAt)}`
                                : transaction.rejectedAt
                                  ? `Rejected ${formatDateTime(transaction.rejectedAt)}`
                                  : "Not completed yet"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <TagsIcon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Tags</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {transaction.tags.length > 0 ? (
                                transaction.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No tags</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {transaction.notes ? (
                <div className="rounded-3xl border border-border/70 bg-muted/30 p-4 text-sm">
                    <p className="font-medium">Notes</p>
                    <p className="mt-1 text-muted-foreground">{transaction.notes}</p>
                </div>
            ) : null}
        </div>
    )
}

type DetailRowProps = {
    label: string
    value: string
}

function DetailRow({ label, value }: DetailRowProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{label}</span>
            <span className="flex min-w-0 items-center gap-2 text-right font-medium">
                {label === "Transfer path" ? <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" /> : null}
                <span className="truncate">{value}</span>
            </span>
        </div>
    )
}
