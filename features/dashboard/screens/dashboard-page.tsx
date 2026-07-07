import Link from "next/link"
import {
    ArrowDownToLineIcon,
    ArrowUpRightIcon,
    BarChart3Icon,
    CalendarDaysIcon,
    PlusIcon,
    ReceiptTextIcon,
    WalletCardsIcon,
} from "lucide-react"

import { CoreEmptyState } from "@/shared/components/core-empty-state"
import { CoreErrorState } from "@/shared/components/core-error-state"
import { CoreLoadingState } from "@/shared/components/core-loading-state"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { formatCurrency } from "@/shared/utils"
import { DashboardBudgetPanel } from "@/features/dashboard/components/dashboard-budget-card"
import { DashboardCashFlowChart } from "@/features/dashboard/components/dashboard-cash-flow-chart"
import { DashboardExpenseBreakdown } from "@/features/dashboard/components/dashboard-expense-breakdown"
import { DashboardInsightPanel } from "@/features/dashboard/components/dashboard-insight-panel"
import { DashboardMetricCard } from "@/features/dashboard/components/dashboard-metric-card"
import { DashboardRecentTransactions } from "@/features/dashboard/components/dashboard-recent-transactions"
import { mockDashboardOverviewData } from "@/features/dashboard/data/dashboard-overview.data"

const metricIcons = {
    balance: WalletCardsIcon,
    "cash-flow": BarChart3Icon,
    expense: ReceiptTextIcon,
    income: ArrowUpRightIcon,
} as const

type DashboardDataState = "ready" | "loading" | "error"

export function DashboardPage() {
    const dashboardData = mockDashboardOverviewData
    const dataState = getDashboardDataState()
    const latestNetCashFlow = dashboardData.cashFlowChartData[dashboardData.cashFlowChartData.length - 1]?.net ?? 0
    const hasNoDashboardData =
        dashboardData.metrics.length === 0 &&
        dashboardData.cashFlowChartData.length === 0 &&
        dashboardData.recentTransactions.length === 0

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-page-title font-semibold">Dashboard</h1>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            {dashboardData.period.label}
                        </Badge>
                    </div>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Monitor balance, cash flow, budget pressure, and recent activity across the active workspace.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                        <CalendarDaysIcon aria-hidden="true" data-icon="inline-start" />
                        {dashboardData.period.label}
                    </Button>
                    <Button asChild>
                        <Link href="/transactions">
                            <PlusIcon aria-hidden="true" data-icon="inline-start" />
                            Add transaction
                        </Link>
                    </Button>
                </div>
            </div>

            {dataState === "loading" ? (
                <CoreLoadingState
                    description="Loading metrics, cash flow, category mix, recent transactions, and budget pressure signals."
                    icon={BarChart3Icon}
                    meta="Overview sync"
                    title="Loading dashboard overview"
                    variant="dashboard"
                />
            ) : dataState === "error" ? (
                <CoreErrorState
                    description="Dashboard overview could not be refreshed, so metrics and recent activity are paused before showing partial finance data."
                    icon={BarChart3Icon}
                    recoveryItems={[
                        "Keep the selected period unchanged.",
                        "Refresh the overview data source.",
                        "Open transactions if you need ledger-level detail.",
                    ]}
                    title="Dashboard overview could not be refreshed"
                />
            ) : hasNoDashboardData ? (
                <CoreEmptyState
                    actions={
                        <Button asChild>
                            <Link href="/transactions">
                                <PlusIcon aria-hidden="true" data-icon="inline-start" />
                                Add transaction
                            </Link>
                        </Button>
                    }
                    description="This workspace does not have enough finance activity to build overview metrics, cash flow movement, or recent ledger activity yet."
                    icon={BarChart3Icon}
                    meta="Overview empty"
                    steps={[
                        "Add the first transaction.",
                        "Connect accounts and categories.",
                        "Return here to monitor cash flow and budget pressure.",
                    ]}
                    title="No dashboard data yet"
                />
            ) : (
                <>
                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Finance metrics">
                        {dashboardData.metrics.map((metric) => (
                            <DashboardMetricCard
                                changePercentage={metric.changePercentage}
                                currency={metric.currency}
                                description={metric.description}
                                icon={metricIcons[metric.id]}
                                key={metric.id}
                                title={metric.title}
                                value={metric.value}
                            />
                        ))}
                    </section>

                    <section
                        className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]"
                        aria-label="Overview"
                    >
                        <Card className="border-border/70 bg-card/95 shadow-xs">
                            <CardHeader>
                                <div>
                                    <CardTitle>Cash flow</CardTitle>
                                    <CardDescription>
                                        Income, expense, and net movement for the selected period.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <div className="grid gap-3 rounded-3xl border border-border/70 bg-muted/30 p-4 sm:grid-cols-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-9 items-center justify-center rounded-2xl bg-success-soft text-success-foreground">
                                            <ArrowDownToLineIcon aria-hidden="true" className="size-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Latest net</p>
                                            <p className="truncate font-mono text-sm font-semibold">
                                                {formatCurrency(latestNetCashFlow, {
                                                    currency: dashboardData.currency,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="min-w-0 sm:col-span-2">
                                        <p className="text-xs text-muted-foreground">Period range</p>
                                        <p className="truncate text-sm font-medium">
                                            {dashboardData.period.from} to {dashboardData.period.to}
                                        </p>
                                    </div>
                                </div>
                                <DashboardCashFlowChart data={dashboardData.cashFlowChartData} />
                            </CardContent>
                        </Card>

                        <DashboardInsightPanel
                            exceededBudgetCount={dashboardData.exceededBudgetCount}
                            pendingApprovalCount={dashboardData.pendingApprovalCount}
                        />
                    </section>

                    <section className="grid gap-4 xl:grid-cols-2" aria-label="Budget and category analysis">
                        <DashboardBudgetPanel budgets={dashboardData.budgetHighlights} />
                        <DashboardExpenseBreakdown data={dashboardData.expenseByCategoryData} />
                    </section>

                    <DashboardRecentTransactions transactions={dashboardData.recentTransactions} />
                </>
            )}
        </div>
    )
}

function getDashboardDataState(): DashboardDataState {
    return "ready"
}
