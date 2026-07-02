"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronsLeftIcon, ChevronsRightIcon, LandmarkIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { useNavigationItems, isNavigationItemActive } from "@/shared/layout/app-shell/hooks/use-navigation-items"
import { NavigationBadge } from "@/shared/layout/app-shell/components/navigation-badge"
import { useAppShellStore } from "@/shared/layout/app-shell/stores/app-shell-store"
import { cn } from "@/shared/lib/utils"

type AppSidebarProps = {
    className?: string
    onNavigate?: () => void
    variant?: "desktop" | "mobile"
}

export function AppSidebar({ className, onNavigate, variant = "desktop" }: AppSidebarProps) {
    const pathname = usePathname()
    const navigationGroups = useNavigationItems()
    const isSidebarCollapsed = useAppShellStore((state) => state.isSidebarCollapsed)
    const toggleSidebarCollapsed = useAppShellStore((state) => state.toggleSidebarCollapsed)
    const isCollapsed = variant === "desktop" && isSidebarCollapsed

    return (
        <TooltipProvider>
            <aside
                className={cn(
                    "flex h-full shrink-0 flex-col border-sidebar-border bg-sidebar text-sidebar-foreground",
                    variant === "desktop" && "hidden border-r transition-[width] duration-200 lg:flex",
                    variant === "desktop" && (isCollapsed ? "w-16" : "w-64"),
                    variant === "mobile" && "w-full",
                    className
                )}
            >
                <div className={cn("flex h-14 items-center gap-2 px-3", isCollapsed && "justify-center px-2")}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground">
                        <LandmarkIcon aria-hidden="true" />
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">Finance OS</p>
                            <p className="truncate text-xs text-muted-foreground">Workspace finance</p>
                        </div>
                    )}
                </div>

                <nav className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-3" aria-label="Primary">
                    {navigationGroups.map((navigationGroup) => (
                        <div key={navigationGroup.id} className="flex flex-col gap-1">
                            {!isCollapsed && (
                                <p className="px-2 pb-1 text-[11px] font-medium text-muted-foreground">
                                    {navigationGroup.title}
                                </p>
                            )}
                            {navigationGroup.items.map((navigationItem) => {
                                const Icon = navigationItem.icon
                                const isActive = isNavigationItemActive(pathname, navigationItem)

                                const item = (
                                    <Link
                                        href={navigationItem.href}
                                        aria-current={isActive ? "page" : undefined}
                                        aria-label={isCollapsed ? navigationItem.title : undefined}
                                        onClick={onNavigate}
                                        className={cn(
                                            "relative flex h-9 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring/30",
                                            isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                                            isCollapsed && "justify-center px-0"
                                        )}
                                    >
                                        <Icon aria-hidden="true" />
                                        {!isCollapsed && <span className="truncate">{navigationItem.title}</span>}
                                        {navigationItem.badge && (
                                            <NavigationBadge badge={navigationItem.badge} isCollapsed={isCollapsed} />
                                        )}
                                    </Link>
                                )

                                if (!isCollapsed) {
                                    return <div key={navigationItem.id}>{item}</div>
                                }

                                return (
                                    <Tooltip key={navigationItem.id}>
                                        <TooltipTrigger asChild>{item}</TooltipTrigger>
                                        <TooltipContent side="right">{navigationItem.title}</TooltipContent>
                                    </Tooltip>
                                )
                            })}
                        </div>
                    ))}
                </nav>

                {variant === "desktop" && (
                    <div className="border-t border-sidebar-border p-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size={isCollapsed ? "icon" : "sm"}
                            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            className={cn("w-full justify-start", isCollapsed && "justify-center")}
                            onClick={toggleSidebarCollapsed}
                        >
                            {isCollapsed ? (
                                <ChevronsRightIcon aria-hidden="true" data-icon="inline-start" />
                            ) : (
                                <ChevronsLeftIcon aria-hidden="true" data-icon="inline-start" />
                            )}
                            {!isCollapsed && <span>Collapse</span>}
                        </Button>
                    </div>
                )}
            </aside>
        </TooltipProvider>
    )
}
