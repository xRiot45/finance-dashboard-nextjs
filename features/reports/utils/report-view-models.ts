import type { Account } from "@/features/accounts"
import type { Budget } from "@/features/budgets"
import type { Category } from "@/features/categories"
import type { Transaction } from "@/features/transactions"
import type { ReportGroupBy, ReportLens } from "@/features/reports/constants/report-options"

export type ReportFilterState = {
    dateFrom: string
    dateTo: string
    groupBy: ReportGroupBy
    savedView: string
}

export type ReportPeriodPoint = {
    budgetLimit: number
    budgetSpent: number
    expense: number
    income: number
    label: string
    net: number
    period: string
}

export type ReportBreakdownItem = {
    amount: number
    description: string
    id: string
    label: string
    percentage: number
    secondaryAmount: number
    status: "positive" | "neutral" | "warning" | "critical"
}

export type ReportEvidenceRow = {
    amount: number
    date: string
    id: string
    label: string
    meta: string
    status: string
    type: "income" | "expense" | "budget"
}

export type ReportLensSummary = {
    helper: string
    insight: string
    label: string
    secondaryLabel: string
    secondaryValue: number
    value: number
}

export type ReportViewModel = {
    breakdown: ReportBreakdownItem[]
    evidenceRows: ReportEvidenceRow[]
    lensSummary: ReportLensSummary
    periodPoints: ReportPeriodPoint[]
}

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function buildReportViewModel({
    accounts,
    budgets,
    categories,
    filters,
    lens,
    transactions,
    workspaceId,
}: {
    accounts: Account[]
    budgets: Budget[]
    categories: Category[]
    filters: ReportFilterState
    lens: ReportLens
    transactions: Transaction[]
    workspaceId: string
}): ReportViewModel {
    const workspaceAccounts = accounts.filter((account) => account.workspaceId === workspaceId)
    const workspaceCategories = categories.filter((category) => category.workspaceId === workspaceId)
    const workspaceBudgets = budgets.filter((budget) => budget.workspaceId === workspaceId)
    const finalizedTransactions = transactions.filter(
        (transaction) =>
            transaction.workspaceId === workspaceId &&
            transaction.status === "approved" &&
            transaction.date >= filters.dateFrom &&
            transaction.date <= filters.dateTo
    )
    const categoryById = new Map(workspaceCategories.map((category) => [category.id, category]))
    const accountById = new Map(workspaceAccounts.map((account) => [account.id, account]))
    const periodPoints = buildReportPeriodPoints(finalizedTransactions, workspaceBudgets, filters)
    const breakdown = buildReportBreakdown({
        budgets: workspaceBudgets,
        categoryById,
        lens,
        transactions: finalizedTransactions,
    })
    const evidenceRows = buildReportEvidenceRows({
        accountById,
        budgets: workspaceBudgets,
        categoryById,
        lens,
        transactions: finalizedTransactions,
    })
    const lensSummary = buildReportLensSummary({ breakdown, lens, periodPoints })

    return {
        breakdown,
        evidenceRows,
        lensSummary,
        periodPoints,
    }
}

function buildReportPeriodPoints(transactions: Transaction[], budgets: Budget[], filters: ReportFilterState) {
    const periods = new Map<string, ReportPeriodPoint>()

    for (const transaction of transactions) {
        const period = getPeriodKey(transaction.date, filters.groupBy)
        const currentPoint = getOrCreatePeriodPoint(periods, period, filters.groupBy)

        if (transaction.type === "income") {
            currentPoint.income += transaction.amount
        }

        if (transaction.type === "expense") {
            currentPoint.expense += transaction.amount
        }

        currentPoint.net = currentPoint.income - currentPoint.expense
    }

    for (const budget of budgets) {
        if (budget.endDate < filters.dateFrom || budget.startDate > filters.dateTo) {
            continue
        }

        const period = getPeriodKey(budget.startDate, filters.groupBy)
        const currentPoint = getOrCreatePeriodPoint(periods, period, filters.groupBy)

        currentPoint.budgetLimit += budget.amount
        currentPoint.budgetSpent += budget.spentAmount
    }

    return Array.from(periods.values()).toSorted((firstPoint, secondPoint) =>
        firstPoint.period.localeCompare(secondPoint.period)
    )
}

function buildReportBreakdown({
    budgets,
    categoryById,
    lens,
    transactions,
}: {
    budgets: Budget[]
    categoryById: Map<string, Category>
    lens: ReportLens
    transactions: Transaction[]
}): ReportBreakdownItem[] {
    if (lens === "budgets") {
        const totalVariance = budgets.reduce((total, budget) => total + Math.abs(budget.amount - budget.spentAmount), 0)

        return budgets
            .filter((budget) => budget.status !== "archived")
            .map((budget) => {
                const variance = budget.amount - budget.spentAmount
                const category = categoryById.get(budget.categoryId)

                return {
                    amount: budget.spentAmount,
                    description: `${budget.usagePercentage.toFixed(1)}% used against ${budget.period} plan`,
                    id: budget.id,
                    label: category?.name ?? budget.name,
                    percentage: totalVariance > 0 ? Math.abs(variance) / totalVariance : 0,
                    secondaryAmount: variance,
                    status:
                        budget.usageStatus === "exceeded"
                            ? "critical"
                            : budget.usageStatus === "warning"
                              ? "warning"
                              : "neutral",
                } satisfies ReportBreakdownItem
            })
            .toSorted(
                (firstItem, secondItem) => Math.abs(secondItem.secondaryAmount) - Math.abs(firstItem.secondaryAmount)
            )
            .slice(0, 5)
    }

    const expectedType = lens === "income" ? "income" : "expense"
    const totalsByCategory = new Map<string, number>()

    for (const transaction of transactions) {
        if ((lens === "cash-flow" && transaction.type === "transfer") || transaction.type === "adjustment") {
            continue
        }

        if (lens !== "cash-flow" && transaction.type !== expectedType) {
            continue
        }

        const categoryId = transaction.categoryId ?? "uncategorized"
        const signedAmount =
            transaction.type === "expense" && lens === "cash-flow" ? -transaction.amount : transaction.amount

        totalsByCategory.set(categoryId, (totalsByCategory.get(categoryId) ?? 0) + signedAmount)
    }

    const totalAmount = Array.from(totalsByCategory.values()).reduce((total, amount) => total + Math.abs(amount), 0)

    return Array.from(totalsByCategory.entries())
        .map(([categoryId, amount]) => {
            const category = categoryById.get(categoryId)
            const isCritical = lens === "expenses" && Math.abs(amount) / Math.max(totalAmount, 1) >= 0.45

            return {
                amount,
                description:
                    lens === "cash-flow"
                        ? amount >= 0
                            ? "Net positive contributor"
                            : "Net cash drag"
                        : `${category?.type ?? expectedType} category`,
                id: categoryId,
                label: category?.name ?? "Uncategorized",
                percentage: totalAmount > 0 ? Math.abs(amount) / totalAmount : 0,
                secondaryAmount: amount,
                status: isCritical ? "warning" : amount >= 0 ? "positive" : "neutral",
            } satisfies ReportBreakdownItem
        })
        .toSorted((firstItem, secondItem) => Math.abs(secondItem.amount) - Math.abs(firstItem.amount))
        .slice(0, 5)
}

function buildReportEvidenceRows({
    accountById,
    budgets,
    categoryById,
    lens,
    transactions,
}: {
    accountById: Map<string, Account>
    budgets: Budget[]
    categoryById: Map<string, Category>
    lens: ReportLens
    transactions: Transaction[]
}): ReportEvidenceRow[] {
    if (lens === "budgets") {
        return budgets
            .filter((budget) => budget.status !== "archived")
            .toSorted((firstBudget, secondBudget) => secondBudget.usagePercentage - firstBudget.usagePercentage)
            .map(
                (budget) =>
                    ({
                        amount: budget.spentAmount,
                        date: budget.endDate,
                        id: budget.id,
                        label: budget.name,
                        meta: `${categoryById.get(budget.categoryId)?.name ?? "Uncategorized"} - ${budget.period}`,
                        status: budget.usageStatus,
                        type: "budget",
                    }) satisfies ReportEvidenceRow
            )
            .slice(0, 6)
    }

    const filteredTransactions = transactions.filter((transaction) => {
        if (lens === "income") {
            return transaction.type === "income"
        }

        if (lens === "expenses") {
            return transaction.type === "expense"
        }

        return transaction.type === "income" || transaction.type === "expense"
    })

    return filteredTransactions
        .toSorted((firstTransaction, secondTransaction) => secondTransaction.amount - firstTransaction.amount)
        .map(
            (transaction) =>
                ({
                    amount: transaction.amount,
                    date: transaction.date,
                    id: transaction.id,
                    label: transaction.description,
                    meta: [
                        categoryById.get(transaction.categoryId ?? "")?.name ?? "Uncategorized",
                        accountById.get(transaction.accountId)?.name ?? "Unknown account",
                    ].join(" - "),
                    status: transaction.status,
                    type: transaction.type === "income" ? "income" : "expense",
                }) satisfies ReportEvidenceRow
        )
        .slice(0, 6)
}

function buildReportLensSummary({
    breakdown,
    lens,
    periodPoints,
}: {
    breakdown: ReportBreakdownItem[]
    lens: ReportLens
    periodPoints: ReportPeriodPoint[]
}): ReportLensSummary {
    const incomeAmount = periodPoints.reduce((total, point) => total + point.income, 0)
    const expenseAmount = periodPoints.reduce((total, point) => total + point.expense, 0)
    const budgetLimitAmount = periodPoints.reduce((total, point) => total + point.budgetLimit, 0)
    const budgetSpentAmount = periodPoints.reduce((total, point) => total + point.budgetSpent, 0)
    const topDriver = breakdown[0]

    if (lens === "income") {
        return {
            helper: "Approved income in the selected period.",
            insight: topDriver
                ? `${topDriver.label} carries the strongest revenue contribution.`
                : "No income data yet.",
            label: "Income",
            secondaryLabel: "Top source",
            secondaryValue: topDriver?.amount ?? 0,
            value: incomeAmount,
        }
    }

    if (lens === "expenses") {
        return {
            helper: "Approved expenses in the selected period.",
            insight: topDriver ? `${topDriver.label} is the biggest spend driver.` : "No expense data yet.",
            label: "Expenses",
            secondaryLabel: "Top spend",
            secondaryValue: topDriver ? Math.abs(topDriver.amount) : 0,
            value: expenseAmount,
        }
    }

    if (lens === "budgets") {
        return {
            helper: "Tracked budget usage against active and scheduled plans.",
            insight: topDriver ? `${topDriver.label} has the largest variance signal.` : "No budget data yet.",
            label: "Budget actual",
            secondaryLabel: "Remaining plan",
            secondaryValue: budgetLimitAmount - budgetSpentAmount,
            value: budgetSpentAmount,
        }
    }

    return {
        helper: "Income minus expenses for the selected period.",
        insight:
            incomeAmount >= expenseAmount
                ? "Cash flow is net positive for this period."
                : "Expenses are outrunning income.",
        label: "Net cash flow",
        secondaryLabel: "Gross movement",
        secondaryValue: incomeAmount + expenseAmount,
        value: incomeAmount - expenseAmount,
    }
}

function getOrCreatePeriodPoint(periods: Map<string, ReportPeriodPoint>, period: string, groupBy: ReportGroupBy) {
    const existingPeriod = periods.get(period)

    if (existingPeriod) {
        return existingPeriod
    }

    const nextPeriod = {
        budgetLimit: 0,
        budgetSpent: 0,
        expense: 0,
        income: 0,
        label: formatPeriodLabel(period, groupBy),
        net: 0,
        period,
    }

    periods.set(period, nextPeriod)

    return nextPeriod
}

function getPeriodKey(date: string, groupBy: ReportGroupBy) {
    const [year, month] = date.split("-")

    if (groupBy === "quarter") {
        const quarter = Math.ceil(Number(month) / 3)

        return `${year}-Q${quarter}`
    }

    return `${year}-${month}`
}

function formatPeriodLabel(period: string, groupBy: ReportGroupBy) {
    if (groupBy === "quarter") {
        return period.replace("-", " ")
    }

    const [, month] = period.split("-")

    return monthLabels[Number(month) - 1] ?? period
}
