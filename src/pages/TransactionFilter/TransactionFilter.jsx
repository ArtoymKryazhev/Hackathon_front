import { BackButton } from '../../shared/ui/BackButton/BackButton.jsx'

import styles from './TransactionFilter.module.css'

export function TransactionFilter() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BackButton />
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>Фильтры</h1>
        <p className={styles.placeholder}>Скоро здесь появятся фильтры операций</p>
      </main>
    </div>
  )
}
