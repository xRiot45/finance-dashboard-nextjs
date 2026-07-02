# Header Specification

Dokumen ini mendefinisikan spesifikasi header layout untuk Finance Dashboard NextJS. Header harus mengikuti design system, layout specification, sidebar specification, spacing system, iconography, component library Shadcn UI, routing architecture, state management, dan Feature-Based Architecture yang sudah dibuat sebelumnya.

Prinsip utama:

> Header adalah control bar global dashboard. Header harus rendah, fungsional, konsisten, dan tidak berubah menjadi page hero atau tempat semua action.

---

## 1. Tujuan Header

Header dibuat untuk:

- Menampilkan konteks workspace aktif.
- Menyediakan trigger mobile navigation.
- Menyediakan global search.
- Menampilkan notification entry point.
- Menyediakan theme toggle.
- Menyediakan user menu.
- Mendukung quick access ke workflow global.
- Menjaga user tetap tahu sedang berada di workspace mana.

Header tidak dibuat untuk:

- Menampilkan page title utama.
- Menampung semua action halaman.
- Menjadi hero section.
- Menampilkan data dashboard besar.
- Menggantikan toolbar/filter halaman.

---

## 2. Architecture Ownership

Header merupakan bagian dari `features/app-shell`, bukan `app/`.

Lokasi implementasi:

```txt
shared/layout/app-shell/
├── components/
│   ├── app-header.tsx
│   ├── mobile-menu-button.tsx
│   ├── workspace-switcher.tsx
│   ├── global-search-button.tsx
│   ├── global-search-command.tsx
│   ├── notification-button.tsx
│   ├── notification-popover.tsx
│   ├── theme-toggle.tsx
│   └── user-menu.tsx
├── hooks/
│   ├── use-current-workspace.ts
│   ├── use-global-search.ts
│   └── use-notification-summary.ts
├── stores/
│   └── app-shell-store.ts
└── index.ts
```

Aturan:

- `app/(dashboard)/layout.tsx` hanya memanggil `DashboardShell`.
- Header UI tidak ditulis langsung di route layout.
- Header tidak menyimpan business logic finance.
- Search, notification, workspace, dan user menu boleh mengimpor hook/service dari feature terkait melalui public API jika diperlukan.
- Header action global harus permission-aware jika berkaitan dengan data restricted.

---

## 3. App Header vs Page Header

Penting untuk membedakan app header dan page header.

| Area | Owner | Fungsi |
|---|---|---|
| App Header | `shared/layout/app-shell/components/app-header.tsx` | Global controls: workspace, search, notification, theme, user menu |
| Page Header | `shared/layout/app-shell/components/page-header.tsx` atau feature screen | Page title, description, breadcrumb, primary page action |

App header tidak boleh berisi:

- `Add Transaction`
- `Create Budget`
- `Export Report` khusus halaman
- Filter periode report utama
- Search table khusus halaman

Action tersebut berada di page header atau page toolbar.

---

## 4. Header Anatomy

Struktur header:

```txt
AppHeader
├── LeftArea
│   ├── MobileMenuButton
│   ├── BreadcrumbCompact optional
│   └── WorkspaceSwitcher
├── CenterArea optional
│   └── GlobalSearchButton / GlobalSearchInput
└── RightArea
    ├── NotificationButton
    ├── ThemeToggle
    └── UserMenu
```

Desktop layout:

```txt
┌──────────────────────────────────────────────────────────────┐
│ Workspace Switcher        Search          Notifications User │
└──────────────────────────────────────────────────────────────┘
```

Mobile layout:

```txt
┌─────────────────────────────────────┐
│ Menu  Workspace        Notifications│
└─────────────────────────────────────┘
```

---

## 5. Header Dimensions

Header mengikuti layout specification.

| Property | Value |
|---|---|
| Desktop height | 56-64px |
| Mobile height | 56px |
| Horizontal padding desktop | 16-24px |
| Horizontal padding mobile | 12-16px |
| Control gap | 8-12px |
| Icon button size | 36-40px |
| Header border | 1px bottom border |
| Search width desktop | 280-420px |
| Workspace switcher max width | 220-280px |

Rules:

- Header tidak boleh lebih tinggi dari 64px di desktop.
- Header tidak boleh terasa seperti hero.
- Header harus tetap compact.
- Header width mengikuti main shell, bukan page container.
- Header border bottom halus untuk memisahkan content.

---

## 6. Visual Style

Header mengikuti color system.

Surface:

- Background: app surface/background token.
- Border bottom: border token.
- Text primary: foreground.
- Text secondary: muted foreground.
- Hover: muted/accent subtle.
- Active/open: accent/muted subtle.

Rules:

- Jangan gunakan gradient.
- Jangan gunakan shadow berat.
- Jangan memakai warna status sebagai background header.
- Header harus subtle agar page content tetap menjadi fokus.
- Dark mode harus memiliki contrast cukup.
- Header control harus memiliki hover/focus state.

---

## 7. Header Content Priority

Prioritas konten header:

1. Mobile menu button jika sidebar tidak persistent.
2. Active workspace.
3. Global search.
4. Notifications.
5. Theme toggle.
6. User menu.

Jika ruang terbatas:

- Mobile menyembunyikan global search full input menjadi icon button.
- Theme toggle dapat masuk user menu pada mobile.
- Breadcrumb compact boleh disembunyikan.
- Workspace name dapat truncate.
- Notification tetap terlihat jika ada workflow penting.

---

## 8. Mobile Menu Button

Mobile menu button membuka sidebar drawer.

Rules:

- Hanya muncul saat sidebar tidak persistent.
- Menggunakan icon `Menu`.
- Ukuran button 36-40px.
- Memiliki `aria-label="Open navigation"`.
- Mengubah `isMobileNavigationOpen` di app shell store.
- Tidak muncul di desktop jika sidebar persistent.

Contoh:

```tsx
<Button
  type="button"
  variant="ghost"
  size="icon"
  aria-label="Open navigation"
  onClick={() => setMobileNavigationOpen(true)}
>
  <Menu aria-hidden="true" />
</Button>
```

---

## 9. Workspace Switcher

Workspace switcher adalah elemen wajib di header.

Fungsi:

- Menampilkan workspace aktif.
- Membuka daftar workspace yang bisa diakses user.
- Memungkinkan switch workspace.
- Menunjukkan status workspace jika diperlukan.

Desktop content:

```txt
[Workspace Icon] Acme Studio [ChevronDown]
```

Mobile content:

```txt
Acme Studio
```

Rules:

- Workspace aktif harus selalu terlihat.
- Workspace name truncate jika terlalu panjang.
- Switch workspace harus memvalidasi membership di server.
- Setelah switch workspace, data feature harus invalidate/reset.
- Jika hanya satu workspace, switcher tetap boleh terlihat sebagai context, tetapi dropdown dapat disabled atau disederhanakan.
- Jangan menaruh workspace switcher penuh di sidebar jika header sudah menjadi lokasi utama.

Dropdown item:

```txt
Acme Studio
Personal Finance
---
Create workspace optional
Manage workspace
```

Permission:

- `Create workspace` hanya muncul jika produk mengizinkan.
- `Manage workspace` hanya muncul jika user punya permission.

---

## 10. Global Search

Global search digunakan untuk mencari data lintas fitur.

Target search:

- Transactions.
- Accounts.
- Categories.
- Budgets.
- Reports.
- Audit logs jika punya permission.

UI pattern:

- Desktop: search button/input compact.
- Mobile: icon button yang membuka command dialog.
- Command dialog menggunakan Shadcn `Command` di dalam `Dialog`.

Desktop example:

```txt
[Search] Search transactions, reports, accounts...
```

Rules:

- Global search bukan search table halaman.
- Placeholder harus menjelaskan scope global.
- Search result harus mengikuti permission.
- Search result harus scoped ke active workspace.
- Keyboard shortcut boleh ditampilkan sebagai hint jika didukung.
- Tidak perlu fetch semua data besar sekaligus.

Recommended shortcut:

```txt
Cmd/Ctrl + K
```

State:

- Command dialog open state boleh berada di Zustand app shell store.
- Query input dapat local state.
- Search result berasal dari server state/query.

---

## 11. Notification Button

Notification button memberikan akses ke notification center.

Content:

- Bell icon.
- Unread badge/dot.
- Popover list ringkas.
- Link ke `/notifications`.

Rules:

- Icon menggunakan `Bell`.
- Icon button size 36-40px.
- Badge tidak boleh menyebabkan layout shift.
- Jika unread count lebih dari 99, tampilkan `99+`.
- Popover list maksimal 5-8 item.
- Item notification harus permission-aware.
- Jika tidak ada notification, tampilkan empty state compact.

Notification states:

| State | Treatment |
|---|---|
| Loading | Small skeleton list |
| Empty | `No notifications` compact |
| Error | Inline retry atau link ke notifications |
| Unread | Badge/dot |
| All read | No badge |

Accessibility:

```txt
aria-label="Open notifications"
```

---

## 12. Theme Toggle

Theme toggle mengatur light/dark/system.

Rules:

- Menggunakan `next-themes`.
- Icon menggunakan `Sun`, `Moon`, atau `Monitor`.
- Size 36-40px.
- Desktop boleh berupa icon button/dropdown.
- Mobile boleh masuk user menu jika header terlalu sempit.
- Toggle harus memiliki accessible label.
- Tidak boleh menyebabkan layout shift.

Recommended options:

```txt
Light
Dark
System
```

---

## 13. User Menu

User menu adalah entry point untuk user account.

Content:

- Avatar atau initials.
- User name.
- Email.
- Role/workspace role optional.
- Profile settings.
- Security settings.
- Billing optional jika punya permission.
- Sign out.

Rules:

- Avatar size 32-36px.
- Menu menggunakan Shadcn `DropdownMenu`.
- Sign out ditempatkan terpisah.
- Destructive action tidak dicampur dengan normal menu.
- User menu tidak menggantikan settings navigation.

Menu example:

```txt
Anna Wijaya
anna@acme.test
---
Profile
Security
Billing
---
Sign out
```

Permission:

- Billing hanya untuk role yang boleh mengakses billing.
- Workspace settings lebih baik berada di settings route, bukan user menu utama.

---

## 14. Breadcrumb Compact

Breadcrumb utama page berada di page header/detail page. Header boleh memiliki breadcrumb compact hanya jika desain membutuhkan quick context.

Default decision:

- App header tidak wajib menampilkan breadcrumb.
- Breadcrumb tetap berada di page header.

Jika dipakai:

- Hanya tampil desktop.
- Maksimal 2-3 level.
- Tidak menggantikan page title.
- Tidak membuat header lebih tinggi.

---

## 15. Header Actions Rule

Header hanya untuk global action.

Allowed:

- Open mobile navigation.
- Switch workspace.
- Open global search.
- Open notifications.
- Toggle theme.
- Open user menu.

Not allowed:

- Add transaction.
- Create budget.
- Export current report.
- Import current table.
- Apply page filter.
- Bulk action table.

Page-specific action harus berada di:

- Page header.
- Page toolbar.
- Detail action area.
- Form action footer.

---

## 16. Responsive Behavior

| Viewport | Header Behavior |
|---|---|
| Mobile | Menu button, workspace compact, notification, user menu |
| Tablet | Menu/collapse button, workspace, search icon/button, notification, theme, user |
| Desktop | Workspace, global search, notification, theme, user |
| Wide desktop | Same as desktop, do not over-expand |

Mobile priority:

```txt
Menu > Workspace > Notifications > User
```

Rules:

- Header controls wrap only if absolutely needed; prefer hiding lower priority controls into menu.
- Workspace text truncates.
- Search becomes icon button.
- Theme can move into user menu.
- Header height stays stable.

---

## 17. Sticky Behavior

Recommended:

- Header may be sticky within dashboard shell.
- Sticky header should not cover focused content.
- Sticky header must maintain border bottom.

Rules:

- Sticky header z-index below dialogs/popovers.
- Header should not create double scroll.
- If main content scrolls independently, header remains fixed at top of shell body.
- Avoid sticky if it causes mobile viewport issues.

---

## 18. State Management

Header state follows state management architecture.

State suitable for Zustand:

- `isMobileNavigationOpen`
- `isGlobalSearchOpen`
- `isWorkspaceSwitcherOpen` only if controlled globally

State suitable for local component:

- Search input draft.
- Dropdown open if controlled by Shadcn internally.
- Hover/focus state.

Server state:

- Current workspace detail.
- Workspace list.
- User profile/session.
- Notification count/list.
- Search result.

Rules:

- Do not store notification list in Zustand as source of truth.
- Do not store auth token in Zustand.
- Do not use header client state for security decisions.

---

## 19. Data Dependencies

Header may depend on:

- Current session.
- Active workspace.
- Available workspaces.
- Current user profile.
- Permission summary.
- Notification unread count.
- Global search API.

Rules:

- Header must render stable skeleton/fallback while session loads.
- Avoid heavy data fetching in header.
- Notification count should be lightweight.
- Search should fetch on demand, not load all data upfront.
- Workspace switch must invalidate workspace-scoped data.

---

## 20. Permission Rules

Header controls must respect permission.

Examples:

- Manage workspace link appears only for users with workspace settings permission.
- Billing menu appears only for authorized role.
- Audit log search result appears only if user can view audit logs.
- Notification item linking to restricted entity should be hidden or open permission state.

Rules:

- UI permission improves UX.
- Server authorization remains source of truth.
- Do not expose restricted entity names in search/notification result if user lacks permission.

---

## 21. Accessibility Rules

Header must be accessible.

Rules:

- Header uses semantic `<header>`.
- Mobile navigation button has accessible label.
- Icon-only buttons have `aria-label`.
- Dropdown menus are keyboard accessible.
- Dialog search manages focus.
- Popover notification can be closed with keyboard.
- Theme toggle announces selected option if possible.
- Avatar menu has accessible trigger label.
- Focus ring must be visible.

Example:

```tsx
<header role="banner">
  <Button type="button" variant="ghost" size="icon" aria-label="Open search">
    <Search aria-hidden="true" />
  </Button>
</header>
```

---

## 22. Keyboard Interaction

| Control | Keyboard Behavior |
|---|---|
| Mobile menu | `Enter`/`Space` opens drawer |
| Workspace switcher | `Enter` opens menu, arrows navigate options |
| Global search | `Cmd/Ctrl + K` opens command dialog |
| Notification | `Enter` opens popover |
| Theme toggle | `Enter` opens/toggles |
| User menu | `Enter` opens dropdown |
| Escape | Closes open overlay |

Rules:

- Do not trap focus in header unless overlay is open.
- Overlay focus returns to trigger after close.
- Shortcut hint should not be the only way to open search.

---

## 23. Icon Rules

Header icon rules follow iconography system.

| Header Control | Icon |
|---|---|
| Mobile menu | `Menu` |
| Search | `Search` |
| Notifications | `Bell` |
| No notifications | `BellOff` optional |
| Theme light | `Sun` |
| Theme dark | `Moon` |
| Theme system | `Monitor` |
| User menu | Avatar or `CircleUser` |
| Workspace switcher | `Building2`, `ChevronsUpDown` |

Rules:

- Header icon size 18-20px.
- Icon button size 36-40px.
- Icon-only button must have accessible label.
- Icons should not use status color except badge/alert context.

---

## 24. Badge Rules

Badge can appear on notification button.

Rules:

- Use dot for low-detail unread state.
- Use count for actionable count.
- Use `99+` for count above 99.
- Badge must not shift icon button size.
- Badge must have sufficient contrast.
- Badge should not animate aggressively.

Badge examples:

```txt
Bell + dot
Bell + 3
Bell + 99+
```

---

## 25. Loading And Fallback State

Header should remain stable during data loading.

| State | Treatment |
|---|---|
| Session loading | Skeleton avatar/workspace |
| Workspace loading | Workspace skeleton text |
| Notification loading | Bell without count or small skeleton |
| Search unavailable | Search disabled with tooltip |
| Permission loading | Hide restricted menu links |

Rules:

- Avoid flicker.
- Header height must not change.
- Do not show restricted data before permission is known.
- Loading skeleton must match final dimensions.

---

## 26. Error State

Header error handling should be quiet but clear.

Examples:

- Workspace list failed: show active workspace if available and retry in dropdown.
- Notification failed: show icon without count and retry in popover.
- Search failed: show command error state.
- User menu failed: show fallback initials and basic sign out if possible.

Rules:

- Do not break entire dashboard because notification count failed.
- Critical session failure should redirect or show auth state.
- Avoid noisy toast on passive header data failure.

---

## 27. Integration With Sidebar

Header and sidebar must coordinate.

Header owns:

- Mobile menu trigger.
- Workspace switcher.
- Global search.
- Notifications.
- Theme.
- User menu.

Sidebar owns:

- Main navigation.
- Active route.
- Collapsed navigation.

Rules:

- Header menu button opens sidebar drawer on mobile.
- Sidebar collapsed toggle can be in sidebar footer or header, but not both unless UX is deliberate.
- Workspace switcher remains in header.
- Do not duplicate full user menu in sidebar footer.

---

## 28. Integration With Page Layout

Header is separate from page header.

Rules:

- Page title appears in page header.
- Primary page action appears in page header.
- Page filter appears in toolbar.
- Header global search should not filter current table directly.
- Header stays consistent across feature pages.
- Header should not change layout per route except responsive/permission adjustments.

---

## 29. Implementation Example

Example structure:

```tsx
export function AppHeader() {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        <MobileMenuButton />
        <WorkspaceSwitcher />
        <div className="ml-auto flex items-center gap-2">
          <GlobalSearchButton />
          <NotificationButton />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
```

Notes:

- Styling final harus memakai token design system.
- Mobile/desktop visibility harus memakai responsive class yang konsisten.
- Jangan hardcode data user/workspace langsung di component.

---

## 30. Recommended Component API

App header:

```ts
type AppHeaderProps = {
  className?: string
}
```

Workspace switcher:

```ts
type WorkspaceSwitcherProps = {
  activeWorkspaceId: string
  onWorkspaceChange: (workspaceId: string) => void
}
```

Notification button:

```ts
type NotificationButtonProps = {
  unreadCount: number
}
```

Global search:

```ts
type GlobalSearchButtonProps = {
  onOpenSearch: () => void
}
```

Rules:

- Keep API small.
- Prefer composition over many boolean props.
- Header components should get data from hooks when owned by app shell.
- Shared primitive controls should not know app-specific data.

---

## 31. Anti-Pattern

Hindari pola berikut:

- Menaruh page title utama di app header.
- Menaruh `Add Transaction` di app header.
- Header lebih tinggi dari 64px di desktop.
- Header penuh action sampai workspace tidak terlihat.
- Global search dipakai sebagai filter table halaman.
- Workspace switcher disembunyikan sepenuhnya.
- Notification failure membuat seluruh header error.
- Search memuat seluruh data finance di client.
- Theme toggle menyebabkan layout shift.
- User menu berisi terlalu banyak settings detail.
- Header berbeda total antar page.
- Icon-only button tanpa accessible label.
- Mobile header memuat terlalu banyak control.

---

## 32. Header Checklist

Gunakan checklist ini saat implementasi header.

| Checklist | Status |
|---|---|
| Header berada di `features/app-shell` | Required |
| Header menggunakan semantic `<header>` | Required |
| Workspace aktif terlihat | Required |
| Mobile menu button membuka sidebar drawer | Required mobile |
| Global search tersedia sebagai global action | Required |
| Notification button memiliki badge stabil | Required jika notification aktif |
| Theme toggle memakai `next-themes` | Required |
| User menu tersedia | Required |
| Header height 56-64px | Required |
| Header action hanya global action | Required |
| Page-specific action tidak berada di app header | Required |
| Icon button memiliki accessible label | Required |
| Header responsive di mobile/tablet/desktop | Required |
| Permission diterapkan pada menu/search result | Required |
| Loading/fallback tidak menyebabkan layout shift | Required |
| Dark mode tetap kontras | Required |

---

## 33. Ringkasan Keputusan

Keputusan header untuk Finance Dashboard:

- Header adalah global control bar, bukan page header.
- Header berada di `features/app-shell`.
- Header desktop height 56-64px.
- Header mobile height 56px.
- Workspace switcher wajib terlihat.
- Mobile menu button membuka sidebar drawer.
- Global search menggunakan command dialog.
- Notification button menampilkan unread badge/dot.
- Theme toggle menggunakan `next-themes`.
- User menu menggunakan dropdown.
- Page title, page action, dan page filter tidak ditempatkan di app header.
- Header mengikuti design system, spacing system, iconography, sidebar specification, routing, state management, accessibility, dan coding standards.
