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
                    "flex shrink-0 flex-col bg-sidebar text-sidebar-foreground",
                    variant === "desktop" &&
                        "fixed inset-y-0 left-0 hidden border-r border-sidebar-border/70 shadow-xs transition-[width] duration-200 ease-out lg:flex",
                    variant === "desktop" && (isCollapsed ? "w-16" : "w-64"),
                    variant === "mobile" && "h-full w-full",
                    className
                )}
            >
                <div className={cn("flex h-16 items-center gap-3 px-3", isCollapsed && "justify-center px-2")}>
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground shadow-xs">
                        <LandmarkIcon aria-hidden="true" />
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">Finance OS</p>
                            <p className="truncate text-xs text-muted-foreground">Acme Studio</p>
                        </div>
                    )}
                </div>

                <nav
                    className="scrollbar-thin flex min-h-0 flex-1 scrollbar-thumb-sidebar-border scrollbar-track-transparent flex-col gap-5 overflow-y-auto px-2.5 py-3 scrollbar-hover:scrollbar-thumb-muted-foreground"
                    aria-label="Primary"
                >
                    {navigationGroups.map((navigationGroup) => (
                        <div key={navigationGroup.id} className="flex flex-col gap-1">
                            {!isCollapsed && (
                                <p className="px-2.5 pb-1 text-[11px] font-medium text-muted-foreground">
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
                                            "relative flex h-10 items-center gap-2.5 rounded-2xl px-2.5 text-sm font-medium text-muted-foreground transition-all outline-none hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring/30",
                                            isActive &&
                                                "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs ring-1 ring-sidebar-border/70",
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
                    <div className="border-t border-sidebar-border/70 p-3">
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
