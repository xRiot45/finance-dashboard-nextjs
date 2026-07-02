import Link from "next/link"
import {
    ArrowRight,
    BadgeCheck,
    Bell,
    BookOpenCheck,
    BriefcaseBusiness,
    ChartNoAxesCombined,
    CheckCircle2,
    CircleDollarSign,
    Clock3,
    DatabaseZap,
    FileBarChart2,
    FileCheck2,
    Gauge,
    Landmark,
    Layers3,
    LockKeyhole,
    Network,
    ReceiptText,
    Scale,
    ShieldCheck,
    SlidersHorizontal,
    TrendingUp,
    UploadCloud,
    UsersRound,
    WalletCards,
} from "lucide-react"

import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { cn } from "@/shared/lib/utils"

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

const proofMetrics = [
    {
        value: "12+",
        label: "Enterprise modules planned",
        detail: "Dashboard, transactions, budgets, approvals, audit, reports, workspace, and settings.",
    },
    {
        value: "4",
        label: "Governance layers",
        detail: "RBAC, approval workflow, audit trail, and import/export control.",
    },
    {
        value: "100%",
        label: "Design-system driven",
        detail: "Colors, typography, spacing, iconography, and components follow the documented system.",
    },
    {
        value: "1",
        label: "Scalable architecture rule",
        detail: "Features own their code. App Router stays focused on routing.",
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

const featureShowcase = [
    {
        title: "Executive overview",
        description: "High-signal metrics for total balance, income, expense, runway, budget risk, and cash flow.",
        icon: ChartNoAxesCombined,
        status: "Decision ready",
    },
    {
        title: "Transaction control",
        description: "Searchable records with category, account, status, attachment, approval, and audit context.",
        icon: ReceiptText,
        status: "Table first",
    },
    {
        title: "Budget monitoring",
        description: "Usage, thresholds, warning state, exceeded state, and owner visibility for every budget.",
        icon: Gauge,
        status: "Risk aware",
    },
    {
        title: "Financial reports",
        description: "Cash flow, income, expense, account, and budget reports with export-ready structure.",
        icon: FileBarChart2,
        status: "Export ready",
    },
    {
        title: "Workspace roles",
        description: "Member, manager, finance admin, auditor, and owner roles prepared for enterprise access.",
        icon: UsersRound,
        status: "RBAC ready",
    },
    {
        title: "Import pipeline",
        description: "CSV mapping, validation, queued jobs, warning summaries, and rollback-friendly review.",
        icon: DatabaseZap,
        status: "Ops friendly",
    },
] as const

const workflowSteps = [
    {
        title: "Capture",
        detail: "Record income, expenses, transfers, and adjustments with account and category context.",
        icon: WalletCards,
    },
    {
        title: "Review",
        detail: "Route sensitive transactions to approval queues before they impact reporting confidence.",
        icon: FileCheck2,
    },
    {
        title: "Reconcile",
        detail: "Compare budgets, actuals, account movement, and import results in consistent data surfaces.",
        icon: Scale,
    },
    {
        title: "Report",
        detail: "Turn operational data into cash flow, budget, category, and audit-ready finance reports.",
        icon: BookOpenCheck,
    },
] as const

const governanceFeatures = [
    {
        title: "Role-based access",
        detail: "Separate visibility and actions for owners, finance admins, managers, members, and auditors.",
        icon: LockKeyhole,
    },
    {
        title: "Approval guardrails",
        detail: "Pending, approved, rejected, skipped, and needs-review states keep sensitive records governed.",
        icon: BadgeCheck,
    },
    {
        title: "Audit confidence",
        detail: "Every important change can be traced by actor, timestamp, source, and affected entity.",
        icon: ShieldCheck,
    },
    {
        title: "Workspace scale",
        detail: "Accounts, categories, budgets, imports, reports, and settings stay scoped to the right workspace.",
        icon: Network,
    },
] as const

const dashboardRows = [
    ["TXN-2048", "SaaS invoice", "Approved", "+Rp18.4M"],
    ["TXN-2049", "Payroll batch", "Pending", "-Rp42.0M"],
    ["TXN-2050", "Marketing spend", "Review", "-Rp9.8M"],
    ["TXN-2051", "Bank transfer", "Synced", "Rp24.0M"],
] as const

const categoryBreakdown = [
    ["Payroll", "78%", "bg-warning"],
    ["Operations", "56%", "bg-info"],
    ["Software", "42%", "bg-success"],
    ["Marketing", "31%", "bg-neutral"],
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
            <ProofSection />
            <ProductSection />
            <DashboardShowcaseSection />
            <WorkflowSection />
            <GovernanceSection />
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
                    <Link href="#showcase" className="transition-colors hover:text-foreground">
                        Showcase
                    </Link>
                    <Link href="#workflow" className="transition-colors hover:text-foreground">
                        Workflow
                    </Link>
                    <Link href="#architecture" className="transition-colors hover:text-foreground">
                        Architecture
                    </Link>
                    <Link href="#roadmap" className="transition-colors hover:text-foreground">
                        Roadmap
                    </Link>
                </nav>
                <ThemeToggle />
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

function ProofSection() {
    return (
        <section className="border-b bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {proofMetrics.map((metric) => (
                    <div key={metric.label} className="bg-card p-5">
                        <div className="font-mono text-3xl font-medium tracking-normal">{metric.value}</div>
                        <div className="mt-2 text-sm font-medium">{metric.label}</div>
                        <p className="mt-2 text-xs leading-5 text-muted-foreground">{metric.detail}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function ProductSection() {
    return (
        <section id="product" className="border-b px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div className="max-w-2xl">
                        <Badge variant="secondary">Product signal</Badge>
                        <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                            Built around the daily rhythm of finance operations.
                        </h2>
                    </div>
                    <p className="leading-7 text-muted-foreground">
                        The landing page promotes the same product promise the dashboard must deliver: clean records,
                        fast scanning, governed actions, and finance surfaces that stay readable as data grows.
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
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {featureShowcase.map((feature) => (
                        <Card key={feature.title} className="shadow-none">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex size-10 items-center justify-center rounded-lg border bg-background">
                                        <feature.icon aria-hidden="true" />
                                    </div>
                                    <Badge variant="outline">{feature.status}</Badge>
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function DashboardShowcaseSection() {
    return (
        <section id="showcase" className="border-b bg-muted/35 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                    <Badge variant="secondary">Dashboard showcase</Badge>
                    <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                        A preview that feels like the real product.
                    </h2>
                    <p className="mt-4 leading-7 text-muted-foreground">
                        Promote the finance dashboard with a product-like preview: metrics, budget pressure, transaction
                        states, and reporting signals in one calm surface.
                    </p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {[
                            ["Cash visibility", "Income, expense, and net cash flow in one scan."],
                            ["Budget control", "Thresholds and warning states before overspend happens."],
                            ["Approval readiness", "Queues that show what needs finance review next."],
                            ["Audit posture", "Every important change can be explained later."],
                        ].map(([title, detail]) => (
                            <div key={title} className="rounded-lg border bg-card p-4">
                                <div className="text-sm font-medium">{title}</div>
                                <div className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <Card className="overflow-hidden shadow-none">
                    <CardHeader className="border-b">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle>Finance command center</CardTitle>
                                <CardDescription>Operating snapshot for Q3 planning.</CardDescription>
                            </div>
                            <Badge variant="outline">Live preview</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid gap-px bg-border sm:grid-cols-3">
                            {[
                                ["Total balance", "Rp428.7M", "+8.4%"],
                                ["Monthly expense", "Rp116.2M", "3 risks"],
                                ["Approval SLA", "1.8 days", "On track"],
                            ].map(([label, value, detail]) => (
                                <div key={label} className="bg-card p-5">
                                    <div className="text-xs text-muted-foreground">{label}</div>
                                    <div className="mt-2 font-mono text-2xl font-medium">{value}</div>
                                    <div className="mt-2 text-xs text-muted-foreground">{detail}</div>
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-px bg-border lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="bg-card p-5">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-sm font-medium">Cash flow trend</div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            Income vs expense, last 6 months.
                                        </div>
                                    </div>
                                    <Badge variant="secondary">Rp79.1M net</Badge>
                                </div>
                                <div className="flex h-48 items-end gap-3 border-b border-l px-4 pb-4">
                                    {[48, 64, 52, 72, 58, 84].map((height, index) => (
                                        <div
                                            key={height}
                                            className="flex flex-1 flex-col items-center justify-end gap-2"
                                        >
                                            <div className="flex w-full items-end gap-1">
                                                <div
                                                    className="h-20 flex-1 rounded-t-sm bg-chart-2"
                                                    style={{ height: `${height}%` }}
                                                />
                                                <div
                                                    className="h-16 flex-1 rounded-t-sm bg-chart-1"
                                                    style={{ height: `${Math.max(height - 18, 24)}%` }}
                                                />
                                            </div>
                                            <div className="font-mono text-[10px] text-muted-foreground">
                                                M{index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-card p-5">
                                <div className="mb-5">
                                    <div className="text-sm font-medium">Budget pressure</div>
                                    <div className="mt-1 text-xs text-muted-foreground">Top categories by usage.</div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {categoryBreakdown.map(([label, value, fillClassName]) => (
                                        <div key={label}>
                                            <div className="mb-2 flex items-center justify-between text-xs">
                                                <span>{label}</span>
                                                <span className="font-mono text-muted-foreground">{value}</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className={cn("h-full rounded-full", fillClassName)}
                                                    style={{ width: value }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-card p-5">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-medium">Recent finance activity</div>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        Status-first records for fast review.
                                    </div>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <Link href="#workflow">View flow</Link>
                                </Button>
                            </div>
                            <div className="overflow-hidden rounded-lg border">
                                {dashboardRows.map(([id, name, status, amount]) => (
                                    <div
                                        key={id}
                                        className="grid grid-cols-[84px_1fr_86px] gap-3 border-b p-3 text-sm last:border-b-0 sm:grid-cols-[104px_1fr_110px_110px]"
                                    >
                                        <div className="font-mono text-xs text-muted-foreground">{id}</div>
                                        <div className="truncate">{name}</div>
                                        <Badge variant="outline">{status}</Badge>
                                        <div className="hidden text-right font-mono sm:block">{amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

function WorkflowSection() {
    return (
        <section id="workflow" className="border-b px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                    <div>
                        <Badge variant="outline">Operating workflow</Badge>
                        <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                            Finance work, mapped from entry to report.
                        </h2>
                        <p className="mt-4 leading-7 text-muted-foreground">
                            The product story is stronger when buyers can see how a transaction moves from daily input
                            into review, reconciliation, and board-ready reporting.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {workflowSteps.map((step, index) => (
                            <Card key={step.title} className="shadow-none">
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
                                            <step.icon aria-hidden="true" />
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <CardTitle>{step.title}</CardTitle>
                                    <CardDescription>{step.detail}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function GovernanceSection() {
    return (
        <section className="border-b bg-muted/35 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
                    <div>
                        <Badge variant="secondary">Enterprise posture</Badge>
                        <h2 className="mt-4 text-3xl font-medium tracking-normal sm:text-4xl">
                            Built to look trustworthy before the first enterprise feature ships.
                        </h2>
                    </div>
                    <p className="leading-7 text-muted-foreground">
                        Enterprise-ready UI is not just more screens. It is clear permission language, visible review
                        states, consistent status treatment, and predictable data boundaries.
                    </p>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {governanceFeatures.map((feature) => (
                        <Card key={feature.title} className="shadow-none">
                            <CardHeader>
                                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border bg-background">
                                    <feature.icon aria-hidden="true" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.detail}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle>Permission-aware actions</CardTitle>
                            <CardDescription>
                                Every high-impact action gets a clear owner, state, and next step.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
                                {[
                                    ["Owner", "Workspace, billing, members"],
                                    ["Finance admin", "Transactions, budgets, reports"],
                                    ["Auditor", "Read-only logs and exports"],
                                ].map(([role, scope]) => (
                                    <div key={role} className="bg-card p-4">
                                        <div className="text-sm font-medium">{role}</div>
                                        <div className="mt-2 text-xs leading-5 text-muted-foreground">{scope}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle>Operational quality signals</CardTitle>
                            <CardDescription>
                                Promotional proof points that map back to real product modules.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                {[
                                    [Clock3, "Faster close review"],
                                    [SlidersHorizontal, "Cleaner filtering"],
                                    [BriefcaseBusiness, "Workspace-ready scaling"],
                                    [Layers3, "Feature-owned codebase"],
                                ].map(([Icon, label]) => (
                                    <div
                                        key={label as string}
                                        className="flex items-center gap-3 rounded-lg border bg-background p-3 text-sm"
                                    >
                                        <Icon aria-hidden="true" />
                                        <span>{label as string}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
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
