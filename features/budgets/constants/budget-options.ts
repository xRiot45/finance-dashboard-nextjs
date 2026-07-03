import { ArchiveIcon, CalendarClockIcon, CheckCircle2Icon, CircleAlertIcon, type LucideIcon } from "lucide-react"

import type { BudgetPeriod, BudgetStatus, BudgetUsageStatus } from "@/features/budgets"

export type BudgetPeriodOption = {
    label: string
    value: BudgetPeriod
}

export type BudgetStatusOption = {
    icon: LucideIcon
    label: string
    value: BudgetStatus
}

export type BudgetUsageStatusOption = {
    description: string
    icon: LucideIcon
    label: string
    value: BudgetUsageStatus
}

export const BUDGET_PERIOD_OPTIONS: BudgetPeriodOption[] = [
    {
        label: "Monthly",
        value: "monthly",
    },
    {
        label: "Quarterly",
        value: "quarterly",
    },
    {
        label: "Yearly",
        value: "yearly",
    },
]

export const BUDGET_STATUS_OPTIONS: BudgetStatusOption[] = [
    {
        icon: CheckCircle2Icon,
        label: "Active",
        value: "active",
    },
    {
        icon: CalendarClockIcon,
        label: "Scheduled",
        value: "scheduled",
    },
    {
        icon: ArchiveIcon,
        label: "Archived",
        value: "archived",
    },
]

export const BUDGET_USAGE_STATUS_OPTIONS: BudgetUsageStatusOption[] = [
    {
        description: "Spending is below the configured threshold.",
        icon: CheckCircle2Icon,
        label: "On track",
        value: "safe",
    },
    {
        description: "Spending has reached the warning threshold.",
        icon: CircleAlertIcon,
        label: "Near limit",
        value: "warning",
    },
    {
        description: "Spending is above the budget limit.",
        icon: CircleAlertIcon,
        label: "Over budget",
        value: "exceeded",
    },
]

export const BUDGET_PAGE_SIZE = 6

export function getBudgetPeriodOption(period: BudgetPeriod) {
    return BUDGET_PERIOD_OPTIONS.find((option) => option.value === period) ?? BUDGET_PERIOD_OPTIONS[0]
}

export function getBudgetStatusOption(status: BudgetStatus) {
    return BUDGET_STATUS_OPTIONS.find((option) => option.value === status) ?? BUDGET_STATUS_OPTIONS[0]
}

export function getBudgetUsageStatusOption(status: BudgetUsageStatus) {
    return BUDGET_USAGE_STATUS_OPTIONS.find((option) => option.value === status) ?? BUDGET_USAGE_STATUS_OPTIONS[0]
}
