# Naming Convention

Dokumen ini mendefinisikan standar penamaan untuk Finance Dashboard NextJS. Tujuannya adalah menjaga semua function, variable, parameter, file, folder, component, hook, store, schema, type, route, API, dan domain model tetap konsisten, eksplisit, dan mudah dipahami.

Prinsip utama:

> Nama yang jelas lebih penting daripada nama yang pendek.

Jika nama menjadi panjang tetapi menjelaskan tujuan dan fungsi dengan akurat, gunakan nama panjang tersebut. Hindari singkatan yang membuat konteks hilang.

---

## 1. Tujuan Naming Convention

Naming convention dibuat agar:

- Developer baru bisa memahami codebase lebih cepat.
- Domain finance tetap mudah dibaca tanpa menebak-nebak.
- Function dan variable menjelaskan tujuan, bukan hanya bentuk data.
- File dan folder konsisten dengan Feature-Based Architecture.
- Search di codebase menjadi mudah.
- Refactor lebih aman karena nama entity jelas.
- UI, API, state, dummy data, dan test menggunakan istilah yang sama.
- Tidak ada istilah berbeda untuk konsep yang sama.

---

## 2. Prinsip Umum

Gunakan prinsip berikut di seluruh project.

### 2.1 Nama Harus Menjelaskan Tujuan

Nama harus menjawab pertanyaan:

- Ini mewakili apa?
- Dipakai untuk apa?
- Dalam konteks domain apa?
- Apakah ini data, action, state, result, atau config?

Contoh buruk:

```ts
const data = []
const item = {}
const value = 100000
const result = calculate()
```

Contoh baik:

```ts
const approvedTransactions = []
const selectedAccount = {}
const monthlyExpenseAmount = 100000
const budgetUsagePercentage = calculateBudgetUsagePercentage()
```

### 2.2 Jangan Menggunakan Singkatan Tidak Jelas

Hindari singkatan yang hanya dimengerti pembuatnya.

| Hindari | Gunakan |
|---|---|
| `txn` | `transaction` |
| `acc` | `account` |
| `cat` | `category` |
| `amt` | `amount` |
| `bal` | `balance` |
| `qty` | `quantity` |
| `cfg` | `configuration` |
| `btn` | `button` |
| `msg` | `message` |
| `err` | `error` |
| `res` | `response` |
| `req` | `request` |
| `ctx` | `context` |
| `prev` | `previous` |
| `curr` | `current` |

Pengecualian hanya untuk istilah umum yang sudah sangat dikenal:

- `id`
- `url`
- `api`
- `ui`
- `csv`
- `pdf`
- `http`
- `json`
- `html`
- `css`
- `svg`
- `otp`
- `rbac`

### 2.3 Gunakan Istilah Domain Yang Konsisten

Jika satu konsep sudah punya nama, gunakan nama yang sama di seluruh project.

| Konsep | Gunakan | Hindari |
|---|---|---|
| Transaksi | `transaction` | `entry`, `record`, `trx` |
| Akun keuangan | `account` | `wallet` untuk semua jenis account |
| Kategori | `category` | `group`, `tagCategory` |
| Budget | `budget` | `limit`, `planAmount` jika konteks budget |
| Laporan | `report` | `analyticsPage` |
| Persetujuan | `approval` | `review`, `validation` jika konteks approval |
| Audit log | `auditLog` | `activity`, `history` jika konteks audit |
| Workspace | `workspace` | `team`, `organization` kecuali domain berubah |
| Member | `member` | `user` jika yang dimaksud membership workspace |
| Notifikasi | `notification` | `alert` kecuali khusus alert UI |

### 2.4 Satu Nama Untuk Satu Makna

Jangan gunakan nama yang sama untuk makna berbeda.

Contoh buruk:

```ts
const account = currentUserAccount
const account = financialBankAccount
```

Contoh baik:

```ts
const currentUser = authenticatedUser
const financialAccount = selectedFinancialAccount
```

### 2.5 Hindari Nama Generik

Nama berikut hanya boleh digunakan untuk scope kecil dan jelas:

- `item`
- `data`
- `value`
- `result`
- `payload`
- `params`
- `config`
- `state`
- `props`

Jika scope lebih dari beberapa baris, gunakan nama yang lebih spesifik.

Contoh:

```ts
const transactionTableRows = mapTransactionsToTableRows(transactions)
const createTransactionPayload = buildCreateTransactionPayload(formValues)
const transactionQueryParameters = parseTransactionQueryParameters(searchParams)
```

---

## 3. Case Convention

Gunakan format case berikut secara konsisten.

| Target | Case | Contoh |
|---|---|---|
| Folder | `kebab-case` | `audit-logs` |
| File | `kebab-case` | `transaction-form.tsx` |
| Route segment | `kebab-case` | `/approval-rules` |
| Component | `PascalCase` | `TransactionForm` |
| Type/interface | `PascalCase` | `TransactionStatus` |
| Enum-like union type | `PascalCase` | `BudgetUsageStatus` |
| Variable | `camelCase` | `selectedTransactionIds` |
| Function | `camelCase` | `calculateBudgetUsagePercentage` |
| Hook | `camelCase` + `use` | `useTransactions` |
| Zustand store hook | `camelCase` + `use` + `Store` | `useTransactionUiStore` |
| Schema variable | `camelCase` + `Schema` | `transactionSchema` |
| Constant local | `camelCase` atau `UPPER_CASE` sesuai konteks | `defaultPageSize` |
| Constant global config | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE` |
| CSS variable | `kebab-case` | `--chart-income` |
| Query parameter | `camelCase` | `accountId` |
| API resource | `kebab-case` plural | `/api/audit-logs` |

---

## 4. Folder Naming

Folder menggunakan `kebab-case`.

Benar:

```txt
features/
├── transactions/
├── audit-logs/
├── app-shell/
├── imports/
├── exports/
└── approval-rules/
```

Hindari:

```txt
features/
├── Transactions/
├── auditLogs/
├── app_shell/
├── imp/
└── ar/
```

Aturan:

- Folder feature menggunakan nama domain plural jika berisi collection.
- Folder internal feature menggunakan nama deskriptif seperti `components`, `screens`, `hooks`, `services`, `schemas`, `types`, `utils`, `constants`, `data`, `stores`.
- Jangan membuat folder singkatan.
- Jangan membuat folder bernama `misc`, `common`, atau `helpers` tanpa konteks.

---

## 5. File Naming

File menggunakan `kebab-case`.

Pola umum:

| Jenis File | Pattern | Contoh |
|---|---|---|
| Component | `<component-name>.tsx` | `transaction-form.tsx` |
| Screen | `<screen-name>-page.tsx` | `transactions-page.tsx` |
| Hook | `use-<purpose>.ts` | `use-transactions.ts` |
| Service | `<domain>-service.ts` | `transaction-service.ts` |
| Schema | `<domain>-schema.ts` | `transaction-schema.ts` |
| Type | `<domain>.types.ts` | `transaction.types.ts` |
| Constant | `<domain>-constants.ts` | `transaction-status-constants.ts` |
| Utility | `<verb>-<object>.ts` | `format-currency.ts` |
| Store | `<domain>-store.ts` | `transaction-ui-store.ts` |
| Dummy data | `<resource>.data.ts` | `transactions.data.ts` |
| Test | `<file-name>.test.ts` | `format-currency.test.ts` |

Contoh benar:

```txt
transaction-form.tsx
transactions-table.tsx
transaction-detail-page.tsx
use-transactions.ts
transaction-service.ts
transaction-schema.ts
transaction.types.ts
format-currency.ts
transaction-ui-store.ts
transactions.data.ts
```

Contoh yang harus dihindari:

```txt
trx-form.tsx
Table.tsx
pageComp.tsx
helper.ts
utils.ts
types.ts
data.ts
store.ts
```

Catatan:

- File boleh bernama `index.ts` hanya untuk public API export di root feature.
- Hindari `types.ts`, `utils.ts`, atau `data.ts` generik jika folder berisi banyak domain.
- Gunakan nama domain agar mudah dicari dengan `rg`.

---

## 6. Component Naming

React component menggunakan `PascalCase`.

Pola:

```txt
<Domain><Purpose>
```

Contoh:

```tsx
TransactionForm
TransactionsTable
TransactionDetailHeader
BudgetUsageBar
DashboardMetricCard
CashFlowChart
AccountBalanceCard
ApprovalDecisionDialog
AuditLogTimeline
ImportPreviewTable
ExportJobStatusBadge
```

Aturan:

- Nama component harus menjelaskan domain dan purpose.
- Jangan memberi nama terlalu umum seperti `Card`, `Table`, `Modal`, atau `Form` di feature.
- Untuk wrapper Shadcn UI, gunakan nama domain yang jelas.
- Shared primitive boleh memakai nama umum karena memang primitive, seperti `Button`, `Card`, `Dialog`.

Contoh buruk:

```tsx
Form
Table
Detail
Chart
Modal
Box
```

Contoh baik:

```tsx
TransactionForm
TransactionsTable
TransactionDetailPanel
ExpenseByCategoryChart
DeleteTransactionDialog
```

### 6.1 Page Component

Screen/page component menggunakan suffix `Page`.

Contoh:

```tsx
DashboardPage
TransactionsPage
CreateTransactionPage
TransactionDetailPage
EditTransactionPage
CashFlowReportPage
MembersSettingsPage
```

### 6.2 Dialog, Sheet, Drawer

Gunakan suffix sesuai komponen UI.

```tsx
DeleteTransactionDialog
ExportReportDialog
TransactionFilterSheet
ImportMappingDrawer
ApprovalDecisionDialog
```

### 6.3 Table Component

Gunakan plural domain untuk table list.

```tsx
TransactionsTable
AccountsTable
BudgetsTable
AuditLogsTable
ImportJobsTable
```

### 6.4 Chart Component

Nama chart harus menjelaskan data yang divisualkan, bukan jenis chart saja.

Benar:

```tsx
CashFlowTrendChart
ExpenseByCategoryChart
BudgetUsageTrendChart
IncomeSourceBreakdownChart
```

Hindari:

```tsx
LineChart
PieChart
ChartOne
StatsChart
```

---

## 7. Function Naming

Function menggunakan `camelCase` dan harus diawali kata kerja yang menjelaskan aksi.

Kata kerja umum:

| Tujuan | Prefix |
|---|---|
| Mengambil data | `get`, `fetch`, `load` |
| Membuat data | `create` |
| Mengubah data | `update` |
| Menghapus data | `delete`, `archive`, `remove` |
| Menghitung | `calculate` |
| Memformat | `format` |
| Mengubah bentuk data | `map`, `transform` |
| Membangun object | `build` |
| Parsing | `parse` |
| Validasi | `validate` |
| Mengecek boolean | `is`, `has`, `can`, `should` |
| Menangani event | `handle` |
| Reset state | `reset`, `clear` |
| Submit workflow | `submit` |
| Approve/reject | `approve`, `reject` |

Contoh benar:

```ts
getTransactions()
createTransaction()
updateTransactionStatus()
archiveAccount()
calculateBudgetUsagePercentage()
formatCurrency()
mapTransactionToTableRow()
buildCreateTransactionPayload()
parseTransactionSearchParameters()
validateTransactionAmount()
isTransactionApproved()
hasExceededBudgetLimit()
canApproveTransaction()
handleTransactionFormSubmit()
resetTransactionFilters()
clearSelectedTransactionIds()
```

Contoh buruk:

```ts
doIt()
process()
handleData()
calc()
fmt()
mapData()
submit()
check()
run()
```

### 7.1 Fetch Function

Gunakan `get` atau `fetch` secara konsisten berdasarkan konteks.

Rekomendasi:

- `get` untuk service domain.
- `fetch` untuk function yang benar-benar membungkus HTTP/fetch.

Contoh:

```ts
getTransactions()
getTransactionById()
getBudgetUsage()
fetchTransactionsFromApi()
fetchDashboardSummaryFromApi()
```

### 7.2 Mutation Function

Nama mutation harus menjelaskan perubahan yang dilakukan.

```ts
createTransaction()
updateTransaction()
submitTransactionForApproval()
approveTransaction()
rejectTransaction()
archiveBudget()
inviteWorkspaceMember()
updateMemberRole()
```

Hindari:

```ts
save()
send()
change()
mutate()
action()
```

### 7.3 Boolean Function

Boolean function harus menggunakan `is`, `has`, `can`, atau `should`.

```ts
isTransactionPending()
hasExceededBudgetLimit()
canExportReports()
shouldShowApprovalBanner()
```

Hindari:

```ts
transactionPending()
budgetExceeded()
exportReports()
showApprovalBanner()
```

---

## 8. Variable Naming

Variable menggunakan `camelCase` dan harus menjelaskan isi data.

Contoh:

```ts
const selectedTransactionIds = []
const activeWorkspaceId = "wks_acme"
const monthlyExpenseAmount = 52850000
const totalApprovedTransactionAmount = 27500000
const pendingApprovalCount = 3
const currentAccountBalance = 158450000
const transactionSearchQuery = "rent"
```

Hindari:

```ts
const ids = []
const active = "wks_acme"
const amount = 52850000
const total = 27500000
const count = 3
const balance = 158450000
const q = "rent"
```

### 8.1 Collection Variable

Collection menggunakan nama plural.

```ts
const transactions = []
const approvedTransactions = []
const workspaceMembers = []
const budgetUsageItems = []
const auditLogEntries = []
```

Single entity menggunakan nama singular.

```ts
const transaction = {}
const selectedTransaction = {}
const currentWorkspaceMember = {}
```

### 8.2 ID Variable

ID harus menyebut entity.

Benar:

```ts
const transactionId = "txn_20260103_001"
const accountId = "acc_bca_operational"
const categoryId = "cat_payroll"
const activeWorkspaceId = "wks_acme"
const selectedTransactionIds = []
```

Hindari:

```ts
const id = "txn_20260103_001"
const selectedIds = []
const activeId = "wks_acme"
```

`id` boleh digunakan hanya di scope sangat kecil seperti callback map:

```ts
selectedTransactionIds.map((id) => id)
```

Namun jika ada lebih dari satu jenis ID, gunakan nama eksplisit.

### 8.3 Amount Variable

Amount harus menjelaskan konteks.

```ts
const transactionAmount = 12500000
const totalIncomeAmount = 27500000
const totalExpenseAmount = 52850000
const currentAccountBalanceAmount = 158450000
const remainingBudgetAmount = 32500000
```

Hindari:

```ts
const amount = 12500000
const money = 27500000
const value = 52850000
```

### 8.4 Date Variable

Date harus menjelaskan makna.

```ts
const transactionDate = "2026-01-15"
const budgetStartDate = "2026-01-01"
const budgetEndDate = "2026-01-31"
const reportPeriodStartDate = "2026-01-01"
const reportPeriodEndDate = "2026-03-31"
const approvedAt = "2026-01-15T09:00:00.000Z"
```

Hindari:

```ts
const date = "2026-01-15"
const start = "2026-01-01"
const end = "2026-01-31"
```

### 8.5 Boolean Variable

Boolean variable harus terdengar seperti benar/salah.

Prefix yang disarankan:

- `is`
- `has`
- `can`
- `should`
- `will`
- `was`

Contoh:

```ts
const isTransactionApproved = true
const hasExceededBudgetLimit = false
const canManageWorkspaceMembers = true
const shouldShowEmptyState = false
const wasImportedFromCsv = true
```

Hindari:

```ts
const approved = true
const budgetExceeded = false
const manageMembers = true
const empty = false
```

---

## 9. Parameter Naming

Parameter function harus eksplisit, terutama untuk ID dan payload.

Benar:

```ts
function getTransactionById(transactionId: string) {}

function getTransactionsByAccountId(accountId: string) {}

function updateTransactionStatus(
  transactionId: string,
  nextTransactionStatus: TransactionStatus,
) {}

function calculateBudgetUsagePercentage(
  spentAmount: number,
  budgetAmount: number,
) {}
```

Hindari:

```ts
function getById(id: string) {}

function getByAccount(id: string) {}

function updateStatus(id: string, status: string) {}

function calculate(a: number, b: number) {}
```

### 9.1 Payload Parameter

Payload harus menjelaskan aksi.

```ts
function createTransaction(createTransactionPayload: CreateTransactionPayload) {}

function updateBudget(updateBudgetPayload: UpdateBudgetPayload) {}

function inviteWorkspaceMember(
  inviteWorkspaceMemberPayload: InviteWorkspaceMemberPayload,
) {}
```

Hindari:

```ts
function createTransaction(payload: Payload) {}
function updateBudget(data: Data) {}
function inviteWorkspaceMember(body: any) {}
```

### 9.2 Options Parameter

Options harus menjelaskan domain.

```ts
function getTransactions(transactionQueryOptions: TransactionQueryOptions) {}
function exportReport(reportExportOptions: ReportExportOptions) {}
function formatCurrency(currencyFormatOptions: CurrencyFormatOptions) {}
```

---

## 10. Type And Interface Naming

Type dan interface menggunakan `PascalCase`.

Gunakan type name yang sesuai domain.

```ts
type Transaction = {}
type TransactionStatus = "draft" | "pending" | "approved" | "rejected"
type TransactionType = "income" | "expense" | "transfer" | "adjustment"
type CreateTransactionPayload = {}
type UpdateTransactionPayload = {}
type TransactionQueryOptions = {}
type TransactionTableRow = {}
type DashboardSummary = {}
type BudgetUsageStatus = "safe" | "warning" | "exceeded"
```

Aturan:

- Entity utama menggunakan nama domain langsung.
- Payload mutation menggunakan prefix `Create`, `Update`, `Delete`, `Archive`, `Approve`, atau `Reject`.
- Response API menggunakan suffix `Response`.
- Query/filter options menggunakan suffix `QueryOptions`, `Filters`, atau `SearchParameters`.
- UI mapping type menggunakan suffix sesuai tujuan seperti `TableRow`, `ChartPoint`, `SelectOption`.

Contoh:

```ts
type TransactionsResponse = PaginatedResponse<Transaction>
type TransactionFilters = {}
type TransactionSearchParameters = {}
type TransactionTableRow = {}
type CashFlowChartPoint = {}
type AccountSelectOption = {}
```

Hindari:

```ts
type Data = {}
type Item = {}
type Props = {}
type Options = {}
type Result = {}
```

---

## 11. Props Naming

Props type menggunakan nama component + `Props`.

Contoh:

```ts
type TransactionFormProps = {
  initialTransaction?: Transaction
  onSubmit: (payload: CreateTransactionPayload) => void
}

type BudgetUsageBarProps = {
  spentAmount: number
  budgetAmount: number
  usageStatus: BudgetUsageStatus
}
```

Aturan:

- `Props` boleh digunakan sebagai type lokal hanya jika file sangat kecil dan tidak diekspor.
- Jika diekspor, selalu gunakan nama component lengkap.
- Event callback props menggunakan prefix `on`.
- Boolean props menggunakan prefix `is`, `has`, `can`, atau `should`.

Contoh callback:

```ts
type TransactionFormProps = {
  onSubmitTransaction: (payload: CreateTransactionPayload) => void
  onCancelTransactionCreation: () => void
}
```

Jika callback sudah jelas dari component, `onSubmit` masih boleh. Jika component memiliki banyak aksi, gunakan nama eksplisit.

---

## 12. Hook Naming

Hook menggunakan prefix `use`.

Pola:

```txt
use<Domain>
use<Domain><Purpose>
use<Verb><Domain>
```

Contoh:

```ts
useTransactions()
useTransactionDetail()
useCreateTransaction()
useUpdateTransaction()
useBudgetUsage()
useCashFlowReport()
useWorkspaceMembers()
useCurrentWorkspace()
useTransactionFilters()
```

Aturan:

- Hook fetching data menggunakan nama resource.
- Hook mutation menggunakan action.
- Hook UI state menggunakan purpose.
- Jangan memberi nama hook terlalu umum.

Hindari:

```ts
useData()
useFetch()
useSubmit()
useForm()
useList()
```

---

## 13. Service Naming

Service function menggunakan nama action domain.

File:

```txt
transaction-service.ts
budget-service.ts
report-service.ts
workspace-member-service.ts
```

Function:

```ts
getTransactions()
getTransactionById()
createTransaction()
updateTransaction()
archiveTransaction()
submitTransactionForApproval()
approveTransaction()
rejectTransaction()
getBudgetUsage()
exportCashFlowReport()
```

Jika menggunakan object service:

```ts
export const transactionService = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  archiveTransaction,
}
```

Hindari:

```ts
api()
service()
request()
doRequest()
postData()
updateData()
```

---

## 14. Schema Naming

Schema menggunakan `camelCase` dengan suffix `Schema`.

Contoh:

```ts
transactionSchema
createTransactionSchema
updateTransactionSchema
transactionFiltersSchema
budgetSchema
createBudgetSchema
workspaceSettingsSchema
approvalDecisionSchema
```

Type hasil schema:

```ts
type CreateTransactionInput = z.infer<typeof createTransactionSchema>
type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>
type ApprovalDecisionInput = z.infer<typeof approvalDecisionSchema>
```

Aturan:

- Schema untuk input form menggunakan suffix `Schema`.
- Type input hasil schema menggunakan suffix `Input`.
- Payload API dapat berbeda dari input form jika butuh transformasi.

---

## 15. Zustand Store Naming

Zustand store hook menggunakan pattern:

```txt
use<Domain>Store
use<Domain>UiStore
use<Domain>PreferenceStore
```

Contoh:

```ts
useAppStore
usePreferenceStore
useTransactionUiStore
useReportUiStore
useImportUiStore
useAppShellStore
```

State dan action:

```ts
type TransactionUiStoreState = {
  selectedTransactionIds: string[]
  isBulkActionToolbarOpen: boolean
}

type TransactionUiStoreActions = {
  setSelectedTransactionIds: (transactionIds: string[]) => void
  clearSelectedTransactionIds: () => void
  setIsBulkActionToolbarOpen: (isOpen: boolean) => void
  resetTransactionUiStore: () => void
}
```

Aturan:

- Store feature harus menyebut feature.
- Store UI harus menyertakan `Ui` jika hanya menyimpan UI state.
- Action setter boleh menggunakan `set<Name>`.
- Reset store menggunakan `reset<Name>Store`.
- Jangan memakai nama `useStore` generik.

Hindari:

```ts
useStore
useGlobal
useDataStore
setData
reset
```

---

## 16. Constant Naming

Constant global menggunakan `UPPER_SNAKE_CASE` jika benar-benar konfigurasi tetap.

Contoh:

```ts
export const DEFAULT_PAGE_SIZE = 10
export const MAX_EXPORT_ROW_COUNT = 10000
export const DEFAULT_CURRENCY = "IDR"
export const TRANSACTION_STATUS_OPTIONS = []
```

Constant lokal boleh menggunakan `camelCase`.

```ts
const defaultTransactionFilters = {
  page: 1,
  limit: 10,
}
```

Aturan:

- Gunakan `UPPER_SNAKE_CASE` untuk constant yang diekspor dan bersifat konfigurasi.
- Gunakan `camelCase` untuk object default lokal.
- Options untuk select menggunakan suffix `Options`.
- Mapping menggunakan suffix `Map` atau `Record`.

Contoh:

```ts
TRANSACTION_STATUS_OPTIONS
BUDGET_USAGE_STATUS_OPTIONS
transactionStatusLabelMap
budgetUsageColorMap
```

---

## 17. Utility Naming

Utility function harus menyebut aksi dan object.

Contoh:

```ts
formatCurrency()
formatTransactionDate()
calculateBudgetUsagePercentage()
calculateNetCashFlowAmount()
mapTransactionToTableRow()
mapBudgetToBudgetCard()
parseTransactionSearchParameters()
buildTransactionQueryString()
getBudgetUsageStatus()
```

File utility:

```txt
format-currency.ts
format-transaction-date.ts
calculate-budget-usage-percentage.ts
map-transaction-to-table-row.ts
parse-transaction-search-parameters.ts
```

Hindari:

```ts
helper()
format()
calc()
mapper()
parser()
```

---

## 18. Event Handler Naming

Event handler di component menggunakan prefix `handle`.

Contoh:

```ts
function handleTransactionFormSubmit() {}
function handleDeleteTransactionClick() {}
function handleAccountSelectionChange() {}
function handleBudgetPeriodChange() {}
function handleExportReportClick() {}
function handleApprovalDecisionSubmit() {}
```

Callback props menggunakan prefix `on`.

```ts
onSubmitTransaction
onDeleteTransaction
onSelectAccount
onChangeBudgetPeriod
onExportReport
onSubmitApprovalDecision
```

Aturan:

- `handle` untuk function internal component.
- `on` untuk callback prop.
- Jika event berkaitan dengan domain, sebut domain dan action.
- Jangan gunakan `handleClick` jika ada banyak click handler.

---

## 19. API Naming

API route menggunakan resource plural dan `kebab-case`.

Contoh:

```txt
/api/transactions
/api/transactions/[transactionId]
/api/accounts
/api/budgets
/api/audit-logs
/api/approval-rules
/api/imports
/api/exports
```

Query parameter menggunakan `camelCase`.

```txt
/api/transactions?page=1&limit=10&accountId=acc_bca_operational
```

Response field menggunakan `camelCase`.

```ts
{
  items: [],
  meta: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}
```

Aturan:

- Resource endpoint menggunakan plural.
- Dynamic segment spesifik seperti `[transactionId]`, bukan `[id]`.
- Action endpoint boleh digunakan untuk workflow yang bukan CRUD sederhana.

Contoh action endpoint:

```txt
/api/transactions/[transactionId]/submit
/api/transactions/[transactionId]/approve
/api/transactions/[transactionId]/reject
/api/budgets/[budgetId]/archive
/api/imports/[importJobId]/confirm
```

---

## 20. Route Naming

Route UI menggunakan `kebab-case`.

Contoh:

```txt
/transactions
/transactions/new
/transactions/[transactionId]
/transactions/[transactionId]/edit
/reports/cash-flow
/settings/approval-rules
/audit-logs
```

Aturan:

- Resource utama menggunakan plural.
- Action create menggunakan `new`.
- Action edit menggunakan `edit`.
- Dynamic segment menggunakan entity ID yang jelas.
- Jangan menggunakan singkatan route.

Hindari:

```txt
/trx
/tx
/acc
/cf
/ar
```

---

## 21. Query Parameter Naming

Query parameter menggunakan `camelCase` dan harus deskriptif.

Contoh:

```txt
page
limit
query
sort
direction
from
to
status
type
accountId
categoryId
createdBy
workspaceId
savedViewId
groupBy
compareTo
```

Hindari:

```txt
p
l
q
s
dir
acc
cat
uid
wid
gb
```

Catatan:

- `query` boleh digunakan untuk keyword search.
- `from` dan `to` boleh digunakan untuk date range karena umum dan jelas.
- Untuk ID, selalu sebut entity seperti `accountId`, bukan `id`.

---

## 22. Domain Field Naming

Field data domain menggunakan `camelCase`.

### 22.1 Transaction Field

Gunakan:

```ts
transactionId
referenceNumber
transactionDate
transactionType
transactionStatus
accountId
destinationAccountId
categoryId
amount
currency
description
merchant
attachmentCount
submittedBy
approvedBy
approvedAt
rejectedBy
rejectedAt
```

Hindari:

```ts
txnId
refNo
date
type
status
accId
destAcc
catId
amt
cur
desc
attCount
```

### 22.2 Account Field

Gunakan:

```ts
accountId
accountName
accountType
institutionName
accountNumberMasked
openingBalance
currentBalance
availableBalance
currency
accountStatus
```

### 22.3 Budget Field

Gunakan:

```ts
budgetId
budgetName
budgetAmount
spentAmount
remainingBudgetAmount
usagePercentage
usageStatus
thresholdPercentage
budgetStartDate
budgetEndDate
```

### 22.4 Report Field

Gunakan:

```ts
reportPeriodStartDate
reportPeriodEndDate
totalIncomeAmount
totalExpenseAmount
netCashFlowAmount
incomeChangePercentage
expenseChangePercentage
```

---

## 23. Dummy Data Naming

Dummy data mengikuti aturan dari dokumen dummy data.

Pattern:

```ts
mockTransactions
mockTransactionDetail
mockAccounts
mockCategories
mockBudgets
mockDashboardSummary
mockCashFlowChartData
mockAuditLogs
mockImportJobs
mockExportJobs
mockNotifications
```

Factory:

```ts
createMockTransaction()
createMockAccount()
createMockBudget()
createMockAuditLog()
```

Empty/error fixture:

```ts
emptyTransactionsState
mockTransactionsError
emptyBudgetsState
mockReportsError
```

Aturan:

- Collection dummy menggunakan plural.
- Detail dummy menggunakan suffix `Detail`.
- Chart dummy menggunakan suffix `ChartData`.
- Jangan menggunakan `dummyData` atau `dataMock` generik.

---

## 24. Test Naming

Test file mengikuti file yang diuji.

```txt
format-currency.test.ts
calculate-budget-usage-percentage.test.ts
transaction-service.test.ts
transaction-form.test.tsx
```

Test description harus menjelaskan behavior.

Contoh:

```ts
it("formats IDR amount without decimal digits", () => {})
it("returns exceeded status when spent amount is greater than budget amount", () => {})
it("disables submit button when transaction amount is invalid", () => {})
```

Hindari:

```ts
it("works", () => {})
it("test 1", () => {})
it("handles data", () => {})
```

---

## 25. Error Naming

Error code menggunakan `UPPER_SNAKE_CASE`.

Contoh:

```ts
TRANSACTION_NOT_FOUND
TRANSACTION_AMOUNT_INVALID
BUDGET_LIMIT_EXCEEDED
WORKSPACE_ACCESS_DENIED
EXPORT_JOB_NOT_READY
IMPORT_FILE_INVALID
```

Error variable menggunakan `camelCase`.

```ts
const transactionLoadError = error
const budgetValidationError = error
const exportJobErrorMessage = "Export job is not ready."
```

Hindari:

```ts
ERR
ERROR_1
BAD_DATA
const err = error
```

---

## 26. Permission Naming

Permission menggunakan pattern:

```txt
<resource>.<action>
```

Contoh:

```txt
dashboard.view
transactions.view
transactions.create
transactions.update
transactions.archive
transactions.approve
accounts.manage
budgets.manage
reports.view
reports.export
members.manage
audit_logs.view
settings.update
```

Aturan:

- Resource plural.
- Action jelas.
- Jangan gunakan singkatan.
- Permission string boleh menggunakan underscore jika mengikuti sistem eksternal, tetapi konsisten.

Variable permission:

```ts
const canViewTransactions = true
const canApproveTransactions = false
const canManageWorkspaceMembers = true
```

---

## 27. Status Naming

Status harus konsisten antar type, UI, dan API.

Transaction status:

```ts
"draft" | "pending" | "approved" | "rejected" | "void"
```

Budget usage status:

```ts
"safe" | "warning" | "exceeded"
```

Import job status:

```ts
"draft" | "validating" | "ready" | "processing" | "completed" | "failed"
```

Export job status:

```ts
"queued" | "processing" | "completed" | "failed"
```

Aturan:

- Status value menggunakan lowercase string.
- Type status menggunakan PascalCase seperti `TransactionStatus`.
- UI label dapat diformat dari mapping, bukan hardcoded berulang.

---

## 28. Import Alias Naming

Gunakan path alias secara konsisten.

Benar:

```ts
import { Button } from "@/shared/components/ui/button"
import { TransactionsPage } from "@/features/transactions"
import { formatCurrency } from "@/shared/utils/format-currency"
```

Hindari:

```ts
import { Button } from "../../../shared/components/ui/button"
import { TransactionForm } from "@/features/transactions/components/transaction-form"
```

Kecuali:

- Import internal feature dari file dalam feature yang sama masih boleh langsung.
- Public API feature tetap direkomendasikan untuk import lintas feature.

---

## 29. Acronym Rules

Acronym tetap mengikuti case style.

Contoh:

```ts
const apiResponse = {}
const csvExportJob = {}
const pdfReportUrl = ""
const userOtpCode = ""
const httpStatusCode = 200
```

Component:

```tsx
CsvImportPreview
PdfExportButton
ApiErrorState
OtpInputForm
```

Hindari:

```ts
const APIResponse = {}
const CSVExportJob = {}
const PDFReportURL = ""
```

---

## 30. No-Abbreviation Rule

Karena user secara eksplisit menginginkan nama yang jelas dan tidak dipersingkat, aturan ini wajib diikuti.

Gunakan nama panjang jika perlu:

```ts
calculateRemainingBudgetAmount()
getApprovedTransactionsForCurrentWorkspace()
buildTransactionTableColumnDefinitions()
parseCashFlowReportSearchParameters()
validateWorkspaceMemberInvitationPayload()
```

Lebih baik daripada:

```ts
calcRemBdgAmt()
getApprTxns()
buildCols()
parseParams()
validateInvite()
```

Pengecualian hanya berlaku untuk:

- Istilah teknis universal seperti `id`, `url`, `api`, `ui`, `csv`, `pdf`.
- Callback scope pendek seperti `.map((id) => id)`.
- Index loop kecil seperti `index` jika memang dibutuhkan untuk UI ordering.

---

## 31. Recommended Vocabulary

Gunakan vocabulary berikut agar istilah konsisten.

| Maksud | Gunakan |
|---|---|
| Data transaksi yang dipilih | `selectedTransactions`, `selectedTransactionIds` |
| Transaksi yang sudah disetujui | `approvedTransactions` |
| Transaksi menunggu approval | `pendingApprovalTransactions` |
| Total pemasukan | `totalIncomeAmount` |
| Total pengeluaran | `totalExpenseAmount` |
| Arus kas bersih | `netCashFlowAmount` |
| Saldo berjalan | `currentBalance` |
| Budget terpakai | `spentAmount` |
| Sisa budget | `remainingBudgetAmount` |
| Persentase penggunaan budget | `budgetUsagePercentage` |
| Workspace aktif | `activeWorkspace` |
| User yang sedang login | `authenticatedUser` atau `currentUser` |
| Role member saat ini | `currentMemberRole` |
| Izin melakukan aksi | `can<Action><Resource>` |
| Kondisi tampilan | `is<Condition>` |

---

## 32. Anti-Pattern

Hindari pola berikut:

- Nama singkatan seperti `txn`, `acc`, `cat`, `amt`, `cfg`, `ctx`.
- Nama generik seperti `data`, `item`, `value`, `result` untuk scope besar.
- Function tanpa kata kerja seperti `transaction()`.
- Boolean tanpa prefix seperti `approved`, `empty`, `loading`.
- ID generik seperti `id` saat ada banyak entity.
- File generik seperti `helper.ts`, `utils.ts`, `data.ts`, `store.ts`.
- Component feature bernama `Table`, `Form`, atau `Modal`.
- Hook bernama `useData` atau `useFetch`.
- Service function bernama `request`, `postData`, atau `handleData`.
- Query parameter pendek seperti `q`, `p`, `l`, `acc`, `cat`.
- Nama berbeda untuk konsep yang sama.

---

## 33. Checklist Naming

Gunakan checklist ini sebelum membuat file, function, variable, atau type baru.

| Checklist | Status |
|---|---|
| Nama menjelaskan tujuan dan konteks | Required |
| Tidak menggunakan singkatan tidak jelas | Required |
| Menggunakan case convention yang benar | Required |
| Menyebut domain jika berada di feature domain | Required |
| Boolean menggunakan `is`, `has`, `can`, atau `should` | Required |
| Function diawali kata kerja yang jelas | Required |
| ID menyebut entity seperti `transactionId` | Required |
| Amount menyebut konteks seperti `totalExpenseAmount` | Required |
| File menggunakan `kebab-case` | Required |
| Component menggunakan `PascalCase` | Required |
| Hook menggunakan prefix `use` | Required |
| Store Zustand menggunakan suffix `Store` | Required |
| Schema menggunakan suffix `Schema` | Required |
| Tidak ada nama generik untuk scope besar | Required |
| Istilah domain konsisten dengan dokumen product/architecture | Required |

---

## 34. Ringkasan Keputusan

Keputusan naming convention untuk Finance Dashboard:

- Gunakan nama yang jelas, eksplisit, dan tidak disingkat.
- Panjang nama boleh bertambah selama menjelaskan tujuan dengan baik.
- Folder, file, dan route menggunakan `kebab-case`.
- Component dan type menggunakan `PascalCase`.
- Variable, function, parameter, schema, dan hook menggunakan `camelCase`.
- Hook selalu diawali `use`.
- Function selalu diawali kata kerja yang jelas.
- Boolean menggunakan `is`, `has`, `can`, atau `should`.
- ID harus menyebut entity seperti `transactionId`, `accountId`, dan `workspaceId`.
- Amount harus menyebut konteks seperti `totalIncomeAmount` atau `remainingBudgetAmount`.
- Zustand store menggunakan nama eksplisit seperti `useTransactionUiStore`.
- Query parameter menggunakan nama jelas seperti `accountId`, bukan `acc`.
- Hindari nama generik dan singkatan yang mengorbankan pemahaman.
