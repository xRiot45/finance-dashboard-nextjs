"use client"

import { useMemo, useState } from "react"
import { DownloadIcon } from "lucide-react"

import { mockAccounts } from "@/features/accounts"
import { mockBudgets } from "@/features/budgets"
import { mockCategories } from "@/features/categories"
import { ReportBreakdownList } from "@/features/reports/components/report-breakdown-list"
import { ReportControlBar } from "@/features/reports/components/report-control-bar"
import { ReportEvidenceTable } from "@/features/reports/components/report-evidence-table"
import { ReportInsightPanel } from "@/features/reports/components/report-insight-panel"
import { ReportLensChart } from "@/features/reports/components/report-lens-chart"
import { ReportLensSelector } from "@/features/reports/components/report-lens-selector"
import {
    getReportGroupByOption,
    getReportLensOption,
    type ReportLens,
} from "@/features/reports/constants/report-options"
import { buildReportViewModel, type ReportFilterState } from "@/features/reports/utils/report-view-models"
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
import { Skeleton } from "@/shared/components/ui/skeleton"
import { formatNumber } from "@/shared/utils"

const ACTIVE_WORKSPACE_ID = "wks_acme"

const DEFAULT_FILTERS: ReportFilterState = {
    dateFrom: "2026-04-01",
    dateTo: "2026-06-30",
    groupBy: "month",
    savedView: "q2-operating",
}

type ReportDataState = "ready" | "loading" | "error"

export function ReportsWorkbench() {
    const [lens, setLens] = useState<ReportLens>("cash-flow")
    const [filters, setFilters] = useState<ReportFilterState>(DEFAULT_FILTERS)
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
    const [dataState] = useState<ReportDataState>("ready")

    const reportViewModel = useMemo(
        () =>
            buildReportViewModel({
                accounts: mockAccounts,
                budgets: mockBudgets,
                categories: mockCategories,
                filters,
                lens,
                transactions: mockTransactions,
                workspaceId: ACTIVE_WORKSPACE_ID,
            }),
        [filters, lens]
    )
    const lensOption = getReportLensOption(lens)
    const groupByOption = getReportGroupByOption(filters.groupBy)

    function updateFilters(nextFilters: Partial<ReportFilterState>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }))
    }

    function applySavedView(savedView: string) {
        if (savedView === "spend-control") {
            setLens("expenses")
            setFilters({
                dateFrom: "2026-04-01",
                dateTo: "2026-06-30",
                groupBy: "month",
                savedView,
            })
            return
        }

        if (savedView === "revenue-health") {
            setLens("income")
            setFilters({
                dateFrom: "2026-04-01",
                dateTo: "2026-06-30",
                groupBy: "month",
                savedView,
            })
            return
        }

        setLens("cash-flow")
        setFilters({
            dateFrom: "2026-04-01",
            dateTo: "2026-06-30",
            groupBy: "month",
            savedView,
        })
    }

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Reports</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Choose an analysis lens, refine the period, and read the evidence behind income, expenses, cash
                        flow, and budget variance.
                    </p>
                </div>
                <Button onClick={() => setIsExportDialogOpen(true)} type="button">
                    <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                    Export report
                </Button>
            </div>

            <ReportControlBar
                filters={filters}
                onExport={() => setIsExportDialogOpen(true)}
                onFiltersChange={updateFilters}
                onSavedViewChange={applySavedView}
            />

            <ReportLensSelector lens={lens} onLensChange={setLens} />

            {dataState === "error" ? (
                <Alert variant="destructive">
                    <AlertTitle>Report data could not be refreshed</AlertTitle>
                    <AlertDescription>
                        The current local dataset is unavailable. Keep the saved view controls and try again after the
                        report source is ready.
                    </AlertDescription>
                </Alert>
            ) : null}

            {dataState === "loading" ? (
                <ReportLoadingState />
            ) : (
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
                    <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                        <CardHeader>
                            <div>
                                <CardTitle>{lensOption.label} lens</CardTitle>
                                <CardDescription>
                                    Grouped by {groupByOption.label.toLowerCase()} from {filters.dateFrom} to{" "}
                                    {filters.dateTo}.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ReportLensChart
                                breakdown={reportViewModel.breakdown}
                                lens={lens}
                                periodPoints={reportViewModel.periodPoints}
                            />
                        </CardContent>
                    </Card>

                    <ReportInsightPanel lens={lens} summary={reportViewModel.lensSummary} />
                </div>
            )}

            <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
                <Card className="border-border/70 bg-card/95 shadow-xs">
                    <CardHeader>
                        <CardTitle>Top drivers</CardTitle>
                        <CardDescription>
                            The categories or plans most responsible for the current lens.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ReportBreakdownList items={reportViewModel.breakdown} />
                    </CardContent>
                </Card>

                <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                    <CardHeader>
                        <CardTitle>Evidence table</CardTitle>
                        <CardDescription>
                            {formatNumber(reportViewModel.evidenceRows.length)} records supporting this report view.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ReportEvidenceTable rows={reportViewModel.evidenceRows} />
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Export current report</DialogTitle>
                        <DialogDescription>
                            Export will use the {lensOption.label.toLowerCase()} lens,{" "}
                            {groupByOption.label.toLowerCase()} grouping, and the selected date range. This keeps the
                            downloaded report aligned with what you are reviewing on screen.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsExportDialogOpen(false)} type="button" variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={() => setIsExportDialogOpen(false)} type="button">
                            <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                            Export CSV
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function ReportLoadingState() {
    return (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]" aria-label="Loading report analysis">
            <Card className="border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[320px] w-full" />
                </CardContent>
            </Card>
            <Card className="border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Skeleton className="h-24" />
                    <Skeleton className="h-16" />
                </CardContent>
            </Card>
        </div>
    )
}
