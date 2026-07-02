import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency, formatPercentage } from "@/shared/utils"
import type { ExpenseCategoryPoint } from "@/features/dashboard/data/dashboard-overview.data"

type DashboardExpenseBreakdownProps = {
    data: ExpenseCategoryPoint[]
}

const categoryColorMap: Record<string, string> = {
    amber: "var(--chart-1)",
    orange: "var(--chart-1)",
    red: "var(--destructive)",
    sky: "var(--chart-2)",
    slate: "var(--chart-5)",
    violet: "var(--chart-3)",
}

export function DashboardExpenseBreakdown({ data }: DashboardExpenseBreakdownProps) {
    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader>
                <CardTitle>Expense breakdown</CardTitle>
                <CardDescription>Approved spend by category for the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {data.map((category) => (
                    <div className="flex flex-col gap-2" key={category.categoryId}>
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="truncate font-medium">{category.categoryName}</span>
                            <span className="font-mono text-muted-foreground">
                                {formatCurrency(category.amount, { currency: "IDR" })}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: categoryColorMap[category.color] ?? "var(--primary)",
                                        width: `${Math.max(category.percentage * 100, 3)}%`,
                                    }}
                                />
                            </div>
                            <span className="w-12 text-right font-mono text-xs text-muted-foreground">
                                {formatPercentage(category.percentage)}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
