import { mockAccounts } from "@/features/accounts"
import { mockBudgets } from "@/features/budgets"
import { mockCategories } from "@/features/categories"
import { mockTransactions, type Transaction } from "@/features/transactions"

export type DashboardMetric = {
    id: "balance" | "income" | "expense" | "cash-flow"
    title: string
    value: number
    currency: string
    changePercentage: number
    description: string
}

export type CashFlowPoint = {
    period: string
    label: string
    income: number
    expense: number
    net: number
}

export type ExpenseCategoryPoint = {
    categoryId: string
    categoryName: string
    amount: number
    percentage: number
    color: string
}

export type RecentTransaction = Transaction & {
    accountName: string
    categoryName: string
}

export type DashboardOverviewData = {
    workspaceId: string
    period: {
        label: string
        from: string
        to: string
    }
    currency: string
    metrics: DashboardMetric[]
    cashFlowChartData: CashFlowPoint[]
    expenseByCategoryData: ExpenseCategoryPoint[]
    recentTransactions: RecentTransaction[]
    budgetHighlights: typeof mockBudgets
    pendingApprovalCount: number
    exceededBudgetCount: number
}

const ACTIVE_WORKSPACE_ID = "wks_acme"
const DASHBOARD_PERIOD = {
    label: "Q2 2026",
    from: "2026-04-01",
    to: "2026-06-30",
} as const

const monthLabels: Record<string, string> = {
    "2026-04": "Apr",
    "2026-05": "May",
    "2026-06": "Jun",
}

const previousPeriodChanges = {
    balance: 4.6,
    income: 9.8,
    expense: 6.4,
    cashFlow: -3.1,
} as const

const accountNameById = new Map(mockAccounts.map((account) => [account.id, account.name]))
const categoryById = new Map(mockCategories.map((category) => [category.id, category]))

const workspaceTransactions = mockTransactions.filter((transaction) => transaction.workspaceId === ACTIVE_WORKSPACE_ID)
const periodTransactions = workspaceTransactions.filter((transaction) => isDateWithinPeriod(transaction.date))
const finalizedTransactions = periodTransactions.filter((transaction) => transaction.status === "approved")

const periodIncomeAmount = sumTransactionsByType(finalizedTransactions, "income")
const periodExpenseAmount = sumTransactionsByType(finalizedTransactions, "expense")
const netCashFlowAmount = periodIncomeAmount - periodExpenseAmount
const totalBalanceAmount = mockAccounts
    .filter((account) => account.workspaceId === ACTIVE_WORKSPACE_ID && account.status === "active")
    .reduce((totalBalance, account) => totalBalance + account.currentBalance, 0)

export const mockDashboardOverviewData: DashboardOverviewData = {
    workspaceId: ACTIVE_WORKSPACE_ID,
    period: DASHBOARD_PERIOD,
    currency: "IDR",
    metrics: [
        {
            id: "balance",
            title: "Total balance",
            value: totalBalanceAmount,
            currency: "IDR",
            changePercentage: previousPeriodChanges.balance,
            description: "Across active accounts",
        },
        {
            id: "income",
            title: "Income",
            value: periodIncomeAmount,
            currency: "IDR",
            changePercentage: previousPeriodChanges.income,
            description: "Approved in Q2",
        },
        {
            id: "expense",
            title: "Expenses",
            value: periodExpenseAmount,
            currency: "IDR",
            changePercentage: previousPeriodChanges.expense,
            description: "Approved in Q2",
        },
        {
            id: "cash-flow",
            title: "Net cash flow",
            value: netCashFlowAmount,
            currency: "IDR",
            changePercentage: previousPeriodChanges.cashFlow,
            description: "Income minus expense",
        },
    ],
    cashFlowChartData: buildCashFlowChartData(finalizedTransactions),
    expenseByCategoryData: buildExpenseByCategoryData(finalizedTransactions),
    recentTransactions: periodTransactions
        .toSorted((firstTransaction, secondTransaction) => secondTransaction.date.localeCompare(firstTransaction.date))
        .slice(0, 6)
        .map((transaction) => ({
            ...transaction,
            accountName: accountNameById.get(transaction.accountId) ?? "Unknown account",
            categoryName: transaction.categoryId
                ? (categoryById.get(transaction.categoryId)?.name ?? "Uncategorized")
                : "Uncategorized",
        })),
    budgetHighlights: mockBudgets
        .filter((budget) => budget.workspaceId === ACTIVE_WORKSPACE_ID && budget.status === "active")
        .toSorted((firstBudget, secondBudget) => secondBudget.usagePercentage - firstBudget.usagePercentage)
        .slice(0, 3),
    pendingApprovalCount: periodTransactions.filter((transaction) => transaction.status === "pending").length,
    exceededBudgetCount: mockBudgets.filter(
        (budget) => budget.workspaceId === ACTIVE_WORKSPACE_ID && budget.usageStatus === "exceeded"
    ).length,
}

function isDateWithinPeriod(date: string) {
    return date >= DASHBOARD_PERIOD.from && date <= DASHBOARD_PERIOD.to
}

function sumTransactionsByType(transactions: Transaction[], transactionType: Transaction["type"]) {
    return transactions
        .filter((transaction) => transaction.type === transactionType)
        .reduce((totalAmount, transaction) => totalAmount + transaction.amount, 0)
}

function buildCashFlowChartData(transactions: Transaction[]): CashFlowPoint[] {
    return Object.entries(monthLabels).map(([period, label]) => {
        const monthlyTransactions = transactions.filter((transaction) => transaction.date.startsWith(period))
        const income = sumTransactionsByType(monthlyTransactions, "income")
        const expense = sumTransactionsByType(monthlyTransactions, "expense")

        return {
            period,
            label,
            income,
            expense,
            net: income - expense,
        }
    })
}

function buildExpenseByCategoryData(transactions: Transaction[]): ExpenseCategoryPoint[] {
    const expenseTotalsByCategory = new Map<string, number>()

    for (const transaction of transactions) {
        if (transaction.type !== "expense" || !transaction.categoryId) {
            continue
        }

        expenseTotalsByCategory.set(
            transaction.categoryId,
            (expenseTotalsByCategory.get(transaction.categoryId) ?? 0) + transaction.amount
        )
    }

    const totalExpense = Array.from(expenseTotalsByCategory.values()).reduce(
        (totalAmount, categoryAmount) => totalAmount + categoryAmount,
        0
    )

    return Array.from(expenseTotalsByCategory.entries())
        .map(([categoryId, amount]) => {
            const category = categoryById.get(categoryId)

            return {
                categoryId,
                categoryName: category?.name ?? "Uncategorized",
                amount,
                color: category?.color ?? "neutral",
                percentage: totalExpense > 0 ? amount / totalExpense : 0,
            }
        })
        .toSorted((firstCategory, secondCategory) => secondCategory.amount - firstCategory.amount)
        .slice(0, 5)
}
