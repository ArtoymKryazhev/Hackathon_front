# FinHelper — обзор проекта

## Суть
Мобильный финансовый помощник (MVP, mobile-first). Баланс и продукты банка, траты, платежи, аналитика; редактирование продуктов; глобальное action-menu по «+»; AI-чат Cash Ask (UI готов, бэкенд — позже).

## Ключевые экраны (MVP)
| Экран | Роут | Статус |
|-------|------|--------|
| Home / меню | `/` | ✅ + action menu |
| Банковские продукты | `/accounts` | ✅ |
| Редактирование продукта | `/products/:id` | ✅ TEMP save/delete |
| Транзакции и платежи | `/transactions` | ✅ моки + action menu |
| Аналитика | `/transactions/stats` | ✅ |
| Чат Cash Ask | `/chat` | ✅ UI, моки, скролл вниз при открытии |
| История чатов | `/chat/history` | ✅ UI |
| Фильтры / тег / settings / profile | … | 🔶 заглушки |

## Стек
React + Vite, JavaScript, CSS Modules, zustand, react-router-dom, recharts, axios.

## Бэкенд
- **URL:** `https://cashapps.ru`
- **Auth:** `POST /auth/access/` (demo-user), токены только в памяти
- **Products:** `GET /api/products/`; CRUD — пока на фронте (TEMP)

## Структура кода
- `src/pages/` — экраны
- `src/components/` — AppShell, BottomNav, **ActionMenu**
- `src/shared/ui/` — ProductCard, BackButton, **GlassSelect**, AiChatWidget, TransactionItem, …
- `src/lib/actionMenu/` — presets, route map, handlers, hooks
- `src/stores/` — auth, accounts, transactions, **useActionMenuStore**
- `src/assets/icons/modal_menu/` — иконки пунктов action menu

## Поток данных
```
AppShell → fetchUser → fetchProducts → Outlet
         → ActionMenu (портал, zustand isOpen)

BottomNav «+» → useActionMenuStore.open()
ActionMenu → getActionMenuItems(pathname) → пункты → handlers (заглушки)

Accounts → ProductEdit → TEMP save/delete → useAccountsStore
Chat: chatMocks + useState (TEMP)
```

Подробный статус — `.notes/current_status.md`.
