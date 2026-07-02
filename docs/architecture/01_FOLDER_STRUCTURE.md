# Finance Dashboard NextJS - Folder Structure

## 1. Ringkasan

Project Finance Dashboard NextJS menggunakan **Feature-Based Architecture**. Dengan pendekatan ini, struktur folder disusun berdasarkan fitur/domain, bukan berdasarkan tipe file global.

Prinsip utama:

- Folder `app/` hanya untuk routing.
- Folder `features/` menyimpan semua implementasi fitur.
- Folder `shared/` menyimpan reusable foundation yang tidak terikat domain finance tertentu.
- Setiap feature memiliki subfolder standar seperti `components`, `screens`, `hooks`, `services`, `schemas`, `types`, `utils`, `constants`, dan `data`.
- Business logic tidak boleh tersebar di route file.

## 2. High-Level Folder Structure

```text
.
├── app/
├── features/
├── shared/
├── docs/
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

| Folder/File | Fungsi |
| --- | --- |
| `app/` | Routing layer Next.js App Router. |
| `features/` | Semua fitur/domain aplikasi. |
| `shared/` | Komponen UI primitive, provider, hooks, dan utility reusable. |
| `docs/` | Dokumentasi produk, desain, arsitektur, quality, layout, development. |
| `components.json` | Konfigurasi Shadcn UI. |
| `next.config.ts` | Konfigurasi Next.js. |
| `package.json` | Dependency dan script project. |
| `tsconfig.json` | Konfigurasi TypeScript dan path alias. |

## 3. App Folder

Folder `app/` adalah routing layer. Folder ini tidak menyimpan business logic fitur.

Struktur yang disarankan:

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── favicon.ico
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

### 3.1 `app/layout.tsx`

Fungsi:

- Root layout aplikasi.
- Menyediakan `<html>` dan `<body>`.
- Mengatur font global.
- Memasang provider global jika diperlukan.
- Import `globals.css`.

Tidak boleh:

- Menaruh layout spesifik dashboard yang kompleks.
- Menaruh business logic finance.

### 3.2 `app/page.tsx`

Fungsi:

- Entry route `/`.
- Bisa redirect ke `/dashboard` atau menampilkan landing minimal jika diperlukan.

Tidak boleh:

- Menjadi dashboard penuh jika route dashboard sudah ada.
- Menyimpan logic transaksi/report.

### 3.3 `app/globals.css`

Fungsi:

- Import Tailwind CSS.
- Menyimpan CSS variables design token.
- Menyimpan light/dark theme token.
- Menyimpan `@theme inline` Tailwind v4 mapping.

Tidak boleh:

- Menyimpan style spesifik fitur yang besar.
- Menjadi tempat custom CSS acak untuk setiap page.

### 3.4 `app/(auth)/`

Fungsi:

- Route group untuk halaman authentication.
- Tidak ikut dashboard shell.

Isi:

```text
app/(auth)/
├── layout.tsx
├── login/page.tsx
├── register/page.tsx
└── forgot-password/page.tsx
```

Page di folder ini hanya mengimpor screen dari `features/auth`.

Contoh:

```tsx
import { LoginPage } from "@/features/auth"

export default function Page() {
    return <LoginPage />
}
```

### 3.5 `app/(dashboard)/`

Fungsi:

- Route group untuk semua halaman dashboard yang membutuhkan app shell.
- Menyediakan layout dashboard: sidebar, header, workspace context.

Isi:

```text
app/(dashboard)/
├── layout.tsx
├── dashboard/page.tsx
├── transactions/page.tsx
├── accounts/page.tsx
├── categories/page.tsx
├── budgets/page.tsx
├── reports/page.tsx
├── approvals/page.tsx
├── imports/page.tsx
├── exports/page.tsx
├── audit-logs/page.tsx
├── notifications/page.tsx
└── settings/page.tsx
```

Aturan:

- `page.tsx` hanya import feature screen.
- Layout shell dapat import dari `features/app-shell`.
- Protected route logic berada di layout/middleware/server boundary, bukan di setiap component random.

### 3.6 `app/api/`

Fungsi:

- Route handlers jika API dibuat di dalam Next.js.
- Setiap domain API dapat dikelompokkan berdasarkan entity.

Contoh:

```text
app/api/
├── transactions/route.ts
├── transactions/[transactionId]/route.ts
├── accounts/route.ts
├── budgets/route.ts
├── reports/route.ts
└── audit-logs/route.ts
```

Aturan:

- API route harus validasi input.
- API route harus cek authentication dan authorization.
- API route harus scoped by workspace.
- Logic domain kompleks dapat dipindahkan ke service/server module yang jelas.

## 4. Features Folder

Folder `features/` adalah pusat implementasi fitur.

Struktur fitur utama:

```text
features/
├── accounts/
├── app-shell/
├── approvals/
├── audit-logs/
├── auth/
├── budgets/
├── categories/
├── dashboard/
├── imports-exports/
├── notifications/
├── reports/
├── search/
├── settings/
├── transactions/
└── workspaces/
```

Catatan:

- `app-shell` disarankan untuk dashboard shell seperti sidebar dan header.
- Jika tidak memakai `app-shell`, komponen shell dapat berada di feature lain yang jelas, tetapi jangan disimpan langsung di `app/` secara besar-besaran.

## 5. Standard Feature Structure

Setiap feature sebaiknya mengikuti struktur:

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

## 6. Feature Subfolder Details

### 6.1 `components/`

Fungsi:

- Menyimpan komponen UI spesifik fitur.
- Komponen di sini biasanya mengomposisi Shadcn UI dari `shared/components/ui`.

Contoh:

```text
features/transactions/components/
├── transactions-table.tsx
├── transaction-form.tsx
├── transaction-detail.tsx
├── transaction-filters.tsx
├── transaction-status-badge.tsx
└── transaction-bulk-actions.tsx
```

Aturan:

- Jangan simpan primitive UI di sini.
- Jangan simpan komponen yang dipakai lintas domain tanpa ownership jelas.
- Komponen harus fokus pada presentasi dan interaksi fitur.

### 6.2 `screens/`

Fungsi:

- Menyimpan page-level component.
- Diimpor oleh `app/**/page.tsx`.
- Mengatur komposisi halaman.

Contoh:

```text
features/transactions/screens/
├── transactions-page.tsx
├── new-transaction-page.tsx
├── transaction-detail-page.tsx
└── edit-transaction-page.tsx
```

Aturan:

- Screen boleh mengatur layout antar section.
- Jangan isi screen dengan semua logic detail.
- Logic data fetching dapat dipisah ke hooks/services.

### 6.3 `hooks/`

Fungsi:

- Menyimpan custom hooks spesifik fitur.
- Mengatur query, mutation, local UI state, atau derived state fitur.

Contoh:

```text
features/transactions/hooks/
├── use-transactions.ts
├── use-transaction.ts
├── use-create-transaction.ts
├── use-transaction-filters.ts
└── use-transaction-selection.ts
```

Aturan:

- Hooks domain tetap berada di feature.
- Hooks generic lintas fitur masuk `shared/hooks`.
- Jangan membuat hook global jika hanya dipakai satu fitur.

### 6.4 `services/`

Fungsi:

- Menyimpan API client, query function, mutation function, atau service function domain.
- Menjadi boundary komunikasi dengan API/server.

Contoh:

```text
features/transactions/services/
├── transaction-service.ts
└── transaction-query-keys.ts
```

Aturan:

- Jangan melakukan fetch langsung dari banyak component.
- Service harus punya error handling/response shape yang konsisten.
- Service tidak boleh mengandung UI component.

### 6.5 `schemas/`

Fungsi:

- Menyimpan validation schema, biasanya dengan Zod.
- Digunakan oleh form dan API validation.

Contoh:

```text
features/transactions/schemas/
├── transaction-schema.ts
└── transaction-filter-schema.ts
```

Aturan:

- Schema domain berada di feature terkait.
- Jangan menaruh schema transaksi di `shared`.
- Schema harus reusable antara client/server jika memungkinkan.

### 6.6 `types/`

Fungsi:

- Menyimpan TypeScript type/interface/domain model untuk fitur.

Contoh:

```text
features/transactions/types/
└── transaction.types.ts
```

Isi contoh:

```ts
export type TransactionStatus = "draft" | "pending" | "approved" | "rejected" | "void"
export type TransactionType = "income" | "expense" | "transfer" | "adjustment"
```

Aturan:

- Type spesifik domain berada di feature.
- Type lintas fitur yang benar-benar umum boleh masuk `shared/types`.
- Hindari type duplicate antar feature.

### 6.7 `utils/`

Fungsi:

- Helper domain spesifik fitur.
- Mapper data API ke UI.
- Calculation kecil terkait fitur.

Contoh:

```text
features/budgets/utils/
├── calculate-budget-usage.ts
├── get-budget-status.ts
└── budget-mappers.ts
```

Aturan:

- Helper yang hanya relevan ke budget tetap di `features/budgets`.
- Helper generic seperti `formatCurrency` boleh masuk `shared/utils`.

### 6.8 `constants/`

Fungsi:

- Menyimpan constant domain seperti options, status config, tabs, filter config, menu actions.

Contoh:

```text
features/transactions/constants/
├── transaction-status-options.ts
├── transaction-type-options.ts
└── transaction-table-columns.ts
```

Aturan:

- Constant harus mudah dicari.
- Hindari magic string tersebar di banyak component.

### 6.9 `data/`

Fungsi:

- Menyimpan dummy data, fixture, mock data, atau sample data untuk development awal.

Contoh:

```text
features/dashboard/data/
├── dashboard-mock-data.ts
└── chart-sample-data.ts
```

Aturan:

- Data dummy tidak boleh tercampur dengan service production.
- Beri nama jelas jika file adalah mock/sample.

### 6.10 `index.ts`

Fungsi:

- Public API dari feature.
- Mengontrol apa yang boleh diimpor oleh route atau feature lain.

Contoh:

```ts
export { TransactionsPage } from "./screens/transactions-page"
export { NewTransactionPage } from "./screens/new-transaction-page"
export type { Transaction } from "./types/transaction.types"
```

Aturan:

- Jangan export semua file internal.
- Export hanya screen, type, atau utility yang memang menjadi contract.

## 7. Feature Folder Examples

### 7.1 Dashboard Feature

```text
features/dashboard/
├── components/
│   ├── dashboard-header.tsx
│   ├── metric-card.tsx
│   ├── metric-grid.tsx
│   ├── cash-flow-chart-card.tsx
│   ├── expense-category-chart-card.tsx
│   ├── budget-usage-summary.tsx
│   └── recent-transactions.tsx
├── screens/
│   └── dashboard-page.tsx
├── hooks/
│   └── use-dashboard-summary.ts
├── services/
│   └── dashboard-service.ts
├── types/
│   └── dashboard.types.ts
├── utils/
│   └── dashboard-mappers.ts
├── data/
│   └── dashboard-mock-data.ts
└── index.ts
```

Fungsi:

- Menampilkan overview finance.
- Menyusun metric, chart, budget usage, dan recent transactions.

### 7.2 Transactions Feature

```text
features/transactions/
├── components/
│   ├── transactions-table.tsx
│   ├── transaction-form.tsx
│   ├── transaction-detail.tsx
│   ├── transaction-filters.tsx
│   ├── transaction-status-badge.tsx
│   └── transaction-bulk-actions.tsx
├── screens/
│   ├── transactions-page.tsx
│   ├── new-transaction-page.tsx
│   ├── transaction-detail-page.tsx
│   └── edit-transaction-page.tsx
├── hooks/
│   ├── use-transactions.ts
│   ├── use-transaction.ts
│   └── use-create-transaction.ts
├── services/
│   ├── transaction-service.ts
│   └── transaction-query-keys.ts
├── schemas/
│   ├── transaction-schema.ts
│   └── transaction-filter-schema.ts
├── types/
│   └── transaction.types.ts
├── utils/
│   ├── transaction-mappers.ts
│   └── transaction-formatters.ts
├── constants/
│   ├── transaction-status-options.ts
│   └── transaction-type-options.ts
├── data/
│   └── transaction-mock-data.ts
└── index.ts
```

Fungsi:

- Mengelola transaksi sebagai pusat data finance.
- Menangani table, form, detail, filter, status, dan bulk actions.

### 7.3 Reports Feature

```text
features/reports/
├── components/
│   ├── reports-overview.tsx
│   ├── report-filter-bar.tsx
│   ├── report-chart.tsx
│   ├── report-table.tsx
│   ├── saved-view-menu.tsx
│   └── export-report-button.tsx
├── screens/
│   ├── reports-page.tsx
│   ├── income-report-page.tsx
│   ├── expense-report-page.tsx
│   └── cash-flow-report-page.tsx
├── hooks/
├── services/
├── schemas/
├── types/
├── utils/
├── constants/
└── index.ts
```

Fungsi:

- Menyajikan laporan dan grafik finance.
- Mengatur filter report, saved view, chart, table, dan export.

### 7.4 App Shell Feature

```text
features/app-shell/
├── components/
│   ├── app-sidebar.tsx
│   ├── app-header.tsx
│   ├── workspace-switcher.tsx
│   ├── user-menu.tsx
│   ├── notification-button.tsx
│   └── mobile-nav.tsx
├── constants/
│   └── navigation-items.ts
├── hooks/
│   └── use-navigation-items.ts
└── index.ts
```

Fungsi:

- Menyediakan layout dashboard shell.
- Mengatur sidebar, header, navigation, workspace switcher, user menu.

## 8. Shared Folder

`shared/` menyimpan reusable foundation yang tidak bergantung pada satu fitur.

Struktur:

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

### 8.1 `shared/components/ui/`

Fungsi:

- Menyimpan primitive Shadcn UI.
- Contoh: button, card, table, dialog, badge, input, sidebar.

Aturan:

- Tidak boleh berisi domain component.
- Tidak boleh import dari `features`.
- Hanya reusable UI primitive.

### 8.2 `shared/hooks/`

Fungsi:

- Hooks generic lintas fitur.

Contoh:

```text
shared/hooks/use-mobile.ts
```

Aturan:

- Jangan simpan `useTransactions` di sini.
- Simpan hanya hooks yang tidak terikat domain tertentu.

### 8.3 `shared/lib/`

Fungsi:

- Utility low-level atau helper library.

Contoh:

```text
shared/lib/utils.ts
```

Isi umum:

- `cn()`
- class merge helper
- generic low-level helper

### 8.4 `shared/providers/`

Fungsi:

- Global providers.

Contoh:

```text
shared/providers/theme-provider.tsx
```

Potential providers:

- Theme provider.
- Query provider.
- Auth provider if implemented as global provider.
- Workspace provider if truly global.

### 8.5 `shared/types/`

Fungsi:

- Type generic lintas fitur.

Contoh:

```text
shared/types/api.types.ts
shared/types/pagination.types.ts
```

Aturan:

- Jangan simpan type domain yang hanya milik satu fitur.

### 8.6 `shared/utils/`

Fungsi:

- Utility generic lintas fitur.

Contoh:

```text
shared/utils/format-currency.ts
shared/utils/format-date.ts
shared/utils/format-number.ts
```

Aturan:

- Utility harus benar-benar reusable.
- Calculation domain tetap di feature.

## 9. Docs Folder

`docs/` menyimpan dokumentasi project.

Struktur:

```text
docs/
├── product/
├── design/
├── architecture/
├── layout/
├── quality/
├── development/
└── prompts/
```

| Folder | Fungsi |
| --- | --- |
| `product/` | Overview, product vision, PRD, feature modules, user flow, information architecture. |
| `design/` | Design system, UI guidelines, color, typography, spacing, iconography, component library, visualization. |
| `architecture/` | Architecture, folder structure, routing, state, API, data model, coding standards. |
| `layout/` | Sidebar, header, page template, widget specification. |
| `quality/` | Accessibility, responsive rules, dark mode, performance. |
| `development/` | Tasks, phases, acceptance criteria, Codex instructions. |
| `prompts/` | Prompt templates untuk generation, review, refactor, bug fix. |

## 10. Root Config Files

| File | Fungsi |
| --- | --- |
| `package.json` | Scripts dan dependency project. |
| `pnpm-lock.yaml` | Lock dependency pnpm. |
| `pnpm-workspace.yaml` | Konfigurasi workspace pnpm. |
| `tsconfig.json` | TypeScript config dan path alias. |
| `next.config.ts` | Next.js config. |
| `eslint.config.mjs` | ESLint config. |
| `postcss.config.mjs` | PostCSS/Tailwind config. |
| `components.json` | Konfigurasi Shadcn UI. |
| `commitlint.config.js` | Commit message linting. |
| `AGENTS.md` | Instruksi agent untuk project. |

## 11. Naming Convention

### Folder

Gunakan kebab-case.

```text
imports-exports
audit-logs
app-shell
```

### File

Gunakan kebab-case.

```text
transaction-form.tsx
budget-usage-bar.tsx
dashboard-page.tsx
```

### Component

Gunakan PascalCase.

```tsx
TransactionForm
BudgetUsageBar
DashboardPage
```

### Hook

Gunakan camelCase dengan prefix `use`.

```ts
useTransactions
useBudgetUsage
useWorkspace
```

### Type

Gunakan PascalCase.

```ts
Transaction
Budget
WorkspaceMember
```

### Schema

Gunakan camelCase dengan suffix `Schema`.

```ts
transactionSchema
budgetSchema
workspaceSchema
```

## 12. Import Rules

Allowed:

```tsx
import { Button } from "@/shared/components/ui/button"
import { TransactionsPage } from "@/features/transactions"
import { formatCurrency } from "@/shared/utils/format-currency"
```

Avoid:

```tsx
import { TransactionForm } from "@/features/transactions/components/transaction-form"
```

Kecuali file tersebut memang berada di feature yang sama.

Not allowed:

```tsx
// shared tidak boleh import feature
import { Transaction } from "@/features/transactions"
```

Rules:

- Cross-feature import gunakan public API.
- Internal feature import boleh langsung dalam feature yang sama.
- Shared tidak boleh bergantung pada features.
- App tidak boleh import file internal feature jika public API tersedia.

## 13. Where To Put Code

| Kebutuhan | Lokasi |
| --- | --- |
| Route page | `app/**/page.tsx` |
| Page screen | `features/*/screens/` |
| Domain component | `features/*/components/` |
| Shadcn primitive | `shared/components/ui/` |
| Feature hook | `features/*/hooks/` |
| Generic hook | `shared/hooks/` |
| API service feature | `features/*/services/` |
| Validation schema | `features/*/schemas/` |
| Feature type | `features/*/types/` |
| Generic type | `shared/types/` |
| Feature mapper/calculation | `features/*/utils/` |
| Generic formatter | `shared/utils/` |
| Mock data feature | `features/*/data/` |
| Navigation items | `features/app-shell/constants/` |

## 14. Anti-Patterns

Jangan lakukan:

- Menaruh semua komponen di folder global `components/`.
- Menaruh domain component di `shared/components/ui`.
- Menulis logic transaksi di `app/transactions/page.tsx`.
- Membuat folder global `hooks/`, `services/`, `types/` untuk semua domain tanpa ownership.
- Mengimpor file internal feature lain secara bebas.
- Membuat circular dependency antar feature.
- Menaruh mock data di service production.
- Menaruh schema validasi di file component.
- Menaruh API fetch langsung di banyak component.
- Menaruh business calculation finance di shared utility generic.

## 15. Folder Structure Review Checklist

Sebelum fitur dianggap sesuai struktur:

- Apakah route hanya berada di `app/`?
- Apakah screen berada di `features/*/screens/`?
- Apakah component domain berada di `features/*/components/`?
- Apakah form schema berada di `features/*/schemas/`?
- Apakah type domain berada di `features/*/types/`?
- Apakah service/fetch function berada di `features/*/services/`?
- Apakah helper domain berada di `features/*/utils/`?
- Apakah shared hanya berisi hal yang reusable dan domain-agnostic?
- Apakah feature punya `index.ts`?
- Apakah import antar feature lewat public API?

## 16. Kesimpulan

Folder structure Finance Dashboard NextJS harus menjaga batas yang jelas antara routing, fitur, dan shared foundation. `app/` hanya untuk routing, `features/` untuk semua domain aplikasi, dan `shared/` untuk primitive serta utility reusable.

Dengan struktur ini, pengembangan dashboard finance dapat berjalan modular, scalable, dan tetap rapi saat fitur enterprise seperti workspace, RBAC, approval, audit log, import/export, reports, dan notifications semakin kompleks.
