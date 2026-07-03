# Finance Dashboard NextJS - Project Overview

## Ringkasan

Finance Dashboard NextJS adalah aplikasi dashboard keuangan berbasis Next.js yang ditujukan untuk membantu pengguna memantau kondisi finansial secara cepat, rapi, dan mudah dipahami. Project ini saat ini berada pada tahap fondasi awal: struktur aplikasi, konfigurasi framework, design token, theme system, dan komponen UI dasar sudah tersedia, sementara modul bisnis finance masih perlu dibangun di atas fondasi tersebut.

Tujuan utama project ini adalah menyediakan satu tempat terpusat untuk melihat metrik keuangan, tren transaksi, ringkasan pendapatan dan pengeluaran, serta visualisasi data yang relevan untuk pengambilan keputusan.

## Status Project Saat Ini

Status saat ini: **starter/foundation phase**.

Yang sudah tersedia:

- Next.js App Router dengan React dan TypeScript.
- Tailwind CSS 4 dengan CSS variables untuk design token.
- Koleksi komponen UI berbasis shadcn/ui, Radix/Base UI, dan lucide-react.
- Dukungan light/dark mode melalui `next-themes`.
- Dependency untuk data table, chart, form, validasi, state management, dan data fetching.
- Struktur dokumentasi project di folder `docs/`.

Yang belum terlihat terimplementasi:

- Halaman dashboard finance utama.
- Modul transaksi, kategori, akun, budget, laporan, atau analitik.
- Integrasi API/backend.
- Data model finance.
- State management aplikasi bisnis.
- Autentikasi dan manajemen pengguna.

## Sasaran Produk

Finance Dashboard ini diarahkan untuk menjadi aplikasi web yang membantu pengguna:

- Melihat kondisi keuangan secara ringkas melalui dashboard utama.
- Menganalisis pemasukan, pengeluaran, saldo, dan tren keuangan.
- Mengelola transaksi finansial harian.
- Mengelompokkan transaksi berdasarkan kategori.
- Membaca data keuangan melalui tabel, grafik, dan kartu metrik.
- Menggunakan aplikasi secara nyaman di mode terang maupun gelap.

## Target Pengguna

Target pengguna yang cocok untuk project ini:

- Individu yang ingin memantau keuangan pribadi.
- Freelancer atau pekerja mandiri yang perlu melihat arus kas sederhana.
- Tim kecil yang membutuhkan dashboard internal untuk pemantauan finance dasar.
- Developer atau tim produk yang ingin membangun finance dashboard modern berbasis Next.js.

## Tech Stack

| Area             | Teknologi                    |
| ---------------- | ---------------------------- |
| Framework        | Next.js 16.2.6               |
| UI Library       | React 19.2.4                 |
| Bahasa           | TypeScript                   |
| Styling          | Tailwind CSS 4               |
| Component System | shadcn/ui, Radix UI, Base UI |
| Icon             | lucide-react                 |
| Chart            | Recharts                     |
| Table            | TanStack Table               |
| Form             | TanStack Form                |
| Data Fetching    | TanStack Query, Axios        |
| State Management | Zustand                      |
| Validasi         | Zod                          |
| Theme            | next-themes                  |
| Package Manager  | pnpm                         |
| Linting          | ESLint                       |
| Formatting       | Prettier                     |
| Git Hooks        | Husky, Commitlint            |

## Struktur Project

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── shared/
│   ├── components/ui/
│   ├── hooks/
│   ├── lib/
│   └── providers/
├── docs/
│   ├── architecture/
│   ├── design/
│   ├── development/
│   ├── layout/
│   ├── product/
│   ├── prompts/
│   └── quality/
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Penjelasan Struktur

### `app/`

Folder utama untuk Next.js App Router. Saat ini berisi:

- `layout.tsx` untuk root layout, font, dan metadata dasar.
- `page.tsx` sebagai halaman awal starter.
- `globals.css` untuk Tailwind CSS, theme token, warna, radius, shadow, dan base styles.

### `shared/components/ui/`

Berisi komponen UI reusable. Komponen yang tersedia sudah cukup luas untuk membangun dashboard modern, termasuk button, card, table, chart, dialog, tabs, sidebar, dropdown, form input, select, tooltip, pagination, skeleton, dan komponen pendukung lain.

### `shared/providers/`

Berisi provider aplikasi. Saat ini terdapat `theme-provider.tsx` yang mengatur light/dark mode menggunakan `next-themes` dan menyediakan shortcut keyboard `d` untuk toggle theme.

### `shared/lib/`

Berisi helper umum project. Saat ini terdapat utility untuk menggabungkan class name, biasanya dipakai oleh komponen UI.

### `docs/`

Folder dokumentasi sudah disiapkan dengan pembagian area produk, arsitektur, desain, layout, quality, development, dan prompt. Mayoritas file masih kosong, sehingga folder ini dapat menjadi pusat dokumentasi seiring pengembangan project.

## Modul Yang Direkomendasikan

Berikut modul yang paling relevan untuk tahap pengembangan berikutnya:

| Modul              | Deskripsi                                                         |
| ------------------ | ----------------------------------------------------------------- |
| Dashboard Overview | Ringkasan saldo, income, expense, cash flow, dan tren utama.      |
| Transactions       | Daftar transaksi dengan filter, pencarian, kategori, dan status.  |
| Categories         | Pengelolaan kategori pemasukan dan pengeluaran.                   |
| Accounts           | Pengelolaan akun seperti cash, bank, e-wallet, atau kartu kredit. |
| Budgets            | Perencanaan batas pengeluaran per kategori/periode.               |
| Reports            | Grafik dan laporan bulanan, mingguan, atau tahunan.               |
| Settings           | Preferensi pengguna, currency, theme, dan konfigurasi aplikasi.   |

## Rekomendasi Halaman

Struktur routing awal yang dapat digunakan:

```text
/
/dashboard
/transactions
/transactions/new
/categories
/accounts
/budgets
/reports
/settings
```

Jika aplikasi membutuhkan autentikasi:

```text
/login
/register
/forgot-password
```

## Data Utama Yang Dibutuhkan

Entitas dasar yang disarankan:

- `User`
- `Account`
- `Transaction`
- `Category`
- `Budget`
- `Report`

Contoh properti penting untuk `Transaction`:

- `id`
- `type`
- `amount`
- `currency`
- `description`
- `categoryId`
- `accountId`
- `transactionDate`
- `createdAt`
- `updatedAt`

## Arah Desain UI

Karena project ini adalah dashboard finance, arah desain yang disarankan adalah:

- Fokus pada keterbacaan data.
- Layout padat namun tetap rapi.
- Navigasi sidebar untuk akses cepat antar modul.
- Kartu metrik untuk ringkasan angka penting.
- Tabel dengan filter dan sorting untuk transaksi.
- Chart yang sederhana, jelas, dan tidak dekoratif berlebihan.
- Dukungan responsive untuk desktop, tablet, dan mobile.
- Light/dark mode konsisten melalui token warna global.

## Prioritas Pengembangan

Prioritas awal yang disarankan:

1. Mengganti halaman starter di `app/page.tsx` menjadi dashboard shell.
2. Menambahkan layout aplikasi dengan sidebar dan header.
3. Membuat dummy data transaksi, akun, kategori, dan ringkasan metrik.
4. Membuat halaman dashboard overview dengan cards, chart, dan tabel transaksi terbaru.
5. Membuat halaman transactions dengan table, search, filter, dan pagination.
6. Mendefinisikan data model dan schema validasi menggunakan Zod.
7. Menentukan strategi data fetching dan state management.
8. Menyiapkan API route atau integrasi backend.
9. Menambahkan autentikasi jika aplikasi akan menyimpan data pengguna.
10. Melengkapi dokumentasi arsitektur, desain, quality, dan development.

## Risiko Dan Catatan

- Metadata aplikasi masih default dari Create Next App dan perlu disesuaikan.
- README masih berupa template shadcn/ui, belum mencerminkan project Finance Dashboard.
- File dokumentasi di `docs/` sudah tersedia tetapi mayoritas masih kosong.
- Alias di `components.json` masih menunjuk pola default `@/components`, sementara implementasi komponen berada di `shared/components/ui`.
- Belum ada backend, database, ataupun kontrak API.
- Belum ada test suite yang terlihat dari konfigurasi project saat ini.

## Perintah Development

```bash
pnpm lint
pnpm format
pnpm typecheck
```

## Kesimpulan

Project Finance Dashboard NextJS saat ini merupakan fondasi aplikasi dashboard modern yang sudah memiliki pilihan tech stack kuat untuk membangun produk finance. Komponen UI, theme system, styling, dan dependency utama sudah tersedia. Tahap berikutnya adalah mengubah starter page menjadi pengalaman dashboard yang nyata, mendefinisikan domain data finance, lalu membangun modul utama seperti overview, transactions, categories, accounts, budgets, dan reports.
