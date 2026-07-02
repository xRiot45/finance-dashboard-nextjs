export type BudgetPeriod = "monthly" | "quarterly" | "yearly"
export type BudgetStatus = "active" | "scheduled" | "archived"
export type BudgetUsageStatus = "safe" | "warning" | "exceeded"

export type Budget = {
    id: string
    workspaceId: string
    name: string
    categoryId: string
    period: BudgetPeriod
    startDate: string
    endDate: string
    amount: number
    spentAmount: number
    currency: string
    thresholdPercentage: number
    usagePercentage: number
    usageStatus: BudgetUsageStatus
    status: BudgetStatus
    createdBy: string
    updatedBy: string
    createdAt: string
    updatedAt: string
    archivedAt: string | null
}

export const mockBudgets: Budget[] = [
    {
        id: "bdg_marketing_q2",
        workspaceId: "wks_acme",
        name: "Q2 Marketing Budget",
        categoryId: "cat_marketing_ads",
        period: "quarterly",
        startDate: "2026-04-01",
        endDate: "2026-06-30",
        amount: 52000000,
        spentAmount: 23600000,
        currency: "IDR",
        thresholdPercentage: 80,
        usagePercentage: 45.38,
        usageStatus: "safe",
        status: "active",
        createdBy: "usr_anna",
        updatedBy: "usr_bima",
        createdAt: "2026-03-20T08:00:00.000Z",
        updatedAt: "2026-06-18T08:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "bdg_payroll_june",
        workspaceId: "wks_acme",
        name: "June Payroll Budget",
        categoryId: "cat_payroll",
        period: "monthly",
        startDate: "2026-06-01",
        endDate: "2026-06-30",
        amount: 41000000,
        spentAmount: 39800000,
        currency: "IDR",
        thresholdPercentage: 90,
        usagePercentage: 97.07,
        usageStatus: "warning",
        status: "active",
        createdBy: "usr_anna",
        updatedBy: "usr_bima",
        createdAt: "2026-05-20T08:00:00.000Z",
        updatedAt: "2026-06-05T08:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "bdg_software_q2",
        workspaceId: "wks_acme",
        name: "Q2 Software Tools",
        categoryId: "cat_software_tools",
        period: "quarterly",
        startDate: "2026-04-01",
        endDate: "2026-06-30",
        amount: 15000000,
        spentAmount: 15400000,
        currency: "IDR",
        thresholdPercentage: 85,
        usagePercentage: 102.67,
        usageStatus: "exceeded",
        status: "active",
        createdBy: "usr_anna",
        updatedBy: "usr_bima",
        createdAt: "2026-03-20T08:00:00.000Z",
        updatedAt: "2026-06-18T08:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "bdg_travel_q3",
        workspaceId: "wks_acme",
        name: "Q3 Travel Budget",
        categoryId: "cat_travel",
        period: "quarterly",
        startDate: "2026-07-01",
        endDate: "2026-09-30",
        amount: 24000000,
        spentAmount: 0,
        currency: "IDR",
        thresholdPercentage: 80,
        usagePercentage: 0,
        usageStatus: "safe",
        status: "scheduled",
        createdBy: "usr_anna",
        updatedBy: "usr_anna",
        createdAt: "2026-06-20T08:00:00.000Z",
        updatedAt: "2026-06-20T08:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "bdg_office_supplies_april",
        workspaceId: "wks_acme",
        name: "April Office Supplies",
        categoryId: "cat_office_supplies",
        period: "monthly",
        startDate: "2026-04-01",
        endDate: "2026-04-30",
        amount: 2000000,
        spentAmount: 1850000,
        currency: "IDR",
        thresholdPercentage: 80,
        usagePercentage: 92.5,
        usageStatus: "warning",
        status: "archived",
        createdBy: "usr_anna",
        updatedBy: "usr_citra",
        createdAt: "2026-03-20T08:00:00.000Z",
        updatedAt: "2026-05-01T08:00:00.000Z",
        archivedAt: "2026-05-01T08:00:00.000Z",
    },
]

export const mockActiveBudgets = mockBudgets.filter((budget) => budget.status === "active")
