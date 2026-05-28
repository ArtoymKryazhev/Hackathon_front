# current_status.md

## Последнее обновление
28 мая 2026

## Что сделано
- [x] **Скелет React + Vite** (JavaScript) + базовые глобальные стили
- [x] **Роутинг** (react-router-dom) и раскладка через `AppShell`
- [x] **Home** по Figma (фрейм 814:1013): карусель категорий, блок баланса, заголовок, чат-виджет
- [x] **Accounts** по Figma (фрейм 814:1381): общий баланс, секции продуктов по категориям, якорная навигация
- [x] **Transactions** по Figma (фрейм 814:1087): траты за месяц, ближайшие платежи, действия, список транзакций
- [x] **BottomNav** (фиксированный снизу): 3 пункта навигации с active-state + action-кнопка «+» (noop)
- [x] **Design tokens**: `src/styles/variables.css` (CSS-переменные) + базовые layout-токены
- [x] **shared/ui**: `Chip`, `ChipCarousel`, `AiChatWidget`, `BackButton`, `ProductCard`, `MonthlySpendingCard`, `PaymentCard`, `TransactionItem`
- [x] **zustand**: `useAccountsStore` (продукты), `useTransactionsStore` (траты, платежи, транзакции)
- [x] **Моки и утилиты**: `bankProducts`, `payments`, `transactions`, `monthlySpending`; `paymentUtils`, `formatters`, `serviceColorMap`
- [x] **Хук** `useDragScroll` — перетаскивание горизонтальных каруселей (ChipCarousel, платежи)
- [x] **Заглушки с навигацией**: `TransactionStats`, `TransactionFilter` (BackButton + текст)
- [x] Линт и сборка проходят: `npm run lint`, `npm run build`

## В процессе
- [ ] Тонкие визуальные правки Transactions / Home по Figma (иконки сервисов, кэшбэк в списке)
- [ ] Страница аналитики (`/transactions/stats`) — графики recharts

## Осталось (до хакатона)
- [ ] Реальная логика фильтров (`/transactions/filter`)
- [ ] Графики (recharts) на экране аналитики
- [ ] API слой (axios) — когда будет готов бэк/контракт
- [ ] Иконки банков/сервисов в карточках платежей и транзакций

## На хакатоне
- [ ] Интеграция с бэкендом (axios): продукты, транзакции, платежи
- [ ] Развитие чата (сохранение текста вопроса, реальная логика)
- [ ] Доп. экраны: цели/накопления/импорт (PDF/QR) — если успеем

## Известные проблемы
- (пока нет критических; возможны мелкие визуальные правки по Figma)
- ESLint warning в `ChipCarousel` (exhaustive-deps для `useEffect`) — не блокирует сборку

## Стек
React + Vite | JavaScript | CSS Modules | zustand | axios | recharts | react-router-dom

## Ограничения
- Без TypeScript, Tailwind, Redux, React Query, Next.js

## Ключевые сущности (что уже есть в коде)
- **Роутинг**: `src/App.jsx`
  - С BottomNav: `/`, `/transactions`, `/settings`
  - Без BottomNav: `/accounts`, `/transactions/stats`, `/transactions/filter`, `/chat`, `/profile`
- **Layout**: `src/components/AppShell/AppShell.jsx`
- **BottomNav**: `/` (Меню), `/transactions` (Кошелёк), `/settings` (Задачи)
- **shared/ui** (дополнительно к Home/Accounts):
  - `MonthlySpendingCard` — блок «Траты в этом месяце», календарь → `/transactions/stats`
  - `PaymentCard` — карточка ближайшего платежа (цвет из `SERVICE_COLOR_MAP`)
  - `TransactionItem` — строка транзакции в списке
- **Данные/логика**:
  - `src/stores/useAccountsStore.js`
  - `src/stores/useTransactionsStore.js` — `monthlySpending`, `payments`, `transactions`; селекторы `sortedPayments()`, `groupedTransactions()`
  - `src/lib/mocks/` — `bankProducts`, `payments`, `transactions`, `monthlySpending`
  - `src/lib/utils/` — `paymentUtils`, `formatters`
  - `src/lib/constants/` — `productTypeMap`, `serviceColorMap`
  - `src/lib/hooks/useDragScroll.js`

## Состояние страниц
- **Home** — готово (см. выше)
- **Accounts** — готово (см. выше)
- **Transactions** — `src/pages/Transactions/Transactions.jsx`
  - `MonthlySpendingCard`, карусель `PaymentCard` (drag-scroll, snap `proximity`)
  - кнопки «Фильтры» / «Аналитика»
  - группы транзакций по дате (`formatTransactionGroupDate`)
- **TransactionStats** — заглушка: «Скоро здесь будет подробная аналитика»
- **TransactionFilter** — заглушка: «Скоро здесь появятся фильтры операций»
- **Заглушки** (только базовый UI): `Settings`, `Chat`, `Profile`

## Следующий этап
1. **Аналитика** — UI + recharts на `/transactions/stats`
2. **Фильтры** — форма/чипы на `/transactions/filter`
3. **API** — подключение axios вместо моков
