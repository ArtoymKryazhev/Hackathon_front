# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано недавно

### Action Menu — «Новая трата» (Figma `814:1013`, `1083:*`)
- [x] **Шаг 1** — сумма + категория; зелёная стрелка → шаг 2
- [x] **Шаг 2** — сетка 2×2: счёт / кешбэк / магазин (`GlassSelect compact`) / дата
- [x] **Date-picker** — `?from=newExpense`: одна дата, Back = сохранить; меню скрывается на время календаря; черновик в `useActionMenuStore.newExpenseDraft`
- [x] **Подтверждение** — `submitNewExpense.js`: списание `updateProduct` + транзакция в `useTransactionsStore` (TEMP, сессия)
- [x] **Экран «Успешно»** — Figma `1083:103`, авто-закрытие 3 сек; «Сохранить шаблон?» — заглушка
- [x] **«Новое поступление»** — сумма + счёт, `updateProduct` (без записи транзакции)

### TransactionFilter и date-picker
- [x] **`useFilterStore`** — категории, период, счета, операции
- [x] **`/transactions/filter`** — UI Figma `853:410`
- [x] **`/transactions/filter/date-picker`** — календарь Figma `853:457`; фильтры: 1–2 даты; expense-режим отдельно
- [x] **TransactionStats** / **TransactionCategory** — фильтры из `useFilterStore`

### Ранее (UI)
- [x] GlassSelect (+ `size="compact"`), Home, ProductEdit, Accounts, Chat, dashboard `814:1087`, TEMP CRUD, auth/products API

## В процессе
- [ ] **Action menu** — остальные пункты (`uploadStatement`, `createGoal`, …) + handlers
- [ ] **Новое поступление** — запись `income` в `useTransactionsStore`
- [ ] **TransactionCategory** — логика TEMP-чипов vs `useFilterStore`
- [ ] **Mapper продуктов** / **Backend CRUD продуктов**

## Осталось (до хакатона)
- [ ] API транзакций (persist после F5)
- [ ] Кешбэк в модели транзакции (поле в форме есть, в submit не пишется)
- [ ] Dashboard `/transactions` — читать store / monthlySpending
- [ ] Chat: отправка + backend/AI
- [ ] **TransactionTag** — заглушка
- [ ] Иконки сервисов в PaymentCard и TransactionItem

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps)
- Chat: локальный state (TEMP), не zustand
- `fetchProducts` при успехе API пока не подменяет `products` в store
- Траты из action menu — только в памяти; F5 сбрасывает моки
- TransactionCategory: чипы — визуальные TEMP

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios | react-router-dom

## Бэкенд
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` | **Products:** `GET /api/products/` + Bearer
- **Transactions:** нет API

## Роутинг
- С BottomNav: `/`, `/transactions`
- Без BottomNav: `/settings`, `/accounts`, `/products/:id`, `/transactions/stats`, `/transactions/categories/:categoryKey`, `/transactions/filter`, `/transactions/filter/date-picker`, `/transactions/tags/:tagId`, `/chat`, `/chat/history`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ + action menu |
| Transactions | `/transactions` | ✅ dashboard 814:1087 |
| TransactionStats | `/transactions/stats` | ✅ + фильтры |
| TransactionCategory | `/transactions/categories/:categoryKey` | ✅ + фильтры |
| TransactionFilter | `/transactions/filter` | ✅ Figma 853:410 |
| DatePickerPlaceholder | `/transactions/filter/date-picker` | ✅ + expense mode |
| Settings | `/settings` | 🔶 заглушка |
| Accounts | `/accounts` | ✅ |
| ProductEdit | `/products/:id` | ✅ TEMP CRUD |
| Chat | `/chat` | ✅ UI |
| ChatHistory | `/chat/history` | ✅ UI |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Profile | `/profile` | 🔶 заглушка |

## Следующий этап
1. API / persist транзакций; кешбэк в submit
2. Action menu: остальные пункты + income → transactions
3. Dashboard `/transactions` ← store
4. Chat + mapper products + backend CRUD
