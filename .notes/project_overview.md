# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты, платежи, аналитика; редактирование продуктов; фильтры операций; глобальное action-menu по «+» (flow «Новая трата»); AI-чат Cash Ask (UI готов, бэкенд — позже).

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
| Выбор дат | `/transactions/filter/date-picker` | ✅ Figma 853:457 (+ режим `?from=newExpense`) |
| Чат Cash Ask | `/chat` | ✅ UI, моки |
| История чатов | `/chat/history` | ✅ UI |
| Settings / profile / tag | … | 🔶 заглушки |

## Action Menu — «Новая трата»
1. **Шаг 1** — сумма + категория (`GlassSelect`)
2. **Шаг 2** — счёт, кешбэк, магазин (`GlassSelect`), дата → календарь
3. **Успешно** — карточка Figma `1083:103`, таймер 3 сек, «Сохранить шаблон?» — заглушка

Сохранение (TEMP, только zustand в сессии): `submitNewExpense.js` — списание с продукта + запись в `useTransactionsStore`.

## Стек
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` (demo-user), токены только в памяти
- **Products:** `GET /api/products/`; CRUD — пока на фронте (TEMP)
- **Транзакции:** API нет; моки + локальное добавление из action menu

## Структура кода
- `src/pages/Transactions/` — `Transactions.jsx`, `Stats/`, `Category/`
- `src/pages/TransactionFilter/` — фильтры + date-picker
- `src/components/ActionMenu/` — список, формы, success
- `src/lib/actionMenu/` — presets, handlers, `submitNewExpense.js`
- `src/lib/utils/calcTransactionStats.js` — stats, категории, `applyTransactionFilters`
- `src/stores/` — auth, accounts, transactions, **useFilterStore**, **useActionMenuStore**

## Поток данных (транзакции + фильтры)
```
useTransactionsStore (моки + prepend из action menu)
  + useFilterStore (фильтры)
  → applyTransactionFilters (useMemo на странице)
  → calcTransactionStats (stats) / filterTransactionsByCategory (category)
  → CategorySummaryCard → /transactions/categories/:categoryKey
```

Подробный статус — `.notes/current_status.md`.
