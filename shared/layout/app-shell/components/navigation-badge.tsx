import { Badge } from "@/shared/components/ui/badge"
import type { NavigationItemBadge } from "@/shared/layout/app-shell/constants/navigation-items"
import { cn } from "@/shared/lib/utils"

const badgeVariantClassNames: Record<NavigationItemBadge["variant"], string> = {
    default: "bg-primary text-primary-foreground",
    warning: "bg-warning-soft text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-muted-foreground",
}

type NavigationBadgeProps = {
    badge: NavigationItemBadge
    isCollapsed?: boolean
}

export function NavigationBadge({ badge, isCollapsed = false }: NavigationBadgeProps) {
    if (isCollapsed) {
        return (
            <span
                className={cn(
                    "absolute top-1.5 right-1.5 size-1.5 rounded-full",
                    badgeVariantClassNames[badge.variant]
                )}
            />
        )
    }

    return (
        <Badge className={cn("ml-auto h-4 px-1.5 text-[10px]", badgeVariantClassNames[badge.variant])}>
            {badge.value}
        </Badge>
    )
}
