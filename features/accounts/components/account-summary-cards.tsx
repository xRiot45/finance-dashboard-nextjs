import { ArchiveIcon, LandmarkIcon, ScaleIcon, WalletCardsIcon } from "lucide-react"

import type { AccountSummary } from "@/features/accounts/utils/account-view-models"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatNumber } from "@/shared/utils"

type AccountSummaryCardsProps = {
    summary: AccountSummary
}

export function AccountSummaryCards({ summary }: AccountSummaryCardsProps) {
    const summaryItems = [
        {
            description: `${formatNumber(summary.activeAccountCount)} active sources`,
            icon: WalletCardsIcon,
            label: "Available balance",
            value: formatCurrency(summary.availableBalanceAmount),
        },
        {
            description: "Across active and archived",
            icon: ScaleIcon,
            label: "Book balance",
            value: formatCurrency(summary.totalBalanceAmount),
        },
        {
            description: summary.largestAccount?.name ?? "No active accounts",
            icon: LandmarkIcon,
            label: "Largest account",
            value: summary.largestAccount ? formatCurrency(summary.largestAccount.currentBalance) : "No data",
        },
        {
            description: `${formatNumber(summary.totalAccountCount)} total accounts`,
            icon: ArchiveIcon,
            label: "Archived",
            value: formatNumber(summary.archivedAccountCount),
        },
    ]

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Account balance summary">
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
