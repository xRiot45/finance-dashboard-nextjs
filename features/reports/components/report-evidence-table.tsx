import { ArrowDownRightIcon, ArrowUpRightIcon, ScaleIcon } from "lucide-react"

import type { ReportEvidenceRow } from "@/features/reports/utils/report-view-models"
import { Badge } from "@/shared/components/ui/badge"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components/ui/empty"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { cn } from "@/shared/lib/utils"
import { formatCurrency, formatDate } from "@/shared/utils"

type ReportEvidenceTableProps = {
    rows: ReportEvidenceRow[]
}

export function ReportEvidenceTable({ rows }: ReportEvidenceTableProps) {
    if (rows.length === 0) {
        return (
            <Empty className="border border-border/70 bg-muted/20">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ScaleIcon aria-hidden="true" />
                    </EmptyMedia>
                    <EmptyTitle>No report evidence</EmptyTitle>
                    <EmptyDescription>
                        Change the date range or lens to reveal the transactions and budgets behind this report.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <p>Reports use approved transactions and active budget records in the selected workspace.</p>
                </EmptyContent>
            </Empty>
        )
    }

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Evidence</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => {
                            const Icon =
                                row.type === "income"
                                    ? ArrowUpRightIcon
                                    : row.type === "expense"
                                      ? ArrowDownRightIcon
                                      : ScaleIcon

                            return (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <div className="flex min-w-64 items-start gap-3">
                                            <span className="mt-0.5 flex size-8 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                                                <Icon aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">{row.label}</p>
                                                <p className="truncate text-xs text-muted-foreground">{row.meta}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatDate(row.date, { dateStyle: "medium" })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{row.status}</Badge>
                                    </TableCell>
                                    <TableCell
                                        className={cn(
                                            "text-right font-mono font-medium",
                                            row.type === "expense" && "text-destructive"
                                        )}
                                    >
                                        {row.type === "expense" ? "-" : ""}
                                        {formatCurrency(row.amount)}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="grid gap-3 md:hidden">
                {rows.map((row) => (
                    <div className="rounded-3xl border border-border/70 bg-muted/20 p-4" key={row.id}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="truncate font-medium">{row.label}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{row.meta}</p>
                            </div>
                            <Badge variant="outline">{row.status}</Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">
                                {formatDate(row.date, { dateStyle: "medium" })}
                            </span>
                            <span className={cn("font-mono font-medium", row.type === "expense" && "text-destructive")}>
                                {row.type === "expense" ? "-" : ""}
                                {formatCurrency(row.amount)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
