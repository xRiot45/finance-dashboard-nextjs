import {
    ArrowUpDownIcon,
    BellIcon,
    ChartNoAxesCombinedIcon,
    CircleCheckBigIcon,
    DownloadIcon,
    LayoutDashboardIcon,
    PiggyBankIcon,
    ReceiptTextIcon,
    ScrollTextIcon,
    SettingsIcon,
    TagsIcon,
    UploadIcon,
    WalletCardsIcon,
    type LucideIcon,
} from "lucide-react"

export type NavigationItemBadge = {
    value: number | string
    variant: "default" | "warning" | "destructive" | "muted"
}

export type NavigationItem = {
    id: string
    title: string
    href?: string
    icon?: LucideIcon
    permission?: string
    permissions?: string[]
    permissionMode?: "all" | "any"
    exact?: boolean
    activeHrefs?: string[]
    badge?: NavigationItemBadge
    children?: NavigationItem[]
}

export type NavigationGroup = {
    id: string
    title: string
    items: NavigationItem[]
}

export const navigationGroups: NavigationGroup[] = [
    {
        id: "overview",
        title: "Overview",
        items: [
            {
                id: "dashboard",
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboardIcon,
                permission: "dashboard.view",
                exact: true,
            },
        ],
    },
    {
        id: "finance",
        title: "Finance",
        items: [
            {
                id: "transactions",
                title: "Transactions",
                href: "/transactions",
                icon: ReceiptTextIcon,
                permission: "transactions.view",
            },
            {
                id: "accounts",
                title: "Accounts",
                href: "/accounts",
                icon: WalletCardsIcon,
                permission: "accounts.view",
            },
            {
                id: "categories",
                title: "Categories",
                href: "/categories",
                icon: TagsIcon,
                permission: "categories.view",
            },
            {
                id: "budgets",
                title: "Budgets",
                href: "/budgets",
                icon: PiggyBankIcon,
                permission: "budgets.view",
                badge: {
                    value: 2,
                    variant: "warning",
                },
            },
            {
                id: "reports",
                title: "Reports",
                href: "/reports",
                icon: ChartNoAxesCombinedIcon,
                permission: "reports.view",
            },
        ],
    },
    {
        id: "operations",
        title: "Operations",
        items: [
            {
                id: "approvals",
                title: "Approvals",
                href: "/approvals",
                icon: CircleCheckBigIcon,
                permissions: ["approvals.view", "approvals.manage"],
                permissionMode: "any",
                badge: {
                    value: 4,
                    variant: "default",
                },
            },
            {
                id: "data-operations",
                title: "Data Operations",
                activeHrefs: ["/imports", "/exports"],
                icon: ArrowUpDownIcon,
                permissions: ["imports.manage", "exports.manage"],
                permissionMode: "any",
                children: [
                    {
                        id: "imports-exports",
                        title: "Imports / Exports",
                        href: "/imports",
                        activeHrefs: ["/imports", "/exports"],
                        icon: ArrowUpDownIcon,
                        permissions: ["imports.manage", "exports.manage"],
                        permissionMode: "any",
                        children: [
                            {
                                id: "imports",
                                title: "Imports",
                                href: "/imports",
                                icon: UploadIcon,
                                permission: "imports.manage",
                                exact: true,
                            },
                            {
                                id: "exports",
                                title: "Exports",
                                href: "/exports",
                                icon: DownloadIcon,
                                permission: "exports.manage",
                                exact: true,
                            },
                        ],
                    },
                ],
            },
            {
                id: "audit-logs",
                title: "Audit Logs",
                href: "/audit-logs",
                icon: ScrollTextIcon,
                permission: "audit_logs.view",
            },
            {
                id: "notifications",
                title: "Notifications",
                href: "/notifications",
                icon: BellIcon,
                permission: "notifications.view",
                badge: {
                    value: 8,
                    variant: "default",
                },
            },
        ],
    },
    {
        id: "administration",
        title: "Administration",
        items: [
            {
                id: "settings",
                title: "Settings",
                href: "/settings",
                icon: SettingsIcon,
                permission: "settings.view",
            },
        ],
    },
]
