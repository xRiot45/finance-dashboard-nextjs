import type { Category, CategoryStatus, CategoryType } from "@/features/categories"
import type { Transaction } from "@/features/transactions/data/transactions.data"

export type CategoryFilterState = {
    query: string
    status: CategoryStatus | "all"
    type: CategoryType | "all"
}

export type CategoryTableRow = Category & {
    approvedUsageAmount: number
    childCount: number
    directTransactionCount: number
    hasChildren: boolean
    parentName: string
    pendingTransactionCount: number
    rejectedTransactionCount: number
    usageWeightPercentage: number
}

export type CategorySummary = {
    activeCategoryCount: number
    archivedCategoryCount: number
    expenseCategoryCount: number
    incomeCategoryCount: number
    topCategory: CategoryTableRow | null
    transferCategoryCount: number
    usedCategoryCount: number
}

export type CategoryTypeGroup = {
    categories: CategoryTableRow[]
    totalApprovedUsageAmount: number
    totalCategoryCount: number
    totalTransactionCount: number
    type: CategoryType
}

export function mapCategoryRows(categories: Category[], transactions: Transaction[]): CategoryTableRow[] {
    const categoryById = new Map(categories.map((category) => [category.id, category]))
    const childCountByParentId = categories.reduce<Map<string, number>>((childCounts, category) => {
        if (!category.parentId) {
            return childCounts
        }

        childCounts.set(category.parentId, (childCounts.get(category.parentId) ?? 0) + 1)

        return childCounts
    }, new Map())
    const transactionUsageByCategoryId = transactions.reduce<
        Map<
            string,
            {
                approvedUsageAmount: number
                directTransactionCount: number
                pendingTransactionCount: number
                rejectedTransactionCount: number
            }
        >
    >((usageByCategoryId, transaction) => {
        if (!transaction.categoryId) {
            return usageByCategoryId
        }

        const currentUsage = usageByCategoryId.get(transaction.categoryId) ?? {
            approvedUsageAmount: 0,
            directTransactionCount: 0,
            pendingTransactionCount: 0,
            rejectedTransactionCount: 0,
        }

        usageByCategoryId.set(transaction.categoryId, {
            approvedUsageAmount:
                transaction.status === "approved"
                    ? currentUsage.approvedUsageAmount + transaction.amount
                    : currentUsage.approvedUsageAmount,
            directTransactionCount: currentUsage.directTransactionCount + 1,
            pendingTransactionCount:
                transaction.status === "pending"
                    ? currentUsage.pendingTransactionCount + 1
                    : currentUsage.pendingTransactionCount,
            rejectedTransactionCount:
                transaction.status === "rejected"
                    ? currentUsage.rejectedTransactionCount + 1
                    : currentUsage.rejectedTransactionCount,
        })

        return usageByCategoryId
    }, new Map())
    const totalApprovedUsageAmount = Array.from(transactionUsageByCategoryId.values()).reduce(
        (sum, usage) => sum + usage.approvedUsageAmount,
        0
    )

    return categories.map((category) => {
        const usage = transactionUsageByCategoryId.get(category.id) ?? {
            approvedUsageAmount: 0,
            directTransactionCount: 0,
            pendingTransactionCount: 0,
            rejectedTransactionCount: 0,
        }

        return {
            ...category,
            ...usage,
            childCount: childCountByParentId.get(category.id) ?? 0,
            hasChildren: Boolean(childCountByParentId.get(category.id)),
            parentName: category.parentId ? (categoryById.get(category.parentId)?.name ?? "Unknown parent") : "Root",
            usageWeightPercentage:
                totalApprovedUsageAmount === 0 ? 0 : (usage.approvedUsageAmount / totalApprovedUsageAmount) * 100,
        }
    })
}

export function filterCategoryRows(rows: CategoryTableRow[], filters: CategoryFilterState) {
    const normalizedQuery = filters.query.trim().toLowerCase()

    return rows.filter((category) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            [category.name, category.parentName, category.type, category.status, category.icon, category.color]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery)
        const matchesType = filters.type === "all" || category.type === filters.type
        const matchesStatus = filters.status === "all" || category.status === filters.status

        return matchesQuery && matchesType && matchesStatus
    })
}

export function paginateCategoryRows(rows: CategoryTableRow[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize

    return rows.slice(start, start + pageSize)
}

export function summarizeCategories(rows: CategoryTableRow[]): CategorySummary {
    const topCategory = rows.reduce<CategoryTableRow | null>((currentTopCategory, category) => {
        if (!currentTopCategory || category.approvedUsageAmount > currentTopCategory.approvedUsageAmount) {
            return category
        }

        return currentTopCategory
    }, null)

    return {
        activeCategoryCount: rows.filter((category) => category.status === "active").length,
        archivedCategoryCount: rows.filter((category) => category.status === "archived").length,
        expenseCategoryCount: rows.filter((category) => category.type === "expense").length,
        incomeCategoryCount: rows.filter((category) => category.type === "income").length,
        topCategory,
        transferCategoryCount: rows.filter((category) => category.type === "transfer").length,
        usedCategoryCount: rows.filter((category) => category.directTransactionCount > 0).length,
    }
}

export function groupCategoryRowsByType(rows: CategoryTableRow[]): CategoryTypeGroup[] {
    return (["income", "expense", "transfer"] satisfies CategoryType[]).map((type) => {
        const categories = rows.filter((category) => category.type === type)

        return {
            categories,
            totalApprovedUsageAmount: categories.reduce((sum, category) => sum + category.approvedUsageAmount, 0),
            totalCategoryCount: categories.length,
            totalTransactionCount: categories.reduce((sum, category) => sum + category.directTransactionCount, 0),
            type,
        }
    })
}
