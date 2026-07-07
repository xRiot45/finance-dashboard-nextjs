"use client"

import { useMemo, useState } from "react"
import { DownloadIcon, PiggyBankIcon, PlusIcon } from "lucide-react"

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
import { CoreEmptyState } from "@/shared/components/core-empty-state"
import { CoreErrorState } from "@/shared/components/core-error-state"
import { CoreLoadingState } from "@/shared/components/core-loading-state"
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
    const [dataState, setDataState] = useState<BudgetDataState>("ready")
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
    const hasNoBudgets = budgetRows.length === 0
    const hasNoFilteredBudgets = !hasNoBudgets && filteredRows.length === 0

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

            {dataState === "loading" ? (
                <CoreLoadingState
                    description="Loading budget periods, threshold status, category mapping, and runway calculations for the active workspace."
                    icon={PiggyBankIcon}
                    meta="Runway sync"
                    title="Loading budget runway"
                    variant="table"
                />
            ) : dataState === "error" ? (
                <CoreErrorState
                    description="Budgets could not be refreshed, so threshold decisions are paused before showing incomplete spend limits."
                    icon={PiggyBankIcon}
                    onRetry={() => setDataState("ready")}
                    recoveryItems={[
                        "Keep current period filters unchanged.",
                        "Retry budget usage refresh.",
                        "Review exceeded alerts after data returns.",
                    ]}
                    title="Budgets could not be refreshed"
                />
            ) : (
                <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                    <CardHeader>
                        <div>
                            <CardTitle>Budget runway</CardTitle>
                            <CardDescription>
                                {formatNumber(filteredRows.length)} of {formatNumber(budgetRows.length)} budgets visible
                                in the current view.
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
                        <BudgetFilters
                            filters={filters}
                            onFiltersChange={updateFilters}
                            onReset={resetFilters}
                            resultCount={filteredRows.length}
                        />
                        {hasNoBudgets || hasNoFilteredBudgets ? (
                            <CoreEmptyState
                                actions={
                                    hasNoBudgets ? (
                                        <Button onClick={() => setIsRoadmapDialogOpen(true)} type="button">
                                            <PlusIcon aria-hidden="true" data-icon="inline-start" />
                                            Add budget
                                        </Button>
                                    ) : null
                                }
                                description={
                                    hasNoBudgets
                                        ? "This workspace has no budget guardrails yet. Add budgets after categories exist so reports can compare spend against limits."
                                        : "Budget records exist, but the current lifecycle, period, usage, or keyword filters hide every runway row."
                                }
                                icon={PiggyBankIcon}
                                meta={hasNoBudgets ? "No guardrails" : "Filtered view empty"}
                                secondaryAction={
                                    hasNoFilteredBudgets
                                        ? {
                                              label: "Reset filters",
                                              onClick: resetFilters,
                                          }
                                        : undefined
                                }
                                steps={
                                    hasNoBudgets
                                        ? [
                                              "Choose a category to control.",
                                              "Set the period and spend limit.",
                                              "Review warning and exceeded states.",
                                          ]
                                        : [
                                              "Switch lifecycle back to All.",
                                              "Include every period.",
                                              "Clear usage and keyword filters.",
                                          ]
                                }
                                title={hasNoBudgets ? "No budgets yet" : "No matching budgets"}
                            />
                        ) : (
                            <>
                                <BudgetsTable
                                    onArchiveBudget={archiveBudget}
                                    onEditBudget={editBudget}
                                    onViewBudget={viewBudget}
                                    rows={visibleRows}
                                />
                                <BudgetsPagination
                                    currentPage={safePage}
                                    onPageChange={setPage}
                                    pageCount={pageCount}
                                    totalCount={filteredRows.length}
                                />
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

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
