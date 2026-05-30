# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано недавно

### Global Action Menu (кнопка «+» в BottomNav)
- [x] **Инфраструктура** — `useActionMenuStore`, `ActionMenu` в `AppShell` (портал), открытие из BottomNav
- [x] **UI по Figma** (`1033:8` / `817:1524`) — frosted-glass карточка 354px, иконка + текст, разделитель `#DBDBDB`
- [x] **Route-aware конфиг** — `actionMenuRouteMap.js` + `actionMenuPresets.js` (разные preset по pathname)
- [x] **UX** — закрытие overlay / Escape / пункт; без затемнения всего экрана; hover строк (Apple-like) на desktop
- [x] **Иконки** — `src/assets/icons/modal_menu/`
- [x] **Handlers** — `actionMenuHandlers.js` (заглушки, без бизнес-логики)

### Chat (`/chat`) и история (`/chat/history`)
- [x] **Chat** — шапка, сообщения из `chatMocks.js`, actions, quick questions, input TEMP
- [x] **Chat** — автопрокрутка ленты вниз при открытии и при изменении `messages` (`scrollTop` на `.messages`)
- [x] **Иконка отправки** — `icons_send_massage.svg` в Chat и `AiChatWidget` (логика send — TEMP)
- [x] **ChatHistory** — секции из моков, навигация
- [x] **BackButton** в шапках Chat и ChatHistory

### UI / страницы (последняя сессия)

### Transactions (`/transactions`) — редизайн по Figma `814:1087`
- [x] **Новая структура экрана** — карточка «Траты в этом месяце» (клик → `/transactions/stats`), donut «Уровень долговой нагрузки», кнопка «Спросить в чате», две info-строки (заглушки)
- [x] **DonutChartCard** — debt-вариант: `centerText`, `hideLegendAmounts`, `legendFooter`; проценты в легенде; pill «Уровень / Оптимальный»; моки 75/25 в `Transactions.jsx`
- [x] **Кнопка чата** — градиентная обводка `#5C03BC` → `#E536AB`, иконка `icon_arrow-up-right.svg`
- [x] Старый список транзакций / платежей / фильтры на `/transactions` убраны (данные остаются в store для `/transactions/stats`)

### Ранее (UI)
- [x] **GlassSelect** — кастомный select (валюта, банк) в ProductEdit; портал, glass-стиль по Figma
- [x] **Home** — без вертикального скролла страницы (`overflow: hidden`, `contentNoScroll` в AppShell на `/`)

### Ранее
- [x] ProductEdit, Accounts, иконки банков, TEMP client-side CRUD
- [x] Home, Transactions, TransactionStats, AppShell, auth/products API

## В процессе
- [ ] **Разные наполнения меню по экранам** — архитектура готова; финальные пункты после согласования с дизайном
- [ ] **Mapper продуктов** — формат `GET /api/products/` vs поля UI
- [ ] **Backend CRUD продуктов** — заменить TEMP save/delete

## Осталось (до хакатона)
- [ ] Реальные `actionKey` → навигация / API (новая трата, выписка, цель, …)
- [ ] Реальная отправка сообщений и AI в Chat
- [ ] Фильтры (`/transactions/filter`), тег (`/transactions/tags/:tagId`)
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

## Ключевые сущности (action menu)
- **Store:** `useActionMenuStore` — `isOpen`, `open`, `close`
- **UI:** `src/components/ActionMenu/`
- **Конфиг:** `src/lib/actionMenu/actionMenuPresets.js`, `actionMenuRouteMap.js`
- **Handlers:** `src/lib/actionMenu/actionMenuHandlers.js` (заглушки)

## Роутинг
- С BottomNav: `/`, `/transactions`, `/settings` (+ action menu через «+»)
- Без BottomNav: `/accounts`, `/products/:id`, `/transactions/stats`, …, `/chat`, `/chat/history`, `/profile`
- `ActionMenu` монтируется в `AppShell` на всех layout; «+» только где есть BottomNav

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ + action menu |
| Transactions | `/transactions` | ✅ dashboard по Figma 814:1087; action menu через «+» |
| Settings | `/settings` | 🔶 заглушка + action menu |
| Accounts | `/accounts` | ✅ |
| ProductEdit | `/products/:id` | ✅ TEMP CRUD |
| TransactionStats | `/transactions/stats` | ✅ |
| Chat | `/chat` | ✅ UI, скролл вниз, иконка send |
| ChatHistory | `/chat/history` | ✅ UI + навигация |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Profile | `/profile` | 🔶 заглушка |

## Следующий этап
1. Action menu: финальные пункты по экранам + реальные handlers
2. Chat: отправка + backend/AI
3. Mapper products + backend CRUD
4. API транзакций/платежей
