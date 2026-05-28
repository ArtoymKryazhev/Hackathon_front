# current_status.md

## Последнее обновление
28 мая 2026

## Что сделано
- [x] **Скелет React + Vite** (JavaScript) + базовые глобальные стили
- [x] **Роутинг** (react-router-dom) и раскладка через `AppShell`
- [x] **Home** по Figma (814:1013): карусель категорий, блок баланса, заголовок, чат-виджет
- [x] **Accounts** по Figma (814:1381): общий баланс, секции продуктов, якорная навигация
- [x] **Transactions** по Figma (814:1087): траты за месяц, платежи, фильтры/аналитика, список транзакций
- [x] **TransactionStats** (`/transactions/stats`) по Figma: donut recharts, переключатель расходы/доходы, карусель тегов, блок «В этом месяце»
- [x] **DonutChartCard** + `calcTransactionStats`: группировка по категориям, мин. размер сегмента на графике (~5.5%), легенда с реальными суммами
- [x] **CategoryFolderCard** — кнопки → `/transactions/tags/:tagId`
- [x] **TransactionTag** — заглушка категории по id (под будущий API)
- [x] **BottomNav**, design tokens, **useDragScroll**
- [x] **shared/ui**: Chip, ChipCarousel, AiChatWidget, BackButton, ProductCard, MonthlySpendingCard, PaymentCard, TransactionItem, DonutChartCard, CategoryFolderCard, CategorySummaryCard
- [x] **zustand**: `useAccountsStore`, `useTransactionsStore` (+ `operationType`)
- [x] **Моки**: `bankProducts`, `payments`, `transactions`, `monthlySpending`, `tags`
- [x] Линт и сборка: `npm run lint`, `npm run build`

## В процессе
- [ ] Тонкие визуальные правки Home / Transactions (иконки сервисов, кэшбэк в списке)

## Осталось (до хакатона)
- [ ] Реальная логика фильтров (`/transactions/filter`)
- [ ] Контент страницы тега (`/transactions/tags/:tagId`) — список операций по tagId
- [ ] API слой (axios) — когда будет готов бэк/контракт
- [ ] Иконки банков/сервисов в PaymentCard и TransactionItem

## На хакатоне
- [ ] Интеграция с бэкендом (axios): продукты, транзакции, платежи, теги
- [ ] Развитие чата (сохранение текста вопроса, реальная логика)
- [ ] Доп. экраны: цели/накопления/импорт (PDF/QR) — если успеем

## Известные проблемы
- ESLint warning в `ChipCarousel` (exhaustive-deps) — не блокирует сборку
- Доли на donut — визуальные (мин. сегмент), в легенде — фактические суммы

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios (в планах) | react-router-dom

## Ограничения
- Без TypeScript, Tailwind, Redux, React Query, Next.js

## Ключевые сущности
- **Роутинг** (`src/App.jsx`):
  - С BottomNav: `/`, `/transactions`, `/settings`
  - Без BottomNav: `/accounts`, `/transactions/stats`, `/transactions/filter`, `/transactions/tags/:tagId`, `/chat`, `/profile`
- **Аналитика**: `src/pages/Transactions/Stats/TransactionStats.jsx`
- **Утилиты**: `calcTransactionStats.js` — `chartData`, `summaryData`, `applyMinimumChartSegmentPercents`
- **Стор**: `useTransactionsStore` — `operationType`, `setOperationType`; селекторы `sortedPayments()` / `groupedTransactions()` — не в подписке zustand, только `useMemo` на странице

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ |
| Accounts | `/accounts` | ✅ |
| Transactions | `/transactions` | ✅ |
| TransactionStats | `/transactions/stats` | ✅ UI + recharts |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Settings, Chat, Profile | … | 🔶 заглушки |

## Следующий этап
1. **Фильтры** — форма/чипы на `/transactions/filter`
2. **Тег** — операции по `tagId` после API
3. **API** — axios вместо моков
