"use client"

import { Building2Icon, CheckIcon, ChevronsUpDownIcon, SettingsIcon } from "lucide-react"

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

const workspaces = [
    {
        id: "acme-studio",
        name: "Acme Studio",
        role: "Owner",
        isActive: true,
    },
    {
        id: "personal-finance",
        name: "Personal Finance",
        role: "Admin",
        isActive: false,
    },
]

export function WorkspaceSwitcher() {
    const activeWorkspace = workspaces.find((workspace) => workspace.isActive) ?? workspaces[0]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="max-w-[calc(100vw-10rem)] justify-start rounded-2xl border-border/70 bg-background/70 px-2.5 shadow-xs sm:max-w-[15rem]"
                >
                    <Building2Icon aria-hidden="true" data-icon="inline-start" />
                    <span className="truncate">{activeWorkspace.name}</span>
                    <ChevronsUpDownIcon aria-hidden="true" data-icon="inline-end" className="ml-auto opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-3xl">
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {workspaces.map((workspace) => (
                        <DropdownMenuItem key={workspace.id}>
                            <Building2Icon aria-hidden="true" />
                            <span className="min-w-0 flex-1">
                                <span className="block truncate">{workspace.name}</span>
                                <span className="block truncate text-xs text-muted-foreground">{workspace.role}</span>
                            </span>
                            {workspace.isActive && <CheckIcon aria-hidden="true" className="ml-auto" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <SettingsIcon aria-hidden="true" />
                    Manage workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
