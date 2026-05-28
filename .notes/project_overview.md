# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты за месяц, платежи, история операций, аналитика по категориям и тегам; далее — фильтры, чат, цели, импорт выписок.

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ UI по Figma |
| Банковские продукты | `/accounts` | ✅ UI по Figma |
| Транзакции и платежи | `/transactions` | ✅ UI по Figma |
| Аналитика транзакций | `/transactions/stats` | ✅ donut recharts, теги, сводка |
| Категория (тег) | `/transactions/tags/:tagId` | 🔶 заглушка |
| Фильтры операций | `/transactions/filter` | 🔶 заглушка |
| Чат (Cash Ask) | `/chat` | 🔶 заглушка |
| Задачи / настройки | `/settings` | 🔶 заглушка |
| Профиль | `/profile` | 🔶 заглушка |

Планируется: цели и накопления, импорт PDF/QR, полноценный AI-чат, API.

## Стек (frontend)
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, **recharts** (аналитика), axios (интеграция — в планах).

## Структура кода (кратко)
- `src/pages/` — экраны (`Transactions/Stats/`, `TransactionTag/`, …)
- `src/shared/ui/` — атомы (DonutChartCard, CategoryFolderCard, …)
- `src/components/` — AppShell, BottomNav
- `src/stores/` — zustand
- `src/lib/mocks|utils|constants|hooks` — данные и логика (`calcTransactionStats`, `tags`)

Подробный статус — в `.notes/current_status.md`.
