"use client"

import Link from "next/link"
import { BellIcon, CircleCheckBigIcon } from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

const notifications = [
    {
        id: "approval-queue",
        title: "4 transactions await approval",
        description: "Finance operations",
    },
    {
        id: "budget-warning",
        title: "2 budgets are near limit",
        description: "Monthly budget control",
    },
    {
        id: "import-ready",
        title: "CSV import review is ready",
        description: "Imports / Exports",
    },
]

export function NotificationButton() {
    const unreadCount = 8

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Open notifications" className="relative">
                    <BellIcon aria-hidden="true" />
                    <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                        {unreadCount}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    <Badge variant="secondary">{unreadCount} unread</Badge>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="items-start">
                            <CircleCheckBigIcon aria-hidden="true" className="mt-0.5" />
                            <span className="min-w-0 flex-1">
                                <span className="block truncate">{notification.title}</span>
                                <span className="block truncate text-xs text-muted-foreground">
                                    {notification.description}
                                </span>
                            </span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/notifications">View all notifications</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
