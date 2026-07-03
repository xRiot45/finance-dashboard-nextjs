"use client"

import { FolderTreeIcon } from "lucide-react"

import { CategoryBadge } from "@/features/categories/components/category-badge"
import { CategoryStatusBadge } from "@/features/categories/components/category-status-badge"
import { getCategoryTypeOption } from "@/features/categories/constants/category-options"
import type { CategoryTableRow, CategoryTypeGroup } from "@/features/categories/utils/category-view-models"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components/ui/empty"
import { Progress } from "@/shared/components/ui/progress"
import { formatCurrency, formatNumber, formatPercentage } from "@/shared/utils"

type CategoryUsageBoardProps = {
    groups: CategoryTypeGroup[]
    onViewCategory: (category: CategoryTableRow) => void
}

export function CategoryUsageBoard({ groups, onViewCategory }: CategoryUsageBoardProps) {
    if (groups.every((group) => group.totalCategoryCount === 0)) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FolderTreeIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No category map available</EmptyTitle>
                    <EmptyDescription>
                        Create an income, expense, or transfer category to build the workspace taxonomy.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>The category map follows the same filters as the table below.</p>
                </EmptyContent>
            </Empty>
        )
    }

    return (
        <section className="grid gap-3 xl:grid-cols-3" aria-label="Category map by type">
            {groups.map((group) => {
                const typeOption = getCategoryTypeOption(group.type)
                const Icon = typeOption.icon

                return (
                    <Card className="border-border/70 bg-card/95 shadow-xs" key={group.type}>
                        <CardHeader>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Icon aria-hidden="true" />
                                        {typeOption.label}
                                    </CardTitle>
                                    <CardDescription>
                                        {formatNumber(group.totalCategoryCount)} categories,{" "}
                                        {formatNumber(group.totalTransactionCount)} transactions
                                    </CardDescription>
                                </div>
                                <p className="font-mono text-sm font-medium">
                                    {formatCurrency(group.totalApprovedUsageAmount)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            {group.categories.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                                    No {typeOption.label.toLowerCase()} categories in this view.
                                </p>
                            ) : (
                                group.categories.map((category) => (
                                    <button
                                        className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/20 p-3 text-left transition-colors hover:bg-muted/40"
                                        key={category.id}
                                        onClick={() => onViewCategory(category)}
                                        type="button"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <CategoryBadge category={category} />
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    {category.parentName}
                                                    {category.childCount > 0
                                                        ? ` / ${formatNumber(category.childCount)} children`
                                                        : ""}
                                                </p>
                                            </div>
                                            <CategoryStatusBadge status={category.status} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between gap-3 text-xs">
                                                <span className="text-muted-foreground">Usage share</span>
                                                <span className="font-mono">
                                                    {formatPercentage(category.usageWeightPercentage / 100)}
                                                </span>
                                            </div>
                                            <Progress value={category.usageWeightPercentage} />
                                        </div>
                                    </button>
                                ))
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}
