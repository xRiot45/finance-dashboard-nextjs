"use client"

import type * as React from "react"

import { AppHeader } from "@/shared/layout/app-shell/components/app-header"
import { AppSidebar } from "@/shared/layout/app-shell/components/app-sidebar"
import { MobileNavigationDrawer } from "@/shared/layout/app-shell/components/mobile-navigation-drawer"
import { useAppShellStore } from "@/shared/layout/app-shell/stores/app-shell-store"
import { cn } from "@/shared/lib/utils"

type DashboardShellProps = {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    const isSidebarCollapsed = useAppShellStore((state) => state.isSidebarCollapsed)

    return (
        <div className="min-h-svh bg-muted/40 text-foreground">
            <AppSidebar />
            <div
                className={cn(
                    "min-h-svh transition-[padding] duration-200 ease-out lg:pl-64",
                    isSidebarCollapsed && "lg:pl-16"
                )}
            >
                <div className="flex min-h-svh min-w-0 flex-col p-2 sm:p-3">
                    <AppHeader />
                    <main className="min-w-0 flex-1">
                        <div className="mx-auto w-full max-w-[1440px] px-2 py-4 sm:px-3 lg:px-5 lg:py-5">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <MobileNavigationDrawer />
        </div>
    )
}
