import { MOCK_TRANSACTIONS } from '../mocks/transactions.js'

/** Примеры custom_service_name из моков. TEMP до backend. */
export function getExpenseServiceNameExamples() {
  const names = new Set()

  for (const tx of MOCK_TRANSACTIONS) {
    if (!tx.custom_service_name) continue
    names.add(tx.custom_service_name)
  }

  return [...names].sort((a, b) => a.localeCompare(b, 'ru'))
}
