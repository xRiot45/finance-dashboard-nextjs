# Development Tasks

Task disusun berdasarkan `03_FEATURE_MODULES.md`, dari MVP ke enterprise-ready.

## P0 - Foundation & MVP Core

- [x] Setup Feature-Based Architecture: `app`, `features`, `shared`.
- [x] Buat Landing Page untuk promosi project finance dashboard
- [x] Buat app shell: sidebar, header, mobile navigation.
- [x] Buat utilities: currency, date, percentage, status formatter.
- [x] Buat dummy data: workspace, accounts, categories, transactions, budgets.
- [x] Buat dashboard overview: metric cards, chart, recent transactions.
- [x] Buat transactions list: table, search, filter, pagination.
- [x] Buat transaction form: create, edit, detail, validation.

## P1 - Core Finance

- [x] Buat accounts module: list, create, edit, balance summary.
- [x] Buat categories module: list, create, edit, archive.
- [x] Hubungkan accounts/categories ke transaction form.
- [ ] Buat budgets module: budget list, usage, warning/exceeded state.
- [ ] Buat reports module: income, expense, cash flow, budget summary.
- [ ] Pastikan semua core page punya loading, empty, error state.

## P2 - Enterprise Foundation

- [ ] Buat auth pages: login, register, forgot password.
- [ ] Buat workspace module: switcher, members, workspace settings.
- [ ] Buat RBAC dasar: role, permission-aware navigation/action.
- [ ] Buat search/filter/saved view baseline.
- [ ] Buat import/export baseline untuk transactions dan reports.
- [ ] Buat settings pages: profile, workspace, notifications, security.

## P3 - Enterprise Control

- [ ] Buat approval workflow: queue, detail, approve, reject.
- [ ] Buat audit logs: list, detail, entity activity.
- [ ] Buat notifications: badge, list, read/unread, alerts.
- [ ] Tambahkan observability: error state, event tracking, logging plan.
- [ ] Tambahkan security baseline: authorization checks, data scoping, safe errors.

## Final Checks

- [ ] Responsive desktop, tablet, mobile.
- [ ] Dark mode rapi.
- [ ] Accessibility dasar terpenuhi.
- [ ] `pnpm lint`, `pnpm typecheck`.
