import { MOCK_TRANSACTIONS } from '../mocks/transactions.js'

/** Уникальные category_name из моков расходных операций. TEMP до backend. */
export function getExpenseCategories() {
  const names = new Set()

  for (const tx of MOCK_TRANSACTIONS) {
    if (tx.operation !== 'expense' || !tx.category_name) continue
    names.add(tx.category_name)
  }

  return [...names].sort((a, b) => a.localeCompare(b, 'ru'))
}
