import { ArrowUpRightIcon, BarChart3Icon, ReceiptTextIcon, WalletCardsIcon } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

const metrics = [
    {
        title: "Total balance",
        value: "$42,580.00",
        change: "+8.2%",
        icon: WalletCardsIcon,
    },
    {
        title: "Income",
        value: "$18,240.00",
        change: "+12.4%",
        icon: ArrowUpRightIcon,
    },
    {
        title: "Expenses",
        value: "$9,860.00",
        change: "64% of plan",
        icon: ReceiptTextIcon,
    },
    {
        title: "Net cash flow",
        value: "$8,380.00",
        change: "Healthy",
        icon: BarChart3Icon,
    },
]

export function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                        Track workspace balance, income, expenses, and cash flow.
                    </p>
                </div>
                <Badge variant="secondary" className="w-fit">
                    July 2026
                </Badge>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Finance metrics">
                {metrics.map((metric) => {
                    const Icon = metric.icon

                    return (
                        <Card key={metric.title}>
                            <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {metric.title}
                                </CardTitle>
                                <Icon aria-hidden="true" />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1">
                                <p className="font-mono text-2xl font-semibold">{metric.value}</p>
                                <p className="text-xs text-muted-foreground">{metric.change} from current period</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>App shell ready</CardTitle>
                    <CardDescription>
                        Sidebar, header, mobile navigation, workspace context, search, notifications, user menu, and
                        theme control are available.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
                        Dashboard overview charts will be implemented in the next finance task.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
