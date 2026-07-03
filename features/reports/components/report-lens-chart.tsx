"use client"

import { Bar, BarChart, CartesianGrid, ComposedChart, Line, ReferenceLine, XAxis, YAxis } from "recharts"

import type { ReportLens } from "@/features/reports/constants/report-options"
import type { ReportBreakdownItem, ReportPeriodPoint } from "@/features/reports/utils/report-view-models"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/ui/chart"
import { formatCurrency } from "@/shared/utils"

const chartConfig = {
    amount: {
        color: "var(--chart-1)",
        label: "Amount",
    },
    budgetLimit: {
        color: "var(--chart-4)",
        label: "Budget limit",
    },
    budgetSpent: {
        color: "var(--chart-2)",
        label: "Budget actual",
    },
    expense: {
        color: "var(--chart-1)",
        label: "Expense",
    },
    income: {
        color: "var(--chart-2)",
        label: "Income",
    },
    net: {
        color: "var(--chart-3)",
        label: "Net",
    },
} satisfies ChartConfig

type ReportLensChartProps = {
    breakdown: ReportBreakdownItem[]
    lens: ReportLens
    periodPoints: ReportPeriodPoint[]
}

export function ReportLensChart({ breakdown, lens, periodPoints }: ReportLensChartProps) {
    if (lens === "cash-flow") {
        return <CashFlowLensChart data={periodPoints} />
    }

    if (lens === "budgets") {
        return <BudgetLensChart data={periodPoints} />
    }

    return <BreakdownLensChart data={breakdown} lens={lens} />
}

function CashFlowLensChart({ data }: { data: ReportPeriodPoint[] }) {
    return (
        <ChartContainer className="aspect-auto h-[320px] w-full" config={chartConfig}>
            <ComposedChart data={data} margin={{ bottom: 8, left: 8, right: 8, top: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} />
                <YAxis
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(Number(value), { notation: "compact" })}
                    tickLine={false}
                    tickMargin={10}
                    width={72}
                />
                <ReferenceLine stroke="var(--border)" y={0} />
                <ChartTooltip content={<ReportChartTooltip />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="var(--color-expense)" radius={[8, 8, 0, 0]} />
                <Line dataKey="net" dot={false} stroke="var(--color-net)" strokeWidth={2} type="monotone" />
            </ComposedChart>
        </ChartContainer>
    )
}

function BudgetLensChart({ data }: { data: ReportPeriodPoint[] }) {
    return (
        <ChartContainer className="aspect-auto h-[320px] w-full" config={chartConfig}>
            <ComposedChart data={data} margin={{ bottom: 8, left: 8, right: 8, top: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} />
                <YAxis
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(Number(value), { notation: "compact" })}
                    tickLine={false}
                    tickMargin={10}
                    width={72}
                />
                <ChartTooltip content={<ReportChartTooltip />} />
                <Bar dataKey="budgetLimit" fill="var(--color-budgetLimit)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="budgetSpent" fill="var(--color-budgetSpent)" radius={[8, 8, 0, 0]} />
            </ComposedChart>
        </ChartContainer>
    )
}

function BreakdownLensChart({ data, lens }: { data: ReportBreakdownItem[]; lens: ReportLens }) {
    const chartData = data.map((item) => ({
        ...item,
        amount: Math.abs(item.amount),
    }))

    return (
        <ChartContainer className="aspect-auto h-[320px] w-full" config={chartConfig}>
            <BarChart data={chartData} margin={{ bottom: 8, left: 8, right: 8, top: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} />
                <YAxis
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(Number(value), { notation: "compact" })}
                    tickLine={false}
                    tickMargin={10}
                    width={72}
                />
                <ChartTooltip content={<ReportChartTooltip />} />
                <Bar
                    dataKey="amount"
                    fill={lens === "income" ? "var(--color-income)" : "var(--color-expense)"}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ChartContainer>
    )
}

function ReportChartTooltip() {
    return (
        <ChartTooltipContent
            formatter={(value, name) => {
                const chartKey = String(name) as keyof typeof chartConfig

                return (
                    <div className="flex min-w-44 items-center justify-between gap-4">
                        <span className="text-muted-foreground">{chartConfig[chartKey]?.label ?? String(name)}</span>
                        <span className="font-mono font-medium text-foreground">{formatCurrency(Number(value))}</span>
                    </div>
                )
            }}
            indicator="dot"
        />
    )
}
