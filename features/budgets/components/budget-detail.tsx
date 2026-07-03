import { CalendarDaysIcon, Clock3Icon, GaugeIcon } from "lucide-react"

import { BudgetStatusBadge, BudgetUsageStatusBadge } from "@/features/budgets/components/budget-status-badge"
import { BudgetUsageRunway } from "@/features/budgets/components/budget-usage-runway"
import type { BudgetTableRow } from "@/features/budgets/utils/budget-view-models"
import { Separator } from "@/shared/components/ui/separator"
import { formatCurrency, formatDate, formatDateTime, formatPercentage } from "@/shared/utils"

type BudgetDetailProps = {
    budget: BudgetTableRow | null
}

export function BudgetDetail({ budget }: BudgetDetailProps) {
    if (!budget) {
        return null
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
                <BudgetStatusBadge status={budget.status} />
                <BudgetUsageStatusBadge status={budget.usageStatus} />
            </div>

            <div className="rounded-3xl border border-border/70 bg-muted/30 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">Budget runway</p>
                        <p className="mt-1 font-mono text-2xl font-semibold">
                            {formatCurrency(budget.remainingAmount, { currency: budget.currency })}
                        </p>
                    </div>
                    <p className="max-w-sm text-sm text-muted-foreground">
                        Remaining balance after tracked spend. Negative values mean the budget has already exceeded its
                        limit.
                    </p>
                </div>
                <div className="mt-4">
                    <BudgetUsageRunway
                        thresholdPercentage={budget.thresholdPercentage}
                        usagePercentage={budget.usagePercentage}
                        usageStatus={budget.usageStatus}
                    />
                </div>
            </div>

            <div className="grid gap-3 text-sm">
                <DetailRow label="Category" value={budget.categoryName} />
                <DetailRow
                    label="Period"
                    value={`${formatDate(budget.startDate, { dateStyle: "medium" })} to ${formatDate(budget.endDate, {
                        dateStyle: "medium",
                    })}`}
                />
                <DetailRow label="Limit" value={formatCurrency(budget.amount, { currency: budget.currency })} />
                <DetailRow label="Spent" value={formatCurrency(budget.spentAmount, { currency: budget.currency })} />
                <DetailRow label="Usage" value={`${formatPercentage(budget.usagePercentage / 100)} of limit`} />
                <DetailRow
                    label="Threshold"
                    value={`${formatPercentage(budget.thresholdPercentage / 100)} warning point`}
                />
            </div>

            <Separator />

            <div className="grid gap-3 text-sm">
                <div className="flex items-start gap-3">
                    <CalendarDaysIcon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Coverage window</p>
                        <p className="text-muted-foreground">
                            This budget tracks expenses posted between {formatDate(budget.startDate)} and{" "}
                            {formatDate(budget.endDate)}.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <GaugeIcon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Usage rule</p>
                        <p className="text-muted-foreground">
                            Warning starts at {formatPercentage(budget.thresholdPercentage / 100)}. Exceeded starts
                            above the full budget limit.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Clock3Icon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="min-w-0">
                        <p className="font-medium">Last updated</p>
                        <p className="text-muted-foreground">{formatDateTime(budget.updatedAt)}</p>
                    </div>
                </div>
            </div>
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
            <span className="min-w-0 truncate text-right font-medium">{value}</span>
        </div>
    )
}
