"use client"

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/ui/chart"
import { formatCurrency } from "@/shared/utils"
import type { CashFlowPoint } from "@/features/dashboard/data/dashboard-overview.data"

const chartConfig = {
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

type DashboardCashFlowChartProps = {
    data: CashFlowPoint[]
}

export function DashboardCashFlowChart({ data }: DashboardCashFlowChartProps) {
    return (
        <ChartContainer className="aspect-auto h-[280px] w-full" config={chartConfig}>
            <AreaChart data={data} margin={{ bottom: 8, left: 8, right: 8, top: 12 }}>
                <defs>
                    <linearGradient id="income-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.24} />
                        <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="expense-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis axisLine={false} dataKey="label" tickLine={false} tickMargin={10} />
                <YAxis
                    axisLine={false}
                    tickFormatter={(value) =>
                        formatCurrency(Number(value), {
                            currency: "IDR",
                            notation: "compact",
                        })
                    }
                    tickLine={false}
                    tickMargin={10}
                    width={72}
                />
                <ReferenceLine stroke="var(--border)" y={0} />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            formatter={(value, name) => {
                                const chartKey = String(name) as keyof typeof chartConfig

                                return (
                                    <div className="flex min-w-40 items-center justify-between gap-4">
                                        <span className="text-muted-foreground">
                                            {chartConfig[chartKey]?.label ?? String(name)}
                                        </span>
                                        <span className="font-mono font-medium text-foreground">
                                            {formatCurrency(Number(value), { currency: "IDR" })}
                                        </span>
                                    </div>
                                )
                            }}
                            indicator="dot"
                        />
                    }
                />
                <Area
                    dataKey="income"
                    fill="url(#income-fill)"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    type="monotone"
                />
                <Area
                    dataKey="expense"
                    fill="url(#expense-fill)"
                    stroke="var(--color-expense)"
                    strokeWidth={2}
                    type="monotone"
                />
                <Area
                    dataKey="net"
                    fill="transparent"
                    stroke="var(--color-net)"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                />
            </AreaChart>
        </ChartContainer>
    )
}
