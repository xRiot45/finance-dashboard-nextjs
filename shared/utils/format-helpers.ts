export const DEFAULT_FORMAT_FALLBACK = "-"
export const DEFAULT_LOCALE = "id-ID"
export const DEFAULT_TIME_ZONE = "Asia/Jakarta"

export type NullableFormatValue<T> = T | null | undefined

export function isFiniteNumber(value: NullableFormatValue<number>): value is number {
    return typeof value === "number" && Number.isFinite(value)
}

export function normalizeDate(value: NullableFormatValue<string | number | Date>) {
    if (value === null || value === undefined || value === "") {
        return null
    }

    const date = value instanceof Date ? value : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return date
}

export function formatIdentifierLabel(value: string) {
    return value
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((labelPart) => labelPart.charAt(0).toUpperCase() + labelPart.slice(1).toLowerCase())
        .join(" ")
}
