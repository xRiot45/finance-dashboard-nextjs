import {
    DEFAULT_FORMAT_FALLBACK,
    DEFAULT_LOCALE,
    DEFAULT_TIME_ZONE,
    normalizeDate,
    type NullableFormatValue,
} from "./format-helpers"

export type FormatDateOptions = Intl.DateTimeFormatOptions & {
    fallback?: string
    locale?: string
}

export function formatDate(value: NullableFormatValue<string | number | Date>, options: FormatDateOptions = {}) {
    const {
        dateStyle = "medium",
        fallback = DEFAULT_FORMAT_FALLBACK,
        locale = DEFAULT_LOCALE,
        timeZone = DEFAULT_TIME_ZONE,
        ...dateFormatOptions
    } = options

    const date = normalizeDate(value)

    if (!date) {
        return fallback
    }

    try {
        return new Intl.DateTimeFormat(locale, {
            dateStyle,
            timeZone,
            ...dateFormatOptions,
        }).format(date)
    } catch {
        return fallback
    }
}

export function formatDateTime(value: NullableFormatValue<string | number | Date>, options: FormatDateOptions = {}) {
    return formatDate(value, {
        dateStyle: "medium",
        timeStyle: "short",
        ...options,
    })
}
