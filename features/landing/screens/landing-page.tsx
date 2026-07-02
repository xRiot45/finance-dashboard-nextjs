import Link from "next/link"
import {
    ArrowRight,
    Bell,
    CheckCircle2,
    CircleDollarSign,
    FileCheck2,
    Gauge,
    Landmark,
    LockKeyhole,
    ReceiptText,
    ShieldCheck,
    TrendingUp,
    UploadCloud,
    WalletCards,
} from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"

const financeMetrics = [
    {
        label: "Net cash flow",
        value: "+Rp79.1M",
        detail: "6 month operating trend",
        icon: TrendingUp,
    },
    {
        label: "Budget risk",
        value: "3 alerts",
        detail: "Payroll, marketing, supplies",
        icon: Bell,
    },
    {
        label: "Approval queue",
        value: "12 items",
        detail: "Ready for manager review",
        icon: FileCheck2,
    },
] as const

const productModules = [
    {
        title: "Operational finance",
        description: "Track accounts, transactions, categories, budgets, and reports in one workspace-scoped system.",
        icon: WalletCards,
    },
    {
        title: "Governed workflows",
        description:
            "Approval, audit trail, role-based access, and import/export are planned into the product foundation.",
        icon: ShieldCheck,
    },
    {
        title: "Readable data surfaces",
        description: "Metric cards, tables, filters, charts, and empty states follow the same design language.",
        icon: Gauge,
    },
] as const

const buildPrinciples = [
    "Feature-Based Architecture",
    "Thin App Router",
    "Shadcn UI components",
    "Zustand for client UI state",
    "TanStack Query for server state",
    "Enterprise-ready documentation",
] as const

const timelineItems = [
    {
        phase: "01",
        title: "Foundation",
        detail: "Shell, theme, layout, dummy data, utilities.",
    },
    {
        phase: "02",
        title: "MVP finance",
        detail: "Dashboard, transactions, accounts, categories.",
    },
    {
        phase: "03",
        title: "Enterprise layer",
        detail: "Workspace, RBAC, approval, audit, import/export.",
    },
] as const

export function LandingPage() {
    return (
        <main className="min-h-svh bg-background text-foreground">
            <HeroSection />
            <ProductSection />
            <ArchitectureSection />
            <RoadmapSection />
            <FinalCallToAction />
        </main>
    )
}

function HeroSection() {
    return (
        <section className="relative isolate min-h-[92svh] overflow-hidden border-b bg-background">
            <DashboardBackdrop />
            <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3" aria-label="Finance Dashboard NextJS home">
                    <span className="flex size-9 items-center justify-center rounded-lg border bg-card">
                        <CircleDollarSign aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium tracking-normal">Finance Dashboard NextJS</span>
                </Link>
                <nav
                    aria-label="Landing navigation"
                    className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
                >
                    <Link href="#product" className="transition-colors hover:text-foreground">
                        Product
                    </Link>
                    <Link href="#architecture" className="transition-colors hover:text-foreground">
                        Architecture
                    </Link>
                    <Link href="#roadmap" className="transition-colors hover:text-foreground">
                        Roadmap
                    </Link>
                </nav>
            </header>

            <div className="relative z-10 mx-auto flex min-h-[calc(92svh-76px)] w-full max-w-7xl items-center px-4 pt-10 pb-12 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <Badge variant="outline" className="mb-5 bg-background/80">
                        Enterprise-ready finance dashboard starter
                    </Badge>
                    <h1 className="max-w-4xl text-5xl leading-[0.95] font-medium tracking-normal sm:text-6xl lg:text-7xl">
                        Finance Dashboard NextJS
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        A structured finance dashboard foundation for teams that need clearer transactions, budgets,
                        reports, approvals, and audit-ready workflows without rebuilding the product architecture later.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <Link href="#product">
                                Explore the product
                                <ArrowRight data-icon="inline-end" aria-hidden="true" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="#architecture">View architecture</Link>
                        </Button>
                    </div>
                    <div className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
                        {financeMetrics.map((metric) => (
                            <div key={metric.label} className="bg-card p-4">
                                <metric.icon aria-hidden="true" />
                                <div className="mt-4 font-mono text-xl font-medium">{metric.value}</div>
                                <div className="mt-1 text-sm font-medium">{metric.label}</div>
                                <div className="mt-1 text-xs leading-5 text-muted-foreground">{metric.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function DashboardBackdrop() {
    return (
        <div aria-hidden="true" className="absolute inset-0 z-0">
            <div className="absolute inset-y-0 right-0 hidden w-[58%] border-l bg-muted/40 lg:block">
                <div className="grid h-full grid-cols-[72px_1fr]">
                    <div className="border-r bg-card/80 p-3">
                        <div className="mb-8 size-8 rounded-lg border bg-background" />
                        <div className="flex flex-col gap-3">
                            {["h-8", "h-8", "h-8", "h-8", "h-8"].map((heightClass, index) => (
                                <div key={index} className={`${heightClass} rounded-md bg-muted`} />
                            ))}
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="mb-8 flex items-center justify-between border-b pb-5">
                            <div>
                                <div className="h-3 w-28 rounded-sm bg-foreground/20" />
                                <div className="mt-3 h-6 w-64 rounded-sm bg-foreground/10" />
                            </div>
                            <div className="h-9 w-36 rounded-lg border bg-card" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {["Revenue", "Expenses", "Runway"].map((label, index) => (
                                <div key={label} className="rounded-lg border bg-card p-4 shadow-xs">
                                    <div className="flex items-center justify-between">
                                        <div className="h-3 w-20 rounded-sm bg-muted" />
                                        <div className="size-7 rounded-md bg-muted" />
                                    </div>
                                    <div className="mt-6 h-8 w-24 rounded-sm bg-foreground/15" />
                                    <div className="mt-3 h-2 rounded-sm bg-muted">
                                        <div
                                            className="h-2 rounded-sm bg-foreground/30"
                                            style={{ width: `${48 + index * 18}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 grid grid-cols-[1.25fr_0.75fr] gap-4">
                            <div className="rounded-lg border bg-card p-5 shadow-xs">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="h-4 w-36 rounded-sm bg-foreground/15" />
                                    <div className="h-7 w-24 rounded-md bg-muted" />
                                </div>
                                <div className="flex h-44 items-end gap-3 border-b border-l px-4 pb-4">
                                    {[54, 38, 68, 47, 76, 61, 86].map((height) => (
                                        <div key={height} className="flex flex-1 flex-col justify-end">
                                            <div
                                                className="rounded-t-sm bg-foreground/25"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-lg border bg-card p-5 shadow-xs">
                                <div className="h-4 w-32 rounded-sm bg-foreground/15" />
                                <div className="mt-6 flex flex-col gap-3">
                                    {["Approved", "Pending", "Flagged", "Exported"].map((item) => (
                                        <div key={item} className="flex items-center justify-between">
                                            <div className="h-3 w-24 rounded-sm bg-muted" />
                                            <div className="h-5 w-12 rounded-full bg-muted" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,var(--background)_34%,transparent_72%)] lg:block" />
        </div>
    )
}

function ProductSection() {
    return (
        <section id="product" className="border-b px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <Badge variant="secondary">Product signal</Badge>
                    <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                        Built around the daily rhythm of finance operations.
                    </h2>
                    <p className="mt-4 leading-7 text-muted-foreground">
                        The landing page promotes the same product promise the dashboard must deliver: clean records,
                        fast scanning, and governance ready to scale with the team.
                    </p>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {productModules.map((module) => (
                        <Card key={module.title} className="shadow-none">
                            <CardHeader>
                                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border bg-muted">
                                    <module.icon aria-hidden="true" />
                                </div>
                                <CardTitle>{module.title}</CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ArchitectureSection() {
    return (
        <section id="architecture" className="border-b bg-muted/35 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                    <Badge variant="outline" className="bg-background">
                        Architecture
                    </Badge>
                    <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                        Documented before it grows.
                    </h2>
                    <p className="mt-4 leading-7 text-muted-foreground">
                        The project is organized so the promotional surface, dashboard shell, finance modules, and
                        enterprise workflows can evolve without turning the App Router into a logic drawer.
                    </p>
                </div>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle>Implementation contract</CardTitle>
                        <CardDescription>Every feature follows the same boundary.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
                            {[
                                ["app", "Routing only"],
                                ["features", "Product modules"],
                                ["shared", "Reusable foundation"],
                            ].map(([folderName, folderPurpose]) => (
                                <div key={folderName} className="bg-card p-4">
                                    <div className="font-mono text-sm">{folderName}/</div>
                                    <div className="mt-2 text-sm text-muted-foreground">{folderPurpose}</div>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-6" />
                        <div className="grid gap-3 sm:grid-cols-2">
                            {buildPrinciples.map((principle) => (
                                <div key={principle} className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 aria-hidden="true" />
                                    <span>{principle}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

function RoadmapSection() {
    return (
        <section id="roadmap" className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <Badge variant="secondary">Development roadmap</Badge>
                        <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                            From polished demo to enterprise workflow.
                        </h2>
                    </div>
                    <div className="grid gap-4">
                        {timelineItems.map((item) => (
                            <Card key={item.phase} className="shadow-none">
                                <CardContent className="grid gap-4 p-5 sm:grid-cols-[72px_1fr] sm:items-center">
                                    <div className="font-mono text-2xl text-muted-foreground">{item.phase}</div>
                                    <div>
                                        <div className="font-medium">{item.title}</div>
                                        <div className="mt-1 text-sm leading-6 text-muted-foreground">
                                            {item.detail}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function FinalCallToAction() {
    return (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-lg border bg-foreground p-8 text-background sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <h2 className="text-3xl font-medium tracking-normal">Ready for the dashboard build.</h2>
                        <p className="mt-3 max-w-2xl leading-7 text-background/70">
                            The promotional page now sets the product tone: calm finance operations, clear architecture,
                            and a visible path to enterprise readiness.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild variant="secondary" size="lg">
                            <Link href="#product">
                                Review product
                                <ArrowRight data-icon="inline-end" aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="mt-8 grid gap-3 border-t border-background/20 pt-6 text-sm text-background/70 sm:grid-cols-4">
                    {[
                        [Landmark, "Accounts"],
                        [ReceiptText, "Transactions"],
                        [UploadCloud, "Import/export"],
                        [LockKeyhole, "RBAC ready"],
                    ].map(([Icon, label]) => (
                        <div key={label as string} className="flex items-center gap-2">
                            <Icon aria-hidden="true" />
                            <span>{label as string}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
