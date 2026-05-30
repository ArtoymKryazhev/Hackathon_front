# current_status.md

## Последнее обновление
30 мая 2026

## Что сделано (с последнего коммита `231d4dc`)

### Продукты: иконки, список, редактирование
- [x] **Иконки банков** — `src/lib/constants/bankIconMap.js`, SVG в `src/assets/icons/`
  - маппинг по `bank_name`; full-bleed для T-Bank, Ozon, Яндекс, Wildberries
  - отображение в `ProductCard` (Accounts)
- [x] **Моки продуктов** — все 11 банков; `account_number` у debit/credit карт для тестов
- [x] **Accounts** — карточки кликабельны → `/products/:id`
- [x] **ProductEdit** (`/products/:id`) — форма редактирования по Figma
  - предпросмотр (`ProductCard`, `interactive={false}`)
  - поля: имя, баланс, валюта + банк в одну строку, номер карты (только debit/credit)
  - заголовок через `productTypeTitleMap.js`
  - валидация `account_number` (4 цифры); credit_card — минус в amount на save/preview
- [x] **Временный client-side CRUD** — `saveProduct` / `deleteProduct` в `lib/api/products.js` + `lib/products/clientProductCrud.js` (TEMP/TODO до backend)
- [x] **`useAccountsStore`** — `updateProduct`, `removeProduct`

### Без изменений с `231d4dc`
- [x] API auth/products, AppShell bootstrap, Home, Transactions, TransactionStats, BottomNav

## В процессе
- [ ] **Mapper продуктов** — формат ответа `GET /api/products/` может не совпадать с полями моков (`product_type`, `amount`, `account_number`, …)
- [ ] **Backend CRUD продуктов** — заменить TEMP save/delete на PUT/PATCH и DELETE

## Осталось (до хакатона)
- [ ] Реальная логика фильтров (`/transactions/filter`)
- [ ] Контент страницы тега (`/transactions/tags/:tagId`)
- [ ] API: транзакции, платежи, теги
- [ ] Иконки сервисов в PaymentCard и TransactionItem
- [ ] Тонкие визуальные правки Home / Transactions (кэшбэк в списке)

## На хакатоне
- [ ] Полная интеграция с бэкендом (транзакции, платежи, теги, CRUD продуктов)
- [ ] Развитие чата
- [ ] Доп. экраны: цели/накопления/импорт — если успеем

## Известные проблемы
- ESLint warning в `ChipCarousel`, `AppShell` (exhaustive-deps)
- Доли на donut — визуальные (мин. сегмент), в легенде — фактические суммы
- В dev React StrictMode — двойной вызов `fetchUser` / `fetchProducts`
- `<select>` на ProductEdit — кастом только закрытое состояние; popup рисует ОС
- `fetchProducts` при успехе API пока не подменяет `products` в store (fallback моки при ошибке)

## Стек
React + Vite | JavaScript | CSS Modules | zustand | recharts | axios | react-router-dom

## Бэкенд (актуально)
- **Base URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` → `{ access_token, refresh_token, user }`
- **Refresh:** `POST /auth/refresh/`
- **Products:** `GET /api/products/` + Bearer (save/delete — пока только на фронте)

## Ключевые сущности
- **API:** `src/lib/api/` — auth, axiosInstance, products (+ TEMP save/delete)
- **Constants:** `bankIconMap`, `productTypeTitleMap`, `productEditOptions`, `productTypeMap`
- **Сторы:** `useAuthStore`, `useAccountsStore`, `useTransactionsStore`
- **Роутинг** (`App.jsx`):
  - С BottomNav: `/`, `/transactions`, `/settings`
  - Без BottomNav: `/accounts`, `/products/:id`, `/transactions/stats`, `/transactions/filter`, `/transactions/tags/:tagId`, `/chat`, `/profile`

## Состояние страниц
| Страница | Роут | Статус |
|----------|------|--------|
| Home | `/` | ✅ UI; продукты из store |
| Accounts | `/accounts` | ✅ UI; иконки банков; переход в редактирование |
| ProductEdit | `/products/:id` | ✅ форма + TEMP save/delete |
| Transactions | `/transactions` | ✅ моки |
| TransactionStats | `/transactions/stats` | ✅ UI + recharts |
| TransactionFilter | `/transactions/filter` | 🔶 заглушка |
| TransactionTag | `/transactions/tags/:tagId` | 🔶 заглушка |
| Settings, Chat, Profile | … | 🔶 заглушки |

## Следующий этап
1. **Mapper products** — ответ API → поля UI
2. **Backend CRUD продуктов** — вместо TEMP client-side
3. **Фильтры** — `/transactions/filter`
4. **API транзакций/платежей**
