import { CheckCircle2Icon, Clock3Icon, ReceiptTextIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatNumber } from "@/shared/utils"
import type { TransactionSummary } from "@/features/transactions/utils/transaction-view-models"

type TransactionSummaryCardsProps = {
    summary: TransactionSummary
}

export function TransactionSummaryCards({ summary }: TransactionSummaryCardsProps) {
    const summaryItems = [
        {
            description: "Visible rows",
            icon: ReceiptTextIcon,
            label: "Transactions",
            value: formatNumber(summary.totalCount),
        },
        {
            description: "Approved income",
            icon: TrendingUpIcon,
            label: "Income",
            value: formatCurrency(summary.incomeAmount),
        },
        {
            description: "Approved expense",
            icon: TrendingDownIcon,
            label: "Expenses",
            value: formatCurrency(summary.expenseAmount),
        },
        {
            description: `${formatNumber(summary.pendingCount)} pending`,
            icon: CheckCircle2Icon,
            label: "Approved",
            value: formatNumber(summary.approvedCount),
        },
    ]

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Transaction summary">
            {summaryItems.map((item) => {
                const Icon = item.icon === CheckCircle2Icon && summary.pendingCount > 0 ? Clock3Icon : item.icon

                return (
                    <Card className="border-border/70 bg-card/95 shadow-xs" key={item.label} size="sm">
                        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
                            <span className="flex size-8 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                                <Icon aria-hidden="true" />
                            </span>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-1">
                            <p className="truncate font-mono text-xl font-semibold">{item.value}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}
