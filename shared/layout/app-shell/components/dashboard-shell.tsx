import type * as React from "react"

import { AppHeader } from "@/shared/layout/app-shell/components/app-header"
import { AppSidebar } from "@/shared/layout/app-shell/components/app-sidebar"
import { MobileNavigationDrawer } from "@/shared/layout/app-shell/components/mobile-navigation-drawer"

type DashboardShellProps = {
    children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex min-h-svh bg-background text-foreground">
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <AppHeader />
                <main className="min-w-0 flex-1">
                    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</div>
                </main>
            </div>
            <MobileNavigationDrawer />
        </div>
    )
}
