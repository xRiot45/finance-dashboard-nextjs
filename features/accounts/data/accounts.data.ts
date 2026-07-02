export type AccountType = "bank" | "cash" | "wallet" | "credit_card" | "investment"
export type AccountStatus = "active" | "archived"

export type Account = {
    id: string
    workspaceId: string
    name: string
    type: AccountType
    institutionName: string | null
    accountNumberMasked: string | null
    currency: string
    openingBalance: number
    currentBalance: number
    status: AccountStatus
    color: string
    createdBy: string
    updatedBy: string
    createdAt: string
    updatedAt: string
    archivedAt: string | null
}

export const mockAccounts: Account[] = [
    {
        id: "acc_bca_operational",
        workspaceId: "wks_acme",
        name: "BCA Operational",
        type: "bank",
        institutionName: "Bank Central Asia",
        accountNumberMasked: "**** 3021",
        currency: "IDR",
        openingBalance: 125000000,
        currentBalance: 158450000,
        status: "active",
        color: "blue",
        createdBy: "usr_anna",
        updatedBy: "usr_anna",
        createdAt: "2025-12-01T08:00:00.000Z",
        updatedAt: "2026-07-01T17:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "acc_mandiri_payroll",
        workspaceId: "wks_acme",
        name: "Mandiri Payroll",
        type: "bank",
        institutionName: "Bank Mandiri",
        accountNumberMasked: "**** 8910",
        currency: "IDR",
        openingBalance: 55000000,
        currentBalance: 42250000,
        status: "active",
        color: "yellow",
        createdBy: "usr_anna",
        updatedBy: "usr_bima",
        createdAt: "2025-12-01T08:00:00.000Z",
        updatedAt: "2026-07-01T17:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "acc_cash_office",
        workspaceId: "wks_acme",
        name: "Office Cash",
        type: "cash",
        institutionName: null,
        accountNumberMasked: null,
        currency: "IDR",
        openingBalance: 5000000,
        currentBalance: 3250000,
        status: "active",
        color: "green",
        createdBy: "usr_anna",
        updatedBy: "usr_citra",
        createdAt: "2025-12-02T08:00:00.000Z",
        updatedAt: "2026-06-29T12:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "acc_gopay_sales",
        workspaceId: "wks_acme",
        name: "GoPay Sales",
        type: "wallet",
        institutionName: "GoPay",
        accountNumberMasked: "**** 7712",
        currency: "IDR",
        openingBalance: 12000000,
        currentBalance: 18600000,
        status: "active",
        color: "cyan",
        createdBy: "usr_bima",
        updatedBy: "usr_bima",
        createdAt: "2026-01-02T08:00:00.000Z",
        updatedAt: "2026-07-01T17:00:00.000Z",
        archivedAt: null,
    },
    {
        id: "acc_bni_legacy",
        workspaceId: "wks_acme",
        name: "BNI Legacy",
        type: "bank",
        institutionName: "Bank Negara Indonesia",
        accountNumberMasked: "**** 4480",
        currency: "IDR",
        openingBalance: 18000000,
        currentBalance: 0,
        status: "archived",
        color: "orange",
        createdBy: "usr_anna",
        updatedBy: "usr_anna",
        createdAt: "2025-10-01T08:00:00.000Z",
        updatedAt: "2026-02-01T08:00:00.000Z",
        archivedAt: "2026-02-01T08:00:00.000Z",
    },
]
