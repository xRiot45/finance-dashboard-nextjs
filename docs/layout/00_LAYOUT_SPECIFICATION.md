# Layout Specification

Dokumen ini mendefinisikan spesifikasi layout utama untuk Finance Dashboard NextJS. Layout harus mengikuti design system, UI guidelines, spacing system, component library Shadcn UI, routing architecture, dan Feature-Based Architecture yang sudah ditetapkan.

Prinsip utama:

> Layout Finance Dashboard harus terasa seperti aplikasi kerja yang padat, rapi, mudah discan, dan siap enterprise, bukan seperti landing page.

---

## 1. Tujuan Layout Specification

Layout specification dibuat agar:

- Semua halaman dashboard memiliki struktur visual yang konsisten.
- Sidebar, header, content, toolbar, table, chart, dan form tersusun rapi.
- Developer tidak membuat layout berbeda-beda per fitur.
- UI tetap responsive di desktop, tablet, dan mobile.
- Feature-Based Architecture tetap terjaga: `app/` hanya route layout tipis, `shared/layout/app-shell/` menjadi pemilik shell.
- Design system seperti color, typography, spacing, iconography, dan component library digunakan secara konsisten.
- Layout siap untuk fitur enterprise seperti workspace, RBAC, approval, audit log, import/export, dan reports.

---

## 2. Layout Principles

### 2.1 Work-Focused

Dashboard finance adalah aplikasi kerja. Layout harus:

- Mengutamakan data dan action.
- Memiliki hierarki visual yang jelas.
- Tidak menggunakan hero section marketing.
- Tidak menggunakan dekorasi berlebihan.
- Tidak membuat card besar yang kosong.
- Tidak memakai gradient/orb/background dekoratif.
- Tidak membuat spacing terlalu luas seperti landing page.

### 2.2 Dense But Readable

Layout harus cukup padat untuk data finance, tetapi tetap mudah dibaca.

Aturan:

- Gunakan spacing 4px scale.
- Page padding desktop 24-32px.
- Page padding mobile 16px.
- Gap section standar 24px.
- Gap card/grid standar 16px.
- Jangan membuat content menyentuh tepi viewport.
- Jangan membuat wide desktop melebar tanpa batas.

### 2.3 Predictable

Halaman dengan jenis yang sama harus terasa sama.

Contoh:

- Semua list page memiliki page header, toolbar/filter, table, pagination.
- Semua detail page memiliki breadcrumb, title, metadata, main content, side summary jika diperlukan.
- Semua form page memiliki header, form section, action footer.
- Semua report page memiliki filter period, chart, summary, dan detail table.
- Semua settings page memiliki subnavigation dan content area.

---

## 3. Architecture Ownership

Layout mengikuti Feature-Based Architecture.

### 3.1 Route Layout Ownership

Folder `app/` hanya mengatur route-level layout.

Allowed di `app/`:

- `app/layout.tsx`
- `app/(auth)/layout.tsx`
- `app/(dashboard)/layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- Metadata route-level.

Tidak boleh:

- Menyimpan komponen sidebar besar langsung di `app/`.
- Menyimpan logic navigation di `app/`.
- Menyimpan komponen header domain di `app/`.
- Menulis layout page detail langsung di route file.

### 3.2 App Shell Ownership

Dashboard shell berada di:

```txt
shared/layout/app-shell/
├── components/
│   ├── dashboard-shell.tsx
│   ├── app-sidebar.tsx
│   ├── app-header.tsx
│   ├── workspace-switcher.tsx
│   ├── user-menu.tsx
│   ├── notification-button.tsx
│   ├── global-search-button.tsx
│   └── mobile-navigation-drawer.tsx
├── constants/
│   └── navigation-items.ts
├── hooks/
│   └── use-navigation-items.ts
├── stores/
│   └── app-shell-store.ts
└── index.ts
```

Route layout hanya mengimpor shell.

```tsx
import { DashboardShell } from "@/shared/layout/app-shell/"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardShell>{children}</DashboardShell>
}
```

---

## 4. Global Layout Hierarchy

Hierarki layout utama:

```txt
RootLayout
├── Providers
│   ├── ThemeProvider
│   ├── QueryProvider
│   ├── TooltipProvider
│   └── ToastProvider
├── AuthLayout
│   └── AuthPageContent
└── DashboardLayout
    └── DashboardShell
        ├── AppSidebar
        ├── AppHeader
        └── MainContent
            └── FeaturePage
```

### 4.1 Root Layout

Root layout bertanggung jawab untuk:

- HTML shell.
- Global font.
- Global stylesheet.
- Global providers.
- Toast container.
- Theme support.

Root layout tidak boleh:

- Menampilkan sidebar.
- Menampilkan dashboard header.
- Mengambil data finance.
- Menentukan active workspace.

### 4.2 Auth Layout

Auth layout digunakan untuk:

- `/login`
- `/register`
- `/forgot-password`
- `/invitation/[invitationToken]`

Karakter:

- Minimal.
- Tanpa sidebar.
- Tanpa dashboard header.
- Layout single column.
- Form berada di tengah dengan width terbatas.
- Brand hanya sebagai pendukung, bukan hero marketing.

### 4.3 Dashboard Layout

Dashboard layout digunakan untuk route dashboard.

Karakter:

- Protected.
- Memiliki sidebar.
- Memiliki header.
- Memiliki main content.
- Mendukung workspace switcher.
- Mendukung responsive mobile drawer.
- Mendukung permission-aware navigation.

---

## 5. Dashboard Shell Structure

Struktur shell:

```txt
DashboardShell
├── AppSidebar
├── ShellBody
│   ├── AppHeader
│   └── MainContent
│       └── PageContent
└── MobileNavigationDrawer
```

Desktop layout:

```txt
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Header                                            │
│         ├───────────────────────────────────────────────────┤
│         │ Main Content                                      │
│         │                                                   │
│         │ Page Header                                       │
│         │ Toolbar                                           │
│         │ Content                                           │
│         │                                                   │
└─────────┴───────────────────────────────────────────────────┘
```

Mobile layout:

```txt
┌─────────────────────────────┐
│ Header                      │
├─────────────────────────────┤
│ Main Content                │
│ Page Header                 │
│ Content                     │
└─────────────────────────────┘

Sidebar -> Drawer
```

---

## 6. App Shell Dimensions

### 6.1 Sidebar

| Property | Value |
|---|---|
| Desktop width | 256px |
| Collapsed width | 64px |
| Minimum width | 240px |
| Maximum width | 280px |
| Padding | 12-16px |
| Nav item height | 36-40px |
| Nav item radius | 6-8px |
| Icon size | 18px |
| Icon-label gap | 8-10px |

Rules:

- Sidebar persistent di desktop.
- Sidebar drawer di mobile.
- Sidebar collapsed hanya untuk desktop/tablet.
- Active item harus jelas.
- Disabled/hidden item mengikuti permission.
- Jangan membuat nav item terlalu tinggi.

### 6.2 Header

| Property | Value |
|---|---|
| Height | 56-64px |
| Horizontal padding desktop | 16-24px |
| Horizontal padding mobile | 12-16px |
| Control gap | 8-12px |
| Icon button size | 36-40px |
| Border bottom | 1px token border |

Rules:

- Header rendah dan fungsional.
- Workspace aktif harus terlihat.
- Header tidak boleh menjadi hero.
- Header tidak boleh penuh action.
- Primary action page tidak ditempatkan di app header kecuali global action.

### 6.3 Main Content

| Property | Desktop | Mobile |
|---|---:|---:|
| Padding inline | 24-32px | 16px |
| Padding top | 20-24px | 16px |
| Padding bottom | 32px | 24px |
| Max width | 1440px recommended | Full width |
| Section gap | 24px | 20px |

Rules:

- Main content boleh full width dalam shell, tetapi tetap constrained di wide desktop.
- Table dan chart boleh memakai ruang lebih lebar.
- Form dan settings content harus memiliki max width agar nyaman dibaca.
- Jangan membuat content melebar sampai sulit discan di monitor wide.

---

## 7. Page Structure Standard

Setiap halaman dashboard mengikuti struktur:

```txt
Page
├── PageHeader
│   ├── Breadcrumb optional
│   ├── Title
│   ├── Description optional
│   └── Actions optional
├── PageToolbar optional
├── PageContent
│   ├── PrimarySection
│   └── SupportingSection optional
└── PageFooter optional
```

### 7.1 Page Header

Page header berisi:

- Breadcrumb jika halaman detail/edit/settings/report nested.
- Title.
- Description opsional.
- Primary action.
- Secondary action opsional melalui menu/button secondary.

Rules:

- Title tidak boleh hero-scale.
- Description hanya jika membantu.
- Maksimal satu primary action terlihat.
- Secondary action seperti Export/Import masuk button secondary atau dropdown menu.
- Pada mobile, action boleh turun ke bawah title.

Desktop:

```txt
Title + Description                         Primary Action
```

Mobile:

```txt
Title
Description
Primary Action
```

### 7.2 Page Toolbar

Toolbar digunakan untuk:

- Search.
- Filter.
- Sort.
- Date range.
- Saved view.
- Export/import secondary action.
- Bulk action jika ada selected rows.

Rules:

- Toolbar berada setelah page header.
- Toolbar tidak boleh menggantikan header.
- Search/filter state penting harus sinkron dengan URL.
- Pada mobile, toolbar boleh menjadi stacked atau membuka filter sheet.

### 7.3 Page Content

Page content berisi data utama.

Jenis content:

- Metric grid.
- Chart grid.
- Table.
- Form.
- Detail panel.
- Settings section.
- Audit timeline.
- Import preview.
- Report visualization.

Rules:

- Main content tidak boleh berada dalam card besar yang membungkus seluruh halaman.
- Card digunakan untuk item/section yang memang butuh frame.
- Jangan menaruh card di dalam card.
- Section besar sebaiknya berupa layout unframed dengan komponen di dalamnya.

---

## 8. Page Container Rules

Gunakan container sesuai jenis halaman.

| Page Type | Container Width |
|---|---|
| Dashboard overview | Wide, max 1440px |
| Transactions list | Wide/full available |
| Reports | Wide, max 1440px |
| Settings form | Medium, max 960px |
| Create/edit form | Medium, max 960px |
| Detail page | Wide with optional side panel |
| Auth page | Narrow, max 420-480px |

Rekomendasi class concept:

```txt
page-container
page-container-wide
page-container-narrow
page-container-form
```

Jika dibuat sebagai component:

```tsx
<PageContainer variant="wide">
  {children}
</PageContainer>
```

Aturan:

- Container variant harus konsisten.
- Jangan menentukan width random per halaman.
- Jangan memakai full viewport width untuk form panjang.
- Jangan memakai narrow width untuk table data.

---

## 9. Grid System

Grid menggunakan CSS grid/Tailwind grid.

### 9.1 Metric Grid

Metric card responsive:

| Viewport | Columns |
|---|---:|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 4 |
| Wide | 4 |

Gap:

- 16px desktop.
- 12-16px mobile.

### 9.2 Dashboard Chart Grid

Dashboard chart layout:

| Viewport | Columns |
|---|---:|
| Mobile | 1 |
| Tablet | 1-2 |
| Desktop | 2 |
| Wide | 2 |

Rules:

- Chart utama boleh span 2 columns.
- Chart tidak boleh terlalu pendek.
- Skeleton chart harus menjaga height agar tidak layout shift.

### 9.3 Detail Page Grid

Detail page desktop:

```txt
Main Detail Content        Side Summary
minmax(0, 1fr)             320-360px
```

Mobile:

```txt
Main Detail Content
Side Summary
```

### 9.4 Settings Grid

Desktop:

```txt
Settings Navigation        Settings Content
240px                      minmax(0, 1fr)
```

Mobile:

```txt
Settings Tabs / Select
Settings Content
```

---

## 10. Responsive Breakpoints

Gunakan breakpoint Tailwind/default project secara konsisten.

| Viewport | Behavior |
|---|---|
| Mobile | Single column, sidebar drawer, table horizontal scroll |
| Tablet | Two-column cards where useful, sidebar can remain drawer/collapsed |
| Desktop | Persistent sidebar, full header controls, wide content |
| Wide desktop | Content constrained, avoid unlimited stretch |

Rules:

- Mobile first.
- Header action harus wrap dengan rapi.
- Table boleh horizontal scroll di mobile.
- Form selalu single column di mobile.
- Filter kompleks menjadi sheet/drawer di mobile.
- Jangan mengecilkan font mengikuti viewport width.
- Jangan membuat text overlap dengan button/action.

---

## 11. Desktop Layout Rules

Desktop adalah layout utama untuk dashboard finance.

Rules:

- Sidebar persistent.
- Header sticky jika membantu navigasi.
- Page content menggunakan padding 24-32px.
- Table full width dalam content.
- Toolbar dalam satu baris jika cukup ruang.
- Metrics dapat 4 columns.
- Settings menggunakan side navigation.
- Detail page dapat menggunakan side summary panel.

Anti-pattern:

- Content terlalu narrow untuk table.
- Terlalu banyak card kecil yang tidak perlu.
- Header menjadi terlalu tinggi.
- Sidebar item terlalu renggang.

---

## 12. Mobile Layout Rules

Mobile harus tetap usable, meskipun dashboard finance lebih optimal di desktop.

Rules:

- Sidebar menjadi drawer.
- Header hanya menampilkan menu button, workspace, notification/user action yang penting.
- Page padding 16px.
- Page header action turun ke bawah jika tidak cukup ruang.
- Table menggunakan horizontal scroll atau card list khusus jika diperlukan.
- Filter kompleks masuk sheet.
- Metric card 1 column.
- Chart 1 column.
- Form 1 column.
- Dialog besar dapat memakai drawer.

Mobile header minimum:

```txt
[Menu] [Workspace]                         [Notifications] [User]
```

Anti-pattern:

- Memaksa desktop table tanpa scroll.
- Menyembunyikan primary action tanpa alternatif.
- Header controls terlalu banyak.
- Text button terpotong.

---

## 13. Sidebar Layout

Detail lengkap sidebar akan didefinisikan di `01_SIDEBAR_SPECIFICATION.md`, tetapi aturan globalnya:

Sidebar terdiri dari:

- Brand/app identity.
- Workspace context optional.
- Main navigation.
- Secondary navigation optional.
- Footer/user/help optional.

Urutan navigasi:

```txt
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

- Navigation config berada di `shared/layout/app-shell//constants/navigation-items.ts`.
- Navigation permission-aware.
- Active route harus jelas.
- Label desktop harus terlihat.
- Collapsed mode tetap memiliki tooltip.
- Mobile sidebar menggunakan drawer.

---

## 14. Header Layout

Detail lengkap header akan didefinisikan di `02_HEADER_SPECIFICATION.md`, tetapi aturan globalnya:

Header dapat berisi:

- Mobile menu button.
- Breadcrumb compact atau page context optional.
- Workspace switcher.
- Global search.
- Notification button.
- Theme toggle.
- User menu.

Rules:

- Workspace aktif harus terlihat.
- Header action global saja.
- Page-specific primary action berada di page header, bukan app header.
- Header tidak boleh lebih tinggi dari 64px pada desktop.
- Header harus memiliki border bottom halus.

---

## 15. Page Type Specifications

### 15.1 Dashboard Overview

Struktur:

```txt
PageHeader
PeriodFilter
MetricGrid
DashboardChartGrid
RecentTransactions + BudgetSummary
```

Rules:

- Metric grid 1/2/4 columns.
- Chart utama berada setelah metric.
- Recent transactions harus mudah dipindai.
- Budget warning/exceeded terlihat jelas.

### 15.2 List Page

Contoh:

- Transactions.
- Accounts.
- Categories.
- Budgets.
- Audit logs.
- Import jobs.
- Export jobs.

Struktur:

```txt
PageHeader
Toolbar
Table
Pagination
```

Rules:

- Search/filter/sort di toolbar.
- Pagination di bawah table.
- Bulk action muncul saat row dipilih.
- Empty, loading, error, filtered empty harus tersedia.

### 15.3 Detail Page

Contoh:

- Transaction detail.
- Account detail.
- Budget detail.
- Audit log detail.
- Import detail.
- Export detail.

Struktur:

```txt
Breadcrumb
PageHeader
MainDetailGrid
├── DetailContent
└── SideSummary
```

Rules:

- Breadcrumb wajib untuk detail.
- Side summary optional di desktop.
- Mobile side summary turun ke bawah.
- Action destructive tidak menjadi primary action.

### 15.4 Create/Edit Form Page

Struktur:

```txt
Breadcrumb optional
PageHeader
FormContainer
FormSections
ActionFooter
```

Rules:

- Form max width 960px.
- Field menggunakan `Field` dan `FieldGroup`.
- Action footer sticky hanya jika form panjang dan tidak mengganggu.
- Cancel/Back tersedia.
- Submit disabled saat pending/invalid.

### 15.5 Report Page

Struktur:

```txt
PageHeader
ReportFilterToolbar
SummaryCards
PrimaryChart
SupportingCharts
DetailTable
ExportAction
```

Rules:

- Period filter jelas.
- Chart di atas table detail.
- Export action secondary.
- Query state report masuk URL.
- Empty report period harus ditangani.

### 15.6 Settings Page

Struktur desktop:

```txt
PageHeader
SettingsLayout
├── SettingsNavigation
└── SettingsContent
```

Struktur mobile:

```txt
PageHeader
SettingsTabsOrSelect
SettingsContent
```

Rules:

- Settings content max width 960px.
- Section form tidak terlalu lebar.
- Destructive settings berada di section terpisah.
- Permission state harus jelas.

---

## 16. Component Layout Rules

### 16.1 Card

Card digunakan untuk:

- Metric.
- Chart panel.
- Repeated item.
- Detail summary.
- Settings section.

Rules:

- Border radius mengikuti design system, maksimal 8px kecuali primitive mengatur lain.
- Jangan memasukkan card di dalam card.
- Card padding default 16-24px.
- Card header ke content 12-16px.
- Card tidak boleh menjadi wrapper seluruh page.

### 16.2 Table

Rules:

- Table berada dalam surface yang jelas.
- Header sticky optional untuk table panjang.
- Horizontal scroll mobile.
- Cell padding konsisten.
- Row action compact.
- Empty state tidak merusak table height.

### 16.3 Chart

Rules:

- Chart berada dalam chart card/panel.
- Chart memiliki height stabil.
- Tooltip dan legend tidak overlap.
- Mobile chart tetap terbaca.
- Skeleton mengikuti ukuran chart.

### 16.4 Form

Rules:

- Field gap 16px.
- Section gap 24px.
- Label selalu tersedia.
- Error message dekat field.
- Two-column form hanya untuk desktop dan field yang pendek.
- Mobile selalu single column.

---

## 17. Spacing Rules

Spacing mengikuti `04_SPACING_SYSTEM.md`.

Core spacing:

| Relationship | Gap |
|---|---:|
| Page header ke toolbar | 16px |
| Toolbar ke content | 16px |
| Section ke section | 24px |
| Major dashboard block ke block | 24-32px |
| Card grid gap | 16px |
| Form field gap | 16px |
| Card title ke content | 12-16px |

Rules:

- Gunakan `gap-*`, bukan margin acak.
- Hindari nilai random seperti 13px atau 27px.
- Jangan membuat spacing desktop otomatis sangat besar.
- Mobile tidak boleh kurang dari 16px page padding.

---

## 18. Typography In Layout

Typography mengikuti `03_TYPOGRAPHY.md`.

Rules:

- Page title menggunakan ukuran dashboard, bukan hero.
- Section title lebih kecil dari page title.
- Card title compact.
- Table text harus mudah dibaca.
- Metric number boleh lebih menonjol tetapi tidak merusak layout.
- Letter spacing normal, tidak negative.
- Monospace hanya untuk ID, code, timestamp, atau numeric tertentu jika diperlukan.

Hierarchy:

```txt
Page title
Section title
Card title
Body/table text
Caption/metadata
```

---

## 19. Color And Surface Rules

Color mengikuti `02_COLOR_SYSTEM.md`.

Rules:

- Background utama menggunakan token background.
- Surface/card menggunakan token card atau muted sesuai konteks.
- Border halus untuk memisahkan area.
- Status color digunakan terbatas.
- Jangan memakai warna status sebagai background besar.
- Dark mode harus tetap kontras.
- Jangan membuat layout didominasi satu warna mencolok.

Surface hierarchy:

```txt
App background
Sidebar/header surface
Page content background
Card/table surface
Interactive hover/active state
```

---

## 20. Icon Layout Rules

Icon mengikuti `05_ICONOGRAPHY.md`.

Rules:

- Sidebar icon 18px.
- Header icon button 18-20px.
- Button icon 16px untuk button kecil, 18px untuk default.
- Icon dan label gap 8px.
- Icon-only action harus punya tooltip atau accessible label.
- Jangan menggambar icon manual jika Lucide tersedia.

---

## 21. Layout State Rules

Semua layout harus memiliki state yang jelas.

State wajib:

- Loading.
- Empty.
- Error.
- Permission denied.
- Disabled.
- Success feedback jika mutation.
- Filtered empty untuk list/report.

Rules:

- Loading skeleton mengikuti struktur layout asli.
- Error state tidak menggeser layout secara ekstrem.
- Empty state memiliki CTA hanya jika user punya permission.
- Permission denied tidak membocorkan data sensitif.
- Disabled action tetap terlihat jika membantu pemahaman, atau disembunyikan jika permission policy mengharuskan.

---

## 22. Workspace And Permission Layout

Workspace adalah konteks utama dashboard.

Rules:

- Workspace aktif terlihat di header.
- Switch workspace berada di header.
- Setelah switch workspace, route aman seperti `/dashboard` dapat digunakan.
- Navigation item disembunyikan jika user tidak punya permission.
- Page action disembunyikan/disabled berdasarkan permission.
- Permission denied state harus tersedia untuk deep link.

Layout tidak boleh mengandalkan UI-only permission untuk security. Server tetap sumber kebenaran.

---

## 23. Scroll Behavior

Aturan scroll:

- Body/shell harus menghindari double scroll yang membingungkan.
- Sidebar dapat scroll sendiri jika item banyak.
- Main content scroll vertical.
- Table mobile dapat scroll horizontal.
- Header dapat sticky jika tidak mengganggu.
- Dialog/drawer memiliki scroll area sendiri jika content panjang.

Recommended:

```txt
Viewport
├── Sidebar scroll area
└── Main content scroll area
```

Anti-pattern:

- Sidebar dan body sama-sama scroll tidak terkontrol.
- Sticky header menutupi content.
- Dialog panjang tanpa scroll internal.

---

## 24. Z-Index And Overlay Rules

Overlay harus konsisten.

Urutan umum:

```txt
Base page
Sticky header/sidebar
Dropdown/popover/tooltip
Sheet/drawer
Dialog/alert dialog
Toast
```

Rules:

- Jangan menentukan z-index acak di banyak component.
- Gunakan primitive Shadcn untuk dialog/popover/dropdown.
- Overlay harus memiliki focus management.
- Mobile drawer tidak boleh tertutup header.
- Toast tidak boleh menutupi primary action penting terlalu lama.

---

## 25. Implementation Components

Komponen layout yang disarankan:

```txt
shared/layout/app-shell//components/dashboard-shell.tsx
shared/layout/app-shell//components/app-sidebar.tsx
shared/layout/app-shell//components/app-header.tsx
shared/layout/app-shell//components/main-content.tsx
shared/layout/app-shell//components/page-container.tsx
shared/layout/app-shell//components/page-header.tsx
shared/layout/app-shell//components/page-toolbar.tsx
shared/layout/app-shell//components/mobile-navigation-drawer.tsx
```

Feature page dapat memakai:

```tsx
<PageContainer variant="wide">
  <PageHeader
    title="Transactions"
    description="Track income, expenses, transfers, and adjustments."
    actions={<CreateTransactionButton />}
  />
  <PageToolbar>{/* filters */}</PageToolbar>
  <TransactionsTable />
</PageContainer>
```

Rules:

- Layout component umum berada di app shell jika spesifik dashboard shell.
- Primitive reusable yang tidak domain-specific dapat masuk `shared/components`.
- Jangan membuat page header berbeda-beda di setiap feature jika pola sama.

---

## 26. Suggested Layout Component API

Contoh API:

```tsx
type PageContainerVariant = "default" | "wide" | "narrow" | "form"

type PageContainerProps = {
  variant?: PageContainerVariant
  children: React.ReactNode
}

export function PageContainer({
  variant = "default",
  children,
}: PageContainerProps) {
  return <main>{children}</main>
}
```

Page header:

```tsx
type PageHeaderProps = {
  title: string
  description?: string
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
}
```

Toolbar:

```tsx
type PageToolbarProps = {
  children: React.ReactNode
}
```

Rules:

- API component harus sederhana.
- Jangan membuat prop boolean terlalu banyak.
- Gunakan composition untuk area actions/toolbar.
- Ikuti coding standard React.

---

## 27. Route To Layout Mapping

| Route Area | Layout Pattern |
|---|---|
| `/dashboard` | Dashboard overview layout |
| `/transactions` | List page layout |
| `/transactions/new` | Form page layout |
| `/transactions/[transactionId]` | Detail page layout |
| `/transactions/[transactionId]/edit` | Form page layout |
| `/accounts` | List page layout |
| `/accounts/[accountId]` | Detail page layout |
| `/budgets` | List + summary layout |
| `/reports/**` | Report layout |
| `/approvals` | Queue/list layout |
| `/imports` | Workflow/list layout |
| `/exports` | List/detail layout |
| `/audit-logs` | Audit table/timeline layout |
| `/settings/**` | Settings layout |

---

## 28. Quality Requirements

Setiap layout harus memenuhi:

- Responsive.
- Dark mode ready.
- Accessible.
- Keyboard usable.
- Tidak ada overlap text/action.
- Tidak ada layout shift besar.
- Loading skeleton stabil.
- Empty/error state jelas.
- Permission state jelas.
- Content tidak melebar tanpa batas.
- Table mobile tetap bisa dibaca.

---

## 29. Anti-Pattern

Hindari pola berikut:

- Membuat layout dashboard langsung di `app/(dashboard)/layout.tsx` dengan banyak logic UI.
- Membuat page full card yang membungkus semua content.
- Menaruh card di dalam card.
- Membuat hero section di dashboard internal.
- Membuat spacing random per halaman.
- Membuat page action berbeda posisi antar list page.
- Membuat sidebar mobile tanpa drawer/focus management.
- Membuat table mobile tanpa horizontal scroll.
- Membuat form terlalu lebar di desktop.
- Membuat chart tanpa height stabil.
- Membuat header terlalu tinggi dan ramai.
- Membuat page title terlalu besar.
- Mengabaikan permission denied deep link.

---

## 30. Layout Checklist

Gunakan checklist ini saat membuat halaman baru.

| Checklist | Status |
|---|---|
| Menggunakan layout pattern sesuai page type | Required |
| `app/` tetap tipis dan shell berada di `shared/layout/app-shell/` | Required |
| Page header memiliki title dan action yang konsisten | Required |
| Toolbar/filter berada di posisi standar | Required jika ada filter |
| Content width sesuai jenis halaman | Required |
| Spacing mengikuti 4px scale | Required |
| Mobile layout single column atau scrollable dengan benar | Required |
| Sidebar/header behavior sesuai app shell | Required |
| Loading, empty, error, permission state tersedia | Required |
| Tidak ada card di dalam card | Required |
| Table mobile dapat discroll horizontal | Required jika ada table |
| Form tidak terlalu lebar | Required jika ada form |
| Chart memiliki height stabil | Required jika ada chart |
| Dark mode dan accessibility dipertimbangkan | Required |

---

## 31. Ringkasan Keputusan

Keputusan layout utama untuk Finance Dashboard:

- Layout menggunakan dashboard shell: sidebar, header, dan main content.
- `app/` hanya route-level layout tipis.
- Implementasi shell berada di `shared/layout/app-shell/`.
- Desktop menggunakan persistent sidebar.
- Mobile menggunakan sidebar drawer.
- Page structure standar: page header, toolbar opsional, content, footer opsional.
- Page padding desktop 24-32px dan mobile 16px.
- Metric grid 1/2/4 columns.
- Table/list page menggunakan toolbar dan pagination konsisten.
- Detail page dapat memakai side summary di desktop.
- Form page menggunakan max width agar nyaman dibaca.
- Report page menempatkan filter, summary, chart, dan table secara berurutan.
- Layout harus mengikuti design system, spacing system, typography, color system, iconography, component library, routing, state management, dan coding standards.
