import type { BudgetStatus, BudgetUsageStatus } from "@/features/budgets"
import { getBudgetStatusOption, getBudgetUsageStatusOption } from "@/features/budgets/constants/budget-options"
import { Badge } from "@/shared/components/ui/badge"

type BudgetStatusBadgeProps = {
    status: BudgetStatus
}

type BudgetUsageStatusBadgeProps = {
    status: BudgetUsageStatus
}

export function BudgetStatusBadge({ status }: BudgetStatusBadgeProps) {
    const option = getBudgetStatusOption(status)
    const Icon = option.icon

    return (
        <Badge variant={status === "active" ? "secondary" : "outline"}>
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}

export function BudgetUsageStatusBadge({ status }: BudgetUsageStatusBadgeProps) {
    const option = getBudgetUsageStatusOption(status)
    const Icon = option.icon

    return (
        <Badge variant={status === "exceeded" ? "destructive" : status === "warning" ? "secondary" : "outline"}>
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}
