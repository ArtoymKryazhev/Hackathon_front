# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты, платежи, аналитика; редактирование продуктов; глобальное action-menu по «+»; AI-чат Cash Ask (UI готов, бэкенд — позже).

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ + action menu |
| Банковские продукты | `/accounts` | ✅ |
| Редактирование продукта | `/products/:id` | ✅ TEMP save/delete |
| Транзакции (dashboard) | `/transactions` | ✅ Figma 814:1087 |
| Аналитика | `/transactions/stats` | ✅ donut + список категорий |
| Категория транзакций | `/transactions/categories/:categoryKey` | ✅ Figma 1038:60 |
| Чат Cash Ask | `/chat` | ✅ UI, моки |
| История чатов | `/chat/history` | ✅ UI |
| Фильтры / тег / settings / profile | … | 🔶 заглушки |

## Стек
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` (demo-user), токены только в памяти
- **Products:** `GET /api/products/`; CRUD — пока на фронте (TEMP)

## Структура кода
- `src/pages/Transactions/` — `Transactions.jsx`, `Stats/`, `Category/`
- `src/components/` — AppShell, BottomNav, ActionMenu
- `src/shared/ui/` — ProductCard, BackButton (`variant="card"`), GlassSelect, DonutChartCard, CategorySummaryCard, TransactionItem, …
- `src/lib/utils/calcTransactionStats.js` — stats, фильтр и URL категории
- `src/stores/` — auth, accounts, transactions, useActionMenuStore

## Поток данных (транзакции)
```
useTransactionsStore (моки)
  → calcTransactionStats (stats page)
  → CategorySummaryCard onClick → /transactions/categories/:categoryKey
  → filterTransactionsByCategory + TransactionItem
```

Подробный статус — `.notes/current_status.md`.
