"use client"

import { create } from "zustand"

type AppShellStoreState = {
    isGlobalSearchOpen: boolean
    isMobileNavigationOpen: boolean
    isSidebarCollapsed: boolean
    setGlobalSearchOpen: (isOpen: boolean) => void
    setMobileNavigationOpen: (isOpen: boolean) => void
    toggleSidebarCollapsed: () => void
}

export const useAppShellStore = create<AppShellStoreState>((set) => ({
    isGlobalSearchOpen: false,
    isMobileNavigationOpen: false,
    isSidebarCollapsed: false,
    setGlobalSearchOpen: (isOpen) => set({ isGlobalSearchOpen: isOpen }),
    setMobileNavigationOpen: (isOpen) => set({ isMobileNavigationOpen: isOpen }),
    toggleSidebarCollapsed: () =>
        set((state) => ({
            isSidebarCollapsed: !state.isSidebarCollapsed,
        })),
}))
