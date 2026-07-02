import { DashboardShell } from "@/shared/layout/app-shell"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <DashboardShell>{children}</DashboardShell>
}
