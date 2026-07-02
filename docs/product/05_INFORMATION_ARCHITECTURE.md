# Finance Dashboard NextJS - Information Architecture

## 1. Ringkasan

Dokumen ini menjelaskan information architecture untuk Finance Dashboard NextJS dengan pendekatan **Feature-Based Architecture**.

Prinsip utama:

- Folder `app/` hanya digunakan untuk routing, route groups, layout route-level, loading/error boundary route-level, dan entry point halaman.
- Semua fitur, domain logic, UI feature-specific, hooks, schema, service, type, dan helper domain disimpan di folder `features/`.
- Komponen UI reusable yang tidak memiliki business domain tetap disimpan di `shared/`.
- Setiap fitur memiliki boundary yang jelas agar mudah dikembangkan, diuji, dipelihara, dan ditingkatkan menuju enterprise-ready.

## 2. Tujuan Information Architecture

Information architecture ini dibuat untuk:

- Menentukan struktur navigasi dashboard.
- Menentukan struktur route aplikasi.
- Memetakan route ke feature module.
- Menentukan ownership folder antara `app/`, `features/`, dan `shared/`.
- Menjaga agar domain finance tidak tersebar di folder routing.
- Membantu developer memahami tempat menaruh komponen, hooks, schema, service, dan type.
- Menjadi dasar untuk folder structure, routing documentation, API structure, dan development tasks.

## 3. Architecture Decision

Architecture yang digunakan:

> Feature-Based Architecture with Thin App Router.

Artinya:

- `app/` bertugas sebagai routing layer.
- `features/` bertugas sebagai product/domain layer.
- `shared/` bertugas sebagai reusable foundation layer.
- Route page di `app/` hanya mengimpor screen/container dari `features/`.
- Business logic tidak ditulis langsung di `app/page.tsx`.
- Komponen domain seperti `TransactionsTable`, `BudgetForm`, atau `DashboardSummaryCards` berada di `features/`.

## 4. High-Level Structure

Struktur tingkat atas yang disarankan:

```text
.
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── features/
│   ├── accounts/
│   ├── approvals/
│   ├── audit-logs/
│   ├── auth/
│   ├── budgets/
│   ├── categories/
│   ├── dashboard/
│   ├── imports-exports/
│   ├── notifications/
│   ├── reports/
│   ├── search/
│   ├── settings/
│   ├── transactions/
│   └── workspaces/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── types/
│   └── utils/
└── docs/
```

## 5. Layer Responsibilities

| Layer | Folder | Responsibility |
| --- | --- | --- |
| Routing Layer | `app/` | Route definition, route groups, route-level layouts, route loading/error boundaries, metadata. |
| Feature Layer | `features/` | Domain UI, feature screens, forms, tables, hooks, schemas, services, types, domain utilities. |
| Shared Layer | `shared/` | Reusable UI primitives, providers, cross-feature hooks, generic utilities, shared types. |
| Documentation Layer | `docs/` | Product, architecture, design, layout, quality, development documentation. |

## 6. App Folder Rules

Folder `app/` harus tetap tipis.

Yang boleh ada di `app/`:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `route.ts`
- `metadata`
- Route groups seperti `(auth)` dan `(dashboard)`
- Import screen dari `features/`

Yang tidak boleh ada di `app/`:

- Business logic transaksi.
- Form logic finance.
- Data transformation domain.
- Table configuration domain.
- Chart configuration domain yang spesifik fitur.
- Schema validasi domain.
- Service/API client domain.
- Komponen besar yang hanya dipakai fitur tertentu.

Contoh route page yang benar:

```tsx
import { TransactionsPage } from "@/features/transactions/screens/transactions-page"

export default function Page() {
    return <TransactionsPage />
}
```

Contoh route page yang harus dihindari:

```tsx
export default function Page() {
    // Hindari menaruh table, form, query, filtering, dan business logic langsung di sini.
}
```

## 7. Feature Folder Standard

Setiap feature menggunakan struktur standar berikut:

```text
features/feature-name/
├── components/
├── screens/
├── hooks/
├── services/
├── schemas/
├── types/
├── utils/
├── constants/
├── data/
└── index.ts
```

### Folder Meaning

| Folder | Isi |
| --- | --- |
| `components/` | Komponen UI spesifik feature. |
| `screens/` | Komponen halaman/container yang diimpor oleh route di `app/`. |
| `hooks/` | Hooks spesifik feature. |
| `services/` | API client atau service function spesifik feature. |
| `schemas/` | Zod schema atau validation schema spesifik feature. |
| `types/` | TypeScript type/interface spesifik feature. |
| `utils/` | Helper domain spesifik feature. |
| `constants/` | Constant seperti status, tabs, filter config, menu action. |
| `data/` | Dummy data, fixture, atau mapper awal. |
| `index.ts` | Public export feature. |

## 8. Feature Ownership Rules

| Item | Lokasi |
| --- | --- |
| Dashboard metric cards | `features/dashboard/components/` |
| Dashboard screen | `features/dashboard/screens/` |
| Transaction table | `features/transactions/components/` |
| Transaction form schema | `features/transactions/schemas/` |
| Transaction service | `features/transactions/services/` |
| Transaction type | `features/transactions/types/` |
| Budget usage calculation | `features/budgets/utils/` |
| Report chart config | `features/reports/components/` atau `features/reports/utils/` |
| Workspace switcher | `features/workspaces/components/` |
| Permission gate | `features/rbac/components/` atau `features/auth/components/` sesuai implementasi |
| Generic button/card/table primitive | `shared/components/ui/` |
| Generic currency formatter | `shared/utils/` atau `shared/lib/` |
| Domain-specific currency display | Feature terkait jika membutuhkan aturan domain |

## 9. Sitemap

```text
/
├── /login
├── /register
├── /forgot-password
├── /dashboard
├── /transactions
│   ├── /transactions/new
│   ├── /transactions/[transactionId]
│   └── /transactions/[transactionId]/edit
├── /accounts
│   ├── /accounts/new
│   ├── /accounts/[accountId]
│   └── /accounts/[accountId]/edit
├── /categories
│   ├── /categories/new
│   └── /categories/[categoryId]/edit
├── /budgets
│   ├── /budgets/new
│   ├── /budgets/[budgetId]
│   └── /budgets/[budgetId]/edit
├── /reports
│   ├── /reports/income
│   ├── /reports/expenses
│   ├── /reports/cash-flow
│   ├── /reports/budgets
│   └── /reports/transactions
├── /approvals
├── /imports
│   └── /imports/[importJobId]
├── /exports
│   └── /exports/[exportJobId]
├── /audit-logs
│   └── /audit-logs/[auditLogId]
├── /notifications
└── /settings
    ├── /settings/profile
    ├── /settings/workspace
    ├── /settings/members
    ├── /settings/roles
    ├── /settings/preferences
    ├── /settings/approval-rules
    ├── /settings/notifications
    └── /settings/security
```

## 10. App Route Grouping

Struktur route di `app/`:

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── transactions/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [transactionId]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   ├── accounts/
│   ├── categories/
│   ├── budgets/
│   ├── reports/
│   ├── approvals/
│   ├── imports/
│   ├── exports/
│   ├── audit-logs/
│   ├── notifications/
│   └── settings/
└── api/
```

## 11. Route To Feature Mapping

| Route | Feature Owner | Screen Import |
| --- | --- | --- |
| `/login` | `features/auth` | `LoginPage` |
| `/register` | `features/auth` | `RegisterPage` |
| `/forgot-password` | `features/auth` | `ForgotPasswordPage` |
| `/dashboard` | `features/dashboard` | `DashboardPage` |
| `/transactions` | `features/transactions` | `TransactionsPage` |
| `/transactions/new` | `features/transactions` | `NewTransactionPage` |
| `/transactions/[transactionId]` | `features/transactions` | `TransactionDetailPage` |
| `/transactions/[transactionId]/edit` | `features/transactions` | `EditTransactionPage` |
| `/accounts` | `features/accounts` | `AccountsPage` |
| `/accounts/new` | `features/accounts` | `NewAccountPage` |
| `/accounts/[accountId]` | `features/accounts` | `AccountDetailPage` |
| `/categories` | `features/categories` | `CategoriesPage` |
| `/budgets` | `features/budgets` | `BudgetsPage` |
| `/reports` | `features/reports` | `ReportsPage` |
| `/approvals` | `features/approvals` | `ApprovalsPage` |
| `/imports` | `features/imports-exports` | `ImportsPage` |
| `/exports` | `features/imports-exports` | `ExportsPage` |
| `/audit-logs` | `features/audit-logs` | `AuditLogsPage` |
| `/notifications` | `features/notifications` | `NotificationsPage` |
| `/settings/*` | `features/settings` | Settings screens |

## 12. Navigation Architecture

### Primary Sidebar

Urutan navigasi utama:

```text
Dashboard
Transactions
Accounts
Categories
Budgets
Reports
Approvals
Imports / Exports
Audit Logs
Notifications
Settings
```

### Navigation Rules

- Sidebar berada di dashboard layout.
- Item aktif mengikuti route aktif.
- Item yang user tidak punya permission dapat disembunyikan.
- Item enterprise seperti Approvals, Audit Logs, dan Imports/Exports dapat tampil hanya untuk role yang relevan.
- Mobile menggunakan drawer atau collapsible navigation.

### Sidebar Ownership

- Shell/layout sidebar berada di `features/app-shell` jika dibuat sebagai feature tersendiri, atau di `features/dashboard-shell`.
- Navigation config dapat disimpan di `features/navigation/constants/` atau `features/app-shell/constants/`.
- UI primitive tetap memakai `shared/components/ui/sidebar`.

Rekomendasi folder:

```text
features/app-shell/
├── components/
│   ├── app-sidebar.tsx
│   ├── app-header.tsx
│   ├── mobile-nav.tsx
│   └── user-menu.tsx
├── constants/
│   └── navigation-items.ts
└── screens/
```

## 13. Layout Hierarchy

```text
RootLayout
└── Providers
    ├── AuthLayout
    │   └── Auth pages
    └── DashboardLayout
        ├── AppSidebar
        ├── AppHeader
        └── Page Content
```

### Root Layout

Location:

```text
app/layout.tsx
```

Responsibilities:

- HTML shell.
- Font setup.
- Global providers.
- Global metadata.
- Global CSS import.

### Auth Layout

Location:

```text
app/(auth)/layout.tsx
```

Responsibilities:

- Auth page frame.
- Minimal layout.
- No dashboard sidebar.

### Dashboard Layout

Location:

```text
app/(dashboard)/layout.tsx
```

Responsibilities:

- Protected dashboard shell.
- App sidebar.
- Header.
- Workspace context.
- Permission-aware navigation.

Business UI tetap diimpor dari `features/app-shell` atau feature terkait.

## 14. Page Composition Pattern

Route page harus memanggil screen dari feature.

Contoh:

```tsx
import { DashboardPage } from "@/features/dashboard/screens/dashboard-page"

export default function Page() {
    return <DashboardPage />
}
```

Screen di feature bertugas menyusun komponen domain.

```tsx
export function DashboardPage() {
    return (
        <>
            <DashboardHeader />
            <DashboardMetricGrid />
            <DashboardCharts />
            <RecentTransactions />
        </>
    )
}
```

## 15. Feature Module IA

### 15.1 Dashboard

```text
features/dashboard/
├── components/
│   ├── dashboard-header.tsx
│   ├── metric-card.tsx
│   ├── metric-grid.tsx
│   ├── cash-flow-chart.tsx
│   ├── expense-category-chart.tsx
│   ├── budget-usage-summary.tsx
│   └── recent-transactions.tsx
├── hooks/
│   └── use-dashboard-summary.ts
├── services/
│   └── dashboard-service.ts
├── types/
│   └── dashboard.types.ts
├── utils/
│   └── dashboard-mappers.ts
└── screens/
    └── dashboard-page.tsx
```

Information shown:

- Balance.
- Income.
- Expense.
- Net cash flow.
- Budget usage.
- Cash flow trend.
- Expense by category.
- Recent transactions.

### 15.2 Transactions

```text
features/transactions/
├── components/
│   ├── transactions-table.tsx
│   ├── transaction-form.tsx
│   ├── transaction-detail.tsx
│   ├── transaction-filters.tsx
│   ├── transaction-bulk-actions.tsx
│   └── transaction-status-badge.tsx
├── hooks/
│   ├── use-transactions.ts
│   └── use-transaction-form.ts
├── services/
│   └── transaction-service.ts
├── schemas/
│   └── transaction-schema.ts
├── types/
│   └── transaction.types.ts
├── constants/
│   └── transaction-options.ts
└── screens/
    ├── transactions-page.tsx
    ├── new-transaction-page.tsx
    ├── transaction-detail-page.tsx
    └── edit-transaction-page.tsx
```

Information shown:

- Transaction date.
- Type.
- Status.
- Account.
- Category.
- Description.
- Amount.
- Created by.
- Approval status.
- Audit history if permitted.

### 15.3 Accounts

```text
features/accounts/
├── components/
│   ├── accounts-table.tsx
│   ├── account-form.tsx
│   ├── account-detail.tsx
│   ├── account-balance-card.tsx
│   └── transfer-form.tsx
├── hooks/
├── services/
├── schemas/
├── types/
└── screens/
```

Information shown:

- Account name.
- Account type.
- Institution.
- Current balance.
- Currency.
- Status.
- Transaction history.

### 15.4 Categories

```text
features/categories/
├── components/
│   ├── categories-table.tsx
│   ├── category-form.tsx
│   ├── category-badge.tsx
│   └── category-usage-panel.tsx
├── hooks/
├── services/
├── schemas/
├── types/
└── screens/
```

Information shown:

- Category name.
- Type.
- Color.
- Icon.
- Status.
- Usage count.
- Locked status.

### 15.5 Budgets

```text
features/budgets/
├── components/
│   ├── budgets-table.tsx
│   ├── budget-form.tsx
│   ├── budget-usage-bar.tsx
│   └── budget-variance-card.tsx
├── hooks/
├── services/
├── schemas/
├── types/
└── screens/
```

Information shown:

- Budget name.
- Category.
- Period.
- Limit.
- Usage.
- Remaining amount.
- Status.
- Threshold alert.

### 15.6 Reports

```text
features/reports/
├── components/
│   ├── reports-overview.tsx
│   ├── report-filter-bar.tsx
│   ├── report-chart.tsx
│   ├── report-table.tsx
│   └── saved-view-menu.tsx
├── hooks/
├── services/
├── types/
├── utils/
└── screens/
```

Information shown:

- Income report.
- Expense report.
- Cash flow report.
- Budget vs actual.
- Account balance trend.
- Transaction detail report.

### 15.7 Enterprise Modules

Enterprise modules:

```text
features/approvals/
features/audit-logs/
features/imports-exports/
features/notifications/
features/workspaces/
features/settings/
features/auth/
features/search/
```

Setiap enterprise module mengikuti struktur feature standar.

## 16. URL And State Architecture

State yang boleh masuk URL:

- Search query.
- Page number.
- Sort column.
- Sort direction.
- Date range.
- Transaction type.
- Transaction status.
- Account filter.
- Category filter.
- Report type.
- Saved view id.

Contoh:

```text
/transactions?query=rent&type=expense&status=approved&page=2
/reports/cash-flow?from=2026-01-01&to=2026-01-31&groupBy=week
```

State yang tidak perlu masuk URL:

- Open/closed dropdown.
- Temporary form input.
- Dialog internal state.
- Hover state.
- Client-only UI transition state.

## 17. Information Hierarchy Per Page

### Dashboard Page

Priority:

1. Workspace context.
2. Period filter.
3. Key metrics.
4. Cash flow trend.
5. Budget status.
6. Category breakdown.
7. Recent transactions.
8. Alerts/insights.

### Transactions Page

Priority:

1. Page title and primary action.
2. Search and filters.
3. Transaction table.
4. Bulk actions.
5. Pagination.
6. Saved views.

### Reports Page

Priority:

1. Report type.
2. Date range.
3. Summary metrics.
4. Chart.
5. Data table.
6. Export/saved view actions.

### Settings Page

Priority:

1. Settings section navigation.
2. Current setting values.
3. Editable form.
4. Save/cancel actions.
5. Audit-sensitive warning if needed.

## 18. Cross-Feature Shared Concepts

Beberapa konsep dipakai lintas fitur dan harus konsisten:

| Concept | Source Of Truth |
| --- | --- |
| Active workspace | `features/workspaces` |
| Current user | `features/auth` |
| Permissions | `features/rbac` atau `features/auth` |
| Notifications | `features/notifications` |
| Global search | `features/search` |
| Currency/date formatting | `shared/utils` dengan konfigurasi dari workspace/user |
| Audit logging display | `features/audit-logs` |
| Import/export jobs | `features/imports-exports` |

## 19. Shared Folder IA

`shared/` menyimpan hal-hal reusable yang tidak memiliki domain bisnis spesifik.

```text
shared/
├── components/
│   └── ui/
├── hooks/
├── lib/
├── providers/
├── types/
└── utils/
```

### Shared Rules

- `shared/components/ui/` hanya berisi primitive atau reusable component yang domain-agnostic.
- `shared/lib/` berisi helper generic seperti `cn`.
- `shared/providers/` berisi provider global seperti theme provider.
- Jangan simpan `TransactionForm` atau `BudgetUsageCard` di `shared/` karena itu domain-specific.
- Jika komponen hanya dipakai satu feature, simpan di feature tersebut.
- Jika komponen dipakai banyak feature tetapi tetap domain finance, pertimbangkan `features/*` owner yang paling tepat atau buat feature foundation khusus.

## 20. Enterprise IA Requirements

Untuk enterprise-ready, IA harus mendukung:

- Multi-workspace data separation.
- Permission-aware navigation.
- Permission-aware action visibility.
- Protected route groups.
- Audit visibility per entity.
- Approval queue sebagai area kerja tersendiri.
- Import/export job history.
- Settings yang memisahkan personal settings dan workspace settings.
- Notification center yang dapat mengarahkan user ke entity terkait.
- Scalable list pages dengan filter, sort, pagination, dan saved views.

## 21. Route Protection Rules

| Route Group | Protection |
| --- | --- |
| `(auth)` | Public only or guest preferred. |
| `(dashboard)` | Authenticated user required. |
| `/settings/members` | Owner/Admin only. |
| `/settings/roles` | Owner/Admin only. |
| `/settings/approval-rules` | Owner/Admin only. |
| `/audit-logs` | Owner/Admin/Finance Manager limited. |
| `/approvals` | Owner/Admin/Finance Manager. |
| `/imports` | Owner/Admin/Finance Manager/Finance Staff limited. |
| `/exports` | Permission-based. |

## 22. Breadcrumb Rules

Breadcrumb digunakan untuk nested dan detail pages.

Examples:

```text
Dashboard
Transactions
Transactions > New Transaction
Transactions > TXN-001
Transactions > TXN-001 > Edit
Accounts > Bank Account
Reports > Cash Flow
Settings > Members
Audit Logs > Activity Detail
```

Rules:

- Breadcrumb tidak wajib untuk top-level dashboard.
- Breadcrumb wajib untuk detail dan edit page.
- Breadcrumb label harus human-readable.
- Breadcrumb entity detail menggunakan display name atau short id.

## 23. Empty State Architecture

Setiap feature list page harus memiliki empty state.

| Page | Empty State CTA |
| --- | --- |
| Dashboard | Add account atau add transaction. |
| Transactions | Add transaction atau import CSV. |
| Accounts | Add account. |
| Categories | Add category atau restore default categories. |
| Budgets | Create budget. |
| Reports | Add transaction first. |
| Approvals | No pending approvals. |
| Imports | Upload CSV. |
| Audit Logs | No activity yet. |
| Notifications | No notifications. |

CTA mutasi harus disembunyikan jika user tidak memiliki permission.

## 24. Loading And Error Architecture

### Route-Level Loading

`app/` dapat menyediakan `loading.tsx` untuk route group atau route tertentu.

### Feature-Level Loading

Feature component harus menyediakan skeleton khusus domain, seperti:

- Dashboard metric skeleton.
- Transactions table skeleton.
- Report chart skeleton.
- Settings form skeleton.

### Error Strategy

- Route-level error untuk kegagalan besar.
- Widget-level error untuk kegagalan sebagian.
- Retry action untuk request yang bisa diulang.
- Safe error message untuk user.
- Detail teknis hanya untuk logging/observability.

## 25. Import Boundary Rules

Aturan import:

- `app/` boleh import dari `features/` dan `shared/`.
- `features/` boleh import dari `shared/`.
- `features/` boleh import feature lain hanya melalui public API atau index jika benar-benar dibutuhkan.
- Hindari circular dependency antar feature.
- `shared/` tidak boleh import dari `features/`.

Contoh yang benar:

```tsx
import { TransactionsPage } from "@/features/transactions"
import { Button } from "@/shared/components/ui/button"
```

Contoh yang salah:

```tsx
// shared tidak boleh bergantung pada feature.
import { TransactionStatus } from "@/features/transactions/types"
```

## 26. Public API Per Feature

Setiap feature sebaiknya memiliki `index.ts` untuk export publik.

```text
features/transactions/index.ts
```

Contoh:

```ts
export { TransactionsPage } from "./screens/transactions-page"
export { NewTransactionPage } from "./screens/new-transaction-page"
export type { Transaction } from "./types/transaction.types"
```

Rules:

- Route di `app/` sebaiknya import dari public API feature.
- Internal component yang tidak perlu dipakai luar feature tidak perlu diekspor.
- Cross-feature dependency harus memakai export publik.

## 27. Naming Conventions

### Folder

- Gunakan kebab-case untuk folder.
- Contoh: `imports-exports`, `audit-logs`, `saved-views`.

### Component File

- Gunakan kebab-case untuk file.
- Contoh: `transaction-form.tsx`, `budget-usage-bar.tsx`.

### Component Name

- Gunakan PascalCase.
- Contoh: `TransactionForm`, `BudgetUsageBar`.

### Hook

- Gunakan camelCase dengan prefix `use`.
- Contoh: `useTransactions`, `useBudgetUsage`.

### Schema

- Gunakan nama domain + `Schema`.
- Contoh: `transactionSchema`, `budgetSchema`.

### Type

- Gunakan PascalCase.
- Contoh: `Transaction`, `Budget`, `WorkspaceMember`.

## 28. MVP IA Cut

Untuk MVP, IA minimal:

```text
app/
├── (dashboard)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── transactions/page.tsx
│   ├── accounts/page.tsx
│   ├── categories/page.tsx
│   ├── budgets/page.tsx
│   └── reports/page.tsx
features/
├── app-shell/
├── dashboard/
├── transactions/
├── accounts/
├── categories/
├── budgets/
└── reports/
shared/
```

Auth, workspace, RBAC, approval, audit log, import/export, notifications, dan settings tetap disiapkan dalam IA enterprise, tetapi implementasinya dapat bertahap.

## 29. Enterprise IA Expansion

Setelah MVP stabil, tambahkan:

```text
features/
├── auth/
├── workspaces/
├── rbac/
├── approvals/
├── audit-logs/
├── imports-exports/
├── notifications/
├── search/
└── settings/
```

Route expansion:

```text
app/
├── (auth)/
├── (dashboard)/
│   ├── approvals/
│   ├── imports/
│   ├── exports/
│   ├── audit-logs/
│   ├── notifications/
│   └── settings/
```

## 30. IA Acceptance Criteria

Information architecture dianggap benar jika:

- `app/` hanya menjadi routing layer.
- Semua fitur utama berada di `features/`.
- Setiap route memetakan ke screen dari feature.
- Shared component tidak berisi domain logic finance.
- Navigation mengikuti role dan permission.
- Workspace aktif menjadi konteks semua data finance.
- List pages mendukung search, filter, sort, pagination, empty state, loading state, dan error state.
- Detail pages memiliki breadcrumb.
- Enterprise modules memiliki tempat yang jelas dalam struktur.
- Import dependency tidak membentuk circular dependency.

## 31. Kesimpulan

Finance Dashboard NextJS menggunakan **Feature-Based Architecture** dengan `app/` sebagai routing layer tipis dan `features/` sebagai pusat implementasi fitur. Pendekatan ini menjaga domain finance tetap modular, mudah dipelihara, dan siap dikembangkan menuju enterprise-ready.

Dengan IA ini, setiap halaman dashboard memiliki pemilik feature yang jelas, setiap flow pengguna memiliki route yang terstruktur, dan setiap fitur dapat berkembang tanpa mencampur business logic ke folder routing.
