import type { ReactNode } from "react"

import { ThemeToggle } from "@/shared/components/theme-toggle"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-svh bg-background text-foreground">
            <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-mono text-sm font-semibold">
                            FD
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">Finance Dashboard</p>
                            <p className="truncate text-xs text-muted-foreground">Secure workspace access</p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
                <div className="flex flex-1 items-center py-6 lg:py-8">{children}</div>
            </div>
        </main>
    )
}
