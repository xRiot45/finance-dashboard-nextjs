# Coding Standards

Dokumen ini mendefinisikan standar penulisan kode untuk Finance Dashboard NextJS agar hasil implementasi tetap konsisten, rapi, mudah dirawat, dan mengikuti React best practice.

Project ini menggunakan:

- Next.js App Router.
- React 19.
- TypeScript.
- Tailwind CSS 4.
- Shadcn UI.
- TanStack Query.
- TanStack Form.
- TanStack Table.
- Zustand.
- Zod.
- Recharts.
- Lucide React.

Prinsip utama:

> Code harus mudah dibaca, mudah diuji, dan mudah diganti dari dummy data ke API tanpa merusak UI.

---

## 1. Tujuan Coding Standards

Coding standards dibuat agar:

- Struktur kode konsisten antar feature.
- Komponen React mudah dipahami dan tidak membengkak.
- Boundary antara `app`, `features`, dan `shared` tetap jelas.
- State management tidak tercampur antara URL, server state, form state, local state, dan Zustand.
- UI mengikuti design system dan Shadcn UI.
- Code aman untuk kebutuhan enterprise seperti permission, audit, workspace, import/export, dan report.
- Performance, accessibility, dan maintainability menjadi kebiasaan dari awal.

---

## 2. Prinsip Umum

Aturan umum:

- Tulis kode eksplisit, bukan clever.
- Gunakan nama yang jelas sesuai `05_NAMING_CONVENTION.md`.
- Hindari singkatan tidak jelas.
- Buat function kecil dengan satu tujuan.
- Pisahkan UI, state, data fetching, validation, dan formatting.
- Jangan menaruh business logic di route file.
- Jangan menaruh server data besar di Zustand.
- Jangan membuat komponen custom jika Shadcn UI sudah menyediakan primitive yang tepat.
- Jangan mengabaikan empty, loading, error, disabled, permission denied, dan success state.

---

## 3. Feature-Based Architecture Rules

Project menggunakan Feature-Based Architecture.

Dependency direction:

```txt
app -> features -> shared
```

Aturan:

- `app/` hanya routing, layout, loading, error, not-found, metadata, dan API route.
- `features/` berisi implementasi domain dan screen.
- `shared/` berisi primitive reusable yang tidak bergantung pada feature.
- Feature tidak boleh import dari `app/`.
- Shared tidak boleh import dari `features/`.
- Import lintas feature harus melalui public API feature jika tersedia.

Contoh benar:

```tsx
import { TransactionsPage } from "@/features/transactions"
```

Contoh yang harus dihindari:

```tsx
import { TransactionForm } from "@/features/transactions/components/transaction-form"
```

Kecuali file import berada di dalam feature `transactions` yang sama.

---

## 4. App Router Coding Rules

Route file harus tipis.

Contoh benar:

```tsx
import { TransactionsPage } from "@/features/transactions"

export default function Page() {
  return <TransactionsPage />
}
```

Untuk dynamic route:

```tsx
import { TransactionDetailPage } from "@/features/transactions"

type PageProps = {
  params: Promise<{
    transactionId: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { transactionId } = await params

  return <TransactionDetailPage transactionId={transactionId} />
}
```

Aturan:

- Route tidak boleh berisi table, form, chart, atau logic domain panjang.
- Route boleh parsing params/searchParams ringan.
- Validasi detail tetap dilakukan di feature/service/schema.
- Route boleh mengatur metadata jika perlu.
- Route group `(auth)` dan `(dashboard)` harus dipakai sesuai dokumen routing.

---

## 5. Server Component And Client Component Rules

Gunakan Server Component secara default jika komponen tidak membutuhkan interaksi client.

Client Component hanya digunakan jika membutuhkan:

- State React seperti `useState`.
- Effect seperti `useEffect`.
- Event handler browser.
- Zustand hook.
- TanStack Query hook.
- TanStack Form hook.
- Browser API seperti `window`, `localStorage`, `ResizeObserver`.
- Komponen interactive seperti dialog trigger, command menu, popover, chart interactive.

Aturan:

- Jangan menambahkan `"use client"` di root file tanpa kebutuhan.
- Batasi Client Component pada area yang benar-benar interactive.
- Server Component boleh mengomposisi Client Component.
- Jangan membaca Zustand di Server Component.
- Jangan melakukan authorization penting hanya di Client Component.

Contoh:

```tsx
// Server Component
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview"

export function DashboardPage() {
  return <DashboardOverview />
}
```

```tsx
"use client"

import { useAppStore } from "@/shared/stores/app-store"

export function SidebarCollapseButton() {
  const isSidebarCollapsed = useAppStore((state) => state.sidebarCollapsed)
  const setSidebarCollapsed = useAppStore((state) => state.setSidebarCollapsed)

  return (
    <button
      type="button"
      onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
    >
      Toggle sidebar
    </button>
  )
}
```

---

## 6. React Component Standards

### 6.1 One Component Per File

Default-nya satu component utama per file.

Allowed:

- Helper kecil yang private untuk component.
- Subcomponent kecil yang hanya relevan untuk file tersebut.

Jika subcomponent mulai besar, pindahkan ke file sendiri.

### 6.2 Named Export

Gunakan named export untuk component feature/shared.

```tsx
export function TransactionForm({ initialTransaction }: TransactionFormProps) {
  return <form>{/* ... */}</form>
}
```

Hindari default export untuk component biasa:

```tsx
export default function TransactionForm() {}
```

Pengecualian:

- Next.js route file seperti `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` mengikuti kebutuhan framework.

### 6.3 Props Destructuring

Destructure props di function signature.

```tsx
type BudgetUsageBarProps = {
  spentAmount: number
  budgetAmount: number
}

export function BudgetUsageBar({
  spentAmount,
  budgetAmount,
}: BudgetUsageBarProps) {
  return null
}
```

Hindari:

```tsx
export function BudgetUsageBar(props: BudgetUsageBarProps) {
  return <div>{props.spentAmount}</div>
}
```

### 6.4 Component Size

Component harus mudah dipindai.

Rekomendasi:

- Component kecil: kurang dari 120 baris.
- Component kompleks: pecah jika lebih dari 200 baris.
- Screen page boleh lebih besar, tetapi tetap sebaiknya mengomposisi section component.

Jika component memiliki terlalu banyak tanggung jawab, pecah menjadi:

- Header.
- Toolbar.
- Filter.
- Table.
- Empty state.
- Dialog.
- Summary card.

---

## 7. JSX Standards

Aturan JSX:

- Gunakan semantic HTML.
- Gunakan Shadcn UI primitive sebelum membuat markup custom.
- Hindari nested card di dalam card.
- Hindari inline object/array literal untuk prop yang sering berubah.
- Gunakan `className` yang jelas dan mengikuti design system.
- Gunakan `cn()` untuk conditional class.
- Jangan menaruh logic kompleks langsung di JSX.

Contoh:

```tsx
const shouldShowEmptyState = transactions.length === 0

return (
  <section aria-labelledby="transactions-heading">
    <h1 id="transactions-heading">Transactions</h1>
    {shouldShowEmptyState ? (
      <TransactionsEmptyState />
    ) : (
      <TransactionsTable transactions={transactions} />
    )}
  </section>
)
```

Hindari:

```tsx
return (
  <div>
    {transactions.filter((transaction) => transaction.status === "approved")
      .map((transaction) => (
        <div>{transaction.description}</div>
      ))}
  </div>
)
```

---

## 8. Hooks Standards

Ikuti Rules of Hooks:

- Jangan call hooks di dalam condition.
- Jangan call hooks di dalam loop.
- Jangan call hooks di nested function biasa.
- Custom hook harus diawali `use`.
- Dependency array harus lengkap.
- Jangan menggunakan `useMemo` dan `useCallback` sebagai default kebiasaan.

Gunakan custom hook jika logic digunakan oleh minimal dua component atau logic satu component sudah mengganggu keterbacaan.

Contoh custom hook:

```ts
export function useTransactionFilters() {
  // parse and update URL search params
}
```

### 8.1 useEffect Rules

Gunakan `useEffect` untuk sinkronisasi dengan sistem eksternal:

- Subscription.
- Timer.
- Browser API.
- Event listener.
- Analytics event.
- Abort controller.

Jangan gunakan `useEffect` untuk:

- Menyalin props ke state tanpa alasan.
- Menghitung derived value.
- Fetch server data manual jika TanStack Query/server fetch lebih cocok.

Contoh buruk:

```tsx
const [approvedTransactions, setApprovedTransactions] = useState<Transaction[]>([])

useEffect(() => {
  setApprovedTransactions(
    transactions.filter((transaction) => transaction.status === "approved"),
  )
}, [transactions])
```

Contoh baik:

```tsx
const approvedTransactions = transactions.filter(
  (transaction) => transaction.status === "approved",
)
```

### 8.2 Cleanup Effect

Effect yang membuat subscription, timer, atau listener wajib cleanup.

```tsx
useEffect(() => {
  const intervalId = window.setInterval(refreshImportJobStatus, 5000)

  return () => window.clearInterval(intervalId)
}, [refreshImportJobStatus])
```

---

## 9. State Management Standards

Ikuti pembagian state berikut:

| State | Owner |
|---|---|
| URL filter, pagination, sorting | URL search params |
| Server data | TanStack Query/server fetch |
| Form state | TanStack Form/local state |
| Local UI state | `useState` atau component state |
| Global client UI state | Zustand |
| Theme | `next-themes` |

Aturan:

- State harus colocated sedekat mungkin dengan penggunaannya.
- Jangan memasukkan semua state ke Zustand.
- Jangan menyimpan server data besar di Zustand.
- Jangan menyimpan form input panjang di Zustand.
- Jangan menduplikasi state yang sama di URL dan Zustand.
- Derive state jika bisa dihitung dari state yang ada.

Contoh:

```tsx
const selectedTransactionIds = useTransactionUiStore(
  (state) => state.selectedTransactionIds,
)
```

Hindari:

```tsx
const transactionUiStore = useTransactionUiStore()
```

---

## 10. Data Fetching Standards

Gunakan TanStack Query atau server fetch sesuai kebutuhan.

TanStack Query cocok untuk:

- Client-side interaction.
- Pagination table.
- Filter yang sering berubah.
- Mutation dan invalidation.
- Background refetch.
- Optimistic update.

Server fetch cocok untuk:

- Initial static-ish page data.
- Data yang bisa dirender di server.
- Data yang tidak perlu interaction client kompleks.

Aturan:

- Jangan fetch data API manual di `useEffect` untuk list/table utama.
- Query key harus stabil dan deskriptif.
- Query function harus berada di service/hook feature.
- Mutation harus invalidate query terkait.
- Error dan loading state harus ditangani.

Contoh query key:

```ts
const transactionQueryKey = [
  "transactions",
  activeWorkspaceId,
  transactionFilters,
] as const
```

Contoh anti-pattern:

```tsx
useEffect(() => {
  fetch("/api/transactions")
    .then((response) => response.json())
    .then(setTransactions)
}, [])
```

---

## 11. Mutation Standards

Mutation harus jelas alurnya.

Pola:

```txt
validate input
-> call service
-> handle success
-> invalidate query
-> reset local/form state
-> show toast
-> write audit event on server when available
```

Aturan:

- Semua mutation harus memiliki loading state.
- Semua mutation harus memiliki error handling.
- Button submit harus disabled saat pending.
- Mutation finance penting harus siap untuk audit trail.
- Jangan update UI seolah sukses sebelum ada strategi optimistic update yang jelas.
- Untuk approval, import, export, dan billing, hindari optimistic update agresif.

---

## 12. Form Standards

Gunakan TanStack Form atau form state lokal sesuai kompleksitas.

Aturan:

- Validation schema menggunakan Zod.
- Client validation untuk UX.
- Server validation tetap wajib untuk security.
- Field error tampil dekat field.
- Form submit button disabled saat invalid atau pending.
- Form harus mendukung keyboard.
- Jangan menyimpan form finance sensitif di persisted Zustand.
- Gunakan Shadcn `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, dan komponen form yang tersedia.

Pattern:

```txt
schema -> form state -> submit handler -> payload builder -> mutation
```

Hindari:

- Form tanpa schema.
- Form dengan field name tidak sesuai domain.
- Error hanya muncul sebagai toast.
- Submit tetap aktif saat mutation pending.

---

## 13. Table Standards

Gunakan TanStack Table untuk table kompleks.

Aturan:

- Row key menggunakan ID stabil.
- Jangan menggunakan index sebagai key untuk list reorderable.
- Pagination, sorting, dan filter committed harus masuk URL.
- Column definition dipisahkan dari component jika table besar.
- Cell renderer harus kecil dan fokus.
- Bulk selection simpan ID, bukan object penuh.
- Table harus memiliki loading, empty, error, dan filtered empty state.

Contoh key benar:

```tsx
transactions.map((transaction) => (
  <TransactionTableRow
    key={transaction.id}
    transaction={transaction}
  />
))
```

Hindari:

```tsx
transactions.map((transaction, index) => (
  <TransactionTableRow key={index} transaction={transaction} />
))
```

---

## 14. TypeScript Standards

Aturan TypeScript:

- Hindari `any`.
- Gunakan `unknown` jika tipe belum diketahui, lalu narrow.
- Gunakan type domain yang jelas.
- Gunakan discriminated union untuk status/variant kompleks.
- Gunakan `as const` untuk config literal.
- Type props colocated dengan component jika hanya dipakai component itu.
- Shared type domain disimpan di `features/<feature>/types`.
- Jangan membuat type terlalu generik seperti `Data`, `Item`, `Result`.

Contoh:

```ts
type TransactionStatus = "draft" | "pending" | "approved" | "rejected" | "void"

type Transaction = {
  id: string
  workspaceId: string
  status: TransactionStatus
  amount: number
  currency: string
}
```

Hindari:

```ts
type Transaction = {
  id: any
  status: string
  amount: any
}
```

### 14.1 Event Type

Event handler harus memiliki tipe yang jelas jika menerima event.

```tsx
function handleExportButtonClick(
  event: React.MouseEvent<HTMLButtonElement>,
) {
  event.preventDefault()
}
```

Hindari:

```tsx
function handleClick(event: any) {}
```

---

## 15. Validation Standards

Gunakan Zod untuk validation.

Aturan:

- Schema domain berada di `features/<feature>/schemas`.
- Schema create dan update dipisahkan jika rules berbeda.
- Validasi client untuk UX.
- Validasi server untuk security.
- Jangan percaya input client.
- Error message harus user-friendly.

Contoh:

```ts
export const createTransactionSchema = z.object({
  accountId: z.string().min(1, "Account is required."),
  categoryId: z.string().nullable(),
  amount: z.number().positive("Amount must be greater than zero."),
  currency: z.string().length(3),
  description: z.string().min(1, "Description is required."),
})
```

---

## 16. UI Component Standards

Gunakan Shadcn UI primitive terlebih dahulu.

Prioritas:

1. Gunakan primitive Shadcn di `shared/components/ui`.
2. Komposisi menjadi component domain di `features/<feature>/components`.
3. Buat custom primitive baru hanya jika benar-benar reusable lintas feature.

Aturan:

- Jangan membuat button custom jika `Button` cukup.
- Jangan membuat dialog custom jika `Dialog` atau `AlertDialog` cukup.
- Jangan membuat table custom dari nol jika `Table` dan TanStack Table cukup.
- Gunakan `Badge` untuk status.
- Gunakan `Skeleton` untuk loading.
- Gunakan `Empty` untuk empty state.
- Gunakan `Alert` untuk warning/error inline.
- Gunakan `Sonner` untuk toast.

---

## 17. Styling Standards

Styling menggunakan Tailwind CSS dan design token.

Aturan:

- Gunakan token semantic dari design system.
- Gunakan `cn()` untuk conditional class.
- Hindari arbitrary value jika token sudah tersedia.
- Hindari warna hardcoded seperti `text-red-500` jika semantic token tersedia.
- Jangan membuat one-off style yang tidak selaras dengan design system.
- Layout page mengikuti dokumen layout/design.
- Text tidak boleh overflow dari button/card/table cell.

Contoh:

```tsx
<Badge variant="secondary" className={cn(isOverBudget && "text-destructive")}>
  Warning
</Badge>
```

---

## 18. Accessibility Standards

Accessibility wajib dari awal.

Aturan:

- Gunakan semantic HTML.
- Button harus menggunakan `<button>`, bukan `<div onClick>`.
- Link navigasi harus menggunakan link.
- Semua interactive element harus keyboard accessible.
- Icon-only button harus memiliki accessible label.
- Dialog harus memiliki title.
- Form input harus memiliki label.
- Error field harus bisa dibaca screen reader.
- Jangan mengandalkan warna saja untuk status.
- Gambar harus memiliki `alt`; dekoratif gunakan `alt=""`.

Contoh:

```tsx
<Button type="button" aria-label="Export transactions">
  <DownloadIcon aria-hidden="true" />
</Button>
```

Hindari:

```tsx
<div onClick={handleExport}>Export</div>
```

---

## 19. Performance Standards

Aturan performance:

- Gunakan Server Component jika tidak butuh client interactivity.
- Gunakan selector kecil untuk Zustand.
- Hindari render list tanpa key stabil.
- Hindari inline object/array untuk prop memoized children.
- Gunakan `useMemo` hanya untuk computation mahal atau referential stability yang dibutuhkan.
- Gunakan `useCallback` hanya saat callback dikirim ke memoized child atau dependency hook.
- Pecah component besar agar re-render lebih terkendali.
- Jangan fetch data yang sama berulang tanpa cache.
- Gunakan pagination untuk table besar.
- Gunakan dynamic/lazy loading untuk modul berat jika diperlukan.
- Gunakan `next/image` untuk image production.

Contoh penggunaan `useMemo` yang masuk akal:

```tsx
const transactionTableRows = useMemo(
  () => transactions.map(mapTransactionToTableRow),
  [transactions],
)
```

Jangan gunakan `useMemo` untuk ekspresi murah:

```tsx
const title = useMemo(() => "Transactions", [])
```

---

## 20. Error Handling Standards

Setiap feature harus memiliki error handling.

Aturan:

- Route-level error gunakan `error.tsx`.
- Feature-level error gunakan komponen error state.
- API error harus di-normalisasi.
- Jangan tampilkan stack trace ke user.
- Error message harus jelas dan actionable.
- Retry action diberikan jika aman.
- Mutation error tidak boleh diam.
- Critical error bisa dikirim ke observability saat tersedia.

Contoh:

```tsx
if (transactionsQuery.isError) {
  return (
    <TransactionsErrorState
      onRetry={() => transactionsQuery.refetch()}
    />
  )
}
```

---

## 21. Loading And Empty State Standards

Setiap data view harus memiliki:

- Loading state.
- Empty state.
- Error state.
- Filtered empty state jika ada filter.
- Permission denied state jika akses terbatas.

Aturan:

- Loading table menggunakan skeleton, bukan spinner besar saja.
- Empty state harus sesuai konteks.
- Empty state boleh memiliki CTA jika user punya permission.
- Filtered empty state harus menawarkan clear filter.

Contoh:

```tsx
if (isTransactionsEmpty) {
  return <TransactionsEmptyState canCreateTransaction={canCreateTransaction} />
}
```

---

## 22. Permission And Security Standards

Enterprise finance dashboard membutuhkan permission yang jelas.

Aturan:

- UI permission hanya untuk UX.
- Server authorization adalah sumber kebenaran.
- Jangan menampilkan action yang user tidak boleh lakukan.
- Jangan menyimpan token di Zustand.
- Jangan menyimpan data finance sensitif di persisted client store.
- Semua mutation penting harus divalidasi server.
- Semua data finance harus scoped ke workspace.
- Audit-sensitive action harus siap dicatat di audit log.

Contoh variable:

```ts
const canApproveTransactions = permissions.includes("transactions.approve")
```

Namun server tetap wajib memvalidasi approval action.

---

## 23. Formatting And Utility Standards

Formatting harus menggunakan utility, bukan inline berulang.

Utility yang direkomendasikan:

```txt
format-currency.ts
format-transaction-date.ts
format-percentage.ts
format-account-number.ts
calculate-budget-usage-percentage.ts
calculate-net-cash-flow-amount.ts
```

Aturan:

- Currency disimpan sebagai number, diformat di UI.
- Date disimpan ISO, diformat di UI.
- Percentage dihitung atau diformat konsisten.
- Jangan menulis format currency manual di component.

Hindari:

```tsx
<span>Rp {amount.toLocaleString()}</span>
```

Gunakan:

```tsx
<span>{formatCurrency(amount, "IDR")}</span>
```

---

## 24. Import Standards

Urutan import:

1. React/Next.
2. Third-party libraries.
3. Shared modules.
4. Feature modules.
5. Relative imports dalam feature yang sama.
6. Type imports jika dipisahkan oleh formatter/linter.

Contoh:

```tsx
import Link from "next/link"

import { DownloadIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { formatCurrency } from "@/shared/utils/format-currency"

import type { Transaction } from "../types/transaction.types"
```

Aturan:

- Gunakan alias `@/` untuk import lintas area.
- Gunakan relative import untuk file internal feature yang dekat.
- Hindari import internal feature dari feature lain.
- Hapus import yang tidak digunakan.

---

## 25. File Organization Standards

Urutan isi file component yang direkomendasikan:

1. Import.
2. Type props.
3. Constant lokal.
4. Component utama.
5. Helper private.

Contoh:

```tsx
import { Button } from "@/shared/components/ui/button"

type ExportReportButtonProps = {
  onExportReport: () => void
  isExporting: boolean
}

export function ExportReportButton({
  onExportReport,
  isExporting,
}: ExportReportButtonProps) {
  return (
    <Button
      type="button"
      disabled={isExporting}
      onClick={onExportReport}
    >
      Export
    </Button>
  )
}
```

---

## 26. API Route Standards

API route handler harus:

- Validate request.
- Check auth.
- Check workspace membership.
- Check permission.
- Call service/domain logic.
- Return consistent response.
- Return consistent error.

Route handler tidak boleh berisi business logic panjang.

Pola:

```txt
parse request
-> validate schema
-> authorize user
-> call service
-> return response
```

Response list:

```ts
type PaginatedResponse<T> = {
  items: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
```

---

## 27. Comment Standards

Komentar digunakan hanya saat membantu memahami keputusan yang tidak jelas.

Gunakan komentar untuk:

- Menjelaskan business rule finance yang tidak obvious.
- Menjelaskan workaround.
- Menjelaskan security decision.
- Menjelaskan calculation complex.

Hindari komentar yang mengulang kode:

```ts
// Set amount
const amount = transaction.amount
```

Komentar yang baik:

```ts
// Transfers are excluded from income and expense totals to avoid double counting.
const reportableTransactions = excludeTransferTransactions(transactions)
```

---

## 28. Testing Standards

Minimal testing focus:

- Utility finance calculation.
- Formatting.
- Schema validation.
- Mapper function.
- Service function.
- Critical component behavior.
- Permission behavior.
- Empty/error state.

Test name harus menjelaskan behavior.

```ts
it("returns exceeded status when spent amount is greater than budget amount", () => {})
```

Hindari:

```ts
it("works", () => {})
```

---

## 29. Code Quality Commands

Sebelum menyelesaikan perubahan kode, jalankan command sesuai scope.

```txt
pnpm lint
pnpm typecheck
pnpm build
```

Untuk formatting:

```txt
pnpm format
```

Catatan:

- Untuk perubahan dokumentasi saja, command build tidak wajib.
- Untuk perubahan component/logic, minimal jalankan lint dan typecheck.
- Untuk perubahan routing/API/build config, jalankan build jika memungkinkan.

---

## 30. Enterprise Finance Rules

Karena domain aplikasi adalah finance:

- Jangan menghapus data penting tanpa pola archive/void jika audit dibutuhkan.
- Jangan mempercayai nilai amount dari client tanpa validasi server.
- Jangan melakukan perhitungan report di banyak tempat berbeda.
- Jangan menampilkan data lintas workspace.
- Jangan menyembunyikan error import/export.
- Jangan menampilkan action approval tanpa permission.
- Jangan membuat export tanpa audit trail pada fase enterprise.
- Jangan membuat mutation tanpa status feedback.

Business rule harus berada di utility/service domain, bukan tersebar di component.

---

## 31. Anti-Pattern

Hindari pola berikut:

- Component raksasa berisi table, filter, dialog, mutation, dan formatting sekaligus.
- `useEffect` untuk menyalin props ke state tanpa alasan.
- Fetch API manual di `useEffect` untuk data utama.
- Menyimpan semua state di Zustand.
- Menyimpan form state di global store.
- Menyimpan server data di Zustand.
- Menggunakan `any`.
- Menggunakan index sebagai key untuk list reorderable.
- Membuat button/dialog/table custom padahal Shadcn sudah tersedia.
- Menggunakan `<div onClick>` untuk interactive element.
- Error hanya ditulis di console.
- Loading tanpa skeleton atau feedback yang jelas.
- Query parameter pendek dan tidak jelas.
- Import internal feature dari feature lain.
- Hardcoded currency/date formatting di component.

---

## 32. Pull Request Checklist

Gunakan checklist ini sebelum menganggap implementasi selesai.

| Checklist | Status |
|---|---|
| File berada di folder yang sesuai Feature-Based Architecture | Required |
| Naming mengikuti `05_NAMING_CONVENTION.md` | Required |
| Component menggunakan named export | Required |
| Props type jelas dan colocated jika lokal | Required |
| Tidak ada `any` tanpa alasan kuat | Required |
| Hooks mengikuti Rules of Hooks | Required |
| Tidak ada fetch manual di `useEffect` untuk server state utama | Required |
| State berada di owner yang benar | Required |
| Loading, empty, error state tersedia | Required |
| Permission state dipertimbangkan | Required |
| UI menggunakan Shadcn primitive jika tersedia | Required |
| Semantic HTML dan accessibility dasar terpenuhi | Required |
| List key menggunakan ID stabil | Required |
| Formatting currency/date memakai utility | Required |
| Mutation memiliki loading dan error handling | Required |
| Lint dan typecheck dijalankan untuk perubahan kode | Recommended |

---

## 33. Ringkasan Keputusan

Keputusan coding standard untuk Finance Dashboard:

- Gunakan Feature-Based Architecture secara ketat.
- Route file di `app/` harus tipis.
- Gunakan Server Component secara default dan Client Component hanya saat diperlukan.
- React component menggunakan named export, props eksplisit, semantic HTML, dan Shadcn UI primitive.
- State ditempatkan sesuai owner: URL, TanStack Query, TanStack Form, local state, Zustand, atau `next-themes`.
- Hindari `useEffect` untuk derived state dan manual data fetching utama.
- Gunakan TypeScript ketat dan hindari `any`.
- Gunakan Zod untuk validasi.
- Gunakan stable key untuk list.
- Gunakan utility untuk formatting dan calculation.
- Semua UI data harus memiliki loading, empty, error, dan permission state.
- Semua mutation finance penting harus siap untuk validation, authorization, dan audit trail.
