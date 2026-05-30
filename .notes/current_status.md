# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано недавно

### Chat (`/chat`) и история (`/chat/history`)
- [x] **Chat** — шапка (BackButton, история, Cash Ask), список сообщений из `chatMocks.js`
  - пузыри user/AI, hover-actions (like/dislike/copy/share), copy + share работают
  - tap-to-fix на touch, hover на desktop (`activeMessageId`)
  - quick questions в скролле чата → подстановка в input
  - input-панель (controlled), TEMP send/voice/attachments
- [x] **ChatHistory** — секции «Проекты» / «Недавние», моки, «Новый чат» → `/chat`, «Выйти из чата» → `/`
- [x] **BackButton** в шапках Chat и ChatHistory
- [x] **Моки** — `src/lib/mocks/chatMocks.js` (messages, quickQuestions, chatHistory)

### Ранее (ProductEdit, Accounts, …)
- [x] Иконки банков, ProductEdit, TEMP client-side CRUD продуктов
- [x] Home, Transactions, TransactionStats, AppShell, auth/products API

## В процессе
- [ ] **Mapper продуктов** — формат `GET /api/products/` vs поля UI
- [ ] **Backend CRUD продуктов** — заменить TEMP save/delete

## Осталось (до хакатона)
- [ ] Реальная отправка сообщений и AI-интеграция в Chat
- [ ] Открытие конкретного проекта/чата из ChatHistory
- [ ] Фильтры (`/transactions/filter`), тег (`/transactions/tags/:tagId`)
- [ ] API: транзакции, платежи, теги
- [ ] Иконки сервисов в PaymentCard и TransactionItem

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps)
- Chat: сообщения и input — локальный state (TEMP), не zustand
- `fetchProducts` при успехе API пока не подменяет `products` в store

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios | react-router-dom

## Бэкенд
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` | **Products:** `GET /api/products/` + Bearer

## Роутинг
- С BottomNav: `/`, `/transactions`, `/settings`
- Без BottomNav: `/accounts`, `/products/:id`, `/transactions/stats`, `/transactions/filter`, `/transactions/tags/:tagId`, `/chat`, `/chat/history`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ |
| Accounts | `/accounts` | ✅ |
| ProductEdit | `/products/:id` | ✅ TEMP CRUD |
| Transactions | `/transactions` | ✅ моки |
| TransactionStats | `/transactions/stats` | ✅ |
| Chat | `/chat` | ✅ UI + локальное поведение |
| ChatHistory | `/chat/history` | ✅ UI + навигация |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Settings, Profile | … | 🔶 заглушки |

## Следующий этап
1. Chat: отправка сообщений + backend/AI
2. Mapper products + backend CRUD
3. API транзакций/платежей
