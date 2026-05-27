import { Outlet } from 'react-router-dom'

import { BottomNav } from '../BottomNav/BottomNav.jsx'

import styles from './AppShell.module.css'

export function AppShell({ withBottomNav }) {
  return (
    <div className={styles.root}>
      <main className={withBottomNav ? styles.contentWithNav : styles.content}>
        <Outlet />
      </main>
      {withBottomNav ? <BottomNav /> : null}
    </div>
  )
}

