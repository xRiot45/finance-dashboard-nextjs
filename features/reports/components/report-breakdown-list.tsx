import type { ReportBreakdownItem } from "@/features/reports/utils/report-view-models"
import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"
import { formatCurrency, formatPercentage } from "@/shared/utils"

type ReportBreakdownListProps = {
    items: ReportBreakdownItem[]
}

export function ReportBreakdownList({ items }: ReportBreakdownListProps) {
    return (
        <div className="grid gap-3">
            {items.map((item) => (
                <div className="rounded-3xl border border-border/70 bg-muted/20 p-4" key={item.id}>
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate font-medium">{item.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge
                            variant={
                                item.status === "critical"
                                    ? "destructive"
                                    : item.status === "warning"
                                      ? "secondary"
                                      : "outline"
                            }
                        >
                            {formatPercentage(item.percentage)}
                        </Badge>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-2xl bg-muted">
                        <div
                            className={cn(
                                "h-full rounded-2xl",
                                item.status === "critical"
                                    ? "bg-destructive"
                                    : item.status === "warning"
                                      ? "bg-muted-foreground"
                                      : "bg-primary"
                            )}
                            style={{ width: `${Math.min(Math.max(item.percentage * 100, 2), 100)}%` }}
                        />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-mono font-medium">{formatCurrency(Math.abs(item.amount))}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
