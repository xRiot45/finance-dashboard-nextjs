import { DEFAULT_FORMAT_FALLBACK, formatIdentifierLabel, type NullableFormatValue } from "./format-helpers"

export type TransactionType = "income" | "expense" | "transfer" | "adjustment"

export type TransactionStatus = "draft" | "pending" | "approved" | "rejected" | "void"

export type StatusBadgeVariant = "default" | "secondary" | "destructive" | "outline"

const transactionTypeLabels: Record<TransactionType, string> = {
    adjustment: "Adjustment",
    expense: "Expense",
    income: "Income",
    transfer: "Transfer",
}

const transactionStatusLabels: Record<TransactionStatus, string> = {
    approved: "Approved",
    draft: "Draft",
    pending: "Pending",
    rejected: "Rejected",
    void: "Void",
}

const transactionStatusBadgeVariants: Record<TransactionStatus, StatusBadgeVariant> = {
    approved: "default",
    draft: "secondary",
    pending: "secondary",
    rejected: "destructive",
    void: "outline",
}

export function formatTransactionType(
    transactionType: NullableFormatValue<TransactionType | string>,
    fallback = DEFAULT_FORMAT_FALLBACK
) {
    if (!transactionType) {
        return fallback
    }

    if (isTransactionType(transactionType)) {
        return transactionTypeLabels[transactionType]
    }

    return formatIdentifierLabel(transactionType)
}

export function formatTransactionStatus(
    transactionStatus: NullableFormatValue<TransactionStatus | string>,
    fallback = DEFAULT_FORMAT_FALLBACK
) {
    if (!transactionStatus) {
        return fallback
    }

    if (isTransactionStatus(transactionStatus)) {
        return transactionStatusLabels[transactionStatus]
    }

    return formatIdentifierLabel(transactionStatus)
}

export function getStatusBadgeVariant(
    transactionStatus: NullableFormatValue<TransactionStatus | string>
): StatusBadgeVariant {
    if (transactionStatus && isTransactionStatus(transactionStatus)) {
        return transactionStatusBadgeVariants[transactionStatus]
    }

    return "secondary"
}

function isTransactionType(transactionType: string): transactionType is TransactionType {
    return transactionType in transactionTypeLabels
}

function isTransactionStatus(transactionStatus: string): transactionStatus is TransactionStatus {
    return transactionStatus in transactionStatusLabels
}
