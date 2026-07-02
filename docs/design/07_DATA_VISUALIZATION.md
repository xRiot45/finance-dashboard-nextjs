# Finance Dashboard NextJS - Data Visualization

## 1. Ringkasan

Data visualization pada Finance Dashboard NextJS digunakan untuk membantu pengguna memahami kondisi keuangan dengan cepat melalui grafik, trend, perbandingan, dan visual summary.

Tujuan utama grafik:

- Membantu user melihat pola pemasukan dan pengeluaran.
- Membantu user memahami cash flow.
- Membantu user memantau budget usage.
- Membantu user melihat kategori pengeluaran terbesar.
- Membantu user membaca laporan tanpa mengolah data manual.
- Membuat data finance mudah dipahami tanpa visual yang berlebihan.

Grafik harus modern, bersih, informatif, dan tetap konsisten dengan design system: neutral UI, aksen terbatas, hairline border, typography Geist, dan chart colors yang fungsional.

## 2. Visualization Principles

### 2.1 Insight First

Setiap chart harus menjawab pertanyaan bisnis yang jelas.

Contoh:

- Apakah cash flow bulan ini positif?
- Kategori apa yang paling banyak menghabiskan budget?
- Apakah expense meningkat dibanding bulan lalu?
- Account mana yang memiliki saldo terbesar?

### 2.2 Simple Before Complex

Gunakan chart sederhana sebelum chart kompleks. Dashboard finance harus mudah discan, bukan terlihat seperti analytics tool yang berat.

### 2.3 Accurate And Honest

Jangan menggunakan visual yang menyesatkan:

- Jangan memotong axis tanpa alasan.
- Jangan memakai area chart yang membuat perubahan kecil terlihat besar.
- Jangan memakai terlalu banyak warna.
- Jangan memakai pie/donut untuk terlalu banyak kategori.

### 2.4 Context Matters

Angka tanpa konteks kurang berguna. Chart harus memiliki:

- Title.
- Period.
- Tooltip.
- Legend jika lebih dari satu series.
- Empty/loading/error state.

### 2.5 Accessible Visualization

Chart tidak boleh hanya mengandalkan warna. Gunakan label, tooltip, legend, dan format angka yang jelas.

## 3. Chart Library

Project menggunakan:

- `recharts`
- Shadcn UI `Chart` wrapper di `shared/components/ui/chart.tsx`

Komponen utama:

```tsx
ChartContainer
ChartTooltip
ChartTooltipContent
ChartLegend
ChartLegendContent
```

Rules:

- Gunakan Shadcn `Chart` wrapper untuk chart UI.
- Gunakan Recharts sebagai rendering engine.
- Jangan membuat chart custom dari raw SVG kecuali sangat diperlukan.
- Chart config harus memakai token warna dari design system.

## 4. Chart Types By Use Case

| Use Case | Recommended Chart | Notes |
| --- | --- | --- |
| Income vs expense over time | Line chart atau grouped bar chart | Cocok untuk trend bulanan/mingguan. |
| Net cash flow | Bar chart atau area-line hybrid sederhana | Tampilkan positive/negative dengan jelas. |
| Expense by category | Horizontal bar atau donut | Horizontal bar lebih baik untuk banyak kategori. |
| Budget usage | Progress bar atau stacked bar | Jangan gunakan chart kompleks. |
| Budget vs actual | Bar chart | Bandingkan limit dan realisasi. |
| Account balance trend | Line chart | Cocok untuk trend saldo. |
| Account distribution | Bar chart atau donut | Donut hanya jika kategori sedikit. |
| Transaction volume | Bar chart | Jumlah transaksi per periode. |
| Approval status summary | Donut atau stacked bar | Gunakan jika jumlah status sedikit. |
| Import/export job status | Small status chart atau summary cards | Chart optional, badge/table sering lebih baik. |

## 5. Chart Selection Rules

### 5.1 Use Line Chart When

- Data berbasis waktu.
- Fokus pada trend.
- Jumlah series sedikit.

Examples:

- Account balance trend.
- Income trend.
- Expense trend.

### 5.2 Use Bar Chart When

- Membandingkan nilai antar kategori/periode.
- User perlu melihat ranking.
- Label kategori penting.

Examples:

- Expense by category.
- Budget vs actual.
- Monthly income vs expense.

### 5.3 Use Donut Chart When

- Jumlah kategori sedikit.
- Fokus pada proporsi.
- Total value tetap ditampilkan.

Rules:

- Maksimal 5-6 segment.
- Jika kategori lebih banyak, gunakan horizontal bar.

### 5.4 Use Progress When

- Menampilkan usage terhadap limit.
- Data hanya satu target.

Examples:

- Budget usage.
- Import progress.
- Export progress.

## 6. Dashboard Chart Hierarchy

Dashboard utama sebaiknya memiliki chart berikut:

1. **Cash Flow Trend**
   - Income vs expense over time.
   - Chart utama dashboard.

2. **Expense By Category**
   - Menampilkan kategori expense terbesar.
   - Horizontal bar atau donut.

3. **Budget Usage**
   - Progress atau compact bar.
   - Highlight near limit/exceeded.

4. **Recent Transactions**
   - Table lebih cocok daripada chart.

Jangan menampilkan terlalu banyak chart di dashboard. Report page dapat memiliki visualisasi lebih lengkap.

## 7. Report Chart Hierarchy

Reports page dapat menggunakan chart lebih detail:

| Report | Visualization |
| --- | --- |
| Income Report | Line/bar chart + table detail. |
| Expense Report | Bar chart + category breakdown. |
| Cash Flow Report | Line chart + net cash flow bars. |
| Budget Report | Budget vs actual bar chart. |
| Account Report | Account balance trend. |
| Transaction Report | Table-first, chart optional. |

Rules:

- Report chart harus selalu dapat difilter berdasarkan date range.
- Report chart harus memiliki table detail.
- Export mengikuti filter aktif.

## 8. Chart Card Structure

Setiap chart sebaiknya berada dalam card/panel.

```text
Card
├── CardHeader
│   ├── Title
│   ├── Description / Period
│   └── Optional action/filter
├── CardContent
│   └── Chart
└── CardFooter optional
    └── Insight / summary / link
```

### Required Elements

- Chart title.
- Period context.
- Tooltip.
- Empty state.
- Loading state.
- Error state.

### Optional Elements

- Legend.
- Trend summary.
- Export action.
- View report link.
- Comparison note.

## 9. Chart Color System

Gunakan chart tokens dari color system.

| Token | Use |
| --- | --- |
| `--chart-2` | Primary series, main trend. |
| `--chart-1` | Warning, budget threshold. |
| `--chart-3` | Previous period or neutral comparison. |
| `--chart-4` | Grid, baseline, low emphasis. |
| `--chart-5` | Secondary neutral series. |
| `--destructive` | Exceeded, rejected, negative critical. |
| `success` token | Approved, healthy, positive. |

### Recommended Finance Mapping

| Data | Color Role |
| --- | --- |
| Income | Success or primary blue. |
| Expense | Destructive or neutral negative. |
| Transfer | Info/blue. |
| Budget limit | Neutral line or warning. |
| Budget near limit | Warning. |
| Budget exceeded | Destructive. |
| Previous period | Neutral. |
| Forecast/estimated | Dashed neutral. |

Rules:

- Jangan memakai lebih dari 5 warna dalam satu chart.
- Jangan menggunakan warna random per render.
- Warna kategori harus stabil.
- Warna chart harus terbaca di dark mode.

## 10. Chart Typography

| Element | Size | Weight | Notes |
| --- | --- | --- | --- |
| Chart title | 14-16px | 500-600 | Sama dengan card title. |
| Chart description | 12-14px | 400 | Muted foreground. |
| Axis tick | 11-12px | 400 | Muted foreground. |
| Tooltip label | 12px | 500 | Label series/period. |
| Tooltip value | 13-14px | 500 | Gunakan tabular numbers. |
| Legend | 12px | 400-500 | Compact. |

Rules:

- Jangan gunakan font terlalu kecil di axis.
- Amount di tooltip harus diformat sebagai currency.
- Percentage harus konsisten decimal-nya.

## 11. Chart Spacing And Size

| Chart Context | Recommended Height |
| --- | --- |
| Small card chart | 180-220px |
| Dashboard chart | 260-320px |
| Report chart | 320-420px |
| Compact sparkline | 48-80px |

Rules:

- Chart harus punya tinggi stabil.
- Jangan membuat chart terlalu pendek.
- Chart dalam card harus punya padding cukup.
- Tooltip tidak boleh menutupi kontrol penting.

## 12. Tooltip Guidelines

Tooltip wajib membantu user membaca angka.

Tooltip harus menampilkan:

- Label periode/kategori.
- Series name.
- Value yang sudah diformat.
- Currency atau percentage jika relevan.

Contoh:

```text
Mar 2026
Income: $8,420.00
Expense: $5,210.00
Net: $3,210.00
```

Rules:

- Gunakan Shadcn `ChartTooltipContent`.
- Jangan menampilkan raw number tanpa format.
- Jangan menampilkan terlalu banyak series.
- Tooltip harus terbaca di dark mode.

## 13. Legend Guidelines

Gunakan legend jika chart memiliki lebih dari satu series.

Rules:

- Legend harus singkat.
- Legend dapat diletakkan di atas atau bawah chart.
- Jangan gunakan legend jika label sudah jelas dari chart.
- Legend harus memakai warna yang sama dengan series.

## 14. Axis And Grid Guidelines

### Axis

Rules:

- X-axis untuk waktu atau kategori.
- Y-axis untuk amount/count/percentage.
- Format currency pada axis jika cukup ruang.
- Pada mobile, kurangi tick agar tidak bertumpuk.

### Grid

Rules:

- Grid line harus subtle.
- Jangan gunakan grid terlalu tebal.
- Dark mode grid harus terlihat tetapi tidak dominan.

## 15. Data Formatting

Format data sebelum ditampilkan.

| Data | Format |
| --- | --- |
| Currency | `$42,500.00` atau sesuai workspace currency. |
| Percentage | `8.2%` |
| Count | `1,240` |
| Date | `Mar 2026`, `Jan 12`, atau sesuai context. |
| Large number | Compact optional: `$1.2M` untuk chart axis. |

Rules:

- Tooltip boleh lebih detail daripada axis.
- Axis boleh compact, table/report detail harus lengkap.
- Currency mengikuti workspace/user preference.

## 16. Empty, Loading, Error States

### Loading

Gunakan:

- `Skeleton` untuk chart card.
- Fixed height skeleton agar layout tidak lompat.

### Empty

Tampilkan empty state jika data tidak cukup.

Example:

```text
Belum ada data untuk periode ini.
Tambahkan transaksi atau ubah filter periode.
```

### Error

Tampilkan error state yang aman:

```text
Gagal memuat grafik.
Coba lagi.
```

Rules:

- Jangan tampilkan chart kosong tanpa pesan.
- Jangan menampilkan angka nol jika sebenarnya data gagal dimuat.
- Empty dan zero state harus dibedakan.

## 17. Zero State vs Empty State

| State | Meaning | Treatment |
| --- | --- | --- |
| Empty | Tidak ada data. | Empty message + optional CTA. |
| Zero | Ada data, nilainya 0. | Tampilkan 0 secara normal. |
| Error | Data gagal dimuat. | Error message + retry. |
| Loading | Data sedang dimuat. | Skeleton/loading state. |

Contoh:

- Expense bulan ini 0 karena memang belum ada expense: tampilkan `$0.00`.
- Chart gagal request API: tampilkan error, bukan `$0.00`.

## 18. Interaction Guidelines

Chart boleh mendukung:

- Tooltip on hover/tap.
- Period filter.
- Series toggle jika perlu.
- Click-through ke report/detail.

Rules:

- Jangan membuat interaksi chart tersembunyi.
- Clickable chart harus punya affordance.
- Pada mobile, tooltip harus tetap bisa diakses dengan tap.
- Jangan bergantung pada hover-only interaction.

## 19. Responsive Chart Rules

Mobile:

- Chart stack single column.
- Kurangi axis tick.
- Legend boleh pindah ke bawah.
- Tooltip harus tap-friendly.
- Jika chart terlalu kompleks, tampilkan summary card + link ke report.

Tablet:

- 2-column chart grid boleh digunakan.
- Height chart tetap stabil.

Desktop:

- Dashboard dapat memakai 2-column chart row.
- Report chart dapat lebih tinggi.

Wide desktop:

- Jangan memperbesar chart tanpa batas.
- Gunakan max content width jika chart menjadi sulit dibaca.

## 20. Accessibility Guidelines

Chart harus:

- Memiliki title dan description.
- Tidak hanya mengandalkan warna.
- Memiliki tooltip/legend.
- Memiliki table detail untuk report penting.
- Memakai contrast yang cukup.
- Tetap dapat dipahami dalam dark mode.

Jika chart berisi data penting, sediakan alternatif:

- Summary text.
- Data table.
- Export CSV.

## 21. Finance Chart Patterns

### 21.1 Income Vs Expense

Recommended:

- Grouped bar chart untuk comparison per month.
- Line chart untuk trend.

Required:

- Income series.
- Expense series.
- Period label.
- Tooltip currency.

Avoid:

- Stacked chart jika user perlu membandingkan income vs expense secara langsung.

### 21.2 Cash Flow

Recommended:

- Bar chart untuk net value.
- Positive dan negative value harus jelas.

Required:

- Zero line.
- Currency tooltip.
- Period context.

### 21.3 Expense By Category

Recommended:

- Horizontal bar chart untuk banyak kategori.
- Donut chart untuk maksimal 5-6 kategori.

Required:

- Category label.
- Amount.
- Percentage optional.

Avoid:

- Donut dengan terlalu banyak segment.

### 21.4 Budget Usage

Recommended:

- Progress bar.
- Budget vs actual bar.

Required:

- Used amount.
- Limit amount.
- Remaining amount.
- Status: healthy, near limit, exceeded.

### 21.5 Account Balance Trend

Recommended:

- Line chart.

Required:

- Account selector if multiple accounts.
- Period filter.
- Currency tooltip.

## 22. Chart Config Pattern

Gunakan `ChartConfig` untuk label dan warna.

Example:

```tsx
const chartConfig = {
    income: {
        label: "Income",
        color: "var(--chart-2)",
    },
    expense: {
        label: "Expense",
        color: "var(--destructive)",
    },
} satisfies ChartConfig
```

Rules:

- Label harus human-readable.
- Warna harus memakai token CSS.
- Jangan hardcode warna raw.
- Config disimpan dekat komponen chart atau di feature utils jika reusable.

## 23. Feature-Based Architecture Rules

Karena project menggunakan Feature-Based Architecture:

- Chart domain berada di `features/*/components/`.
- Data mapper chart berada di `features/*/utils/`.
- Chart service berada di `features/*/services/`.
- Primitive Shadcn chart tetap berada di `shared/components/ui/chart.tsx`.

Contoh:

```text
features/dashboard/components/cash-flow-chart-card.tsx
features/reports/components/report-chart.tsx
features/budgets/components/budget-usage-chart.tsx
features/dashboard/utils/dashboard-chart-mappers.ts
```

## 24. Data Visualization Anti-Patterns

Jangan lakukan:

- Membuat chart tanpa pertanyaan bisnis yang jelas.
- Menggunakan terlalu banyak warna.
- Menampilkan chart tanpa tooltip.
- Menampilkan chart kosong tanpa empty state.
- Menggunakan donut chart untuk banyak kategori.
- Menggunakan axis yang menyesatkan.
- Menggunakan gradient besar atau efek dekoratif.
- Menggunakan chart sebagai pengganti table untuk data detail.
- Menyembunyikan angka penting di tooltip saja.
- Menggunakan warna sebagai satu-satunya pembeda.

## 25. Chart Review Checklist

Sebelum chart dianggap selesai, cek:

- Apakah chart menjawab pertanyaan bisnis?
- Apakah jenis chart sesuai data?
- Apakah title dan period jelas?
- Apakah tooltip memformat angka dengan benar?
- Apakah warna memakai token?
- Apakah chart terbaca di dark mode?
- Apakah empty/loading/error state tersedia?
- Apakah mobile layout tetap usable?
- Apakah chart tidak terlalu ramai?
- Apakah ada table/detail untuk report penting?
- Apakah chart tidak menyesatkan?

## 26. Kesimpulan

Data visualization Finance Dashboard NextJS harus modern, bersih, dan fungsional. Chart digunakan untuk memperjelas kondisi keuangan, bukan sebagai dekorasi.

Dengan panduan ini, grafik seperti income vs expense, cash flow, expense by category, budget usage, account balance trend, dan reports dapat tampil konsisten, mudah dipahami, dan siap mendukung kebutuhan dashboard finance enterprise.
