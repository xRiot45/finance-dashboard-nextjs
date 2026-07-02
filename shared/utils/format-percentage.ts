import { DEFAULT_FORMAT_FALLBACK, DEFAULT_LOCALE, isFiniteNumber, type NullableFormatValue } from "./format-helpers"

export type PercentageValueType = "ratio" | "percent"

export type FormatPercentageOptions = Omit<Intl.NumberFormatOptions, "style"> & {
    fallback?: string
    locale?: string
    valueType?: PercentageValueType
}

export function formatPercentage(value: NullableFormatValue<number>, options: FormatPercentageOptions = {}) {
    const {
        fallback = DEFAULT_FORMAT_FALLBACK,
        locale = DEFAULT_LOCALE,
        maximumFractionDigits = 1,
        valueType = "ratio",
        ...percentageFormatOptions
    } = options

    if (!isFiniteNumber(value)) {
        return fallback
    }

    const percentageValue = valueType === "percent" ? value / 100 : value

    try {
        return new Intl.NumberFormat(locale, {
            maximumFractionDigits,
            style: "percent",
            ...percentageFormatOptions,
        }).format(percentageValue)
    } catch {
        return fallback
    }
}
