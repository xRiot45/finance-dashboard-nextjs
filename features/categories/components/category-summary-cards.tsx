import { ArchiveIcon, ChartNoAxesCombinedIcon, TagsIcon, TrendingUpIcon } from "lucide-react"

import type { CategorySummary } from "@/features/categories/utils/category-view-models"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatNumber } from "@/shared/utils"

type CategorySummaryCardsProps = {
    summary: CategorySummary
}

export function CategorySummaryCards({ summary }: CategorySummaryCardsProps) {
    const summaryItems = [
        {
            description: `${formatNumber(summary.incomeCategoryCount)} income, ${formatNumber(summary.expenseCategoryCount)} expense`,
            icon: TagsIcon,
            label: "Active categories",
            value: formatNumber(summary.activeCategoryCount),
        },
        {
            description: "Used by at least one transaction",
            icon: ChartNoAxesCombinedIcon,
            label: "Used categories",
            value: formatNumber(summary.usedCategoryCount),
        },
        {
            description: summary.topCategory?.name ?? "No transaction usage yet",
            icon: TrendingUpIcon,
            label: "Top usage",
            value: summary.topCategory ? formatCurrency(summary.topCategory.approvedUsageAmount) : "No data",
        },
        {
            description: `${formatNumber(summary.transferCategoryCount)} transfer categories`,
            icon: ArchiveIcon,
            label: "Archived",
            value: formatNumber(summary.archivedCategoryCount),
        },
    ]

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Category summary">
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
