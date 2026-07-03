"use client"

import { RotateCcwIcon, SaveIcon } from "lucide-react"

import { CategoryColorSwatch } from "@/features/categories/components/category-color-swatch"
import { CategoryIcon } from "@/features/categories/components/category-icon"
import {
    CATEGORY_COLOR_OPTIONS,
    CATEGORY_ICON_OPTIONS,
    CATEGORY_STATUS_OPTIONS,
    CATEGORY_TYPE_OPTIONS,
} from "@/features/categories/constants/category-options"
import type { Category, CategoryStatus, CategoryType } from "@/features/categories"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"

export type CategoryFormMode = "create" | "edit"

export type CategoryFormValues = {
    color: string
    icon: string
    name: string
    parentId: string
    status: CategoryStatus
    type: CategoryType
}

export type CategoryFormErrors = Partial<Record<keyof CategoryFormValues, string>>

type CategoryFormProps = {
    categories: Category[]
    editingCategoryId: string | null
    errors: CategoryFormErrors
    mode: CategoryFormMode
    onChange: (values: Partial<CategoryFormValues>) => void
    onReset: () => void
    onSubmit: () => void
    values: CategoryFormValues
}

export function CategoryForm({
    categories,
    editingCategoryId,
    errors,
    mode,
    onChange,
    onReset,
    onSubmit,
    values,
}: CategoryFormProps) {
    const parentOptions = categories.filter(
        (category) =>
            category.type === values.type &&
            category.id !== editingCategoryId &&
            category.status === "active" &&
            category.parentId === null
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
                <FieldLegend>Category identity</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2 md:col-span-2" data-invalid={Boolean(errors.name)}>
                        <FieldLabel htmlFor="category-name">Category name</FieldLabel>
                        <Input
                            aria-invalid={Boolean(errors.name)}
                            id="category-name"
                            onChange={(event) => onChange({ name: event.target.value })}
                            placeholder="Office Supplies"
                            value={values.name}
                        />
                        <FieldDescription>Use a short name that reads well in transaction reports.</FieldDescription>
                        <FieldError>{errors.name}</FieldError>
                    </Field>

                    <Field className="gap-2 md:col-span-2" data-invalid={Boolean(errors.type)}>
                        <FieldLabel id="category-type-label">Type</FieldLabel>
                        <ToggleGroup
                            aria-labelledby="category-type-label"
                            className="flex-wrap"
                            onValueChange={(value) => {
                                if (value) {
                                    onChange({ parentId: "none", type: value as CategoryType })
                                }
                            }}
                            type="single"
                            value={values.type}
                            variant="outline"
                        >
                            {CATEGORY_TYPE_OPTIONS.map((option) => (
                                <ToggleGroupItem key={option.value} value={option.value}>
                                    <option.icon aria-hidden="true" />
                                    {option.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        <FieldError>{errors.type}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.status)}>
                        <FieldLabel htmlFor="category-status">Status</FieldLabel>
                        <Select
                            onValueChange={(value) => onChange({ status: value as CategoryStatus })}
                            value={values.status}
                        >
                            <SelectTrigger
                                aria-invalid={Boolean(errors.status)}
                                className="w-full"
                                id="category-status"
                            >
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {CATEGORY_STATUS_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{errors.status}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.parentId)}>
                        <FieldLabel htmlFor="category-parent">Parent</FieldLabel>
                        <Select onValueChange={(value) => onChange({ parentId: value })} value={values.parentId}>
                            <SelectTrigger
                                aria-invalid={Boolean(errors.parentId)}
                                className="w-full"
                                id="category-parent"
                            >
                                <SelectValue placeholder="Select parent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="none">Root category</SelectItem>
                                    {parentOptions.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldDescription>
                            Only active root categories of the same type can be parents.
                        </FieldDescription>
                        <FieldError>{errors.parentId}</FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Display metadata</FieldLegend>
                <FieldGroup className="grid gap-4 md:grid-cols-2">
                    <Field className="gap-2" data-invalid={Boolean(errors.icon)}>
                        <FieldLabel htmlFor="category-icon">Icon</FieldLabel>
                        <Select onValueChange={(value) => onChange({ icon: value })} value={values.icon}>
                            <SelectTrigger aria-invalid={Boolean(errors.icon)} className="w-full" id="category-icon">
                                <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {CATEGORY_ICON_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <CategoryIcon aria-hidden="true" name={option.value} />
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{errors.icon}</FieldError>
                    </Field>

                    <Field className="gap-2" data-invalid={Boolean(errors.color)}>
                        <FieldLabel htmlFor="category-color">Color</FieldLabel>
                        <Select onValueChange={(value) => onChange({ color: value })} value={values.color}>
                            <SelectTrigger aria-invalid={Boolean(errors.color)} className="w-full" id="category-color">
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {CATEGORY_COLOR_OPTIONS.map((color) => (
                                        <SelectItem key={color} value={color}>
                                            <CategoryColorSwatch color={color} label={color} />
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldDescription>Used in category badges and future report charts.</FieldDescription>
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
                    {mode === "create" ? "Create category" : "Save changes"}
                </Button>
            </div>
        </form>
    )
}
