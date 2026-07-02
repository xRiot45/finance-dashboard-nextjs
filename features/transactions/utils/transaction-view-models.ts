import type { Account } from "@/features/accounts"
import type { Category } from "@/features/categories"
import type { Transaction } from "@/features/transactions/data/transactions.data"
import type { TransactionStatus, TransactionType } from "@/shared/utils"

export type TransactionFilterState = {
    accountId: string
    dateFrom: string
    dateTo: string
    query: string
    status: "all" | TransactionStatus
    type: "all" | TransactionType
}

export type TransactionTableRow = Transaction & {
    accountName: string
    categoryName: string
    destinationAccountName: string | null
}

export type TransactionSummary = {
    approvedCount: number
    expenseAmount: number
    incomeAmount: number
    pendingCount: number
    totalCount: number
}

const SEARCH_SEPARATOR = " "

export function mapTransactionRows(
    transactions: Transaction[],
    accounts: Account[],
    categories: Category[]
): TransactionTableRow[] {
    const accountNameById = new Map(accounts.map((account) => [account.id, account.name]))
    const categoryNameById = new Map(categories.map((category) => [category.id, category.name]))

    return transactions
        .toSorted((firstTransaction, secondTransaction) => secondTransaction.date.localeCompare(firstTransaction.date))
        .map((transaction) => ({
            ...transaction,
            accountName: accountNameById.get(transaction.accountId) ?? "Unknown account",
            categoryName: transaction.categoryId
                ? (categoryNameById.get(transaction.categoryId) ?? "Uncategorized")
                : "Uncategorized",
            destinationAccountName: transaction.destinationAccountId
                ? (accountNameById.get(transaction.destinationAccountId) ?? "Unknown account")
                : null,
        }))
}

export function filterTransactionRows(rows: TransactionTableRow[], filters: TransactionFilterState) {
    const normalizedQuery = filters.query.trim().toLowerCase()

    return rows.filter((row) => {
        const searchableText = [
            row.referenceNumber,
            row.description,
            row.merchant,
            row.accountName,
            row.categoryName,
            row.tags.join(SEARCH_SEPARATOR),
        ]
            .filter(Boolean)
            .join(SEARCH_SEPARATOR)
            .toLowerCase()

        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
        const matchesType = filters.type === "all" || row.type === filters.type
        const matchesStatus = filters.status === "all" || row.status === filters.status
        const matchesAccount = filters.accountId === "all" || row.accountId === filters.accountId
        const matchesDateFrom = !filters.dateFrom || row.date >= filters.dateFrom
        const matchesDateTo = !filters.dateTo || row.date <= filters.dateTo

        return matchesQuery && matchesType && matchesStatus && matchesAccount && matchesDateFrom && matchesDateTo
    })
}

export function summarizeTransactions(rows: TransactionTableRow[]): TransactionSummary {
    return rows.reduce<TransactionSummary>(
        (summary, row) => {
            summary.totalCount += 1

            if (row.status === "approved") {
                summary.approvedCount += 1

                if (row.type === "income") {
                    summary.incomeAmount += row.amount
                }

                if (row.type === "expense") {
                    summary.expenseAmount += row.amount
                }
            }

            if (row.status === "pending") {
                summary.pendingCount += 1
            }

            return summary
        },
        {
            approvedCount: 0,
            expenseAmount: 0,
            incomeAmount: 0,
            pendingCount: 0,
            totalCount: 0,
        }
    )
}

export function paginateTransactionRows(rows: TransactionTableRow[], page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize

    return rows.slice(startIndex, startIndex + pageSize)
}
