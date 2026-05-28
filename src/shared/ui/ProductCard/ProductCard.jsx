import styles from './ProductCard.module.css'

const formatMoney = (amount, currencyCode) => {
  const code = currencyCode || 'RUB'

  try {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    const n = Number(amount) || 0
    const suffix = code === 'RUB' ? ' ₽' : ` ${code}`
    return `${n.toLocaleString('ru-RU')}${suffix}`
  }
}

export function ProductCard({ product, badge }) {
  const name = product?.custom_name || product?.bank_name || '—'
  const amount = Number(product?.amount) || 0
  const formatted = formatMoney(amount, product?.currency_code)

  return (
    <div className={styles.root} role="group" aria-label={name}>
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <div className={styles.bottomRow}>
          <span className={styles.amountWrap}>
            <span className={styles.amount}>{formatted}</span>
            {badge ? <span className={styles.badge}>{badge}</span> : null}
          </span>
        </div>
      </div>

      <div className={styles.trailing} aria-hidden="true" />
    </div>
  )
}

