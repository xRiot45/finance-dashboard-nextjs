# Sidebar Specification

Dokumen ini mendefinisikan spesifikasi sidebar untuk Finance Dashboard NextJS. Sidebar harus mengikuti design system, layout specification, iconography, component library Shadcn UI, routing architecture, state management, naming convention, dan Feature-Based Architecture yang sudah dibuat sebelumnya.

Prinsip utama:

> Sidebar adalah navigasi kerja utama dashboard. Sidebar harus compact, jelas, permission-aware, responsive, dan tidak menjadi elemen dekoratif.

---

## 1. Tujuan Sidebar

Sidebar dibuat untuk:

- Menjadi navigasi utama di desktop.
- Memberikan akses cepat ke modul finance utama.
- Menampilkan struktur produk secara konsisten.
- Mengikuti role dan permission user.
- Mendukung workspace context.
- Mendukung collapsed mode di desktop/tablet.
- Mendukung drawer mode di mobile.
- Menjaga dashboard tetap mudah digunakan saat jumlah fitur bertambah.

---

## 2. Architecture Ownership

Sidebar merupakan bagian dari `features/app-shell`, bukan `app/`.

Lokasi implementasi:

```txt
features/app-shell/
├── components/
│   ├── app-sidebar.tsx
│   ├── sidebar-brand.tsx
│   ├── sidebar-navigation.tsx
│   ├── sidebar-navigation-item.tsx
│   ├── sidebar-navigation-group.tsx
│   ├── sidebar-footer.tsx
│   └── mobile-navigation-drawer.tsx
├── constants/
│   └── navigation-items.ts
├── hooks/
│   └── use-navigation-items.ts
├── stores/
│   └── app-shell-store.ts
└── index.ts
```

Shared primitive sidebar tetap berada di:

```txt
shared/components/ui/sidebar.tsx
```

Aturan:

- `app/(dashboard)/layout.tsx` hanya memanggil `DashboardShell`.
- Sidebar UI tidak ditulis langsung di folder `app`.
- Navigation config tidak ditulis ulang per page.
- Permission filtering dilakukan melalui hook/helper app shell.
- Komponen domain feature tidak boleh mengatur sidebar secara langsung.

---

## 3. Sidebar Anatomy

Struktur sidebar:

```txt
AppSidebar
├── SidebarBrand
├── WorkspaceContext optional
├── SidebarNavigation
│   ├── MainNavigationGroup
│   ├── FinanceNavigationGroup
│   ├── EnterpriseNavigationGroup
│   └── SettingsNavigationGroup
└── SidebarFooter
    ├── CollapseButton
    └── Help/User shortcut optional
```

Minimal structure:

```txt
Brand
Navigation
Footer
```

Expanded desktop:

```txt
┌────────────────────────┐
│ Brand / App Name       │
│ Workspace Context      │
├────────────────────────┤
│ Dashboard              │
│ Transactions           │
│ Accounts               │
│ Categories             │
│ Budgets                │
│ Reports                │
├────────────────────────┤
│ Approvals              │
│ Imports / Exports      │
│ Audit Logs             │
│ Notifications          │
├────────────────────────┤
│ Settings               │
└────────────────────────┘
```

Collapsed desktop:

```txt
┌──────┐
│ Logo │
├──────┤
│ Icon │
│ Icon │
│ Icon │
├──────┤
│ Icon │
└──────┘
```

Mobile:

```txt
Header menu button -> MobileNavigationDrawer -> AppSidebar content
```

---

## 4. Sidebar Dimensions

Sidebar mengikuti layout specification.

| Property | Value |
|---|---|
| Expanded desktop width | 256px |
| Minimum expanded width | 240px |
| Maximum expanded width | 280px |
| Collapsed width | 64px |
| Mobile drawer width | 280-320px |
| Padding | 12-16px |
| Navigation item height | 36-40px |
| Navigation item radius | 6-8px |
| Navigation icon size | 18px |
| Icon-label gap | 8-10px |
| Group gap | 16-24px |
| Item gap | 4px |

Rules:

- Desktop sidebar persistent.
- Mobile sidebar berupa drawer/sheet.
- Collapsed mode hanya untuk desktop/tablet.
- Width tidak boleh berubah antar halaman.
- Hindari sidebar terlalu lebar karena dashboard membutuhkan ruang table/chart.

---

## 5. Visual Style

Sidebar harus mengikuti color system.

Surface:

- Background: app/sidebar surface token.
- Border right: token border.
- Text default: muted foreground.
- Text active: foreground.
- Active background: muted/accent subtle.
- Hover background: muted/accent subtle.
- Disabled text: muted foreground dengan opacity.

Rules:

- Jangan gunakan gradient.
- Jangan gunakan shadow berat.
- Jangan gunakan warna status sebagai background sidebar item.
- Active state harus jelas tetapi tetap subtle.
- Dark mode harus memiliki contrast yang cukup.
- Sidebar tidak boleh lebih mencolok daripada page content.

---

## 6. Navigation Order

Urutan sidebar utama:

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

Grouping yang direkomendasikan:

```txt
Overview
├── Dashboard

Finance
├── Transactions
├── Accounts
├── Categories
├── Budgets
└── Reports

Operations
├── Approvals
├── Imports / Exports
├── Audit Logs
└── Notifications

Administration
└── Settings
```

Rules:

- Group label boleh disembunyikan pada collapsed mode.
- Jika fitur enterprise belum aktif, item tetap boleh disembunyikan dari navigation.
- Jangan mengubah urutan navigation per role kecuali item disembunyikan karena permission.
- Settings selalu berada di bagian bawah atau group terakhir.

---

## 7. Navigation Item Model

Navigation config berada di:

```txt
features/app-shell/constants/navigation-items.ts
```

Type yang direkomendasikan:

```ts
import type { LucideIcon } from "lucide-react"

export type NavigationItem = {
  id: string
  title: string
  href: string
  icon: LucideIcon
  permission?: string
  permissions?: string[]
  permissionMode?: "all" | "any"
  exact?: boolean
  badge?: NavigationItemBadge
  children?: NavigationItem[]
}

export type NavigationItemBadge = {
  value: number | string
  variant: "default" | "warning" | "destructive" | "muted"
}
```

Contoh:

```ts
export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard.view",
    exact: true,
  },
  {
    id: "transactions",
    title: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
    permission: "transactions.view",
  },
  {
    id: "audit-logs",
    title: "Audit Logs",
    href: "/audit-logs",
    icon: ScrollText,
    permission: "audit_logs.view",
  },
]
```

Rules:

- `id` harus stabil.
- `title` adalah label user-facing.
- `href` harus sesuai routing docs.
- `icon` berasal dari Lucide React.
- `permission` digunakan untuk visibility dasar.
- `children` hanya digunakan jika nested navigation benar-benar diperlukan.

---

## 8. Icon Mapping

Gunakan Lucide icon sesuai iconography system.

| Navigation Item | Recommended Icon |
|---|---|
| Dashboard | `LayoutDashboard` atau `Gauge` |
| Transactions | `ReceiptText` |
| Accounts | `WalletCards` atau `Landmark` |
| Categories | `Tags` |
| Budgets | `PiggyBank` |
| Reports | `ChartNoAxesCombined` atau `BarChart3` |
| Approvals | `CircleCheckBig` |
| Imports | `Upload` |
| Exports | `Download` |
| Imports / Exports | `ArrowUpDown` |
| Audit Logs | `ScrollText` |
| Notifications | `Bell` |
| Settings | `Settings` |

Rules:

- Icon size sidebar: 18px.
- Stroke width mengikuti default Lucide atau design system.
- Icon harus diberi `aria-hidden="true"` jika label text terlihat.
- Collapsed mode membutuhkan tooltip atau accessible label.
- Jangan menggambar SVG manual jika Lucide icon tersedia.

---

## 9. Active State Rules

Sidebar harus menandai active route dengan jelas.

Aturan active:

| Route | Active Item |
|---|---|
| `/dashboard` | Dashboard |
| `/transactions` | Transactions |
| `/transactions/new` | Transactions |
| `/transactions/[transactionId]` | Transactions |
| `/transactions/[transactionId]/edit` | Transactions |
| `/accounts/**` | Accounts |
| `/categories/**` | Categories |
| `/budgets/**` | Budgets |
| `/reports/**` | Reports |
| `/approvals/**` | Approvals |
| `/imports/**` | Imports / Exports |
| `/exports/**` | Imports / Exports |
| `/audit-logs/**` | Audit Logs |
| `/notifications` | Notifications |
| `/settings/**` | Settings |

Implementation rule:

- Gunakan exact matching untuk `/dashboard`.
- Gunakan prefix matching untuk resource route lain.
- Jangan membuat dua item active bersamaan kecuali parent-child navigation.

Contoh helper:

```ts
export function isNavigationItemActive(
  pathname: string,
  navigationItem: NavigationItem,
) {
  if (navigationItem.exact) {
    return pathname === navigationItem.href
  }

  return pathname === navigationItem.href || pathname.startsWith(`${navigationItem.href}/`)
}
```

Untuk Imports / Exports gabungan, gunakan `activeHrefs` jika dibutuhkan.

```ts
type NavigationItem = {
  href: string
  activeHrefs?: string[]
}
```

---

## 10. Permission Rules

Sidebar navigation harus permission-aware.

Rules:

- Item yang user tidak punya permission sebaiknya disembunyikan.
- Jika item adalah entry point penting tetapi user terbatas, boleh tampil disabled hanya jika membantu edukasi produk.
- Enterprise-sensitive item seperti Audit Logs harus disembunyikan jika tidak punya permission.
- UI permission hanya untuk UX; server tetap sumber kebenaran.

Permission mapping:

| Item | Permission |
|---|---|
| Dashboard | `dashboard.view` |
| Transactions | `transactions.view` |
| Accounts | `accounts.view` |
| Categories | `categories.view` |
| Budgets | `budgets.view` |
| Reports | `reports.view` |
| Approvals | `approvals.view` atau `approvals.manage` |
| Imports / Exports | `imports.manage` atau `exports.manage` |
| Audit Logs | `audit_logs.view` |
| Notifications | `notifications.view` |
| Settings | `settings.view` |

Hook yang direkomendasikan:

```ts
export function useNavigationItems() {
  const permissions = useCurrentUserPermissions()

  return navigationItems.filter((navigationItem) =>
    canViewNavigationItem(navigationItem, permissions),
  )
}
```

Helper:

```ts
export function canViewNavigationItem(
  navigationItem: NavigationItem,
  permissions: string[],
) {
  if (permissions.includes("*")) {
    return true
  }

  if (navigationItem.permission) {
    return permissions.includes(navigationItem.permission)
  }

  if (navigationItem.permissions?.length) {
    if (navigationItem.permissionMode === "all") {
      return navigationItem.permissions.every((permission) =>
        permissions.includes(permission),
      )
    }

    return navigationItem.permissions.some((permission) =>
      permissions.includes(permission),
    )
  }

  return true
}
```

---

## 11. Workspace Context

Workspace context boleh tampil di sidebar atau header. Berdasarkan layout specification, workspace aktif harus selalu terlihat di header. Sidebar dapat menampilkan workspace context secara compact jika membantu.

Sidebar workspace context dapat berisi:

- Workspace name.
- Plan/status kecil.
- Switch indicator jika sidebar expanded.

Rules:

- Jangan membuat workspace switcher penuh di sidebar jika header sudah menjadi lokasi utama.
- Collapsed sidebar hanya menampilkan logo/avatar workspace jika dibutuhkan.
- Workspace switch action utama tetap berada di header.
- Workspace context tidak boleh membuat sidebar terlalu ramai.

---

## 12. Collapsed Sidebar

Collapsed state digunakan untuk desktop/tablet.

Behavior:

- Width menjadi 64px.
- Label navigation disembunyikan.
- Icon tetap terlihat.
- Group label disembunyikan.
- Badge disederhanakan atau disembunyikan.
- Tooltip muncul saat hover/focus.
- Active state tetap terlihat.
- Collapse preference boleh dipersist.

State owner:

```txt
features/app-shell/stores/app-shell-store.ts
```

atau jika dipakai lintas shell:

```txt
shared/stores/app-store.ts
```

State:

```ts
type AppShellStoreState = {
  isSidebarCollapsed: boolean
  isMobileNavigationOpen: boolean
}
```

Rules:

- Collapsed state tidak berlaku di mobile drawer.
- Toggle collapse harus keyboard accessible.
- Tooltip wajib untuk icon-only navigation.
- Jangan menghapus route access saat collapsed.

---

## 13. Mobile Sidebar Drawer

Mobile sidebar menggunakan drawer/sheet.

Behavior:

- Dibuka dari menu button di header.
- Drawer muncul dari kiri.
- Width 280-320px.
- Focus trap aktif.
- Escape menutup drawer.
- Klik overlay menutup drawer.
- Klik navigation item menutup drawer.
- Body scroll terkunci saat drawer terbuka.

Component:

```txt
features/app-shell/components/mobile-navigation-drawer.tsx
```

Rules:

- Gunakan Shadcn `Sheet` atau `Drawer` sesuai component library.
- Mobile drawer memakai navigation config yang sama dengan desktop sidebar.
- Jangan membuat navigation mobile terpisah dengan data hardcoded.
- Jangan menyembunyikan item penting di mobile jika user punya permission.

---

## 14. Badge And Count Rules

Sidebar boleh menampilkan badge untuk informasi penting.

Contoh:

- Pending approvals count.
- Unread notifications count.
- Failed import count.
- Budget exceeded count jika relevan.

Rules:

- Badge hanya untuk informasi actionable.
- Jangan menampilkan terlalu banyak badge.
- Badge count besar dapat ditulis `99+`.
- Badge tidak boleh memakai warna destructive kecuali benar-benar critical.
- Badge harus tetap terbaca di dark mode.
- Collapsed mode dapat menampilkan dot atau tooltip detail.

Badge mapping:

| Badge | Variant |
|---|---|
| Pending approvals | `warning` |
| Unread notifications | `default` |
| Failed import | `destructive` |
| Budget exceeded | `warning` atau `destructive` sesuai severity |

---

## 15. Navigation Group Rules

Group membantu scan navigation jika fitur banyak.

Rules:

- Maksimal 4 group utama.
- Group label kecil dan muted.
- Group label disembunyikan saat collapsed.
- Jangan membuat group dengan satu item kecuali jelas seperti Administration.
- Jangan membuat nested group terlalu dalam.

Recommended group:

```txt
Overview
Finance
Operations
Administration
```

Jika sidebar terasa terlalu ramai, group label dapat disederhanakan dan separator halus digunakan.

---

## 16. Nested Navigation Rules

Nested navigation hanya digunakan jika benar-benar diperlukan.

Candidate nested item:

- Reports.
- Settings.
- Imports / Exports jika dipisah.

Default recommendation:

- Reports cukup satu item menuju `/reports`.
- Settings cukup satu item menuju `/settings`.
- Subnavigation settings berada di settings page, bukan sidebar utama.
- Imports dan Exports boleh digabung sebagai `Imports / Exports`.

Rules:

- Jangan membuat nested navigation lebih dari 1 level.
- Active parent harus terlihat saat child route aktif.
- Collapsed mode harus tetap usable.
- Mobile drawer harus bisa membuka/menutup nested section.

---

## 17. Accessibility Rules

Sidebar harus accessible.

Rules:

- Sidebar dibungkus dengan `<nav aria-label="Main navigation">`.
- Navigation item menggunakan link, bukan button, jika berpindah route.
- Collapse toggle menggunakan button.
- Icon-only item memiliki tooltip dan accessible label.
- Active item menggunakan `aria-current="page"` jika sesuai.
- Keyboard focus state terlihat.
- Mobile drawer memiliki focus trap.
- Escape menutup mobile drawer.
- Jangan mengandalkan warna saja untuk active state.

Contoh:

```tsx
<Link
  href="/transactions"
  aria-current={isActive ? "page" : undefined}
>
  <ReceiptText aria-hidden="true" />
  <span>Transactions</span>
</Link>
```

---

## 18. Keyboard Interaction

Keyboard behavior:

| Key | Behavior |
|---|---|
| `Tab` | Pindah antar item fokus |
| `Enter` | Aktifkan link/button |
| `Space` | Aktifkan button collapse |
| `Escape` | Tutup mobile drawer |
| Arrow keys | Optional jika memakai roving focus |

Rules:

- Jangan menghapus outline focus tanpa replacement.
- Navigation harus bisa dipakai tanpa mouse.
- Tooltip collapsed harus muncul juga saat focus, bukan hanya hover.

---

## 19. Scroll Behavior

Sidebar dapat memiliki scroll area sendiri.

Rules:

- Brand area tetap di atas.
- Navigation area boleh scroll.
- Footer dapat sticky di bawah jika content cukup.
- Jika navigation panjang, scroll hanya area nav, bukan seluruh shell yang membingungkan.
- Mobile drawer content dapat scroll internal.

Struktur:

```txt
Sidebar
├── Fixed brand
├── Scrollable navigation
└── Fixed footer optional
```

---

## 20. State Management

Sidebar state mengikuti state management architecture.

State yang cocok di Zustand:

- `isSidebarCollapsed`
- `isMobileNavigationOpen`
- `activeNavigationGroup` jika nested group diperlukan

State yang tidak perlu di Zustand:

- Hover item.
- Focus item.
- Tooltip open state.
- Temporary animation state.

Persist:

- `isSidebarCollapsed` boleh dipersist.
- `isMobileNavigationOpen` tidak boleh dipersist.
- `activeNavigationGroup` tidak perlu dipersist kecuali benar-benar meningkatkan UX.

---

## 21. Responsive Rules

| Viewport | Sidebar Behavior |
|---|---|
| Mobile | Hidden by default, drawer from header menu |
| Tablet | Drawer atau collapsed persistent sesuai available width |
| Desktop | Persistent expanded/collapsed |
| Wide desktop | Persistent, width tetap 256px |

Rules:

- Jangan menampilkan persistent sidebar di mobile.
- Jangan membuat drawer width full screen jika tidak perlu.
- Header menu button hanya muncul saat sidebar tidak persistent.
- Collapsed desktop tetap menampilkan active route.

---

## 22. Loading And Fallback State

Sidebar harus tetap stabil saat session/permission belum selesai dimuat.

States:

| State | Treatment |
|---|---|
| Loading session | Skeleton nav atau minimal placeholder |
| No workspace | Tampilkan safe navigation terbatas |
| Permission loading | Jangan flash restricted item |
| Permission denied | Item restricted disembunyikan |
| Workspace switching | Disable switch-sensitive actions sementara |

Rules:

- Hindari navigation flicker.
- Jangan menampilkan item restricted sebelum permission diketahui.
- Skeleton sidebar harus menjaga width agar tidak layout shift.

---

## 23. Notification And Count Data

Count di sidebar berasal dari server state atau computed query, bukan hardcoded.

Contoh:

- Pending approvals dari approval query.
- Unread notifications dari notification query.
- Failed imports dari import job query.

Rules:

- Count tidak boleh memicu layout shift besar.
- Count harus optional.
- Jika count gagal dimuat, navigation tetap berfungsi.
- Jangan fetch data berat hanya untuk badge sidebar.

---

## 24. Integration With Routing

Sidebar harus mengikuti routing specification.

Rules:

- `href` navigation harus sesuai route resmi.
- Dynamic route tidak menjadi item sidebar utama.
- Detail/edit page mengaktifkan parent item.
- Route baru yang menjadi entry point utama harus memperbarui navigation config.
- Jika user membuka deep link tanpa permission, sidebar tetap menampilkan item yang user boleh akses.

---

## 25. Integration With Header

Sidebar dan header harus saling melengkapi.

Header bertanggung jawab untuk:

- Mobile menu trigger.
- Workspace switcher utama.
- Global search.
- Notification button.
- Theme toggle.
- User menu.

Sidebar bertanggung jawab untuk:

- Primary navigation.
- Collapsed navigation.
- Navigation active state.
- Optional footer shortcut.

Rules:

- Jangan menduplikasi terlalu banyak action header di sidebar.
- Workspace switcher utama berada di header.
- User menu utama berada di header, footer sidebar optional.

---

## 26. Implementation Example

Contoh struktur component:

```tsx
export function AppSidebar() {
  const navigationItems = useNavigationItems()
  const isSidebarCollapsed = useAppShellStore(
    (state) => state.isSidebarCollapsed,
  )

  return (
    <aside data-collapsed={isSidebarCollapsed}>
      <nav aria-label="Main navigation">
        {navigationItems.map((navigationItem) => (
          <SidebarNavigationItem
            key={navigationItem.id}
            navigationItem={navigationItem}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </nav>
    </aside>
  )
}
```

Contoh item:

```tsx
export function SidebarNavigationItem({
  navigationItem,
  isCollapsed,
}: SidebarNavigationItemProps) {
  const pathname = usePathname()
  const isActive = isNavigationItemActive(pathname, navigationItem)
  const Icon = navigationItem.icon

  return (
    <Link
      href={navigationItem.href}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon aria-hidden="true" />
      {!isCollapsed ? <span>{navigationItem.title}</span> : null}
    </Link>
  )
}
```

Catatan:

- Snippet ini contoh struktur, bukan final styling.
- Styling harus mengikuti design system dan Shadcn Sidebar primitive.

---

## 27. Recommended Component API

Component props:

```ts
type AppSidebarProps = {
  className?: string
}

type SidebarNavigationItemProps = {
  navigationItem: NavigationItem
  isCollapsed: boolean
}

type MobileNavigationDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
```

Rules:

- Jangan membuat banyak boolean prop untuk variant visual.
- Gunakan data `NavigationItem` sebagai sumber rendering.
- Jangan hardcode label/icon/href di component item.
- Component harus mudah diuji dengan navigation item fixture.

---

## 28. Anti-Pattern

Hindari pola berikut:

- Sidebar dibuat langsung di `app/(dashboard)/layout.tsx`.
- Navigation item hardcoded di beberapa file.
- Permission filtering dilakukan manual di setiap item JSX.
- Mobile navigation menggunakan data berbeda dari desktop.
- Sidebar terlalu lebar.
- Item active hanya dibedakan warna tanpa indikator lain.
- Icon tanpa label di collapsed mode dan tanpa tooltip.
- Menggunakan icon yang berbeda-beda untuk item yang sama di tempat berbeda.
- Menampilkan Audit Logs untuk user tanpa permission.
- Membuat nested navigation terlalu dalam.
- Menampilkan terlalu banyak badge.
- Sidebar ikut scroll bersama main content secara membingungkan.
- Collapse preference tidak konsisten setelah refresh.

---

## 29. Sidebar Checklist

Gunakan checklist ini saat implementasi sidebar.

| Checklist | Status |
|---|---|
| Sidebar berada di `features/app-shell` | Required |
| Menggunakan Shadcn Sidebar primitive jika tersedia | Required |
| Navigation config berada di satu file terpusat | Required |
| Navigation item mengikuti route resmi | Required |
| Navigation item permission-aware | Required |
| Active route jelas untuk parent route | Required |
| Desktop sidebar persistent | Required |
| Mobile sidebar drawer | Required |
| Collapsed mode memiliki tooltip | Required |
| Icon menggunakan Lucide dan size konsisten | Required |
| Keyboard navigation berfungsi | Required |
| `aria-current` digunakan untuk active link | Required |
| Permission loading tidak flash restricted item | Required |
| Badge/count tidak menyebabkan layout shift besar | Required jika ada badge |
| Dark mode tetap kontras | Required |
| Sidebar tidak menduplikasi action header berlebihan | Required |

---

## 30. Ringkasan Keputusan

Keputusan sidebar untuk Finance Dashboard:

- Sidebar adalah primary navigation desktop.
- Sidebar berada di `features/app-shell`.
- Primitive UI menggunakan `shared/components/ui/sidebar.tsx`.
- Navigation config berada di `features/app-shell/constants/navigation-items.ts`.
- Urutan item: Dashboard, Transactions, Accounts, Categories, Budgets, Reports, Approvals, Imports / Exports, Audit Logs, Notifications, Settings.
- Sidebar desktop width default 256px.
- Collapsed width 64px.
- Mobile sidebar menggunakan drawer/sheet.
- Sidebar permission-aware dan tidak menampilkan item restricted.
- Active route menggunakan exact/prefix matching.
- Icon menggunakan Lucide dengan ukuran 18px.
- Collapsed item harus memiliki tooltip/accessibility label.
- Workspace switcher utama tetap berada di header.
- Sidebar mengikuti design system, color system, spacing system, iconography, routing, state management, dan coding standards.
