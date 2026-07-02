# Finance Dashboard NextJS - Spacing System

## 1. Ringkasan

Spacing system ini mengatur jarak antar elemen UI di Finance Dashboard NextJS agar layout tetap konsisten, rapi, mudah discan, dan enterprise-ready. Dashboard finance memiliki banyak data, table, filter, form, chart, dan card, sehingga spacing harus cukup padat tetapi tetap nyaman dibaca.

Tujuan spacing system:

- Menjaga konsistensi antar halaman dan fitur.
- Membuat layout dashboard mudah discan.
- Menghindari spacing acak antar card, table, form, dan toolbar.
- Mendukung responsive layout.
- Menjaga UI tetap compact untuk kebutuhan enterprise.

## 2. Core Principle

### 2.1 4px Base Unit

Semua spacing harus mengikuti basis **4px**. Hindari nilai acak seperti 5px, 7px, 13px, 19px, kecuali ada kebutuhan khusus dari komponen bawaan.

### 2.2 Compact But Readable

Dashboard finance perlu menampilkan banyak informasi. Spacing harus padat, tetapi tidak membuat UI terasa sesak.

### 2.3 Consistent Rhythm

Gunakan pola spacing yang sama untuk halaman serupa:

- Semua list page memakai spacing toolbar yang sama.
- Semua form memakai spacing field yang sama.
- Semua metric card memakai padding dan gap yang sama.
- Semua settings page memakai section spacing yang sama.

### 2.4 No Decorative Whitespace

Whitespace harus membantu struktur, bukan membuat dashboard terasa seperti landing page.

## 3. Spacing Scale

| Token | Value | Tailwind | Penggunaan |
| --- | --- | --- | --- |
| `0` | 0px | `0` | Reset spacing. |
| `xxs` | 4px | `1` | Gap icon-label kecil, compact indicator. |
| `xs` | 8px | `2` | Gap kecil, toolbar item, table inner content. |
| `sm` | 12px | `3` | Compact padding, filter group, small card gap. |
| `md` | 16px | `4` | Default gap, form field group, card grid gap. |
| `lg` | 24px | `6` | Section gap, card padding, page header gap. |
| `xl` | 32px | `8` | Page block gap, large panel gap. |
| `2xl` | 40px | `10` | Header-to-content separation besar. |
| `3xl` | 48px | `12` | Major section separation jika diperlukan. |
| `4xl` | 64px | `16` | Rare, empty state atau major layout area. |

Rekomendasi utama:

- Gunakan `md` sebagai default gap.
- Gunakan `lg` untuk card padding dan antar section.
- Gunakan `xs` atau `sm` untuk toolbar dan table.
- Gunakan `xl` ke atas secara hemat.

## 4. Page-Level Spacing

### 4.1 Page Padding

| Viewport | Padding |
| --- | --- |
| Mobile | 16px |
| Tablet | 20-24px |
| Desktop | 24-32px |
| Wide Desktop | 32px, dengan max content width jika perlu |

Rules:

- Jangan gunakan padding page di bawah 16px.
- Jangan membuat content menyentuh tepi viewport.
- Wide desktop tidak perlu memperbesar padding berlebihan.

### 4.2 Page Header Spacing

Page header:

```text
Title / Description / Actions
```

Rules:

- Gap title ke description: 4-8px.
- Gap header ke content: 16-24px.
- Gap title group ke primary action: 16px.
- Mobile: action dapat turun ke bawah dengan gap 12px.

### 4.3 Section Spacing

| Relationship | Gap |
| --- | --- |
| Page header ke toolbar | 16px |
| Toolbar ke content | 16px |
| Section ke section | 24px |
| Major dashboard block ke block | 24-32px |
| Card title ke content | 12-16px |

## 5. App Shell Spacing

### 5.1 Sidebar

| Element | Spacing |
| --- | --- |
| Sidebar width | 240-280px |
| Sidebar padding | 12-16px |
| Nav item height | 36-40px |
| Nav item horizontal padding | 10-12px |
| Gap antar nav item | 4px |
| Gap antar nav group | 16-24px |
| Icon ke label | 8-10px |

Rules:

- Sidebar harus compact.
- Jangan membuat nav item terlalu tinggi.
- Active item harus jelas tanpa membutuhkan spacing besar.

### 5.2 Header

| Element | Spacing |
| --- | --- |
| Header height | 56-64px |
| Header horizontal padding | 16-24px |
| Gap antar header controls | 8-12px |
| Workspace switcher padding | 8-12px |
| Icon button size | 36-40px |

Rules:

- Header tidak boleh terasa seperti hero.
- Workspace switcher harus mudah ditemukan.
- Notification, search, theme, dan user menu memakai spacing konsisten.

### 5.3 Main Content

Rules:

- Content padding mengikuti page padding.
- Gap antar page blocks: 24px.
- Jangan membungkus seluruh halaman dalam card besar jika tidak perlu.

## 6. Grid Spacing

### 6.1 Metric Grid

| Viewport | Columns | Gap |
| --- | --- | --- |
| Mobile | 1 | 12-16px |
| Tablet | 2 | 16px |
| Desktop | 4 | 16px |

Rules:

- Metric cards harus memiliki tinggi yang konsisten.
- Jangan gunakan gap terlalu besar antar metric karena mengurangi scan speed.

### 6.2 Dashboard Content Grid

| Layout | Gap |
| --- | --- |
| Chart row | 16-24px |
| Chart + side panel | 16-24px |
| Budget + category cards | 16px |
| Recent transactions block | 16-24px dari chart block |

### 6.3 Settings Grid

Desktop:

```text
Settings Nav | Settings Content
```

Spacing:

- Gap nav ke content: 24-32px.
- Form max width: 640-720px.
- Section gap: 24px.

Mobile:

- Stack vertical.
- Gap nav ke content: 16px.

## 7. Card Spacing

### 7.1 Card Padding

| Card Type | Padding |
| --- | --- |
| Metric card | 16-20px |
| Chart card | 20-24px |
| Table wrapper | 0-16px tergantung table style |
| Detail summary card | 20-24px |
| Settings card/panel | 20-24px |
| Empty state card | 24-32px |

Rules:

- Metric card harus compact.
- Chart card butuh sedikit ruang lebih untuk title, legend, dan tooltip area.
- Jangan membuat padding card terlalu besar untuk data-heavy UI.

### 7.2 Card Internal Gap

| Relationship | Gap |
| --- | --- |
| Card title ke description | 4-8px |
| Card header ke content | 12-16px |
| Metric label ke value | 6-8px |
| Metric value ke trend | 6-8px |
| Chart title ke chart | 16px |
| Empty state icon ke title | 12px |
| Empty state title ke description | 8px |
| Empty state description ke action | 16px |

## 8. Table Spacing

### 8.1 Table Density

Dashboard finance membutuhkan table yang padat namun tetap terbaca.

| Element | Spacing |
| --- | --- |
| Header cell padding Y | 8-10px |
| Header cell padding X | 12-16px |
| Body cell padding Y | 10-12px |
| Body cell padding X | 12-16px |
| Row action button size | 32-36px |
| Checkbox cell width | 40-44px |
| Row height target | 44-52px |

Rules:

- Jangan membuat row terlalu tinggi.
- Jangan membuat cell terlalu rapat sampai text sulit dibaca.
- Amount column tetap punya cukup ruang.
- Table toolbar terpisah dari table dengan gap 12-16px.

### 8.2 Table Toolbar

| Element | Spacing |
| --- | --- |
| Toolbar gap | 8-12px |
| Search input width | 240-320px desktop |
| Filter button gap | 8px |
| Toolbar ke table | 12-16px |
| Bulk action bar padding | 8-12px |

Mobile:

- Toolbar stack vertical.
- Search full width.
- Filter masuk sheet jika terlalu banyak.

### 8.3 Pagination

Rules:

- Pagination ke table: 12-16px.
- Button gap: 4-8px.
- Summary text ke controls: 12-16px.

## 9. Form Spacing

### 9.1 Form Field Group

| Element | Spacing |
| --- | --- |
| Label ke input | 6-8px |
| Input ke helper/error | 4-6px |
| Field ke field | 16px |
| Field group ke group | 24px |
| Form section title ke fields | 16px |
| Form ke action footer | 24px |

### 9.2 Form Layout

Mobile:

- 1 column.
- Gap antar field: 16px.

Desktop:

- 1 column untuk form sederhana.
- 2 columns untuk field pendek dan setara.
- Gap antar columns: 16px.
- Gap antar rows: 16px.

Rules:

- Jangan membuat form finance terlalu rapat.
- Field amount, account, category, date harus mudah ditemukan.
- Error message tidak boleh menggeser layout secara ekstrem.

### 9.3 Form Action Footer

| Element | Spacing |
| --- | --- |
| Form content ke footer | 24px |
| Gap antar action button | 8-12px |
| Footer padding jika sticky | 12-16px |

Rules:

- Primary action di kanan pada desktop.
- Mobile action dapat full width jika perlu.

## 10. Button And Control Spacing

### 10.1 Button Sizes

| Button Type | Height | Horizontal Padding |
| --- | --- | --- |
| Small | 32px | 10-12px |
| Default | 36-40px | 12-16px |
| Large | 44px | 16-20px |
| Icon | 32-40px | equal width/height |

### 10.2 Button Group

Rules:

- Gap antar button: 8px.
- Destructive action dipisahkan jika berada bersama action biasa.
- Toolbar button boleh lebih compact.
- Dialog footer button gap: 8-12px.

### 10.3 Icon And Label

Rules:

- Icon ke label: 8px.
- Icon-only button size: minimal 32px desktop, 40px mobile.
- Badge/count dekat icon: 4px.

## 11. Filter And Search Spacing

### 11.1 Filter Bar

| Element | Spacing |
| --- | --- |
| Search ke filter | 8-12px |
| Filter ke filter | 8px |
| Filter bar ke table/chart | 12-16px |
| Active filter chips gap | 8px |
| Active filter row ke toolbar | 8-12px |

### 11.2 Filter Sheet

Mobile/advanced filter:

- Sheet padding: 16-24px.
- Field gap: 16px.
- Section gap: 24px.
- Action footer gap: 8-12px.

## 12. Chart Spacing

### 12.1 Chart Card

| Element | Spacing |
| --- | --- |
| Card padding | 20-24px |
| Title ke subtitle | 4-8px |
| Header ke chart | 16px |
| Legend ke chart | 12px |
| Chart ke footer note | 12px |

### 12.2 Chart Area

Rules:

- Chart harus memiliki tinggi stabil.
- Jangan membuat chart terlalu pendek.
- Tooltip tidak boleh menutupi kontrol penting.
- Axis label tidak boleh terlalu rapat.

Recommended heights:

| Chart | Height |
| --- | --- |
| Small card chart | 180-220px |
| Dashboard chart | 260-320px |
| Report chart | 320-420px |

## 13. Dialog, Sheet, And Popover Spacing

### 13.1 Dialog

| Element | Spacing |
| --- | --- |
| Dialog padding | 20-24px |
| Title ke description | 8px |
| Description ke content | 16px |
| Content ke footer | 24px |
| Footer button gap | 8-12px |

### 13.2 Sheet

| Element | Spacing |
| --- | --- |
| Sheet padding | 16-24px |
| Header ke content | 16px |
| Section gap | 24px |
| Footer padding | 12-16px |

### 13.3 Popover / Dropdown

| Element | Spacing |
| --- | --- |
| Popover padding | 8-12px |
| Menu item height | 32-36px |
| Menu item padding X | 8-12px |
| Menu group gap | 4-8px |

## 14. Empty, Loading, Error State Spacing

### 14.1 Empty State

| Element | Spacing |
| --- | --- |
| Container padding | 24-32px |
| Icon ke title | 12px |
| Title ke description | 8px |
| Description ke action | 16px |

### 14.2 Loading State

Rules:

- Skeleton mengikuti struktur layout asli.
- Gap skeleton sama dengan gap content final.
- Jangan gunakan spinner besar untuk table jika skeleton lebih informatif.

### 14.3 Error State

| Element | Spacing |
| --- | --- |
| Error title ke message | 8px |
| Message ke retry action | 16px |
| Inline error ke field | 4-6px |

## 15. Responsive Spacing

### 15.1 Mobile

Rules:

- Page padding: 16px.
- Card padding: 16px.
- Section gap: 20-24px.
- Grid gap: 12-16px.
- Toolbar stack gap: 8-12px.
- Touch target minimal 40-44px.

### 15.2 Tablet

Rules:

- Page padding: 20-24px.
- Metric grid gap: 16px.
- Form column gap: 16px.
- Section gap: 24px.

### 15.3 Desktop

Rules:

- Page padding: 24-32px.
- Section gap: 24-32px.
- Grid gap: 16-24px.
- Sidebar persistent.

### 15.4 Wide Desktop

Rules:

- Jangan memperbesar semua spacing otomatis.
- Gunakan max-width untuk content yang terlalu melebar.
- Table boleh full width jika memang data-heavy.

## 16. Feature-Based Architecture Spacing Rules

Karena project menggunakan Feature-Based Architecture:

- Page spacing diterapkan di `features/*/screens/`.
- Komponen domain mengatur internal spacing sendiri.
- Primitive spacing untuk reusable UI tetap mengikuti `shared/components/ui`.
- Jangan membuat spacing baru per fitur tanpa alasan.

Contoh:

```text
features/dashboard/screens/dashboard-page.tsx
features/transactions/components/transactions-table.tsx
features/settings/screens/settings-page.tsx
```

Rules:

- Screen mengatur layout antar section.
- Component mengatur spacing internal.
- Shared primitive tidak boleh berisi spacing domain yang terlalu spesifik.

## 17. Tailwind Class Recommendations

### Page Container

```text
p-4 md:p-6 lg:p-8
```

### Page Stack

```text
space-y-6
```

### Card Padding

```text
p-4 md:p-6
```

### Metric Grid

```text
grid gap-4 md:grid-cols-2 xl:grid-cols-4
```

### Dashboard Grid

```text
grid gap-4 lg:grid-cols-2
```

### Form Stack

```text
space-y-4
```

### Toolbar

```text
flex flex-wrap items-center gap-2
```

### Dialog Footer

```text
flex justify-end gap-2
```

## 18. Spacing Anti-Patterns

Jangan lakukan:

- Menggunakan spacing acak seperti 13px atau 27px.
- Membuat card padding terlalu besar untuk dashboard data-heavy.
- Membuat table row terlalu tinggi.
- Menaruh card di dalam card dengan padding ganda.
- Menggunakan section gap ala landing page di dashboard.
- Membuat toolbar terlalu jauh dari table.
- Membuat form field terlalu rapat.
- Membuat mobile padding kurang dari 16px.
- Memperbesar spacing otomatis di wide desktop.

## 19. Spacing Review Checklist

Sebelum UI dianggap selesai, cek:

- Apakah semua spacing mengikuti 4px scale?
- Apakah page padding konsisten?
- Apakah gap antar section konsisten?
- Apakah card padding sesuai jenis card?
- Apakah table cukup padat tetapi terbaca?
- Apakah toolbar dekat dengan table/chart yang dikontrol?
- Apakah form field punya jarak yang jelas?
- Apakah mobile layout tidak terlalu rapat?
- Apakah tidak ada nested card dengan padding berlebihan?
- Apakah spacing tidak terasa seperti landing page?

## 20. Kesimpulan

Spacing system Finance Dashboard NextJS harus menjaga keseimbangan antara density dan readability. Gunakan 4px base unit, spacing yang konsisten, page padding yang stabil, table density yang nyaman, dan responsive spacing yang tidak berlebihan.

Dengan aturan ini, dashboard akan tetap rapi dan mudah discan meskipun fitur seperti transactions, reports, budgets, approval, import/export, audit log, dan settings semakin kompleks.
