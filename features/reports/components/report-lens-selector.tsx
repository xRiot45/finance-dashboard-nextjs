"use client"

import { REPORT_LENS_OPTIONS, type ReportLens } from "@/features/reports/constants/report-options"
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"
import { cn } from "@/shared/lib/utils"

type ReportLensSelectorProps = {
    lens: ReportLens
    onLensChange: (lens: ReportLens) => void
}

export function ReportLensSelector({ lens, onLensChange }: ReportLensSelectorProps) {
    return (
        <section aria-label="Report analysis lenses" className="grid gap-3 lg:grid-cols-4">
            <ToggleGroup
                className="contents"
                onValueChange={(value) => {
                    if (value) {
                        onLensChange(value as ReportLens)
                    }
                }}
                type="single"
                value={lens}
                variant="outline"
            >
                {REPORT_LENS_OPTIONS.map((option) => {
                    const Icon = option.icon
                    const isSelected = option.value === lens

                    return (
                        <ToggleGroupItem
                            aria-label={option.label}
                            className={cn(
                                "h-auto min-h-28 w-full justify-start rounded-3xl border-border/70 bg-card/95 p-4 text-left shadow-xs data-[state=on]:border-foreground data-[state=on]:bg-card",
                                "flex flex-col items-start gap-3 whitespace-normal"
                            )}
                            key={option.value}
                            value={option.value}
                        >
                            <span
                                className={cn(
                                    "flex size-9 items-center justify-center rounded-2xl bg-muted text-muted-foreground",
                                    isSelected && "bg-primary text-primary-foreground"
                                )}
                            >
                                <Icon aria-hidden="true" />
                            </span>
                            <span className="flex min-w-0 flex-col gap-1">
                                <span className="font-medium">{option.label}</span>
                                <span className="text-xs leading-5 text-muted-foreground">{option.question}</span>
                            </span>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    )
}
