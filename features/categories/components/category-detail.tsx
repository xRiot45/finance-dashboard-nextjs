import { CalendarClockIcon, CircleDollarSignIcon, FolderTreeIcon, KeyRoundIcon } from "lucide-react"

import { CategoryBadge } from "@/features/categories/components/category-badge"
import { CategoryStatusBadge } from "@/features/categories/components/category-status-badge"
import { CategoryTypeBadge } from "@/features/categories/components/category-type-badge"
import type { CategoryTableRow } from "@/features/categories/utils/category-view-models"
import { Progress } from "@/shared/components/ui/progress"
import { Separator } from "@/shared/components/ui/separator"
import { formatCurrency, formatDate, formatNumber, formatPercentage } from "@/shared/utils"

type CategoryDetailProps = {
    category: CategoryTableRow | null
}

export function CategoryDetail({ category }: CategoryDetailProps) {
    if (!category) {
        return <p className="text-sm text-muted-foreground">Select a category to review its usage and metadata.</p>
    }

    const metadata = [
        {
            icon: KeyRoundIcon,
            label: "Category ID",
            value: category.id,
        },
        {
            icon: CalendarClockIcon,
            label: "Last updated",
            value: formatDate(category.updatedAt, { dateStyle: "medium", timeStyle: "short" }),
        },
        {
            icon: FolderTreeIcon,
            label: "Children",
            value: formatNumber(category.childCount),
        },
        {
            icon: CircleDollarSignIcon,
            label: "Approved usage",
            value: formatCurrency(category.approvedUsageAmount),
        },
    ]

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-muted/20 p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={category} />
                    <CategoryTypeBadge type={category.type} />
                    <CategoryStatusBadge status={category.status} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Usage share</p>
                    <p className="mt-1 font-mono text-2xl font-semibold">
                        {formatPercentage(category.usageWeightPercentage / 100)}
                    </p>
                </div>
                <Progress value={category.usageWeightPercentage} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {metadata.map((item) => {
                    const Icon = item.icon

                    return (
                        <div className="rounded-3xl border border-border/70 bg-card p-4" key={item.label}>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon aria-hidden="true" />
                                {item.label}
                            </div>
                            <p className="mt-2 truncate font-mono text-sm font-medium">{item.value}</p>
                        </div>
                    )
                })}
            </div>

            <Separator />

            <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                    <p className="text-muted-foreground">Parent</p>
                    <p className="mt-1 font-medium">{category.parentName}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Direct transactions</p>
                    <p className="mt-1 font-mono font-medium">{formatNumber(category.directTransactionCount)}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Pending transactions</p>
                    <p className="mt-1 font-mono font-medium">{formatNumber(category.pendingTransactionCount)}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Archived at</p>
                    <p className="mt-1 font-medium">
                        {category.archivedAt
                            ? formatDate(category.archivedAt, { dateStyle: "medium" })
                            : "Not archived"}
                    </p>
                </div>
            </div>
        </div>
    )
}
