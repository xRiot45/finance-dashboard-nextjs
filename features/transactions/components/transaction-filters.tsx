"use client"

import { RotateCcwIcon, SearchIcon } from "lucide-react"

import type { Account } from "@/features/accounts"
import {
    TRANSACTION_STATUS_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from "@/features/transactions/constants/transaction-options"
import type { TransactionFilterState } from "@/features/transactions/utils/transaction-view-models"
import { Button } from "@/shared/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
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

type TransactionFiltersProps = {
    accounts: Account[]
    filters: TransactionFilterState
    onFiltersChange: (filters: Partial<TransactionFilterState>) => void
    onReset: () => void
    resultCount: number
}

export function TransactionFilters({
    accounts,
    filters,
    onFiltersChange,
    onReset,
    resultCount,
}: TransactionFiltersProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <InputGroup className="h-9 lg:max-w-md">
                    <InputGroupAddon align="inline-start">
                        <SearchIcon aria-hidden="true" />
                    </InputGroupAddon>
                    <InputGroupInput
                        aria-label="Search transactions"
                        onChange={(event) => onFiltersChange({ query: event.target.value })}
                        placeholder="Search reference, merchant, account..."
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

            <FieldGroup className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <Field className="gap-2">
                    <FieldLabel htmlFor="transaction-type-filter">Type</FieldLabel>
                    <Select
                        onValueChange={(value) => onFiltersChange({ type: value as TransactionFilterState["type"] })}
                        value={filters.type}
                    >
                        <SelectTrigger className="w-full" id="transaction-type-filter">
                            <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All types</SelectItem>
                                {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="transaction-status-filter">Status</FieldLabel>
                    <Select
                        onValueChange={(value) =>
                            onFiltersChange({ status: value as TransactionFilterState["status"] })
                        }
                        value={filters.status}
                    >
                        <SelectTrigger className="w-full" id="transaction-status-filter">
                            <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All statuses</SelectItem>
                                {TRANSACTION_STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="transaction-account-filter">Account</FieldLabel>
                    <Select onValueChange={(value) => onFiltersChange({ accountId: value })} value={filters.accountId}>
                        <SelectTrigger className="w-full" id="transaction-account-filter">
                            <SelectValue placeholder="All accounts" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All accounts</SelectItem>
                                {accounts.map((account) => (
                                    <SelectItem key={account.id} value={account.id}>
                                        {account.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="transaction-date-from-filter">From</FieldLabel>
                    <Input
                        id="transaction-date-from-filter"
                        onChange={(event) => onFiltersChange({ dateFrom: event.target.value })}
                        type="date"
                        value={filters.dateFrom}
                    />
                </Field>

                <Field className="gap-2">
                    <FieldLabel htmlFor="transaction-date-to-filter">To</FieldLabel>
                    <Input
                        id="transaction-date-to-filter"
                        onChange={(event) => onFiltersChange({ dateTo: event.target.value })}
                        type="date"
                        value={filters.dateTo}
                    />
                </Field>
            </FieldGroup>
        </div>
    )
}
