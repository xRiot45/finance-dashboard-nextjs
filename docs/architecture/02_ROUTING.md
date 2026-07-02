# Routing Architecture

Dokumen ini mendefinisikan standar routing untuk Finance Dashboard NextJS agar struktur URL, route group, layout, proteksi akses, dan integrasi dengan Feature-Based Architecture tetap konsisten dari awal pengembangan sampai skala enterprise.

Finance Dashboard menggunakan pendekatan **Thin App Router**:

- Folder `app/` hanya bertanggung jawab untuk routing, layout, metadata, loading, error boundary, not-found, dan API route.
- Folder `features/` menjadi tempat utama untuk screen, komponen domain, hook, service, schema, type, dan logic fitur.
- Route file seperti `app/(dashboard)/transactions/page.tsx` tidak boleh berisi business logic kompleks.
- Setiap halaman route harus memanggil screen dari feature terkait.

Contoh pola route yang benar:

```tsx
import { TransactionsPage } from "@/features/transactions"

export default function Page() {
  return <TransactionsPage />
}
```

---

## 1. Tujuan Routing

Routing harus membantu user memahami posisi mereka di dalam dashboard dan membantu developer menjaga struktur aplikasi tetap mudah dirawat.

Tujuan utama:

- Membuat URL yang stabil, deskriptif, dan mudah dibagikan.
- Memisahkan route publik, route dashboard, dan API route secara jelas.
- Menjaga folder `app/` tetap tipis dan bebas dari logic domain.
- Menyediakan pola route yang konsisten untuk list, create, detail, edit, report, settings, import, export, approval, dan audit.
- Mendukung enterprise concern seperti authorization, workspace scoping, auditability, dan deep link.
- Membuat loading, error, empty state, dan not-found bisa diprediksi di setiap route.

---

## 2. Prinsip Utama

### 2.1 App Folder Hanya Untuk Routing

Folder `app/` tidak menjadi tempat implementasi fitur.

Yang boleh ada di `app/`:

- `layout.tsx`
- `page.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `route.ts`
- `template.tsx` jika benar-benar diperlukan
- `metadata` atau konfigurasi route-level

Yang tidak boleh ditempatkan langsung di `app/`:

- Komponen domain kompleks
- Table transaction
- Chart dashboard
- Form budget
- Logic permission
- Logic kalkulasi finance
- Schema validasi domain
- Dummy data fitur
- Service fetching domain

### 2.2 Feature Menjadi Pemilik Screen

Setiap route page harus menunjuk ke screen yang ada di folder `features`.

Contoh:

| Route File | Feature Screen |
|---|---|
| `app/(dashboard)/dashboard/page.tsx` | `features/dashboard/screens/dashboard-page.tsx` |
| `app/(dashboard)/transactions/page.tsx` | `features/transactions/screens/transactions-page.tsx` |
| `app/(dashboard)/transactions/new/page.tsx` | `features/transactions/screens/create-transaction-page.tsx` |
| `app/(dashboard)/transactions/[transactionId]/page.tsx` | `features/transactions/screens/transaction-detail-page.tsx` |
| `app/(dashboard)/reports/cash-flow/page.tsx` | `features/reports/screens/cash-flow-report-page.tsx` |
| `app/(dashboard)/settings/members/page.tsx` | `features/settings/screens/members-settings-page.tsx` |

### 2.3 URL Harus Stabil

URL adalah bagian dari product contract. Jangan sering mengganti URL setelah digunakan oleh user, bookmark, email, export, atau integrasi eksternal.

Aturan URL:

- Gunakan `kebab-case`.
- Gunakan resource plural untuk entity utama.
- Gunakan nama entity yang jelas.
- Gunakan action route yang konsisten seperti `new` dan `edit`.
- Jangan menggunakan singkatan yang sulit dipahami.
- Jangan membuat URL berdasarkan istilah internal codebase.

Contoh benar:

```txt
/transactions
/transactions/new
/transactions/[transactionId]
/transactions/[transactionId]/edit
/reports/cash-flow
/settings/approval-rules
```

Contoh yang harus dihindari:

```txt
/trx
/transaction-create
/finance-data-v2
/settings/ar
/reports/cf
```

---

## 3. Route Group

Finance Dashboard menggunakan route group agar struktur route lebih rapi tanpa menambah segment URL.

Route group utama:

| Route Group | Fungsi | Proteksi |
|---|---|---|
| `app/(auth)` | Halaman autentikasi dan onboarding awal | Guest atau public |
| `app/(dashboard)` | Semua halaman utama aplikasi setelah login | Authenticated |
| `app/api` | API route internal aplikasi | Authenticated sesuai endpoint |

Route group tidak muncul di URL. Contoh `app/(dashboard)/transactions/page.tsx` menghasilkan URL `/transactions`, bukan `/(dashboard)/transactions`.

---

## 4. Struktur Routing Yang Direkomendasikan

Struktur berikut menjadi acuan implementasi routing enterprise-ready.

```txt
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── not-found.tsx
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   └── invitation/
│       └── [invitationToken]/
│           └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
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
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [accountId]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   ├── categories/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [categoryId]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   ├── budgets/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [budgetId]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   ├── reports/
│   │   ├── page.tsx
│   │   ├── income/
│   │   │   └── page.tsx
│   │   ├── expenses/
│   │   │   └── page.tsx
│   │   ├── cash-flow/
│   │   │   └── page.tsx
│   │   ├── budgets/
│   │   │   └── page.tsx
│   │   └── transactions/
│   │       └── page.tsx
│   ├── approvals/
│   │   ├── page.tsx
│   │   └── [approvalId]/
│   │       └── page.tsx
│   ├── imports/
│   │   ├── page.tsx
│   │   └── [importJobId]/
│   │       └── page.tsx
│   ├── exports/
│   │   ├── page.tsx
│   │   └── [exportJobId]/
│   │       └── page.tsx
│   ├── audit-logs/
│   │   ├── page.tsx
│   │   └── [auditLogId]/
│   │       └── page.tsx
│   ├── notifications/
│   │   └── page.tsx
│   └── settings/
│       ├── page.tsx
│       ├── profile/
│       │   └── page.tsx
│       ├── workspace/
│       │   └── page.tsx
│       ├── members/
│       │   └── page.tsx
│       ├── roles/
│       │   └── page.tsx
│       ├── approval-rules/
│       │   └── page.tsx
│       ├── notifications/
│       │   └── page.tsx
│       ├── security/
│       │   └── page.tsx
│       └── billing/
│           └── page.tsx
└── api/
    ├── transactions/
    │   ├── route.ts
    │   └── [transactionId]/
    │       └── route.ts
    ├── accounts/
    │   ├── route.ts
    │   └── [accountId]/
    │       └── route.ts
    ├── budgets/
    │   ├── route.ts
    │   └── [budgetId]/
    │       └── route.ts
    ├── reports/
    │   └── route.ts
    ├── imports/
    │   ├── route.ts
    │   └── [importJobId]/
    │       └── route.ts
    └── exports/
        ├── route.ts
        └── [exportJobId]/
            └── route.ts
```

---

## 5. Route Sitemap

### 5.1 Public Dan Auth Routes

| URL | Halaman | Fungsi |
|---|---|---|
| `/login` | Login | Masuk ke dashboard |
| `/register` | Register | Membuat akun atau workspace baru |
| `/forgot-password` | Forgot Password | Memulai reset password |
| `/invitation/[invitationToken]` | Invitation | Menerima undangan workspace |

Jika user sudah login dan membuka route auth, arahkan ke `/dashboard`.

### 5.2 Dashboard Routes

| URL | Halaman | Fungsi |
|---|---|---|
| `/dashboard` | Dashboard Overview | Ringkasan performa finance |
| `/transactions` | Transactions List | Melihat, filter, sort, dan export transaksi |
| `/transactions/new` | Create Transaction | Membuat transaksi baru |
| `/transactions/[transactionId]` | Transaction Detail | Melihat detail transaksi |
| `/transactions/[transactionId]/edit` | Edit Transaction | Mengubah transaksi |
| `/accounts` | Accounts List | Mengelola rekening, wallet, bank, dan cash account |
| `/accounts/new` | Create Account | Membuat account baru |
| `/accounts/[accountId]` | Account Detail | Melihat detail dan histori account |
| `/accounts/[accountId]/edit` | Edit Account | Mengubah account |
| `/categories` | Categories List | Mengelola kategori pemasukan dan pengeluaran |
| `/categories/new` | Create Category | Membuat kategori baru |
| `/categories/[categoryId]` | Category Detail | Melihat detail kategori |
| `/categories/[categoryId]/edit` | Edit Category | Mengubah kategori |
| `/budgets` | Budgets List | Melihat dan mengelola budget |
| `/budgets/new` | Create Budget | Membuat budget baru |
| `/budgets/[budgetId]` | Budget Detail | Melihat performa budget |
| `/budgets/[budgetId]/edit` | Edit Budget | Mengubah budget |
| `/reports` | Reports Hub | Pusat navigasi laporan |
| `/reports/income` | Income Report | Analisis pemasukan |
| `/reports/expenses` | Expense Report | Analisis pengeluaran |
| `/reports/cash-flow` | Cash Flow Report | Analisis arus kas |
| `/reports/budgets` | Budget Report | Analisis budget vs actual |
| `/reports/transactions` | Transaction Report | Laporan transaksi detail |
| `/approvals` | Approval Queue | Queue persetujuan transaksi atau perubahan data |
| `/approvals/[approvalId]` | Approval Detail | Detail item yang perlu disetujui |
| `/imports` | Import Center | Upload dan validasi data import |
| `/imports/[importJobId]` | Import Detail | Status, error, dan hasil import |
| `/exports` | Export Center | Melihat riwayat export |
| `/exports/[exportJobId]` | Export Detail | Status dan hasil export |
| `/audit-logs` | Audit Logs | Melihat riwayat aktivitas penting |
| `/audit-logs/[auditLogId]` | Audit Log Detail | Detail event audit |
| `/notifications` | Notification Center | Daftar notifikasi user |

### 5.3 Settings Routes

| URL | Halaman | Fungsi |
|---|---|---|
| `/settings` | Settings Overview | Ringkasan pengaturan |
| `/settings/profile` | Profile Settings | Mengelola profil user |
| `/settings/workspace` | Workspace Settings | Mengelola profil workspace |
| `/settings/members` | Member Settings | Mengelola anggota workspace |
| `/settings/roles` | Role Settings | Mengelola role dan permission |
| `/settings/approval-rules` | Approval Rules | Mengatur aturan approval |
| `/settings/notifications` | Notification Settings | Mengatur preferensi notifikasi |
| `/settings/security` | Security Settings | Mengatur keamanan akun |
| `/settings/billing` | Billing Settings | Mengelola subscription dan billing |

---

## 6. Mapping Route Ke Feature

Setiap route harus punya owner feature yang jelas.

| Area | Routes | Feature Owner |
|---|---|---|
| Auth | `/login`, `/register`, `/forgot-password`, `/invitation/[invitationToken]` | `features/auth` |
| App Shell | Layout dashboard, sidebar, header, breadcrumb | `features/app-shell` |
| Dashboard | `/dashboard` | `features/dashboard` |
| Transactions | `/transactions/**` | `features/transactions` |
| Accounts | `/accounts/**` | `features/accounts` |
| Categories | `/categories/**` | `features/categories` |
| Budgets | `/budgets/**` | `features/budgets` |
| Reports | `/reports/**` | `features/reports` |
| Approvals | `/approvals/**` | `features/approvals` |
| Imports | `/imports/**` | `features/imports` |
| Exports | `/exports/**` | `features/exports` |
| Audit Logs | `/audit-logs/**` | `features/audit-logs` |
| Notifications | `/notifications` | `features/notifications` |
| Settings | `/settings/**` | `features/settings` |

---

## 7. Root Route Dan Redirect

Route `/` harus menjadi entry point yang jelas.

Aturan yang direkomendasikan:

- Jika user belum login, arahkan ke `/login`.
- Jika user sudah login, arahkan ke `/dashboard`.
- Jika aplikasi nanti memiliki public landing page, landing page boleh berada di `/`, tetapi dashboard tetap harus tersedia di `/dashboard`.

Aturan redirect:

| Kondisi | Redirect |
|---|---|
| Guest membuka `/` | `/login` |
| Authenticated user membuka `/` | `/dashboard` |
| Guest membuka dashboard route | `/login?next=<current-path>` |
| Authenticated user membuka `/login` | `/dashboard` |
| Authenticated user membuka `/register` | `/dashboard` |
| User tidak punya permission | Tampilkan forbidden state atau redirect ke route aman |
| Entity tidak ditemukan | Tampilkan `not-found` |

Parameter `next` digunakan agar user bisa kembali ke halaman tujuan setelah login.

Contoh:

```txt
/login?next=/transactions/txn_123
```

---

## 8. Layout Routing

### 8.1 Root Layout

`app/layout.tsx` bertanggung jawab untuk:

- HTML shell.
- Font global.
- Global stylesheet.
- Theme provider.
- Toast provider.
- Tooltip provider.
- Provider global lain yang tidak spesifik ke dashboard.

Root layout tidak boleh berisi sidebar dashboard atau logic domain finance.

### 8.2 Auth Layout

`app/(auth)/layout.tsx` digunakan untuk halaman login, register, forgot password, dan invitation.

Karakter layout:

- Minimal.
- Tanpa sidebar.
- Tanpa dashboard navigation.
- Fokus pada form autentikasi.
- Bisa memiliki brand area sederhana.

### 8.3 Dashboard Layout

`app/(dashboard)/layout.tsx` digunakan untuk semua route utama setelah login.

Tanggung jawab:

- Memastikan user authenticated.
- Menyediakan dashboard shell.
- Menampilkan sidebar.
- Menampilkan topbar.
- Menampilkan workspace switcher.
- Menampilkan breadcrumb.
- Menyediakan layout responsive.
- Menyediakan permission-aware navigation.

Implementasi UI dashboard shell tetap berada di `features/app-shell`, bukan langsung di route layout.

Contoh pola:

```tsx
import { DashboardShell } from "@/features/app-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
```

---

## 9. Dynamic Route

Dynamic route harus menggunakan nama parameter yang spesifik.

Aturan:

- Gunakan `[transactionId]`, bukan `[id]`.
- Gunakan `[accountId]`, bukan `[account]`.
- Gunakan `[budgetId]`, bukan `[slug]` jika nilainya memang ID.
- Gunakan `[invitationToken]` untuk token invitation.
- Gunakan `[importJobId]` dan `[exportJobId]` untuk job asynchronous.

Standar parameter:

| Entity | Dynamic Segment |
|---|---|
| Transaction | `[transactionId]` |
| Account | `[accountId]` |
| Category | `[categoryId]` |
| Budget | `[budgetId]` |
| Approval | `[approvalId]` |
| Import Job | `[importJobId]` |
| Export Job | `[exportJobId]` |
| Audit Log | `[auditLogId]` |
| Invitation | `[invitationToken]` |

Contoh route:

```txt
/transactions/[transactionId]
/accounts/[accountId]/edit
/imports/[importJobId]
/audit-logs/[auditLogId]
```

---

## 10. Query Parameter

Query parameter digunakan untuk state yang perlu bisa dibagikan, di-bookmark, atau dipulihkan saat halaman di-refresh.

### 10.1 List Page Query

Standar query untuk halaman list:

| Query | Fungsi | Contoh |
|---|---|---|
| `page` | Nomor halaman | `page=2` |
| `limit` | Jumlah item per halaman | `limit=25` |
| `query` | Search keyword | `query=rent` |
| `sort` | Kolom sorting | `sort=date` |
| `direction` | Arah sorting | `direction=desc` |
| `status` | Filter status | `status=approved` |
| `type` | Filter tipe finance | `type=expense` |
| `from` | Tanggal mulai | `from=2026-01-01` |
| `to` | Tanggal akhir | `to=2026-01-31` |
| `accountId` | Filter account | `accountId=acc_123` |
| `categoryId` | Filter kategori | `categoryId=cat_123` |
| `createdBy` | Filter pembuat | `createdBy=user_123` |

Contoh:

```txt
/transactions?query=rent&type=expense&status=approved&page=2
/audit-logs?action=transaction.updated&createdBy=user_123&page=1
```

### 10.2 Report Query

Standar query untuk laporan:

| Query | Fungsi | Contoh |
|---|---|---|
| `from` | Periode awal | `from=2026-01-01` |
| `to` | Periode akhir | `to=2026-03-31` |
| `groupBy` | Pengelompokan data | `groupBy=month` |
| `accountId` | Filter account | `accountId=acc_123` |
| `categoryId` | Filter kategori | `categoryId=cat_123` |
| `currency` | Currency tampilan | `currency=IDR` |
| `compareTo` | Periode pembanding | `compareTo=previous-period` |

Contoh:

```txt
/reports/cash-flow?from=2026-01-01&to=2026-03-31&groupBy=month
/reports/budgets?from=2026-01-01&to=2026-01-31&compareTo=previous-period
```

### 10.3 State Yang Tidak Perlu Di URL

State UI yang bersifat sementara tidak perlu dimasukkan ke URL.

Contoh:

- Dropdown terbuka atau tertutup.
- Tooltip aktif.
- Hover state.
- Tab internal kecil yang tidak memengaruhi makna halaman.
- Dialog konfirmasi delete.
- Popover filter yang sedang terbuka.
- Row yang sedang di-hover.

Jika state memengaruhi hasil data, bisa dibagikan, atau penting untuk audit workflow, simpan di URL.

---

## 11. Route Protection Dan Authorization

Route protection dilakukan dalam beberapa lapisan.

Lapisan proteksi:

| Lapisan | Fungsi |
|---|---|
| Middleware atau route guard | Mencegah guest masuk ke dashboard |
| Dashboard layout | Memastikan session dan workspace aktif tersedia |
| Feature screen | Menyesuaikan UI berdasarkan permission |
| API route atau server action | Menegakkan authorization sebenarnya |
| Database/service layer | Memastikan data selalu scoped ke workspace |

UI boleh menyembunyikan menu, tetapi keamanan tidak boleh bergantung hanya pada UI.

### 11.1 Permission Route Matrix

| Route | Owner | Admin | Finance Manager | Finance Staff | Viewer |
|---|---:|---:|---:|---:|---:|
| `/dashboard` | Yes | Yes | Yes | Yes | Yes |
| `/transactions` | Yes | Yes | Yes | Yes | Yes |
| `/transactions/new` | Yes | Yes | Yes | Yes | No |
| `/transactions/[transactionId]/edit` | Yes | Yes | Conditional | Conditional | No |
| `/accounts` | Yes | Yes | Yes | Yes | Yes |
| `/accounts/new` | Yes | Yes | Yes | Conditional | No |
| `/categories` | Yes | Yes | Yes | Yes | Yes |
| `/budgets` | Yes | Yes | Yes | Conditional | View Only |
| `/reports/**` | Yes | Yes | Yes | Yes | Yes |
| `/approvals` | Yes | Yes | Yes | No | No |
| `/imports` | Yes | Yes | Yes | Conditional | No |
| `/exports` | Yes | Yes | Yes | Conditional | Conditional |
| `/audit-logs` | Yes | Yes | Yes | No | No |
| `/settings/members` | Yes | Yes | No | No | No |
| `/settings/roles` | Yes | Yes | No | No | No |
| `/settings/approval-rules` | Yes | Yes | Yes | No | No |
| `/settings/billing` | Yes | Admin Billing | No | No | No |

`Conditional` berarti akses bergantung pada policy workspace, status data, ownership, approval state, atau konfigurasi role.

### 11.2 Forbidden State

Jika user authenticated tetapi tidak memiliki akses, tampilkan forbidden state yang jelas.

Forbidden state harus:

- Menjelaskan bahwa user tidak memiliki akses.
- Tidak membocorkan data sensitif.
- Memberikan aksi aman seperti kembali ke dashboard.
- Tidak menggunakan pesan teknis seperti `403 error` sebagai satu-satunya copy.

---

## 12. Workspace Routing

Untuk MVP, workspace aktif direkomendasikan disimpan di session atau application state, bukan selalu menjadi segment URL.

Pola MVP:

```txt
/dashboard
/transactions
/reports/cash-flow
```

Semua data tetap wajib di-scope berdasarkan `activeWorkspaceId` di server.

Enterprise option jika dibutuhkan untuk multi-workspace deep link:

```txt
/workspaces/[workspaceId]/dashboard
/workspaces/[workspaceId]/transactions
```

Rekomendasi awal:

- Gunakan URL tanpa workspace segment untuk menjaga URL sederhana.
- Tampilkan active workspace di dashboard shell.
- Saat user mengganti workspace, invalidasi data dan arahkan ke route yang aman seperti `/dashboard`.
- Pastikan semua API dan query data selalu menerima atau membaca `workspaceId` dari session terpercaya.
- Evaluasi workspace segment jika kebutuhan share link lintas workspace semakin kuat.

Aturan penting:

- Jangan percaya `workspaceId` dari client tanpa validasi membership.
- Jangan menampilkan data antar workspace dalam route yang sama.
- Jangan menyimpan workspace hanya di local storage tanpa validasi server.

---

## 13. Navigation Dan Breadcrumb

### 13.1 Navigation Config

Konfigurasi navigasi utama sebaiknya berada di feature app shell.

Lokasi rekomendasi:

```txt
features/app-shell/constants/navigation-items.ts
```

Navigation item minimal berisi:

```ts
type NavigationItem = {
  title: string
  href: string
  icon: React.ComponentType
  permission?: string
  children?: NavigationItem[]
}
```

Navigation harus:

- Permission-aware.
- Menggunakan icon Lucide yang konsisten.
- Menggunakan label yang sama dengan halaman.
- Menandai active route dengan jelas.
- Mendukung collapse sidebar.
- Mendukung nested settings atau reports jika diperlukan.

### 13.2 Breadcrumb

Breadcrumb digunakan untuk halaman detail, edit, settings, reports, import detail, export detail, dan audit detail.

Contoh:

```txt
Dashboard / Transactions / TRX-2026-0001
Dashboard / Transactions / TRX-2026-0001 / Edit
Dashboard / Reports / Cash Flow
Dashboard / Settings / Members
Dashboard / Imports / IMP-2026-0004
```

Aturan breadcrumb:

- Root label dashboard adalah `Dashboard`.
- Gunakan label manusiawi, bukan raw ID jika display name tersedia.
- Untuk detail entity, gunakan nomor referensi atau nama entity.
- Untuk edit page, breadcrumb terakhir adalah `Edit`.
- Breadcrumb tidak menggantikan page title.

---

## 14. Loading, Error, Empty, Dan Not Found

### 14.1 Loading

Gunakan `loading.tsx` untuk route-level loading state.

Route-level loading cocok untuk:

- Perpindahan halaman.
- Fetch awal halaman.
- Detail entity.
- Report besar.

Feature-level loading cocok untuk:

- Chart tertentu.
- Table tertentu.
- Widget metric tertentu.
- Background refresh.

### 14.2 Error

Gunakan `error.tsx` untuk menangkap error route-level.

Error state harus:

- Memberikan pesan yang bisa dipahami user.
- Menyediakan retry action jika aman.
- Tidak menampilkan stack trace.
- Mencatat error ke observability ketika fitur monitoring tersedia.

### 14.3 Empty State

Empty state bukan error.

Contoh empty state:

- Belum ada transaksi.
- Belum ada budget aktif.
- Filter tidak menghasilkan data.
- Belum ada riwayat import.

Empty state harus berada di feature screen karena konteksnya spesifik fitur.

### 14.4 Not Found

Gunakan `not-found.tsx` atau `notFound()` saat entity tidak ditemukan.

Contoh:

- `/transactions/txn_unknown`
- `/accounts/acc_unknown`
- `/imports/job_unknown`

Untuk data sensitif, route boleh menampilkan not-found daripada forbidden jika produk ingin menghindari kebocoran keberadaan data. Namun keputusan ini harus konsisten dengan policy security.

---

## 15. Metadata

Metadata route digunakan untuk title dan description halaman.

Standar title:

| Route | Title |
|---|---|
| `/dashboard` | `Dashboard` |
| `/transactions` | `Transactions` |
| `/transactions/new` | `Create Transaction` |
| `/transactions/[transactionId]` | `Transaction Detail` |
| `/reports/cash-flow` | `Cash Flow Report` |
| `/settings/members` | `Members Settings` |

Format title browser yang direkomendasikan:

```txt
Transactions | Finance Dashboard
```

Jika metadata membutuhkan data dinamis, route boleh mengambil data minimum yang diperlukan untuk title. Business logic detail tetap berada di feature atau service.

---

## 16. API Route Convention

API route berada di `app/api`.

Aturan:

- Gunakan resource plural.
- Gunakan dynamic segment spesifik.
- Validasi request body dan query.
- Terapkan auth dan workspace scoping.
- Terapkan permission check.
- Return response shape yang konsisten.
- Jangan meletakkan logic domain panjang di `route.ts`; panggil service dari feature atau shared server module.

Contoh:

```txt
app/api/transactions/route.ts
app/api/transactions/[transactionId]/route.ts
app/api/accounts/route.ts
app/api/reports/route.ts
app/api/imports/[importJobId]/route.ts
```

Contoh mapping HTTP method:

| Method | Endpoint | Fungsi |
|---|---|---|
| `GET` | `/api/transactions` | List transaksi |
| `POST` | `/api/transactions` | Membuat transaksi |
| `GET` | `/api/transactions/[transactionId]` | Detail transaksi |
| `PATCH` | `/api/transactions/[transactionId]` | Update transaksi |
| `DELETE` | `/api/transactions/[transactionId]` | Delete atau archive transaksi |

---

## 17. Route Naming Convention

### 17.1 Resource Route

Gunakan plural noun:

```txt
/transactions
/accounts
/categories
/budgets
/reports
/approvals
/imports
/exports
/audit-logs
/notifications
/settings
```

### 17.2 Action Route

Gunakan action segment yang singkat dan konsisten.

| Action | Route Segment |
|---|---|
| Create | `new` |
| Edit | `edit` |
| Detail | `[entityId]` |
| List | resource root |

Contoh:

```txt
/budgets/new
/budgets/[budgetId]
/budgets/[budgetId]/edit
```

### 17.3 Report Route

Report route menggunakan nama laporan, bukan nama chart.

Benar:

```txt
/reports/cash-flow
/reports/income
/reports/expenses
/reports/budgets
```

Hindari:

```txt
/reports/line-chart
/reports/chart-1
/reports/analytics-v2
```

---

## 18. Modal Route Dan Drawer

Untuk tahap awal, create, detail, dan edit direkomendasikan menggunakan route halaman penuh agar:

- Deep link mudah.
- Refresh browser aman.
- Permission dan audit lebih jelas.
- Mobile lebih stabil.
- Form panjang lebih nyaman.

Dialog atau drawer boleh digunakan untuk aksi ringan seperti:

- Confirm delete.
- Quick filter.
- Quick preview.
- Export confirmation.
- Assign category sederhana.

Jika nanti membutuhkan modal route, pastikan:

- URL tetap bermakna.
- Back button browser bekerja dengan benar.
- Focus management aman.
- Direct access ke URL tetap menghasilkan halaman yang valid.

---

## 19. Enterprise Routing Concern

### 19.1 Deep Link

Setiap halaman penting harus bisa dibuka langsung lewat URL.

Wajib mendukung deep link untuk:

- Transaction detail.
- Account detail.
- Budget detail.
- Report dengan filter periode.
- Import job detail.
- Export job detail.
- Approval detail.
- Audit log detail.

### 19.2 Auditability

Route yang memicu perubahan data harus mudah ditelusuri.

Contoh:

- Create transaction dari `/transactions/new`.
- Edit transaction dari `/transactions/[transactionId]/edit`.
- Approve item dari `/approvals/[approvalId]`.
- Import data dari `/imports`.

Event audit harus menyimpan konteks yang cukup, tetapi tidak harus menyimpan URL sebagai satu-satunya sumber kebenaran.

### 19.3 Back Button Behavior

Back button browser harus terasa natural.

Aturan:

- Filter yang mengubah hasil data boleh update URL.
- Perpindahan page list harus update URL.
- Membuka detail page harus push route baru.
- Menutup popover tidak perlu mengubah URL.
- Setelah create berhasil, arahkan ke detail entity atau kembali ke list dengan toast.

### 19.4 URL Shareability

URL yang dibagikan harus membuka state yang relevan.

Contoh:

```txt
/transactions?status=pending&type=expense&from=2026-01-01&to=2026-01-31
/reports/cash-flow?from=2026-01-01&to=2026-03-31&groupBy=month
```

Jika user penerima link tidak punya akses, tampilkan forbidden atau not-found sesuai policy.

---

## 20. Implementasi Route Page

Route page harus sederhana.

Contoh list page:

```tsx
import { TransactionsPage } from "@/features/transactions"

export default function Page() {
  return <TransactionsPage />
}
```

Contoh detail page:

```tsx
import { TransactionDetailPage } from "@/features/transactions"

type PageProps = {
  params: Promise<{
    transactionId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { transactionId } = await params

  return <TransactionDetailPage transactionId={transactionId} />
}
```

Contoh query page:

```tsx
import { TransactionsPage } from "@/features/transactions"

type PageProps = {
  searchParams: Promise<{
    page?: string
    query?: string
    status?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const filters = await searchParams

  return <TransactionsPage filters={filters} />
}
```

Catatan:

- Parsing dan normalisasi query detail sebaiknya dilakukan di feature schema atau helper feature.
- Route boleh meneruskan raw params jika feature sudah memiliki parser yang jelas.
- Route tidak boleh melakukan kalkulasi finance atau transformasi data besar.

---

## 21. Integrasi Dengan Feature-Based Architecture

Routing harus mengikuti dependency direction.

Aturan import:

```txt
app -> features -> shared
```

`app/` boleh import dari:

- `features/<feature>`
- `shared/components`
- `shared/lib`
- `shared/providers`
- `shared/config`

`features/` tidak boleh import dari `app/`.

Contoh benar:

```tsx
// app/(dashboard)/transactions/page.tsx
import { TransactionsPage } from "@/features/transactions"
```

Contoh yang harus dihindari:

```tsx
// features/transactions/components/transaction-table.tsx
import { metadata } from "@/app/(dashboard)/transactions/page"
```

---

## 22. Anti-Pattern Routing

Hindari pola berikut:

- Menaruh semua page di root `app/` tanpa route group.
- Membuat route file berisi ratusan baris logic UI dan data fetching.
- Menggunakan `[id]` untuk semua dynamic route.
- Menggunakan URL singkatan yang sulit dipahami.
- Menggunakan query parameter untuk state visual kecil.
- Menyimpan filter penting hanya di local state sehingga tidak bisa dibagikan.
- Mengandalkan hide/show menu sebagai satu-satunya security control.
- Membuat route `/dashboard/transactions` jika struktur produk sudah memilih `/transactions`.
- Menduplikasi screen logic antara `app/` dan `features/`.
- Membuat route baru tanpa memperbarui navigation dan breadcrumb.
- Membuat settings terlalu dalam seperti `/settings/workspace/general/profile/name`.

---

## 23. Checklist Routing

Gunakan checklist ini saat menambah route baru.

| Checklist | Status |
|---|---|
| Route menggunakan `kebab-case` | Required |
| Route berada di route group yang benar | Required |
| Route file tetap tipis | Required |
| Screen utama berada di `features` | Required |
| Dynamic segment spesifik, bukan `[id]` generik | Required |
| Query parameter hanya untuk state yang shareable | Required |
| Route sudah masuk navigation jika perlu | Required |
| Breadcrumb sudah didefinisikan untuk detail/edit page | Required |
| Permission route sudah jelas | Required |
| Loading, error, empty, dan not-found dipertimbangkan | Required |
| API route terkait mengikuti pola resource plural | Required jika ada API |
| Workspace scoping diterapkan di server | Required untuk data workspace |
| URL tidak membocorkan data sensitif | Required |

---

## 24. Ringkasan Keputusan

Keputusan routing utama untuk Finance Dashboard:

- Gunakan Next.js App Router dengan Feature-Based Architecture.
- `app/` hanya routing dan layout.
- `features/` menjadi pemilik screen dan logic fitur.
- Gunakan route group `(auth)` dan `(dashboard)`.
- Dashboard utama berada di `/dashboard`.
- Feature utama berada di root URL seperti `/transactions`, `/accounts`, `/budgets`, dan `/reports`.
- Gunakan dynamic segment spesifik seperti `[transactionId]`.
- Gunakan query parameter untuk filter, sorting, pagination, dan periode report.
- Terapkan route protection di layout, feature, API, dan service layer.
- Untuk MVP, workspace aktif tidak perlu menjadi segment URL.
- Semua route enterprise penting harus mendukung deep link, permission, loading, error, empty, dan not-found.
