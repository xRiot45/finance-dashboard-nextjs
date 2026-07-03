import type { CategoryType } from "@/features/categories"
import { getCategoryTypeOption } from "@/features/categories/constants/category-options"
import { Badge } from "@/shared/components/ui/badge"

type CategoryTypeBadgeProps = {
    type: CategoryType
}

export function CategoryTypeBadge({ type }: CategoryTypeBadgeProps) {
    const option = getCategoryTypeOption(type)
    const Icon = option.icon

    return (
        <Badge variant="outline">
            <Icon aria-hidden="true" data-icon="inline-start" />
            {option.label}
        </Badge>
    )
}
