"use client"

import { useMemo, useState } from "react"
import { DownloadIcon, PlusIcon, ReceiptTextIcon } from "lucide-react"

import { mockAccounts } from "@/features/accounts"
import { mockCategories } from "@/features/categories"
import { TransactionBulkActions } from "@/features/transactions/components/transaction-bulk-actions"
import { TransactionDetail } from "@/features/transactions/components/transaction-detail"
import {
    TransactionForm,
    type TransactionFormErrors,
    type TransactionFormMode,
    type TransactionFormValues,
} from "@/features/transactions/components/transaction-form"
import { TransactionFilters } from "@/features/transactions/components/transaction-filters"
import { TransactionSummaryCards } from "@/features/transactions/components/transaction-summary-cards"
import { TransactionsPagination } from "@/features/transactions/components/transactions-pagination"
import { TransactionsTable } from "@/features/transactions/components/transactions-table"
import { TRANSACTION_PAGE_SIZE } from "@/features/transactions/constants/transaction-options"
import {
    createMockTransaction,
    mockTransactionDetail,
    mockTransactions,
    type Transaction,
} from "@/features/transactions/data/transactions.data"
import {
    filterTransactionRows,
    mapTransactionRows,
    paginateTransactionRows,
    summarizeTransactions,
    type TransactionFilterState,
    type TransactionTableRow,
} from "@/features/transactions/utils/transaction-view-models"
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
import { CoreEmptyState } from "@/shared/components/core-empty-state"
import { CoreErrorState } from "@/shared/components/core-error-state"
import { CoreLoadingState } from "@/shared/components/core-loading-state"

const ACTIVE_WORKSPACE_ID = "wks_acme"
const DEFAULT_TRANSACTION_DATE = "2026-07-02"

const DEFAULT_FILTERS: TransactionFilterState = {
    accountId: "all",
    dateFrom: "2026-04-01",
    dateTo: "2026-06-30",
    query: "",
    status: "all",
    type: "all",
}

const DEFAULT_FORM_VALUES: TransactionFormValues = {
    accountId: "acc_bca_operational",
    amount: "1250000",
    categoryId: "cat_office_supplies",
    currency: "IDR",
    date: DEFAULT_TRANSACTION_DATE,
    description: "New finance transaction",
    destinationAccountId: "none",
    merchant: "",
    notes: "",
    status: "draft",
    tags: "draft",
    type: "expense",
}

type TransactionDataState = "ready" | "loading" | "error"

export function TransactionsWorkbench() {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
    const [dataState, setDataState] = useState<TransactionDataState>("ready")
    const [filters, setFilters] = useState<TransactionFilterState>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [selectedTransactionId, setSelectedTransactionId] = useState(mockTransactionDetail.id)
    const [formMode, setFormMode] = useState<TransactionFormMode>("create")
    const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null)
    const [formValues, setFormValues] = useState<TransactionFormValues>(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState<TransactionFormErrors>({})
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

    const activeAccounts = useMemo(
        () =>
            mockAccounts.filter(
                (account) => account.workspaceId === ACTIVE_WORKSPACE_ID && account.status === "active"
            ),
        []
    )
    const activeCategories = useMemo(
        () =>
            mockCategories.filter(
                (category) => category.workspaceId === ACTIVE_WORKSPACE_ID && category.status === "active"
            ),
        []
    )
    const transactionRows = useMemo(
        () => mapTransactionRows(transactions, activeAccounts, activeCategories),
        [activeAccounts, activeCategories, transactions]
    )
    const filteredRows = useMemo(() => filterTransactionRows(transactionRows, filters), [filters, transactionRows])
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / TRANSACTION_PAGE_SIZE))
    const safePage = Math.min(page, pageCount)
    const visibleRows = useMemo(
        () => paginateTransactionRows(filteredRows, safePage, TRANSACTION_PAGE_SIZE),
        [filteredRows, safePage]
    )
    const summary = useMemo(() => summarizeTransactions(filteredRows), [filteredRows])
    const selectedTransaction = transactionRows.find((transaction) => transaction.id === selectedTransactionId) ?? null
    const hasNoTransactions = transactionRows.length === 0
    const hasNoFilteredTransactions = !hasNoTransactions && filteredRows.length === 0
    const allVisibleSelected =
        visibleRows.length > 0 && visibleRows.every((transaction) => selectedIds.includes(transaction.id))
    const someVisibleSelected =
        visibleRows.some((transaction) => selectedIds.includes(transaction.id)) && !allVisibleSelected

    function updateFilters(nextFilters: Partial<TransactionFilterState>) {
        setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }))
        setPage(1)
    }

    function resetFilters() {
        setFilters(DEFAULT_FILTERS)
        setPage(1)
    }

    function applySavedView(view: string) {
        if (view === "needs-review") {
            updateFilters({ status: "pending", type: "all" })
            return
        }

        if (view === "drafts") {
            updateFilters({ status: "draft", type: "all" })
            return
        }

        if (view === "expenses") {
            updateFilters({ status: "all", type: "expense" })
            return
        }

        resetFilters()
    }

    function toggleTransactionSelection(transactionId: string, selected: boolean) {
        setSelectedIds((currentSelectedIds) => {
            if (selected) {
                return currentSelectedIds.includes(transactionId)
                    ? currentSelectedIds
                    : [...currentSelectedIds, transactionId]
            }

            return currentSelectedIds.filter((selectedId) => selectedId !== transactionId)
        })
    }

    function toggleVisibleSelection(selected: boolean) {
        const visibleIds = visibleRows.map((transaction) => transaction.id)

        setSelectedIds((currentSelectedIds) => {
            if (!selected) {
                return currentSelectedIds.filter((selectedId) => !visibleIds.includes(selectedId))
            }

            return Array.from(new Set([...currentSelectedIds, ...visibleIds]))
        })
    }

    function startCreateTransaction() {
        setFormMode("create")
        setEditingTransactionId(null)
        setFormValues(DEFAULT_FORM_VALUES)
        setFormErrors({})
        setIsFormDialogOpen(true)
    }

    function startEditTransaction(transaction: TransactionTableRow) {
        setFormMode("edit")
        setEditingTransactionId(transaction.id)
        setSelectedTransactionId(transaction.id)
        setFormValues(mapTransactionToFormValues(transaction))
        setFormErrors({})
        setIsDetailDialogOpen(false)
        setIsFormDialogOpen(true)
    }

    function viewTransaction(transaction: TransactionTableRow) {
        setSelectedTransactionId(transaction.id)
        setIsDetailDialogOpen(true)
    }

    function saveTransaction() {
        const nextErrors = validateTransactionForm(formValues, activeAccounts, activeCategories)

        setFormErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        const amount = parseAmount(formValues.amount)
        const nextTransaction = buildTransactionFromFormValues({
            amount,
            existingTransaction: transactions.find((transaction) => transaction.id === editingTransactionId) ?? null,
            formMode,
            formValues,
            transactionCount: transactions.length,
        })

        setTransactions((currentTransactions) => {
            if (formMode === "edit" && editingTransactionId) {
                return currentTransactions.map((transaction) =>
                    transaction.id === editingTransactionId ? nextTransaction : transaction
                )
            }

            return [nextTransaction, ...currentTransactions]
        })
        setSelectedTransactionId(nextTransaction.id)
        setFormMode("edit")
        setEditingTransactionId(nextTransaction.id)
        setFormValues(mapTransactionToFormValues(nextTransaction))
        setFormErrors({})
        setIsFormDialogOpen(false)
        setIsDetailDialogOpen(true)
    }

    return (
        <div className="flex flex-col gap-6 lg:gap-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                    <h1 className="text-page-title font-semibold">Transactions</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        Search, filter, review, and draft finance transactions from one responsive workspace.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={startCreateTransaction} type="button">
                        <PlusIcon aria-hidden="true" data-icon="inline-start" />
                        Add transaction
                    </Button>
                    <Button type="button" variant="outline">
                        <DownloadIcon aria-hidden="true" data-icon="inline-start" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <TransactionSummaryCards summary={summary} />

            {dataState === "loading" ? (
                <CoreLoadingState
                    description="Loading ledger rows, saved views, bulk actions, and account filters for the active workspace."
                    icon={ReceiptTextIcon}
                    meta="Ledger sync"
                    title="Loading transaction ledger"
                    variant="table"
                />
            ) : dataState === "error" ? (
                <CoreErrorState
                    description="Transactions could not be refreshed, so the ledger is paused before showing stale or partial movement."
                    icon={ReceiptTextIcon}
                    onRetry={() => setDataState("ready")}
                    recoveryItems={[
                        "Keep the current filter set in place.",
                        "Retry the ledger refresh.",
                        "Create a draft only after the source is available.",
                    ]}
                    title="Transaction ledger could not be refreshed"
                />
            ) : (
                <Card className="min-w-0 border-border/70 bg-card/95 shadow-xs">
                    <CardHeader>
                        <div>
                            <CardTitle>Transaction ledger</CardTitle>
                            <CardDescription>
                                {formatNumber(filteredRows.length)} of {formatNumber(transactionRows.length)}{" "}
                                transactions visible in the current view.
                            </CardDescription>
                        </div>
                        <CardAction>
                            <Tabs defaultValue="all" onValueChange={applySavedView}>
                                <TabsList>
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="needs-review">Review</TabsTrigger>
                                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <TransactionFilters
                            accounts={activeAccounts}
                            filters={filters}
                            onFiltersChange={updateFilters}
                            onReset={resetFilters}
                            resultCount={filteredRows.length}
                        />
                        {hasNoTransactions || hasNoFilteredTransactions ? (
                            <CoreEmptyState
                                actions={
                                    hasNoTransactions ? (
                                        <Button onClick={startCreateTransaction} type="button">
                                            <PlusIcon aria-hidden="true" data-icon="inline-start" />
                                            Add transaction
                                        </Button>
                                    ) : null
                                }
                                description={
                                    hasNoTransactions
                                        ? "This workspace has no transaction records yet. Start with a draft, then use accounts and categories to keep it audit-ready."
                                        : "The ledger has records, but none match the current account, status, type, keyword, or date filters."
                                }
                                icon={ReceiptTextIcon}
                                meta={hasNoTransactions ? "Workspace ledger empty" : "Filtered view empty"}
                                secondaryAction={
                                    hasNoFilteredTransactions
                                        ? {
                                              label: "Reset filters",
                                              onClick: resetFilters,
                                          }
                                        : undefined
                                }
                                steps={
                                    hasNoTransactions
                                        ? [
                                              "Create a draft transaction.",
                                              "Attach the right account and category.",
                                              "Review it from the ledger detail panel.",
                                          ]
                                        : [
                                              "Clear the keyword search.",
                                              "Widen the date range.",
                                              "Switch saved view back to All.",
                                          ]
                                }
                                title={hasNoTransactions ? "No transactions yet" : "No matching transactions"}
                            />
                        ) : (
                            <>
                                <TransactionBulkActions
                                    onClearSelection={() => setSelectedIds([])}
                                    selectedCount={selectedIds.length}
                                />
                                <TransactionsTable
                                    allVisibleSelected={allVisibleSelected}
                                    onEditTransaction={startEditTransaction}
                                    onSelectAllVisible={toggleVisibleSelection}
                                    onSelectedChange={toggleTransactionSelection}
                                    onViewTransaction={viewTransaction}
                                    rows={visibleRows}
                                    selectedIds={selectedIds}
                                    someVisibleSelected={someVisibleSelected}
                                />
                                <TransactionsPagination
                                    currentPage={safePage}
                                    onPageChange={setPage}
                                    pageCount={pageCount}
                                    totalCount={filteredRows.length}
                                />
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="scrollbar-thin max-h-[min(760px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-2xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{selectedTransaction?.referenceNumber ?? "Transaction detail"}</DialogTitle>
                        <DialogDescription>
                            {selectedTransaction?.description ?? "Review the selected transaction record."}
                        </DialogDescription>
                    </DialogHeader>
                    <TransactionDetail transaction={selectedTransaction} />
                    <DialogFooter>
                        <Button
                            disabled={!selectedTransaction}
                            onClick={() => {
                                if (selectedTransaction) {
                                    startEditTransaction(selectedTransaction)
                                }
                            }}
                            type="button"
                        >
                            Edit transaction
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
                <DialogContent className="scrollbar-thin max-h-[min(820px,calc(100vh-2rem))] scrollbar-thumb-border scrollbar-track-transparent overflow-y-auto sm:max-w-4xl scrollbar-hover:scrollbar-thumb-muted-foreground">
                    <DialogHeader>
                        <DialogTitle>{formMode === "create" ? "Add transaction" : "Edit transaction"}</DialogTitle>
                        <DialogDescription>
                            Capture the required finance fields with validation before saving the local draft.
                        </DialogDescription>
                    </DialogHeader>
                    <TransactionForm
                        accounts={activeAccounts}
                        categories={activeCategories}
                        errors={formErrors}
                        mode={formMode}
                        onChange={(nextValues) => {
                            setFormValues((currentValues) => ({ ...currentValues, ...nextValues }))
                            setFormErrors({})
                        }}
                        onReset={startCreateTransaction}
                        onSubmit={saveTransaction}
                        values={formValues}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

function mapTransactionToFormValues(transaction: Transaction): TransactionFormValues {
    return {
        accountId: transaction.accountId,
        amount: String(transaction.amount),
        categoryId: transaction.categoryId ?? "none",
        currency: transaction.currency,
        date: transaction.date,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccountId ?? "none",
        merchant: transaction.merchant ?? "",
        notes: transaction.notes ?? "",
        status: transaction.status,
        tags: transaction.tags.join(", "),
        type: transaction.type,
    }
}

function validateTransactionForm(
    values: TransactionFormValues,
    accounts: typeof mockAccounts,
    categories: typeof mockCategories
): TransactionFormErrors {
    const errors: TransactionFormErrors = {}
    const amount = parseAmount(values.amount)
    const requiresCategory = values.type === "income" || values.type === "expense"
    const accountIds = new Set(accounts.map((account) => account.id))
    const allowedCategoryIds = new Set(
        categories.filter((category) => category.type === values.type).map((category) => category.id)
    )

    if (!Number.isFinite(amount) || amount <= 0) {
        errors.amount = "Amount must be greater than 0."
    }

    if (!values.accountId || !accountIds.has(values.accountId)) {
        errors.accountId = "Select an account for this transaction."
    }

    if (!values.date) {
        errors.date = "Transaction date is required."
    }

    if (requiresCategory && (values.categoryId === "none" || !allowedCategoryIds.has(values.categoryId))) {
        errors.categoryId = "Select a category for income or expense transactions."
    }

    if (values.type === "transfer") {
        if (values.destinationAccountId === "none") {
            errors.destinationAccountId = "Select a destination account for this transfer."
        } else if (!accountIds.has(values.destinationAccountId)) {
            errors.destinationAccountId = "Select an active destination account for this transfer."
        } else if (values.destinationAccountId === values.accountId) {
            errors.destinationAccountId = "Destination account must be different from the source account."
        }
    }

    if (values.description.trim().length < 4) {
        errors.description = "Description must contain at least 4 characters."
    }

    return errors
}

function buildTransactionFromFormValues({
    amount,
    existingTransaction,
    formMode,
    formValues,
    transactionCount,
}: {
    amount: number
    existingTransaction: Transaction | null
    formMode: TransactionFormMode
    formValues: TransactionFormValues
    transactionCount: number
}) {
    const timestamp = new Date().toISOString()
    const transactionNumber = String(transactionCount + 1).padStart(4, "0")
    const transaction = existingTransaction ?? createMockTransaction()
    const transactionId =
        formMode === "edit" && existingTransaction ? existingTransaction.id : `txn_local_${transactionNumber}`

    return {
        ...transaction,
        accountId: formValues.accountId,
        amount,
        categoryId: formValues.categoryId === "none" || formValues.type === "transfer" ? null : formValues.categoryId,
        createdAt: existingTransaction?.createdAt ?? timestamp,
        currency: formValues.currency,
        date: formValues.date,
        description: formValues.description.trim(),
        destinationAccountId: formValues.type === "transfer" ? formValues.destinationAccountId : null,
        id: transactionId,
        merchant: formValues.merchant.trim() || null,
        notes: formValues.notes.trim() || null,
        referenceNumber:
            formMode === "edit" && existingTransaction
                ? existingTransaction.referenceNumber
                : `TRX-2026-${transactionNumber}`,
        status: formValues.status,
        tags: formValues.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        type: formValues.type,
        updatedAt: timestamp,
        workspaceId: ACTIVE_WORKSPACE_ID,
    } satisfies Transaction
}

function parseAmount(amount: string) {
    return Number(amount.replaceAll(",", ""))
}
