import { BadgeCheckIcon, CircleAlertIcon } from "lucide-react"

import { getReportLensOption } from "@/features/reports/constants/report-options"
import type { ReportLens } from "@/features/reports/constants/report-options"
import type { ReportLensSummary } from "@/features/reports/utils/report-view-models"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { cn } from "@/shared/lib/utils"
import { formatCurrency } from "@/shared/utils"

type ReportInsightPanelProps = {
    lens: ReportLens
    summary: ReportLensSummary
}

export function ReportInsightPanel({ lens, summary }: ReportInsightPanelProps) {
    const lensOption = getReportLensOption(lens)
    const isNegative = summary.value < 0
    const Icon = isNegative ? CircleAlertIcon : BadgeCheckIcon

    return (
        <Card className="border-border/70 bg-card/95 shadow-xs">
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <CardTitle>Lens readout</CardTitle>
                        <CardDescription>{lensOption.question}</CardDescription>
                    </div>
                    <Badge variant={isNegative ? "destructive" : "secondary"}>
                        <Icon aria-hidden="true" data-icon="inline-start" />
                        {isNegative ? "Watch" : "Stable"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="rounded-3xl border border-border/70 bg-muted/30 p-4">
                    <p className="text-xs text-muted-foreground">{summary.label}</p>
                    <p className={cn("mt-1 font-mono text-2xl font-semibold", isNegative && "text-destructive")}>
                        {formatCurrency(summary.value)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{summary.helper}</p>
                </div>
                <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">{summary.secondaryLabel}</span>
                        <span className="font-mono font-medium">{formatCurrency(summary.secondaryValue)}</span>
                    </div>
                    <div className="rounded-3xl border border-border/70 p-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase">Key finding</p>
                        <p className="mt-2 text-sm leading-6">{summary.insight}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
