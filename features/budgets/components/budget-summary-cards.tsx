import { CircleAlertIcon, GaugeIcon, PiggyBankIcon, WalletCardsIcon } from "lucide-react"

import type { BudgetSummary } from "@/features/budgets/utils/budget-view-models"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatNumber, formatPercentage } from "@/shared/utils"

type BudgetSummaryCardsProps = {
    summary: BudgetSummary
}

export function BudgetSummaryCards({ summary }: BudgetSummaryCardsProps) {
    const summaryItems = [
        {
            description: `${formatNumber(summary.totalBudgetCount)} budgets in view`,
            icon: PiggyBankIcon,
            label: "Active limit",
            value: formatCurrency(summary.activeBudgetAmount),
        },
        {
            description: "Approved and pending spend tracked",
            icon: WalletCardsIcon,
            label: "Spent",
            value: formatCurrency(summary.activeSpentAmount),
        },
        {
            description: "Remaining active budget",
            icon: GaugeIcon,
            label: "Utilization",
            value: formatPercentage(summary.utilizationPercentage / 100),
        },
        {
            description: `${formatNumber(summary.scheduledCount)} scheduled budgets`,
            icon: CircleAlertIcon,
            label: "Needs attention",
            value: formatNumber(summary.attentionCount),
        },
    ]

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Budget usage summary">
            {summaryItems.map((item) => {
                const Icon = item.icon

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
                            <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}
