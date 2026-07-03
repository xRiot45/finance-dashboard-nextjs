import type { Category } from "@/features/categories"
import { CategoryColorSwatch } from "@/features/categories/components/category-color-swatch"
import { CategoryIcon } from "@/features/categories/components/category-icon"
import { Badge } from "@/shared/components/ui/badge"

type CategoryBadgeProps = {
    category: Pick<Category, "color" | "icon" | "name">
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
    return (
        <Badge variant="outline">
            <CategoryIcon aria-hidden="true" data-icon="inline-start" name={category.icon} />
            <CategoryColorSwatch color={category.color} label={category.name} />
        </Badge>
    )
}
