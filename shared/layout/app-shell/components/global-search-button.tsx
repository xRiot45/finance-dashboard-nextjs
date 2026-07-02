"use client"

import * as React from "react"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/shared/components/ui/command"
import { useAppShellStore } from "@/shared/layout/app-shell/stores/app-shell-store"

const searchTargets = [
    {
        title: "Dashboard overview",
        description: "Financial snapshot and metrics",
        href: "/dashboard",
        shortcut: "D",
    },
    {
        title: "Transactions",
        description: "Search income, expenses, and transfers",
        href: "/transactions",
        shortcut: "T",
    },
    {
        title: "Reports",
        description: "Open income, expense, and cash flow reports",
        href: "/reports",
        shortcut: "R",
    },
    {
        title: "Audit logs",
        description: "Review workspace activity history",
        href: "/audit-logs",
        shortcut: "A",
    },
]

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false
    }

    return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
    )
}

export function GlobalSearchButton() {
    const isGlobalSearchOpen = useAppShellStore((state) => state.isGlobalSearchOpen)
    const setGlobalSearchOpen = useAppShellStore((state) => state.setGlobalSearchOpen)

    React.useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.defaultPrevented || event.repeat || isTypingTarget(event.target)) {
                return
            }

            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                setGlobalSearchOpen(true)
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [setGlobalSearchOpen])

    return (
        <>
            <Button
                type="button"
                variant="outline"
                className="hidden h-9 w-[18rem] justify-start rounded-2xl border-border/70 bg-background/70 text-muted-foreground shadow-xs md:inline-flex xl:w-[24rem]"
                onClick={() => setGlobalSearchOpen(true)}
            >
                <SearchIcon aria-hidden="true" data-icon="inline-start" />
                <span className="truncate">Search transactions, reports, accounts...</span>
                <kbd className="ml-auto rounded-lg border border-border/70 bg-muted/70 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    Ctrl K
                </kbd>
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-2xl md:hidden"
                aria-label="Open search"
                onClick={() => setGlobalSearchOpen(true)}
            >
                <SearchIcon aria-hidden="true" />
            </Button>
            <CommandDialog
                open={isGlobalSearchOpen}
                onOpenChange={setGlobalSearchOpen}
                title="Global search"
                description="Search workspace navigation and finance records."
                className="rounded-3xl"
            >
                <Command>
                    <CommandInput placeholder="Search transactions, reports, accounts..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Navigation">
                            {searchTargets.map((searchTarget) => (
                                <CommandItem
                                    key={searchTarget.href}
                                    value={`${searchTarget.title} ${searchTarget.description}`}
                                    asChild
                                >
                                    <Link href={searchTarget.href} onClick={() => setGlobalSearchOpen(false)}>
                                        <SearchIcon aria-hidden="true" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate">{searchTarget.title}</span>
                                            <span className="block truncate text-xs text-muted-foreground">
                                                {searchTarget.description}
                                            </span>
                                        </span>
                                        <CommandShortcut>{searchTarget.shortcut}</CommandShortcut>
                                    </Link>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    )
}
