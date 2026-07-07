import { BadgeCheckIcon, Building2Icon, Layers3Icon } from "lucide-react"

import { AuthPageShell } from "@/features/auth/components/auth-page-shell"
import { RegisterForm } from "@/features/auth/components/register-form"

const registerInsights = [
    {
        description: "The first workspace becomes the boundary for accounts, categories, budgets, and reports.",
        icon: Building2Icon,
        title: "Workspace foundation",
    },
    {
        description: "Registration copy introduces owner, admin, manager, member, and auditor access patterns.",
        icon: BadgeCheckIcon,
        title: "Role model ready",
    },
    {
        description: "Core finance modules are presented as one governed operating layer, not isolated screens.",
        icon: Layers3Icon,
        title: "Module onboarding",
    },
] as const

const registerStats = [
    {
        label: "Setup checkpoints",
        value: "4",
    },
    {
        label: "Governance layers",
        value: "3",
    },
    {
        label: "Core finance pages",
        value: "6",
    },
] as const

const registerTimeline = [
    {
        description: "Create the owner identity and workspace shell.",
        label: "Account",
    },
    {
        description: "Prepare accounts, categories, budgets, and reporting surfaces.",
        label: "Workspace",
    },
    {
        description: "Invite teammates once RBAC and member settings are connected.",
        label: "Governance",
    },
] as const

export function RegisterPage() {
    return (
        <AuthPageShell
            eyebrow="Workspace onboarding"
            formDescription="Create the first owner profile and workspace container for finance operations."
            formTitle="Create your finance workspace"
            sideDescription="Registration is designed as an operational setup moment: identity, workspace, finance modules, and governance all stay visible."
            sideItems={registerInsights}
            sideTitle="Start with a workspace that can scale into enterprise controls."
            stats={registerStats}
            switchHref="/login"
            switchLabel="Sign in"
            switchText="Already have access?"
            timeline={registerTimeline}
        >
            <RegisterForm />
        </AuthPageShell>
    )
}
