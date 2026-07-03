"use client"

import { RotateCcwIcon, SaveIcon } from "lucide-react"

import { ACCOUNT_STATUS_OPTIONS, ACCOUNT_TYPE_OPTIONS } from "@/features/accounts/constants/account-options"
import type { AccountStatus, AccountType } from "@/features/accounts"
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

export type AccountFormMode = "create" | "edit"

export type AccountFormValues = {
    accountNumberMasked: string
    color: string
    currency: string
    currentBalance: string
    institutionName: string
    name: string
    openingBalance: string
    status: AccountStatus
    type: AccountType
}

export type AccountFormErrors = Partial<Record<keyof AccountFormValues, string>>

type AccountFormProps = {
    errors: AccountFormErrors
    mode: AccountFormMode
    onChange: (values: Partial<AccountFormValues>) => void
    onReset: () => void
    onSubmit: () => void
    values: AccountFormValues
}

export function AccountForm({ errors, mode, onChange, onReset, onSubmit, values }: AccountFormProps) {
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
                <FieldLegend>Account identity</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2 md:col-span-2" data-invalid={Boolean(errors.name)}>
                        <FieldLabel htmlFor="account-name">Account name</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.name)}
                            id="account-name"
                            onChange={(event) => onChange({ name: event.target.value })}
                            placeholder="BCA Operational"
                            value={values.name}
                        />
                        <FieldDescription>Use a name your finance team can recognize in reports.</FieldDescription>
                        <FieldError>{errors.name}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.type)}>
                        <FieldLabel htmlFor="account-type">Type</FieldLabel>
                        <Select onValueChange={(value) => onChange({ type: value as AccountType })} value={values.type}>
                            <SelectTrigger aria-invalid={Boolean(errors.type)} className="w-full" id="account-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {ACCOUNT_TYPE_OPTIONS.map((option) => (
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
                        <FieldLabel htmlFor="account-status">Status</FieldLabel>
                        <Select
                            onValueChange={(value) => onChange({ status: value as AccountStatus })}
                            value={values.status}
                        >
                            <SelectTrigger aria-invalid={Boolean(errors.status)} className="w-full" id="account-status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {ACCOUNT_STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{errors.status}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.institutionName)}>
                        <FieldLabel htmlFor="account-institution">Institution</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.institutionName)}
                            id="account-institution"
                            onChange={(event) => onChange({ institutionName: event.target.value })}
                            placeholder="Bank Central Asia"
                            value={values.institutionName}
                        />
                        <FieldError>{errors.institutionName}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.accountNumberMasked)}>
                        <FieldLabel htmlFor="account-number-masked">Masked number</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.accountNumberMasked)}
                            id="account-number-masked"
                            onChange={(event) => onChange({ accountNumberMasked: event.target.value })}
                            placeholder="**** 3021"
                            value={values.accountNumberMasked}
                        />
                        <FieldError>{errors.accountNumberMasked}</FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Balance setup</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-3">
                    <Field className="gap-2" data-invalid={Boolean(errors.openingBalance)}>
                        <FieldLabel htmlFor="account-opening-balance">Opening balance</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon align="inline-start">
                                <InputGroupText>{values.currency}</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                aria-invalid={Boolean(errors.openingBalance)}
                                id="account-opening-balance"
                                inputMode="decimal"
                                onChange={(event) => onChange({ openingBalance: event.target.value })}
                                placeholder="0"
                                value={values.openingBalance}
                            />
                        </InputGroup>
                        <FieldError>{errors.openingBalance}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.currentBalance)}>
                        <FieldLabel htmlFor="account-current-balance">Current balance</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon align="inline-start">
                                <InputGroupText>{values.currency}</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                aria-invalid={Boolean(errors.currentBalance)}
                                id="account-current-balance"
                                inputMode="decimal"
                                onChange={(event) => onChange({ currentBalance: event.target.value })}
                                placeholder="0"
                                value={values.currentBalance}
                            />
                        </InputGroup>
                        <FieldError>{errors.currentBalance}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.currency)}>
                        <FieldLabel htmlFor="account-currency">Currency</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.currency)}
                            id="account-currency"
                            maxLength={3}
                            onChange={(event) => onChange({ currency: event.target.value.toUpperCase() })}
                            placeholder="IDR"
                            value={values.currency}
                        />
                        <FieldError>{errors.currency}</FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Display metadata</FieldLegend>
                <FieldGroup>
                    <Field className="gap-2" data-invalid={Boolean(errors.color)}>
                        <FieldLabel htmlFor="account-color">Color label</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.color)}
                            id="account-color"
                            onChange={(event) => onChange({ color: event.target.value })}
                            placeholder="blue"
                            value={values.color}
                        />
                        <FieldDescription>
                            Stored as metadata for future chart and workspace theme mapping.
                        </FieldDescription>
                        <FieldError>{errors.color}</FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button onClick={onReset} type="button" variant="outline">
                    <RotateCcwIcon aria-hidden="true" data-icon="inline-start" />
                    Reset
                </Button>
                <Button type="submit">
                    <SaveIcon aria-hidden="true" data-icon="inline-start" />
                    {mode === "create" ? "Create account" : "Save changes"}
                </Button>
            </div>
        </form>
    )
}
