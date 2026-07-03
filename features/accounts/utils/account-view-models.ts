import type { Account, AccountStatus, AccountType } from "@/features/accounts"

export type AccountFilterState = {
    query: string
    status: AccountStatus | "all"
    type: AccountType | "all"
}

export type AccountTableRow = Account & {
    balanceDelta: number
    balanceDeltaPercentage: number
    balanceWeightPercentage: number
    displayInstitutionName: string
    displayMaskedNumber: string
    hasNegativeBalance: boolean
}

export type AccountSummary = {
    activeAccountCount: number
    archivedAccountCount: number
    availableBalanceAmount: number
    largestAccount: AccountTableRow | null
    totalAccountCount: number
    totalBalanceAmount: number
}

export function mapAccountRows(accounts: Account[]): AccountTableRow[] {
    const totalPositiveBalance = accounts
        .filter((account) => account.currentBalance > 0)
        .reduce((sum, account) => sum + account.currentBalance, 0)

    return accounts.map((account) => {
        const balanceDelta = account.currentBalance - account.openingBalance
        const balanceDeltaPercentage =
            account.openingBalance === 0 ? 0 : (balanceDelta / Math.abs(account.openingBalance)) * 100
        const balanceWeightPercentage =
            totalPositiveBalance === 0 ? 0 : (Math.max(account.currentBalance, 0) / totalPositiveBalance) * 100

        return {
            ...account,
            balanceDelta,
            balanceDeltaPercentage,
            balanceWeightPercentage,
            displayInstitutionName: account.institutionName ?? "Internal finance",
            displayMaskedNumber: account.accountNumberMasked ?? "No account number",
            hasNegativeBalance: account.currentBalance < 0,
        }
    })
}

export function filterAccountRows(rows: AccountTableRow[], filters: AccountFilterState) {
    const normalizedQuery = filters.query.trim().toLowerCase()

    return rows.filter((account) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            [
                account.name,
                account.displayInstitutionName,
                account.displayMaskedNumber,
                account.currency,
                account.type,
                account.status,
            ]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery)
        const matchesType = filters.type === "all" || account.type === filters.type
        const matchesStatus = filters.status === "all" || account.status === filters.status

        return matchesQuery && matchesType && matchesStatus
    })
}

export function paginateAccountRows(rows: AccountTableRow[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize

    return rows.slice(start, start + pageSize)
}

export function summarizeAccounts(rows: AccountTableRow[]): AccountSummary {
    const activeAccounts = rows.filter((account) => account.status === "active")
    const archivedAccounts = rows.filter((account) => account.status === "archived")
    const largestAccount = activeAccounts.reduce<AccountTableRow | null>((largest, account) => {
        if (!largest || account.currentBalance > largest.currentBalance) {
            return account
        }

        return largest
    }, null)

    return {
        activeAccountCount: activeAccounts.length,
        archivedAccountCount: archivedAccounts.length,
        availableBalanceAmount: activeAccounts.reduce((sum, account) => sum + account.currentBalance, 0),
        largestAccount,
        totalAccountCount: rows.length,
        totalBalanceAmount: rows.reduce((sum, account) => sum + account.currentBalance, 0),
    }
}
