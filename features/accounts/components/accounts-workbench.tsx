"use client"

import { useMemo, useState } from "react"
import { AlertCircleIcon, DownloadIcon, PlusIcon } from "lucide-react"

import {
    AccountForm,
    type AccountFormErrors,
    type AccountFormMode,
    type AccountFormValues,
} from "@/features/accounts/components/account-form"
import { AccountDetail } from "@/features/accounts/components/account-detail"
import { AccountFilters } from "@/features/accounts/components/account-filters"
import { AccountSummaryCards } from "@/features/accounts/components/account-summary-cards"
import { AccountsTable } from "@/features/accounts/components/accounts-table"
import { ACCOUNT_PAGE_SIZE, ACCOUNT_VISIBILITY_OPTIONS } from "@/features/accounts/constants/account-options"
import { mockAccounts, type Account } from "@/features/accounts/data/accounts.data"
import {
    filterAccountRows,
    mapAccountRows,
    paginateAccountRows,
    summarizeAccounts,
    type AccountFilterState,
    type AccountTableRow,
} from "@/features/accounts/utils/account-view-models"
import { TransactionsPagination } from "@/features/transactions/components/transactions-pagination"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { formatNumber } from "@/shared/utils"

const ACTIVE_WORKSPACE_ID = "wks_acme"

const DEFAULT_FILTERS: AccountFilterState = {
    query: "",
    status: "all",
    type: "all",
}

const DEFAULT_FORM_VALUES: AccountFormValues = {
    accountNumberMasked: "**** 2048",
    color: "blue",
    currency: "IDR",
    currentBalance: "0",
    institutionName: "",
    name: "New finance account",
    openingBalance: "0",
    status: "active",
    type: "bank",
}

type AccountDataState = "ready" | "loading" | "error"

export function AccountsWorkbench() {
    const [accounts, setAccounts] = useState<Account[]>(mockAccounts)
    const [dataState, setDataState] = useState<AccountDataState>("ready")
    const [filters, setFilters] = useState<AccountFilterState>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [selectedAccountId, setSelectedAccountId] = useState(mockAccounts[0]?.id ?? null)
    const [formMode, setFormMode] = useState<AccountFormMode>("create")
    const [editingAccountId, setEditingAccountId] = useState<string | null>(null)
    const [formValues, setFormValues] = useState<AccountFormValues>(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState<AccountFormErrors>({})
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

    const workspaceAccounts = useMemo(
        () => accounts.filter((account) => account.workspaceId === ACTIVE_WORKSPACE_ID),
        [accounts]
    )
    const accountRows = useMemo(() => mapAccountRows(workspaceAccounts), [workspaceAccounts])
    const filteredRows = useMemo(() => filterAccountRows(accountRows, filters), [accountRows, filters])
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / ACCOUNT_PAGE_SIZE))
    const safePage = Math.min(page, pageCount)
    const visibleRows = useMemo(
        () => paginateAccountRows(filteredRows, safePage, ACCOUNT_PAGE_SIZE),
        [filteredRows, safePage]
    )
    const summary = useMemo(() => summarizeAccounts(filteredRows), [filteredRows])
    const selectedAccount = accountRows.find((account) => account.id === selectedAccountId) ?? null

    function updateFilters(nextFilters: Partial<AccountFilterState>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }))
        setPage(1)
    }

    function resetFilters() {
        setFilters(DEFAULT_FILTERS)
        setPage(1)
    }

    function applyVisibilityView(view: string) {
        const visibility = ACCOUNT_VISIBILITY_OPTIONS.find((option) => option.value === view)?.value ?? "all"

        updateFilters({ status: visibility })
    }

    function startCreateAccount() {
        setFormMode("create")
        setEditingAccountId(null)
        setFormValues(DEFAULT_FORM_VALUES)
        setFormErrors({})
        setIsFormDialogOpen(true)
    }

    function startEditAccount(account: AccountTableRow) {
        setFormMode("edit")
        setEditingAccountId(account.id)
        setSelectedAccountId(account.id)
        setFormValues(mapAccountToFormValues(account))
        setFormErrors({})
        setIsDetailDialogOpen(false)
        setIsFormDialogOpen(true)
    }

    function viewAccount(account: AccountTableRow) {
        setSelectedAccountId(account.id)
        setIsDetailDialogOpen(true)
    }

    function archiveAccount(account: AccountTableRow) {
        const timestamp = new Date().toISOString()

        setAccounts((currentAccounts) =>
            currentAccounts.map((currentAccount) =>
                currentAccount.id === account.id
                    ? {
                          ...currentAccount,
                          archivedAt: timestamp,
                          status: "archived",
                          updatedAt: timestamp,
                      }
                    : currentAccount
            )
        )
    }

    function saveAccount() {
        const nextErrors = validateAccountForm(formValues)

        setFormErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        const nextAccount = buildAccountFromFormValues({
            accountCount: accounts.length,
            existingAccount: accounts.find((account) => account.id === editingAccountId) ?? null,
            formMode,
            formValues,
        })

        setAccounts((currentAccounts) => {
            if (formMode === "edit" && editingAccountId) {
                return currentAccounts.map((account) => (account.id === editingAccountId ? nextAccount : account))
            }

            return [nextAccount, ...currentAccounts]
        })
        setSelectedAccountId(nextAccount.id)
        setFormMode("edit")
        setEditingAccountId(nextAccount.id)
        setFormValues(mapAccountToFormValues(nextAccount))
        setFormErrors({})
        setDataState("ready")
        setIsFormDialogOpen(false)
        setIsDetailDialogOpen(true)
    }

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Accounts</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Manage bank accounts, cash, wallets, cards, and investment sources used across finance
                        workflows.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={startCreateAccount} type="button">
                        <PlusIcon aria-hidden="true" data-icon="inline-start" />
                        Add account
                    </Button>
                    <Button type="button" variant="outline">
                        <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <AccountSummaryCards summary={summary} />

            <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                <CardHeader>
                    <div>
                        <CardTitle>Account sources</CardTitle>
                        <CardDescription>
                            {formatNumber(filteredRows.length)} of {formatNumber(accountRows.length)} accounts visible
                            in the current view.
                        </CardDescription>
                    </div>
                    <CardAction>
                        <Tabs defaultValue="all" onValueChange={applyVisibilityView}>
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="archived">Archived</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {dataState === "error" ? (
                        <Alert variant="destructive">
                            <AlertCircleIcon aria-hidden="true" />
                            <AlertTitle>Accounts could not be refreshed</AlertTitle>
                            <AlertDescription>
                                The local data state is showing an error pattern. Try again or continue editing the
                                current draft list.
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    <AccountFilters
                        filters={filters}
                        onFiltersChange={updateFilters}
                        onReset={resetFilters}
                        resultCount={filteredRows.length}
                    />
                    <AccountsTable
                        isLoading={dataState === "loading"}
                        onArchiveAccount={archiveAccount}
                        onEditAccount={startEditAccount}
                        onViewAccount={viewAccount}
                        rows={dataState === "error" ? [] : visibleRows}
                    />
                    <TransactionsPagination
                        currentPage={safePage}
                        onPageChange={setPage}
                        pageCount={pageCount}
                        totalCount={filteredRows.length}
                    />
                </CardContent>
            </Card>

            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="scrollbar-thin max-h-[min(760px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-2xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{selectedAccount?.name ?? "Account detail"}</DialogTitle>
                        <DialogDescription>
                            {selectedAccount?.displayInstitutionName ?? "Review the selected finance account."}
                        </DialogDescription>
                    </DialogHeader>
                    <AccountDetail account={selectedAccount} />
                    <DialogFooter>
                        <Button
                            disabled={!selectedAccount}
                            onClick={() => {
                                if (selectedAccount) {
                                    startEditAccount(selectedAccount)
                                }
                            }}
                            type="button"
                        >
                            Edit account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isFormDialogOpen}
                onOpenChange={(open) => {
                    setIsFormDialogOpen(open)

                    if (!open) {
                        setFormErrors({})
                    }
                }}
            >
                <DialogContent className="scrollbar-thin max-h-[min(820px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-3xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{formMode === "create" ? "Add account" : "Edit account"}</DialogTitle>
                        <DialogDescription>
                            Configure the finance source used by transactions, reports, transfers, and permissions.
                        </DialogDescription>
                    </DialogHeader>
                    <AccountForm
                        errors={formErrors}
                        mode={formMode}
                        onChange={(nextValues) => {
                            setFormValues((currentValues) => ({ ...currentValues, ...nextValues }))
                            setFormErrors({})
                        }}
                        onReset={startCreateAccount}
                        onSubmit={saveAccount}
                        values={formValues}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function mapAccountToFormValues(account: Account): AccountFormValues {
    return {
        accountNumberMasked: account.accountNumberMasked ?? "",
        color: account.color,
        currency: account.currency,
        currentBalance: String(account.currentBalance),
        institutionName: account.institutionName ?? "",
        name: account.name,
        openingBalance: String(account.openingBalance),
        status: account.status,
        type: account.type,
    }
}

function validateAccountForm(values: AccountFormValues): AccountFormErrors {
    const errors: AccountFormErrors = {}
    const openingBalance = parseAmount(values.openingBalance)
    const currentBalance = parseAmount(values.currentBalance)

    if (values.name.trim().length < 3) {
        errors.name = "Account name must contain at least 3 characters."
    }

    if (!Number.isFinite(openingBalance)) {
        errors.openingBalance = "Opening balance must be a valid number."
    }

    if (!Number.isFinite(currentBalance)) {
        errors.currentBalance = "Current balance must be a valid number."
    }

    if (!/^[A-Z]{3}$/.test(values.currency.trim())) {
        errors.currency = "Currency must use a 3-letter ISO code."
    }

    if (values.accountNumberMasked && values.accountNumberMasked.trim().length < 4) {
        errors.accountNumberMasked = "Masked number should include at least 4 characters."
    }

    if (values.color.trim().length < 3) {
        errors.color = "Color label must contain at least 3 characters."
    }

    return errors
}

function buildAccountFromFormValues({
    accountCount,
    existingAccount,
    formMode,
    formValues,
}: {
    accountCount: number
    existingAccount: Account | null
    formMode: AccountFormMode
    formValues: AccountFormValues
}) {
    const timestamp = new Date().toISOString()
    const accountNumber = String(accountCount + 1).padStart(3, "0")
    const accountId = formMode === "edit" && existingAccount ? existingAccount.id : `acc_local_${accountNumber}`

    return {
        archivedAt: formValues.status === "archived" ? (existingAccount?.archivedAt ?? timestamp) : null,
        color: formValues.color.trim().toLowerCase(),
        accountNumberMasked: formValues.accountNumberMasked.trim() || null,
        createdAt: existingAccount?.createdAt ?? timestamp,
        createdBy: existingAccount?.createdBy ?? "usr_anna",
        currency: formValues.currency.trim().toUpperCase(),
        currentBalance: parseAmount(formValues.currentBalance),
        id: accountId,
        institutionName: formValues.institutionName.trim() || null,
        name: formValues.name.trim(),
        openingBalance: parseAmount(formValues.openingBalance),
        status: formValues.status,
        type: formValues.type,
        updatedAt: timestamp,
        updatedBy: "usr_anna",
        workspaceId: ACTIVE_WORKSPACE_ID,
    } satisfies Account
}

function parseAmount(amount: string) {
    return Number(amount.replaceAll(",", ""))
}
