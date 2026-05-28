import { create } from 'zustand'

import { MOCK_MONTHLY_SPENDING } from '../lib/mocks/monthlySpending.js'
import { MOCK_PAYMENTS } from '../lib/mocks/payments.js'
import { MOCK_TRANSACTIONS } from '../lib/mocks/transactions.js'
import { sortPaymentsByNearest } from '../lib/utils/paymentUtils.js'

const toDateKey = (isoString) => {
  const d = new Date(isoString)
  if (Number.isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const groupTransactionsByDate = (transactions) => {
  const byDate = new Map()

  for (const tx of transactions) {
    const date = toDateKey(tx.operation_date)
    if (!date) continue

    if (!byDate.has(date)) byDate.set(date, [])
    byDate.get(date).push(tx)
  }

  return [...byDate.entries()]
    .map(([date, items]) => ({
      date,
      items: items.sort(
        (a, b) => new Date(b.operation_date) - new Date(a.operation_date),
      ),
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const useTransactionsStore = create((set, get) => ({
  monthlySpending: MOCK_MONTHLY_SPENDING,
  payments: MOCK_PAYMENTS,
  transactions: MOCK_TRANSACTIONS,

  setMonthlySpending: (data) => {
    set({ monthlySpending: data })
  },

  setPayments: (items) => {
    set({ payments: items })
  },

  setTransactions: (items) => {
    set({ transactions: items })
  },

  sortedPayments: () => {
    const { payments } = get()
    return sortPaymentsByNearest(payments)
  },

  groupedTransactions: () => {
    const { transactions } = get()
    return groupTransactionsByDate(transactions)
  },
}))
