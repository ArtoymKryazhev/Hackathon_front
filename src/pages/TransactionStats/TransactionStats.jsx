import { BackButton } from '../../shared/ui/BackButton/BackButton.jsx'

import styles from './TransactionStats.module.css'

export function TransactionStats() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BackButton />
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>Аналитика транзакций</h1>
        <p className={styles.placeholder}>Скоро здесь будет подробная аналитика</p>
      </main>
    </div>
  )
}
