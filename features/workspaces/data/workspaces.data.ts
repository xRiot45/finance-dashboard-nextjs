export type WorkspacePlan = "free" | "pro" | "business" | "enterprise"
export type WorkspaceStatus = "active" | "suspended" | "archived"

export type Workspace = {
    id: string
    name: string
    slug: string
    currency: string
    timezone: string
    plan: WorkspacePlan
    status: WorkspaceStatus
    createdAt: string
    updatedAt: string
}

export const mockWorkspaces: Workspace[] = [
    {
        id: "wks_acme",
        name: "Acme Studio",
        slug: "acme-studio",
        currency: "IDR",
        timezone: "Asia/Jakarta",
        plan: "business",
        status: "active",
        createdAt: "2025-12-01T08:00:00.000Z",
        updatedAt: "2026-07-01T08:00:00.000Z",
    },
    {
        id: "wks_personal",
        name: "Personal Finance",
        slug: "personal-finance",
        currency: "IDR",
        timezone: "Asia/Jakarta",
        plan: "pro",
        status: "active",
        createdAt: "2025-11-10T08:00:00.000Z",
        updatedAt: "2026-07-01T08:00:00.000Z",
    },
]

export const mockActiveWorkspace = mockWorkspaces[0]
