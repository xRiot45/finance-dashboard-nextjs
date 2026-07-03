import { CircleAlertIcon } from "lucide-react"

import type { BudgetTableRow } from "@/features/budgets/utils/budget-view-models"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { formatCurrency, formatNumber } from "@/shared/utils"

type BudgetRiskAlertsProps = {
    rows: BudgetTableRow[]
}

export function BudgetRiskAlerts({ rows }: BudgetRiskAlertsProps) {
    const exceededRows = rows.filter((row) => row.status === "active" && row.usageStatus === "exceeded")
    const warningRows = rows.filter((row) => row.status === "active" && row.usageStatus === "warning")

    if (exceededRows.length === 0 && warningRows.length === 0) {
        return null
    }

    const largestExceededRow = exceededRows.toSorted((firstRow, secondRow) => {
        return Math.abs(secondRow.remainingAmount) - Math.abs(firstRow.remainingAmount)
    })[0]

    if (largestExceededRow) {
        return (
            <Alert variant="destructive">
                <CircleAlertIcon aria-hidden="true" />
                <AlertTitle>{formatNumber(exceededRows.length)} active budgets are over limit</AlertTitle>
                <AlertDescription>
                    {largestExceededRow.name} is over by{" "}
                    {formatCurrency(Math.abs(largestExceededRow.remainingAmount), {
                        currency: largestExceededRow.currency,
                    })}
                    . Review spending before approving more expenses.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Alert>
            <CircleAlertIcon aria-hidden="true" />
            <AlertTitle>{formatNumber(warningRows.length)} active budgets are near limit</AlertTitle>
            <AlertDescription>
                Thresholds have been reached. Check the runway column to see which categories need attention first.
            </AlertDescription>
        </Alert>
    )
}
