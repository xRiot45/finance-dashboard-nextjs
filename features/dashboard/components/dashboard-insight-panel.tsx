import { AlertTriangleIcon, CheckCircle2Icon, Clock3Icon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { cn } from "@/shared/lib/utils"

type DashboardInsightPanelProps = {
    exceededBudgetCount: number
    pendingApprovalCount: number
}

const insightItems = [
    {
        icon: Clock3Icon,
        label: "Pending approvals",
        tone: "warning",
        valueKey: "pendingApprovalCount",
    },
    {
        icon: AlertTriangleIcon,
        label: "Budgets exceeded",
        tone: "destructive",
        valueKey: "exceededBudgetCount",
    },
] as const

export function DashboardInsightPanel({ exceededBudgetCount, pendingApprovalCount }: DashboardInsightPanelProps) {
    const values = {
        exceededBudgetCount,
        pendingApprovalCount,
    }
    const isHealthy = exceededBudgetCount === 0 && pendingApprovalCount === 0

    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader>
                <div>
                    <CardTitle>Workspace pulse</CardTitle>
                    <CardDescription>Items that need finance attention.</CardDescription>
                </div>
                <CardAction>
                    <Button asChild size="sm" variant="outline">
                        <Link href="/transactions">Review</Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isHealthy ? (
                    <div className="flex items-center gap-3 rounded-3xl border border-border/70 bg-success-soft p-4 text-success-foreground">
                        <CheckCircle2Icon aria-hidden="true" className="size-5 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-sm font-medium">Everything is clear</p>
                            <p className="text-xs opacity-80">No urgent budget or approval issues right now.</p>
                        </div>
                    </div>
                ) : (
                    insightItems.map((item) => {
                        const Icon = item.icon
                        const value = values[item.valueKey]

                        return (
                            <div
                                className="flex items-center justify-between gap-3 rounded-3xl border border-border/70 bg-muted/30 p-4"
                                key={item.valueKey}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        className={cn(
                                            "flex size-9 shrink-0 items-center justify-center rounded-2xl",
                                            item.tone === "warning"
                                                ? "bg-warning-soft text-warning-foreground"
                                                : "bg-destructive/10 text-destructive"
                                        )}
                                    >
                                        <Icon aria-hidden="true" className="size-4" />
                                    </span>
                                    <p className="truncate text-sm font-medium">{item.label}</p>
                                </div>
                                <span className="font-mono text-2xl font-semibold">{value}</span>
                            </div>
                        )
                    })
                )}
            </CardContent>
        </Card>
    )
}
