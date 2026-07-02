"use client"

import * as React from "react"
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"

const themeOptions = [
    {
        label: "Light",
        value: "light",
        icon: SunIcon,
    },
    {
        label: "Dark",
        value: "dark",
        icon: MoonIcon,
    },
    {
        label: "System",
        value: "system",
        icon: MonitorIcon,
    },
] as const

function ThemeToggle() {
    const isMounted = React.useSyncExternalStore(
        React.useCallback(() => () => {}, []),
        () => true,
        () => false
    )
    const { resolvedTheme, setTheme, theme } = useTheme()

    const currentTheme = isMounted ? theme : "system"
    const ResolvedThemeIcon = isMounted && resolvedTheme === "dark" ? MoonIcon : SunIcon

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Change theme">
                    <ResolvedThemeIcon data-icon="inline-start" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                {themeOptions.map((option) => {
                    const ThemeOptionIcon = option.icon
                    const isSelected = currentTheme === option.value

                    return (
                        <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)}>
                            <ThemeOptionIcon aria-hidden="true" />
                            <span>{option.label}</span>
                            <CheckIcon
                                aria-hidden="true"
                                className={cn("ml-auto opacity-0", isSelected && "opacity-100")}
                            />
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { ThemeToggle }
