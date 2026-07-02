"use client"

import { PaperclipIcon, RotateCcwIcon, SaveIcon } from "lucide-react"

import type { Account } from "@/features/accounts"
import type { Category } from "@/features/categories"
import {
    TRANSACTION_STATUS_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from "@/features/transactions/constants/transaction-options"
import { Button } from "@/shared/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/shared/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import type { TransactionStatus, TransactionType } from "@/shared/utils"

export type TransactionFormMode = "create" | "edit"

export type TransactionFormValues = {
    accountId: string
    amount: string
    categoryId: string
    currency: string
    date: string
    description: string
    destinationAccountId: string
    merchant: string
    notes: string
    status: TransactionStatus
    tags: string
    type: TransactionType
}

export type TransactionFormErrors = Partial<Record<keyof TransactionFormValues, string>>

type TransactionFormProps = {
    accounts: Account[]
    categories: Category[]
    errors: TransactionFormErrors
    mode: TransactionFormMode
    onChange: (values: Partial<TransactionFormValues>) => void
    onReset: () => void
    onSubmit: () => void
    values: TransactionFormValues
}

export function TransactionForm({
    accounts,
    categories,
    errors,
    mode,
    onChange,
    onReset,
    onSubmit,
    values,
}: TransactionFormProps) {
    const isTransfer = values.type === "transfer"
    const requiresCategory = values.type === "income" || values.type === "expense"
    const categoryOptions = categories.filter(
        (category) => category.type === values.type || category.type === "transfer"
    )

    return (
        <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
                event.preventDefault()
                onSubmit()
            }}
        >
            <FieldSet>
                <FieldLegend>Transaction basics</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2" data-invalid={Boolean(errors.type)}>
                        <FieldLabel htmlFor="transaction-type">Type</FieldLabel>
                        <Select
                            onValueChange={(value) =>
                                onChange({
                                    categoryId: "none",
                                    destinationAccountId: "none",
                                    type: value as TransactionType,
                                })
                            }
                            value={values.type}
                        >
                            <SelectTrigger aria-invalid={Boolean(errors.type)} className="w-full" id="transaction-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{errors.type}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.status)}>
                        <FieldLabel htmlFor="transaction-status">Status</FieldLabel>
                        <Select
                            onValueChange={(value) => onChange({ status: value as TransactionStatus })}
                            value={values.status}
                        >
                            <SelectTrigger
                                aria-invalid={Boolean(errors.status)}
                                className="w-full"
                                id="transaction-status"
                            >
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {TRANSACTION_STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{errors.status}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.amount)}>
                        <FieldLabel htmlFor="transaction-amount">Amount</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon align="inline-start">
                                <InputGroupText>{values.currency}</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                aria-invalid={Boolean(errors.amount)}
                                id="transaction-amount"
                                inputMode="decimal"
                                onChange={(event) => onChange({ amount: event.target.value })}
                                placeholder="0"
                                value={values.amount}
                            />
                        </InputGroup>
                        <FieldError>{errors.amount}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.date)}>
                        <FieldLabel htmlFor="transaction-date">Date</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.date)}
                            id="transaction-date"
                            onChange={(event) => onChange({ date: event.target.value })}
                            type="date"
                            value={values.date}
                        />
                        <FieldError>{errors.date}</FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Account and category</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2" data-invalid={Boolean(errors.accountId)}>
                        <FieldLabel htmlFor="transaction-account">Source account</FieldLabel>
                        <Select onValueChange={(value) => onChange({ accountId: value })} value={values.accountId}>
                            <SelectTrigger
                                aria-invalid={Boolean(errors.accountId)}
                                className="w-full"
                                id="transaction-account"
                            >
                                <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={account.id}>
                                            {account.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldDescription>Choose where this transaction affects the ledger.</FieldDescription>
                        <FieldError>{errors.accountId}</FieldError>
                    </Field>

                    {isTransfer ? (
                        <Field className="gap-2" data-invalid={Boolean(errors.destinationAccountId)}>
                            <FieldLabel htmlFor="transaction-destination-account">Destination account</FieldLabel>
                            <Select
                                onValueChange={(value) => onChange({ destinationAccountId: value })}
                                value={values.destinationAccountId}
                            >
                                <SelectTrigger
                                    aria-invalid={Boolean(errors.destinationAccountId)}
                                    className="w-full"
                                    id="transaction-destination-account"
                                >
                                    <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="none">Select destination</SelectItem>
                                        {accounts.map((account) => (
                                            <SelectItem key={account.id} value={account.id}>
                                                {account.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.destinationAccountId}</FieldError>
                        </Field>
                    ) : (
                        <Field className="gap-2" data-invalid={Boolean(errors.categoryId)}>
                            <FieldLabel htmlFor="transaction-category">
                                Category{requiresCategory ? "" : " optional"}
                            </FieldLabel>
                            <Select
                                onValueChange={(value) => onChange({ categoryId: value })}
                                value={values.categoryId}
                            >
                                <SelectTrigger
                                    aria-invalid={Boolean(errors.categoryId)}
                                    className="w-full"
                                    id="transaction-category"
                                >
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="none">Uncategorized</SelectItem>
                                        {categoryOptions.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{errors.categoryId}</FieldError>
                        </Field>
                    )}
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Supporting details</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2" data-invalid={Boolean(errors.description)}>
                        <FieldLabel htmlFor="transaction-description">Description</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.description)}
                            id="transaction-description"
                            onChange={(event) => onChange({ description: event.target.value })}
                            placeholder="Client invoice, payroll batch, renewal..."
                            value={values.description}
                        />
                        <FieldError>{errors.description}</FieldError>
                    </Field>

                    <Field className="gap-2">
                        <FieldLabel htmlFor="transaction-merchant">Merchant</FieldLabel>
                        <Input
                            id="transaction-merchant"
                            onChange={(event) => onChange({ merchant: event.target.value })}
                            placeholder="Vendor or customer"
                            value={values.merchant}
                        />
                    </Field>

                    <Field className="gap-2 md:col-span-2">
                        <FieldLabel htmlFor="transaction-tags">Tags</FieldLabel>
                        <Input
                            id="transaction-tags"
                            onChange={(event) => onChange({ tags: event.target.value })}
                            placeholder="subscription, invoice, q2"
                            value={values.tags}
                        />
                        <FieldDescription>Separate tags with commas.</FieldDescription>
                    </Field>

                    <Field className="gap-2 md:col-span-2">
                        <FieldLabel htmlFor="transaction-notes">Notes optional</FieldLabel>
                        <Textarea
                            id="transaction-notes"
                            onChange={(event) => onChange({ notes: event.target.value })}
                            placeholder="Add approval context, invoice notes, or reconciliation detail."
                            value={values.notes}
                        />
                    </Field>

                    <Field className="gap-2 md:col-span-2">
                        <FieldLabel htmlFor="transaction-attachment">Attachment optional</FieldLabel>
                        <Input id="transaction-attachment" type="file" />
                        <FieldDescription>
                            <PaperclipIcon aria-hidden="true" className="mr-1 inline size-3.5" />
                            Upload receipts, invoices, or reconciliation evidence.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <div className="flex flex-col-reverse gap-2 border-t border-border/70 pt-4 sm:flex-row sm:justify-end">
                <Button className="w-full sm:w-auto" onClick={onReset} type="button" variant="outline">
                    <RotateCcwIcon aria-hidden="true" data-icon="inline-start" />
                    Reset form
                </Button>
                <Button className="w-full sm:w-auto" type="submit">
                    <SaveIcon aria-hidden="true" data-icon="inline-start" />
                    {mode === "create" ? "Save transaction" : "Save changes"}
                </Button>
            </div>
        </form>
    )
}
