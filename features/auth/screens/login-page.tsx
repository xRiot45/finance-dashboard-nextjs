import { FileCheck2Icon, LockKeyholeIcon, ShieldCheckIcon } from "lucide-react"

import { AuthPageShell } from "@/features/auth/components/auth-page-shell"
import { LoginForm } from "@/features/auth/components/login-form"

const loginInsights = [
    {
        description: "Session access is positioned around workspace role, active company, and finance permissions.",
        icon: LockKeyholeIcon,
        title: "Workspace-aware session",
    },
    {
        description: "Approval queues and sensitive transaction edits are prepared for guarded access.",
        icon: FileCheck2Icon,
        title: "Approval controls",
    },
    {
        description: "Audit-oriented copy keeps users aware that finance changes need traceable ownership.",
        icon: ShieldCheckIcon,
        title: "Audit-ready behavior",
    },
] as const

const loginStats = [
    {
        label: "Finance modules protected",
        value: "12",
    },
    {
        label: "Approval states ready",
        value: "5",
    },
    {
        label: "Workspace scope",
        value: "100%",
    },
] as const

const loginTimeline = [
    {
        description: "Confirm the user identity for the selected finance workspace.",
        label: "Identify",
    },
    {
        description: "Prepare role-aware access before showing dashboard data.",
        label: "Authorize",
    },
    {
        description: "Route the user into metrics, transactions, budgets, and reports.",
        label: "Continue",
    },
] as const

export function LoginPage() {
    return (
        <AuthPageShell
            eyebrow="Secure sign in"
            formDescription="Enter your workspace credentials to continue into the finance operating system."
            formTitle="Sign in to Finance Dashboard"
            sideDescription="Access starts with a calm, auditable checkpoint before users reach balances, approvals, reports, and exports."
            sideItems={loginInsights}
            sideTitle="Protect every finance decision before the dashboard opens."
            stats={loginStats}
            switchHref="/register"
            switchLabel="Create workspace"
            switchText="New finance team?"
            timeline={loginTimeline}
        >
            <LoginForm />
        </AuthPageShell>
    )
}
