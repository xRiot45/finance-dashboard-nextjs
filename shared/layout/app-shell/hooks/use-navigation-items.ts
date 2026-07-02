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

export function useNavigationItems() {
    return React.useMemo(
        () =>
            navigationGroups
                .map((navigationGroup) => ({
                    ...navigationGroup,
                    items: navigationGroup.items.filter((navigationItem) =>
                        canViewNavigationItem(navigationItem, currentUserPermissions)
                    ),
                }))
                .filter((navigationGroup) => navigationGroup.items.length > 0),
        []
    )
}

export function isNavigationItemActive(pathname: string, navigationItem: NavigationItem) {
    const activeHrefs = navigationItem.activeHrefs ?? [navigationItem.href]

    return activeHrefs.some((href) => {
        if (navigationItem.exact) {
            return pathname === href
        }

        return pathname === href || pathname.startsWith(`${href}/`)
    })
}
