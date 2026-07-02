# Finance Dashboard NextJS - Feature Modules

## 1. Ringkasan

Dokumen ini mendefinisikan modul-modul fitur Finance Dashboard NextJS berdasarkan PRD. Setiap modul dirancang agar dapat dikembangkan secara bertahap dari MVP hingga enterprise-ready.

Tujuan dokumen ini:

- Memecah PRD menjadi modul fitur yang jelas.
- Menentukan tanggung jawab tiap modul.
- Menjelaskan fitur inti, fitur enterprise, data terkait, permission, dan acceptance criteria.
- Menjadi acuan untuk routing, arsitektur folder, data model, API structure, development phases, dan task breakdown.

## 2. Prinsip Modularisasi

Modul fitur harus mengikuti prinsip berikut:

- Setiap modul memiliki domain responsibility yang jelas.
- Modul finance utama harus scoped berdasarkan workspace.
- Semua modul yang melakukan perubahan data harus mendukung validation dan audit trail.
- Fitur enterprise seperti RBAC, approval, audit log, import/export, dan observability tidak boleh dianggap tambahan dekoratif, tetapi bagian dari rancangan sistem.
- UI setiap modul harus mendukung loading state, empty state, error state, success feedback, dan responsive behavior.
- Modul harus dapat dikembangkan bertahap tanpa memblokir MVP.

## 3. Feature Module Map

| Layer | Module | Priority | Enterprise Critical |
| --- | --- | --- | --- |
| Foundation | App Shell And Navigation | P0 | Yes |
| Foundation | Design System And Theme | P0 | Yes |
| Foundation | Data Formatting And Utilities | P0 | Yes |
| Core Finance | Dashboard Overview | P0 | Yes |
| Core Finance | Transactions | P0 | Yes |
| Core Finance | Categories | P1 | Yes |
| Core Finance | Accounts | P1 | Yes |
| Core Finance | Budgets | P1 | Yes |
| Core Finance | Reports And Analytics | P1 | Yes |
| Data Operations | Import And Export | P2 | Yes |
| Collaboration | Authentication And User Profile | P2 | Yes |
| Collaboration | Workspace And Organization | P2 | Yes |
| Governance | Role-Based Access Control | P2 | Yes |
| Governance | Approval Workflow | P3 | Yes |
| Governance | Audit Trail And Activity Log | P3 | Yes |
| Productivity | Search, Filters, And Saved Views | P2 | Yes |
| Productivity | Notifications And Alerts | P3 | Yes |
| Configuration | Settings And Preferences | P2 | Yes |
| Operations | Observability And Error Handling | P3 | Yes |
| Operations | Security And Compliance Baseline | P3 | Yes |

## 4. Module 01 - App Shell And Navigation

### Purpose

Menyediakan kerangka aplikasi utama yang konsisten untuk semua halaman dashboard.

### Primary Users

- Semua user.

### Core Capabilities

- Sidebar navigation.
- Header/topbar.
- Workspace switcher placeholder atau final component.
- User menu.
- Global search trigger.
- Notification trigger.
- Theme toggle.
- Responsive mobile navigation.
- Breadcrumb untuk halaman nested.

### Enterprise Capabilities

- Navigation item dikontrol berdasarkan permission.
- Workspace switcher menampilkan hanya workspace yang bisa diakses user.
- Header mendukung organization context.
- Active route dan active workspace harus jelas untuk menghindari kesalahan input data.

### Suggested Routes

- `/dashboard`
- `/transactions`
- `/accounts`
- `/categories`
- `/budgets`
- `/reports`
- `/settings`

### UI Components

- `AppSidebar`
- `AppHeader`
- `WorkspaceSwitcher`
- `UserMenu`
- `GlobalSearchButton`
- `NotificationButton`
- `MobileNav`
- `Breadcrumbs`

### Data Dependencies

- Current user.
- Active workspace.
- User role.
- Permission list.
- Notification count.

### Acceptance Criteria

- Sidebar tampil di desktop.
- Mobile navigation dapat dibuka dan ditutup.
- Active route terlihat jelas.
- User dapat mengganti theme dari app shell.
- Navigation item mengikuti permission user.
- Layout tidak pecah di desktop, tablet, dan mobile.

## 5. Module 02 - Design System And Theme

### Purpose

Menjamin tampilan aplikasi konsisten, accessible, dan dapat dipercaya untuk domain finance.

### Primary Users

- Semua user.
- Developer dan designer.

### Core Capabilities

- Light mode.
- Dark mode.
- CSS variables untuk color token.
- Typography scale.
- Spacing system.
- Radius dan shadow token.
- Reusable UI components.
- Chart color palette.
- Consistent table, form, dialog, drawer, and card behavior.

### Enterprise Capabilities

- UI mendukung density yang cocok untuk data enterprise.
- Warna status dan chart tidak bergantung pada satu indikator visual saja.
- Komponen harus accessible by default.
- Design token dapat dikembangkan untuk brand/workspace theme di masa depan.

### UI Components

- `Button`
- `Card`
- `Table`
- `Dialog`
- `Sheet`
- `Tabs`
- `Select`
- `Input`
- `Badge`
- `Chart`
- `Tooltip`
- `Skeleton`
- `Alert`

### Acceptance Criteria

- Semua halaman utama nyaman dibaca di light dan dark mode.
- Interactive state seperti hover, focus, disabled, loading, dan selected tersedia.
- Icon-only button memiliki accessible label.
- Chart tetap terbaca di light dan dark mode.
- Komponen tidak membuat layout shift yang mengganggu.

## 6. Module 03 - Data Formatting And Utilities

### Purpose

Menyediakan helper umum untuk format angka, currency, tanggal, status, dan class name.

### Primary Users

- Developer.
- Semua user secara tidak langsung.

### Core Capabilities

- Currency formatting.
- Number formatting.
- Date formatting.
- Percentage formatting.
- Status label mapping.
- Type label mapping.
- Class name merge utility.
- Safe fallback untuk missing data.

### Enterprise Capabilities

- Format mengikuti timezone workspace atau user.
- Format currency mengikuti default workspace.
- Mendukung multi-locale di masa depan.
- Semua financial amount harus ditampilkan konsisten.

### Suggested Utilities

- `formatCurrency`
- `formatNumber`
- `formatDate`
- `formatPercentage`
- `formatTransactionType`
- `formatTransactionStatus`
- `getStatusBadgeVariant`

### Acceptance Criteria

- Amount tampil dengan currency yang benar.
- Date mengikuti preferensi user/workspace.
- Missing value tidak menyebabkan UI error.
- Format konsisten antara dashboard, table, report, dan export.

## 7. Module 04 - Dashboard Overview

### Purpose

Memberikan gambaran cepat tentang kondisi finansial workspace aktif.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

### Core Capabilities

- Total balance card.
- Total income card.
- Total expense card.
- Net cash flow card.
- Budget usage summary.
- Income vs expense chart.
- Expense by category chart.
- Account balance snapshot.
- Recent transactions.
- Financial insights atau alerts.
- Period filter.

### Enterprise Capabilities

- Metric calculation scoped per workspace.
- Dashboard menghormati permission.
- Viewer hanya dapat membaca data.
- Pending transaction dapat di-include atau exclude sesuai konfigurasi.
- Dashboard dapat di-refresh tanpa full page reload.
- Metric harus dapat diaudit sumber datanya melalui report/detail.

### Suggested Routes

- `/dashboard`

### UI Components

- `MetricCard`
- `CashFlowChart`
- `ExpenseCategoryChart`
- `BudgetUsageCard`
- `RecentTransactionsTable`
- `PeriodFilter`
- `InsightPanel`
- `DashboardSkeleton`

### Data Entities

- `Transaction`
- `Account`
- `Category`
- `Budget`
- `Workspace`

### API Dependencies

- `GET /api/dashboard/summary`
- `GET /api/dashboard/cash-flow`
- `GET /api/dashboard/category-breakdown`
- `GET /api/transactions?limit=`

### Permissions

| Action | Roles |
| --- | --- |
| View dashboard | Owner, Admin, Finance Manager, Finance Staff, Viewer |
| Open transaction detail | Owner, Admin, Finance Manager, Finance Staff, Viewer |
| Create transaction from dashboard | Owner, Admin, Finance Manager, Finance Staff |
| Export dashboard data | Owner, Admin, Finance Manager |

### Acceptance Criteria

- Dashboard menampilkan metric utama dengan benar.
- Period filter memperbarui card, chart, dan recent transactions.
- Empty state tampil jika belum ada data.
- Loading dan error state tersedia.
- Data dashboard tidak bocor antar workspace.
- Angka dashboard konsisten dengan report dan transaction data.

## 8. Module 05 - Transactions

### Purpose

Menjadi pusat pencatatan, pengelolaan, pencarian, dan audit aktivitas finansial.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

### Core Capabilities

- Transaction list.
- Transaction detail.
- Create transaction.
- Edit transaction.
- Archive atau soft delete transaction.
- Transaction type: `income`, `expense`, `transfer`, `adjustment`.
- Transaction status: `draft`, `pending`, `approved`, `rejected`, `void`.
- Search by description, notes, amount, category, account.
- Filter by date range, type, status, account, category, amount range, created by.
- Sorting.
- Pagination.
- Bulk select.
- Bulk categorize.
- Bulk archive.
- Bulk export.
- Attachment placeholder atau attachment support.

### Enterprise Capabilities

- Soft delete untuk menjaga riwayat.
- Audit trail untuk create, update, delete, archive, approve, reject.
- Approval threshold untuk transaksi tertentu.
- Permission berbeda untuk draft, pending, dan approved transaction.
- Row-level action mengikuti role.
- Data table siap untuk server-side pagination.
- Transaction history tersedia di detail.

### Suggested Routes

- `/transactions`
- `/transactions/new`
- `/transactions/[transactionId]`
- `/transactions/[transactionId]/edit`

### UI Components

- `TransactionsTable`
- `TransactionForm`
- `TransactionDetail`
- `TransactionFilters`
- `TransactionBulkActions`
- `TransactionStatusBadge`
- `TransactionTypeBadge`
- `TransactionAmount`
- `TransactionAuditTimeline`
- `AttachmentList`

### Data Entities

- `Transaction`
- `Account`
- `Category`
- `User`
- `Workspace`
- `Attachment`
- `AuditLog`

### API Dependencies

- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/transactions/:id`
- `PATCH /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `POST /api/transactions/:id/submit`
- `POST /api/transactions/:id/approve`
- `POST /api/transactions/:id/reject`
- `POST /api/transactions/bulk`

### Permissions

| Action | Owner | Admin | Finance Manager | Finance Staff | Viewer |
| --- | --- | --- | --- | --- | --- |
| View transactions | Yes | Yes | Yes | Yes | Yes |
| Create transaction | Yes | Yes | Yes | Yes | No |
| Edit own draft | Yes | Yes | Yes | Yes | No |
| Edit approved | Yes | Yes | Yes | No | No |
| Archive transaction | Yes | Yes | Yes | Limited | No |
| Bulk action | Yes | Yes | Yes | Limited | No |
| View audit history | Yes | Yes | Limited | No | No |

### Acceptance Criteria

- User dapat membuat transaksi valid.
- Transaction list dapat difilter, dicari, diurutkan, dan dipaginasi.
- Transaction form memiliki validasi amount, date, type, account, dan category.
- Dashboard berubah setelah transaksi dibuat atau diubah.
- Approved transaction tidak dapat diubah oleh role yang tidak berwenang.
- Audit log dibuat untuk perubahan penting.

## 9. Module 06 - Categories

### Purpose

Mengelompokkan transaksi agar pengguna dapat membaca pola pemasukan dan pengeluaran.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.

### Core Capabilities

- Category list.
- Create category.
- Edit category.
- Archive category.
- Default categories.
- Category type: income dan expense.
- Category color.
- Category icon.
- Category status.
- Category usage summary.

### Enterprise Capabilities

- Locked category untuk standar workspace.
- Permission untuk mengelola kategori.
- Audit trail untuk perubahan kategori.
- Kategori yang sudah dipakai tidak boleh hard delete tanpa migrasi.
- Category usage masuk report.

### Suggested Routes

- `/categories`
- `/categories/new`
- `/categories/[categoryId]/edit`

### UI Components

- `CategoriesTable`
- `CategoryForm`
- `CategoryBadge`
- `CategoryColorPicker`
- `CategoryIconPicker`
- `CategoryUsagePanel`

### Data Entities

- `Category`
- `Transaction`
- `Workspace`
- `AuditLog`

### API Dependencies

- `GET /api/categories`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `POST /api/categories/:id/archive`
- `GET /api/categories/:id/usage`

### Permissions

| Action | Roles |
| --- | --- |
| View categories | Owner, Admin, Finance Manager, Finance Staff, Viewer |
| Create category | Owner, Admin, Finance Manager, Finance Staff Limited |
| Edit category | Owner, Admin, Finance Manager |
| Archive category | Owner, Admin, Finance Manager |
| Lock category | Owner, Admin |

### Acceptance Criteria

- Category baru muncul di form transaksi.
- Category archived tidak muncul sebagai pilihan default.
- Transaksi lama tetap menampilkan category archived.
- Category report menghitung penggunaan category dengan benar.
- Perubahan category masuk audit log.

## 10. Module 07 - Accounts

### Purpose

Mengelola sumber atau tempat penyimpanan uang seperti cash, bank, e-wallet, credit card, investment, dan akun lainnya.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff dengan akses terbatas.

### Core Capabilities

- Account list.
- Create account.
- Edit account.
- Archive account.
- Account type.
- Opening balance.
- Current balance.
- Account currency.
- Institution name.
- Account status.
- Account balance history.
- Transfer antar account.

### Enterprise Capabilities

- Account-level permission.
- Audit trail untuk perubahan balance dan konfigurasi account.
- Archived account tidak menerima transaksi baru.
- Balance calculation harus konsisten dan dapat ditelusuri.
- Account tertentu dapat disembunyikan dari role tertentu.

### Suggested Routes

- `/accounts`
- `/accounts/new`
- `/accounts/[accountId]`
- `/accounts/[accountId]/edit`

### UI Components

- `AccountsTable`
- `AccountForm`
- `AccountBalanceCard`
- `AccountTypeBadge`
- `AccountTransactionsTable`
- `TransferForm`
- `BalanceHistoryChart`

### Data Entities

- `Account`
- `Transaction`
- `Workspace`
- `AuditLog`

### API Dependencies

- `GET /api/accounts`
- `POST /api/accounts`
- `GET /api/accounts/:id`
- `PATCH /api/accounts/:id`
- `POST /api/accounts/:id/archive`
- `GET /api/accounts/:id/transactions`
- `POST /api/accounts/transfer`

### Permissions

| Action | Roles |
| --- | --- |
| View accounts | Owner, Admin, Finance Manager, Finance Staff Limited, Viewer Limited |
| Create account | Owner, Admin, Finance Manager |
| Edit account | Owner, Admin, Finance Manager |
| Archive account | Owner, Admin |
| Create transfer | Owner, Admin, Finance Manager, Finance Staff Limited |

### Acceptance Criteria

- Account baru dapat digunakan di form transaksi.
- Current balance berubah sesuai transaksi.
- Transfer antar account tercatat konsisten.
- Archived account tidak muncul sebagai pilihan default.
- Perubahan opening balance masuk audit log.

## 11. Module 08 - Budgets

### Purpose

Membantu pengguna mengontrol pengeluaran berdasarkan kategori, periode, account, atau aturan workspace.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Viewer untuk read-only.

### Core Capabilities

- Budget list.
- Create budget.
- Edit budget.
- Archive budget.
- Budget by category.
- Budget by period.
- Budget threshold.
- Budget usage calculation.
- Budget status indicator.
- Budget alerts.

### Enterprise Capabilities

- Budget approval.
- Budget permission.
- Budget versioning atau history.
- Audit trail untuk perubahan budget.
- Shared budget dalam workspace.
- Budget report dan variance analysis.

### Suggested Routes

- `/budgets`
- `/budgets/new`
- `/budgets/[budgetId]`
- `/budgets/[budgetId]/edit`

### UI Components

- `BudgetsTable`
- `BudgetForm`
- `BudgetUsageBar`
- `BudgetStatusBadge`
- `BudgetVarianceCard`
- `BudgetTransactionsTable`

### Data Entities

- `Budget`
- `Category`
- `Transaction`
- `Workspace`
- `AuditLog`
- `Notification`

### API Dependencies

- `GET /api/budgets`
- `POST /api/budgets`
- `GET /api/budgets/:id`
- `PATCH /api/budgets/:id`
- `POST /api/budgets/:id/archive`
- `GET /api/budgets/:id/usage`

### Permissions

| Action | Roles |
| --- | --- |
| View budgets | Owner, Admin, Finance Manager, Finance Staff, Viewer |
| Create budget | Owner, Admin, Finance Manager |
| Edit budget | Owner, Admin, Finance Manager |
| Archive budget | Owner, Admin |
| Approve budget | Owner, Admin, Finance Manager |

### Acceptance Criteria

- Budget usage dihitung dari transaksi expense yang relevan.
- Warning muncul saat threshold tercapai.
- Budget exceeded tampil jelas.
- Archived budget tidak dihitung sebagai active budget.
- Perubahan budget masuk audit log.

## 12. Module 09 - Reports And Analytics

### Purpose

Menyediakan laporan dan visualisasi untuk mengevaluasi performa finansial.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

### Core Capabilities

- Income summary report.
- Expense summary report.
- Net cash flow report.
- Expense by category report.
- Income by category report.
- Account balance trend.
- Budget vs actual report.
- Transaction detail report.
- Date range filter.
- Grouping by day, week, month, quarter, year.
- Export CSV/PDF.

### Enterprise Capabilities

- Saved report view.
- Shared report view.
- Permission-aware report.
- Report export audit log.
- Report data consistency check.
- Large report generation as background job.

### Suggested Routes

- `/reports`
- `/reports/income`
- `/reports/expenses`
- `/reports/cash-flow`
- `/reports/budgets`
- `/reports/transactions`

### UI Components

- `ReportsOverview`
- `ReportFilterBar`
- `ReportChart`
- `ReportTable`
- `SavedViewMenu`
- `ExportReportButton`
- `ReportEmptyState`

### Data Entities

- `Transaction`
- `Account`
- `Category`
- `Budget`
- `ReportView`
- `ExportJob`
- `AuditLog`

### API Dependencies

- `GET /api/reports/summary`
- `GET /api/reports/income`
- `GET /api/reports/expenses`
- `GET /api/reports/cash-flow`
- `GET /api/reports/budgets`
- `POST /api/reports/saved-views`
- `POST /api/exports`

### Permissions

| Action | Roles |
| --- | --- |
| View reports | Owner, Admin, Finance Manager, Finance Staff, Viewer |
| Create saved view | Owner, Admin, Finance Manager, Finance Staff |
| Share saved view | Owner, Admin, Finance Manager |
| Export report | Owner, Admin, Finance Manager, Finance Staff Limited |

### Acceptance Criteria

- Report menampilkan angka konsisten dengan transaksi.
- Date range memperbarui chart dan table.
- Export mengikuti filter aktif.
- Saved view dapat digunakan ulang.
- Empty state tampil jika tidak ada data.
- Export action masuk audit log.

## 13. Module 10 - Import And Export

### Purpose

Mendukung migrasi data, backup, dan kebutuhan operasional enterprise.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff dengan permission.

### Core Capabilities

- Download CSV template.
- Upload CSV.
- Column mapping.
- Data preview.
- Row-level validation.
- Import confirmation.
- Import history.
- Export transactions.
- Export reports.
- Export audit log untuk role tertentu.

### Enterprise Capabilities

- Import job status.
- Background processing untuk file besar.
- Partial success handling.
- Error report download.
- Export permission.
- Sensitive field masking berdasarkan role.
- Audit log untuk import/export.

### Suggested Routes

- `/imports`
- `/imports/[importJobId]`
- `/exports`
- `/exports/[exportJobId]`

### UI Components

- `ImportUploader`
- `ColumnMapper`
- `ImportPreviewTable`
- `ImportValidationSummary`
- `ImportHistoryTable`
- `ExportMenu`
- `ExportJobStatus`

### Data Entities

- `ImportJob`
- `ExportJob`
- `Transaction`
- `Account`
- `Category`
- `User`
- `AuditLog`

### API Dependencies

- `GET /api/imports/template`
- `POST /api/imports`
- `GET /api/imports/:id`
- `POST /api/imports/:id/confirm`
- `GET /api/exports`
- `POST /api/exports`
- `GET /api/exports/:id`

### Permissions

| Action | Roles |
| --- | --- |
| Import transactions | Owner, Admin, Finance Manager, Finance Staff Limited |
| Export transactions | Owner, Admin, Finance Manager, Finance Staff Limited |
| Export reports | Owner, Admin, Finance Manager, Finance Staff Limited |
| Export audit logs | Owner, Admin |

### Acceptance Criteria

- Invalid CSV tidak mengubah data.
- Preview menampilkan row valid dan invalid.
- User dapat memperbaiki mapping sebelum import.
- Import sukses membuat transaksi baru.
- Export mengikuti filter dan permission.
- Import/export tercatat di audit log.

## 14. Module 11 - Authentication And User Profile

### Purpose

Mengamankan akses aplikasi dan menyediakan identitas user.

### Primary Users

- Semua user.

### Core Capabilities

- Register.
- Login.
- Logout.
- Reset password.
- Protected routes.
- User profile.
- Avatar.
- Personal preferences.
- Secure session.

### Enterprise Capabilities

- User deactivation.
- Session expiration policy.
- Workspace invitation.
- Login activity tracking.
- Optional SSO-ready architecture di masa depan.

### Suggested Routes

- `/login`
- `/register`
- `/forgot-password`
- `/profile`

### UI Components

- `LoginForm`
- `RegisterForm`
- `ForgotPasswordForm`
- `UserProfileForm`
- `SessionExpiredDialog`

### Data Entities

- `User`
- `Session`
- `WorkspaceMember`
- `AuditLog`

### API Dependencies

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `GET /api/users/me`
- `PATCH /api/users/me`

### Acceptance Criteria

- Unauthenticated user tidak dapat membuka protected route.
- Login berhasil mengarahkan user ke dashboard.
- Logout menghapus session.
- Profile update tersimpan.
- Deactivated user tidak dapat login.

## 15. Module 12 - Workspace And Organization

### Purpose

Memisahkan data berdasarkan personal workspace, bisnis, atau organisasi.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

### Core Capabilities

- Create workspace.
- Edit workspace.
- Switch workspace.
- Workspace profile.
- Default currency.
- Timezone.
- Fiscal period.
- Member list.
- Invite member.
- Remove atau deactivate member.

### Enterprise Capabilities

- Multi-user workspace.
- Workspace-level settings.
- Workspace-level permissions.
- Workspace isolation.
- Member role management.
- Data retention settings.
- Audit log untuk perubahan workspace.

### Suggested Routes

- `/settings/workspace`
- `/settings/members`
- `/settings/roles`

### UI Components

- `WorkspaceSwitcher`
- `WorkspaceForm`
- `MembersTable`
- `InviteMemberDialog`
- `MemberRoleSelect`
- `WorkspaceDangerZone`

### Data Entities

- `Workspace`
- `WorkspaceMember`
- `User`
- `Role`
- `AuditLog`

### API Dependencies

- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/workspaces/:id`
- `PATCH /api/workspaces/:id`
- `GET /api/members`
- `POST /api/members/invite`
- `PATCH /api/members/:id`
- `DELETE /api/members/:id`

### Acceptance Criteria

- User hanya melihat workspace tempat ia menjadi member.
- Data tidak bocor antar workspace.
- Workspace switcher memperbarui seluruh konteks data.
- Invite member membuat pending invitation.
- Role member dapat diubah oleh role berwenang.

## 16. Module 13 - Role-Based Access Control

### Purpose

Mengatur akses berdasarkan role dan permission agar data finansial tetap aman.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.
- Viewer.

### Core Capabilities

- Role definition.
- Permission mapping.
- Permission-aware UI.
- Protected API mutation.
- Restricted navigation.
- Restricted row actions.

### Enterprise Capabilities

- Custom role di masa depan.
- Account-level permission.
- Report export restriction.
- Audit log access restriction.
- Server-side authorization sebagai sumber kebenaran.

### Default Roles

| Role | Description |
| --- | --- |
| Owner | Pemilik workspace dengan akses penuh. |
| Admin | Mengelola workspace, member, dan sebagian besar data. |
| Finance Manager | Mengelola data finance dan approval. |
| Finance Staff | Menginput dan mengelola data terbatas. |
| Viewer | Membaca dashboard dan report tanpa mutasi. |

### UI Components

- `RoleBadge`
- `PermissionGate`
- `RoleSelect`
- `PermissionMatrixTable`

### Data Entities

- `Role`
- `Permission`
- `WorkspaceMember`
- `AuditLog`

### API Dependencies

- `GET /api/roles`
- `PATCH /api/members/:id/role`
- `GET /api/permissions/me`

### Acceptance Criteria

- User tanpa permission tidak melihat action terbatas.
- API menolak mutation dari user tanpa permission.
- Permission berubah langsung memengaruhi navigation dan action.
- Role change masuk audit log.

## 17. Module 14 - Approval Workflow

### Purpose

Memberikan kontrol validasi untuk transaksi atau budget yang membutuhkan persetujuan.

### Primary Users

- Owner.
- Admin.
- Finance Manager.
- Finance Staff.

### Core Capabilities

- Submit transaction for approval.
- Approval queue.
- Approve transaction.
- Reject transaction.
- Rejection reason.
- Approval threshold.
- Approval status badge.
- Approval history.

### Enterprise Capabilities

- Self-approval prevention.
- Configurable approval rules.
- Multi-step approval di masa depan.
- Approval notifications.
- Approval audit trail.
- Pending transaction inclusion/exclusion in dashboard.

### Suggested Routes

- `/approvals`
- `/settings/approval-rules`

### UI Components

- `ApprovalQueueTable`
- `ApprovalStatusBadge`
- `ApprovalActionDialog`
- `ApprovalHistoryTimeline`
- `ApprovalRulesForm`

### Data Entities

- `Transaction`
- `Budget`
- `ApprovalRule`
- `ApprovalAction`
- `Notification`
- `AuditLog`

### API Dependencies

- `GET /api/approvals`
- `POST /api/transactions/:id/submit`
- `POST /api/transactions/:id/approve`
- `POST /api/transactions/:id/reject`
- `GET /api/settings/approval-rules`
- `PATCH /api/settings/approval-rules`

### Permissions

| Action | Roles |
| --- | --- |
| Submit for approval | Owner, Admin, Finance Manager, Finance Staff |
| View approval queue | Owner, Admin, Finance Manager |
| Approve transaction | Owner, Admin, Finance Manager |
| Reject transaction | Owner, Admin, Finance Manager |
| Configure approval rule | Owner, Admin |

### Acceptance Criteria

- Transaction above threshold masuk pending approval.
- Approver dapat approve atau reject.
- Reject wajib memiliki reason.
- User tidak dapat approve transaksi sendiri jika rule aktif.
- Semua approval action masuk audit log.

## 18. Module 15 - Audit Trail And Activity Log

### Purpose

Menyediakan riwayat aktivitas yang dapat ditelusuri untuk data sensitif dan kebutuhan enterprise.

### Primary Users

- Owner.
- Admin.
- Finance Manager dengan akses terbatas.

### Core Capabilities

- Activity list.
- Entity-level audit history.
- Filter by actor.
- Filter by action.
- Filter by entity.
- Filter by date range.
- Before/after values.
- Audit detail.

### Enterprise Capabilities

- Immutable audit log dari UI.
- Export audit log.
- Retention policy.
- Audit log tetap tersedia walau user dinonaktifkan.
- Security event logging.

### Suggested Routes

- `/activity`
- `/audit-logs`
- `/transactions/[transactionId]/audit`

### UI Components

- `AuditLogTable`
- `AuditLogFilters`
- `AuditDiffViewer`
- `ActivityTimeline`
- `EntityAuditPanel`

### Data Entities

- `AuditLog`
- `User`
- `Workspace`

### API Dependencies

- `GET /api/audit-logs`
- `GET /api/audit-logs/:id`
- `GET /api/transactions/:id/audit-logs`
- `POST /api/exports/audit-logs`

### Acceptance Criteria

- Create, update, archive, approve, reject, import, export, login, dan permission change tercatat.
- Audit log dapat difilter.
- Audit detail menampilkan actor, action, timestamp, dan changed values.
- Viewer dan Staff tidak dapat melihat audit log tanpa izin.

## 19. Module 16 - Search, Filters, And Saved Views

### Purpose

Mempercepat pencarian data dan menyimpan perspektif analisis yang sering digunakan.

### Primary Users

- Semua user sesuai permission.

### Core Capabilities

- Global search.
- Transaction search.
- Filter builder.
- Date range filter.
- Multi-select filter.
- Sort state.
- URL query sync.
- Saved private view.
- Saved shared view.

### Enterprise Capabilities

- Permission-aware search result.
- Shared saved views.
- Server-side search.
- Saved view ownership.
- Saved view audit trail.

### Suggested Routes

- Search tersedia global melalui app shell.
- Saved views tersedia di `/transactions` dan `/reports`.

### UI Components

- `GlobalSearchCommand`
- `FilterBar`
- `DateRangePicker`
- `SavedViewDropdown`
- `ColumnVisibilityMenu`
- `SortControl`

### Data Entities

- `ReportView`
- `User`
- `Workspace`
- `Transaction`
- `Account`
- `Category`

### API Dependencies

- `GET /api/search`
- `GET /api/saved-views`
- `POST /api/saved-views`
- `PATCH /api/saved-views/:id`
- `DELETE /api/saved-views/:id`

### Acceptance Criteria

- Search hanya menampilkan data yang boleh diakses user.
- Filter dapat dikombinasikan.
- Filter state tidak hilang saat pagination berubah.
- Saved view dapat dibuat, dipakai ulang, diubah, dan dihapus.
- Shared view hanya dapat dibuat role yang berwenang.

## 20. Module 17 - Notifications And Alerts

### Purpose

Memberi sinyal kepada user saat ada kondisi finansial atau operasional yang membutuhkan perhatian.

### Primary Users

- Semua user sesuai konteks.

### Core Capabilities

- Notification center.
- Unread count.
- Mark as read.
- Budget threshold alert.
- Budget exceeded alert.
- Approval needed alert.
- Import complete/failed alert.
- Export ready alert.
- Invitation alert.

### Enterprise Capabilities

- Notification rules.
- Role-based notification routing.
- Workspace-level notification preferences.
- Notification audit for critical actions.
- Email/in-app channel ready architecture.

### Suggested Routes

- `/notifications`
- `/settings/notifications`

### UI Components

- `NotificationButton`
- `NotificationList`
- `NotificationItem`
- `NotificationPreferencesForm`
- `AlertBanner`

### Data Entities

- `Notification`
- `User`
- `Workspace`
- `Budget`
- `Transaction`
- `ImportJob`
- `ExportJob`

### API Dependencies

- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `POST /api/notifications/mark-all-read`
- `GET /api/settings/notifications`
- `PATCH /api/settings/notifications`

### Acceptance Criteria

- Notification count berubah saat ada notifikasi baru.
- User dapat membuka detail dari notifikasi.
- Budget alert muncul saat threshold tercapai.
- Approval alert dikirim ke approver yang sesuai.
- User dapat menandai notifikasi sebagai read.

## 21. Module 18 - Settings And Preferences

### Purpose

Mengatur preferensi personal dan konfigurasi workspace.

### Primary Users

- Semua user untuk personal settings.
- Owner/Admin untuk workspace settings.

### Core Capabilities

- Profile settings.
- Theme settings.
- Currency preference.
- Date format preference.
- Timezone preference.
- Workspace profile.
- Fiscal period.
- Member settings.
- Role settings.
- Approval rules.
- Notification settings.

### Enterprise Capabilities

- Data retention settings.
- Security settings.
- Export settings.
- Workspace-level defaults.
- Audit log untuk perubahan setting penting.

### Suggested Routes

- `/settings`
- `/settings/profile`
- `/settings/workspace`
- `/settings/members`
- `/settings/roles`
- `/settings/preferences`
- `/settings/approval-rules`
- `/settings/notifications`
- `/settings/security`

### UI Components

- `SettingsLayout`
- `ProfileSettingsForm`
- `WorkspaceSettingsForm`
- `PreferencesForm`
- `MembersTable`
- `RolesPanel`
- `ApprovalRulesForm`
- `SecuritySettingsPanel`

### Data Entities

- `User`
- `Workspace`
- `WorkspaceMember`
- `Role`
- `ApprovalRule`
- `NotificationPreference`
- `AuditLog`

### API Dependencies

- `GET /api/settings`
- `PATCH /api/users/me`
- `PATCH /api/workspaces/:id`
- `GET /api/settings/preferences`
- `PATCH /api/settings/preferences`
- `GET /api/settings/security`
- `PATCH /api/settings/security`

### Acceptance Criteria

- Personal preference langsung memengaruhi UI.
- Workspace settings hanya dapat diubah role berwenang.
- Currency, date, dan timezone konsisten di seluruh aplikasi.
- Perubahan setting penting masuk audit log.

## 22. Module 19 - Observability And Error Handling

### Purpose

Memastikan aplikasi dapat dipantau, error mudah ditelusuri, dan pengalaman user tetap stabil saat terjadi masalah.

### Primary Users

- Developer.
- Admin operasional.
- Semua user secara tidak langsung.

### Core Capabilities

- Consistent error state.
- Toast atau alert untuk failure/success.
- API error normalization.
- Client error boundary.
- Server error logging.
- Job status tracking.
- Product analytics event.

### Enterprise Capabilities

- Monitoring dashboard ready.
- Import/export job observability.
- Performance tracking.
- Security event tracking.
- Correlation id untuk request penting.
- Audit-safe logging tanpa data finansial sensitif berlebihan.

### UI Components

- `ErrorState`
- `EmptyState`
- `LoadingState`
- `ErrorBoundary`
- `JobStatusBadge`
- `RetryButton`

### Data Entities

- `ImportJob`
- `ExportJob`
- `AuditLog`
- `Notification`

### Suggested Events

- `dashboard_viewed`
- `transaction_created`
- `transaction_updated`
- `transaction_approved`
- `report_viewed`
- `report_exported`
- `budget_created`
- `csv_import_completed`
- `workspace_member_invited`

### Acceptance Criteria

- API error tampil sebagai pesan yang aman dan mudah dipahami.
- Halaman utama memiliki loading, empty, dan error state.
- Import/export memiliki status yang dapat dilihat user.
- Event penting dapat dicatat tanpa membocorkan data sensitif.
- Error boundary mencegah seluruh aplikasi blank jika satu widget gagal.

## 23. Module 20 - Security And Compliance Baseline

### Purpose

Menjaga data finansial tetap aman, terisolasi, dan dapat dipertanggungjawabkan.

### Primary Users

- Semua user.
- Owner.
- Admin.
- Developer.

### Core Capabilities

- Protected routes.
- Server-side authorization.
- Workspace data isolation.
- Request validation.
- Secure session handling.
- Sensitive error masking.
- File upload restrictions.
- Export permission.
- Rate limiting untuk endpoint sensitif.

### Enterprise Capabilities

- Data retention policy.
- User deactivation without audit deletion.
- Auditability.
- Privacy-aware logging.
- Workspace data export/delete request support.
- Security settings.

### Data Entities

- `User`
- `Session`
- `Workspace`
- `WorkspaceMember`
- `Role`
- `AuditLog`

### Acceptance Criteria

- User tidak dapat membaca data workspace lain.
- Semua mutation memvalidasi permission.
- Input user divalidasi sebelum diproses.
- Sensitive error tidak ditampilkan mentah.
- Export hanya dapat dilakukan role berwenang.
- Audit trail tidak hilang saat user dinonaktifkan.

## 24. Cross-Module Dependencies

| Module | Depends On | Used By |
| --- | --- | --- |
| App Shell And Navigation | Auth, Workspace, RBAC | Semua halaman |
| Dashboard Overview | Transactions, Accounts, Categories, Budgets, Reports | Semua user dashboard |
| Transactions | Accounts, Categories, Approval, Audit | Dashboard, Reports, Budgets |
| Categories | Transactions, Reports | Dashboard, Transactions, Budgets |
| Accounts | Transactions, Reports | Dashboard, Transactions |
| Budgets | Transactions, Categories, Notifications | Dashboard, Reports |
| Reports | Transactions, Accounts, Categories, Budgets, Export | Dashboard, Management |
| Import And Export | Transactions, Reports, Audit | Operations |
| Workspace | Auth, RBAC | Semua data domain |
| RBAC | Auth, Workspace | Semua protected actions |
| Approval Workflow | Transactions, Notifications, Audit | Enterprise finance control |
| Audit Trail | Auth, Workspace, Transactions, Settings | Compliance |
| Notifications | Budgets, Approval, Import/Export | App Shell |
| Settings | Auth, Workspace, RBAC | Semua modul |

## 25. Suggested Feature Folder Grouping

Struktur folder fitur yang disarankan:

```text
features/
├── accounts/
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

Struktur internal tiap feature:

```text
feature-name/
├── components/
├── data/
├── hooks/
├── schemas/
├── services/
├── types/
└── utils/
```

## 26. Suggested Route Grouping

```text
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/
│   ├── dashboard/
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

## 27. Enterprise Readiness Checklist Per Module

Setiap modul enterprise-ready harus memenuhi:

- Workspace scoped data.
- Permission-aware UI.
- Server-side authorization.
- Input validation.
- Loading, empty, error, and success states.
- Audit log untuk mutation penting.
- Responsive layout.
- Accessible interaction.
- Testable data contract.
- Consistent API error handling.
- No sensitive data leak in UI or logs.

## 28. MVP Module Cut

MVP cukup mengambil subset berikut:

| Module | MVP Requirement |
| --- | --- |
| App Shell And Navigation | Sidebar, header, responsive layout. |
| Design System And Theme | Light/dark mode dan core UI components. |
| Data Formatting And Utilities | Currency, date, status, type formatting. |
| Dashboard Overview | Metric cards, charts, recent transactions. |
| Transactions | CRUD, list, filter, search, pagination basic. |
| Categories | Basic CRUD dan selection di transaction form. |
| Accounts | Basic CRUD dan balance calculation. |
| Budgets | Budget usage basic. |
| Reports | Summary report basic. |

Enterprise modules seperti RBAC, approval, audit trail, import/export, notifications, observability, dan compliance tetap sudah dirancang, tetapi implementasinya dapat masuk fase berikutnya setelah core finance stabil.

## 29. Kesimpulan

Finance Dashboard NextJS harus dibangun sebagai kumpulan modul fitur yang saling terhubung namun tetap memiliki batas domain yang jelas. Modul P0 berfokus pada fondasi aplikasi, dashboard, transaksi, dan utilitas data. Modul P1 memperkuat domain finance melalui accounts, categories, budgets, dan reports. Modul P2 dan P3 membawa produk ke arah enterprise-ready melalui authentication, workspace, RBAC, approval workflow, audit trail, import/export, notifications, observability, dan security baseline.

Dengan struktur modul ini, pengembangan dapat dilakukan secara bertahap tanpa kehilangan arah enterprise readiness sejak awal.
