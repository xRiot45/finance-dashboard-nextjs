# Finance Dashboard NextJS - Typography System

## 1. Ringkasan

Typography system ini mengatur penggunaan font, ukuran, berat, line height, dan hierarchy teks untuk Finance Dashboard NextJS. Tujuannya adalah memastikan seluruh UI tetap konsisten, mudah dibaca, rapi, dan cocok untuk dashboard finance yang berisi banyak angka, tabel, status, filter, form, dan report.

Typography pada dashboard finance harus mendukung:

- Pembacaan angka yang cepat.
- Table yang padat tetapi tetap nyaman.
- Label dan metadata yang jelas.
- Hierarchy halaman yang tidak berlebihan.
- Konsistensi antara light mode dan dark mode.
- Penggunaan font yang stabil di seluruh fitur.

## 2. Font Family

Project saat ini menggunakan font dari `app/layout.tsx`:

| Font | Variable | Penggunaan |
| --- | --- | --- |
| Geist | `--font-sans` | Font utama seluruh UI. |
| Geist Mono | `--font-mono` | ID, angka teknis, timestamp, code, audit detail. |
| Merriweather | `--font-serif` | Tersedia, tetapi tidak direkomendasikan untuk UI dashboard utama. |

### 2.1 Primary Font

Gunakan **Geist Sans** untuk:

- Page title.
- Section title.
- Card title.
- Body text.
- Table text.
- Form label.
- Button label.
- Badge label.
- Navigation item.

### 2.2 Monospace Font

Gunakan **Geist Mono** secara terbatas untuk:

- Transaction ID.
- Audit log ID.
- API/job ID.
- Timestamp teknis.
- Code atau CSV mapping preview.
- Short technical metadata.

Jangan gunakan Geist Mono untuk seluruh amount atau seluruh table kecuali ada alasan kuat. Untuk amount finance, Geist Sans sudah cukup dan lebih nyaman dibaca.

### 2.3 Serif Font

Merriweather tidak digunakan untuk dashboard utama. Gunakan hanya jika ada halaman editorial khusus seperti dokumentasi publik, artikel, atau report naratif panjang.

## 3. Typography Principles

### 3.1 Functional Hierarchy

Ukuran teks harus membantu user memahami struktur halaman. Jangan membuat teks besar hanya untuk efek visual.

### 3.2 Finance Readability

Amount, date, status, category, dan account harus mudah dibaca saat discan cepat.

### 3.3 Compact But Comfortable

Dashboard enterprise membutuhkan density yang baik. Gunakan ukuran 14px sebagai default, 12px untuk metadata, dan ukuran lebih besar hanya untuk metric penting.

### 3.4 No Marketing Hero In App UI

Jangan gunakan hero-scale typography pada dashboard, table, form, settings, atau modal.

### 3.5 Consistent Weight

Gunakan weight terbatas:

- `400` untuk body.
- `500` untuk label dan button.
- `600` untuk heading dan value penting.

Hindari terlalu banyak variasi weight.

## 4. Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use |
| --- | --- | --- | --- | --- | --- |
| `display` | 40px | 600 | 48px | `-0.02em` max | Empty state besar atau overview khusus. |
| `page-title` | 28-32px | 600 | 36-40px | `0` | Judul halaman utama. |
| `section-title` | 20px | 600 | 28px | `0` | Judul section atau panel besar. |
| `card-title` | 14-16px | 500-600 | 20-24px | `0` | Judul card, chart, table panel. |
| `metric-value` | 24-32px | 600 | 32-40px | `0` | Nilai utama metric card. |
| `metric-label` | 12-14px | 500 | 16-20px | `0` | Label metric card. |
| `body` | 14px | 400 | 20px | `0` | Text default, table cell, description pendek. |
| `body-strong` | 14px | 500 | 20px | `0` | Text yang perlu emphasis. |
| `caption` | 12px | 400 | 16px | `0` | Metadata, helper text, timestamp. |
| `label` | 12-14px | 500 | 16-20px | `0` | Form label, filter label, badge. |
| `button` | 14px | 500 | 20px | `0` | Button text. |
| `mono` | 12-14px | 400-500 | 16-20px | `0` | ID, code, audit technical value. |

## 5. Page Typography

### 5.1 Page Title

Gunakan untuk judul utama halaman:

```text
Transactions
Dashboard
Reports
Workspace Settings
```

Rules:

- Size: 28-32px desktop.
- Size: 24-28px mobile.
- Weight: 600.
- Line height: 36-40px.
- Jangan memakai page title di dalam card.

### 5.2 Page Description

Deskripsi halaman bersifat optional.

Rules:

- Size: 14px.
- Weight: 400.
- Color: muted foreground.
- Maksimal 1-2 baris.
- Jangan mengulang informasi yang sudah jelas dari judul.

### 5.3 Section Title

Gunakan untuk section seperti:

- Cash Flow.
- Recent Transactions.
- Budget Usage.
- Members.
- Approval Queue.

Rules:

- Size: 18-20px.
- Weight: 600.
- Line height: 28px.
- Jangan terlalu besar agar page tetap compact.

## 6. Dashboard Metric Typography

Metric cards adalah area yang paling sering discan.

### 6.1 Metric Label

Rules:

- Size: 12-14px.
- Weight: 500.
- Color: muted foreground.
- Gunakan label singkat.

Contoh:

```text
Total Balance
Monthly Income
Monthly Expense
Net Cash Flow
```

### 6.2 Metric Value

Rules:

- Size: 24-32px.
- Weight: 600.
- Line height: 32-40px.
- Amount harus mudah dibaca.
- Jangan gunakan ukuran yang membuat card terlalu tinggi.

Contoh:

```text
$42,500.00
-$3,240.50
```

### 6.3 Metric Trend

Rules:

- Size: 12px.
- Weight: 400 atau 500.
- Gunakan color semantic jika perlu.
- Sertakan teks konteks, bukan hanya angka.

Contoh:

```text
+8.2% from last month
-3.1% from previous period
```

## 7. Table Typography

Table harus padat dan mudah discan.

### 7.1 Table Header

Rules:

- Size: 12px.
- Weight: 500 atau 600.
- Line height: 16px.
- Color: muted foreground.
- Gunakan capitalization yang konsisten.
- Jangan memakai uppercase penuh untuk semua header jika mengurangi keterbacaan.

### 7.2 Table Cell

Rules:

- Size: 14px.
- Weight: 400.
- Line height: 20px.
- Text utama harus jelas.
- Metadata di cell memakai 12px.

### 7.3 Amount Cell

Rules:

- Size: 14px.
- Weight: 500 atau 600 jika perlu emphasis.
- Align right.
- Gunakan tabular number jika tersedia.
- Jangan hanya mengandalkan warna untuk income/expense.

Rekomendasi class:

```text
font-medium tabular-nums text-right
```

### 7.4 Date Cell

Rules:

- Size: 13-14px.
- Weight: 400.
- Format konsisten.
- Timestamp detail dapat memakai caption 12px.

### 7.5 Table Metadata

Gunakan 12px untuk:

- Transaction ID.
- Created by.
- Updated at.
- Import row note.
- Audit hint.

## 8. Form Typography

### 8.1 Form Label

Rules:

- Size: 14px.
- Weight: 500.
- Line height: 20px.
- Label harus jelas.

### 8.2 Input Text

Rules:

- Size: 14px.
- Weight: 400.
- Line height: 20px.
- Placeholder memakai muted foreground.

### 8.3 Helper Text

Rules:

- Size: 12px.
- Weight: 400.
- Line height: 16px.
- Color: muted foreground.
- Gunakan hanya jika membantu.

### 8.4 Validation Error

Rules:

- Size: 12px.
- Weight: 400 atau 500.
- Line height: 16px.
- Color: destructive.
- Tampil dekat field terkait.

Contoh:

```text
Amount wajib lebih besar dari 0.
Pilih account untuk transaksi ini.
```

## 9. Button Typography

Rules:

- Size: 14px.
- Weight: 500.
- Line height: 20px.
- Jangan gunakan uppercase penuh.
- Label harus berupa action verb.

Contoh:

```text
Add Transaction
Create Budget
Export CSV
Invite Member
Approve
Reject
```

Untuk button kecil di toolbar:

- Size: 13-14px.
- Weight: 500.

## 10. Badge Typography

Badge digunakan untuk status dan role.

Rules:

- Size: 12px.
- Weight: 500.
- Line height: 16px.
- Label harus singkat.
- Jangan hanya memakai icon/dot.

Contoh:

```text
Pending
Approved
Rejected
Income
Expense
Owner
Viewer
```

## 11. Navigation Typography

### 11.1 Sidebar Item

Rules:

- Size: 14px.
- Weight: 400 default.
- Weight: 500 untuk active item.
- Line height: 20px.

### 11.2 Header Controls

Rules:

- Workspace name: 14px, weight 500.
- User email/name: 13-14px.
- Notification count: 11-12px.

### 11.3 Breadcrumb

Rules:

- Size: 13-14px.
- Weight: 400.
- Current page dapat weight 500.
- Gunakan muted color untuk parent item.

## 12. Chart Typography

Chart text harus mendukung data, bukan mendominasi.

| Element | Size | Weight | Notes |
| --- | --- | --- | --- |
| Chart title | 14-16px | 500-600 | Sama seperti card title. |
| Axis label | 11-12px | 400 | Muted color. |
| Tooltip label | 12px | 500 | Label series. |
| Tooltip value | 13-14px | 500 | Gunakan tabular numbers. |
| Legend | 12px | 400-500 | Jangan terlalu besar. |

Rules:

- Tooltip amount harus mudah dibaca.
- Axis label jangan terlalu ramai.
- Jangan gunakan text kecil di bawah 11px.

## 13. Empty State Typography

Empty state harus jelas dan membantu.

### 13.1 Empty State Title

Rules:

- Size: 16-20px.
- Weight: 600.
- Line height: 24-28px.

### 13.2 Empty State Description

Rules:

- Size: 14px.
- Weight: 400.
- Line height: 20px.
- Color: muted foreground.
- Maksimal 2 baris.

Contoh:

```text
Belum ada transaksi
Tambahkan transaksi pertama atau import file CSV untuk mulai melihat laporan.
```

## 14. Dialog And Modal Typography

### 14.1 Dialog Title

Rules:

- Size: 18-20px.
- Weight: 600.
- Line height: 28px.

### 14.2 Dialog Description

Rules:

- Size: 14px.
- Weight: 400.
- Line height: 20px.
- Color: muted foreground.

### 14.3 Destructive Dialog

Untuk delete/archive/reject:

- Title harus jelas.
- Description harus menjelaskan dampak.
- Jangan memakai teks panjang yang sulit discan.

## 15. Audit And Technical Typography

Audit log membutuhkan typography yang lebih teknis.

Gunakan Geist Mono untuk:

- Audit ID.
- Entity ID.
- Request ID.
- Timestamp teknis.
- Before/after raw value.

Rules:

- Mono size: 12-13px.
- Jangan memakai mono untuk seluruh paragraf.
- Before/after value harus mudah dibandingkan.
- Gunakan line height 16-20px.

## 16. Responsive Typography

### 16.1 Mobile

Rules:

- Page title turun ke 24-28px.
- Metric value turun ke 24-28px.
- Body tetap 14px.
- Caption tetap 12px.
- Jangan mengecilkan table text di bawah 12px.
- Jangan scale font berdasarkan viewport width.

### 16.2 Desktop

Rules:

- Page title 28-32px.
- Metric value 28-32px.
- Table cell 14px.
- Section title 18-20px.

### 16.3 Wide Desktop

Rules:

- Jangan memperbesar typography hanya karena layar lebar.
- Gunakan container/layout untuk mengatur ruang, bukan font scaling.

## 17. Line Length

Line length ideal:

- Body description: 60-90 characters per line.
- Form helper text: pendek, maksimal 1-2 baris.
- Empty state description: maksimal 2 baris.
- Table cell: truncate jika terlalu panjang.

Rules:

- Description panjang harus dipisah menjadi paragraf atau list.
- Table description panjang harus memakai truncate + tooltip/detail.

## 18. Number Typography

Finance dashboard banyak menampilkan angka.

Rules:

- Gunakan `tabular-nums` untuk amount, percentage, dan table numeric columns.
- Amount di table rata kanan.
- Amount metric boleh rata kiri di card.
- Negative amount harus memiliki tanda minus.
- Currency harus konsisten.
- Decimal harus konsisten sesuai format currency.

Contoh:

```text
$42,500.00
-$1,250.75
8.2%
```

## 19. Copy Hierarchy

Gunakan hierarchy berikut:

```text
Page Title
Page Description
Section Title
Card Title
Body / Table Text
Caption / Metadata
```

Jangan lompat langsung dari body text ke display text di dalam dashboard.

## 20. Typography In Feature-Based Architecture

Karena project memakai Feature-Based Architecture:

- Typography pattern halaman diterapkan di `features/*/screens/`.
- Komponen domain seperti `MetricCard`, `TransactionsTable`, dan `BudgetUsageBar` menyimpan typography behavior spesifik fitur.
- Primitive typography class dapat berada di shared component jika benar-benar reusable.
- Jangan membuat style typography berbeda-beda per feature tanpa alasan.

Contoh:

```text
features/dashboard/components/metric-card.tsx
features/transactions/components/transactions-table.tsx
features/reports/components/report-chart.tsx
```

## 21. Tailwind Class Recommendations

Gunakan kombinasi class yang konsisten.

### Page Title

```text
text-2xl font-semibold leading-8
```

Desktop larger:

```text
md:text-3xl md:leading-10
```

### Section Title

```text
text-xl font-semibold leading-7
```

### Body

```text
text-sm leading-5
```

### Caption

```text
text-xs leading-4 text-muted-foreground
```

### Metric Value

```text
text-2xl font-semibold leading-8 tabular-nums
```

### Table Amount

```text
text-sm font-medium tabular-nums text-right
```

### Badge

```text
text-xs font-medium leading-4
```

## 22. Typography Anti-Patterns

Jangan lakukan:

- Menggunakan banyak font family di dashboard.
- Menggunakan Merriweather untuk table atau form.
- Menggunakan hero-size heading untuk card.
- Mengecilkan table text sampai sulit dibaca.
- Memakai uppercase penuh untuk semua label.
- Mengandalkan bold untuk semua hierarchy.
- Menggunakan mono font untuk seluruh dashboard.
- Mengubah ukuran font per fitur tanpa aturan.
- Memakai negative letter spacing pada body/table text.
- Membuat button label terlalu panjang.

## 23. Typography Review Checklist

Sebelum UI dianggap selesai, cek:

- Apakah font utama menggunakan Geist Sans?
- Apakah mono hanya dipakai untuk konten teknis?
- Apakah page title tidak terlalu besar?
- Apakah metric value mudah dibaca?
- Apakah table cell tetap nyaman di 14px?
- Apakah amount memakai tabular numbers?
- Apakah form label dan error jelas?
- Apakah badge text terbaca?
- Apakah mobile tidak mengecilkan font terlalu jauh?
- Apakah hierarchy text konsisten antar halaman?
- Apakah tidak ada font/size acak per fitur?

## 24. Kesimpulan

Typography system Finance Dashboard NextJS harus membantu pengguna membaca data finance dengan cepat dan percaya diri. Geist Sans menjadi fondasi utama, Geist Mono dipakai terbatas untuk konten teknis, dan type scale dijaga agar dashboard tetap compact, rapi, dan enterprise-ready.

Dengan aturan ini, UI akan tetap konsisten saat fitur seperti transactions, reports, budgets, approval, audit log, import/export, dan settings semakin kompleks.
