"use client"

import * as React from "react"

import { navigationGroups, type NavigationItem } from "@/shared/layout/app-shell/constants/navigation-items"

const currentUserPermissions = ["*"]

function canViewNavigationItem(navigationItem: NavigationItem, permissions: string[]) {
    if (permissions.includes("*")) {
        return true
    }

    if (navigationItem.permission) {
        return permissions.includes(navigationItem.permission)
    }

    if (navigationItem.permissions?.length) {
        if (navigationItem.permissionMode === "all") {
            return navigationItem.permissions.every((permission) => permissions.includes(permission))
        }

        return navigationItem.permissions.some((permission) => permissions.includes(permission))
    }

    return true
}

function filterNavigationItems(navigationItems: NavigationItem[], permissions: string[]): NavigationItem[] {
    return navigationItems.reduce<NavigationItem[]>((visibleNavigationItems, navigationItem) => {
        const children = navigationItem.children
            ? filterNavigationItems(navigationItem.children, permissions)
            : undefined
        const canViewItem = canViewNavigationItem(navigationItem, permissions)

        if (!canViewItem && !children?.length) {
            return visibleNavigationItems
        }

        visibleNavigationItems.push({
            ...navigationItem,
            children,
        })

        return visibleNavigationItems
    }, [])
}

export function useNavigationItems() {
    return React.useMemo(
        () =>
            navigationGroups
                .map((navigationGroup) => ({
                    ...navigationGroup,
                    items: filterNavigationItems(navigationGroup.items, currentUserPermissions),
                }))
                .filter((navigationGroup) => navigationGroup.items.length > 0),
        []
    )
}

export function isNavigationItemActive(pathname: string, navigationItem: NavigationItem): boolean {
    const activeHrefs = navigationItem.activeHrefs ?? (navigationItem.href ? [navigationItem.href] : [])
    const isSelfActive = activeHrefs.some((href) => {
        if (navigationItem.exact) {
            return pathname === href
        }

        return pathname === href || pathname.startsWith(`${href}/`)
    })

    return isSelfActive || Boolean(navigationItem.children?.some((child) => isNavigationItemActive(pathname, child)))
}
