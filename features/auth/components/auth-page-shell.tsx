import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import {
    BadgeCheckIcon,
    ChartNoAxesCombinedIcon,
    LockKeyholeIcon,
    ShieldCheckIcon,
    UsersRoundIcon,
    WalletCardsIcon,
} from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"

type AuthPageShellProps = {
    children: ReactNode
    eyebrow: string
    formTitle: string
    formDescription: string
    sideTitle: string
    sideDescription: string
    sideItems: readonly AuthInsightItem[]
    stats: readonly AuthStat[]
    switchHref: string
    switchLabel: string
    switchText: string
    timeline: readonly AuthTimelineItem[]
}

export type AuthInsightItem = {
    description: string
    icon: LucideIcon
    title: string
}

export type AuthStat = {
    label: string
    value: string
}

export type AuthTimelineItem = {
    description: string
    label: string
}

const workspaceRows = [
    ["Operating balance", "Rp482.6M", "Reconciled"],
    ["Pending approval", "18 items", "Manager queue"],
    ["Budget pressure", "3 alerts", "Needs review"],
] as const

const assuranceItems = [
    {
        icon: ShieldCheckIcon,
        label: "Role-scoped access",
    },
    {
        icon: BadgeCheckIcon,
        label: "Approval-first workflows",
    },
    {
        icon: LockKeyholeIcon,
        label: "Audit-ready sessions",
    },
] as const

export function AuthPageShell({
    children,
    eyebrow,
    formDescription,
    formTitle,
    sideDescription,
    sideItems,
    sideTitle,
    stats,
    switchHref,
    switchLabel,
    switchText,
    timeline,
}: AuthPageShellProps) {
    return (
        <div className="grid w-full gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.6fr)] lg:items-center">
            <section className="order-2 flex min-w-0 flex-col gap-4 lg:order-1">
                <div className="flex flex-col gap-3">
                    <Badge className="w-fit" variant="secondary">
                        {eyebrow}
                    </Badge>
                    <div className="max-w-3xl">
                        <h1 className="text-page-title font-semibold">{sideTitle}</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{sideDescription}</p>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <div className="rounded-3xl border border-border bg-card/95 p-4 shadow-xs" key={stat.label}>
                            <p className="font-mono text-xl font-semibold">{stat.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <Card className="border-border/70 bg-card/95 shadow-xs">
                        <CardHeader>
                            <div className="flex items-start gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
                                    <ChartNoAxesCombinedIcon aria-hidden="true" className="size-5" />
                                </span>
                                <div>
                                    <CardTitle>Workspace preview</CardTitle>
                                    <CardDescription>Finance signals users see after authentication.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {workspaceRows.map(([label, value, status]) => (
                                <div
                                    className="grid gap-2 rounded-2xl border border-border/70 bg-muted/20 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                                    key={label}
                                >
                                    <p className="text-sm font-medium">{label}</p>
                                    <p className="font-mono text-sm">{value}</p>
                                    <Badge className="w-fit" variant="outline">
                                        {status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-border/70 bg-card/95 shadow-xs">
                        <CardHeader>
                            <CardTitle>Access assurance</CardTitle>
                            <CardDescription>Security patterns planned into the enterprise layer.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {assuranceItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <div className="flex items-center gap-3" key={item.label}>
                                        <span className="flex size-8 items-center justify-center rounded-2xl bg-muted text-foreground">
                                            <Icon aria-hidden="true" className="size-4" />
                                        </span>
                                        <p className="text-sm">{item.label}</p>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card className="border-border/70 bg-card/95 shadow-xs">
                        <CardHeader>
                            <CardTitle>Security checklist</CardTitle>
                            <CardDescription>What this auth surface is prepared to protect.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {sideItems.map((item) => {
                                const Icon = item.icon

                                return (
                                    <div className="flex gap-3" key={item.title}>
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
                                            <Icon aria-hidden="true" className="size-4" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium">{item.title}</p>
                                            <p className="text-xs leading-5 text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>

                    <Card className="border-border/70 bg-card/95 shadow-xs">
                        <CardHeader>
                            <CardTitle>Access flow</CardTitle>
                            <CardDescription>Clear steps before users reach finance data.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {timeline.map((item, index) => (
                                <div className="flex gap-3" key={item.label}>
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/30 font-mono text-xs">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">{item.label}</p>
                                        <p className="text-xs leading-5 text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="order-1 lg:order-2">
                <Card className="mx-auto w-full max-w-md border-border/70 bg-card/95 shadow-xs lg:max-w-none">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle>{formTitle}</CardTitle>
                                <CardDescription className="mt-1">{formDescription}</CardDescription>
                            </div>
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
                                <WalletCardsIcon aria-hidden="true" className="size-5" />
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                        {children}
                        <Separator />
                        <p className="text-center text-sm text-muted-foreground">
                            {switchText}{" "}
                            <Link
                                className="font-medium text-foreground underline underline-offset-4"
                                href={switchHref}
                            >
                                {switchLabel}
                            </Link>
                        </p>
                    </CardContent>
                </Card>
                <div className="mx-auto mt-4 flex w-full max-w-md items-center justify-center gap-2 text-center text-xs text-muted-foreground lg:max-w-none">
                    <UsersRoundIcon aria-hidden="true" className="size-4" />
                    <span>Built for owners, admins, managers, members, and auditors.</span>
                </div>
            </section>
        </div>
    )
}
