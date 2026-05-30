# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано недавно

### TransactionFilter и date-picker
- [x] **`useFilterStore`** — категории, период, счета, операции; отдельно от `useTransactionsStore`
- [x] **`/transactions/filter`** — UI по Figma `853:410`: категории, период, карты, операции, glass action bar
- [x] **`/transactions/filter/date-picker`** — календарь Figma `853:457`; 1–2 даты; Back = сохранить
- [x] **`applyTransactionFilters`** — `calcTransactionStats.js`; фильтрация через `useMemo` на страницах
- [x] **TransactionStats** / **TransactionCategory** — читают фильтры из `useFilterStore`
- [x] Период: `week` / `month` / `custom` (+ `customDateRange.from/to` как `YYYY-MM-DD`)

### TransactionCategory (`/transactions/categories/:categoryKey`) — Figma `1038:60`
- [x] Hero, список `TransactionItem`, чипы TEMP, навигация со stats

### TransactionStats (`/transactions/stats`)
- [x] Donut, plan-карточка, «В этом месяце» → category

### Global Action Menu, Chat, Transactions dashboard
- [x] Action menu infra; Chat UI; dashboard Figma `814:1087`

### Ранее (UI)
- [x] GlassSelect, Home, ProductEdit, Accounts, TEMP CRUD, auth/products API

## В процессе
- [ ] **Action menu** — финальные пункты по экранам + реальные handlers
- [ ] **TransactionCategory** — логика чипов-фильтров (локальных TEMP) vs `useFilterStore`
- [ ] **Mapper продуктов** — формат `GET /api/products/` vs поля UI
- [ ] **Backend CRUD продуктов** — заменить TEMP save/delete

## Осталось (до хакатона)
- [ ] Реальные `actionKey` → навигация / API
- [ ] Chat: отправка + backend/AI
- [ ] **TransactionTag** — заглушка (`/transactions/tags/:tagId`)
- [ ] API: транзакции, платежи, теги
- [ ] Иконки сервисов в PaymentCard и TransactionItem

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps)
- Chat: локальный state (TEMP), не zustand
- `fetchProducts` при успехе API пока не подменяет `products` в store
- Action menu: overlay прозрачный; scroll-lock body пока меню открыто
- TransactionCategory: чипы на странице — визуальные TEMP, не связаны с `useFilterStore`

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios | react-router-dom

## Бэкенд
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` | **Products:** `GET /api/products/` + Bearer

## Роутинг
- С BottomNav: `/`, `/transactions`, `/settings`
- Без BottomNav: `/accounts`, `/products/:id`, `/transactions/stats`, `/transactions/categories/:categoryKey`, `/transactions/filter`, `/transactions/filter/date-picker`, `/transactions/tags/:tagId`, `/chat`, `/chat/history`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ + action menu |
| Transactions | `/transactions` | ✅ dashboard 814:1087 |
| TransactionStats | `/transactions/stats` | ✅ + фильтры из useFilterStore |
| TransactionCategory | `/transactions/categories/:categoryKey` | ✅ + фильтры (без selectedCategories) |
| TransactionFilter | `/transactions/filter` | ✅ Figma 853:410 |
| DatePickerPlaceholder | `/transactions/filter/date-picker` | ✅ Figma 853:457 |
| Settings | `/settings` | 🔶 заглушка |
| Accounts | `/accounts` | ✅ |
| ProductEdit | `/products/:id` | ✅ TEMP CRUD |
| Chat | `/chat` | ✅ UI |
| ChatHistory | `/chat/history` | ✅ UI |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Profile | `/profile` | 🔶 заглушка |

## Следующий этап
1. Action menu: финальные пункты + handlers
2. TransactionCategory: связать или убрать TEMP-чипы
3. Chat: отправка + backend/AI
4. Mapper products + backend CRUD
5. API транзакций/платежей
