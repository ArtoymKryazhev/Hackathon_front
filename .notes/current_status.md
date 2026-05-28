# current_status.md

## Последнее обновление
28 мая 2026

## Что сделано
- [x] **Скелет React + Vite** (JavaScript) + базовые глобальные стили
- [x] **Роутинг** (react-router-dom) и раскладка через `AppShell`
- [x] **Home** по Figma (фрейм 814:1013): карусель категорий, блок баланса, заголовок, чат-виджет
- [x] **BottomNav** (фиксированный снизу): 3 пункта навигации с active-state + action-кнопка «+» (noop)
- [x] **Design tokens**: `src/styles/variables.css` (CSS-переменные) + базовые layout-токены
- [x] **shared/ui**: `Chip`, `ChipCarousel` (со sliding-индикатором и drag-scroll), `AiChatWidget`
- [x] **zustand store** для банковских продуктов: продукты/категории/баланс
- [x] **Моки и константы**: `product_type → category`, набор `bankProducts`
- [x] Линт и сборка проходят: `npm run lint`, `npm run build`

## В процессе
- [ ] Доработка и стабилизация UI Home (тонкие визуальные правки по Figma, если понадобятся)
- [ ] Подготовка структуры и UI для страницы 2 (Transactions & Payments)

## Осталось (до хакатона)
- [ ] Страница 2: **Транзакции и платежи** (основной следующий этап)
- [ ] Стор/моки для транзакций и ближайших платежей (отдельно от `useAccountsStore`)
- [ ] UI-слой для списка транзакций + фильтры (chip row / carousel)
- [ ] Графики (recharts) для аналитики — по мере появления данных/макета
- [ ] API слой (axios) — когда будет готов бэк/контракт

## На хакатоне
- [ ] Интеграция с бэком (axios): продукты, транзакции, платежи
- [ ] Развитие чата (сохранение текста вопроса, реальная логика)
- [ ] Доп. экраны: цели/накопления/импорт (PDF/QR) — если успеем

## Известные проблемы
- (пока нет критических; возможны мелкие визуальные правки по Figma)

## Стек
React + Vite | JavaScript | CSS Modules | zustand | axios | recharts | react-router-dom

## Ограничения
- Без TypeScript, Tailwind, Redux, React Query, Next.js

## Ключевые сущности (что уже есть в коде)
- **Роутинг**: `src/App.jsx`
  - С BottomNav: `/`, `/accounts`, `/transactions`, `/transactions/stats`, `/settings`
  - Без BottomNav: `/transactions/filter`, `/chat`, `/profile`
- **Layout**: `src/components/AppShell/AppShell.jsx` (рендерит `<Outlet />` и `BottomNav` при `withBottomNav`)
- **BottomNav**: `src/components/BottomNav/BottomNav.jsx`
  - Навигация: `/` (Меню), `/transactions` (Кошелёк), `/settings` (Задачи)
  - «+» — action-кнопка без навигации (noop)
  - Active-state определяется по `useLocation().pathname`
- **Design tokens**: `src/styles/variables.css` (цвета/типографика/радиусы/тени/spacing + `--bottom-nav-offset`, `--gradient-card`)
- **shared/ui**:
  - `src/shared/ui/Chip/*`
  - `src/shared/ui/ChipCarousel/*` (sliding pill-indicator + drag-scroll)
  - `src/shared/ui/AiChatWidget/*` (UI-заглушка, callbacks на переход)
- **Данные/логика**:
  - `src/stores/useAccountsStore.js` — продукты, выбранная категория, вычисление баланса
  - `src/lib/constants/productTypeMap.js` — маппинг `product_type → categoryId`
  - `src/lib/mocks/bankProducts.js` — мок-данные продуктов

## Состояние страниц
- **Home**: `src/pages/Home/Home.jsx` + `Home.module.css`
  - Работает карусель категорий (данные из `useAccountsStore`) и пересчёт баланса
  - Кнопка со стрелкой ведёт на `/accounts`
  - `AiChatWidget` ведёт на `/chat` (UI-заглушка)
- **Остальные страницы пока заглушки** (только `<h1>`):
  - `Accounts`, `Transactions`, `Settings`, `Chat`, `Profile`, `TransactionStats`, `TransactionFilter`

## Следующий этап (цель №2)
Реализовать **страницу транзакций и платежей** (роут уже есть: `src/pages/Transactions/Transactions.jsx`, сейчас заглушка).

Требования к странице 2 (план состава UI):
- Блок **трат в этом месяце**
- Блок **ближайших платежей**
- **Карусель/ряд фильтров**
- **Список транзакций**

Заготовки под этап 2, которые уже есть:
- Маршрут `/transactions` в `src/App.jsx`
- Страница-заглушка `src/pages/Transactions/Transactions.jsx`