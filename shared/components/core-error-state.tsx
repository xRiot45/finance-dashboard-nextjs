import type { ReactNode } from "react"
import { AlertTriangleIcon, RefreshCcwIcon, type LucideIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/lib/utils"

type CoreErrorStateProps = {
    actions?: ReactNode
    children?: ReactNode
    className?: string
    description: string
    icon?: LucideIcon
    meta?: string
    onRetry?: () => void
    recoveryItems?: string[]
    retryLabel?: string
    title: string
}

export function CoreErrorState({
    actions,
    children,
    className,
    description,
    icon: Icon = AlertTriangleIcon,
    meta = "Data refresh failed",
    onRetry,
    recoveryItems = [
        "Keep current filters unchanged.",
        "Retry the refresh.",
        "Check workspace access if the issue persists.",
    ],
    retryLabel = "Retry",
    title,
}: CoreErrorStateProps) {
    return (
        <Card className={cn("min-w-0 border-destructive/40 bg-card/95 shadow-xs", className)}>
            <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                            <Icon aria-hidden="true" className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle>{title}</CardTitle>
                                <Badge variant="destructive">{meta}</Badge>
                            </div>
                            <CardDescription className="mt-1">{description}</CardDescription>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {actions}
                        {onRetry ? (
                            <Button onClick={onRetry} type="button" variant="outline">
                                <RefreshCcwIcon aria-hidden="true" data-icon="inline-start" />
                                {retryLabel}
                            </Button>
                        ) : null}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Alert variant="destructive">
                    <AlertTriangleIcon aria-hidden="true" />
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{description}</AlertDescription>
                </Alert>
                {children ?? (
                    <div className="grid gap-3 sm:grid-cols-3">
                        {recoveryItems.map((item) => (
                            <div className="rounded-2xl border border-border/70 bg-muted/20 p-3" key={item}>
                                <p className="text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                )}
                <Separator />
                <p className="text-xs text-muted-foreground">
                    The page keeps controls visible where possible so users can adjust filters or retry without losing
                    context.
                </p>
            </CardContent>
        </Card>
    )
}
