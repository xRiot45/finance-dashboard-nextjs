import { DEFAULT_FORMAT_FALLBACK, DEFAULT_LOCALE, isFiniteNumber, type NullableFormatValue } from "./format-helpers"

export type FormatNumberOptions = Intl.NumberFormatOptions & {
    fallback?: string
    locale?: string
}

export function formatNumber(value: NullableFormatValue<number>, options: FormatNumberOptions = {}) {
    const { fallback = DEFAULT_FORMAT_FALLBACK, locale = DEFAULT_LOCALE, ...numberFormatOptions } = options

    if (!isFiniteNumber(value)) {
        return fallback
    }

    try {
        return new Intl.NumberFormat(locale, {
            maximumFractionDigits: 2,
            ...numberFormatOptions,
        }).format(value)
    } catch {
        return fallback
    }
}
