# Dummy Data Architecture

Dokumen ini mendefinisikan struktur dummy data untuk Finance Dashboard NextJS. Dummy data digunakan untuk mengisi UI sebelum integrasi API/backend tersedia, tetapi tetap harus dibuat seolah-olah data tersebut berasal dari sistem nyata.

Tujuan utama dummy data:

- Membantu pengembangan UI berjalan tanpa menunggu API.
- Menyediakan data realistis untuk dashboard, table, chart, form, dan detail page.
- Menjaga struktur data konsisten dengan domain finance.
- Memudahkan migrasi dari dummy data ke API tanpa rewrite besar.
- Mendukung skenario enterprise seperti workspace, role, approval, audit log, import/export, dan notification.

Prinsip utama:

> Dummy data adalah kontrak sementara antara UI dan API.

Artinya, shape dummy data harus sedekat mungkin dengan shape response API yang akan dibuat nanti.

---

## 1. Scope Dummy Data

Dummy data mencakup data untuk:

- Authentication dan user session.
- Workspace dan member.
- Role dan permission.
- Accounts.
- Categories.
- Transactions.
- Budgets.
- Dashboard summary.
- Reports.
- Approval queue.
- Audit logs.
- Import jobs.
- Export jobs.
- Notifications.
- Saved views.
- Settings.

Dummy data tidak digunakan untuk:

- Menyimpan secret.
- Menyimpan token nyata.
- Menjadi sumber kebenaran production.
- Menggantikan validasi server.
- Menghasilkan data random yang tidak stabil setiap render.

---

## 2. Lokasi File Dummy Data

Dummy data harus ditempatkan di folder feature masing-masing jika hanya digunakan oleh satu feature.

Struktur yang direkomendasikan:

```txt
features/
├── dashboard/
│   └── data/
│       ├── dashboard-summary.data.ts
│       └── cash-flow-chart.data.ts
├── transactions/
│   └── data/
│       ├── transactions.data.ts
│       └── transaction-detail.data.ts
├── accounts/
│   └── data/
│       └── accounts.data.ts
├── categories/
│   └── data/
│       └── categories.data.ts
├── budgets/
│   └── data/
│       └── budgets.data.ts
├── reports/
│   └── data/
│       ├── income-report.data.ts
│       ├── expense-report.data.ts
│       └── cash-flow-report.data.ts
├── approvals/
│   └── data/
│       └── approvals.data.ts
├── audit-logs/
│   └── data/
│       └── audit-logs.data.ts
├── imports/
│   └── data/
│       └── import-jobs.data.ts
├── exports/
│   └── data/
│       └── export-jobs.data.ts
└── notifications/
    └── data/
        └── notifications.data.ts
```

Data yang dipakai lintas fitur boleh ditempatkan di shared mock layer.

```txt
shared/
└── data/
    ├── mock-workspaces.data.ts
    ├── mock-users.data.ts
    ├── mock-members.data.ts
    ├── mock-roles.data.ts
    └── mock-session.data.ts
```

Aturan:

- Data domain feature berada di `features/<feature>/data`.
- Data identity/workspace umum berada di `shared/data`.
- Jangan menaruh dummy data di folder `app/`.
- Jangan mencampur dummy data dengan service production.
- Jangan membuat data random langsung di komponen UI.

---

## 3. Naming Convention

Gunakan naming yang konsisten agar mudah dicari.

| Item | Pattern | Contoh |
|---|---|---|
| File dummy data | `<resource>.data.ts` | `transactions.data.ts` |
| Collection variable | `mock<ResourcePlural>` | `mockTransactions` |
| Single variable | `mock<Resource>` | `mockTransaction` |
| Detail fixture | `mock<Resource>Detail` | `mockTransactionDetail` |
| Summary fixture | `mock<Resource>Summary` | `mockDashboardSummary` |
| Factory function | `createMock<Resource>` | `createMockTransaction` |
| Empty state fixture | `empty<Resource>State` | `emptyTransactionsState` |
| Error state fixture | `mock<Resource>Error` | `mockTransactionsError` |

Contoh:

```ts
export const mockTransactions = []
export const mockTransactionDetail = {}
export const mockDashboardSummary = {}
export const createMockTransaction = () => ({})
```

---

## 4. ID Convention

ID dummy data harus stabil, mudah dibaca, dan konsisten.

Format ID:

| Entity | Prefix | Contoh |
|---|---|---|
| Workspace | `wks_` | `wks_acme` |
| User | `usr_` | `usr_anna` |
| Member | `mbr_` | `mbr_anna_owner` |
| Role | `role_` | `role_finance_manager` |
| Account | `acc_` | `acc_bca_operational` |
| Category | `cat_` | `cat_office_supplies` |
| Transaction | `txn_` | `txn_20260115_001` |
| Budget | `bdg_` | `bdg_marketing_q1` |
| Approval | `apv_` | `apv_txn_001` |
| Audit Log | `aud_` | `aud_20260115_001` |
| Import Job | `imp_` | `imp_20260115_001` |
| Export Job | `exp_` | `exp_20260115_001` |
| Notification | `ntf_` | `ntf_budget_warning` |
| Saved View | `view_` | `view_pending_expenses` |

Aturan:

- Jangan gunakan ID random yang berubah setiap reload.
- Jangan gunakan angka saja seperti `1`, `2`, `3`.
- Jangan mengganti ID jika data yang sama masih dipakai di fitur lain.
- Gunakan ID yang menggambarkan entity untuk memudahkan debugging.

---

## 5. Date And Time Convention

Gunakan format ISO 8601 untuk tanggal dan waktu.

Format:

```txt
2026-01-15
2026-01-15T09:30:00.000Z
```

Aturan:

- `date` digunakan untuk tanggal transaksi/report.
- `createdAt`, `updatedAt`, `submittedAt`, `approvedAt`, `completedAt` menggunakan timestamp ISO.
- Dummy data harus memiliki rentang tanggal yang cukup untuk chart dan filter.
- Gunakan tanggal tetap, bukan `new Date()` langsung di dataset.
- Jika butuh tanggal relatif, hitung di helper/factory, bukan di data utama.

Rentang data default:

| Periode | Fungsi |
|---|---|
| 3 bulan terakhir | Dashboard chart |
| Bulan berjalan | Metric cards |
| Quarter berjalan | Budget dan report |
| 12 bulan | Trend report |

---

## 6. Currency And Number Convention

Currency default untuk dummy data adalah `IDR`.

Aturan amount:

- Simpan amount sebagai number integer dalam unit mata uang utama.
- Untuk IDR, `150000` berarti Rp150.000.
- Jangan simpan amount dalam string seperti `"Rp150.000"`.
- Formatting dilakukan oleh utility UI seperti `formatCurrency`.
- Expense dapat disimpan sebagai angka positif dengan `type: "expense"`, bukan angka negatif.
- Transfer menggunakan dua account dan amount positif.

Contoh:

```ts
{
  amount: 850000,
  currency: "IDR",
  type: "expense",
}
```

---

## 7. Base Type Convention

Semua entity utama sebaiknya memiliki field dasar yang konsisten.

```ts
type BaseEntity = {
  id: string
  workspaceId: string
  createdAt: string
  updatedAt: string
}
```

Untuk entity yang dibuat user:

```ts
type AuditableEntity = BaseEntity & {
  createdBy: string
  updatedBy: string
}
```

Untuk entity yang bisa diarsipkan:

```ts
type ArchivableEntity = AuditableEntity & {
  archivedAt: string | null
  archivedBy: string | null
}
```

Aturan:

- Semua data finance harus memiliki `workspaceId`.
- Semua data mutation-sensitive harus memiliki `createdBy` dan `updatedBy`.
- Jangan menghapus data dummy yang masih direferensikan entity lain.
- Gunakan `archivedAt` untuk data yang tidak aktif, bukan menghapus record.

---

## 8. Mock Workspace

Workspace menjadi boundary utama data.

Contoh type:

```ts
export type Workspace = {
  id: string
  name: string
  slug: string
  currency: string
  timezone: string
  plan: "free" | "pro" | "business" | "enterprise"
  status: "active" | "suspended" | "archived"
  createdAt: string
  updatedAt: string
}
```

Contoh dummy data:

```ts
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
    updatedAt: "2026-01-20T08:00:00.000Z",
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
    updatedAt: "2026-01-18T08:00:00.000Z",
  },
]
```

---

## 9. Mock Users And Members

User mewakili identitas global. Member mewakili user dalam workspace.

Contoh type:

```ts
export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  status: "active" | "invited" | "deactivated"
  createdAt: string
  updatedAt: string
}

export type WorkspaceMember = {
  id: string
  workspaceId: string
  userId: string
  roleId: string
  status: "active" | "invited" | "deactivated"
  invitedAt: string | null
  joinedAt: string | null
  createdAt: string
  updatedAt: string
}
```

Contoh dummy data:

```ts
export const mockUsers: User[] = [
  {
    id: "usr_anna",
    name: "Anna Wijaya",
    email: "anna@acme.test",
    avatarUrl: null,
    status: "active",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
  },
  {
    id: "usr_bima",
    name: "Bima Pratama",
    email: "bima@acme.test",
    avatarUrl: null,
    status: "active",
    createdAt: "2025-12-03T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
  },
  {
    id: "usr_citra",
    name: "Citra Lestari",
    email: "citra@acme.test",
    avatarUrl: null,
    status: "active",
    createdAt: "2025-12-05T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
  },
]

export const mockMembers: WorkspaceMember[] = [
  {
    id: "mbr_anna_owner",
    workspaceId: "wks_acme",
    userId: "usr_anna",
    roleId: "role_owner",
    status: "active",
    invitedAt: null,
    joinedAt: "2025-12-01T08:00:00.000Z",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
  },
  {
    id: "mbr_bima_manager",
    workspaceId: "wks_acme",
    userId: "usr_bima",
    roleId: "role_finance_manager",
    status: "active",
    invitedAt: "2025-12-03T08:00:00.000Z",
    joinedAt: "2025-12-03T09:15:00.000Z",
    createdAt: "2025-12-03T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
  },
]
```

---

## 10. Mock Roles And Permissions

Contoh role:

```ts
export type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  system: boolean
}
```

Contoh dummy data:

```ts
export const mockRoles: Role[] = [
  {
    id: "role_owner",
    name: "Owner",
    description: "Full access to workspace, billing, members, and finance data.",
    permissions: ["*"],
    system: true,
  },
  {
    id: "role_admin",
    name: "Admin",
    description: "Manage finance data, members, settings, and reports.",
    permissions: [
      "dashboard.view",
      "transactions.manage",
      "accounts.manage",
      "categories.manage",
      "budgets.manage",
      "reports.view",
      "reports.export",
      "members.manage",
      "audit_logs.view",
    ],
    system: true,
  },
  {
    id: "role_finance_manager",
    name: "Finance Manager",
    description: "Manage daily finance operations and approvals.",
    permissions: [
      "dashboard.view",
      "transactions.manage",
      "accounts.view",
      "categories.manage",
      "budgets.manage",
      "reports.view",
      "approvals.manage",
      "imports.manage",
      "exports.manage",
    ],
    system: true,
  },
  {
    id: "role_viewer",
    name: "Viewer",
    description: "Read-only access to permitted finance data.",
    permissions: ["dashboard.view", "transactions.view", "reports.view"],
    system: true,
  },
]
```

---

## 11. Mock Session

Session dummy digunakan untuk menampilkan state user login.

Contoh type:

```ts
export type MockSession = {
  userId: string
  activeWorkspaceId: string
  memberId: string
  roleId: string
  permissions: string[]
}
```

Contoh dummy data:

```ts
export const mockSession: MockSession = {
  userId: "usr_anna",
  activeWorkspaceId: "wks_acme",
  memberId: "mbr_anna_owner",
  roleId: "role_owner",
  permissions: ["*"],
}
```

Catatan:

- Session dummy hanya untuk UI development.
- Jangan gunakan token nyata.
- Jangan menganggap permission dummy sebagai security production.

---

## 12. Mock Accounts

Account mewakili sumber atau tempat uang.

Contoh type:

```ts
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
```

Contoh dummy data:

```ts
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
    updatedAt: "2026-01-31T17:00:00.000Z",
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
    updatedAt: "2026-01-31T17:00:00.000Z",
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
    updatedAt: "2026-01-29T12:00:00.000Z",
    archivedAt: null,
  },
]
```

---

## 13. Mock Categories

Category digunakan untuk klasifikasi transaksi dan budget.

Contoh type:

```ts
export type CategoryType = "income" | "expense" | "transfer"
export type CategoryStatus = "active" | "archived"

export type Category = {
  id: string
  workspaceId: string
  name: string
  type: CategoryType
  parentId: string | null
  color: string
  icon: string
  status: CategoryStatus
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
  archivedAt: string | null
}
```

Contoh dummy data:

```ts
export const mockCategories: Category[] = [
  {
    id: "cat_sales_revenue",
    workspaceId: "wks_acme",
    name: "Sales Revenue",
    type: "income",
    parentId: null,
    color: "green",
    icon: "TrendingUp",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_anna",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "cat_subscription_revenue",
    workspaceId: "wks_acme",
    name: "Subscription Revenue",
    type: "income",
    parentId: "cat_sales_revenue",
    color: "emerald",
    icon: "Repeat",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_bima",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "cat_payroll",
    workspaceId: "wks_acme",
    name: "Payroll",
    type: "expense",
    parentId: null,
    color: "red",
    icon: "Users",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_anna",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "cat_marketing_ads",
    workspaceId: "wks_acme",
    name: "Marketing Ads",
    type: "expense",
    parentId: null,
    color: "violet",
    icon: "Megaphone",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_bima",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "cat_office_supplies",
    workspaceId: "wks_acme",
    name: "Office Supplies",
    type: "expense",
    parentId: null,
    color: "orange",
    icon: "Package",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_citra",
    createdAt: "2025-12-01T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
]
```

---

## 14. Mock Transactions

Transaction adalah data utama dashboard.

Contoh type:

```ts
export type TransactionType = "income" | "expense" | "transfer" | "adjustment"
export type TransactionStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "void"

export type Transaction = {
  id: string
  workspaceId: string
  referenceNumber: string
  date: string
  type: TransactionType
  status: TransactionStatus
  accountId: string
  destinationAccountId: string | null
  categoryId: string | null
  amount: number
  currency: string
  description: string
  merchant: string | null
  notes: string | null
  attachmentCount: number
  tags: string[]
  createdBy: string
  updatedBy: string
  submittedBy: string | null
  approvedBy: string | null
  rejectedBy: string | null
  createdAt: string
  updatedAt: string
  submittedAt: string | null
  approvedAt: string | null
  rejectedAt: string | null
}
```

Contoh dummy data:

```ts
export const mockTransactions: Transaction[] = [
  {
    id: "txn_20260103_001",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-2026-0001",
    date: "2026-01-03",
    type: "income",
    status: "approved",
    accountId: "acc_bca_operational",
    destinationAccountId: null,
    categoryId: "cat_subscription_revenue",
    amount: 27500000,
    currency: "IDR",
    description: "January subscription payment from Northstar Labs",
    merchant: "Northstar Labs",
    notes: "Invoice INV-2026-001 paid in full.",
    attachmentCount: 1,
    tags: ["subscription", "invoice"],
    createdBy: "usr_bima",
    updatedBy: "usr_anna",
    submittedBy: "usr_bima",
    approvedBy: "usr_anna",
    rejectedBy: null,
    createdAt: "2026-01-03T09:15:00.000Z",
    updatedAt: "2026-01-03T10:10:00.000Z",
    submittedAt: "2026-01-03T09:20:00.000Z",
    approvedAt: "2026-01-03T10:10:00.000Z",
    rejectedAt: null,
  },
  {
    id: "txn_20260105_001",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-2026-0002",
    date: "2026-01-05",
    type: "expense",
    status: "approved",
    accountId: "acc_mandiri_payroll",
    destinationAccountId: null,
    categoryId: "cat_payroll",
    amount: 38500000,
    currency: "IDR",
    description: "January payroll batch",
    merchant: "Payroll",
    notes: "Processed for full-time team.",
    attachmentCount: 2,
    tags: ["payroll", "monthly"],
    createdBy: "usr_bima",
    updatedBy: "usr_anna",
    submittedBy: "usr_bima",
    approvedBy: "usr_anna",
    rejectedBy: null,
    createdAt: "2026-01-05T04:00:00.000Z",
    updatedAt: "2026-01-05T05:30:00.000Z",
    submittedAt: "2026-01-05T04:20:00.000Z",
    approvedAt: "2026-01-05T05:30:00.000Z",
    rejectedAt: null,
  },
  {
    id: "txn_20260110_001",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-2026-0003",
    date: "2026-01-10",
    type: "expense",
    status: "pending",
    accountId: "acc_bca_operational",
    destinationAccountId: null,
    categoryId: "cat_marketing_ads",
    amount: 12500000,
    currency: "IDR",
    description: "Meta Ads campaign top-up",
    merchant: "Meta Platforms",
    notes: "Q1 awareness campaign.",
    attachmentCount: 1,
    tags: ["marketing", "ads", "q1"],
    createdBy: "usr_citra",
    updatedBy: "usr_citra",
    submittedBy: "usr_citra",
    approvedBy: null,
    rejectedBy: null,
    createdAt: "2026-01-10T03:30:00.000Z",
    updatedAt: "2026-01-10T03:40:00.000Z",
    submittedAt: "2026-01-10T03:40:00.000Z",
    approvedAt: null,
    rejectedAt: null,
  },
  {
    id: "txn_20260112_001",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-2026-0004",
    date: "2026-01-12",
    type: "expense",
    status: "approved",
    accountId: "acc_cash_office",
    destinationAccountId: null,
    categoryId: "cat_office_supplies",
    amount: 1850000,
    currency: "IDR",
    description: "Office supplies restock",
    merchant: "Stationery Hub",
    notes: null,
    attachmentCount: 1,
    tags: ["office", "supplies"],
    createdBy: "usr_citra",
    updatedBy: "usr_bima",
    submittedBy: "usr_citra",
    approvedBy: "usr_bima",
    rejectedBy: null,
    createdAt: "2026-01-12T06:00:00.000Z",
    updatedAt: "2026-01-12T07:15:00.000Z",
    submittedAt: "2026-01-12T06:10:00.000Z",
    approvedAt: "2026-01-12T07:15:00.000Z",
    rejectedAt: null,
  },
  {
    id: "txn_20260115_001",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-2026-0005",
    date: "2026-01-15",
    type: "transfer",
    status: "approved",
    accountId: "acc_bca_operational",
    destinationAccountId: "acc_cash_office",
    categoryId: null,
    amount: 2500000,
    currency: "IDR",
    description: "Cash replenishment for office operations",
    merchant: null,
    notes: "Transfer to office cash box.",
    attachmentCount: 0,
    tags: ["internal-transfer"],
    createdBy: "usr_bima",
    updatedBy: "usr_anna",
    submittedBy: "usr_bima",
    approvedBy: "usr_anna",
    rejectedBy: null,
    createdAt: "2026-01-15T08:30:00.000Z",
    updatedAt: "2026-01-15T09:00:00.000Z",
    submittedAt: "2026-01-15T08:35:00.000Z",
    approvedAt: "2026-01-15T09:00:00.000Z",
    rejectedAt: null,
  },
]
```

---

## 15. Mock Budgets

Budget digunakan untuk memantau batas pengeluaran.

Contoh type:

```ts
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
```

Contoh dummy data:

```ts
export const mockBudgets: Budget[] = [
  {
    id: "bdg_marketing_q1",
    workspaceId: "wks_acme",
    name: "Q1 Marketing Budget",
    categoryId: "cat_marketing_ads",
    period: "quarterly",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    amount: 45000000,
    spentAmount: 12500000,
    currency: "IDR",
    thresholdPercentage: 80,
    usagePercentage: 27.78,
    usageStatus: "safe",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_bima",
    createdAt: "2025-12-20T08:00:00.000Z",
    updatedAt: "2026-01-10T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "bdg_payroll_january",
    workspaceId: "wks_acme",
    name: "January Payroll Budget",
    categoryId: "cat_payroll",
    period: "monthly",
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    amount: 40000000,
    spentAmount: 38500000,
    currency: "IDR",
    thresholdPercentage: 90,
    usagePercentage: 96.25,
    usageStatus: "warning",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_bima",
    createdAt: "2025-12-20T08:00:00.000Z",
    updatedAt: "2026-01-05T08:00:00.000Z",
    archivedAt: null,
  },
  {
    id: "bdg_office_supplies_january",
    workspaceId: "wks_acme",
    name: "January Office Supplies",
    categoryId: "cat_office_supplies",
    period: "monthly",
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    amount: 1500000,
    spentAmount: 1850000,
    currency: "IDR",
    thresholdPercentage: 80,
    usagePercentage: 123.33,
    usageStatus: "exceeded",
    status: "active",
    createdBy: "usr_anna",
    updatedBy: "usr_citra",
    createdAt: "2025-12-20T08:00:00.000Z",
    updatedAt: "2026-01-12T08:00:00.000Z",
    archivedAt: null,
  },
]
```

---

## 16. Mock Dashboard Summary

Dashboard summary adalah aggregate data untuk metric cards dan overview.

Contoh type:

```ts
export type DashboardSummary = {
  workspaceId: string
  period: {
    from: string
    to: string
  }
  currency: string
  totalBalance: number
  totalIncome: number
  totalExpense: number
  netCashFlow: number
  incomeChangePercentage: number
  expenseChangePercentage: number
  balanceChangePercentage: number
  pendingApprovalCount: number
  exceededBudgetCount: number
  recentTransactionCount: number
}
```

Contoh dummy data:

```ts
export const mockDashboardSummary: DashboardSummary = {
  workspaceId: "wks_acme",
  period: {
    from: "2026-01-01",
    to: "2026-01-31",
  },
  currency: "IDR",
  totalBalance: 203950000,
  totalIncome: 27500000,
  totalExpense: 52850000,
  netCashFlow: -25350000,
  incomeChangePercentage: 12.4,
  expenseChangePercentage: 8.7,
  balanceChangePercentage: -3.2,
  pendingApprovalCount: 1,
  exceededBudgetCount: 1,
  recentTransactionCount: 5,
}
```

---

## 17. Mock Chart Data

Chart data harus memiliki shape yang sederhana dan stabil.

Cash flow chart:

```ts
export type CashFlowPoint = {
  period: string
  income: number
  expense: number
  net: number
}

export const mockCashFlowChartData: CashFlowPoint[] = [
  { period: "2025-08", income: 62000000, expense: 41000000, net: 21000000 },
  { period: "2025-09", income: 58000000, expense: 39000000, net: 19000000 },
  { period: "2025-10", income: 74000000, expense: 52000000, net: 22000000 },
  { period: "2025-11", income: 69000000, expense: 47000000, net: 22000000 },
  { period: "2025-12", income: 82000000, expense: 61000000, net: 21000000 },
  { period: "2026-01", income: 27500000, expense: 52850000, net: -25350000 },
]
```

Expense by category:

```ts
export type ExpenseByCategoryPoint = {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  color: string
}

export const mockExpenseByCategoryData: ExpenseByCategoryPoint[] = [
  {
    categoryId: "cat_payroll",
    categoryName: "Payroll",
    amount: 38500000,
    percentage: 72.85,
    color: "red",
  },
  {
    categoryId: "cat_marketing_ads",
    categoryName: "Marketing Ads",
    amount: 12500000,
    percentage: 23.65,
    color: "violet",
  },
  {
    categoryId: "cat_office_supplies",
    categoryName: "Office Supplies",
    amount: 1850000,
    percentage: 3.5,
    color: "orange",
  },
]
```

Aturan chart data:

- Jangan format currency di data.
- Jangan gunakan label UI sebagai satu-satunya ID.
- Sertakan `categoryId` atau key stabil.
- Percentage boleh disimpan jika sudah dihitung untuk fixture.
- Data chart harus mencakup kondisi naik, turun, dan negatif.

---

## 18. Mock Reports

Report data sebaiknya dipisah berdasarkan jenis report.

Contoh type:

```ts
export type ReportPeriod = {
  from: string
  to: string
  groupBy: "day" | "week" | "month" | "quarter"
}

export type CashFlowReport = {
  workspaceId: string
  period: ReportPeriod
  currency: string
  totals: {
    income: number
    expense: number
    net: number
  }
  points: CashFlowPoint[]
}
```

Contoh dummy data:

```ts
export const mockCashFlowReport: CashFlowReport = {
  workspaceId: "wks_acme",
  period: {
    from: "2025-08-01",
    to: "2026-01-31",
    groupBy: "month",
  },
  currency: "IDR",
  totals: {
    income: 372000000,
    expense: 292850000,
    net: 79150000,
  },
  points: mockCashFlowChartData,
}
```

Report fixture yang disarankan:

| File | Fungsi |
|---|---|
| `income-report.data.ts` | Income trend dan source revenue |
| `expense-report.data.ts` | Expense trend dan category breakdown |
| `cash-flow-report.data.ts` | Cash flow trend |
| `budget-report.data.ts` | Budget vs actual |
| `transaction-report.data.ts` | Report table transaksi |

---

## 19. Mock Approvals

Approval digunakan untuk workflow enterprise.

Contoh type:

```ts
export type ApprovalStatus = "pending" | "approved" | "rejected" | "cancelled"
export type ApprovalEntityType = "transaction" | "budget" | "account" | "setting"

export type Approval = {
  id: string
  workspaceId: string
  entityType: ApprovalEntityType
  entityId: string
  title: string
  description: string
  amount: number | null
  currency: string | null
  status: ApprovalStatus
  requestedBy: string
  reviewedBy: string | null
  requestedAt: string
  reviewedAt: string | null
  dueAt: string | null
}
```

Contoh dummy data:

```ts
export const mockApprovals: Approval[] = [
  {
    id: "apv_txn_20260110_001",
    workspaceId: "wks_acme",
    entityType: "transaction",
    entityId: "txn_20260110_001",
    title: "Approve marketing campaign expense",
    description: "Meta Ads campaign top-up requires approval.",
    amount: 12500000,
    currency: "IDR",
    status: "pending",
    requestedBy: "usr_citra",
    reviewedBy: null,
    requestedAt: "2026-01-10T03:40:00.000Z",
    reviewedAt: null,
    dueAt: "2026-01-12T17:00:00.000Z",
  },
]
```

---

## 20. Mock Audit Logs

Audit log harus immutable dari sudut pandang UI.

Contoh type:

```ts
export type AuditAction =
  | "transaction.created"
  | "transaction.updated"
  | "transaction.submitted"
  | "transaction.approved"
  | "transaction.rejected"
  | "budget.created"
  | "budget.updated"
  | "csv_import.completed"
  | "report.exported"
  | "member.invited"
  | "role.updated"

export type AuditLog = {
  id: string
  workspaceId: string
  actorId: string
  action: AuditAction
  entityType: string
  entityId: string
  summary: string
  metadata: Record<string, string | number | boolean | null>
  createdAt: string
}
```

Contoh dummy data:

```ts
export const mockAuditLogs: AuditLog[] = [
  {
    id: "aud_20260103_001",
    workspaceId: "wks_acme",
    actorId: "usr_bima",
    action: "transaction.created",
    entityType: "transaction",
    entityId: "txn_20260103_001",
    summary: "Bima Pratama created transaction TRX-2026-0001.",
    metadata: {
      referenceNumber: "TRX-2026-0001",
      amount: 27500000,
      currency: "IDR",
    },
    createdAt: "2026-01-03T09:15:00.000Z",
  },
  {
    id: "aud_20260103_002",
    workspaceId: "wks_acme",
    actorId: "usr_anna",
    action: "transaction.approved",
    entityType: "transaction",
    entityId: "txn_20260103_001",
    summary: "Anna Wijaya approved transaction TRX-2026-0001.",
    metadata: {
      referenceNumber: "TRX-2026-0001",
      previousStatus: "pending",
      nextStatus: "approved",
    },
    createdAt: "2026-01-03T10:10:00.000Z",
  },
]
```

Aturan:

- Jangan menyimpan metadata sensitif berlebihan.
- Audit log dummy harus mencerminkan mutation penting.
- Audit log tidak boleh diedit dari UI.
- Audit log harus bisa difilter berdasarkan action, actor, entity, dan tanggal.

---

## 21. Mock Import Jobs

Import job digunakan untuk simulasi upload CSV dan validasi data.

Contoh type:

```ts
export type ImportJobStatus =
  | "draft"
  | "validating"
  | "ready"
  | "processing"
  | "completed"
  | "failed"

export type ImportJob = {
  id: string
  workspaceId: string
  fileName: string
  source: "csv" | "xlsx"
  status: ImportJobStatus
  totalRows: number
  validRows: number
  invalidRows: number
  importedRows: number
  errorCount: number
  createdBy: string
  createdAt: string
  completedAt: string | null
}
```

Contoh dummy data:

```ts
export const mockImportJobs: ImportJob[] = [
  {
    id: "imp_20260108_001",
    workspaceId: "wks_acme",
    fileName: "january-bank-statement.csv",
    source: "csv",
    status: "completed",
    totalRows: 128,
    validRows: 124,
    invalidRows: 4,
    importedRows: 124,
    errorCount: 4,
    createdBy: "usr_bima",
    createdAt: "2026-01-08T02:00:00.000Z",
    completedAt: "2026-01-08T02:10:00.000Z",
  },
  {
    id: "imp_20260116_001",
    workspaceId: "wks_acme",
    fileName: "marketing-expenses.csv",
    source: "csv",
    status: "ready",
    totalRows: 42,
    validRows: 39,
    invalidRows: 3,
    importedRows: 0,
    errorCount: 3,
    createdBy: "usr_citra",
    createdAt: "2026-01-16T04:00:00.000Z",
    completedAt: null,
  },
]
```

---

## 22. Mock Export Jobs

Export job digunakan untuk simulasi CSV/PDF export.

Contoh type:

```ts
export type ExportJobStatus = "queued" | "processing" | "completed" | "failed"
export type ExportFormat = "csv" | "xlsx" | "pdf"

export type ExportJob = {
  id: string
  workspaceId: string
  name: string
  resourceType: "transactions" | "reports" | "audit_logs"
  format: ExportFormat
  status: ExportJobStatus
  requestedBy: string
  requestedAt: string
  completedAt: string | null
  downloadUrl: string | null
  expiresAt: string | null
}
```

Contoh dummy data:

```ts
export const mockExportJobs: ExportJob[] = [
  {
    id: "exp_20260114_001",
    workspaceId: "wks_acme",
    name: "January transactions export",
    resourceType: "transactions",
    format: "csv",
    status: "completed",
    requestedBy: "usr_anna",
    requestedAt: "2026-01-14T09:00:00.000Z",
    completedAt: "2026-01-14T09:02:00.000Z",
    downloadUrl: "/mock-downloads/january-transactions.csv",
    expiresAt: "2026-01-21T09:02:00.000Z",
  },
  {
    id: "exp_20260117_001",
    workspaceId: "wks_acme",
    name: "Cash flow report PDF",
    resourceType: "reports",
    format: "pdf",
    status: "processing",
    requestedBy: "usr_bima",
    requestedAt: "2026-01-17T10:30:00.000Z",
    completedAt: null,
    downloadUrl: null,
    expiresAt: null,
  },
]
```

---

## 23. Mock Notifications

Notification digunakan untuk alert dan workflow feedback.

Contoh type:

```ts
export type NotificationType =
  | "budget_warning"
  | "budget_exceeded"
  | "approval_requested"
  | "import_completed"
  | "export_completed"
  | "system"

export type Notification = {
  id: string
  workspaceId: string
  userId: string
  type: NotificationType
  title: string
  description: string
  href: string | null
  readAt: string | null
  createdAt: string
}
```

Contoh dummy data:

```ts
export const mockNotifications: Notification[] = [
  {
    id: "ntf_budget_exceeded_office",
    workspaceId: "wks_acme",
    userId: "usr_anna",
    type: "budget_exceeded",
    title: "Office Supplies budget exceeded",
    description: "January Office Supplies has reached 123.33% of its budget.",
    href: "/budgets/bdg_office_supplies_january",
    readAt: null,
    createdAt: "2026-01-12T08:10:00.000Z",
  },
  {
    id: "ntf_approval_marketing",
    workspaceId: "wks_acme",
    userId: "usr_anna",
    type: "approval_requested",
    title: "Marketing expense needs approval",
    description: "Meta Ads campaign top-up is waiting for approval.",
    href: "/approvals/apv_txn_20260110_001",
    readAt: null,
    createdAt: "2026-01-10T03:45:00.000Z",
  },
]
```

---

## 24. Mock Saved Views

Saved view digunakan untuk menyimpan filter table/report.

Contoh type:

```ts
export type SavedViewResource = "transactions" | "reports" | "audit_logs"

export type SavedView = {
  id: string
  workspaceId: string
  resource: SavedViewResource
  name: string
  description: string | null
  query: Record<string, string>
  isDefault: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}
```

Contoh dummy data:

```ts
export const mockSavedViews: SavedView[] = [
  {
    id: "view_pending_expenses",
    workspaceId: "wks_acme",
    resource: "transactions",
    name: "Pending Expenses",
    description: "Expense transactions waiting for approval.",
    query: {
      type: "expense",
      status: "pending",
      sort: "date",
      direction: "desc",
    },
    isDefault: false,
    createdBy: "usr_anna",
    createdAt: "2026-01-02T08:00:00.000Z",
    updatedAt: "2026-01-02T08:00:00.000Z",
  },
]
```

---

## 25. Empty, Loading, And Error Fixtures

Dummy data juga harus menyediakan skenario state, bukan hanya happy path.

Contoh empty state:

```ts
export const emptyTransactionsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
}
```

Contoh error state:

```ts
export const mockTransactionsError = {
  code: "TRANSACTIONS_LOAD_FAILED",
  message: "Unable to load transactions.",
  retryable: true,
}
```

Contoh loading tidak perlu berupa data. Loading state harus dikontrol dari hook/service mock.

Skenario wajib:

| Feature | Empty | Loading | Error |
|---|---:|---:|---:|
| Dashboard | Yes | Yes | Yes |
| Transactions | Yes | Yes | Yes |
| Accounts | Yes | Yes | Yes |
| Categories | Yes | Yes | Yes |
| Budgets | Yes | Yes | Yes |
| Reports | Yes | Yes | Yes |
| Approvals | Yes | Yes | Yes |
| Import/Export | Yes | Yes | Yes |
| Audit Logs | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes |

---

## 26. Pagination Fixture

List data harus mengikuti format pagination yang konsisten.

Contoh type:

```ts
export type PaginatedResponse<T> = {
  items: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
```

Contoh:

```ts
export const mockTransactionsPage: PaginatedResponse<Transaction> = {
  items: mockTransactions,
  meta: {
    page: 1,
    limit: 10,
    total: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
}
```

Aturan:

- Semua list page menggunakan shape pagination yang sama.
- Jangan mengembalikan array mentah untuk halaman table enterprise.
- Pagination dummy harus mendukung simulasi `page`, `limit`, dan `total`.

---

## 27. Filter And Sorting Fixture

Dummy service harus bisa mensimulasikan filter dan sorting dasar.

Filter minimal transactions:

```ts
export type TransactionFilters = {
  query?: string
  page?: number
  limit?: number
  sort?: "date" | "amount" | "status" | "createdAt"
  direction?: "asc" | "desc"
  type?: TransactionType
  status?: TransactionStatus
  accountId?: string
  categoryId?: string
  from?: string
  to?: string
}
```

Aturan:

- Filtering dummy boleh sederhana, tetapi harus deterministic.
- Sorting dummy harus mengikuti query URL.
- Search dummy minimal mencari `description`, `merchant`, dan `referenceNumber`.
- Date filter menggunakan field `date`.

---

## 28. Mock Service Layer

UI sebaiknya tidak import dummy array secara langsung jika nantinya data akan diganti API.

Gunakan mock service atau hook.

Lokasi rekomendasi:

```txt
features/transactions/services/mock-transaction-service.ts
features/accounts/services/mock-account-service.ts
features/reports/services/mock-report-service.ts
```

Contoh:

```ts
import { mockTransactions } from "../data/transactions.data"

export async function getMockTransactions() {
  return {
    items: mockTransactions,
    meta: {
      page: 1,
      limit: 10,
      total: mockTransactions.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  }
}
```

Saat API siap, service dapat diganti:

```txt
UI -> useTransactions -> transactionService.getTransactions
```

Dari:

```txt
transactionService -> mock data
```

Menjadi:

```txt
transactionService -> /api/transactions
```

---

## 29. Relationship Rules

Relasi antar dummy data harus valid.

Aturan relasi:

- `transaction.accountId` harus ada di `mockAccounts`.
- `transaction.destinationAccountId` harus ada di `mockAccounts` jika tidak null.
- `transaction.categoryId` harus ada di `mockCategories` jika tidak null.
- `budget.categoryId` harus ada di `mockCategories`.
- `approval.entityId` harus mengarah ke entity yang valid.
- `auditLog.actorId` harus ada di `mockUsers`.
- `notification.userId` harus ada di `mockUsers`.
- Semua entity finance harus memiliki `workspaceId` yang valid.

Contoh consistency check:

```ts
const accountIds = new Set(mockAccounts.map((account) => account.id))

for (const transaction of mockTransactions) {
  if (!accountIds.has(transaction.accountId)) {
    throw new Error(`Invalid accountId: ${transaction.accountId}`)
  }
}
```

Consistency check dapat dijalankan di test atau script development.

---

## 30. Scenario Coverage

Dummy data harus mencakup variasi state agar UI tidak hanya bagus di happy path.

Transactions:

- Income approved.
- Expense approved.
- Expense pending approval.
- Expense rejected.
- Transfer approved.
- Draft transaction.
- Transaction with attachment.
- Transaction without category.
- Transaction with large amount.

Accounts:

- Bank account.
- Cash account.
- Wallet account.
- Archived account.
- Account with low balance.
- Account with high balance.

Budgets:

- Safe budget.
- Warning budget.
- Exceeded budget.
- Archived budget.
- Scheduled budget.

Reports:

- Positive cash flow.
- Negative cash flow.
- Empty report period.
- Category concentration.
- Month-over-month increase.
- Month-over-month decrease.

Enterprise:

- Pending approval.
- Completed import.
- Failed import.
- Processing export.
- Completed export.
- Audit log mutation.
- Unread notification.
- Permission denied scenario.

---

## 31. Data Volume Recommendation

Jumlah dummy data harus cukup untuk menguji UI tanpa membuat repo berat.

| Entity | Minimum | Recommended |
|---|---:|---:|
| Workspaces | 1 | 2 |
| Users | 3 | 6 |
| Members | 3 | 6 |
| Accounts | 3 | 6 |
| Categories | 8 | 16 |
| Transactions | 20 | 80 |
| Budgets | 4 | 12 |
| Report points | 6 | 12 |
| Approvals | 3 | 10 |
| Audit Logs | 10 | 40 |
| Import Jobs | 2 | 8 |
| Export Jobs | 2 | 8 |
| Notifications | 5 | 20 |
| Saved Views | 2 | 8 |

Untuk tahap awal UI, minimal 20 transaksi cukup. Untuk table, pagination, dan filter yang lebih realistis, gunakan 50 sampai 80 transaksi.

---

## 32. Deterministic Data Rule

Dummy data harus deterministic.

Hindari:

```ts
Math.random()
new Date()
crypto.randomUUID()
```

di file data statis.

Jika perlu generator data, buat factory dengan seed tetap.

Contoh:

```ts
export function createMockTransaction(overrides?: Partial<Transaction>) {
  return {
    id: "txn_mock_default",
    workspaceId: "wks_acme",
    referenceNumber: "TRX-MOCK-0001",
    date: "2026-01-01",
    type: "expense",
    status: "draft",
    accountId: "acc_bca_operational",
    destinationAccountId: null,
    categoryId: "cat_office_supplies",
    amount: 100000,
    currency: "IDR",
    description: "Mock transaction",
    merchant: null,
    notes: null,
    attachmentCount: 0,
    tags: [],
    createdBy: "usr_anna",
    updatedBy: "usr_anna",
    submittedBy: null,
    approvedBy: null,
    rejectedBy: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    submittedAt: null,
    approvedAt: null,
    rejectedAt: null,
    ...overrides,
  } satisfies Transaction
}
```

---

## 33. Migration To API

Dummy data harus mudah diganti API.

Aturan:

- UI tidak boleh bergantung pada nama file dummy data.
- UI berkomunikasi lewat hook atau service.
- Shape dummy response harus sama dengan rencana API response.
- Error dummy harus sama dengan format error API.
- Pagination dummy harus sama dengan pagination API.
- Filter dummy harus membaca query yang sama dengan API.

Contoh target flow:

```txt
TransactionsPage
-> useTransactions(filters)
-> transactionService.getTransactions(filters)
-> mock data sekarang
-> API nanti
```

Saat API sudah tersedia:

- Hapus import dummy dari service.
- Ganti implementation service ke HTTP client.
- Pertahankan type, schema, dan UI.
- Gunakan dummy data tetap sebagai fixture test/storybook jika diperlukan.

---

## 34. Security And Privacy Rules

Dummy data tidak boleh menggunakan data pribadi nyata.

Aturan:

- Gunakan domain email `.test`.
- Jangan gunakan nomor rekening nyata.
- Masking nomor account dengan format `**** 1234`.
- Jangan gunakan nama customer nyata kecuali fiktif.
- Jangan menyimpan credential.
- Jangan menyimpan token.
- Jangan menyimpan file export nyata.
- Jangan memasukkan data finance bisnis nyata.

Contoh aman:

```txt
anna@acme.test
**** 3021
Northstar Labs
Acme Studio
```

---

## 35. Checklist Dummy Data

Gunakan checklist ini saat membuat atau memperbarui dummy data.

| Checklist | Status |
|---|---|
| Data berada di folder feature/shared yang tepat | Required |
| ID stabil dan mengikuti prefix convention | Required |
| Semua entity finance memiliki `workspaceId` | Required |
| Semua tanggal menggunakan format ISO | Required |
| Amount disimpan sebagai number | Required |
| Currency tersedia untuk amount | Required |
| Relasi antar entity valid | Required |
| Data mencakup happy path dan edge state | Required |
| Empty/loading/error scenario tersedia | Required |
| List response menggunakan pagination shape | Required |
| UI tidak import dummy array langsung jika service tersedia | Recommended |
| Tidak ada data pribadi nyata | Required |
| Tidak ada token atau secret | Required |
| Dummy data mudah diganti API | Required |

---

## 36. Ringkasan Keputusan

Keputusan dummy data untuk Finance Dashboard:

- Dummy data dibuat sebagai kontrak sementara sebelum API.
- Data domain feature berada di `features/<feature>/data`.
- Data umum seperti user, workspace, role, dan session berada di `shared/data`.
- ID menggunakan prefix stabil seperti `txn_`, `acc_`, `cat_`, dan `bdg_`.
- Semua entity finance memiliki `workspaceId`.
- Amount disimpan sebagai number dan currency sebagai field terpisah.
- Tanggal menggunakan format ISO dan tidak dibuat random saat render.
- Dummy data harus mencakup accounts, categories, transactions, budgets, dashboard, reports, approvals, audit logs, import/export, notifications, dan saved views.
- UI sebaiknya mengakses dummy data lewat service/hook agar migrasi ke API lebih mudah.
- Dummy data harus mencakup empty, loading, error, happy path, dan enterprise workflow state.
