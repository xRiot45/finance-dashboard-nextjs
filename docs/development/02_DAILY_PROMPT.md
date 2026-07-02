# Daily Development Prompt

Gunakan prompt ini setiap memulai sesi development Finance Dashboard NextJS.

```txt
Anda adalah coding agent untuk project Finance Dashboard NextJS.

Sebelum coding:
1. Baca `docs/development/00_TASKS.md`.
2. Baca `docs/development/01_DEVELOPMENT_PHASES.md`.
3. Pilih task paling atas yang belum selesai `[ ]` sesuai urutan prioritas.
4. Baca dokumen design dan architecture yang relevan sebelum implementasi.

Dokumen wajib diikuti:
- `docs/product/03_FEATURE_MODULES.md`
- `docs/architecture/00_ARCHITECTURE.md`
- `docs/architecture/01_FOLDER_STRUCTURE.md`
- `docs/architecture/02_ROUTING.md`
- `docs/architecture/03_STATE_MANAGEMENT.md`
- `docs/architecture/05_NAMING_CONVENTION.md`
- `docs/architecture/06_CODING_STANDARDS.md`
- `docs/design/00_DESIGN_SYSTEM.md`
- `docs/design/01_UI_GUIDELINES.md`
- `docs/design/06_COMPONENT_LIBRARY.md`
- `docs/layout/00_LAYOUT_SPECIFICATION.md`
- `docs/layout/01_SIDEBAR_SPECIFICATION.md`
- `docs/layout/02_HEADER_SPECIFICATION.md`

Aturan kerja:
1. Ikuti Feature-Based Architecture.
2. Folder `app/` hanya untuk routing dan route-level layout.
3. Semua implementasi fitur berada di folder `features`.
4. Gunakan Shadcn UI sebelum membuat custom component.
5. Gunakan Lucide icon untuk icon UI.
6. Gunakan Zustand hanya untuk global/client UI state yang tepat.
7. Gunakan TanStack Query untuk server state.
8. Gunakan TanStack Form atau local state untuk form state.
9. Gunakan URL query untuk filter, sorting, pagination, dan report period.
10. Semua UI harus punya loading, empty, error, responsive, dark mode, dan accessibility state.

Skills yang harus digunakan jika relevan:
- Gunakan skill `frontend-design` untuk memastikan UI terlihat modern, rapi, dan bernilai jual tinggi.
- Gunakan skill `shadcn` ketika membuat/menggunakan komponen Shadcn UI.
- Gunakan skill `vercel-react-best-practices` untuk menjaga React component, hooks, state, accessibility, dan performance.
- Gunakan skill `vercel-nextjs` jika menyentuh routing, App Router, Server Component, Client Component, atau data fetching NextJS.
- Gunakan skill `vercel-agent-browser` atau browser verification saat menjalankan dev server dan perlu cek tampilan UI.

Flow coding:
1. Jelaskan singkat task yang dipilih.
2. Baca file terkait sebelum edit.
3. Implementasikan task sampai selesai.
4. Jalankan validasi yang relevan:
   - `pnpm format`
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm build` jika menyentuh routing/build/config
5. Jika membuat UI, cek responsive, dark mode, accessibility, dan visual consistency.
6. Setelah task benar-benar selesai dan terverifikasi, update `docs/development/00_TASKS.md`:
   - ubah `- [ ] Nama task` menjadi `- [x] Nama task`
7. Jangan memberi tanda `x` jika task belum selesai atau belum diverifikasi.

Output akhir sesi:
- Ringkas task yang dikerjakan.
- Sebutkan file yang diubah.
- Sebutkan hasil validasi.
- Sebutkan task berikutnya yang direkomendasikan.
```

## Checklist Harian

- [ ] Sudah cek `00_TASKS.md`.
- [ ] Sudah pilih task prioritas teratas.
- [ ] Sudah cek design system.
- [ ] Sudah cek architecture terkait.
- [ ] Sudah gunakan skill yang relevan.
- [ ] Sudah implementasi sesuai coding standards.
- [ ] Sudah verifikasi hasil.
- [ ] Sudah update task menjadi `[x]` jika selesai.
