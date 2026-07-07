import { KeyRoundIcon, MailCheckIcon, ShieldAlertIcon } from "lucide-react"

import { AuthPageShell } from "@/features/auth/components/auth-page-shell"
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"

const recoveryInsights = [
    {
        description: "Recovery starts from the same work email used for finance approvals and exports.",
        icon: MailCheckIcon,
        title: "Verified inbox",
    },
    {
        description: "Reset copy is careful around shared devices, lost access, and workspace ownership.",
        icon: ShieldAlertIcon,
        title: "Risk-aware reset",
    },
    {
        description: "The UI is ready for provider-backed reset links, token expiry, and session invalidation.",
        icon: KeyRoundIcon,
        title: "Provider-ready flow",
    },
] as const

const recoveryStats = [
    {
        label: "Reset checkpoints",
        value: "3",
    },
    {
        label: "Session note",
        value: "Required",
    },
    {
        label: "Audit context",
        value: "Ready",
    },
] as const

const recoveryTimeline = [
    {
        description: "Submit the email tied to the finance workspace.",
        label: "Request",
    },
    {
        description: "Receive secure reset instructions from the future email provider.",
        label: "Verify",
    },
    {
        description: "Return to login after the password is updated.",
        label: "Resume",
    },
] as const

export function ForgotPasswordPage() {
    return (
        <AuthPageShell
            eyebrow="Account recovery"
            formDescription="Request reset instructions for the email connected to your finance workspace."
            formTitle="Recover workspace access"
            sideDescription="Password recovery is framed as a security-sensitive workflow because finance exports, approvals, and account balances sit behind it."
            sideItems={recoveryInsights}
            sideTitle="Reset access without losing finance governance context."
            stats={recoveryStats}
            switchHref="/login"
            switchLabel="Back to login"
            switchText="Remembered your password?"
            timeline={recoveryTimeline}
        >
            <ForgotPasswordForm />
        </AuthPageShell>
    )
}
