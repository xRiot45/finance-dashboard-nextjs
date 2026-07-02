import { DEFAULT_FORMAT_FALLBACK, DEFAULT_LOCALE, isFiniteNumber, type NullableFormatValue } from "./format-helpers"

export type FormatCurrencyOptions = Omit<Intl.NumberFormatOptions, "currency" | "style"> & {
    currency?: string
    fallback?: string
    locale?: string
}

export function formatCurrency(value: NullableFormatValue<number>, options: FormatCurrencyOptions = {}) {
    const {
        currency = "IDR",
        fallback = DEFAULT_FORMAT_FALLBACK,
        locale = DEFAULT_LOCALE,
        maximumFractionDigits = currency === "IDR" ? 0 : 2,
        ...currencyFormatOptions
    } = options

    if (!isFiniteNumber(value)) {
        return fallback
    }

    try {
        return new Intl.NumberFormat(locale, {
            currency,
            maximumFractionDigits,
            style: "currency",
            ...currencyFormatOptions,
        }).format(value)
    } catch {
        return fallback
    }
}
