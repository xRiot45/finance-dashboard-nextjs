# State Management Architecture

Dokumen ini mendefinisikan strategi state management untuk Finance Dashboard NextJS. Project ini menggunakan **Zustand** sebagai client state store utama, dengan tetap membagi state berdasarkan tanggung jawabnya agar aplikasi tetap ringan, konsisten, dan enterprise-ready.

Prinsip paling penting:

> Tidak semua state harus masuk Zustand.

Zustand digunakan untuk **global client state** yang benar-benar dibutuhkan lintas halaman, lintas komponen, atau lintas fitur. Server data, form state, dan URL state tetap memiliki tempat masing-masing.

---

## 1. Tujuan State Management

State management harus membantu aplikasi:

- Menjaga UI dashboard tetap konsisten.
- Menghindari prop drilling yang berlebihan.
- Memisahkan server data dari client UI state.
- Menjaga filter, pagination, dan report period bisa dibagikan lewat URL.
- Mendukung multi-workspace, role-based UI, dan enterprise workflow.
- Memudahkan reset state saat logout, switch workspace, atau permission berubah.
- Mengurangi re-render yang tidak perlu.
- Menjaga store tetap kecil, terukur, dan mudah diuji.

---

## 2. Library Yang Digunakan

| Kebutuhan | Library / Owner | Catatan |
|---|---|---|
| Global client state | Zustand | Untuk state lintas fitur seperti app shell, active workspace, preference UI |
| Server state | TanStack Query / server fetch | Untuk data dari API seperti transactions, accounts, reports |
| Form state | TanStack Form / local component state | Untuk form transaksi, budget, account, settings |
| Table state | TanStack Table + URL state | Sorting, pagination, filter table penting |
| Theme state | `next-themes` | Light, dark, system |
| URL state | Next.js router/search params | Filter, page, sort, date range, saved view |
| Toast state | Sonner | Notifikasi transient |

Zustand tidak menggantikan TanStack Query, TanStack Form, atau URL search params. Zustand hanya mengelola state client yang tidak cocok disimpan di tempat lain.

---

## 3. Kategori State

### 3.1 URL State

URL state adalah state yang perlu bisa dibagikan, di-bookmark, dipulihkan setelah refresh, atau menjadi bagian dari workflow user.

Contoh:

- `page`
- `limit`
- `query`
- `sort`
- `direction`
- `from`
- `to`
- `status`
- `type`
- `accountId`
- `categoryId`
- `savedViewId`

Contoh URL:

```txt
/transactions?query=rent&type=expense&status=approved&page=2
/reports/cash-flow?from=2026-01-01&to=2026-03-31&groupBy=month
```

Aturan:

- Filter utama list masuk URL.
- Pagination list masuk URL.
- Sorting table utama masuk URL.
- Periode report masuk URL.
- Saved view masuk URL.
- UI state kecil tidak perlu masuk URL.

### 3.2 Server State

Server state adalah data yang berasal dari API, database, atau backend service.

Contoh:

- List transaksi.
- Detail account.
- Summary dashboard.
- Report data.
- Approval queue.
- Audit logs.
- Import/export job status.
- Member workspace.

Server state tidak boleh disalin ke Zustand sebagai source of truth.

Gunakan TanStack Query atau server fetch untuk:

- Fetching.
- Caching.
- Refetch.
- Invalidation.
- Optimistic update.
- Loading dan error state data.

### 3.3 Form State

Form state adalah state input sementara sebelum submit.

Contoh:

- Transaction form.
- Budget form.
- Account form.
- Category form.
- Workspace settings form.
- Approval rule form.

Form state tidak boleh masuk global Zustand store kecuali ada kebutuhan wizard multi-step lintas route yang jelas.

Gunakan TanStack Form atau local component state untuk form.

### 3.4 Local UI State

Local UI state adalah state yang hanya dibutuhkan oleh satu komponen atau satu area kecil.

Contoh:

- Dialog delete terbuka.
- Dropdown terbuka.
- Popover filter terbuka.
- Hover state.
- Tab kecil dalam card.
- Input draft untuk search sebelum commit ke URL.

Gunakan `useState`, `useReducer`, atau state bawaan komponen UI.

### 3.5 Global Client State

Global client state adalah state yang dipakai lintas halaman atau lintas fitur dan tidak berasal langsung dari server sebagai data utama.

Contoh:

- Sidebar collapsed.
- Command menu open.
- Active workspace display context.
- UI density preference.
- Currency display preference.
- Recently used account/category IDs.
- Last visited dashboard view.
- Temporary selected rows lintas toolbar dalam satu feature.

State inilah yang dikelola oleh Zustand.

---

## 4. Prinsip Penggunaan Zustand

Zustand harus digunakan secara disiplin.

Aturan utama:

- Store harus kecil dan spesifik.
- Jangan membuat satu store raksasa untuk seluruh aplikasi.
- Jangan menyimpan server data besar di Zustand.
- Jangan menyimpan form input panjang di Zustand.
- Jangan menyimpan data sensitif yang tidak perlu berada di client.
- Gunakan selector agar komponen hanya subscribe ke state yang dibutuhkan.
- Pisahkan store global app dan store feature.
- Reset store saat logout atau switch workspace jika state bergantung pada workspace.
- Persist hanya untuk state aman dan memang perlu bertahan setelah refresh.

---

## 5. Jenis Store

### 5.1 Global App Store

Global app store menyimpan state UI aplikasi yang bersifat lintas fitur.

Lokasi rekomendasi:

```txt
shared/stores/app-store.ts
```

Contoh state:

- `sidebarCollapsed`
- `commandMenuOpen`
- `activeWorkspaceId`
- `activeWorkspaceName`
- `uiDensity`
- `currencyDisplay`
- `lastVisitedRoute`

Catatan:

- `activeWorkspaceId` boleh ada di Zustand untuk kebutuhan UI dan routing ringan.
- Validasi membership workspace tetap harus dilakukan di server.
- Jangan mengandalkan Zustand sebagai sumber keamanan workspace.

### 5.2 Feature UI Store

Feature UI store digunakan untuk state client yang hanya relevan untuk satu feature tetapi dipakai oleh banyak komponen dalam feature tersebut.

Lokasi rekomendasi:

```txt
features/transactions/stores/transaction-ui-store.ts
features/reports/stores/report-ui-store.ts
features/imports/stores/import-ui-store.ts
```

Contoh:

- Selected transaction rows.
- Bulk action drawer state.
- Report comparison panel state.
- Import preview column mapping UI.
- Chart visibility preference dalam feature reports.

Feature UI store tidak boleh di-import oleh feature lain kecuali memang diekspor sebagai public API feature dan ada alasan arsitektural yang jelas.

### 5.3 Preference Store

Preference store menyimpan preferensi UI yang aman untuk dipersist.

Lokasi rekomendasi:

```txt
shared/stores/preference-store.ts
```

Contoh:

- Density: `compact`, `comfortable`.
- Default currency display.
- Default report period.
- Sidebar collapsed.
- Table column visibility preference.

Preference yang bersifat user-specific idealnya tetap disinkronkan ke backend ketika fitur user settings sudah tersedia.

### 5.4 Session-Derived Store

Session-derived store hanya boleh menyimpan representasi UI dari session, bukan menjadi sumber kebenaran auth.

Contoh:

- Current user display name.
- Current user avatar URL.
- Current workspace label.
- Current role label untuk UI.

Auth, permission, dan workspace membership tetap harus divalidasi oleh server.

---

## 6. Struktur Folder Store

Struktur yang direkomendasikan:

```txt
shared/
└── stores/
    ├── app-store.ts
    ├── preference-store.ts
    ├── session-ui-store.ts
    └── reset-stores.ts

features/
├── transactions/
│   └── stores/
│       └── transaction-ui-store.ts
├── reports/
│   └── stores/
│       └── report-ui-store.ts
├── imports/
│   └── stores/
│       └── import-ui-store.ts
└── app-shell/
    └── stores/
        └── app-shell-store.ts
```

Aturan:

- Store global berada di `shared/stores`.
- Store feature berada di `features/<feature>/stores`.
- Store app shell boleh berada di `features/app-shell/stores` jika hanya dipakai shell.
- Jangan menaruh store di folder `app/`.
- Jangan membuat folder global `store/` tanpa konteks.

---

## 7. Naming Convention

Gunakan penamaan yang konsisten.

| Item | Pattern | Contoh |
|---|---|---|
| Store hook | `use<Name>Store` | `useAppStore` |
| Store file | `<domain>-store.ts` | `app-store.ts` |
| Feature UI store | `<feature>-ui-store.ts` | `transaction-ui-store.ts` |
| State type | `<Name>State` | `AppStoreState` |
| Action type | `<Name>Actions` | `AppStoreActions` |
| Reset function | `reset<Name>Store` | `resetAppStore` |
| Selector | `select<Name>` | `selectSidebarCollapsed` |

Contoh:

```txt
useAppStore
usePreferenceStore
useTransactionUiStore
useReportUiStore
```

---

## 8. Store Shape

Store harus memiliki shape yang mudah dibaca.

Pola rekomendasi:

```ts
type AppStoreState = {
  sidebarCollapsed: boolean
  commandMenuOpen: boolean
  activeWorkspaceId: string | null
}

type AppStoreActions = {
  setSidebarCollapsed: (value: boolean) => void
  setCommandMenuOpen: (value: boolean) => void
  setActiveWorkspace: (workspaceId: string | null) => void
  reset: () => void
}

type AppStore = AppStoreState & AppStoreActions
```

Aturan shape:

- Pisahkan state dan actions secara konseptual.
- Gunakan nama action yang eksplisit.
- Hindari action ambigu seperti `updateData`.
- Hindari nested object terlalu dalam.
- Jangan simpan data turunan yang bisa dihitung dari state lain.

---

## 9. Contoh Global App Store

Contoh implementasi:

```ts
import { create } from "zustand"

type UiDensity = "compact" | "comfortable"

type AppStoreState = {
  sidebarCollapsed: boolean
  commandMenuOpen: boolean
  activeWorkspaceId: string | null
  uiDensity: UiDensity
}

type AppStoreActions = {
  setSidebarCollapsed: (value: boolean) => void
  setCommandMenuOpen: (value: boolean) => void
  setActiveWorkspaceId: (workspaceId: string | null) => void
  setUiDensity: (density: UiDensity) => void
  reset: () => void
}

type AppStore = AppStoreState & AppStoreActions

const initialState: AppStoreState = {
  sidebarCollapsed: false,
  commandMenuOpen: false,
  activeWorkspaceId: null,
  uiDensity: "comfortable",
}

export const useAppStore = create<AppStore>()((set) => ({
  ...initialState,
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
  setCommandMenuOpen: (value) => set({ commandMenuOpen: value }),
  setActiveWorkspaceId: (workspaceId) =>
    set({ activeWorkspaceId: workspaceId }),
  setUiDensity: (density) => set({ uiDensity: density }),
  reset: () => set(initialState),
}))
```

Catatan:

- `initialState` dibuat eksplisit agar reset mudah.
- Action tidak melakukan fetch server.
- Store ini aman dipakai oleh app shell dan feature yang butuh konteks UI global.

---

## 10. Selector Pattern

Komponen harus mengambil state dengan selector.

Benar:

```tsx
const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed)
const setSidebarCollapsed = useAppStore((state) => state.setSidebarCollapsed)
```

Hindari:

```tsx
const appStore = useAppStore()
```

Alasan:

- Mengambil seluruh store membuat komponen re-render setiap ada perubahan state apapun.
- Selector menjaga komponen hanya subscribe ke state yang dibutuhkan.

Jika satu komponen membutuhkan beberapa value, gunakan selector yang tetap kecil.

```tsx
const commandMenuOpen = useAppStore((state) => state.commandMenuOpen)
const setCommandMenuOpen = useAppStore((state) => state.setCommandMenuOpen)
```

---

## 11. Persist State

Persist hanya digunakan untuk state yang:

- Aman disimpan di browser.
- Tidak sensitif.
- Tidak terlalu besar.
- Perlu bertahan setelah refresh.
- Tidak mudah basi secara berbahaya.

Contoh aman untuk persist:

- Sidebar collapsed.
- UI density.
- Default currency display.
- Table column visibility.
- Last selected report period.

Contoh yang tidak boleh dipersist:

- Access token.
- Refresh token.
- Permission detail sensitif.
- Data transaksi penuh.
- Report result penuh.
- Audit log.
- Draft form finance sensitif tanpa kebutuhan jelas.

Contoh persist:

```ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type PreferenceStore = {
  uiDensity: "compact" | "comfortable"
  sidebarCollapsed: boolean
  setUiDensity: (density: "compact" | "comfortable") => void
  setSidebarCollapsed: (value: boolean) => void
}

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      uiDensity: "comfortable",
      sidebarCollapsed: false,
      setUiDensity: (density) => set({ uiDensity: density }),
      setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
    }),
    {
      name: "finance-dashboard-preferences",
      partialize: (state) => ({
        uiDensity: state.uiDensity,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
)
```

Gunakan `partialize` agar hanya state yang benar-benar aman yang tersimpan.

---

## 12. Middleware Zustand

Middleware boleh digunakan jika memberi manfaat jelas.

| Middleware | Kegunaan | Catatan |
|---|---|---|
| `persist` | Menyimpan preference aman ke storage | Gunakan `partialize` |
| `devtools` | Debug state saat development | Jangan bergantung pada devtools untuk logic |
| `subscribeWithSelector` | Subscribe ke slice state tertentu di luar React | Gunakan untuk kasus spesifik |

Jangan menambah middleware baru tanpa kebutuhan jelas.

Untuk project ini, middleware default yang direkomendasikan:

- `persist` untuk preference store.
- `devtools` untuk development jika dibutuhkan.
- `subscribeWithSelector` untuk event lintas sistem yang benar-benar perlu.

---

## 13. Integrasi Dengan TanStack Query

TanStack Query adalah pemilik server state.

Zustand tidak boleh menyimpan:

- List transaksi.
- Detail transaksi.
- Summary dashboard.
- Report result.
- Approval queue.
- Audit log result.
- Import/export job result.

Zustand boleh menyimpan:

- UI state table.
- Selected row IDs.
- Open/closed bulk action toolbar.
- Preference kolom table.

Contoh pembagian tanggung jawab:

| Kebutuhan | Owner |
|---|---|
| Fetch `/api/transactions` | TanStack Query |
| Cache list transaksi | TanStack Query |
| Filter transaksi | URL search params |
| Selected rows untuk bulk action | Zustand feature store |
| Bulk action dialog open | Local state atau Zustand feature store |
| Invalidate setelah update | TanStack Query |

Alur setelah mutation:

```txt
User submit transaction
-> mutation success
-> invalidate transaction queries
-> invalidate dashboard summary queries
-> reset form state
-> close dialog/local UI state
-> show toast
```

---

## 14. Integrasi Dengan URL State

URL state dan Zustand tidak boleh saling menduplikasi source of truth.

Contoh benar:

- `status=approved` disimpan di URL.
- Table membaca filter dari search params.
- Zustand hanya menyimpan apakah filter panel terbuka.

Contoh salah:

- `status=approved` disimpan di URL dan Zustand.
- Saat salah satu berubah, state menjadi tidak sinkron.

Mapping:

| State | Owner |
|---|---|
| Search keyword committed | URL |
| Date range report | URL |
| Sort column | URL |
| Sort direction | URL |
| Current page | URL |
| Filter drawer open | Local/Zustand |
| Temporary search input sebelum submit | Local state |
| Saved view selected | URL atau server preference |

---

## 15. Integrasi Dengan Form State

Form state tidak masuk Zustand secara default.

Gunakan TanStack Form atau local state untuk:

- Field value.
- Field error.
- Dirty state.
- Touched state.
- Submit state.
- Validation state.

Zustand hanya boleh dipakai untuk form jika:

- Form adalah wizard multi-step yang berpindah route.
- Draft perlu dipertahankan saat user pindah halaman.
- Ada kebutuhan recovery yang jelas.
- Data yang disimpan tidak sensitif atau sudah dilindungi dengan mekanisme yang sesuai.

Untuk finance dashboard, default-nya:

- Transaction form tidak masuk global store.
- Budget form tidak masuk global store.
- Account form tidak masuk global store.
- Settings form tidak masuk global store.

---

## 16. Integrasi Dengan App Shell

App shell adalah konsumen utama global UI state.

State app shell yang cocok masuk Zustand:

- Sidebar collapsed.
- Mobile sidebar open jika perlu lintas layout.
- Command menu open.
- Active navigation group.
- Workspace switcher open jika perlu dikontrol lintas komponen.
- UI density.

Lokasi:

```txt
features/app-shell/stores/app-shell-store.ts
```

Atau jika state dipakai lintas feature:

```txt
shared/stores/app-store.ts
```

Aturan:

- Sidebar state boleh dipersist.
- Command menu open tidak perlu dipersist.
- Workspace switcher open tidak perlu dipersist.
- Active workspace ID boleh global, tetapi sumber kebenaran tetap session/server.

---

## 17. Workspace State

Workspace adalah state penting karena memengaruhi hampir semua data.

Rekomendasi:

- `activeWorkspaceId` boleh disimpan di Zustand untuk UI.
- Data workspace detail tetap berasal dari server/session.
- Switch workspace harus menghapus atau invalidasi state yang bergantung pada workspace.
- Query server harus selalu scoped ke workspace di server.
- Permission harus dihitung dari session/server, bukan hanya Zustand.

Saat user mengganti workspace:

```txt
User memilih workspace baru
-> validasi membership di server
-> update active workspace session
-> update activeWorkspaceId UI state
-> reset feature UI stores yang workspace-specific
-> invalidate server queries
-> redirect ke /dashboard atau route aman
```

State yang harus di-reset saat switch workspace:

- Selected transaction rows.
- Import preview state.
- Report comparison panel state.
- Bulk action state.
- Temporary feature filters yang tidak berada di URL.
- Cached client-only preference yang workspace-specific.

State yang tidak perlu di-reset:

- Theme.
- Sidebar collapsed.
- UI density global.
- Command menu shortcut preference.

---

## 18. Auth Dan Session State

Zustand bukan sumber kebenaran auth.

Jangan simpan ini di Zustand:

- Access token.
- Refresh token.
- Password.
- Secret.
- Full permission matrix sensitif.
- Raw session response lengkap jika mengandung data sensitif.

Yang boleh disimpan untuk UI:

- Display name.
- Avatar URL.
- Active role label.
- Workspace display name.
- Basic user menu state.

Saat logout:

```txt
User logout
-> panggil endpoint logout
-> clear auth/session cookie di server
-> reset semua Zustand store
-> clear query cache
-> redirect ke /login
```

---

## 19. Reset Store

Project harus memiliki mekanisme reset store terpusat.

Lokasi rekomendasi:

```txt
shared/stores/reset-stores.ts
```

Contoh:

```ts
import { useAppStore } from "./app-store"
import { usePreferenceStore } from "./preference-store"
import { useTransactionUiStore } from "@/features/transactions/stores/transaction-ui-store"

export function resetClientStores() {
  useAppStore.getState().reset()
  useTransactionUiStore.getState().reset()
}

export function resetWorkspaceStores() {
  useTransactionUiStore.getState().reset()
}
```

Catatan:

- Tidak semua store harus di-reset saat logout.
- Preference yang aman boleh tetap bertahan.
- Store workspace-specific harus di-reset saat workspace berubah.

---

## 20. Feature Store Pattern

Contoh feature store untuk transactions:

```ts
import { create } from "zustand"

type TransactionUiStoreState = {
  selectedTransactionIds: string[]
  bulkActionOpen: boolean
}

type TransactionUiStoreActions = {
  setSelectedTransactionIds: (ids: string[]) => void
  clearSelectedTransactionIds: () => void
  setBulkActionOpen: (value: boolean) => void
  reset: () => void
}

type TransactionUiStore =
  TransactionUiStoreState & TransactionUiStoreActions

const initialState: TransactionUiStoreState = {
  selectedTransactionIds: [],
  bulkActionOpen: false,
}

export const useTransactionUiStore = create<TransactionUiStore>()((set) => ({
  ...initialState,
  setSelectedTransactionIds: (ids) => set({ selectedTransactionIds: ids }),
  clearSelectedTransactionIds: () => set({ selectedTransactionIds: [] }),
  setBulkActionOpen: (value) => set({ bulkActionOpen: value }),
  reset: () => set(initialState),
}))
```

Aturan feature store:

- Simpan hanya UI state feature.
- Jangan simpan row data transaksi penuh.
- Gunakan ID untuk selection.
- Reset saat workspace berubah.
- Clear selected IDs setelah mutation berhasil.

---

## 21. Store Untuk Table

Table adalah area yang rawan membuat state berantakan.

Pembagian state table:

| Table State | Owner |
|---|---|
| Data rows | TanStack Query |
| Pagination | URL |
| Sorting | URL |
| Search committed | URL |
| Filter committed | URL |
| Column visibility | Zustand preference atau server preference |
| Row selection | Zustand feature store atau TanStack Table local state |
| Expanded rows | Local state |
| Bulk action toolbar open | Zustand feature store |

Untuk table enterprise:

- Gunakan URL untuk state yang memengaruhi data.
- Gunakan Zustand untuk preference tampilan.
- Gunakan TanStack Table untuk state internal table yang lokal.
- Jangan simpan seluruh result table di Zustand.

---

## 22. Store Untuk Reports

Report memiliki state yang perlu dibagi dengan hati-hati.

Pembagian:

| Report State | Owner |
|---|---|
| Date range | URL |
| Group by | URL |
| Compare period | URL |
| Account/category filter | URL |
| Report result | TanStack Query |
| Chart hidden/visible | Zustand preference |
| Panel compare open | Zustand feature store atau local state |
| Export format selected | Local state |

Contoh URL:

```txt
/reports/cash-flow?from=2026-01-01&to=2026-03-31&groupBy=month
```

Zustand tidak boleh menjadi tempat menyimpan hasil kalkulasi report utama.

---

## 23. Store Untuk Import Dan Export

Import/export memiliki workflow asynchronous.

Pembagian:

| State | Owner |
|---|---|
| Uploaded file object sementara | Local state |
| Column mapping UI | Zustand feature store jika multi-step |
| Import job status | TanStack Query |
| Import result | TanStack Query |
| Export job status | TanStack Query |
| Export format selection | Local state |
| Last export preference | Zustand preference |

Catatan:

- File object tidak perlu dipersist.
- Job status harus berasal dari server.
- Jika user refresh halaman detail import, data harus bisa dimuat ulang dari API berdasarkan `importJobId`.

---

## 24. Store Untuk Approval

Approval adalah workflow sensitif.

Pembagian:

| State | Owner |
|---|---|
| Approval queue | TanStack Query |
| Approval detail | TanStack Query |
| Selected approval IDs | Zustand feature store |
| Approve/reject dialog open | Local state |
| Approval comment draft | Local form state |
| Approval permission | Server/session |

Aturan:

- Jangan menyimpan approval decision sebagai global state sebelum submit.
- Jangan menyimpan comment sensitif di persisted store.
- Setelah approve/reject berhasil, invalidate approval query dan audit-related query.

---

## 25. Store Untuk Notification

Notification state dibagi antara server dan client.

| State | Owner |
|---|---|
| Notification list | TanStack Query |
| Unread count | TanStack Query atau server push layer |
| Notification popover open | Local/Zustand app shell |
| Toast event | Sonner |
| Notification preferences | Server settings + form state |

Jika nanti menggunakan real-time update, server event tetap menjadi sumber data utama. Zustand boleh menyimpan state UI popover atau optimistic unread count sementara, tetapi harus disinkronkan kembali dengan server.

---

## 26. Hydration Dan SSR

Karena project menggunakan Next.js App Router, store Zustand harus dipakai dengan hati-hati pada boundary client/server.

Aturan:

- Zustand store dipakai di Client Component.
- File store yang menggunakan hook Zustand harus dianggap client-side.
- Jangan membaca Zustand store langsung di Server Component untuk keputusan security.
- Jangan membuat initial state yang bergantung pada `window` tanpa guard.
- Persisted state harus mempertimbangkan hydration mismatch.

Jika komponen membutuhkan Zustand, komponen tersebut harus menjadi Client Component.

Contoh:

```tsx
"use client"

import { useAppStore } from "@/shared/stores/app-store"

export function SidebarToggle() {
  const collapsed = useAppStore((state) => state.sidebarCollapsed)
  const setCollapsed = useAppStore((state) => state.setSidebarCollapsed)

  return (
    <button onClick={() => setCollapsed(!collapsed)}>
      Toggle sidebar
    </button>
  )
}
```

Server Component tetap boleh mengambil data server dan meneruskannya ke Client Component sebagai props.

---

## 27. Performance Rules

Untuk menjaga performa dashboard:

- Gunakan selector kecil.
- Hindari subscribe ke seluruh store.
- Hindari menyimpan object besar.
- Hindari membuat object/array baru yang tidak perlu di selector.
- Simpan ID, bukan object lengkap.
- Pisahkan store jika state sering berubah dan tidak berkaitan.
- Jangan membuat store global untuk setiap komponen kecil.
- Hindari update state dalam loop besar.
- Reset selected rows setelah data berubah drastis.

Contoh buruk:

```tsx
const { selectedTransactionIds, setSelectedTransactionIds, bulkActionOpen } =
  useTransactionUiStore()
```

Contoh lebih baik:

```tsx
const selectedTransactionIds = useTransactionUiStore(
  (state) => state.selectedTransactionIds,
)
```

---

## 28. Security Rules

State client bisa dibaca dan dimanipulasi oleh user. Karena itu:

- Jangan simpan secret di Zustand.
- Jangan simpan token di Zustand.
- Jangan jadikan role di Zustand sebagai sumber authorization.
- Jangan simpan data finance sensitif di persisted store.
- Jangan percaya `activeWorkspaceId` dari client tanpa validasi server.
- Jangan simpan audit log detail di store client global.
- Jangan menyimpan full imported data di persisted store.

Semua aksi penting harus divalidasi di server:

- Create transaction.
- Edit transaction.
- Delete/archive transaction.
- Approve/reject item.
- Import data.
- Export data.
- Change role/member.
- Update billing/settings.

---

## 29. Testing Strategy

Store Zustand harus mudah diuji.

Yang perlu diuji:

- Initial state.
- Action update state.
- Reset state.
- Persist partial state jika digunakan.
- Workspace switch reset behavior.
- Logout reset behavior.
- Selector penting jika dibuat sebagai utility.

Contoh test case:

| Store | Test |
|---|---|
| App store | Toggle sidebar |
| App store | Open/close command menu |
| Preference store | Change UI density |
| Transaction UI store | Select and clear rows |
| Transaction UI store | Reset after workspace switch |
| Import UI store | Reset column mapping |

Testing store tidak perlu melibatkan UI jika logic store bisa diuji secara langsung.

---

## 30. Observability Dan Debugging

Untuk debugging:

- Gunakan Zustand devtools hanya di development jika diperlukan.
- Beri nama store yang jelas.
- Log action penting hanya jika aman dan tidak membocorkan data.
- Jangan log data transaksi sensitif.
- Jangan log token atau raw session.
- Gunakan event analytics untuk workflow penting, bukan untuk isi data sensitif.

Event yang layak dipantau:

- Workspace switched.
- Report filter changed.
- Bulk action started.
- Import step completed.
- Export requested.

Event harus berisi metadata aman, bukan data finance mentah.

---

## 31. Decision Matrix

Gunakan matrix ini saat bingung state harus disimpan di mana.

| Pertanyaan | Jika Ya | Owner |
|---|---|---|
| Apakah state berasal dari API/database? | Ya | TanStack Query / server fetch |
| Apakah state harus bisa dibagikan lewat link? | Ya | URL search params |
| Apakah state adalah input form sebelum submit? | Ya | TanStack Form / local state |
| Apakah state hanya dipakai satu komponen? | Ya | Local state |
| Apakah state dipakai lintas fitur dan bersifat client UI? | Ya | Zustand shared store |
| Apakah state dipakai banyak komponen dalam satu feature? | Ya | Zustand feature store |
| Apakah state sensitif? | Ya | Server/session, jangan persist di client |
| Apakah state harus bertahan setelah refresh? | Ya, aman | Zustand persist atau server preference |
| Apakah state harus divalidasi untuk security? | Ya | Server |

---

## 32. Anti-Pattern

Hindari pola berikut:

- Menyimpan semua data API di Zustand.
- Membuat satu `useStore` besar untuk seluruh aplikasi.
- Menyimpan form transaksi di global store tanpa alasan.
- Menyimpan filter list di Zustand padahal seharusnya di URL.
- Menyimpan token auth di Zustand.
- Menyimpan permission sebagai sumber kebenaran client.
- Menyimpan data finance sensitif di persisted local storage.
- Menggunakan `useStore()` tanpa selector di banyak komponen.
- Membuat store feature di `app/`.
- Mengimpor store feature secara bebas antar feature.
- Tidak me-reset store saat logout.
- Tidak me-reset state workspace-specific saat switch workspace.
- Menduplikasi state yang sama di URL dan Zustand.

---

## 33. Checklist State Management

Gunakan checklist ini sebelum menambahkan state baru.

| Checklist | Status |
|---|---|
| Sudah jelas kategori state-nya | Required |
| Server data tidak disimpan di Zustand | Required |
| Filter penting masuk URL | Required |
| Form state tidak masuk global store | Required |
| Store memiliki initial state eksplisit | Required |
| Store memiliki reset action jika dibutuhkan | Required |
| Komponen menggunakan selector | Required |
| Persist hanya menyimpan state aman | Required jika memakai persist |
| Workspace-specific state reset saat switch workspace | Required |
| Logout reset behavior jelas | Required |
| Store berada di folder yang tepat | Required |
| Tidak ada data sensitif di client store | Required |
| Authorization tetap di server | Required |

---

## 34. Ringkasan Keputusan

Keputusan state management untuk Finance Dashboard:

- Zustand digunakan sebagai global client state manager.
- TanStack Query tetap menjadi pemilik server state.
- TanStack Form atau local state menjadi pemilik form state.
- URL search params menjadi pemilik filter, sorting, pagination, dan periode report.
- `next-themes` menjadi pemilik theme state.
- Store global berada di `shared/stores`.
- Store feature berada di `features/<feature>/stores`.
- Store harus kecil, spesifik, dan memiliki reset strategy.
- Persist hanya digunakan untuk preference yang aman.
- Data finance sensitif, token, permission source of truth, dan server result besar tidak boleh disimpan di Zustand.
- Switch workspace dan logout harus membersihkan state client yang relevan.
