# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Пользователь видит баланс и продукты банка, траты за месяц, ближайшие платежи и историю операций; далее — теги, цели, импорт выписок.

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ UI по Figma |
| Банковские продукты | `/accounts` | ✅ UI по Figma |
| Транзакции и платежи | `/transactions` | ✅ UI по Figma |
| Аналитика транзакций | `/transactions/stats` | 🔶 заглушка |
| Фильтры операций | `/transactions/filter` | 🔶 заглушка |
| Чат (Cash Ask) | `/chat` | 🔶 заглушка |
| Задачи / настройки | `/settings` | 🔶 заглушка |
| Профиль | `/profile` | 🔶 заглушка |

Планируется позже: цели и накопления, импорт PDF/QR, полноценный AI-чат.

## Стек (frontend)
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts (аналитика — в планах), axios (интеграция — в планах).

## Структура кода (кратко)
- `src/pages/` — экраны
- `src/shared/ui/` — атомарные UI-компоненты
- `src/components/` — AppShell, BottomNav
- `src/stores/` — zustand (`useAccountsStore`, `useTransactionsStore`)
- `src/lib/mocks|utils|constants|hooks` — данные и вспомогательная логика

Подробный статус — в `.notes/current_status.md`.
