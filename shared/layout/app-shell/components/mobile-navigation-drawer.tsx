"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet"
import { AppSidebar } from "@/shared/layout/app-shell/components/app-sidebar"
import { useAppShellStore } from "@/shared/layout/app-shell/stores/app-shell-store"

export function MobileNavigationDrawer() {
    const isMobileNavigationOpen = useAppShellStore((state) => state.isMobileNavigationOpen)
    const setMobileNavigationOpen = useAppShellStore((state) => state.setMobileNavigationOpen)

    return (
        <Sheet open={isMobileNavigationOpen} onOpenChange={setMobileNavigationOpen}>
            <SheetContent side="left" className="w-[20rem] max-w-[calc(100vw-2rem)] p-0" showCloseButton={false}>
                <SheetHeader className="sr-only">
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Open finance dashboard navigation.</SheetDescription>
                </SheetHeader>
                <AppSidebar variant="mobile" onNavigate={() => setMobileNavigationOpen(false)} />
            </SheetContent>
        </Sheet>
    )
}
