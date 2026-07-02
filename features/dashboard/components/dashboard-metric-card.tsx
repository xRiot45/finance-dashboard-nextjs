import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatPercentage } from "@/shared/utils"
import { cn } from "@/shared/lib/utils"

type DashboardMetricCardProps = {
    changePercentage: number
    currency: string
    description: string
    icon: LucideIcon
    title: string
    value: number
}

export function DashboardMetricCard({
    changePercentage,
    currency,
    description,
    icon: Icon,
    title,
    value,
}: DashboardMetricCardProps) {
    const isPositiveChange = changePercentage >= 0

    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="flex size-8 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                    <Icon aria-hidden="true" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="font-mono text-2xl font-semibold tracking-normal text-foreground">
                    {formatCurrency(value, { currency })}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                        className={cn(
                            "rounded-full px-2 py-0.5 font-medium",
                            isPositiveChange
                                ? "bg-success-soft text-success-foreground"
                                : "bg-warning-soft text-warning-foreground"
                        )}
                    >
                        {formatPercentage(changePercentage, {
                            maximumFractionDigits: 1,
                            signDisplay: "always",
                            valueType: "percent",
                        })}
                    </span>
                    <span className="text-muted-foreground">{description}</span>
                </div>
            </CardContent>
        </Card>
    )
}
