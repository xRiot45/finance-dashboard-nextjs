"use client"

import { CalendarRangeIcon, DownloadIcon, SaveIcon } from "lucide-react"

import {
    REPORT_GROUP_BY_OPTIONS,
    SAVED_REPORT_VIEW_OPTIONS,
    type ReportGroupBy,
} from "@/features/reports/constants/report-options"
import type { ReportFilterState } from "@/features/reports/utils/report-view-models"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"

type ReportControlBarProps = {
    filters: ReportFilterState
    onExport: () => void
    onFiltersChange: (filters: Partial<ReportFilterState>) => void
    onSavedViewChange: (savedView: string) => void
}

export function ReportControlBar({ filters, onExport, onFiltersChange, onSavedViewChange }: ReportControlBarProps) {
    return (
        <div className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-xs">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <FieldGroup className="grid gap-3 md:grid-cols-4 xl:flex-1">
                    <Field className="gap-2">
                        <FieldLabel htmlFor="report-date-from">From</FieldLabel>
                        <Input
                            id="report-date-from"
                            onChange={(event) => onFiltersChange({ dateFrom: event.target.value })}
                            type="date"
                            value={filters.dateFrom}
                        />
                    </Field>
                    <Field className="gap-2">
                        <FieldLabel htmlFor="report-date-to">To</FieldLabel>
                        <Input
                            id="report-date-to"
                            onChange={(event) => onFiltersChange({ dateTo: event.target.value })}
                            type="date"
                            value={filters.dateTo}
                        />
                    </Field>
                    <Field className="gap-2">
                        <FieldLabel htmlFor="report-group-by">Group by</FieldLabel>
                        <Select
                            onValueChange={(value) => onFiltersChange({ groupBy: value as ReportGroupBy })}
                            value={filters.groupBy}
                        >
                            <SelectTrigger className="w-full" id="report-group-by">
                                <SelectValue placeholder="Select grouping" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {REPORT_GROUP_BY_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="gap-2">
                        <FieldLabel htmlFor="report-saved-view">Saved view</FieldLabel>
                        <Select onValueChange={onSavedViewChange} value={filters.savedView}>
                            <SelectTrigger className="w-full" id="report-saved-view">
                                <SelectValue placeholder="Select saved view" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SAVED_REPORT_VIEW_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button className="w-full sm:w-auto" onClick={onExport} type="button" variant="outline">
                        <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                        Export report
                    </Button>
                    <Button className="w-full sm:w-auto" type="button" variant="secondary">
                        <SaveIcon aria-hidden="true" data-icon="inline-start" />
                        Save view
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <CalendarRangeIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <p>
                    Exports follow this date range, grouping, and active analysis lens. Saved views keep the controls
                    reusable for recurring finance reviews.
                </p>
            </div>
        </div>
    )
}
