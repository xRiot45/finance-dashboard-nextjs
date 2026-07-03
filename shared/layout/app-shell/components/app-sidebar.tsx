"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, LandmarkIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { useNavigationItems, isNavigationItemActive } from "@/shared/layout/app-shell/hooks/use-navigation-items"
import { NavigationBadge } from "@/shared/layout/app-shell/components/navigation-badge"
import type { NavigationItem } from "@/shared/layout/app-shell/constants/navigation-items"
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
                            <ul className="flex flex-col gap-1">
                                {navigationGroup.items.map((navigationItem) => (
                                    <SidebarNavigationItem
                                        depth={0}
                                        isCollapsed={isCollapsed}
                                        item={navigationItem}
                                        key={navigationItem.id}
                                        onExpandSidebar={toggleSidebarCollapsed}
                                        onNavigate={onNavigate}
                                        pathname={pathname}
                                    />
                                ))}
                            </ul>
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

type SidebarNavigationItemProps = {
    depth: number
    isCollapsed: boolean
    item: NavigationItem
    onExpandSidebar?: () => void
    onNavigate?: () => void
    pathname: string
}

function SidebarNavigationItem({
    depth,
    isCollapsed,
    item,
    onExpandSidebar,
    onNavigate,
    pathname,
}: SidebarNavigationItemProps) {
    const isActive = isNavigationItemActive(pathname, item)
    const hasChildren = Boolean(item.children?.length)
    const [isManuallyOpen, setIsManuallyOpen] = useState(false)
    const isOpen = isActive || isManuallyOpen

    if (isCollapsed && depth > 0) {
        return null
    }

    if (isCollapsed) {
        const itemControl = (
            <SidebarNavigationControl
                depth={depth}
                isActive={isActive}
                isCollapsed={isCollapsed}
                item={item}
                onClick={
                    hasChildren && !item.href
                        ? () => {
                              setIsManuallyOpen(true)
                              onExpandSidebar?.()
                          }
                        : undefined
                }
                onNavigate={onNavigate}
            />
        )

        return (
            <li>
                <Tooltip>
                    <TooltipTrigger asChild>{itemControl}</TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
            </li>
        )
    }

    if (!hasChildren) {
        return (
            <li>
                <SidebarNavigationControl
                    depth={depth}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                    item={item}
                    onNavigate={onNavigate}
                />
            </li>
        )
    }

    return (
        <li>
            <Collapsible open={isOpen} onOpenChange={setIsManuallyOpen}>
                <CollapsibleTrigger asChild>
                    <button
                        aria-current={isActive ? "page" : undefined}
                        aria-expanded={isOpen}
                        className={getNavigationItemClassName({ depth, isActive, isCollapsed })}
                        type="button"
                    >
                        <SidebarNavigationItemContent depth={depth} isCollapsed={isCollapsed} item={item} />
                        {item.badge && <NavigationBadge badge={item.badge} />}
                        <ChevronRightIcon
                            aria-hidden="true"
                            className={cn("ml-auto transition-transform", isOpen && "rotate-90")}
                        />
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <ul className={getSubMenuClassName(depth)}>
                        {item.children?.map((childItem) => (
                            <SidebarNavigationItem
                                depth={depth + 1}
                                isCollapsed={isCollapsed}
                                item={childItem}
                                key={childItem.id}
                                onExpandSidebar={onExpandSidebar}
                                onNavigate={onNavigate}
                                pathname={pathname}
                            />
                        ))}
                    </ul>
                </CollapsibleContent>
            </Collapsible>
        </li>
    )
}

type SidebarNavigationControlProps = {
    depth: number
    isActive: boolean
    isCollapsed: boolean
    item: NavigationItem
    onClick?: () => void
    onNavigate?: () => void
}

function SidebarNavigationControl({
    depth,
    isActive,
    isCollapsed,
    item,
    onClick,
    onNavigate,
}: SidebarNavigationControlProps) {
    const className = getNavigationItemClassName({ depth, isActive, isCollapsed })

    if (!item.href) {
        return (
            <button aria-current={isActive ? "page" : undefined} className={className} onClick={onClick} type="button">
                <SidebarNavigationItemContent depth={depth} isCollapsed={isCollapsed} item={item} />
                {item.badge && <NavigationBadge badge={item.badge} isCollapsed={isCollapsed} />}
            </button>
        )
    }

    return (
        <Link
            aria-current={isActive ? "page" : undefined}
            aria-label={isCollapsed ? item.title : undefined}
            className={className}
            href={item.href}
            onClick={onNavigate}
        >
            <SidebarNavigationItemContent depth={depth} isCollapsed={isCollapsed} item={item} />
            {item.badge && <NavigationBadge badge={item.badge} isCollapsed={isCollapsed} />}
        </Link>
    )
}

type SidebarNavigationItemContentProps = {
    depth: number
    isCollapsed: boolean
    item: NavigationItem
}

function SidebarNavigationItemContent({ depth, isCollapsed, item }: SidebarNavigationItemContentProps) {
    const Icon = item.icon

    return (
        <>
            {Icon ? <Icon aria-hidden="true" /> : null}
            {!isCollapsed && <span className={cn("truncate", depth >= 2 && "text-xs")}>{item.title}</span>}
        </>
    )
}

function getNavigationItemClassName({
    depth,
    isActive,
    isCollapsed,
}: {
    depth: number
    isActive: boolean
    isCollapsed: boolean
}) {
    return cn(
        "relative flex w-full items-center gap-2.5 text-sm font-medium text-muted-foreground transition-all outline-none hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground focus-visible:ring-3 focus-visible:ring-sidebar-ring/30",
        depth === 0 && "h-10 rounded-2xl px-2.5",
        depth === 1 && "h-8 rounded-xl px-2.5",
        depth >= 2 && "h-7 rounded-xl px-2.5 text-xs",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs ring-1 ring-sidebar-border/70",
        isCollapsed && "justify-center px-0"
    )
}

function getSubMenuClassName(depth: number) {
    return cn(
        "mt-1 flex min-w-0 flex-col gap-1 border-l border-sidebar-border/70 py-1",
        depth === 0 && "ml-4 pl-3",
        depth > 0 && "ml-3 pl-3"
    )
}
