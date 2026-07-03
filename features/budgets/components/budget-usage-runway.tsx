import type { BudgetUsageStatus } from "@/features/budgets"
import { cn } from "@/shared/lib/utils"
import { formatPercentage } from "@/shared/utils"

type BudgetUsageRunwayProps = {
    thresholdPercentage: number
    usagePercentage: number
    usageStatus: BudgetUsageStatus
}

export function BudgetUsageRunway({ thresholdPercentage, usagePercentage, usageStatus }: BudgetUsageRunwayProps) {
    const safeUsagePercentage = Math.min(Math.max(usagePercentage, 0), 100)
    const safeThresholdPercentage = Math.min(Math.max(thresholdPercentage, 0), 100)

    return (
        <div className="flex min-w-40 flex-col gap-2">
            <div
                aria-label={`${formatPercentage(usagePercentage / 100)} used. Threshold at ${formatPercentage(
                    thresholdPercentage / 100
                )}.`}
                className="relative h-2.5 overflow-hidden rounded-2xl bg-muted"
                role="meter"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={Math.round(Math.min(Math.max(usagePercentage, 0), 100))}
            >
                <div
                    className={cn(
                        "h-full rounded-2xl transition-all",
                        usageStatus === "exceeded"
                            ? "bg-destructive"
                            : usageStatus === "warning"
                              ? "bg-muted-foreground"
                              : "bg-primary"
                    )}
                    style={{ width: `${safeUsagePercentage}%` }}
                />
                <span
                    aria-hidden="true"
                    className="absolute top-0 h-full w-px bg-foreground/60"
                    style={{ left: `${safeThresholdPercentage}%` }}
                />
            </div>
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{formatPercentage(usagePercentage / 100)} used</span>
                <span>{formatPercentage(thresholdPercentage / 100)} threshold</span>
            </div>
        </div>
    )
}
