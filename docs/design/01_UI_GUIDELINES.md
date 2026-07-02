# Finance Dashboard NextJS - UI Guidelines

## 1. Ringkasan

Dokumen ini berisi panduan praktis untuk membangun antarmuka Finance Dashboard NextJS berdasarkan design system yang sudah ditentukan. Jika design system menjelaskan fondasi visual, maka UI guidelines ini menjelaskan cara menerapkannya pada halaman, komponen, state, dan workflow dashboard.

Tujuan utama:

- Menjaga UI konsisten di semua fitur.
- Membuat dashboard finance mudah dibaca dan digunakan.
- Menghindari desain yang terlalu dekoratif atau marketing-heavy.
- Memastikan semua fitur enterprise memiliki pola UI yang jelas.
- Memberikan aturan konkret untuk page layout, table, form, card, chart, navigation, dan state.

## 2. Prinsip UI Utama

### 2.1 Data Harus Paling Menonjol

Angka, status, tanggal, kategori, account, dan trend harus lebih mudah ditemukan daripada elemen dekoratif.

### 2.2 Satu Halaman, Satu Tujuan Utama

Setiap halaman harus punya tujuan yang jelas:

- Dashboard: memahami kondisi finance.
- Transactions: mencari dan mengelola transaksi.
- Accounts: melihat sumber dana dan saldo.
- Budgets: mengontrol batas pengeluaran.
- Reports: menganalisis performa finance.
- Settings: mengatur preferensi dan workspace.

### 2.3 UI Harus Tenang

Gunakan neutral palette, hairline border, dan spacing yang rapi. Hindari visual yang terlalu ramai, gradient besar, shadow berat, dan warna berlebihan.

### 2.4 Enterprise Actions Harus Jelas

Action seperti approve, reject, archive, delete, import, export, invite member, dan change role harus mudah dipahami dan memiliki confirmation jika berdampak besar.

## 3. Page Layout Guidelines

### 3.1 Struktur Halaman Standar

Gunakan pola berikut untuk halaman utama:

```text
Page Header
Toolbar / Filter optional
Main Content
Pagination / Footer Action optional
```

### 3.2 Page Header

Page header harus berisi:

- Judul halaman.
- Deskripsi singkat jika perlu.
- Primary action di kanan pada desktop.
- Primary action di bawah judul pada mobile jika ruang sempit.

Contoh:

```text
Transactions                         [Add Transaction]
Track income, expenses, transfers, and adjustments.
```

Rules:

- Judul halaman jangan terlalu besar.
- Deskripsi hanya digunakan jika membantu.
- Jangan menaruh lebih dari satu primary button.
- Secondary actions seperti Export atau Import masuk ke button secondary/menu.

### 3.3 Content Width

- Main dashboard content boleh full width dalam container aplikasi.
- Table dan chart harus memiliki ruang cukup.
- Jangan membuat content melebar tanpa batas di layar wide.
- Gunakan padding page 24-32px desktop dan 16px mobile.

### 3.4 Section Spacing

- Gap antar section: 24px.
- Gap antar card dalam grid: 16px.
- Gap header ke content: 16-24px.
- Gap form field: 16px.

## 4. Navigation Guidelines

### 4.1 Sidebar

Sidebar digunakan sebagai navigasi utama dashboard.

Urutan item:

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

Rules:

- Item aktif harus jelas.
- Item yang tidak boleh diakses user sebaiknya disembunyikan.
- Gunakan icon familiar dari `lucide-react`.
- Label tetap ditampilkan pada desktop.
- Mobile sidebar menjadi drawer.

### 4.2 Header

Header dashboard dapat berisi:

- Workspace switcher.
- Global search.
- Notification button.
- Theme toggle.
- User menu.

Rules:

- Workspace aktif harus selalu terlihat.
- Jangan menaruh terlalu banyak action di header.
- Header harus tetap rendah dan fungsional, bukan hero.

### 4.3 Breadcrumb

Gunakan breadcrumb untuk:

- Detail page.
- Edit page.
- Nested settings.
- Audit detail.

Contoh:

```text
Transactions > TXN-001 > Edit
Settings > Members
Reports > Cash Flow
```

## 5. Dashboard Guidelines

### 5.1 Dashboard Hierarchy

Urutan konten dashboard:

1. Page header dan period filter.
2. Metric cards.
3. Cash flow chart.
4. Budget usage dan category breakdown.
5. Recent transactions.
6. Alerts atau insights.

### 5.2 Metric Cards

Metric card harus berisi:

- Label.
- Nilai utama.
- Trend atau comparison optional.
- Icon kecil optional.
- Context periode.

Contoh:

```text
Total Balance
$42,500.00
+8.2% from last month
```

Rules:

- Nilai metric harus paling menonjol.
- Gunakan warna trend secara hemat.
- Jangan membuat card terlalu tinggi.
- Jangan menampilkan chart mini jika tidak membantu.
- Semua metric harus punya loading skeleton.

### 5.3 Recent Transactions

Recent transactions di dashboard harus:

- Menampilkan transaksi terbaru secukupnya.
- Memiliki link ke halaman transactions.
- Row dapat diklik ke detail.
- Status dan amount harus mudah dibaca.

## 6. Table Guidelines

Table adalah komponen paling penting untuk finance dashboard.

### 6.1 Table Structure

Table harus memiliki:

- Header.
- Toolbar search/filter.
- Column labels.
- Rows.
- Row actions.
- Pagination.
- Empty state.
- Loading state.
- Error state.

### 6.2 Column Rules

Untuk transaction table, urutan kolom disarankan:

```text
Date
Description
Type
Category
Account
Status
Amount
Actions
```

Rules:

- Amount rata kanan.
- Date konsisten formatnya.
- Status menggunakan badge.
- Type boleh memakai badge atau label.
- Action berada di kolom paling kanan.
- Kolom yang kurang penting bisa disembunyikan di mobile.

### 6.3 Row Interaction

- Row hover harus subtle.
- Selected row harus jelas.
- Row click membuka detail jika tidak konflik dengan checkbox/action.
- Row actions memakai menu dengan icon `MoreHorizontal`.

### 6.4 Bulk Actions

Bulk action bar muncul setelah user memilih row.

Bulk actions:

- Categorize.
- Archive.
- Export.
- Submit for approval.

Rules:

- Tampilkan jumlah item yang dipilih.
- Action destructive harus confirmation.
- Action yang tidak boleh dilakukan role tertentu harus disabled atau disembunyikan.

### 6.5 Empty Table

Empty state table harus menjelaskan situasi.

Contoh:

- "Belum ada transaksi."
- "Tidak ada hasil untuk filter ini."
- "Tidak ada approval yang menunggu."

CTA hanya muncul jika user punya permission.

## 7. Form Guidelines

### 7.1 Form Layout

Gunakan form 1 column untuk mobile dan 1-2 column untuk desktop jika field banyak.

Rules:

- Label wajib jelas.
- Helper text hanya jika diperlukan.
- Error tampil dekat field.
- Required field harus jelas.
- Submit button berada di bawah form atau sticky footer untuk form panjang.

### 7.2 Transaction Form

Field utama:

```text
Type
Amount
Account
Category
Date
Description
Notes optional
Attachment optional
```

Rules:

- Amount harus cepat diisi.
- Currency harus terlihat.
- Account dan category sebaiknya searchable.
- Date default dapat memakai hari ini.
- Type memengaruhi field yang muncul.
- Transfer membutuhkan source dan destination account.

### 7.3 Validation

Validation message harus:

- Spesifik.
- Dekat dengan field.
- Tidak menyalahkan user.
- Menggunakan bahasa sederhana.

Contoh:

- "Amount wajib lebih besar dari 0."
- "Pilih account untuk transaksi ini."
- "Tanggal transaksi wajib diisi."

### 7.4 Unsaved Changes

Untuk form panjang atau data penting:

- Tampilkan warning saat user meninggalkan halaman dengan perubahan yang belum disimpan.
- Jangan tampilkan warning untuk form kecil yang kosong.

## 8. Button And Action Guidelines

### 8.1 Primary Action

Primary action digunakan untuk aksi utama halaman:

- Add Transaction.
- Save.
- Invite Member.
- Create Budget.
- Import CSV.

Rules:

- Satu halaman atau section utama hanya punya satu primary action.
- Jangan pakai primary untuk action sekunder.

### 8.2 Secondary Action

Secondary action digunakan untuk:

- Export.
- Download template.
- Reset filter.
- Cancel.

### 8.3 Destructive Action

Destructive action digunakan untuk:

- Delete.
- Archive.
- Reject.
- Remove member.
- Void transaction.

Rules:

- Gunakan variant destructive.
- Wajib confirmation untuk action permanen atau berdampak besar.
- Jelaskan dampaknya dalam confirmation dialog.

### 8.4 Icon Button

Icon button harus:

- Memiliki tooltip jika maknanya tidak jelas.
- Memiliki accessible label.
- Menggunakan icon familiar.
- Tidak dipakai untuk action utama yang butuh label jelas.

## 9. Filter And Search Guidelines

### 9.1 Search

Search digunakan untuk:

- Transaction description.
- Account name.
- Category name.
- Report saved view.
- Audit log actor/action.

Rules:

- Search input berada di toolbar.
- Placeholder harus menjelaskan scope.
- Gunakan debounce jika terhubung ke server.
- Tampilkan empty state jika tidak ada hasil.

### 9.2 Filters

Filter umum:

- Date range.
- Type.
- Status.
- Account.
- Category.
- Amount range.
- Created by.

Rules:

- Filter aktif harus terlihat.
- User dapat clear satu filter.
- User dapat reset semua filter.
- Filter state sebaiknya masuk URL query untuk list/report penting.

### 9.3 Saved Views

Saved view digunakan untuk kombinasi filter yang sering dipakai.

Rules:

- Beri nama saved view yang jelas.
- Private/shared harus dibedakan.
- Shared view hanya untuk role yang berwenang.

## 10. Chart Guidelines

### 10.1 Chart Usage

Gunakan chart hanya jika membantu analisis.

Chart utama:

- Income vs expense.
- Expense by category.
- Budget usage.
- Account balance trend.
- Budget vs actual.

### 10.2 Chart Layout

- Chart berada dalam card/panel.
- Judul chart harus menjelaskan isi.
- Tooltip wajib tersedia.
- Empty state wajib tersedia.
- Legend hanya jika ada lebih dari satu series.

### 10.3 Chart Color

- Gunakan blue untuk series utama.
- Gunakan amber untuk warning/budget.
- Gunakan red untuk exceeded/rejected.
- Gunakan neutral untuk comparison/baseline.
- Jangan gunakan terlalu banyak warna dalam satu chart.

## 11. Badge And Status Guidelines

### 11.1 Transaction Status

| Status | UI Treatment |
| --- | --- |
| Draft | Neutral badge. |
| Pending | Warning badge. |
| Approved | Positive badge. |
| Rejected | Destructive badge. |
| Void | Muted badge. |

### 11.2 Job Status

| Status | UI Treatment |
| --- | --- |
| Processing | Pending badge + spinner optional. |
| Completed | Positive badge. |
| Completed with errors | Warning badge. |
| Failed | Destructive badge. |

### 11.3 Badge Rules

- Badge harus punya text.
- Jangan hanya mengandalkan warna.
- Badge tidak boleh terlalu besar.
- Badge harus terbaca di table.

## 12. Empty, Loading, Error, Success Guidelines

### 12.1 Loading

Gunakan skeleton yang menyerupai struktur konten.

Contoh:

- Metric card skeleton.
- Table row skeleton.
- Chart skeleton.
- Form field skeleton.

### 12.2 Empty

Empty state harus berisi:

- Judul singkat.
- Deskripsi yang membantu.
- CTA jika user punya permission.

### 12.3 Error

Error state harus berisi:

- Pesan aman.
- Penjelasan singkat.
- Retry action jika memungkinkan.

Jangan tampilkan stack trace atau error teknis mentah.

### 12.4 Success

Success feedback:

- Toast untuk aksi cepat.
- Inline success untuk form/settings.
- Notification untuk export/import background.

## 13. Permission And Role-Based UI

### 13.1 Visibility Rules

- Sembunyikan action yang user jelas tidak boleh lakukan.
- Disable action jika user perlu tahu action ada tetapi tidak tersedia karena status.
- Tampilkan pesan permission jika user membuka direct link tanpa akses.

### 13.2 Examples

- Viewer tidak melihat Add Transaction.
- Finance Staff tidak melihat Approve button.
- Audit Logs tidak muncul untuk user tanpa permission.
- Export audit log hanya terlihat untuk Owner/Admin.

### 13.3 Permission Denied State

Permission denied page/section harus:

- Menjelaskan bahwa user tidak punya akses.
- Tidak membocorkan data.
- Memberi opsi kembali ke dashboard.

## 14. Approval Workflow UI

### 14.1 Approval Queue

Approval queue harus seperti table/list kerja:

- Transaction.
- Submitted by.
- Amount.
- Date.
- Status.
- Actions.

### 14.2 Approval Detail

Approval detail harus menampilkan:

- Semua field transaksi penting.
- Notes dan attachment.
- History/audit context jika tersedia.
- Approve dan Reject action.

### 14.3 Reject Flow

Reject wajib meminta reason.

Rules:

- Reason field required.
- Jelaskan bahwa submitter akan melihat reason.
- Setelah reject, status berubah jelas.

## 15. Import And Export UI

### 15.1 Import Flow UI

Import harus bertahap:

```text
Upload File
Map Columns
Preview Data
Validate Rows
Confirm Import
Import Result
```

Rules:

- Jangan langsung memasukkan data setelah upload.
- Tampilkan jumlah row valid dan invalid.
- Tampilkan error per row.
- Berikan opsi download error report.

### 15.2 Export Flow UI

Export harus:

- Mengikuti filter aktif.
- Menjelaskan format file.
- Memberi feedback proses.
- Memberi notification saat file siap jika async.

## 16. Audit Log UI

Audit log harus terasa seperti alat investigasi.

Harus tersedia:

- Filter actor.
- Filter action.
- Filter entity.
- Date range.
- Activity table.
- Detail before/after values.

Rules:

- Jangan membuat audit diff terlalu dekoratif.
- Gunakan monospace untuk ID dan nilai teknis.
- Tampilkan timestamp konsisten.
- Jangan izinkan edit audit log dari UI.

## 17. Notification UI

Notification harus:

- Memiliki unread indicator.
- Mengarah ke entity terkait.
- Dapat ditandai read.
- Menggunakan tone sesuai severity.

Jenis notifikasi:

- Budget warning.
- Approval needed.
- Transaction approved/rejected.
- Import completed/failed.
- Export ready.
- Invitation.

## 18. Settings UI

Settings harus dibagi menjadi section yang jelas:

```text
Profile
Workspace
Members
Roles
Preferences
Approval Rules
Notifications
Security
```

Rules:

- Gunakan settings navigation.
- Form settings jangan terlalu lebar.
- Perubahan penting butuh confirmation atau audit note.
- Danger zone harus dipisah secara visual.

## 19. Mobile Guidelines

Mobile UI harus:

- Menggunakan single-column layout.
- Sidebar menjadi drawer.
- Primary action tetap mudah dijangkau.
- Table dapat berubah menjadi horizontal scroll atau card list.
- Filter dapat masuk sheet.
- Dialog tidak terlalu lebar dan tetap usable.

Rules:

- Jangan mengecilkan table sampai tidak terbaca.
- Jangan memakai font terlalu kecil.
- Touch target minimal 40-44px.

## 20. Dark Mode Guidelines

Dark mode harus:

- Menjaga hierarchy text.
- Menjaga border tetap terlihat.
- Menjaga badge dan chart tetap kontras.
- Menghindari surface yang terlalu mirip satu sama lain.
- Tidak memakai shadow sebagai satu-satunya pembeda elevation.

Periksa halaman berikut di dark mode:

- Dashboard.
- Transaction table.
- Transaction form.
- Reports chart.
- Settings form.
- Dialog confirmation.

## 21. Accessibility Guidelines

Semua UI harus:

- Bisa diakses keyboard.
- Memiliki focus ring.
- Menggunakan label pada form.
- Menggunakan aria-label untuk icon-only button.
- Tidak menyampaikan status hanya lewat warna.
- Memiliki heading hierarchy yang benar.
- Menjaga kontras warna.
- Menampilkan validation error secara jelas.

## 22. Copywriting Guidelines

Gunakan bahasa yang singkat, jelas, dan membantu.

Rules:

- Hindari istilah teknis yang tidak perlu.
- Gunakan action verb pada button.
- Error message harus memberi solusi.
- Empty state harus menjelaskan langkah berikutnya.

Contoh button:

- `Add Transaction`
- `Create Budget`
- `Export CSV`
- `Invite Member`
- `Approve`
- `Reject`

Contoh error:

- "Pilih account sebelum menyimpan transaksi."
- "File CSV memiliki 12 baris yang perlu diperbaiki."
- "Anda tidak memiliki izin untuk membuka audit log."

## 23. Page-Specific Guidelines

### 23.1 Dashboard

- Metric cards di atas.
- Filter periode mudah dijangkau.
- Chart tidak boleh mendominasi semua ruang.
- Recent transactions harus compact.

### 23.2 Transactions

- Search dan filter harus selalu mudah ditemukan.
- Amount rata kanan.
- Status jelas.
- Row action konsisten.
- Create/edit flow harus cepat.

### 23.3 Accounts

- Current balance harus menonjol.
- Account type dan status harus jelas.
- Transaction history mudah ditemukan.

### 23.4 Budgets

- Usage bar harus mudah dipahami.
- Near limit dan exceeded harus jelas.
- Budget period harus terlihat.

### 23.5 Reports

- Date range dan grouping adalah kontrol utama.
- Export harus mengikuti filter aktif.
- Saved view harus mudah ditemukan tetapi tidak mengganggu.

### 23.6 Settings

- Pisahkan personal dan workspace settings.
- Member/role management harus jelas.
- Danger zone tidak boleh dekat dengan action biasa.

## 24. UI Review Checklist

Sebelum UI dianggap selesai, cek:

- Apakah hierarchy halaman jelas?
- Apakah primary action hanya satu?
- Apakah table bisa discan?
- Apakah amount, date, status, dan category mudah dibaca?
- Apakah loading, empty, error, success state tersedia?
- Apakah permission state ditangani?
- Apakah UI responsive?
- Apakah dark mode nyaman?
- Apakah icon-only button punya label?
- Apakah destructive action punya confirmation?
- Apakah warna digunakan untuk fungsi, bukan dekorasi?

## 25. Kesimpulan

UI Finance Dashboard NextJS harus terasa tenang, presisi, dan siap kerja. Setiap halaman harus membantu pengguna memahami data finance dan menjalankan tindakan dengan cepat. Guidelines ini menjadi acuan praktis saat membangun komponen dan screen di dalam `features/`, agar seluruh aplikasi tetap konsisten dengan design system dan siap untuk kebutuhan enterprise.
