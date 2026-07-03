import {
    ArrowRightLeftIcon,
    ArchiveIcon,
    CheckCircle2Icon,
    TrendingDownIcon,
    TrendingUpIcon,
    type LucideIcon,
} from "lucide-react"

import type { CategoryStatus, CategoryType } from "@/features/categories"

export type CategoryTypeOption = {
    description: string
    icon: LucideIcon
    label: string
    value: CategoryType
}

export type CategoryStatusOption = {
    description: string
    icon: LucideIcon
    label: string
    value: CategoryStatus
}

export const CATEGORY_TYPE_OPTIONS: CategoryTypeOption[] = [
    {
        description: "Revenue streams and money coming into the workspace.",
        icon: TrendingUpIcon,
        label: "Income",
        value: "income",
    },
    {
        description: "Costs, spend, and outgoing money.",
        icon: TrendingDownIcon,
        label: "Expense",
        value: "expense",
    },
    {
        description: "Internal money movement between accounts.",
        icon: ArrowRightLeftIcon,
        label: "Transfer",
        value: "transfer",
    },
]

export const CATEGORY_STATUS_OPTIONS: CategoryStatusOption[] = [
    {
        description: "Available as a default option in transaction forms.",
        icon: CheckCircle2Icon,
        label: "Active",
        value: "active",
    },
    {
        description: "Hidden from defaults but retained in historical reports.",
        icon: ArchiveIcon,
        label: "Archived",
        value: "archived",
    },
]

export const CATEGORY_ICON_OPTIONS = [
    { label: "Trending up", value: "TrendingUp" },
    { label: "Repeat", value: "Repeat" },
    { label: "Briefcase", value: "BriefcaseBusiness" },
    { label: "Users", value: "Users" },
    { label: "Megaphone", value: "Megaphone" },
    { label: "Package", value: "Package" },
    { label: "Laptop", value: "Laptop" },
    { label: "Plane", value: "Plane" },
    { label: "Receipt", value: "Receipt" },
    { label: "Transfer", value: "ArrowRightLeft" },
] as const

export const CATEGORY_COLOR_OPTIONS = [
    "green",
    "emerald",
    "blue",
    "red",
    "violet",
    "orange",
    "sky",
    "amber",
    "slate",
    "indigo",
] as const

export const CATEGORY_PAGE_SIZE = 8

export function getCategoryTypeOption(type: CategoryType) {
    return CATEGORY_TYPE_OPTIONS.find((option) => option.value === type) ?? CATEGORY_TYPE_OPTIONS[0]
}

export function getCategoryStatusOption(status: CategoryStatus) {
    return CATEGORY_STATUS_OPTIONS.find((option) => option.value === status) ?? CATEGORY_STATUS_OPTIONS[0]
}
