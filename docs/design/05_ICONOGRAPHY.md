# Finance Dashboard NextJS - Iconography System

## 1. Ringkasan

Iconography system ini mengatur penggunaan ikon di Finance Dashboard NextJS agar ikon tetap konsisten, mudah dipahami, accessible, dan tidak menjadi dekorasi berlebihan.

Project menggunakan **lucide-react** sebagai icon library utama. Semua ikon UI harus mengambil dari Lucide kecuali ada kebutuhan khusus yang tidak tersedia di library tersebut.

Tujuan:

- Menjaga konsistensi visual ikon di seluruh dashboard.
- Memastikan ikon membantu navigasi dan pemahaman data.
- Menghindari penggunaan ikon dekoratif yang tidak diperlukan.
- Menentukan ukuran, stroke, warna, dan pola icon button.
- Menyediakan mapping ikon untuk fitur finance dashboard.

## 2. Icon Principles

### 2.1 Functional First

Ikon harus membantu user memahami action, status, atau navigasi. Jangan memakai ikon hanya untuk mengisi ruang kosong.

### 2.2 Familiar Over Clever

Gunakan ikon yang familiar. Untuk dashboard enterprise, ikon yang jelas lebih baik daripada ikon yang unik tetapi ambigu.

### 2.3 Consistent Stroke

Lucide memakai line icon. Pertahankan stroke yang konsisten agar UI tetap rapi.

### 2.4 Label When Meaning Matters

Jika action penting atau berisiko, gunakan icon + text. Icon-only hanya untuk action yang sangat familiar atau memiliki tooltip/aria-label.

### 2.5 No Icon Overload

Tidak semua label membutuhkan ikon. Terlalu banyak ikon membuat dashboard sulit discan.

## 3. Icon Library

Library utama:

```text
lucide-react
```

Rules:

- Gunakan ikon dari `lucide-react`.
- Jangan mencampur library ikon lain tanpa alasan kuat.
- Jangan membuat SVG manual jika Lucide sudah menyediakan ikon yang sesuai.
- Jika ikon tidak tersedia, pilih ikon Lucide terdekat yang secara makna masih jelas.

Contoh import:

```tsx
import { Plus, Search, Filter, Download } from "lucide-react"
```

## 4. Icon Size

| Use Case | Size |
| --- | --- |
| Sidebar navigation | 18px |
| Header icon button | 18px |
| Toolbar icon | 16px |
| Button icon | 16px |
| Table row action icon | 16px |
| Badge/status icon | 12-14px |
| Metric card icon | 18-20px |
| Empty state icon | 32-48px |
| Dialog warning icon | 20-24px |

Rules:

- Default app icon: 16px.
- Navigation icon: 18px.
- Empty state icon boleh lebih besar, tetapi jangan terlalu ilustratif.
- Jangan memakai ikon 24px+ di table atau toolbar.

## 5. Stroke Width

Lucide default stroke width umumnya `2`.

Rules:

- Gunakan default stroke width untuk mayoritas UI.
- Jangan mencampur stroke width berbeda dalam satu area.
- Untuk ikon kecil 12-14px, stroke default masih boleh digunakan.
- Jangan memakai filled icon jika semua ikon lain outline.

## 6. Icon Color

Ikon harus mengikuti semantic color dan hierarchy text.

| Context | Color |
| --- | --- |
| Default icon | `text-muted-foreground` atau `text-foreground` sesuai emphasis |
| Active navigation | `text-foreground` |
| Muted action | `text-muted-foreground` |
| Primary button icon | `text-primary-foreground` |
| Destructive action | `text-destructive` |
| Success status | success token |
| Warning status | warning token |
| Info status | info token |

Rules:

- Jangan memberi warna acak langsung ke ikon.
- Icon di dalam button mengikuti warna text button.
- Icon status boleh memakai semantic color, tetapi tetap sertakan label.
- Jangan menjadikan ikon satu-satunya pembeda status.

## 7. Icon And Text Spacing

| Pairing | Gap |
| --- | --- |
| Button icon + label | 8px |
| Sidebar icon + label | 8-10px |
| Badge icon + label | 4-6px |
| Metric icon + label/value | 8-12px |
| Empty state icon + title | 12px |

Rules:

- Gunakan alignment center untuk icon + label.
- Icon harus sejajar secara visual dengan text.
- Jangan memberi gap terlalu jauh antara ikon dan label.

## 8. Navigation Icon Mapping

Gunakan ikon berikut untuk sidebar dan navigation utama.

| Navigation Item | Recommended Icon | Lucide Name |
| --- | --- | --- |
| Dashboard | Gauge / LayoutDashboard | `Gauge` atau `LayoutDashboard` |
| Transactions | ReceiptText | `ReceiptText` |
| Accounts | WalletCards | `WalletCards` |
| Categories | Tags | `Tags` |
| Budgets | PiggyBank | `PiggyBank` |
| Reports | ChartNoAxesCombined / BarChart3 | `ChartNoAxesCombined` atau `BarChart3` |
| Approvals | CircleCheckBig | `CircleCheckBig` |
| Imports | Upload | `Upload` |
| Exports | Download | `Download` |
| Audit Logs | ScrollText | `ScrollText` |
| Notifications | Bell | `Bell` |
| Settings | Settings | `Settings` |

Rules:

- Gunakan ikon yang sama untuk nav item di semua tempat.
- Jangan mengganti ikon berdasarkan halaman aktif.
- Active state ditunjukkan dengan warna/background, bukan ikon berbeda.

## 9. Action Icon Mapping

| Action | Recommended Icon |
| --- | --- |
| Add/Create | `Plus` |
| Search | `Search` |
| Filter | `Filter` |
| Sort | `ArrowUpDown` |
| More actions | `MoreHorizontal` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Archive | `Archive` |
| Save | `Save` |
| Cancel/Close | `X` |
| Download | `Download` |
| Upload | `Upload` |
| Refresh | `RefreshCw` |
| View detail | `Eye` |
| Copy | `Copy` |
| Calendar/date | `Calendar` |
| Export file | `FileDown` |
| Import file | `FileUp` |
| Open external | `ExternalLink` |
| Collapse/expand | `ChevronDown`, `ChevronRight` |

Rules:

- Primary action sebaiknya icon + label, bukan icon-only.
- Row action boleh icon-only jika ada tooltip atau menu label.
- Destructive icon harus dipasangkan dengan text pada confirmation.

## 10. Finance Domain Icon Mapping

| Domain | Recommended Icon |
| --- | --- |
| Income | `TrendingUp` atau `ArrowDownToLine` |
| Expense | `TrendingDown` atau `ArrowUpFromLine` |
| Transfer | `ArrowLeftRight` |
| Adjustment | `SlidersHorizontal` |
| Cash | `Banknote` |
| Bank account | `Landmark` |
| E-wallet | `Wallet` |
| Credit card | `CreditCard` |
| Investment | `ChartCandlestick` atau `ChartLine` |
| Budget | `PiggyBank` |
| Category | `Tag` |
| Tax/Fee | `Receipt` |
| Attachment | `Paperclip` |

Rules:

- Gunakan finance icon secara konsisten antar feature.
- Jangan memakai ikon yang bisa disalahartikan untuk transaction type penting.
- Income/expense tetap harus punya label, bukan hanya ikon panah.

## 11. Status Icon Mapping

Status icon digunakan secara hemat, terutama di badge, alert, atau detail state.

| Status | Icon | Usage |
| --- | --- | --- |
| Success / Approved | `CheckCircle2` | Approved, completed. |
| Pending | `Clock3` | Pending approval, processing. |
| Warning | `TriangleAlert` | Budget near limit, import warning. |
| Error / Rejected | `CircleX` | Failed, rejected. |
| Info | `Info` | Informational alert. |
| Draft | `FilePenLine` | Draft transaction. |
| Archived | `Archive` | Archived item. |
| Locked | `Lock` | Locked category/permission. |
| Hidden/Restricted | `EyeOff` | Permission restricted. |

Rules:

- Badge status boleh memakai ikon kecil 12-14px.
- Jangan gunakan icon status tanpa label.
- Warning dan error icon harus digunakan konsisten.

## 12. Header Icon Usage

Header icon yang disarankan:

| Header Control | Icon |
| --- | --- |
| Global search | `Search` |
| Notifications | `Bell` |
| Theme light | `Sun` |
| Theme dark | `Moon` |
| User menu | Avatar, `CircleUserRound` fallback |
| Workspace switcher | `ChevronsUpDown` |

Rules:

- Header icon button size 36-40px.
- Gunakan tooltip jika icon-only.
- Notification dapat memakai badge count kecil.
- Workspace switcher sebaiknya memiliki text label, bukan icon-only.

## 13. Table Icon Usage

Table icon harus minimal.

Use cases:

- Row action menu: `MoreHorizontal`.
- Sort: `ArrowUpDown`, `ArrowUp`, `ArrowDown`.
- Empty table: domain icon seperti `ReceiptText`.
- Bulk action: icon + label di bulk bar.

Rules:

- Jangan menaruh ikon di setiap cell kecuali membantu.
- Status cell lebih baik memakai badge.
- Action menu harus konsisten di kolom kanan.
- Sort icon harus kecil dan dekat header label.

## 14. Form Icon Usage

Form tidak perlu banyak ikon.

Use cases:

- Date picker: `Calendar`.
- Searchable select: `Search`.
- Amount/currency optional: hindari ikon jika label sudah jelas.
- Attachment: `Paperclip`.
- Error: biasanya cukup text error, icon optional.

Rules:

- Jangan mengandalkan ikon untuk label form.
- Icon di input harus tidak mengganggu text.
- Error icon hanya digunakan jika membantu, bukan wajib.

## 15. Empty State Icon Usage

Empty state boleh memakai ikon lebih besar.

| Empty State | Icon |
| --- | --- |
| No transactions | `ReceiptText` |
| No accounts | `WalletCards` |
| No categories | `Tags` |
| No budgets | `PiggyBank` |
| No reports | `ChartNoAxesCombined` |
| No approvals | `CircleCheckBig` |
| No audit logs | `ScrollText` |
| No notifications | `BellOff` |

Rules:

- Size 32-48px.
- Color muted.
- Jangan memakai ilustrasi besar jika ikon cukup.
- Empty state tetap harus punya title dan description.

## 16. Icon Button Rules

Icon-only button boleh digunakan untuk:

- Search trigger.
- Notification.
- Theme toggle.
- More action.
- Close dialog.
- Row action.
- Collapse/expand.

Icon-only button harus memiliki:

- `aria-label`.
- Tooltip jika maknanya tidak langsung jelas.
- Focus state.
- Hit area minimal 32px desktop dan 40px mobile.

Contoh:

```tsx
<Button variant="ghost" size="icon" aria-label="Open search">
    <Search className="size-4" />
</Button>
```

## 17. Icon With Label Rules

Gunakan icon + label untuk:

- Primary actions.
- Destructive actions.
- Import/export buttons.
- Approval buttons.
- Empty state CTA.
- Navigation.

Contoh:

```text
[Plus] Add Transaction
[Download] Export CSV
[CircleCheckBig] Approve
[CircleX] Reject
```

Rules:

- Icon kiri, label kanan.
- Gap 8px.
- Jangan menaruh icon kanan kecuali untuk dropdown/chevron.

## 18. Accessibility

Rules:

- Icon-only interactive element wajib punya `aria-label`.
- Decorative icon harus `aria-hidden="true"`.
- Jangan menyampaikan status hanya dengan ikon.
- Badge status harus memiliki text.
- Tooltip tidak boleh menjadi satu-satunya sumber informasi penting.
- Icon color harus cukup kontras.

Examples:

```tsx
<Search aria-hidden="true" className="size-4" />
```

```tsx
<Button aria-label="Delete transaction">
    <Trash2 className="size-4" />
</Button>
```

## 19. Responsive Icon Rules

Mobile:

- Icon button size minimal 40px.
- Jangan membuat terlalu banyak icon-only actions.
- Row actions tetap melalui menu.
- Toolbar icon + label dapat berubah menjadi icon-only jika ada tooltip/label accessible.

Desktop:

- Icon button 32-40px.
- Navigation icon 18px.
- Toolbar icon 16px.

## 20. Dark Mode Icon Rules

Rules:

- Icon mengikuti text color token.
- Muted icon harus tetap terlihat.
- Status icon harus memakai semantic color yang kontras.
- Jangan memakai opacity terlalu rendah pada icon penting.
- Icon di atas primary button mengikuti primary foreground.

## 21. Implementation Guidelines

### 21.1 Default Class

Gunakan class yang konsisten:

```tsx
<Search className="size-4" />
```

Navigation:

```tsx
<LayoutDashboard className="size-[18px]" />
```

Metric:

```tsx
<WalletCards className="size-5 text-muted-foreground" />
```

### 21.2 Shared Icon Config

Jika diperlukan, buat mapping icon di feature atau app shell:

```text
features/app-shell/constants/navigation-items.ts
features/transactions/constants/transaction-icons.ts
```

Rules:

- Mapping ikon navigation disimpan terpusat.
- Feature-specific icon mapping disimpan di feature terkait.
- Jangan menduplikasi mapping status di banyak file tanpa alasan.

## 22. Feature-Based Architecture Rules

Karena project menggunakan Feature-Based Architecture:

- Ikon navigation berada di `features/app-shell` atau feature navigation.
- Ikon transaksi berada di `features/transactions`.
- Ikon budget berada di `features/budgets`.
- Ikon report berada di `features/reports`.
- Primitive icon button tetap memakai `shared/components/ui/button`.

Contoh:

```text
features/app-shell/constants/navigation-items.ts
features/transactions/components/transaction-status-badge.tsx
features/budgets/components/budget-status-badge.tsx
features/reports/components/report-filter-bar.tsx
```

## 23. Icon Anti-Patterns

Jangan lakukan:

- Mencampur Lucide dengan library ikon lain tanpa alasan.
- Menggunakan ikon berbeda untuk action yang sama.
- Menggunakan ikon sebagai dekorasi di semua card.
- Menggunakan icon-only untuk action berisiko.
- Menggunakan ikon tanpa accessible label.
- Memakai warna acak pada ikon.
- Membuat ikon terlalu besar di table.
- Memakai filled icon di tengah sistem outline icon.
- Menggunakan ikon ambigu untuk finance status penting.
- Mengganti ikon active/inactive dengan bentuk berbeda.

## 24. Icon Review Checklist

Sebelum UI dianggap selesai, cek:

- Apakah semua ikon berasal dari Lucide?
- Apakah ukuran ikon konsisten?
- Apakah warna ikon mengikuti token?
- Apakah icon-only button punya `aria-label`?
- Apakah action penting memakai icon + label?
- Apakah status tidak hanya bergantung pada ikon?
- Apakah navigation icon konsisten di semua tempat?
- Apakah row action memakai pola yang sama?
- Apakah ikon tidak terlalu banyak di satu halaman?
- Apakah dark mode tetap terbaca?

## 25. Kesimpulan

Iconography Finance Dashboard NextJS harus sederhana, familiar, dan fungsional. Lucide menjadi satu-satunya icon system utama, dengan ukuran, warna, dan mapping yang konsisten di seluruh fitur.

Dengan aturan ini, ikon akan membantu navigasi dan pemahaman data tanpa membuat dashboard terasa ramai atau tidak terstruktur.
