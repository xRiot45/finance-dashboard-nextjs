import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import { formatCurrency, formatPercentage } from "@/shared/utils"
import { cn } from "@/shared/lib/utils"
import type { Budget } from "@/features/budgets"

const usageStatusLabels: Record<Budget["usageStatus"], string> = {
    exceeded: "Exceeded",
    safe: "Safe",
    warning: "Warning",
}

const usageStatusClassNames: Record<Budget["usageStatus"], string> = {
    exceeded: "bg-destructive/10 text-destructive",
    safe: "bg-success-soft text-success-foreground",
    warning: "bg-warning-soft text-warning-foreground",
}

type DashboardBudgetCardProps = {
    budget: Budget
}

export function DashboardBudgetCard({ budget }: DashboardBudgetCardProps) {
    const progressValue = Math.min(budget.usagePercentage, 100)

    return (
        <div className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-muted/30 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{budget.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatCurrency(budget.spentAmount, { currency: budget.currency })} of{" "}
                        {formatCurrency(budget.amount, { currency: budget.currency })}
                    </p>
                </div>
                <Badge className={cn("border-transparent", usageStatusClassNames[budget.usageStatus])}>
                    {usageStatusLabels[budget.usageStatus]}
                </Badge>
            </div>
            <Progress value={progressValue} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatPercentage(budget.usagePercentage, { valueType: "percent" })} used</span>
                <span>{budget.thresholdPercentage}% threshold</span>
            </div>
        </div>
    )
}

type DashboardBudgetPanelProps = {
    budgets: Budget[]
}

export function DashboardBudgetPanel({ budgets }: DashboardBudgetPanelProps) {
    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader>
                <CardTitle>Budget watch</CardTitle>
                <CardDescription>Highest usage budgets in the active workspace.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {budgets.map((budget) => (
                    <DashboardBudgetCard budget={budget} key={budget.id} />
                ))}
            </CardContent>
        </Card>
    )
}
