# Finance Dashboard NextJS - Color System

## 1. Ringkasan

Color system ini mengatur penggunaan warna untuk Finance Dashboard NextJS agar UI tetap konsisten, tenang, mudah dibaca, dan tidak berantakan saat fitur bertambah.

Produk ini menggunakan pendekatan warna yang minimal:

- Neutral palette sebagai fondasi utama.
- Warna aksen digunakan hanya untuk fungsi.
- Status finance harus jelas dan konsisten.
- Chart harus terbaca tanpa menjadi dekorasi berlebihan.
- Light mode dan dark mode harus memiliki hierarchy yang sama.

Warna tidak boleh digunakan hanya untuk mempercantik tampilan. Dalam dashboard finance, warna adalah alat komunikasi data.

## 2. Color Principles

### 2.1 Neutral First

Mayoritas UI menggunakan warna netral: background, surface, text, border, table, card, sidebar, dan form.

### 2.2 Functional Accent

Warna aksen hanya digunakan untuk:

- Status.
- Alert.
- Focus.
- Link.
- Chart.
- Active state.
- Trend indicator.

### 2.3 Finance Clarity

Warna finance seperti income, expense, pending, approved, rejected, dan over budget harus konsisten di seluruh aplikasi.

### 2.4 No Decorative Noise

Hindari gradient besar, card berwarna terang, background warna-warni, dan chart dengan terlalu banyak warna.

### 2.5 Accessible Contrast

Semua text, badge, chart, dan state harus tetap terbaca di light mode dan dark mode.

## 3. Core Palette

Palette inti mengikuti gaya Geist/Vercel-inspired: canvas terang, ink gelap, grey ladder, dan hairline border.

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#171717` | Text utama, heading, icon penting, primary light mode. |
| `body` | `#4d4d4d` | Text sekunder, nav label, description. |
| `mute` | `#8f8f8f` | Metadata, caption, subtle label. |
| `faint` | `#a1a1a1` | Placeholder, disabled text. |
| `canvas` | `#fafafa` | Background utama. |
| `canvas-elevated` | `#ffffff` | Card, panel, popover, input. |
| `hairline` | `#ebebeb` | Border utama dan divider. |
| `hairline-soft` | `#f2f2f2` | Subtle fill, hover, table soft background. |

## 4. Current CSS Token Mapping

Project saat ini menggunakan CSS variables di `app/globals.css`.

### 4.1 Light Mode

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--background` | `#fcfcfc` | Page background. |
| `--foreground` | `#000000` | Primary text. |
| `--card` | `#ffffff` | Card/panel background. |
| `--card-foreground` | `#000000` | Text di atas card. |
| `--popover` | `#fcfcfc` | Popover background. |
| `--popover-foreground` | `#000000` | Popover text. |
| `--primary` | `#000000` | Primary action background. |
| `--primary-foreground` | `#ffffff` | Text di atas primary. |
| `--secondary` | `#ebebeb` | Secondary subtle background. |
| `--secondary-foreground` | `#000000` | Text secondary. |
| `--muted` | `#f5f5f5` | Muted surface. |
| `--muted-foreground` | `#525252` | Muted text. |
| `--accent` | `#ebebeb` | Accent surface. |
| `--accent-foreground` | `#000000` | Accent text. |
| `--destructive` | `#e54b4f` | Destructive action/error. |
| `--destructive-foreground` | `#ffffff` | Text destructive. |
| `--border` | `#e4e4e4` | Border/divider. |
| `--input` | `#ebebeb` | Input border/background. |
| `--ring` | `#000000` | Focus ring. |

### 4.2 Dark Mode

| CSS Variable | Value | Usage |
| --- | --- | --- |
| `--background` | `#000000` | Page background. |
| `--foreground` | `#ffffff` | Primary text. |
| `--card` | `#090909` | Card/panel background. |
| `--card-foreground` | `#ffffff` | Text di atas card. |
| `--popover` | `#121212` | Popover background. |
| `--popover-foreground` | `#ffffff` | Popover text. |
| `--primary` | `#ffffff` | Primary action background dark mode. |
| `--primary-foreground` | `#000000` | Text di atas primary. |
| `--secondary` | `#222222` | Secondary subtle background. |
| `--secondary-foreground` | `#ffffff` | Text secondary. |
| `--muted` | `#1d1d1d` | Muted surface. |
| `--muted-foreground` | `#a4a4a4` | Muted text. |
| `--accent` | `#333333` | Accent surface. |
| `--accent-foreground` | `#ffffff` | Accent text. |
| `--destructive` | `#ff5b5b` | Destructive action/error. |
| `--destructive-foreground` | `#000000` | Text destructive. |
| `--border` | `#242424` | Border/divider. |
| `--input` | `#333333` | Input border/background. |
| `--ring` | `#a4a4a4` | Focus ring. |

## 5. Recommended Semantic Tokens

Semantic tokens membantu menjaga konsistensi saat UI berkembang.

| Semantic Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `success` | `#0a7f3f` | `#3ddc84` | Approved, completed, healthy state. |
| `success-soft` | `#e7f7ee` | `#10291b` | Success badge background. |
| `success-foreground` | `#075f2f` | `#b7f7cf` | Success badge text. |
| `warning` | `#f5a623` | `#ffb84d` | Pending, near limit, warning. |
| `warning-soft` | `#fff4df` | `#33240d` | Warning badge background. |
| `warning-foreground` | `#7a4700` | `#ffe0a3` | Warning badge text. |
| `danger` | `#e54b4f` | `#ff5b5b` | Error, rejected, destructive. |
| `danger-soft` | `#fdecec` | `#351314` | Danger badge background. |
| `danger-foreground` | `#9f1f23` | `#ffc7c9` | Danger badge text. |
| `info` | `#2d62ef` | `#5f8cff` | Link, transfer, active info. |
| `info-soft` | `#edf3ff` | `#101b3a` | Info badge background. |
| `info-foreground` | `#1d46b8` | `#c7d6ff` | Info badge text. |
| `neutral` | `#747474` | `#a4a4a4` | Draft, archived, metadata. |
| `neutral-soft` | `#f5f5f5` | `#1d1d1d` | Neutral badge background. |
| `neutral-foreground` | `#525252` | `#d4d4d4` | Neutral badge text. |

Catatan:

- Token semantic ini adalah rekomendasi dokumentasi. Implementasi dapat ditambahkan ke `globals.css` saat fitur UI mulai dibangun.
- Gunakan semantic token daripada hex langsung di komponen.

## 6. Finance Domain Colors

### 6.1 Transaction Type Colors

| Type | Color Role | UI Treatment |
| --- | --- | --- |
| Income | `success` | Positive badge/text indicator. |
| Expense | `danger` atau neutral with negative sign | Negative amount indicator. |
| Transfer | `info` | Info badge/text indicator. |
| Adjustment | `warning` atau neutral | Adjustment badge. |

Rules:

- Income harus selalu tampil positif.
- Expense harus mudah dikenali sebagai pengeluaran.
- Transfer tidak boleh terlihat seperti income atau expense final.
- Adjustment harus diberi label jelas agar tidak membingungkan.

### 6.2 Transaction Status Colors

| Status | Token | Treatment |
| --- | --- | --- |
| Draft | `neutral` | Muted badge. |
| Pending | `warning` | Warning badge. |
| Approved | `success` | Success badge. |
| Rejected | `danger` | Danger badge. |
| Void | `neutral` | Muted/disabled badge. |

### 6.3 Budget Status Colors

| Budget State | Token | Treatment |
| --- | --- | --- |
| Healthy | `success` | Normal usage indicator. |
| Near Limit | `warning` | Warning usage bar/badge. |
| Exceeded | `danger` | Destructive usage bar/badge. |
| Inactive | `neutral` | Muted badge. |

### 6.4 Import/Export Job Colors

| Job Status | Token | Treatment |
| --- | --- | --- |
| Queued | `neutral` | Muted badge. |
| Processing | `info` | Info badge, optional spinner. |
| Completed | `success` | Success badge. |
| Completed with errors | `warning` | Warning badge. |
| Failed | `danger` | Danger badge. |

### 6.5 Approval Colors

| Approval State | Token | Treatment |
| --- | --- | --- |
| Needs Review | `warning` | Pending badge. |
| Approved | `success` | Success badge. |
| Rejected | `danger` | Danger badge. |
| Skipped/Not Required | `neutral` | Muted badge. |

## 7. Chart Color System

Current chart tokens:

| CSS Variable | Light | Dark | Recommended Use |
| --- | --- | --- | --- |
| `--chart-1` | `#ffae04` | `#ffae04` | Warning, budget threshold, amber category. |
| `--chart-2` | `#2d62ef` | `#2671f4` | Primary trend, income vs expense main series. |
| `--chart-3` | `#a4a4a4` | `#747474` | Neutral comparison. |
| `--chart-4` | `#e4e4e4` | `#525252` | Grid, baseline, low emphasis series. |
| `--chart-5` | `#747474` | `#e4e4e4` | Secondary neutral series. |

### 7.1 Recommended Chart Roles

| Chart Role | Token |
| --- | --- |
| Primary series | `--chart-2` |
| Warning/budget series | `--chart-1` |
| Previous period | `--chart-3` |
| Baseline/grid | `--chart-4` |
| Secondary neutral | `--chart-5` |
| Destructive/exceeded | `--destructive` |
| Success/healthy | Recommended `success` token |

### 7.2 Chart Rules

- Maksimal 5 warna utama dalam satu chart.
- Gunakan label dan tooltip, jangan hanya warna.
- Jangan gunakan gradient besar untuk chart area.
- Pastikan chart tetap terbaca di dark mode.
- Expense by category boleh memakai beberapa warna, tetapi tetap muted dan konsisten.
- Untuk budget exceeded, gunakan danger hanya pada bagian yang melewati batas.

## 8. Component Color Guidelines

### 8.1 Buttons

| Variant | Background | Text | Usage |
| --- | --- | --- | --- |
| Primary | `--primary` | `--primary-foreground` | Aksi utama. |
| Secondary | `--secondary` | `--secondary-foreground` | Aksi pendukung. |
| Outline | transparent/card | `--foreground` | Toolbar/filter action. |
| Ghost | transparent | `--foreground` | Low emphasis action. |
| Destructive | `--destructive` | `--destructive-foreground` | Delete, reject, remove. |

Rules:

- Jangan membuat banyak primary button dalam satu area.
- Destructive button hanya untuk tindakan berisiko.
- Export/import bukan destructive.

### 8.2 Cards

| Element | Color |
| --- | --- |
| Background | `--card` |
| Text | `--card-foreground` |
| Border | `--border` |
| Muted area | `--muted` |

Rules:

- Card finance tidak perlu background warna-warni.
- Gunakan border untuk memisahkan card.
- Warna di card hanya untuk status/trend kecil.

### 8.3 Tables

| Element | Color |
| --- | --- |
| Header text | `--muted-foreground` |
| Cell text | `--foreground` |
| Row border | `--border` |
| Row hover | `--muted` |
| Selected row | `--accent` |
| Disabled row | muted opacity |

Rules:

- Jangan gunakan zebra striping berat.
- Amount negatif/expense boleh memakai danger text, tetapi tetap terbaca.
- Status selalu menggunakan badge.

### 8.4 Forms

| Element | Color |
| --- | --- |
| Label | `--foreground` |
| Helper text | `--muted-foreground` |
| Input background | `--card` |
| Input border | `--input` atau `--border` |
| Focus ring | `--ring` |
| Error text | `--destructive` |

Rules:

- Error harus dekat field.
- Focus ring harus terlihat di light dan dark mode.
- Placeholder tidak boleh terlalu kontras.

### 8.5 Badges

Badge harus menggunakan semantic token.

| Badge | Background | Text |
| --- | --- | --- |
| Success | `success-soft` | `success-foreground` |
| Warning | `warning-soft` | `warning-foreground` |
| Danger | `danger-soft` | `danger-foreground` |
| Info | `info-soft` | `info-foreground` |
| Neutral | `neutral-soft` | `neutral-foreground` |

Rules:

- Badge harus memiliki text.
- Jangan hanya menampilkan dot warna.
- Badge table harus compact.

## 9. Page-Level Color Usage

### 9.1 Dashboard

Gunakan:

- Neutral background.
- White/dark cards.
- Aksen kecil pada trend/status.
- Chart dengan palette terbatas.

Hindari:

- Metric card full-color.
- Gradient background.
- Warna berbeda untuk setiap card.

### 9.2 Transactions

Gunakan:

- Neutral table.
- Badge status.
- Amount color yang konsisten.
- Row hover subtle.

Hindari:

- Row background merah/hijau penuh untuk income/expense.
- Banyak warna kategori yang terlalu mencolok.

### 9.3 Budgets

Gunakan:

- Progress indicator neutral/success.
- Warning saat mendekati limit.
- Danger saat melewati limit.

Hindari:

- Warna warning sebelum threshold tercapai.
- Progress bar dengan gradient ramai.

### 9.4 Reports

Gunakan:

- Chart colors konsisten.
- Legend yang jelas.
- Neutral table detail.

Hindari:

- Terlalu banyak series warna.
- Warna chart yang tidak konsisten antar report.

### 9.5 Settings

Gunakan:

- Neutral form.
- Danger zone dengan destructive treatment.
- Info/warning alert jika perubahan berdampak besar.

Hindari:

- Membuat seluruh settings section berwarna.
- Danger action tanpa visual separation.

## 10. Dark Mode Rules

Dark mode harus menjaga hierarchy yang sama dengan light mode.

Rules:

- Background utama menggunakan `--background`.
- Card menggunakan `--card`, bukan `--muted`.
- Border harus cukup terlihat.
- Text utama menggunakan `--foreground`.
- Text sekunder menggunakan `--muted-foreground`.
- Jangan memakai shadow sebagai pemisah utama.
- Badge semantic harus memiliki background soft yang cukup kontras.
- Chart grid harus subtle tetapi tetap terlihat.

Dark mode checklist:

- Metric card terbaca.
- Table border terlihat.
- Badge status terbaca.
- Form focus ring terlihat.
- Chart tooltip terbaca.
- Destructive action jelas.

## 11. Accessibility Rules

Color accessibility:

- Jangan menyampaikan status hanya lewat warna.
- Badge harus punya label.
- Chart harus punya tooltip/legend.
- Error field harus punya text error.
- Link harus bisa dikenali selain dari warna jika berada dalam body text.
- Focus state harus terlihat.
- Contrast text harus cukup di light dan dark mode.

Examples:

```text
Bad: hanya angka merah tanpa label.
Good: "-$120.00 Expense" atau badge "Expense".
```

```text
Bad: chart hanya memakai warna tanpa legend.
Good: chart memakai warna + tooltip + label series.
```

## 12. Token Usage In Tailwind

Gunakan token Tailwind yang berasal dari CSS variables:

| Tailwind Class | Maps To |
| --- | --- |
| `bg-background` | `--background` |
| `text-foreground` | `--foreground` |
| `bg-card` | `--card` |
| `text-card-foreground` | `--card-foreground` |
| `bg-muted` | `--muted` |
| `text-muted-foreground` | `--muted-foreground` |
| `border-border` | `--border` |
| `bg-primary` | `--primary` |
| `text-primary-foreground` | `--primary-foreground` |
| `bg-destructive` | `--destructive` |
| `text-destructive-foreground` | `--destructive-foreground` |

Rules:

- Hindari hex langsung di class.
- Gunakan token semantic jika sudah tersedia.
- Jika butuh warna baru, tambahkan ke token terlebih dahulu.

## 13. Recommended Additional CSS Variables

Untuk mendukung semantic status dengan lebih rapi, disarankan menambahkan token berikut saat implementasi UI:

```css
:root {
  --success: #0a7f3f;
  --success-soft: #e7f7ee;
  --success-foreground: #075f2f;
  --warning: #f5a623;
  --warning-soft: #fff4df;
  --warning-foreground: #7a4700;
  --danger-soft: #fdecec;
  --danger-foreground: #9f1f23;
  --info: #2d62ef;
  --info-soft: #edf3ff;
  --info-foreground: #1d46b8;
  --neutral-soft: #f5f5f5;
  --neutral-foreground: #525252;
}

.dark {
  --success: #3ddc84;
  --success-soft: #10291b;
  --success-foreground: #b7f7cf;
  --warning: #ffb84d;
  --warning-soft: #33240d;
  --warning-foreground: #ffe0a3;
  --danger-soft: #351314;
  --danger-foreground: #ffc7c9;
  --info: #5f8cff;
  --info-soft: #101b3a;
  --info-foreground: #c7d6ff;
  --neutral-soft: #1d1d1d;
  --neutral-foreground: #d4d4d4;
}
```

## 14. Color Anti-Patterns

Jangan lakukan:

- Menggunakan warna acak langsung di komponen.
- Membuat setiap card punya warna background berbeda.
- Memakai gradient sebagai background dashboard.
- Memakai warna merah/hijau penuh untuk seluruh row table.
- Menggunakan chart dengan terlalu banyak warna.
- Menggunakan warna status tanpa label.
- Memakai warna yang berbeda untuk status yang sama di halaman berbeda.
- Mengubah warna primary action per modul.
- Menggunakan opacity terlalu rendah untuk text penting.

## 15. Color Review Checklist

Sebelum UI dianggap selesai, cek:

- Apakah warna menggunakan token, bukan hex acak?
- Apakah status finance konsisten?
- Apakah income, expense, transfer, dan adjustment mudah dibedakan?
- Apakah pending, approved, rejected, dan void konsisten?
- Apakah budget near limit dan exceeded jelas?
- Apakah table tetap netral dan mudah discan?
- Apakah chart memiliki warna yang cukup tetapi tidak berlebihan?
- Apakah light mode dan dark mode sama-sama terbaca?
- Apakah semua badge memiliki label text?
- Apakah error/destructive action jelas?
- Apakah warna tidak dipakai sebagai satu-satunya pembeda informasi?

## 16. Kesimpulan

Color system Finance Dashboard NextJS harus menjaga UI tetap konsisten, minimal, dan fungsional. Netral menjadi fondasi, semantic colors menjadi penanda status, dan chart colors digunakan secukupnya untuk membantu analisis.

Dengan aturan ini, dashboard akan tetap rapi walaupun fitur enterprise seperti transactions, budgets, reports, approval, audit log, import/export, dan notifications semakin kompleks.
