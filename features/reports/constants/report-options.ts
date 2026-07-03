import { ArrowDownRightIcon, ArrowUpRightIcon, ChartNoAxesCombinedIcon, ScaleIcon, type LucideIcon } from "lucide-react"

export type ReportLens = "cash-flow" | "income" | "expenses" | "budgets"
export type ReportGroupBy = "month" | "quarter"

export type ReportLensOption = {
    description: string
    icon: LucideIcon
    label: string
    question: string
    value: ReportLens
}

export type ReportGroupByOption = {
    label: string
    value: ReportGroupBy
}

export const REPORT_LENS_OPTIONS: ReportLensOption[] = [
    {
        description: "Income, expense, and net movement in one view.",
        icon: ChartNoAxesCombinedIcon,
        label: "Cash flow",
        question: "Is cash moving in the right direction?",
        value: "cash-flow",
    },
    {
        description: "Revenue concentration by source category.",
        icon: ArrowUpRightIcon,
        label: "Income",
        question: "Which source is carrying revenue?",
        value: "income",
    },
    {
        description: "Spend pressure by expense category.",
        icon: ArrowDownRightIcon,
        label: "Expenses",
        question: "Where is spend concentrating?",
        value: "expenses",
    },
    {
        description: "Budget plan against tracked actual spend.",
        icon: ScaleIcon,
        label: "Budgets",
        question: "Which plans are drifting?",
        value: "budgets",
    },
]

export const REPORT_GROUP_BY_OPTIONS: ReportGroupByOption[] = [
    {
        label: "Month",
        value: "month",
    },
    {
        label: "Quarter",
        value: "quarter",
    },
]

export const SAVED_REPORT_VIEW_OPTIONS = [
    {
        description: "Q2 monthly operating performance.",
        label: "Q2 operating view",
        value: "q2-operating",
    },
    {
        description: "Expense pressure and budget variance.",
        label: "Spend control review",
        value: "spend-control",
    },
    {
        description: "Revenue source health for management.",
        label: "Revenue health",
        value: "revenue-health",
    },
] as const

export function getReportLensOption(lens: ReportLens) {
    return REPORT_LENS_OPTIONS.find((option) => option.value === lens) ?? REPORT_LENS_OPTIONS[0]
}

export function getReportGroupByOption(groupBy: ReportGroupBy) {
    return REPORT_GROUP_BY_OPTIONS.find((option) => option.value === groupBy) ?? REPORT_GROUP_BY_OPTIONS[0]
}
