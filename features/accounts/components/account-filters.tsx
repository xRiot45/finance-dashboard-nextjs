"use client"

import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { ACCOUNT_STATUS_OPTIONS, ACCOUNT_TYPE_OPTIONS } from "@/features/accounts/constants/account-options"
import type { AccountFilterState } from "@/features/accounts/utils/account-view-models"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { formatNumber } from "@/shared/utils"

type AccountFiltersProps = {
    filters: AccountFilterState
    onFiltersChange: (filters: Partial<AccountFilterState>) => void
    onReset: () => void
    resultCount: number
}

export function AccountFilters({ filters, onFiltersChange, onReset, resultCount }: AccountFiltersProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <InputGroup className="h-9 lg:max-w-md">
                    <InputGroupAddon align="inline-start">
                        <SearchIcon aria-hidden="true" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-label="Search accounts"
                        onChange={(event) => onFiltersChange({ query: event.target.value })}
                        placeholder="Search account, bank, wallet..."
                        value={filters.query}
                    />
                </InputGroup>
                <div className="flex items-center justify-between gap-2 lg:justify-end">
                    <p className="text-sm text-muted-foreground">{formatNumber(resultCount)} results</p>
                    <Button onClick={onReset} size="sm" type="button" variant="outline">
                        <RotateCcwIcon aria-hidden="true" data-icon="inline-start" />
                        Reset
                    </Button>
                </div>
            </div>

            <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-2">
                    <FieldLabel htmlFor="account-type-filter">Type</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ type: value as AccountFilterState["type"] })}
                        value={filters.type}
                    >
                        <SelectTrigger className="w-full" id="account-type-filter">
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All types</SelectItem>
                                {ACCOUNT_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="account-status-filter">Status</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ status: value as AccountFilterState["status"] })}
                        value={filters.status}
                    >
                        <SelectTrigger className="w-full" id="account-status-filter">
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All statuses</SelectItem>
                                {ACCOUNT_STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </FieldGroup>
        </div>
    )
}
