"use client"

import { RotateCcwIcon, SearchIcon } from "lucide-react"

import {
    BUDGET_PERIOD_OPTIONS,
    BUDGET_STATUS_OPTIONS,
    BUDGET_USAGE_STATUS_OPTIONS,
} from "@/features/budgets/constants/budget-options"
import type { BudgetFilterState } from "@/features/budgets/utils/budget-view-models"
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

type BudgetFiltersProps = {
    filters: BudgetFilterState
    onFiltersChange: (filters: Partial<BudgetFilterState>) => void
    onReset: () => void
    resultCount: number
}

export function BudgetFilters({ filters, onFiltersChange, onReset, resultCount }: BudgetFiltersProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <InputGroup className="h-9 lg:max-w-md">
                    <InputGroupAddon align="inline-start">
                        <SearchIcon aria-hidden="true" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-label="Search budgets"
                        onChange={(event) => onFiltersChange({ query: event.target.value })}
                        placeholder="Search budget, category, period..."
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

            <FieldGroup className="grid gap-3 md:grid-cols-3">
                <Field className="gap-2">
                    <FieldLabel htmlFor="budget-period-filter">Period</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ period: value as BudgetFilterState["period"] })}
                        value={filters.period}
                    >
                        <SelectTrigger className="w-full" id="budget-period-filter">
                            <SelectValue placeholder="All periods" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All periods</SelectItem>
                                {BUDGET_PERIOD_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="budget-status-filter">Lifecycle</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ status: value as BudgetFilterState["status"] })}
                        value={filters.status}
                    >
                        <SelectTrigger className="w-full" id="budget-status-filter">
                            <SelectValue placeholder="All lifecycle states" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All lifecycle states</SelectItem>
                                {BUDGET_STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="budget-usage-filter">Usage state</FieldLabel>
                    <Select
                        onValueChange={(value) =>
                            onFiltersChange({ usageStatus: value as BudgetFilterState["usageStatus"] })
                        }
                        value={filters.usageStatus}
                    >
                        <SelectTrigger className="w-full" id="budget-usage-filter">
                            <SelectValue placeholder="All usage states" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All usage states</SelectItem>
                                {BUDGET_USAGE_STATUS_OPTIONS.map((option) => (
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
