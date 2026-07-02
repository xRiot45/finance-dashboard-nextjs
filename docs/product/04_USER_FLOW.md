# Finance Dashboard NextJS - User Flow

## 1. Ringkasan

Dokumen ini menjelaskan alur penggunaan Finance Dashboard NextJS dari sudut pandang user. User flow ini dibuat agar pengguna, designer, dan developer memahami bagaimana pengguna bergerak di dalam dashboard, mulai dari autentikasi, memilih workspace, membaca dashboard, mencatat transaksi, mengelola data finance, hingga menjalankan workflow enterprise seperti approval, audit trail, import/export, dan pengaturan permission.

User flow ini mengikuti PRD dan feature modules yang sudah ditentukan:

- Dashboard harus mudah dipahami dalam waktu singkat.
- Transaksi menjadi pusat data keuangan.
- Workspace menjadi boundary data.
- Role dan permission mengatur akses fitur.
- Approval, audit trail, import/export, dan notifications mendukung kebutuhan enterprise.

## 2. User Roles

| Role | Fokus Flow |
| --- | --- |
| Owner | Mengelola workspace, member, role, seluruh data finance, approval, audit, dan settings. |
| Admin | Mengelola workspace operasional, member, finance data, reports, import/export, dan audit. |
| Finance Manager | Mengelola transaksi, budget, report, approval, dan analisis finansial. |
| Finance Staff | Mencatat transaksi, mengelola data terbatas, melihat dashboard dan report sesuai izin. |
| Viewer | Membaca dashboard, transaksi, dan report tanpa melakukan perubahan data. |

## 3. Entry Points

User dapat masuk ke aplikasi melalui:

- Login page.
- Register page.
- Invitation link dari workspace.
- Direct link ke dashboard.
- Direct link ke transaksi, report, approval, atau audit log.
- Notification deep link.

Jika user belum login dan membuka protected route, sistem harus mengarahkan user ke halaman login.

## 4. Global Application Flow

```text
Open app
-> Check authentication
-> If not authenticated: show login/register
-> If authenticated: load user profile
-> Load available workspaces
-> Select active workspace
-> Load role and permissions
-> Render app shell
-> Navigate to dashboard
```

### Expected Behavior

- User yang sudah login langsung masuk ke workspace terakhir yang aktif.
- Jika user hanya memiliki satu workspace, workspace tersebut otomatis aktif.
- Jika user memiliki lebih dari satu workspace, user dapat mengganti workspace dari header.
- Semua data dashboard, transaksi, report, dan settings mengikuti workspace aktif.
- Navigation item yang tidak diizinkan oleh role user tidak perlu ditampilkan.

## 5. Authentication Flow

### 5.1 Login Flow

```text
User membuka /login
-> User mengisi email dan password
-> User submit form
-> Sistem validasi input
-> Sistem autentikasi credential
-> Jika berhasil: buat session
-> Load user profile dan workspace
-> Redirect ke /dashboard
```

### Success State

- User masuk ke dashboard.
- Header menampilkan user menu.
- Active workspace tersedia.

### Error State

- Email/password salah: tampilkan pesan error.
- Akun dinonaktifkan: tampilkan pesan bahwa akses tidak aktif.
- Network/server error: tampilkan pesan umum dan tombol retry.

### 5.2 Register Flow

```text
User membuka /register
-> User mengisi nama, email, password
-> Sistem validasi input
-> Sistem membuat user baru
-> Sistem membuat personal workspace default
-> User masuk ke aplikasi
-> Redirect ke /dashboard
```

### 5.3 Invitation Flow

```text
User membuka invitation link
-> Sistem membaca invitation token
-> Jika belum login: user login/register
-> Sistem menghubungkan user ke workspace
-> Sistem memberi role sesuai invitation
-> Redirect ke workspace dashboard
```

### Edge Cases

- Invitation expired.
- Invitation sudah digunakan.
- Email user tidak sesuai invitation.
- Workspace sudah tidak aktif.

## 6. First-Time User Flow

Flow ini berlaku untuk user baru yang belum memiliki data finance.

```text
Register/Login
-> Dashboard empty state
-> User melihat onboarding checklist
-> User membuat account pertama
-> User membuat atau memakai default categories
-> User menambahkan transaksi pertama
-> Dashboard mulai menampilkan metric dan chart
```

### Onboarding Checklist

- Buat account pertama.
- Review default categories.
- Tambahkan transaksi pertama.
- Buat budget pertama.
- Buka report ringkas.

### Empty State Guidance

- Dashboard kosong harus menampilkan CTA untuk membuat account atau transaksi.
- Transactions kosong harus menampilkan CTA untuk menambahkan transaksi atau import CSV.
- Accounts kosong harus menampilkan CTA untuk membuat account.
- Budgets kosong harus menampilkan CTA untuk membuat budget.
- Reports kosong harus menjelaskan bahwa laporan muncul setelah ada transaksi.

## 7. Main Dashboard Flow

### 7.1 Read Dashboard Flow

```text
User membuka /dashboard
-> Sistem load summary workspace aktif
-> Sistem menampilkan metric cards
-> Sistem menampilkan cash flow chart
-> Sistem menampilkan expense by category
-> Sistem menampilkan budget usage
-> Sistem menampilkan recent transactions
-> User membaca kondisi finansial
```

### Dashboard Actions

- Ubah periode.
- Buka detail transaksi terbaru.
- Tambah transaksi baru.
- Buka report.
- Buka budget detail.
- Refresh data.

### 7.2 Period Filter Flow

```text
User memilih period filter
-> Sistem update query/filter state
-> Sistem request data summary baru
-> Metric, chart, budget usage, dan recent transactions diperbarui
```

### Acceptance Flow

- User dapat memahami total balance, income, expense, dan cash flow.
- Filter periode mengubah semua widget terkait.
- Jika widget gagal load, hanya widget tersebut yang menampilkan error state.

## 8. Transaction Flow

### 8.1 Create Transaction Flow

```text
User klik Add Transaction
-> Sistem membuka form transaksi
-> User memilih type: income, expense, transfer, atau adjustment
-> User memilih account
-> User memilih category jika diperlukan
-> User mengisi amount, date, description, notes
-> User menambahkan attachment optional
-> User submit
-> Sistem validasi field
-> Sistem cek permission
-> Sistem simpan transaksi
-> Sistem membuat audit log
-> Dashboard dan transaction list diperbarui
```

### Success State

- Toast success tampil.
- Transaksi baru muncul di list.
- Dashboard summary berubah.
- Account balance berubah.

### Error State

- Amount invalid.
- Account belum dipilih.
- Category belum dipilih.
- Account archived.
- User tidak punya permission.
- Server error.

### 8.2 Transaction Approval Branch

Jika transaksi memenuhi aturan approval:

```text
User submit transaksi
-> Sistem cek approval rule
-> Jika approval diperlukan: status menjadi pending
-> Sistem membuat notification untuk approver
-> Transaksi masuk approval queue
-> Dashboard menghitung transaksi sesuai konfigurasi include/exclude pending
```

Jika approval tidak diperlukan:

```text
User submit transaksi
-> Status langsung approved atau recorded
-> Dashboard dan report diperbarui
```

### 8.3 Edit Transaction Flow

```text
User membuka transaction detail
-> User klik Edit
-> Sistem cek permission dan status transaksi
-> User mengubah field
-> User submit
-> Sistem validasi input
-> Sistem menyimpan perubahan
-> Sistem mencatat before/after di audit log
-> User kembali ke detail atau list
```

### Edit Restrictions

- Viewer tidak dapat mengedit transaksi.
- Finance Staff hanya dapat mengedit transaksi miliknya jika masih draft atau belum approved.
- Approved transaction hanya dapat diubah oleh Owner, Admin, atau Finance Manager.
- Perubahan transaksi approved dapat memerlukan approval ulang jika aturan workspace mengharuskan.

### 8.4 Delete Or Archive Transaction Flow

```text
User membuka transaction action menu
-> User memilih Archive/Delete
-> Sistem menampilkan confirmation dialog
-> User confirm
-> Sistem soft delete atau archive transaksi
-> Sistem membuat audit log
-> List dan dashboard diperbarui
```

### 8.5 Transaction List Flow

```text
User membuka /transactions
-> Sistem load transaction table
-> User menggunakan search/filter/sort
-> Sistem update query
-> Table menampilkan hasil sesuai filter
-> User membuka detail atau menjalankan row action
```

### 8.6 Bulk Action Flow

```text
User memilih beberapa row
-> Bulk action bar muncul
-> User memilih bulk categorize/archive/export
-> Sistem cek permission
-> Sistem menampilkan confirmation jika perlu
-> Sistem menjalankan action
-> Sistem mencatat audit log untuk action penting
-> Table diperbarui
```

## 9. Account Flow

### 9.1 Create Account Flow

```text
User membuka /accounts
-> User klik Add Account
-> User mengisi name, type, opening balance, currency, institution
-> User submit
-> Sistem validasi input
-> Sistem membuat account
-> Sistem membuat audit log
-> Account muncul di list dan form transaksi
```

### 9.2 View Account Detail Flow

```text
User membuka account detail
-> Sistem menampilkan current balance
-> Sistem menampilkan account metadata
-> Sistem menampilkan transaction history
-> Sistem menampilkan balance trend
```

### 9.3 Transfer Between Accounts Flow

```text
User klik Transfer
-> User memilih source account
-> User memilih destination account
-> User mengisi amount, date, description
-> Sistem validasi source dan destination
-> Sistem membuat transfer transaction
-> Sistem update balance kedua account
-> Sistem mencatat audit log
```

### Restrictions

- Archived account tidak dapat dipilih untuk transaksi baru.
- User hanya dapat melihat account yang diizinkan role atau account-level permission.
- Opening balance change harus masuk audit log.

## 10. Category Flow

### 10.1 Manage Categories Flow

```text
User membuka /categories
-> Sistem menampilkan category list
-> User membuat atau mengubah category
-> User memilih type, name, color, icon, status
-> Sistem validasi input
-> Sistem menyimpan category
-> Sistem membuat audit log
```

### 10.2 Archive Category Flow

```text
User memilih Archive Category
-> Sistem cek apakah category sudah digunakan transaksi
-> Sistem menampilkan confirmation
-> User confirm
-> Category menjadi archived
-> Category tidak muncul sebagai pilihan default
-> Transaksi lama tetap menampilkan category tersebut
```

### Restrictions

- Locked category hanya dapat diubah oleh Owner atau Admin.
- Category yang sudah digunakan tidak boleh hard delete tanpa migrasi.

## 11. Budget Flow

### 11.1 Create Budget Flow

```text
User membuka /budgets
-> User klik Add Budget
-> User memilih category atau scope budget
-> User mengisi amount, period, start date, end date, threshold
-> User submit
-> Sistem validasi input
-> Sistem membuat budget
-> Sistem menghitung usage dari transaksi expense
-> Budget muncul di dashboard dan budget list
```

### 11.2 Monitor Budget Flow

```text
User membuka dashboard atau /budgets
-> Sistem menghitung budget usage
-> Jika usage melewati threshold: tampilkan warning
-> Jika usage melewati limit: tampilkan exceeded state
-> Sistem membuat notification jika rule aktif
```

### 11.3 Edit Budget Flow

```text
User membuka budget detail
-> User klik Edit
-> Sistem cek permission
-> User mengubah amount, period, threshold, atau status
-> Sistem simpan perubahan
-> Sistem membuat audit log
-> Usage dan report diperbarui
```

## 12. Reports Flow

### 12.1 View Report Flow

```text
User membuka /reports
-> Sistem menampilkan report overview
-> User memilih report type
-> User memilih date range dan grouping
-> Sistem load chart dan table
-> User membaca insight finansial
```

### Report Types

- Income summary.
- Expense summary.
- Cash flow.
- Expense by category.
- Income by category.
- Account balance trend.
- Budget vs actual.
- Transaction detail.

### 12.2 Saved View Flow

```text
User mengatur filter report
-> User klik Save View
-> User memberi nama saved view
-> User memilih private atau shared
-> Sistem cek permission untuk shared view
-> Sistem menyimpan saved view
-> Saved view muncul di menu
```

### 12.3 Export Report Flow

```text
User membuka report
-> User mengatur filter
-> User klik Export
-> User memilih CSV atau PDF
-> Sistem cek permission
-> Sistem membuat export job
-> User mendapat notification saat export siap
-> Sistem mencatat audit log
```

### Restrictions

- Viewer dapat melihat report tetapi tidak selalu dapat export.
- Export harus mengikuti filter aktif.
- Shared saved view hanya dapat dibuat role tertentu.

## 13. Import Flow

### 13.1 CSV Import Flow

```text
User membuka /imports
-> User download CSV template atau upload file
-> Sistem membaca file
-> User melakukan column mapping
-> Sistem menampilkan preview
-> Sistem menandai row valid dan invalid
-> User memperbaiki mapping atau file jika perlu
-> User confirm import
-> Sistem membuat import job
-> Sistem membuat transaksi dari row valid
-> Sistem membuat import history dan audit log
```

### Import States

- Waiting for upload.
- Mapping columns.
- Validating rows.
- Ready to import.
- Processing.
- Completed.
- Completed with errors.
- Failed.

### Error Handling

- File format tidak valid.
- Kolom wajib tidak ditemukan.
- Amount invalid.
- Account/category tidak dikenali.
- Date invalid.
- User tidak memiliki permission.

## 14. Export Flow

### 14.1 Export Transactions Flow

```text
User membuka transaction list
-> User mengatur filter
-> User klik Export
-> Sistem cek permission
-> Sistem membuat export job
-> Jika file kecil: download langsung
-> Jika file besar: proses background
-> User mendapat notification saat file siap
-> Sistem mencatat audit log
```

### 14.2 Export Audit Log Flow

```text
Owner/Admin membuka audit log
-> User mengatur filter
-> User klik Export
-> Sistem cek permission
-> Sistem membuat export job
-> File tersedia untuk diunduh
-> Sistem mencatat audit log
```

## 15. Approval Flow

### 15.1 Approver Flow

```text
Approver menerima notification
-> Approver membuka /approvals
-> Sistem menampilkan approval queue
-> Approver membuka transaction detail
-> Approver review amount, account, category, notes, attachment, dan audit context
-> Approver memilih Approve atau Reject
```

### Approve Branch

```text
Approver klik Approve
-> Sistem cek permission
-> Sistem cek self-approval rule
-> Status transaksi menjadi approved
-> Dashboard/report diperbarui
-> Submitter menerima notification
-> Audit log tercatat
```

### Reject Branch

```text
Approver klik Reject
-> Sistem meminta rejection reason
-> Approver submit reason
-> Status transaksi menjadi rejected
-> Submitter menerima notification
-> Audit log tercatat
```

### Restrictions

- Finance Staff tidak dapat approve.
- User tidak dapat approve transaksi sendiri jika self-approval prevention aktif.
- Rejection reason wajib diisi.

## 16. Audit Trail Flow

### 16.1 View Audit Log Flow

```text
Owner/Admin membuka /audit-logs
-> Sistem menampilkan activity table
-> User filter by actor, action, entity, date range
-> User membuka audit detail
-> Sistem menampilkan before/after values
```

### 16.2 Entity Audit Flow

```text
User membuka transaction detail
-> Jika memiliki permission: user melihat audit timeline
-> User membuka audit item
-> Sistem menampilkan detail perubahan
```

### Restrictions

- Viewer dan Finance Staff tidak dapat melihat audit log kecuali diberi permission khusus.
- Audit log tidak dapat diubah melalui UI.
- Audit log tetap tersedia walau user dinonaktifkan.

## 17. Search And Saved Views Flow

### 17.1 Global Search Flow

```text
User membuka global search dari header
-> User mengetik keyword
-> Sistem mencari transaksi, account, category, report
-> Sistem menampilkan hasil sesuai permission
-> User memilih hasil
-> Sistem membuka detail atau halaman terkait
```

### 17.2 Filter Flow

```text
User membuka transaction/report table
-> User memilih filter
-> Sistem update URL query
-> Sistem request data sesuai filter
-> Table/chart diperbarui
-> User dapat reset filter
```

### 17.3 Saved View Flow

```text
User membuat kombinasi filter
-> User klik Save View
-> User memberi nama
-> User memilih private/shared
-> Sistem cek permission
-> Saved view tersimpan
-> User dapat membukanya kembali
```

## 18. Notification Flow

### 18.1 Notification Center Flow

```text
User melihat notification badge di header
-> User klik notification button
-> Sistem menampilkan notification list
-> User membuka notification
-> Sistem arahkan ke detail terkait
-> Notification menjadi read
```

### Notification Sources

- Budget threshold reached.
- Budget exceeded.
- Transaction needs approval.
- Transaction approved.
- Transaction rejected.
- Import completed.
- Import failed.
- Export ready.
- Workspace invitation.

## 19. Workspace And Member Flow

### 19.1 Switch Workspace Flow

```text
User klik workspace switcher
-> Sistem menampilkan workspace list
-> User memilih workspace
-> Sistem mengubah active workspace
-> Sistem load role dan permission untuk workspace tersebut
-> Dashboard dan seluruh data berubah mengikuti workspace aktif
```

### 19.2 Invite Member Flow

```text
Owner/Admin membuka /settings/members
-> User klik Invite Member
-> User mengisi email dan role
-> Sistem mengirim invitation
-> Invitation muncul sebagai pending
-> Invited user menerima link
```

### 19.3 Change Member Role Flow

```text
Owner/Admin membuka member list
-> User memilih member
-> User mengubah role
-> Sistem cek permission
-> Sistem simpan role baru
-> Sistem membuat audit log
-> Permission member berubah
```

### Restrictions

- User tidak dapat menghapus Owner terakhir.
- User tidak dapat menaikkan role di atas izin miliknya sendiri.
- Deactivated member tidak dapat login, tetapi audit history tetap ada.

## 20. Settings Flow

### 20.1 Profile Settings Flow

```text
User membuka /settings/profile
-> User mengubah nama, avatar, timezone, currency, date format
-> User save
-> Sistem menyimpan preference
-> UI langsung mengikuti preference baru
```

### 20.2 Workspace Settings Flow

```text
Owner/Admin membuka /settings/workspace
-> User mengubah workspace name, logo, default currency, timezone, fiscal period
-> Sistem validasi input
-> Sistem menyimpan setting
-> Sistem membuat audit log
```

### 20.3 Approval Rule Settings Flow

```text
Owner/Admin membuka /settings/approval-rules
-> User menentukan threshold dan self-approval rule
-> User save
-> Sistem menyimpan rule
-> Transaksi baru mengikuti rule terbaru
```

## 21. Permission-Based Flow Differences

| Flow | Owner/Admin | Finance Manager | Finance Staff | Viewer |
| --- | --- | --- | --- | --- |
| View dashboard | Full | Full | Full or scoped | Read-only |
| Create transaction | Yes | Yes | Yes | No |
| Edit approved transaction | Yes | Yes | No | No |
| Approve transaction | Yes | Yes | No | No |
| Manage workspace | Yes | No | No | No |
| Manage members | Yes | No | No | No |
| Manage account | Yes | Yes | Limited/No | No |
| Manage budget | Yes | Yes | No | No |
| View report | Yes | Yes | Yes | Yes |
| Export report | Yes | Yes | Limited | No/Limited |
| View audit log | Yes | Limited | No | No |

## 22. Common Error And Recovery Flow

### Form Validation Error

```text
User submit form
-> Sistem menemukan field invalid
-> Field menampilkan error message
-> Submit dibatalkan
-> User memperbaiki input
-> User submit ulang
```

### Permission Error

```text
User mencoba aksi terbatas
-> Sistem menolak action
-> UI menampilkan pesan permission
-> User diarahkan kembali atau action disembunyikan
```

### Data Load Error

```text
Halaman request data
-> Request gagal
-> Widget/page menampilkan error state
-> User klik Retry
-> Sistem request ulang
```

### Empty Data

```text
Halaman tidak memiliki data
-> Sistem menampilkan empty state
-> Sistem menampilkan CTA sesuai permission
-> Jika user read-only: tampilkan penjelasan tanpa CTA mutasi
```

## 23. Primary Daily Usage Flow

Flow penggunaan harian yang paling umum:

```text
Login
-> Dashboard
-> Review balance, income, expense, cash flow
-> Check alerts
-> Add transaction
-> Review recent transactions
-> Check budget usage
-> Open report if needed
-> Logout or continue monitoring
```

Untuk Finance Manager:

```text
Login
-> Dashboard
-> Open approval queue
-> Review pending transactions
-> Approve/reject
-> Check reports
-> Export report if needed
```

Untuk Owner/Admin:

```text
Login
-> Dashboard
-> Review workspace finance health
-> Check audit or activity if needed
-> Manage members/settings
-> Review reports/export
```

## 24. Recommended Navigation Order

Urutan navigasi yang disarankan di sidebar:

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

Navigation item enterprise seperti Approvals, Imports/Exports, dan Audit Logs dapat disembunyikan jika user tidak memiliki permission.

## 25. Flow Acceptance Criteria

User flow dianggap baik jika:

- User baru memahami langkah pertama saat belum ada data.
- User dapat mencapai dashboard utama setelah login tanpa kebingungan.
- User dapat membuat transaksi dari dashboard atau transaction page.
- User dapat menelusuri transaksi dari dashboard, table, report, atau global search.
- User memahami status transaksi: draft, pending, approved, rejected, void.
- User dengan role read-only tidak melihat action mutasi yang tidak bisa digunakan.
- User enterprise dapat menjalankan approval, audit, import/export, dan member management secara jelas.
- Error, empty, loading, success, dan permission state tersedia pada flow utama.
- Workspace aktif selalu terlihat agar user tidak salah membaca atau menginput data.

## 26. Kesimpulan

User flow Finance Dashboard NextJS dirancang agar pengguna dapat bergerak dari login ke pemahaman kondisi finansial dengan cepat, lalu melakukan tindakan seperti mencatat transaksi, mengelola account/category/budget, membaca report, dan menjalankan workflow enterprise.

Flow utama harus tetap sederhana untuk penggunaan harian, tetapi cukup kuat untuk kebutuhan organisasi melalui workspace, role-based access, approval workflow, audit trail, import/export, notifications, dan settings yang jelas.
