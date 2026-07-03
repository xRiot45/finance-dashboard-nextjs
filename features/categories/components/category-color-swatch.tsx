import { cn } from "@/shared/lib/utils"

const categoryColorClassNames: Record<string, string> = {
    amber: "bg-warning",
    blue: "bg-info",
    emerald: "bg-success",
    green: "bg-success",
    indigo: "bg-info",
    orange: "bg-warning",
    red: "bg-destructive",
    sky: "bg-info",
    slate: "bg-muted-foreground",
    violet: "bg-chart-5",
}

type CategoryColorSwatchProps = {
    color: string
    label?: string
}

export function CategoryColorSwatch({ color, label }: CategoryColorSwatchProps) {
    return (
        <span className="inline-flex items-center gap-2">
            <span
                aria-hidden="true"
                className={cn("size-2.5 rounded-full bg-muted-foreground", categoryColorClassNames[color])}
            />
            {label ? <span className="truncate">{label}</span> : null}
        </span>
    )
}
