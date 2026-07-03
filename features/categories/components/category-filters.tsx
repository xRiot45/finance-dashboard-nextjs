"use client"

import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { CATEGORY_STATUS_OPTIONS, CATEGORY_TYPE_OPTIONS } from "@/features/categories/constants/category-options"
import type { CategoryFilterState } from "@/features/categories/utils/category-view-models"
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
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"
import { formatNumber } from "@/shared/utils"

type CategoryFiltersProps = {
    filters: CategoryFilterState
    onFiltersChange: (filters: Partial<CategoryFilterState>) => void
    onReset: () => void
    resultCount: number
}

export function CategoryFilters({ filters, onFiltersChange, onReset, resultCount }: CategoryFiltersProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <InputGroup className="h-9 lg:max-w-md">
                    <InputGroupAddon align="inline-start">
                        <SearchIcon aria-hidden="true" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-label="Search categories"
                        onChange={(event) => onFiltersChange({ query: event.target.value })}
                        placeholder="Search name, parent, icon..."
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

            <FieldGroup className="grid gap-3 lg:grid-cols-[1fr_220px]">
                <Field className="gap-2">
                    <FieldLabel id="category-type-filter-label">Type</FieldLabel>
                    <ToggleGroup
                        aria-labelledby="category-type-filter-label"
                        className="flex-wrap"
                        onValueChange={(value) => {
                            if (value) {
                                onFiltersChange({ type: value as CategoryFilterState["type"] })
                            }
                        }}
                        type="single"
                        value={filters.type}
                        variant="outline"
                    >
                        <ToggleGroupItem value="all">All</ToggleGroupItem>
                        {CATEGORY_TYPE_OPTIONS.map((option) => (
                            <ToggleGroupItem key={option.value} value={option.value}>
                                <option.icon aria-hidden="true" />
                                {option.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="category-status-filter">Status</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ status: value as CategoryFilterState["status"] })}
                        value={filters.status}
                    >
                        <SelectTrigger className="w-full" id="category-status-filter">
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All statuses</SelectItem>
                                {CATEGORY_STATUS_OPTIONS.map((option) => (
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
