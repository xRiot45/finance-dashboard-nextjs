"use client"

import { useMemo, useState } from "react"
import { AlertCircleIcon, DownloadIcon, PlusIcon } from "lucide-react"

import { BudgetDetail } from "@/features/budgets/components/budget-detail"
import { BudgetFilters } from "@/features/budgets/components/budget-filters"
import { BudgetRiskAlerts } from "@/features/budgets/components/budget-risk-alerts"
import { BudgetSummaryCards } from "@/features/budgets/components/budget-summary-cards"
import { BudgetsPagination } from "@/features/budgets/components/budgets-pagination"
import { BudgetsTable } from "@/features/budgets/components/budgets-table"
import { BUDGET_PAGE_SIZE } from "@/features/budgets/constants/budget-options"
import { mockBudgets, type Budget } from "@/features/budgets/data/budgets.data"
import {
    filterBudgetRows,
    mapBudgetRows,
    paginateBudgetRows,
    summarizeBudgets,
    type BudgetFilterState,
    type BudgetTableRow,
} from "@/features/budgets/utils/budget-view-models"
import { mockCategories } from "@/features/categories"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { formatNumber } from "@/shared/utils"

const ACTIVE_WORKSPACE_ID = "wks_acme"

const DEFAULT_FILTERS: BudgetFilterState = {
    period: "all",
    query: "",
    status: "all",
    usageStatus: "all",
}

type BudgetDataState = "ready" | "loading" | "error"

export function BudgetsWorkbench() {
    const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
    const [dataState] = useState<BudgetDataState>("ready")
    const [filters, setFilters] = useState<BudgetFilterState>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [selectedBudgetId, setSelectedBudgetId] = useState(mockBudgets[0]?.id ?? null)
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isRoadmapDialogOpen, setIsRoadmapDialogOpen] = useState(false)

    const workspaceBudgets = useMemo(
        () => budgets.filter((budget) => budget.workspaceId === ACTIVE_WORKSPACE_ID),
        [budgets]
    )
    const workspaceCategories = useMemo(
        () => mockCategories.filter((category) => category.workspaceId === ACTIVE_WORKSPACE_ID),
        []
    )
    const budgetRows = useMemo(
        () => mapBudgetRows(workspaceBudgets, workspaceCategories),
        [workspaceBudgets, workspaceCategories]
    )
    const filteredRows = useMemo(() => filterBudgetRows(budgetRows, filters), [budgetRows, filters])
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / BUDGET_PAGE_SIZE))
    const safePage = Math.min(page, pageCount)
    const visibleRows = useMemo(
        () => paginateBudgetRows(filteredRows, safePage, BUDGET_PAGE_SIZE),
        [filteredRows, safePage]
    )
    const summary = useMemo(() => summarizeBudgets(filteredRows), [filteredRows])
    const selectedBudget = budgetRows.find((budget) => budget.id === selectedBudgetId) ?? null

    function updateFilters(nextFilters: Partial<BudgetFilterState>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }))
        setPage(1)
    }

    function resetFilters() {
        setFilters(DEFAULT_FILTERS)
        setPage(1)
    }

    function applyBudgetView(view: string) {
        if (view === "attention") {
            updateFilters({ status: "active", usageStatus: "warning" })
            return
        }

        if (view === "exceeded") {
            updateFilters({ status: "active", usageStatus: "exceeded" })
            return
        }

        if (view === "scheduled") {
            updateFilters({ status: "scheduled", usageStatus: "all" })
            return
        }

        resetFilters()
    }

    function viewBudget(budget: BudgetTableRow) {
        setSelectedBudgetId(budget.id)
        setIsDetailDialogOpen(true)
    }

    function editBudget(budget: BudgetTableRow) {
        setSelectedBudgetId(budget.id)
        setIsRoadmapDialogOpen(true)
    }

    function archiveBudget(budget: BudgetTableRow) {
        const timestamp = new Date().toISOString()

        setBudgets((currentBudgets) =>
            currentBudgets.map((currentBudget) =>
                currentBudget.id === budget.id
                    ? {
                          ...currentBudget,
                          archivedAt: timestamp,
                          status: "archived",
                          updatedAt: timestamp,
                      }
                    : currentBudget
            )
        )
    }

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Budgets</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Track category spending, runway, and threshold alerts before a budget becomes a problem.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setIsRoadmapDialogOpen(true)} type="button">
                        <PlusIcon aria-hidden="true" data-icon="inline-start" />
                        Add budget
                    </Button>
                    <Button type="button" variant="outline">
                        <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <BudgetSummaryCards summary={summary} />

            <BudgetRiskAlerts rows={budgetRows} />

            <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <div>
                        <CardTitle>Budget runway</CardTitle>
                        <CardDescription>
                            {formatNumber(filteredRows.length)} of {formatNumber(budgetRows.length)} budgets visible in
                            the current view.
                        </CardDescription>
                    </div>
                    <CardAction>
                        <Tabs defaultValue="all" onValueChange={applyBudgetView}>
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="attention">Near limit</TabsTrigger>
                                <TabsTrigger value="exceeded">Over</TabsTrigger>
                                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {dataState === "error" ? (
                        <Alert variant="destructive">
                            <AlertCircleIcon aria-hidden="true" />
                            <AlertTitle>Budgets could not be refreshed</AlertTitle>
                            <AlertDescription>
                                The local data state is showing an error pattern. Continue with the current list or try
                                again after data is available.
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    <BudgetFilters
                        filters={filters}
                        onFiltersChange={updateFilters}
                        onReset={resetFilters}
                        resultCount={filteredRows.length}
                    />
                    <BudgetsTable
                        isLoading={dataState === "loading"}
                        onArchiveBudget={archiveBudget}
                        onEditBudget={editBudget}
                        onViewBudget={viewBudget}
                        rows={dataState === "error" ? [] : visibleRows}
                    />
                    <BudgetsPagination
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
                        <DialogTitle>{selectedBudget?.name ?? "Budget detail"}</DialogTitle>
                        <DialogDescription>
                            {selectedBudget?.categoryName ?? "Review budget usage, threshold, and period coverage."}
                        </DialogDescription>
                    </DialogHeader>
                    <BudgetDetail budget={selectedBudget} />
                    <DialogFooter>
                        <Button
                            disabled={!selectedBudget}
                            onClick={() => {
                                if (selectedBudget) {
                                    editBudget(selectedBudget)
                                }
                            }}
                            type="button"
                        >
                            Edit budget
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isRoadmapDialogOpen} onOpenChange={setIsRoadmapDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Budget form is next</DialogTitle>
                        <DialogDescription>
                            This workbench focuses on list visibility, usage, warning, and exceeded states. The create
                            and edit form can reuse the same category, period, threshold, and amount model.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsRoadmapDialogOpen(false)} type="button">
                            Got it
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
