# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты за месяц, платежи, история операций, аналитика по категориям и тегам; редактирование продуктов; далее — фильтры, чат, цели, импорт выписок.

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ UI; продукты из store (API + fallback моки) |
| Банковские продукты | `/accounts` | ✅ список с иконками банков; клик → редактирование |
| Редактирование продукта | `/products/:id` | ✅ форма, предпросмотр, TEMP save/delete |
| Транзакции и платежи | `/transactions` | ✅ UI по Figma (моки) |
| Аналитика транзакций | `/transactions/stats` | ✅ donut recharts, теги, сводка |
| Категория (тег) | `/transactions/tags/:tagId` | 🔶 заглушка |
| Фильтры операций | `/transactions/filter` | 🔶 заглушка |
| Чат (Cash Ask) | `/chat` | 🔶 заглушка |
| Задачи / настройки | `/settings` | 🔶 заглушка |
| Профиль | `/profile` | 🔶 заглушка |

Планируется: backend CRUD продуктов, API транзакций/платежей, полноценный AI-чат, цели и импорт PDF/QR.

## Стек (frontend)
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **Prod / dev proxy target:** `https://cashapps.ru`
- **Авторизация (demo-user):** `POST /auth/access/` — без логина/пароля
- **Токены:** только в памяти (`auth.js`), не localStorage
- **Products:** `GET /api/products/` с Bearer; save/delete — пока client-side (TEMP)

## Структура кода (кратко)
- `src/pages/` — экраны (`ProductEdit/`, `Transactions/Stats/`, …)
- `src/shared/ui/` — ProductCard, DonutChartCard, …
- `src/components/` — AppShell, BottomNav
- `src/stores/` — useAuthStore, useAccountsStore (+ update/remove product), useTransactionsStore
- `src/lib/api/` — auth, apiClient, products
- `src/lib/constants/` — bankIconMap, productTypeMap, productTypeTitleMap, …
- `src/lib/mocks|utils|hooks` — данные и логика

## Поток данных
```
AppShell → fetchUser → fetchProducts → Outlet

Accounts: useAccountsStore.products → ProductCard (иконка по bank_name)
  → /products/:id → ProductEdit → saveProduct (TEMP) → store
```

Подробный статус — в `.notes/current_status.md`.
