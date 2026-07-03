import type { CategoryStatus } from "@/features/categories"
import { getCategoryStatusOption } from "@/features/categories/constants/category-options"
import { Badge } from "@/shared/components/ui/badge"

type CategoryStatusBadgeProps = {
    status: CategoryStatus
}

export function CategoryStatusBadge({ status }: CategoryStatusBadgeProps) {
    const option = getCategoryStatusOption(status)
    const Icon = option.icon

    return (
        <Badge variant={status === "active" ? "secondary" : "outline"}>
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}
