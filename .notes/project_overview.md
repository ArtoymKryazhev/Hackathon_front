# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты, платежи, аналитика; редактирование продуктов; фильтры операций; глобальное action-menu по «+»; AI-чат Cash Ask (UI готов, бэкенд — позже).

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ + action menu |
| Банковские продукты | `/accounts` | ✅ |
| Редактирование продукта | `/products/:id` | ✅ TEMP save/delete |
| Транзакции (dashboard) | `/transactions` | ✅ Figma 814:1087 |
| Аналитика | `/transactions/stats` | ✅ donut + категории + фильтры |
| Категория транзакций | `/transactions/categories/:categoryKey` | ✅ Figma 1038:60 + фильтры |
| Фильтры операций | `/transactions/filter` | ✅ Figma 853:410 |
| Выбор дат | `/transactions/filter/date-picker` | ✅ Figma 853:457 |
| Чат Cash Ask | `/chat` | ✅ UI, моки |
| История чатов | `/chat/history` | ✅ UI |
| Тег / settings / profile | … | 🔶 заглушки |

## Стек
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` (demo-user), токены только в памяти
- **Products:** `GET /api/products/`; CRUD — пока на фронте (TEMP)

## Структура кода
- `src/pages/Transactions/` — `Transactions.jsx`, `Stats/`, `Category/`
- `src/pages/TransactionFilter/` — фильтры + date-picker
- `src/components/` — AppShell, BottomNav, ActionMenu
- `src/shared/ui/` — ProductCard, BackButton, GlassSelect, DonutChartCard, …
- `src/lib/utils/calcTransactionStats.js` — stats, категории, `applyTransactionFilters`
- `src/stores/` — auth, accounts, transactions, **useFilterStore**, useActionMenuStore

## Поток данных (транзакции + фильтры)
```
useTransactionsStore (моки)
  + useFilterStore (фильтры)
  → applyTransactionFilters (useMemo на странице)
  → calcTransactionStats (stats) / filterTransactionsByCategory (category)
  → CategorySummaryCard → /transactions/categories/:categoryKey
```

Подробный статус — `.notes/current_status.md`.
