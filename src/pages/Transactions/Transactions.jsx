import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import iconMenu from '../../assets/icons/icon-menu.svg'
import { useDragScroll } from '../../lib/hooks/useDragScroll.js'
import { SERVICE_COLOR_MAP } from '../../lib/constants/serviceColorMap.js'
import { getNextPaymentDate, sortPaymentsByNearest } from '../../lib/utils/paymentUtils.js'
import { formatTransactionGroupDate } from '../../lib/utils/formatters.js'
import {
  groupTransactionsByDate,
  useTransactionsStore,
} from '../../stores/useTransactionsStore.js'
import { Chip } from '../../shared/ui/Chip/Chip.jsx'
import { MonthlySpendingCard } from '../../shared/ui/MonthlySpendingCard/MonthlySpendingCard.jsx'
import { PaymentCard } from '../../shared/ui/PaymentCard/PaymentCard.jsx'
import { TransactionItem } from '../../shared/ui/TransactionItem/TransactionItem.jsx'

import styles from './Transactions.module.css'

export function Transactions() {
  const navigate = useNavigate()
  const { scrollerRef, isDragging, dragHandlers } = useDragScroll()

  const monthlySpending = useTransactionsStore((s) => s.monthlySpending)
  const payments = useTransactionsStore((s) => s.payments)
  const transactions = useTransactionsStore((s) => s.transactions)

  const sortedPayments = useMemo(() => sortPaymentsByNearest(payments), [payments])

  const groupedTransactions = useMemo(
    () => groupTransactionsByDate(transactions),
    [transactions],
  )

  return (
    <div className={styles.page}>
      <section className={styles.spendingSection} aria-label="Траты в этом месяце">
        <MonthlySpendingCard
          amount={monthlySpending.amount}
          currencyCode={monthlySpending.currency_code}
          onCalendarClick={() => navigate('/transactions/stats')}
        />
      </section>

      <section className={styles.paymentsSection} aria-label="Ближайшие платежи">
        <h2 className={styles.sectionTitle}>Ближайшие платежи</h2>

        <div
          ref={scrollerRef}
          className={[
            styles.paymentsScroller,
            isDragging ? styles.paymentsScrollerDragging : null,
          ]
            .filter(Boolean)
            .join(' ')}
          {...dragHandlers}
        >
          {sortedPayments.map((payment) => {
            const nextPaymentDate = getNextPaymentDate(
              payment.start_payment,
              payment.payment_interval_months,
            )
            const bgColor =
              SERVICE_COLOR_MAP[payment.service_name] || SERVICE_COLOR_MAP.default

            return (
              <PaymentCard
                key={payment.id}
                serviceName={payment.service_name}
                currencyCode={payment.currency_code}
                amount={payment.amount}
                customName={payment.custom_name}
                nextPaymentDate={nextPaymentDate}
                bgColor={bgColor}
                onMenuClick={() => {}}
              />
            )
          })}
        </div>
      </section>

      <section className={styles.actionsSection} aria-label="Действия">
        <Chip
          variant="pill"
          className={styles.actionChip}
          onClick={() => navigate('/transactions/filter')}
        >
          <span className={styles.actionChipInner}>
            <img className={styles.actionIcon} src={iconMenu} alt="" aria-hidden="true" />
            Фильтры
          </span>
        </Chip>
        <Chip
          variant="pill"
          className={styles.actionChipAnalytics}
          onClick={() => navigate('/transactions/stats')}
        >
          Аналитика
        </Chip>
      </section>

      <section className={styles.transactionsSection} aria-label="Список транзакций">
        {groupedTransactions.map((group) => (
          <div key={group.date} className={styles.transactionGroup}>
            <h3 className={styles.groupDate}>
              {formatTransactionGroupDate(`${group.date}T12:00:00.000Z`)}
            </h3>
            <div className={styles.transactionList}>
              {group.items.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  serviceName={tx.service_name}
                  customServiceName={tx.custom_service_name}
                  categoryName={tx.category_name}
                  currencyCode={tx.currency_code}
                  amount={tx.amount}
                  operation={tx.operation}
                  operationDate={tx.operation_date}
                  accountNumber={tx.account_number}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
