# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано недавно

### TransactionCategory (`/transactions/categories/:categoryKey`) — Figma `1038:60`
- [x] **Новая страница** — `src/pages/Transactions/Category/TransactionCategory.jsx`
- [x] **Роут** — `App.jsx`, layout без BottomNav
- [x] **Hero** — gradient-карточка: pill «Назад» (`BackButton variant="card"`, белый `#FFF`, border `#E2E2E2`) + заголовок и сумма в одном ряду
- [x] **Данные** — фильтр по `category_name` через `filterTransactionsByCategory` + `operationType` из store; сумма `amount` в `useMemo`
- [x] **Список** — `TransactionItem` (иконка сервиса — заглушка)
- [x] **Чипы** — фильтр-иконка + «Счета и карты», «Даты» (dropdown TEMP), «Пополнения», «Переводы», «Всё»; горизонтальный скролл (`useDragScroll`), фильтр в одной карусели с чипами
- [x] **Навигация со stats** — `CategorySummaryCard` кликабелен → `getCategoryRoutePath(category_name)`

### TransactionStats (`/transactions/stats`) — упрощение
- [x] Убран блок «Категории» и `CategoryFolderCard` (папки по тегам)
- [x] Оставлены: donut, plan-карточка, секция «В этом месяце» с `CategorySummaryCard`
- [x] **DonutChartCard** — подправлены легенда (gap, точки 11px) и толщина сегментов

### Global Action Menu (кнопка «+» в BottomNav)
- [x] **Инфраструктура** — `useActionMenuStore`, `ActionMenu` в `AppShell` (портал), открытие из BottomNav
- [x] **UI по Figma** (`1033:8` / `817:1524`) — frosted-glass карточка 354px, иконка + текст, разделитель `#DBDBDB`
- [x] **Route-aware конфиг** — `actionMenuRouteMap.js` + `actionMenuPresets.js` (разные preset по pathname)
- [x] **UX** — закрытие overlay / Escape / пункт; без затемнения всего экрана; hover строк (Apple-like) на desktop
- [x] **Иконки** — `src/assets/icons/modal_menu/`
- [x] **Handlers** — `actionMenuHandlers.js` (заглушки, без бизнес-логики)

### Chat (`/chat`) и история (`/chat/history`)
- [x] **Chat** — шапка, сообщения из `chatMocks.js`, actions, quick questions, input TEMP
- [x] **Chat** — автопрокрутка ленты вниз при открытии и при изменении `messages`
- [x] **Иконка отправки** — `icons_send_massage.svg` в Chat и `AiChatWidget`
- [x] **ChatHistory** — секции из моков, навигация
- [x] **BackButton** в шапках Chat и ChatHistory

### Transactions (`/transactions`) — dashboard Figma `814:1087`
- [x] Карточка «Траты в этом месяце» → `/transactions/stats`; debt donut; «Спросить в чате»; info-строки (заглушки)

### Ранее (UI)
- [x] **GlassSelect**, **Home** без скролла страницы, ProductEdit, Accounts, TEMP CRUD, auth/products API

## В процессе
- [ ] **Разные наполнения меню по экранам** — архитектура готова; финальные пункты после согласования с дизайном
- [ ] **Mapper продуктов** — формат `GET /api/products/` vs поля UI
- [ ] **Backend CRUD продуктов** — заменить TEMP save/delete
- [ ] **TransactionCategory** — логика чипов-фильтров и dropdown «Даты»

## Осталось (до хакатона)
- [ ] Реальные `actionKey` → навигация / API
- [ ] Реальная отправка сообщений и AI в Chat
- [ ] **TransactionFilter** — UI + фильтры в store
- [ ] **TransactionTag** — заглушка (`/transactions/tags/:tagId`, теги из `MOCK_TAGS` — не путать с категориями транзакций)
- [ ] API: транзакции, платежи, теги
- [ ] Иконки сервисов в PaymentCard и TransactionItem

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps)
- Chat: сообщения и input — локальный state (TEMP), не zustand
- `fetchProducts` при успехе API пока не подменяет `products` в store
- Action menu: overlay прозрачный — фон страницы виден; scroll-lock body пока меню открыто

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios | react-router-dom

## Бэкенд
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` | **Products:** `GET /api/products/` + Bearer

## Роутинг
- С BottomNav: `/`, `/transactions`, `/settings` (+ action menu через «+»)
- Без BottomNav: `/accounts`, `/products/:id`, `/transactions/stats`, `/transactions/categories/:categoryKey`, `/transactions/filter`, `/transactions/tags/:tagId`, `/chat`, `/chat/history`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ + action menu |
| Transactions | `/transactions` | ✅ dashboard 814:1087 |
| TransactionStats | `/transactions/stats` | ✅ donut + «В этом месяце» → category |
| TransactionCategory | `/transactions/categories/:categoryKey` | ✅ UI, моки, чипы TEMP |
| Settings | `/settings` | 🔶 заглушка + action menu |
| Accounts | `/accounts` | ✅ |
| ProductEdit | `/products/:id` | ✅ TEMP CRUD |
| Chat | `/chat` | ✅ UI |
| ChatHistory | `/chat/history` | ✅ UI |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка (теги, не category_name) |
| Profile | `/profile` | 🔶 заглушка |

## Следующий этап
1. TransactionCategory: рабочие фильтры чипов + dropdown «Даты»
2. Action menu: финальные пункты + handlers
3. Chat: отправка + backend/AI
4. Mapper products + backend CRUD
5. API транзакций/платежей
