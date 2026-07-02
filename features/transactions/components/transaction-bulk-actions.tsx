"use client"

import { ArchiveIcon, CheckCheckIcon, DownloadIcon, FolderInputIcon, XIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { formatNumber } from "@/shared/utils"

type TransactionBulkActionsProps = {
    onClearSelection: () => void
    selectedCount: number
}

export function TransactionBulkActions({ onClearSelection, selectedCount }: TransactionBulkActionsProps) {
    if (selectedCount === 0) {
        return null
    }

    return (
        <div className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-muted/30 p-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium">{formatNumber(selectedCount)} selected</p>
            <div className="flex flex-wrap gap-2">
                <Button size="sm" type="button" variant="outline">
                    <FolderInputIcon aria-hidden="true" data-icon="inline-start" />
                    Categorize
                </Button>
                <Button size="sm" type="button" variant="outline">
                    <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                    Export
                </Button>
                <Button size="sm" type="button" variant="outline">
                    <CheckCheckIcon aria-hidden="true" data-icon="inline-start" />
                    Submit
                </Button>
                <Button size="sm" type="button" variant="destructive">
                    <ArchiveIcon aria-hidden="true" data-icon="inline-start" />
                    Archive
                </Button>
                <Button
                    aria-label="Clear selection"
                    onClick={onClearSelection}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                >
                    <XIcon aria-hidden="true" />
                </Button>
            </div>
        </div>
    )
}
