import type { ReactNode } from "react"
import { ActivityIcon, type LucideIcon } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"

type CoreLoadingStateVariant = "page" | "table" | "dashboard" | "report"

type CoreLoadingStateProps = {
    actions?: ReactNode
    children?: ReactNode
    className?: string
    description: string
    icon?: LucideIcon
    meta?: string
    title: string
    variant?: CoreLoadingStateVariant
}

export function CoreLoadingState({
    actions,
    children,
    className,
    description,
    icon: Icon = ActivityIcon,
    meta = "Preparing workspace",
    title,
    variant = "page",
}: CoreLoadingStateProps) {
    return (
        <Card className={cn("min-w-0 border-border/70 bg-card/95 shadow-xs", className)} aria-busy="true">
            <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
                            <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{title}</CardTitle>
                                <Badge variant="secondary">{meta}</Badge>
                            </div>
                            <CardDescription className="mt-1">{description}</CardDescription>
                        </div>
                    </div>
                    {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {children ?? <CoreLoadingStateBody variant={variant} />}
            </CardContent>
        </Card>
    )
}

function CoreLoadingStateBody({ variant }: { variant: CoreLoadingStateVariant }) {
    if (variant === "dashboard") {
        return (
            <div className="flex flex-col gap-4" aria-label="Loading dashboard overview">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div className="rounded-3xl border border-border/70 bg-muted/20 p-4" key={index}>
                            <div className="flex items-center justify-between gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="size-9 rounded-2xl" />
                            </div>
                            <Skeleton className="mt-5 h-8 w-36" />
                            <Skeleton className="mt-3 h-4 w-44" />
                        </div>
                    ))}
                </div>
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
                    <Skeleton className="h-[340px]" />
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-28" />
                        <Skeleton className="h-28" />
                        <Skeleton className="h-20" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === "report") {
        return (
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]" aria-label="Loading report analysis">
                <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-muted/20 p-4">
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-9 w-36" />
                        <Skeleton className="h-9 w-28" />
                        <Skeleton className="h-9 w-32" />
                    </div>
                    <Separator />
                    <Skeleton className="h-[320px] w-full" />
                </div>
                <div className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-12" />
                </div>
            </div>
        )
    }

    if (variant === "table") {
        return (
            <div className="flex flex-col gap-4" aria-label="Loading table data">
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-9 w-full sm:w-64" />
                    <Skeleton className="h-9 w-28" />
                    <Skeleton className="h-9 w-28" />
                    <Skeleton className="h-9 w-24" />
                </div>
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            className="grid gap-3 rounded-3xl border border-border/70 bg-muted/20 p-4 md:grid-cols-[1.4fr_0.8fr_1fr_0.7fr_1fr]"
                            key={index}
                        >
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4" aria-label="Loading page data">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <Skeleton className="h-64" />
        </div>
    )
}
