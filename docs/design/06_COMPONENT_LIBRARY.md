# Finance Dashboard NextJS - Component Library

## 1. Ringkasan

Project Finance Dashboard NextJS menggunakan **Shadcn UI** sebagai fondasi component library. Komponen Shadcn UI disimpan sebagai source code di project, sehingga dapat dikomposisi dan disesuaikan dengan design system tanpa bergantung pada black-box package.

Dokumen ini menjelaskan:

- Komponen UI yang tersedia.
- Cara memilih komponen untuk kebutuhan dashboard finance.
- Aturan komposisi komponen.
- Pola penggunaan untuk table, form, card, chart, dialog, sidebar, dan feedback.
- Batas antara komponen `shared` dan komponen `features`.
- Checklist agar implementasi UI tetap konsisten dan enterprise-ready.

## 2. Component Library Principles

### 2.1 Compose, Do Not Reinvent

Gunakan komponen Shadcn UI yang sudah tersedia sebelum membuat komponen custom. Custom component hanya dibuat jika:

- Komponen tersebut spesifik domain finance.
- Komposisi Shadcn UI perlu dibungkus untuk reuse.
- Ada kebutuhan layout atau behavior yang tidak tersedia sebagai primitive.

### 2.2 Shared Primitive, Feature Composition

Primitive seperti `Button`, `Card`, `Table`, `Dialog`, dan `Badge` berada di `shared/components/ui/`.

Komponen domain seperti `TransactionForm`, `MetricCard`, `BudgetUsageBar`, dan `ApprovalQueueTable` berada di `features/*/components/`.

### 2.3 Semantic Tokens Only

Gunakan token design system:

- `bg-background`
- `bg-card`
- `text-foreground`
- `text-muted-foreground`
- `border-border`
- `bg-primary`
- `text-primary-foreground`
- `bg-destructive`

Hindari warna raw seperti `bg-blue-500`, `text-green-600`, atau hex langsung di komponen.

### 2.4 State Is Required

Setiap komponen feature harus mempertimbangkan:

- Loading state.
- Empty state.
- Error state.
- Disabled state.
- Permission state.
- Success feedback.

## 3. Project Component Location

Komponen Shadcn UI saat ini berada di:

```text
shared/components/ui/
```

Import pattern saat ini di kode menggunakan:

```tsx
import { Button } from "@/shared/components/ui/button"
```

Catatan:

- `components.json` masih memiliki alias default `@/components/ui`, tetapi implementasi repo saat ini berada di `shared/components/ui`.
- Selama struktur project belum disesuaikan, gunakan import yang sesuai dengan file aktual repo.
- Jika nanti alias diperbaiki, dokumentasi import dapat disesuaikan.

## 4. Available UI Components

Komponen yang tersedia di `shared/components/ui/`:

| Category | Components |
| --- | --- |
| Actions | `button`, `button-group`, `toggle`, `toggle-group` |
| Data Display | `card`, `table`, `badge`, `avatar`, `kbd`, `item` |
| Forms | `input`, `input-group`, `textarea`, `label`, `field`, `checkbox`, `radio-group`, `select`, `native-select`, `combobox`, `slider`, `switch`, `calendar`, `input-otp` |
| Navigation | `sidebar`, `breadcrumb`, `navigation-menu`, `tabs`, `pagination`, `menubar` |
| Overlay | `dialog`, `alert-dialog`, `sheet`, `drawer`, `popover`, `hover-card`, `tooltip`, `dropdown-menu`, `context-menu`, `command` |
| Feedback | `alert`, `sonner`, `progress`, `skeleton`, `spinner`, `empty` |
| Layout | `separator`, `scroll-area`, `resizable`, `aspect-ratio`, `accordion`, `collapsible`, `carousel`, `direction` |
| Data Visualization | `chart` |
| Messaging | `message`, `message-scroller`, `bubble`, `attachment`, `marker` |

## 5. Component Selection Guide

| Need | Use |
| --- | --- |
| Primary/secondary action | `Button` |
| Grouped actions | `ButtonGroup` |
| Metric summary | `Card` + domain metric component |
| Finance table | `Table` + feature table composition |
| Status label | `Badge` |
| Main navigation | `Sidebar` |
| Page breadcrumb | `Breadcrumb` |
| Tabbed settings/report views | `Tabs` |
| Pagination | `Pagination` |
| Modal form/detail | `Dialog` |
| Destructive confirmation | `AlertDialog` |
| Side detail/filter panel | `Sheet` |
| Mobile bottom panel | `Drawer` |
| Dropdown actions | `DropdownMenu` |
| Command/global search | `Command` inside `Dialog` |
| Tooltip help | `Tooltip` |
| Small contextual preview | `HoverCard` |
| Loading placeholder | `Skeleton` |
| Loading action | `Spinner` |
| Empty data | `Empty` |
| Toast feedback | `sonner` |
| Chart | `Chart` wrapper with Recharts |
| Form layout | `Field`, `FieldGroup`, `FieldSet` |
| Search input with icon/button | `InputGroup` |
| Select option | `Select` or `Combobox` |

## 6. Component Categories

## 6.1 Buttons And Actions

Use:

- `Button`
- `ButtonGroup`
- `Toggle`
- `ToggleGroup`

### Button Rules

- Gunakan `Button` untuk semua action, jangan membuat styled `div`.
- Gunakan variant bawaan sebelum custom style.
- Satu area hanya punya satu primary action utama.
- Destructive action memakai destructive treatment dan confirmation.
- Button loading memakai `Spinner` + `disabled`, bukan prop custom seperti `isLoading`.

### Recommended Usage

| Use Case | Button Variant |
| --- | --- |
| Add Transaction | Primary/default |
| Save | Primary/default |
| Export CSV | Secondary/outline |
| Reset Filter | Ghost/outline |
| Delete/Reject | Destructive |
| Row action trigger | Ghost icon button |

### Icon In Button

Ikon dalam button harus memakai `data-icon`.

```tsx
<Button>
    <PlusIcon data-icon="inline-start" />
    Add Transaction
</Button>
```

Rules:

- Jangan memberi sizing class pada icon di dalam `Button`.
- Icon-only button wajib punya `aria-label`.

## 6.2 Cards

Use:

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

### Card Rules

- Gunakan full composition.
- Jangan dump semua isi ke `CardContent`.
- Card digunakan untuk metric, chart panel, summary panel, repeated item, dan empty state.
- Jangan membuat nested card kecuali benar-benar diperlukan.
- Jangan membuat semua section menjadi floating card.

### Finance Card Patterns

| Pattern | Composition |
| --- | --- |
| Metric Card | `Card` + `CardHeader` compact + `CardContent` value/trend |
| Chart Card | `CardHeader` title/filter + `CardContent` chart |
| Budget Card | `CardHeader` + `Progress` + status |
| Account Summary | `CardHeader` + balance + metadata |

## 6.3 Tables

Use:

- `Table`
- `TableHeader`
- `TableBody`
- `TableRow`
- `TableHead`
- `TableCell`

### Table Rules

- Gunakan `Table` untuk transaction, account, category, budget, report, audit, approval, import/export job.
- Search/filter toolbar berada di atas table.
- Pagination berada di bawah table.
- Amount rata kanan.
- Status memakai `Badge`.
- Row action memakai `DropdownMenu`.
- Loading memakai `Skeleton`.
- Empty data memakai `Empty`.

### Feature Table Components

Komponen domain yang disarankan:

```text
features/transactions/components/transactions-table.tsx
features/accounts/components/accounts-table.tsx
features/budgets/components/budgets-table.tsx
features/audit-logs/components/audit-logs-table.tsx
features/approvals/components/approval-queue-table.tsx
```

## 6.4 Forms

Use:

- `Field`
- `FieldGroup`
- `FieldSet`
- `FieldLegend`
- `FieldLabel`
- `FieldDescription`
- `Input`
- `InputGroup`
- `Textarea`
- `Select`
- `Combobox`
- `Checkbox`
- `RadioGroup`
- `Switch`
- `Slider`
- `Calendar`

### Form Rules

- Form layout menggunakan `FieldGroup` dan `Field`.
- Jangan memakai raw `div` + manual spacing untuk field layout.
- Validation memakai `data-invalid` pada `Field`.
- Control invalid memakai `aria-invalid`.
- Related checkbox/radio menggunakan `FieldSet` dan `FieldLegend`.
- Searchable option banyak menggunakan `Combobox`.
- Option 2-7 pilihan menggunakan `ToggleGroup`.

### Finance Form Patterns

| Form | Important Components |
| --- | --- |
| Transaction Form | `FieldGroup`, `Input`, `Select`, `Combobox`, `Calendar`, `Textarea`, `InputGroup` |
| Budget Form | `Input`, `Select`, `Calendar`, `Slider` optional |
| Account Form | `Input`, `Select`, `Switch` |
| Category Form | `Input`, `Select`, `Combobox`, `ToggleGroup` |
| Approval Reject Form | `Textarea`, `Field`, `Dialog` |

## 6.5 Navigation

Use:

- `Sidebar`
- `Breadcrumb`
- `NavigationMenu`
- `Tabs`
- `Pagination`
- `Menubar`

### Navigation Rules

- Dashboard navigation memakai `Sidebar`.
- Detail/edit page memakai `Breadcrumb`.
- Settings section dapat memakai `Tabs` atau sidebar subnav.
- Reports dengan beberapa view dapat memakai `Tabs`.
- Table list memakai `Pagination`.
- Navigation harus permission-aware.

### Sidebar Items

Navigation icon mapping mengikuti `05_ICONOGRAPHY.md`.

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

## 6.6 Overlays

Use:

- `Dialog`
- `AlertDialog`
- `Sheet`
- `Drawer`
- `Popover`
- `HoverCard`
- `Tooltip`
- `DropdownMenu`
- `ContextMenu`
- `Command`

### Overlay Rules

- `Dialog`, `Sheet`, dan `Drawer` wajib punya title.
- Jika title disembunyikan secara visual, gunakan `sr-only`.
- Destructive confirmation memakai `AlertDialog`.
- Row action memakai `DropdownMenu`.
- Advanced filter desktop dapat memakai `Popover` atau `Sheet`.
- Advanced filter mobile sebaiknya memakai `Sheet` atau `Drawer`.
- Global search memakai `Command` di dalam `Dialog`.

### Overlay Selection

| Need | Use |
| --- | --- |
| Create/edit short form | `Dialog` |
| Detail side panel | `Sheet` |
| Mobile filter panel | `Drawer` atau `Sheet` |
| Delete/archive confirmation | `AlertDialog` |
| Row action menu | `DropdownMenu` |
| Global search | `Command` + `Dialog` |
| Small info help | `Tooltip` |
| Rich preview | `HoverCard` |

## 6.7 Feedback

Use:

- `Alert`
- `sonner`
- `Progress`
- `Skeleton`
- `Spinner`
- `Empty`

### Feedback Rules

- Toast menggunakan `sonner`.
- Callout menggunakan `Alert`.
- Loading placeholder menggunakan `Skeleton`.
- Button pending menggunakan `Spinner`.
- Empty state menggunakan `Empty`.
- Budget usage menggunakan `Progress`.
- Import/export status dapat memakai `Progress` + `Badge`.

### Feedback Patterns

| State | Component |
| --- | --- |
| Transaction saved | `sonner` toast |
| CSV import failed | `Alert` + table row errors |
| Dashboard loading | `Skeleton` |
| Export processing | `Progress` + `Spinner` |
| No transactions | `Empty` |
| Permission denied | `Alert` or dedicated empty/denied state |

## 6.8 Charts

Use:

- `Chart`
- Recharts under the Shadcn chart wrapper.

### Chart Rules

- Chart harus berada dalam card/panel.
- Chart harus punya title.
- Tooltip wajib tersedia.
- Empty state wajib tersedia.
- Gunakan warna dari `02_COLOR_SYSTEM.md`.
- Jangan membuat chart custom tanpa memakai chart wrapper jika wrapper sudah cukup.

### Finance Chart Patterns

| Use Case | Chart Type |
| --- | --- |
| Income vs expense | Line/bar chart |
| Expense by category | Donut/horizontal bar |
| Budget usage | Progress/stacked bar |
| Account balance trend | Line chart |
| Budget vs actual | Bar chart |

## 6.9 Layout Utilities

Use:

- `Separator`
- `ScrollArea`
- `Resizable`
- `AspectRatio`
- `Accordion`
- `Collapsible`
- `Carousel`

### Layout Rules

- Gunakan `Separator`, jangan `<hr>` manual.
- Gunakan `ScrollArea` untuk panel/table area yang butuh scroll.
- Gunakan `Accordion` untuk grouped settings atau FAQ-like content.
- Gunakan `Collapsible` untuk advanced filter atau optional section.
- `Carousel` tidak menjadi komponen utama dashboard finance, gunakan hanya jika benar-benar perlu.

## 7. Domain Component Patterns

Komponen domain dibuat di folder `features/*/components/` dengan komposisi Shadcn UI.

### 7.1 Dashboard Components

```text
MetricCard
CashFlowChartCard
ExpenseCategoryChartCard
BudgetUsageCard
RecentTransactionsTable
DashboardEmptyState
```

Base components:

- `Card`
- `Chart`
- `Table`
- `Badge`
- `Skeleton`
- `Empty`

### 7.2 Transaction Components

```text
TransactionsTable
TransactionForm
TransactionDetail
TransactionFilters
TransactionStatusBadge
TransactionBulkActions
```

Base components:

- `Table`
- `Field`
- `Input`
- `Select`
- `Combobox`
- `Calendar`
- `Badge`
- `DropdownMenu`
- `AlertDialog`

### 7.3 Budget Components

```text
BudgetsTable
BudgetForm
BudgetUsageBar
BudgetStatusBadge
BudgetVarianceCard
```

Base components:

- `Table`
- `Card`
- `Progress`
- `Badge`
- `Field`

### 7.4 Reports Components

```text
ReportsOverview
ReportFilterBar
ReportChart
ReportTable
SavedViewMenu
ExportReportButton
```

Base components:

- `Chart`
- `Table`
- `Tabs`
- `Popover`
- `DropdownMenu`
- `Button`

## 8. Component State Guidelines

Setiap component domain harus mempertimbangkan state berikut:

| State | Recommended Component |
| --- | --- |
| Loading | `Skeleton`, `Spinner` |
| Empty | `Empty` |
| Error | `Alert` |
| Success | `sonner` toast |
| Warning | `Alert`, `Badge` |
| Disabled | Native disabled + muted style |
| Permission denied | `Alert` or denied empty state |
| Processing | `Progress`, `Spinner`, `Badge` |

## 9. Accessibility Rules

- Icon-only button wajib punya `aria-label`.
- Dialog, Sheet, Drawer wajib punya title.
- Form invalid memakai `aria-invalid`.
- Field invalid memakai `data-invalid`.
- Badge status harus punya text.
- Tooltip tidak boleh menjadi satu-satunya sumber informasi penting.
- Table harus punya header yang jelas.
- Dropdown/select item harus berada dalam group yang benar.

## 10. Styling Rules

Ikuti aturan ini:

- Gunakan `gap-*`, jangan `space-x-*` atau `space-y-*`.
- Gunakan `size-*` untuk width dan height yang sama.
- Gunakan `truncate`, jangan manual `overflow-hidden text-ellipsis whitespace-nowrap`.
- Gunakan semantic colors, bukan raw colors.
- Jangan override warna/typography komponen Shadcn tanpa alasan.
- Gunakan `cn()` untuk conditional class.
- Jangan manual z-index untuk overlay.

## 11. Import And Architecture Rules

Karena project menggunakan Feature-Based Architecture:

```text
shared/components/ui/     -> primitive Shadcn UI
features/*/components/    -> domain components
features/*/screens/       -> page composition
app/                      -> routing only
```

Rules:

- `app/` hanya import screen dari `features`.
- `features` boleh import dari `shared/components/ui`.
- `shared/components/ui` tidak boleh import dari `features`.
- Domain component tidak boleh dimasukkan ke `shared/components/ui`.

## 12. Recommended Component Usage By Page

| Page | Components |
| --- | --- |
| Dashboard | `Card`, `Chart`, `Table`, `Badge`, `Progress`, `Skeleton`, `Empty` |
| Transactions | `Table`, `InputGroup`, `Select`, `Combobox`, `DropdownMenu`, `Badge`, `Pagination`, `AlertDialog` |
| Accounts | `Table`, `Card`, `Dialog`, `Field`, `Badge` |
| Categories | `Table`, `Dialog`, `Field`, `Badge`, `ToggleGroup` |
| Budgets | `Card`, `Table`, `Progress`, `Badge`, `Field` |
| Reports | `Chart`, `Table`, `Tabs`, `Popover`, `DropdownMenu`, `Button` |
| Approvals | `Table`, `Dialog`, `Textarea`, `Badge`, `AlertDialog` |
| Imports/Exports | `Card`, `Table`, `Progress`, `Alert`, `Empty`, `Button` |
| Audit Logs | `Table`, `ScrollArea`, `Badge`, `Popover`, `Sheet` |
| Settings | `Tabs`, `Card`, `Field`, `Switch`, `Select`, `AlertDialog` |

## 13. Component Anti-Patterns

Jangan lakukan:

- Membuat custom button dengan `div`.
- Membuat custom badge dengan `span` jika `Badge` cukup.
- Membuat empty state custom jika `Empty` tersedia.
- Membuat loading custom dengan `animate-pulse` manual jika `Skeleton` cukup.
- Memakai raw form layout tanpa `Field`.
- Menaruh `SelectItem` tanpa group.
- Membuat `Dialog` tanpa title.
- Membuat `Card` tanpa `CardHeader`/`CardContent` saat struktur jelas dibutuhkan.
- Menggunakan icon sizing manual di dalam `Button`.
- Menggunakan raw color class seperti `text-green-600`.
- Menaruh domain component di `shared/components/ui`.

## 14. Component Review Checklist

Sebelum component dianggap selesai, cek:

- Apakah memakai komponen Shadcn UI yang sudah tersedia?
- Apakah import path sesuai struktur repo?
- Apakah komponen domain berada di `features/*/components/`?
- Apakah `Card` memakai composition yang lengkap?
- Apakah form memakai `Field`/`FieldGroup`?
- Apakah icon button punya `aria-label`?
- Apakah loading/empty/error state tersedia?
- Apakah status memakai `Badge`?
- Apakah destructive action memakai confirmation?
- Apakah styling memakai semantic token?
- Apakah layout memakai `gap-*`, bukan `space-*`?
- Apakah komponen responsive dan dark-mode friendly?

## 15. Kesimpulan

Component library Finance Dashboard NextJS dibangun di atas Shadcn UI dan dikomposisi sesuai kebutuhan dashboard finance enterprise. Shadcn UI menjadi fondasi primitive, sedangkan komponen domain dibangun di dalam `features`.

Dengan aturan ini, UI akan tetap konsisten, mudah dipelihara, dan siap berkembang untuk modul seperti dashboard, transactions, accounts, budgets, reports, approval workflow, audit log, import/export, notifications, dan settings.
