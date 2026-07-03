"use client"

import { useMemo, useState } from "react"
import { AlertCircleIcon, DownloadIcon, PlusIcon } from "lucide-react"

import {
    CategoryForm,
    type CategoryFormErrors,
    type CategoryFormMode,
    type CategoryFormValues,
} from "@/features/categories/components/category-form"
import { CategoryDetail } from "@/features/categories/components/category-detail"
import { CategoryFilters } from "@/features/categories/components/category-filters"
import { CategorySummaryCards } from "@/features/categories/components/category-summary-cards"
import { CategoryUsageBoard } from "@/features/categories/components/category-usage-board"
import { CategoriesPagination } from "@/features/categories/components/categories-pagination"
import { CategoriesTable } from "@/features/categories/components/categories-table"
import {
    CATEGORY_COLOR_OPTIONS,
    CATEGORY_ICON_OPTIONS,
    CATEGORY_PAGE_SIZE,
} from "@/features/categories/constants/category-options"
import { mockCategories, type Category } from "@/features/categories/data/categories.data"
import {
    filterCategoryRows,
    groupCategoryRowsByType,
    mapCategoryRows,
    paginateCategoryRows,
    summarizeCategories,
    type CategoryFilterState,
    type CategoryTableRow,
} from "@/features/categories/utils/category-view-models"
import { mockTransactions } from "@/features/transactions"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { formatNumber } from "@/shared/utils"

const ACTIVE_WORKSPACE_ID = "wks_acme"

const DEFAULT_FILTERS: CategoryFilterState = {
    query: "",
    status: "all",
    type: "all",
}

const DEFAULT_FORM_VALUES: CategoryFormValues = {
    color: "blue",
    icon: "Tags",
    name: "New finance category",
    parentId: "none",
    status: "active",
    type: "expense",
}

type CategoryDataState = "ready" | "loading" | "error"

export function CategoriesWorkbench() {
    const [categories, setCategories] = useState<Category[]>(mockCategories)
    const [dataState, setDataState] = useState<CategoryDataState>("ready")
    const [filters, setFilters] = useState<CategoryFilterState>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [selectedCategoryId, setSelectedCategoryId] = useState(mockCategories[0]?.id ?? null)
    const [formMode, setFormMode] = useState<CategoryFormMode>("create")
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
    const [formValues, setFormValues] = useState<CategoryFormValues>(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState<CategoryFormErrors>({})
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

    const workspaceCategories = useMemo(
        () => categories.filter((category) => category.workspaceId === ACTIVE_WORKSPACE_ID),
        [categories]
    )
    const workspaceTransactions = useMemo(
        () => mockTransactions.filter((transaction) => transaction.workspaceId === ACTIVE_WORKSPACE_ID),
        []
    )
    const categoryRows = useMemo(
        () => mapCategoryRows(workspaceCategories, workspaceTransactions),
        [workspaceCategories, workspaceTransactions]
    )
    const filteredRows = useMemo(() => filterCategoryRows(categoryRows, filters), [categoryRows, filters])
    const typeGroups = useMemo(() => groupCategoryRowsByType(filteredRows), [filteredRows])
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / CATEGORY_PAGE_SIZE))
    const safePage = Math.min(page, pageCount)
    const visibleRows = useMemo(
        () => paginateCategoryRows(filteredRows, safePage, CATEGORY_PAGE_SIZE),
        [filteredRows, safePage]
    )
    const summary = useMemo(() => summarizeCategories(filteredRows), [filteredRows])
    const selectedCategory = categoryRows.find((category) => category.id === selectedCategoryId) ?? null

    function updateFilters(nextFilters: Partial<CategoryFilterState>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }))
        setPage(1)
    }

    function resetFilters() {
        setFilters(DEFAULT_FILTERS)
        setPage(1)
    }

    function startCreateCategory() {
        setFormMode("create")
        setEditingCategoryId(null)
        setFormValues(DEFAULT_FORM_VALUES)
        setFormErrors({})
        setIsFormDialogOpen(true)
    }

    function startEditCategory(category: CategoryTableRow) {
        setFormMode("edit")
        setEditingCategoryId(category.id)
        setSelectedCategoryId(category.id)
        setFormValues(mapCategoryToFormValues(category))
        setFormErrors({})
        setIsDetailDialogOpen(false)
        setIsFormDialogOpen(true)
    }

    function viewCategory(category: CategoryTableRow) {
        setSelectedCategoryId(category.id)
        setIsDetailDialogOpen(true)
    }

    function archiveCategory(category: CategoryTableRow) {
        const timestamp = new Date().toISOString()

        setCategories((currentCategories) =>
            currentCategories.map((currentCategory) =>
                currentCategory.id === category.id
                    ? {
                          ...currentCategory,
                          archivedAt: timestamp,
                          status: "archived",
                          updatedAt: timestamp,
                      }
                    : currentCategory
            )
        )
    }

    function saveCategory() {
        const nextErrors = validateCategoryForm(formValues, editingCategoryId)

        setFormErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        const nextCategory = buildCategoryFromFormValues({
            categoryCount: categories.length,
            existingCategory: categories.find((category) => category.id === editingCategoryId) ?? null,
            formMode,
            formValues,
        })

        setCategories((currentCategories) => {
            if (formMode === "edit" && editingCategoryId) {
                return currentCategories.map((category) =>
                    category.id === editingCategoryId ? nextCategory : category
                )
            }

            return [nextCategory, ...currentCategories]
        })
        setSelectedCategoryId(nextCategory.id)
        setFormMode("edit")
        setEditingCategoryId(nextCategory.id)
        setFormValues(mapCategoryToFormValues(nextCategory))
        setFormErrors({})
        setDataState("ready")
        setIsFormDialogOpen(false)
        setIsDetailDialogOpen(true)
    }

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Categories</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Build the finance taxonomy used by transactions, budgets, reports, and controls.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={startCreateCategory} type="button">
                        <PlusIcon aria-hidden="true" data-icon="inline-start" />
                        Add category
                    </Button>
                    <Button type="button" variant="outline">
                        <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <CategorySummaryCards summary={summary} />

            <CategoryUsageBoard groups={typeGroups} onViewCategory={viewCategory} />

            <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <div>
                        <CardTitle>Category registry</CardTitle>
                        <CardDescription>
                            {formatNumber(filteredRows.length)} of {formatNumber(categoryRows.length)} categories
                            visible in the current view.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {dataState === "error" ? (
                        <Alert variant="destructive">
                            <AlertCircleIcon aria-hidden="true" />
                            <AlertTitle>Categories could not be refreshed</AlertTitle>
                            <AlertDescription>
                                The local data state is showing an error pattern. Try again or continue editing the
                                current category draft list.
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    <CategoryFilters
                        filters={filters}
                        onFiltersChange={updateFilters}
                        onReset={resetFilters}
                        resultCount={filteredRows.length}
                    />
                    <CategoriesTable
                        isLoading={dataState === "loading"}
                        onArchiveCategory={archiveCategory}
                        onEditCategory={startEditCategory}
                        onViewCategory={viewCategory}
                        rows={dataState === "error" ? [] : visibleRows}
                    />
                    <CategoriesPagination
                        currentPage={safePage}
                        onPageChange={setPage}
                        pageCount={pageCount}
                        totalCount={filteredRows.length}
                    />
                </CardContent>
            </Card>

            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="scrollbar-thin max-h-[min(760px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-2xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{selectedCategory?.name ?? "Category detail"}</DialogTitle>
                        <DialogDescription>
                            {selectedCategory?.parentName ?? "Review the selected category usage and metadata."}
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryDetail category={selectedCategory} />
                    <DialogFooter>
                        <Button
                            disabled={!selectedCategory}
                            onClick={() => {
                                if (selectedCategory) {
                                    startEditCategory(selectedCategory)
                                }
                            }}
                            type="button"
                        >
                            Edit category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isFormDialogOpen}
                onOpenChange={(open) => {
                    setIsFormDialogOpen(open)

                    if (!open) {
                        setFormErrors({})
                    }
                }}
            >
                <DialogContent className="scrollbar-thin max-h-[min(820px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-3xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{formMode === "create" ? "Add category" : "Edit category"}</DialogTitle>
                        <DialogDescription>
                            Configure the category shown in transactions, budgets, and finance reports.
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryForm
                        categories={workspaceCategories}
                        editingCategoryId={editingCategoryId}
                        errors={formErrors}
                        mode={formMode}
                        onChange={(nextValues) => {
                            setFormValues((currentValues) => ({ ...currentValues, ...nextValues }))
                            setFormErrors({})
                        }}
                        onReset={startCreateCategory}
                        onSubmit={saveCategory}
                        values={formValues}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function mapCategoryToFormValues(category: Category): CategoryFormValues {
    return {
        color: category.color,
        icon: category.icon,
        name: category.name,
        parentId: category.parentId ?? "none",
        status: category.status,
        type: category.type,
    }
}

function validateCategoryForm(values: CategoryFormValues, editingCategoryId: string | null): CategoryFormErrors {
    const errors: CategoryFormErrors = {}

    if (values.name.trim().length < 3) {
        errors.name = "Category name must contain at least 3 characters."
    }

    if (values.parentId === editingCategoryId) {
        errors.parentId = "A category cannot be its own parent."
    }

    if (!CATEGORY_ICON_OPTIONS.some((option) => option.value === values.icon)) {
        errors.icon = "Select a supported category icon."
    }

    if (!CATEGORY_COLOR_OPTIONS.includes(values.color as (typeof CATEGORY_COLOR_OPTIONS)[number])) {
        errors.color = "Select a supported category color."
    }

    return errors
}

function buildCategoryFromFormValues({
    categoryCount,
    existingCategory,
    formMode,
    formValues,
}: {
    categoryCount: number
    existingCategory: Category | null
    formMode: CategoryFormMode
    formValues: CategoryFormValues
}) {
    const timestamp = new Date().toISOString()
    const categoryNumber = String(categoryCount + 1).padStart(3, "0")
    const categoryId = formMode === "edit" && existingCategory ? existingCategory.id : `cat_local_${categoryNumber}`

    return {
        archivedAt: formValues.status === "archived" ? (existingCategory?.archivedAt ?? timestamp) : null,
        color: formValues.color,
        createdAt: existingCategory?.createdAt ?? timestamp,
        createdBy: existingCategory?.createdBy ?? "usr_anna",
        icon: formValues.icon,
        id: categoryId,
        name: formValues.name.trim(),
        parentId: formValues.parentId === "none" ? null : formValues.parentId,
        status: formValues.status,
        type: formValues.type,
        updatedAt: timestamp,
        updatedBy: "usr_anna",
        workspaceId: ACTIVE_WORKSPACE_ID,
    } satisfies Category
}
