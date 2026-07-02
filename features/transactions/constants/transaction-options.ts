import type { TransactionStatus, TransactionType } from "@/shared/utils"

export const TRANSACTION_TYPE_OPTIONS = [
    {
        description: "Money coming into an account.",
        label: "Income",
        value: "income",
    },
    {
        description: "Money leaving an account.",
        label: "Expense",
        value: "expense",
    },
    {
        description: "Movement between two accounts.",
        label: "Transfer",
        value: "transfer",
    },
    {
        description: "Manual balance correction.",
        label: "Adjustment",
        value: "adjustment",
    },
] satisfies Array<{
    description: string
    label: string
    value: TransactionType
}>

export const TRANSACTION_STATUS_OPTIONS = [
    {
        label: "Draft",
        value: "draft",
    },
    {
        label: "Pending",
        value: "pending",
    },
    {
        label: "Approved",
        value: "approved",
    },
    {
        label: "Rejected",
        value: "rejected",
    },
    {
        label: "Void",
        value: "void",
    },
] satisfies Array<{
    label: string
    value: TransactionStatus
}>

export const TRANSACTION_PAGE_SIZE = 8
