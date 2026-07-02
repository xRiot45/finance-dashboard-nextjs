# Finance Dashboard NextJS - Design System

## 1. Ringkasan

Design system Finance Dashboard NextJS menggunakan fondasi visual dari gaya **Geist / Vercel-inspired** yang minimal, presisi, berbasis near-white canvas, near-black ink, hairline border, tipografi Geist, dan penggunaan warna aksen yang sangat terkendali.

Namun karena produk ini adalah **dashboard finance**, penerapannya harus lebih operasional dibanding landing page marketing. UI harus terasa rapi, tepercaya, padat, mudah discan, dan nyaman digunakan setiap hari untuk membaca angka, tabel, status, chart, dan workflow enterprise.

Prinsip utama:

- Utamakan keterbacaan data.
- Gunakan warna secara fungsional, bukan dekoratif.
- Jaga tampilan tetap tenang dan profesional.
- Gunakan border tipis dan surface sederhana untuk struktur.
- Hindari UI yang terlalu marketing, terlalu ilustratif, atau terlalu dekoratif.
- Semua komponen harus mendukung light mode, dark mode, responsive behavior, accessibility, loading state, empty state, error state, dan permission state.

## 2. Design Direction

Karakter visual produk:

| Aspek | Arah |
| --- | --- |
| Gaya utama | Minimal, presisi, teknis, modern. |
| Inspirasi | Geist/Vercel design language. |
| Domain adaptation | Finance dashboard, bukan marketing site. |
| Kepadatan informasi | Medium-high density, tetap mudah dibaca. |
| Warna | Netral dominan, aksen terbatas untuk status dan chart. |
| Surface | Near-white canvas, white cards, hairline borders. |
| Tipografi | Geist Sans untuk UI, Geist Mono untuk angka teknis, kode, dan label kecil tertentu. |
| Interaksi | Cepat, jelas, stabil, tanpa animasi berlebihan. |

## 3. Design Principles

### 3.1 Clarity First

Setiap elemen UI harus membantu pengguna memahami kondisi finansial. Angka, label, status, chart, dan table harus punya hierarchy yang jelas.

### 3.2 Data Before Decoration

Dashboard finance tidak boleh dipenuhi dekorasi yang mengganggu data. Warna, icon, shadow, dan gradient hanya digunakan jika membantu pemahaman.

### 3.3 Trustworthy And Calm

Data keuangan sensitif. UI harus terasa stabil, bersih, konsisten, dan dapat dipercaya. Hindari visual yang terlalu ramai atau playful.

### 3.4 Fast Scanning

User harus bisa membaca saldo, income, expense, cash flow, budget usage, dan status transaksi dengan cepat.

### 3.5 Consistent Interaction

Button, filter, table action, dialog, form, dan navigation harus punya pola yang konsisten di semua modul.

### 3.6 Enterprise Ready

UI harus siap untuk role-based access, approval workflow, audit log, import/export, notification, data besar, dan empty/error/loading state.

## 4. Color System

Design system menggunakan warna netral sebagai dasar dan aksen terbatas untuk status, link, focus, chart, dan warning.

### 4.1 Core Colors

| Token | Hex | Penggunaan |
| --- | --- | --- |
| Ink | `#171717` | Heading, text utama, icon utama, primary action light mode. |
| Body | `#4d4d4d` | Text sekunder, label, nav item. |
| Mute | `#8f8f8f` | Metadata, caption, helper text. |
| Faint | `#a1a1a1` | Placeholder, disabled text. |
| Canvas | `#fafafa` | Background utama light mode. |
| Canvas Elevated | `#ffffff` | Card, panel, input, popover. |
| Hairline | `#ebebeb` | Border utama, divider, table line. |
| Hairline Soft | `#f2f2f2` | Subtle background, table hover, inset surface. |

### 4.2 Current App Tokens

Project saat ini menggunakan token CSS di `app/globals.css`.

| CSS Variable | Light | Dark | Penggunaan |
| --- | --- | --- | --- |
| `--background` | `#fcfcfc` | `#000000` | Background aplikasi. |
| `--foreground` | `#000000` | `#ffffff` | Text utama. |
| `--card` | `#ffffff` | `#090909` | Card dan panel. |
| `--muted` | `#f5f5f5` | `#1d1d1d` | Surface subtle. |
| `--muted-foreground` | `#525252` | `#a4a4a4` | Text sekunder. |
| `--border` | `#e4e4e4` | `#242424` | Border dan divider. |
| `--input` | `#ebebeb` | `#333333` | Input border/background. |
| `--ring` | `#000000` | `#a4a4a4` | Focus ring. |

Catatan:

- Token di `globals.css` sudah sangat dekat dengan sistem Geist.
- Jika ingin lebih selaras dengan `DESIGN.md`, ink light mode dapat diarahkan ke `#171717` alih-alih pure black.
- Untuk dashboard finance, konsistensi token lebih penting daripada variasi warna dekoratif.

### 4.3 Semantic Colors

| Semantic | Token Rekomendasi | Penggunaan |
| --- | --- | --- |
| Success / Positive | Blue atau green yang terkendali | Income, approved, completed, healthy budget. |
| Warning | `#f5a623` | Budget near limit, pending approval, import warning. |
| Error / Destructive | `#e54b4f` atau `#ee0000` | Failed, rejected, over budget, delete action. |
| Info / Active | `#0070f3` atau chart blue | Link, focus, active state, selected tab. |
| Neutral | Grey scale | Draft, archived, disabled, metadata. |

### 4.4 Finance Status Colors

| Status | Visual Direction |
| --- | --- |
| Income | Positive tone, jangan terlalu neon. |
| Expense | Neutral/dark text dengan optional negative indicator. |
| Transfer | Blue/info tone. |
| Adjustment | Neutral or amber. |
| Draft | Grey badge. |
| Pending | Amber badge. |
| Approved | Positive badge. |
| Rejected | Red badge. |
| Void | Muted badge. |

### 4.5 Color Usage Rules

Do:

- Gunakan warna untuk status, focus, chart, dan alert.
- Gunakan neutral surface untuk struktur.
- Pastikan chart tidak hanya bergantung pada warna.
- Gunakan badge untuk status penting.

Don't:

- Jangan memakai gradient besar di dashboard utama.
- Jangan menggunakan warna cerah untuk seluruh card.
- Jangan menjadikan chart terlalu berwarna jika data sedikit.
- Jangan menampilkan income/expense hanya dengan warna tanpa label atau tanda.

## 5. Typography

### 5.1 Font Family

Project menggunakan:

- `Geist` sebagai font utama.
- `Geist Mono` sebagai font monospace.
- `Merriweather` tersedia sebagai serif, tetapi tidak direkomendasikan untuk dashboard utama kecuali kebutuhan editorial khusus.

Rekomendasi:

| Font | Penggunaan |
| --- | --- |
| Geist Sans | Seluruh UI, heading, label, body, table. |
| Geist Mono | Amount technical display optional, code, ID, timestamp, audit log, short technical label. |
| Merriweather | Hindari untuk UI dashboard utama. |

### 5.2 Type Scale

| Token | Size | Weight | Line Height | Use |
| --- | --- | --- | --- | --- |
| Display | 40-48px | 600 | 48-56px | Jarang digunakan, hanya overview besar atau empty state penting. |
| Page Title | 28-32px | 600 | 36-40px | Judul halaman utama. |
| Section Title | 20px | 600 | 28px | Judul section/card besar. |
| Card Title | 14-16px | 500-600 | 20-24px | Judul card metric atau panel. |
| Body | 14px | 400 | 20px | Text default dan table cell. |
| Caption | 12px | 400 | 16px | Metadata, helper text, timestamp. |
| Label | 12-14px | 500 | 16-20px | Form label, filter label, badge. |
| Code/Mono | 12-14px | 400-500 | 16-20px | ID, code, audit technical detail. |

### 5.3 Typography Rules

- Jangan gunakan hero-scale typography di dashboard cards.
- Angka metric boleh lebih besar, tetapi tetap proporsional.
- Gunakan `font-medium` atau `font-semibold` untuk hierarchy, bukan ukuran berlebihan.
- Table cell harus mudah dibaca pada 14px.
- Metadata dan helper text memakai 12px.
- Letter spacing body harus normal.
- Hindari negative tracking agresif pada UI dashboard kecil.

## 6. Spacing System

Spacing menggunakan basis 4px.

| Token | Value | Penggunaan |
| --- | --- | --- |
| `xxs` | 4px | Gap icon-label kecil, compact controls. |
| `xs` | 8px | Gap kecil, table cell internal. |
| `sm` | 12px | Input/button compact padding, card inner gap. |
| `md` | 16px | Default gap section kecil, form group. |
| `lg` | 24px | Card padding, page section gap. |
| `xl` | 32px | Page content gap besar. |
| `2xl` | 40px | Header-to-content separation. |
| `3xl` | 64px | Layout section besar jika diperlukan. |

### Dashboard Spacing Rules

- Page padding desktop: 24px-32px.
- Page padding mobile: 16px.
- Card padding: 16px-24px.
- Table cell padding: 8px-12px vertical, 12px-16px horizontal.
- Form group gap: 16px.
- Filter bar gap: 8px-12px.
- Metric grid gap: 16px.

## 7. Layout System

### 7.1 App Shell

Dashboard menggunakan layout:

```text
DashboardLayout
├── Sidebar
├── Header
└── Main Content
```

### 7.2 Page Structure

Struktur halaman standar:

```text
Page
├── Page Header
│   ├── Title
│   ├── Description optional
│   └── Primary Action
├── Filter / Toolbar optional
├── Main Content
└── Supporting Content optional
```

### 7.3 Grid Rules

- Metric cards: 1 column mobile, 2 columns tablet, 4 columns desktop.
- Dashboard charts: 1 column mobile, 2 columns desktop jika data cukup.
- Reports: chart di atas, table detail di bawah.
- Settings: sidebar/tab section + form content pada desktop, stacked pada mobile.
- Jangan menaruh card di dalam card kecuali untuk modal atau repeated item yang benar-benar membutuhkan grouping.

### 7.4 Responsive Rules

| Viewport | Behavior |
| --- | --- |
| Mobile | Single column, sidebar menjadi drawer, table dapat scroll horizontal. |
| Tablet | 2-column grid untuk metric dan cards. |
| Desktop | Sidebar persistent, 3-4 column metric grid, table full width. |
| Wide | Content tetap constrained, jangan melebar tanpa batas. |

## 8. Radius And Shape

Project saat ini menggunakan `--radius: 0.5rem`.

Rekomendasi radius:

| Token | Value | Use |
| --- | --- | --- |
| Small | 6px | Button, input, compact app control. |
| Medium | 8px | Dashboard card, table wrapper, popover. |
| Large | 12px | Dialog, drawer content, larger panel. |
| Full | 9999px | Avatar, circular icon button, small status dot. |

Untuk dashboard finance, card radius sebaiknya **8px atau kurang** agar terasa utilitarian dan enterprise-ready.

## 9. Elevation And Border

### 9.1 Border

- Border utama: 1px solid hairline.
- Divider: 1px solid hairline atau soft border.
- Table row separator: 1px solid hairline soft.

### 9.2 Shadow

Gunakan shadow secara hemat.

| Level | Use |
| --- | --- |
| Flat | Card, table, input, default panel. |
| Subtle | Dropdown, popover, sticky toolbar. |
| Floating | Dialog, command menu, sheet. |

Rules:

- Default card sebaiknya border-first, bukan shadow-first.
- Hindari shadow berat.
- Dark mode shadow tidak boleh membuat surface muddy.

## 10. Component System

### 10.1 Buttons

Button variants:

| Variant | Use |
| --- | --- |
| Primary | Aksi utama seperti Add Transaction, Save, Invite Member. |
| Secondary | Aksi pendukung seperti Export, Download Template. |
| Outline | Toolbar action, filter trigger. |
| Ghost | Row action, sidebar item, subtle action. |
| Destructive | Delete, archive critical, reject. |
| Icon | Search, notification, theme toggle, row action. |

Rules:

- Satu area hanya boleh punya satu primary action utama.
- Icon button wajib punya accessible label.
- Button loading harus mencegah double submit.
- Destructive action harus memakai confirmation jika berdampak besar.

### 10.2 Cards

Card digunakan untuk:

- Metric summary.
- Chart panel.
- Budget usage.
- Account summary.
- Empty state.
- Repeated item di mobile.

Card tidak digunakan untuk:

- Membungkus seluruh page section tanpa alasan.
- Membuat nested card berlapis.
- Dekorasi kosong.

### 10.3 Tables

Table adalah komponen utama dashboard finance.

Table harus mendukung:

- Search.
- Filter.
- Sort.
- Pagination.
- Column visibility jika data kompleks.
- Row action.
- Bulk action.
- Empty state.
- Loading skeleton.
- Error state.

Table visual rules:

- Header memakai label kecil dan tegas.
- Amount rata kanan.
- Status memakai badge.
- Date konsisten.
- Row hover subtle.
- Selected row jelas.
- Jangan gunakan zebra striping berat.

### 10.4 Forms

Form harus:

- Memiliki label yang jelas.
- Menampilkan validation message dekat field.
- Memiliki required indicator jika perlu.
- Memiliki disabled/loading state.
- Menggunakan layout 1 column pada mobile.
- Menggunakan grouping yang jelas untuk form panjang.

Form finance fields:

- Amount input harus jelas dan mudah diketik.
- Currency ditampilkan eksplisit.
- Date picker harus mudah digunakan.
- Account/category select harus searchable jika jumlah data banyak.
- Notes/description tidak boleh mengganggu field utama.

### 10.5 Dialog And Sheet

Gunakan dialog untuk:

- Confirmation.
- Short form.
- Approval/rejection reason.
- Small detail preview.

Gunakan sheet/drawer untuk:

- Detail panel.
- Filter advanced.
- Mobile navigation.
- Audit detail side panel.

### 10.6 Badges

Badge digunakan untuk:

- Transaction status.
- Transaction type.
- Budget status.
- Role.
- Import/export job status.

Badge harus:

- Memiliki label text.
- Tidak hanya mengandalkan warna.
- Tetap terbaca di light dan dark mode.

### 10.7 Empty State

Empty state harus memberi konteks dan next action.

Contoh:

- Transactions kosong: "Belum ada transaksi" + Add Transaction / Import CSV.
- Reports kosong: "Laporan tersedia setelah transaksi dibuat."
- Approvals kosong: "Tidak ada approval yang menunggu."

CTA harus mengikuti permission.

## 11. Data Visualization

### 11.1 Chart Principles

- Chart harus menjawab pertanyaan bisnis yang jelas.
- Jangan gunakan chart hanya sebagai dekorasi.
- Gunakan warna terbatas.
- Tooltip harus informatif.
- Axis dan label harus mudah dibaca.
- Chart harus memiliki empty state.

### 11.2 Chart Types

| Use Case | Chart |
| --- | --- |
| Income vs expense over time | Line chart atau bar chart. |
| Expense by category | Donut atau horizontal bar. |
| Budget usage | Progress bar atau stacked bar. |
| Account balance trend | Line chart. |
| Budget vs actual | Bar chart. |

### 11.3 Chart Colors

Current chart tokens:

| Token | Hex | Use |
| --- | --- | --- |
| `--chart-1` | `#ffae04` | Warning/category accent. |
| `--chart-2` | `#2d62ef` | Primary chart blue. |
| `--chart-3` | `#a4a4a4` | Neutral series. |
| `--chart-4` | `#e4e4e4` | Soft series/grid. |
| `--chart-5` | `#747474` | Secondary neutral. |

Rules:

- Untuk finance, gunakan blue untuk primary trend.
- Gunakan amber untuk warning/budget threshold.
- Gunakan red/destructive untuk exceeded/rejected.
- Gunakan neutral untuk baseline atau previous period.

## 12. Iconography

Gunakan `lucide-react` sebagai icon system.

Rules:

- Icon size default: 16px atau 18px untuk app controls.
- Icon size card metric: 18px-20px.
- Icon tidak boleh menggantikan label penting kecuali ada tooltip/aria-label.
- Gunakan icon yang familiar: plus, search, filter, download, upload, bell, settings, more, calendar.
- Hindari icon dekoratif berlebihan.

## 13. Motion And Interaction

Motion harus halus dan singkat.

Rekomendasi:

- Duration: 120ms-200ms.
- Easing: ease-out untuk enter, ease-in untuk exit.
- Gunakan motion untuk dropdown, dialog, sheet, hover, focus.
- Jangan gunakan animasi besar untuk metric atau chart yang membuat data sulit dibaca.
- Respect reduced motion.

## 14. Accessibility

Semua UI harus:

- Bisa dinavigasi dengan keyboard.
- Memiliki focus state jelas.
- Memiliki contrast yang cukup.
- Memiliki accessible label untuk icon-only action.
- Menampilkan error form yang terbaca screen reader.
- Tidak mengandalkan warna saja.
- Menjaga heading hierarchy.
- Menjaga touch target minimal sekitar 40-44px untuk mobile.

## 15. Dark Mode

Dark mode harus tetap fungsional untuk membaca data.

Rules:

- Jangan gunakan pure large bright white untuk semua text; gunakan hierarchy.
- Border dark mode harus cukup terlihat.
- Chart colors harus tetap kontras.
- Card background harus berbeda dari page background.
- Status badge harus tetap terbaca.
- Focus ring harus terlihat.

Current dark token sudah tersedia di `.dark` pada `globals.css`.

## 16. Enterprise UI States

Setiap modul enterprise-ready harus mendukung:

| State | Contoh |
| --- | --- |
| Loading | Table skeleton, card skeleton, chart skeleton. |
| Empty | No transactions, no reports, no approvals. |
| Error | Failed to load transactions, retry action. |
| Success | Transaction created, export ready. |
| Permission denied | User tidak memiliki akses. |
| Disabled | Action tidak tersedia untuk status/role. |
| Pending | Approval/import/export sedang diproses. |
| Audit visible | Perubahan penting dapat ditelusuri. |

## 17. Page Patterns

### 17.1 Dashboard Page

Pattern:

```text
Page Header
Metric Grid
Main Chart Row
Budget + Category Breakdown
Recent Transactions
```

### 17.2 List Page

Pattern:

```text
Page Header + Primary Action
Toolbar: Search + Filters + View Options
Table
Pagination
Bulk Action Bar if selected
```

### 17.3 Detail Page

Pattern:

```text
Breadcrumb
Detail Header + Actions
Summary Panel
Related Data
Audit Timeline if permitted
```

### 17.4 Settings Page

Pattern:

```text
Settings Navigation
Section Header
Form Content
Save/Cancel Actions
Danger Zone if needed
```

## 18. Do And Don't

### Do

- Gunakan Geist Sans untuk UI.
- Gunakan neutral palette sebagai dasar.
- Gunakan hairline border untuk struktur.
- Gunakan warna hanya untuk status, chart, dan focus.
- Buat table mudah discan.
- Letakkan primary action di area yang konsisten.
- Gunakan badge untuk status.
- Buat empty state yang membantu.
- Pastikan semua flow memiliki loading/error state.

### Don't

- Jangan membuat dashboard terasa seperti landing page.
- Jangan memakai gradient besar sebagai background dashboard.
- Jangan memakai card bertumpuk tanpa alasan.
- Jangan membuat chart terlalu dekoratif.
- Jangan memakai shadow berat.
- Jangan menyembunyikan status hanya dengan warna.
- Jangan membuat text kecil untuk angka penting.
- Jangan menaruh terlalu banyak primary button dalam satu area.

## 19. Implementation Notes

Design system ini harus diterapkan melalui:

- Token CSS di `app/globals.css`.
- Komponen reusable di `shared/components/ui/`.
- Komponen domain di `features/*/components/`.
- Page pattern di `features/*/screens/`.
- Utility format di `shared/utils` atau feature-specific utils.

Karena project menggunakan Feature-Based Architecture:

- Komponen seperti `TransactionForm` berada di `features/transactions/components/`.
- Komponen seperti `MetricCard` dapat berada di `features/dashboard/components/`.
- Primitive seperti `Button`, `Card`, `Table`, `Dialog`, dan `Badge` tetap berada di `shared/components/ui/`.

## 20. Design System Acceptance Criteria

Design system dianggap berhasil jika:

- UI konsisten di semua modul.
- Dashboard mudah discan dalam 30 detik.
- Table transaksi mudah dibaca dan difilter.
- Status transaksi dan budget mudah dipahami.
- Light mode dan dark mode sama-sama nyaman.
- Komponen mendukung accessibility dasar.
- Empty/loading/error/success state tersedia.
- Tampilan tetap profesional dan enterprise-ready.
- Tidak ada penggunaan warna/dekorasi yang mengganggu data finance.

## 21. Kesimpulan

Finance Dashboard NextJS menggunakan design system minimal dan presisi berbasis Geist, neutral palette, hairline border, dan komponen fungsional. Adaptasi untuk domain finance menekankan keterbacaan angka, struktur table yang kuat, status yang jelas, chart yang informatif, dan pengalaman enterprise yang stabil.

Design system ini harus menjadi acuan untuk semua modul fitur agar aplikasi terasa konsisten, tepercaya, dan siap dikembangkan menjadi finance dashboard enterprise-ready.
