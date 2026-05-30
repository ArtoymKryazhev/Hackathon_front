# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты, платежи, аналитика; редактирование продуктов; AI-чат Cash Ask (UI готов, бэкенд — позже).

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ |
| Банковские продукты | `/accounts` | ✅ |
| Редактирование продукта | `/products/:id` | ✅ TEMP save/delete |
| Транзакции и платежи | `/transactions` | ✅ моки |
| Аналитика | `/transactions/stats` | ✅ |
| Чат Cash Ask | `/chat` | ✅ UI, моки, локальный input |
| История чатов | `/chat/history` | ✅ UI, моки |
| Фильтры / тег / settings / profile | … | 🔶 заглушки |

## Стек
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` (demo-user), токены только в памяти
- **Products:** `GET /api/products/`; CRUD — пока на фронте (TEMP)

## Структура кода
- `src/pages/` — Chat/, ChatHistory/, ProductEdit/, …
- `src/shared/ui/` — ProductCard, AiChatWidget, BackButton, …
- `src/lib/mocks/` — bankProducts, chatMocks, …
- `src/stores/` — useAuthStore, useAccountsStore, useTransactionsStore

## Поток данных
```
AppShell → fetchUser → fetchProducts → Outlet

Chat: chatMocks + useState (TEMP) — без store и без API
Accounts → ProductEdit → TEMP save/delete → useAccountsStore
```

Подробный статус — `.notes/current_status.md`.
