# Development Phases

Dokumen ini menyusun fase development Finance Dashboard NextJS berdasarkan PRD, feature modules, dan task breakdown.

## Phase 0 - Documentation & Architecture Baseline

**Fokus:** memastikan fondasi produk, desain, dan arsitektur sudah jelas sebelum implementasi besar.

**Scope:**

- Product overview, vision, PRD, feature modules.
- Design system, UI guidelines, color, typography, spacing.
- Feature-Based Architecture.
- Routing, state management, dummy data, naming, coding standard.
- Layout, sidebar, header specification.

**Exit Criteria:**

- Dokumentasi utama tersedia.
- Struktur `app`, `features`, dan `shared` sudah disepakati.
- Development tasks sudah tersusun.

## Phase 1 - Product Foundation

**Fokus:** membuat aplikasi berubah dari starter page menjadi dashboard shell yang siap dipakai.

**Modules:**

- App Shell And Navigation.
- Design System And Theme.
- Data Formatting And Utilities.
- Dummy Data.

**Deliverables:**

- Sidebar desktop.
- Header dashboard.
- Mobile navigation.
- Light/dark mode.
- Formatter currency, date, percentage, status.
- Dummy data awal.
- Page container, page header, page toolbar.

**Exit Criteria:**

- Layout tidak pecah di desktop dan mobile.
- Navigation active state berjalan.
- Theme toggle berjalan.
- Dummy data bisa dipakai oleh UI.

## Phase 2 - MVP Core Finance

**Fokus:** membangun nilai utama dashboard finance.

**Modules:**

- Dashboard Overview.
- Transactions.
- Categories basic.
- Accounts basic.

**Deliverables:**

- Dashboard metric cards.
- Cash flow chart.
- Recent transactions.
- Transactions table.
- Transaction create/edit/detail.
- Basic category CRUD.
- Basic account CRUD.
- Transaction filter/search/pagination.

**Exit Criteria:**

- User dapat melihat ringkasan finance.
- User dapat melihat dan mengelola transaksi.
- Transaction form dapat memilih account dan category.
- Loading, empty, dan error state tersedia.

## Phase 3 - Finance Expansion

**Fokus:** melengkapi fitur finance agar dashboard terasa utuh.

**Modules:**

- Budgets.
- Reports And Analytics.
- Search, Filters baseline.

**Deliverables:**

- Budget list dan budget usage.
- Budget warning/exceeded state.
- Income report.
- Expense report.
- Cash flow report.
- Budget summary report.
- Shared filter/search pattern.

**Exit Criteria:**

- User dapat melihat budget usage.
- User dapat membaca report dasar.
- Report dan transactions memakai filter yang konsisten.
- UI responsive dan dark mode tetap rapi.

## Phase 4 - Real Application Layer

**Fokus:** memindahkan aplikasi dari mock-only menuju aplikasi nyata.

**Modules:**

- Authentication And User Profile.
- Workspace And Organization.
- Settings And Preferences.
- Import And Export baseline.
- API layer.

**Deliverables:**

- Login, register, forgot password.
- Protected dashboard routes.
- Workspace switcher final.
- Member/workspace settings.
- User profile settings.
- API/service abstraction.
- Import CSV baseline.
- Export CSV/PDF baseline.

**Exit Criteria:**

- User login dapat mengakses dashboard.
- Data scoped berdasarkan workspace.
- Settings dasar tersedia.
- Import/export berjalan dengan permission dasar.

## Phase 5 - Enterprise Governance

**Fokus:** menambahkan kontrol enterprise untuk keamanan dan workflow.

**Modules:**

- Role-Based Access Control.
- Approval Workflow.
- Audit Trail And Activity Log.
- Notifications And Alerts.
- Saved Views.

**Deliverables:**

- Permission-aware navigation dan actions.
- Role/member management.
- Approval queue.
- Approval detail, approve, reject.
- Audit log list/detail.
- Notification badge dan notification center.
- Saved views untuk transactions/reports.

**Exit Criteria:**

- User hanya melihat fitur sesuai permission.
- Mutation penting tercatat di audit log.
- Approval workflow berjalan.
- Notification muncul untuk workflow penting.

## Phase 6 - Operations, Security & Scale

**Fokus:** membuat aplikasi lebih stabil, aman, dan siap skala.

**Modules:**

- Observability And Error Handling.
- Security And Compliance Baseline.
- Performance Optimization.

**Deliverables:**

- Error boundary konsisten.
- API error response konsisten.
- Logging/monitoring plan.
- Security validation.
- Workspace isolation hardening.
- Pagination untuk data besar.
- Background job plan untuk import/export besar.
- Accessibility dan performance pass.

**Exit Criteria:**

- `pnpm lint` berhasil.
- `pnpm typecheck` berhasil.
- `pnpm build` berhasil.
- Core flow responsive dan accessible.
- Error, empty, loading, permission state konsisten.

## Phase Dependency Order

```txt
Phase 0 -> Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5 -> Phase 6
```

## MVP Cut

MVP selesai setelah Phase 1, Phase 2, dan bagian utama Phase 3 berjalan:

- App shell.
- Theme.
- Dummy data.
- Dashboard overview.
- Transactions CRUD.
- Categories basic.
- Accounts basic.
- Budget usage basic.
- Reports basic.

## Enterprise Cut

Enterprise-ready membutuhkan Phase 4, Phase 5, dan Phase 6:

- Auth.
- Workspace.
- RBAC.
- Approval.
- Audit log.
- Import/export.
- Notifications.
- Observability.
- Security baseline.
