# Finance Dashboard NextJS - Architecture

## 1. Ringkasan

Finance Dashboard NextJS menggunakan **Feature-Based Architecture** dengan pendekatan **Thin App Router**.

Artinya:

- Folder `app/` hanya menjadi routing layer.
- Semua fitur utama berada di folder `features/`.
- Komponen UI primitive dan utility reusable berada di `shared/`.
- Business logic tidak ditulis langsung di route page.
- Setiap fitur memiliki boundary yang jelas: components, screens, hooks, services, schemas, types, utils, constants, dan data.

Arsitektur ini dipilih agar aplikasi finance dashboard mudah dikembangkan secara modular, scalable, testable, dan siap menuju kebutuhan enterprise seperti workspace, RBAC, approval workflow, audit trail, import/export, observability, dan security hardening.

## 2. Architecture Goals

Tujuan arsitektur:

- Memisahkan routing dari business/domain logic.
- Membuat fitur mudah dikembangkan secara independen.
- Menjaga kode tetap mudah dipahami saat modul bertambah.
- Mendukung enterprise feature seperti multi-workspace, permission, audit, dan approval.
- Memudahkan testing per fitur.
- Mengurangi coupling antar module.
- Menjaga shared component tetap domain-agnostic.

## 3. Architecture Style

Architecture style:

```text
Feature-Based Architecture
+ Thin Next.js App Router
+ Shared UI/Foundation Layer
+ Domain-Oriented Feature Modules
```

High-level flow:

```text
app route
-> feature screen
-> feature components
-> feature hooks/services
-> API/server/data layer
-> shared primitives/utilities as needed
```

## 4. High-Level Folder Structure

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
| Routing Layer | `app/` | Route groups, pages, layouts, loading/error boundaries, metadata. |
| Feature Layer | `features/` | Domain UI, screens, hooks, services, schemas, types, constants, feature utilities. |
| Shared Layer | `shared/` | UI primitives, generic hooks, global providers, generic utilities, cross-feature types. |
| Documentation Layer | `docs/` | Product, design, architecture, quality, development documentation. |

## 6. App Router Rules

Folder `app/` harus tetap tipis.

Yang boleh ada di `app/`:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- Route groups seperti `(auth)` dan `(dashboard)`
- Route handlers jika API menggunakan App Router
- Metadata route-level
- Import screen dari `features`

Yang tidak boleh ada di `app/`:

- Business logic finance.
- Table configuration domain.
- Form schema domain.
- API client feature.
- Complex component spesifik fitur.
- Data transformation domain.
- Permission logic detail.

Contoh page yang benar:

```tsx
import { TransactionsPage } from "@/features/transactions"

export default function Page() {
    return <TransactionsPage />
}
```

## 7. Feature Module Standard

Setiap feature mengikuti struktur:

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

| Folder | Responsibility |
| --- | --- |
| `components/` | Komponen UI domain-specific. |
| `screens/` | Page-level composition yang diimpor oleh `app/`. |
| `hooks/` | Hooks spesifik fitur. |
| `services/` | API client, server action wrapper, atau query/mutation service. |
| `schemas/` | Zod schema dan validation schema. |
| `types/` | TypeScript type/interface domain. |
| `utils/` | Helper domain, mapper, formatter spesifik fitur. |
| `constants/` | Options, status config, menu action, tab definitions. |
| `data/` | Dummy data, fixture, seed-like data untuk development. |
| `index.ts` | Public API feature. |

## 8. Public API Rule

Setiap feature harus memiliki `index.ts` untuk export publik.

Contoh:

```ts
export { TransactionsPage } from "./screens/transactions-page"
export { NewTransactionPage } from "./screens/new-transaction-page"
export type { Transaction } from "./types/transaction.types"
```

Rules:

- `app/` sebaiknya import dari public API feature.
- Cross-feature dependency harus lewat public API.
- Internal component tidak perlu diekspor.
- Hindari import langsung ke file internal feature lain jika bukan public contract.

## 9. Dependency Direction

Dependency harus mengalir satu arah.

```text
app
-> features
-> shared
```

Allowed:

- `app` import `features`.
- `app` import `shared`.
- `features` import `shared`.
- `features` import public API feature lain jika benar-benar perlu.

Not allowed:

- `shared` import `features`.
- `features` import route dari `app`.
- Circular dependency antar feature.
- Domain-specific component masuk ke `shared/components/ui`.

## 10. Shared Layer Rules

`shared/` hanya untuk hal yang reusable dan domain-agnostic.

Contoh yang benar:

- `shared/components/ui/button`
- `shared/components/ui/table`
- `shared/components/ui/dialog`
- `shared/lib/utils`
- `shared/providers/theme-provider`
- `shared/hooks/use-mobile`

Contoh yang tidak boleh:

- `shared/components/transaction-form`
- `shared/components/budget-usage-card`
- `shared/utils/calculate-budget-usage`

Jika logic hanya relevan untuk budget, simpan di `features/budgets`.

## 11. Core Feature Modules

| Feature | Responsibility |
| --- | --- |
| `dashboard` | Metric cards, summary, chart overview, recent transactions. |
| `transactions` | CRUD transaksi, filters, detail, bulk actions, status. |
| `accounts` | Account management, balance display, transfer. |
| `categories` | Category management, category usage. |
| `budgets` | Budget tracking, usage, threshold. |
| `reports` | Finance reports, charts, saved views. |
| `auth` | Login, register, session, user profile. |
| `workspaces` | Workspace context, switcher, members. |
| `approvals` | Approval queue and approval actions. |
| `audit-logs` | Activity and audit history. |
| `imports-exports` | CSV import, report/export jobs. |
| `notifications` | Notification center and alerts. |
| `settings` | User/workspace preferences and configuration. |
| `search` | Global search and saved views. |

## 12. Screen Composition Pattern

Screen bertugas menyusun UI halaman, bukan menyimpan semua logic.

```text
features/transactions/screens/transactions-page.tsx
```

Contoh composition:

```tsx
export function TransactionsPage() {
    return (
        <TransactionsPageLayout>
            <TransactionsHeader />
            <TransactionFilters />
            <TransactionsTable />
        </TransactionsPageLayout>
    )
}
```

Rules:

- Screen boleh mengatur layout halaman.
- Business logic berat pindah ke hooks/services/utils.
- Component kecil tetap di `components/`.

## 13. Client And Server Boundaries

Next.js App Router mendukung Server Components dan Client Components.

General rules:

- Komponen yang memakai event handler, state, effect, browser API, atau interactive UI harus menjadi Client Component.
- Route page bisa tetap Server Component jika hanya render screen server-safe.
- Feature component yang memakai table interactivity, filters, dialog, tabs, form, chart interaction, atau dropdown biasanya perlu `"use client"`.

Examples requiring client:

- Transaction form.
- Data table with selection/filter local state.
- Dialog/sheet interactions.
- Theme toggle.
- Sidebar mobile state.
- Chart tooltip interactivity.

Examples that can stay server:

- Static page shell.
- Server-rendered report summary.
- Non-interactive detail display.

## 14. Data Flow

General data flow:

```text
User interaction
-> feature component
-> feature hook
-> feature service
-> API/server action
-> data source
-> response
-> UI state update
```

Example:

```text
Add Transaction
-> TransactionForm
-> useCreateTransaction
-> transactionService.create
-> POST /api/transactions
-> validation + authorization + persistence
-> dashboard/report invalidation
```

## 15. State Management Architecture

State dibagi menjadi beberapa kategori:

| State Type | Owner | Examples |
| --- | --- | --- |
| URL state | Router/search params | page, filters, sort, date range. |
| Server state | TanStack Query or server fetch | transactions, accounts, reports. |
| Form state | TanStack Form / local form | transaction form, budget form. |
| Client UI state | Component/local store | dialog open, selected rows, sidebar. |
| Global client state | Zustand if needed | active workspace, UI preferences. |
| Theme state | `next-themes` | light/dark/system. |

Rules:

- Jangan menyimpan server data besar di global client state.
- Filter penting sebaiknya berada di URL.
- Form state tidak perlu masuk global store.
- Workspace aktif boleh global karena memengaruhi semua fitur.

## 16. API Architecture

API dapat menggunakan Next.js route handlers atau backend terpisah di masa depan.

Domain endpoint yang disarankan:

```text
/api/auth/*
/api/workspaces
/api/members
/api/accounts
/api/categories
/api/transactions
/api/budgets
/api/reports
/api/imports
/api/exports
/api/notifications
/api/audit-logs
/api/settings
```

Rules:

- Semua request divalidasi schema.
- Semua mutation memeriksa authorization.
- Semua data domain harus scoped berdasarkan workspace.
- List endpoint harus mendukung pagination.
- Filter/sort penting harus server-side ready.
- Error response harus konsisten.

## 17. Validation Architecture

Gunakan schema untuk validasi input.

Recommended:

```text
features/transactions/schemas/transaction-schema.ts
features/budgets/schemas/budget-schema.ts
features/accounts/schemas/account-schema.ts
```

Rules:

- Validasi di client untuk UX.
- Validasi di server untuk security.
- Jangan percaya input client.
- Schema domain disimpan di feature terkait.

## 18. Authorization Architecture

Enterprise dashboard membutuhkan RBAC.

Default roles:

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

Permission check harus terjadi di:

- Navigation visibility.
- UI action visibility.
- Route protection.
- API/server mutation.

Rules:

- UI permission hanya untuk UX.
- Server authorization adalah sumber kebenaran.
- Data harus scoped by workspace.
- Audit-sensitive action harus dicatat.

## 19. Workspace Architecture

Workspace menjadi boundary data utama.

Semua entity finance harus memiliki `workspaceId`:

- Account.
- Category.
- Transaction.
- Budget.
- ReportView.
- Notification.
- AuditLog.
- ImportJob.
- ExportJob.

Rules:

- User hanya melihat workspace tempat ia menjadi member.
- Active workspace memengaruhi dashboard, transactions, accounts, budgets, reports.
- Workspace switch harus reload/invalidate data domain.
- Jangan pernah query data finance tanpa workspace scope.

## 20. Audit Architecture

Audit log digunakan untuk enterprise traceability.

Action yang wajib dicatat:

- Create/update/archive/delete transaction.
- Approve/reject transaction.
- Import/export data.
- Change workspace settings.
- Invite/remove/change role member.
- Change budget.
- Change account opening balance.

Audit record minimal:

- actor.
- action.
- entity.
- entityId.
- workspaceId.
- timestamp.
- before.
- after.

## 21. Error Handling Architecture

UI harus menangani error di beberapa level:

| Level | Handling |
| --- | --- |
| Route-level | `error.tsx` untuk crash besar. |
| Feature-level | Error state di screen/component. |
| Widget-level | Error state khusus widget chart/card. |
| Form-level | Field validation error. |
| API-level | Standard error response. |

Rules:

- Jangan tampilkan stack trace ke user.
- Error message harus aman dan bisa dipahami.
- Retry action disediakan jika memungkinkan.
- Error teknis dicatat di observability layer.

## 22. Loading And Empty Architecture

Setiap page penting harus memiliki:

- Loading state.
- Empty state.
- Error state.
- Permission denied state.

Recommended components:

- `Skeleton` untuk loading.
- `Empty` untuk empty state.
- `Alert` untuk error.
- `Spinner` untuk pending button.

## 23. Design System Integration

Arsitektur UI mengikuti design docs:

- `00_DESIGN_SYSTEM.md`
- `01_UI_GUIDELINES.md`
- `02_COLOR_SYSTEM.md`
- `03_TYPOGRAPHY.md`
- `04_SPACING_SYSTEM.md`
- `05_ICONOGRAPHY.md`
- `06_COMPONENT_LIBRARY.md`
- `07_DATA_VISUALIZATION.md`

Rules:

- Primitive UI memakai Shadcn UI di `shared/components/ui`.
- Domain UI memakai komposisi di `features/*/components`.
- Styling memakai semantic token.
- Chart memakai Shadcn Chart/Recharts wrapper.

## 24. Testing Strategy

Testing harus mengikuti risiko fitur.

Recommended coverage:

- Unit test untuk utils dan mappers.
- Schema validation test untuk form/input penting.
- Component test untuk complex domain component.
- Integration test untuk flow transaksi.
- E2E test untuk critical user flow.

Critical flows:

- Login.
- Create transaction.
- Filter transaction.
- Create budget.
- Approval flow.
- Export report.
- Workspace switch.

## 25. Performance Strategy

Rules:

- Pagination untuk table besar.
- Server-side filtering/sorting untuk transactions dan audit logs.
- Jangan render semua data transaksi sekaligus.
- Chart hanya menerima data yang diperlukan.
- Lazy load heavy feature jika perlu.
- Memoize expensive mapper jika data besar.
- Keep route page thin.

## 26. Security Strategy

Security baseline:

- Protected routes untuk dashboard.
- Server-side authorization.
- Workspace data isolation.
- Input validation.
- Safe error response.
- Secure session.
- File upload restrictions.
- Export permission.
- Audit logging.

Rules:

- Jangan hanya mengandalkan UI hiding untuk security.
- Jangan query data tanpa workspaceId.
- Jangan log data finansial sensitif secara berlebihan.

## 27. Architecture Anti-Patterns

Jangan lakukan:

- Menaruh business logic di `app/page.tsx`.
- Menaruh semua komponen di `shared`.
- Membuat feature saling import file internal secara bebas.
- Menyimpan server data besar di Zustand.
- Menggunakan raw fetch random di komponen tanpa service/hook pattern.
- Membuat schema validasi di file komponen.
- Membuat API tanpa authorization.
- Membuat table tanpa pagination plan.
- Membuat folder berdasarkan tipe saja seperti `components/`, `hooks/`, `services/` global untuk domain feature.

## 28. Architecture Review Checklist

Sebelum fitur dianggap sesuai arsitektur, cek:

- Apakah route di `app/` hanya mengimpor screen?
- Apakah screen berada di `features/*/screens/`?
- Apakah komponen domain berada di `features/*/components/`?
- Apakah schema berada di `features/*/schemas/`?
- Apakah service berada di `features/*/services/`?
- Apakah shared layer tetap domain-agnostic?
- Apakah import mengikuti dependency direction?
- Apakah data scoped by workspace?
- Apakah permission dicek di UI dan server?
- Apakah loading/empty/error state tersedia?
- Apakah feature punya public API `index.ts`?

## 29. Kesimpulan

Feature-Based Architecture untuk Finance Dashboard NextJS membuat aplikasi lebih modular, scalable, dan siap enterprise. `app/` tetap tipis sebagai routing layer, `features/` menjadi pusat domain logic dan UI fitur, sedangkan `shared/` menyimpan primitive dan utility reusable.

Dengan arsitektur ini, modul seperti dashboard, transactions, accounts, budgets, reports, approvals, audit logs, import/export, notifications, workspace, dan settings dapat dikembangkan secara bertahap tanpa membuat codebase cepat berantakan.
