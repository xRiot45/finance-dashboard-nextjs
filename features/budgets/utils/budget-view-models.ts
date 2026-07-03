import type { Budget, BudgetPeriod, BudgetStatus, BudgetUsageStatus } from "@/features/budgets"
import type { Category } from "@/features/categories"

export type BudgetFilterState = {
    period: "all" | BudgetPeriod
    query: string
    status: "all" | BudgetStatus
    usageStatus: "all" | BudgetUsageStatus
}

export type BudgetTableRow = Budget & {
    category: Category | null
    categoryName: string
    remainingAmount: number
    runwayPercentage: number
    thresholdReached: boolean
}

export type BudgetSummary = {
    activeBudgetAmount: number
    activeSpentAmount: number
    attentionCount: number
    remainingAmount: number
    scheduledCount: number
    totalBudgetCount: number
    utilizationPercentage: number
}

const SEARCH_SEPARATOR = " "

export function mapBudgetRows(budgets: Budget[], categories: Category[]): BudgetTableRow[] {
    const categoryById = new Map(categories.map((category) => [category.id, category]))

    return budgets
        .toSorted((firstBudget, secondBudget) => firstBudget.endDate.localeCompare(secondBudget.endDate))
        .map((budget) => {
            const category = categoryById.get(budget.categoryId) ?? null
            const remainingAmount = budget.amount - budget.spentAmount

            return {
                ...budget,
                category,
                categoryName: category?.name ?? "Uncategorized",
                remainingAmount,
                runwayPercentage: Math.min(Math.max(budget.usagePercentage, 0), 100),
                thresholdReached: budget.usagePercentage >= budget.thresholdPercentage,
            }
        })
}

export function filterBudgetRows(rows: BudgetTableRow[], filters: BudgetFilterState) {
    const normalizedQuery = filters.query.trim().toLowerCase()

    return rows.filter((row) => {
        const searchableText = [row.name, row.categoryName, row.period, row.status, row.usageStatus, row.currency]
            .join(SEARCH_SEPARATOR)
            .toLowerCase()

        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
        const matchesPeriod = filters.period === "all" || row.period === filters.period
        const matchesStatus = filters.status === "all" || row.status === filters.status
        const matchesUsageStatus = filters.usageStatus === "all" || row.usageStatus === filters.usageStatus

        return matchesQuery && matchesPeriod && matchesStatus && matchesUsageStatus
    })
}

export function summarizeBudgets(rows: BudgetTableRow[]): BudgetSummary {
    const activeRows = rows.filter((row) => row.status === "active")
    const activeBudgetAmount = activeRows.reduce((total, row) => total + row.amount, 0)
    const activeSpentAmount = activeRows.reduce((total, row) => total + row.spentAmount, 0)
    const remainingAmount = activeBudgetAmount - activeSpentAmount
    const attentionCount = activeRows.filter(
        (row) => row.usageStatus === "warning" || row.usageStatus === "exceeded"
    ).length

    return {
        activeBudgetAmount,
        activeSpentAmount,
        attentionCount,
        remainingAmount,
        scheduledCount: rows.filter((row) => row.status === "scheduled").length,
        totalBudgetCount: rows.length,
        utilizationPercentage: activeBudgetAmount > 0 ? (activeSpentAmount / activeBudgetAmount) * 100 : 0,
    }
}

export function paginateBudgetRows(rows: BudgetTableRow[], page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize

    return rows.slice(startIndex, startIndex + pageSize)
}
