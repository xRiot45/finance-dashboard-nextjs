"use client"

import { MenuIcon } from "lucide-react"

import { ThemeToggle } from "@/shared/components/theme-toggle"
import { Button } from "@/shared/components/ui/button"
import { GlobalSearchButton } from "@/shared/layout/app-shell/components/global-search-button"
import { NotificationButton } from "@/shared/layout/app-shell/components/notification-button"
import { UserMenu } from "@/shared/layout/app-shell/components/user-menu"
import { WorkspaceSwitcher } from "@/shared/layout/app-shell/components/workspace-switcher"
import { useAppShellStore } from "@/shared/layout/app-shell/stores/app-shell-store"

export function AppHeader() {
    const setMobileNavigationOpen = useAppShellStore((state) => state.setMobileNavigationOpen)

    return (
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-4 lg:px-6">
            <div className="flex min-w-0 items-center gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation"
                    className="lg:hidden"
                    onClick={() => setMobileNavigationOpen(true)}
                >
                    <MenuIcon aria-hidden="true" />
                </Button>
                <WorkspaceSwitcher />
            </div>

            <div className="flex min-w-0 flex-1 justify-center">
                <GlobalSearchButton />
            </div>

            <div className="flex shrink-0 items-center gap-1">
                <NotificationButton />
                <div className="hidden sm:block">
                    <ThemeToggle />
                </div>
                <UserMenu />
            </div>
        </header>
    )
}
