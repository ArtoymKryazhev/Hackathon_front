# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты за месяц, платежи, история операций, аналитика по категориям и тегам; далее — фильтры, чат, цели, импорт выписок.

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ UI; продукты через API (fallback моки) |
| Банковские продукты | `/accounts` | ✅ UI; продукты через API (fallback моки) |
| Транзакции и платежи | `/transactions` | ✅ UI по Figma (моки) |
| Аналитика транзакций | `/transactions/stats` | ✅ donut recharts, теги, сводка |
| Категория (тег) | `/transactions/tags/:tagId` | 🔶 заглушка |
| Фильтры операций | `/transactions/filter` | 🔶 заглушка |
| Чат (Cash Ask) | `/chat` | 🔶 заглушка |
| Задачи / настройки | `/settings` | 🔶 заглушка |
| Профиль | `/profile` | 🔶 заглушка |

Планируется: цели и накопления, импорт PDF/QR, полноценный AI-чат, API транзакций/платежей.

## Стек (frontend)
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, **axios**.

## Бэкенд
- **Prod / dev proxy target:** `https://cashapps.ru`
- **Авторизация (demo-user):** `POST /auth/access/` — без логина/пароля, один пользователь
- **Токены:** только в памяти (`auth.js`), не localStorage
- **Products:** `GET /api/products/` с Bearer-токеном

## Структура кода (кратко)
- `src/pages/` — экраны (`Transactions/Stats/`, `TransactionTag/`, …)
- `src/shared/ui/` — атомы (DonutChartCard, CategoryFolderCard, …)
- `src/components/` — AppShell (auth + products bootstrap), BottomNav
- `src/stores/` — zustand (`useAuthStore`, `useAccountsStore`, `useTransactionsStore`)
- `src/lib/api/` — axios: auth, apiClient, products
- `src/lib/mocks|utils|constants|hooks` — данные и логика (`calcTransactionStats`, `tags`)

## Поток данных при старте
```
AppShell mount
  → fetchUser()        POST /api/auth/access/
  → fetchProducts()    GET /api/products/
  → Home / Accounts читают useAccountsStore.products
```

Подробный статус — в `.notes/current_status.md`.
