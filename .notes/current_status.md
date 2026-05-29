# current_status.md

## Последнее обновление
29 мая 2026

## Что сделано (с последнего коммита `2437a38`)

### API-слой и авторизация
- [x] **Vite dev proxy** → `https://cashapps.ru`
  - `/api/auth/*` — rewrite: срезает `/api` → `/auth/*` на бэке
  - `/api/*` (остальное) — без rewrite → `/api/*` на бэке
- [x] **`src/lib/api/auth.js`** — токены в module-level памяти (не localStorage, не zustand)
  - `getTokens()` → `POST /api/auth/access/` с `{}`
  - `refreshTokens()` → `POST /api/auth/refresh/` (отдельный `authClient` без интерцепторов)
  - поддержка ключей `access_token` / `access` в ответах
- [x] **`src/lib/api/axiosInstance.js`** — `apiClient` с Bearer и auto-refresh при `"Access token expired"`
- [x] **`src/stores/useAuthStore.js`** — `fetchUser()`, `clearUser()`; `user` из ответа логина (без `get_user_profile`)
- [x] **`src/lib/api/products.js`** — `getProducts()` → `GET /api/products/` (Bearer обязателен)
- [x] **`useAccountsStore.fetchProducts()`** — один запрос при старте; при ошибке/пустом ответе — fallback на моки
- [x] **`AppShell`** — цепочка `fetchUser` → `fetchProducts` при монтировании; экраны загрузки/ошибки auth

### UI (без изменений с прошлого коммита)
- [x] Home, Accounts, Transactions, TransactionStats, BottomNav, shared/ui, моки транзакций

## В процессе
- [ ] **Mapper продуктов** — формат ответа `GET /api/products/` может не совпадать с полями моков (`product_type`, `amount`, …)
- [ ] Тонкие визуальные правки Home / Transactions (иконки сервисов, кэшбэк в списке)

## Осталось (до хакатона)
- [ ] Реальная логика фильтров (`/transactions/filter`)
- [ ] Контент страницы тега (`/transactions/tags/:tagId`) — список операций по tagId
- [ ] API: транзакции, платежи, теги (products — foundation готов)
- [ ] Иконки банков/сервисов в PaymentCard и TransactionItem

## На хакатоне
- [ ] Полная интеграция с бэкендом (транзакции, платежи, теги)
- [ ] Развитие чата (сохранение текста вопроса, реальная логика)
- [ ] Доп. экраны: цели/накопления/импорт (PDF/QR) — если успеем

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps) — не блокирует сборку
- Доли на donut — визуальные (мин. сегмент), в легенде — фактические суммы
- В dev React StrictMode — двойной вызов `fetchUser` / `fetchProducts`
- Refresh-ответ бэка: ключи `access`/`refresh` vs `access_token`/`refresh_token` — частично обработано через `??`
- `GET /auth/get_user_profile/` не используется (эндпоинт на бэке не задействован)

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | **axios** | react-router-dom

## Бэкенд (актуально)
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` → `{ access_token, refresh_token, user }`
- **Refresh:** `POST /auth/refresh/` → `{ access, refresh }` (или `access_token`, `refresh_token`)
- **Products:** `GET /api/products/` + `Authorization: Bearer <token>`

## Ключевые сущности
- **API:** `src/lib/api/` — `auth.js`, `axiosInstance.js`, `products.js`
- **Сторы:** `useAuthStore`, `useAccountsStore` (+ `fetchProducts`), `useTransactionsStore`
- **Старт приложения:** `AppShell` → auth → products → `<Outlet />`
- **Роутинг** (`src/App.jsx`):
  - С BottomNav: `/`, `/transactions`, `/settings`
  - Без BottomNav: `/accounts`, `/transactions/stats`, `/transactions/filter`, `/transactions/tags/:tagId`, `/chat`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ UI; продукты из store (API + fallback моки) |
| Accounts | `/accounts` | ✅ UI; продукты из store |
| Transactions | `/transactions` | ✅ моки |
| TransactionStats | `/transactions/stats` | ✅ UI + recharts |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Settings, Chat, Profile | … | 🔶 заглушки |

## Следующий этап
1. **Mapper products** — привести ответ API к полям UI (`product_type`, `amount`, …)
2. **Фильтры** — `/transactions/filter`
3. **API транзакций/платежей** — замена моков в `useTransactionsStore`
