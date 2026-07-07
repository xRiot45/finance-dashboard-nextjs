import type { ReactNode } from "react"
import { ClipboardListIcon, type LucideIcon } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/shared/components/ui/empty"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/lib/utils"

type CoreEmptyStateProps = {
    actions?: ReactNode
    children?: ReactNode
    className?: string
    description: string
    icon?: LucideIcon
    meta?: string
    secondaryAction?: {
        label: string
        onClick: () => void
    }
    steps?: string[]
    title: string
}

export function CoreEmptyState({
    actions,
    children,
    className,
    description,
    icon: Icon = ClipboardListIcon,
    meta = "No records",
    secondaryAction,
    steps = [
        "Review the active filters.",
        "Create a new record when this workspace is ready.",
        "Come back after data sync completes.",
    ],
    title,
}: CoreEmptyStateProps) {
    return (
        <Empty className={cn("border border-border/70 bg-muted/20", className)}>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Icon aria-hidden="true" />
                </EmptyMedia>
                <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">{meta}</Badge>
                </div>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="max-w-2xl">
                {children ?? (
                    <div className="grid w-full gap-2 text-left sm:grid-cols-3">
                        {steps.map((step, index) => (
                            <div className="rounded-2xl border border-border/70 bg-card/70 p-3" key={step}>
                                <p className="font-mono text-xs text-muted-foreground">Step {index + 1}</p>
                                <p className="mt-1 text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                )}
                {actions || secondaryAction ? (
                    <>
                        <Separator />
                        <div className="flex flex-wrap justify-center gap-2">
                            {actions}
                            {secondaryAction ? (
                                <Button onClick={secondaryAction.onClick} type="button" variant="outline">
                                    {secondaryAction.label}
                                </Button>
                            ) : null}
                        </div>
                    </>
                ) : null}
            </EmptyContent>
        </Empty>
    )
}
