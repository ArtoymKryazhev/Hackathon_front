import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAccountsStore } from '../../stores/useAccountsStore.js'
import { useAuthStore } from '../../stores/useAuthStore.js'
import { ActionMenu } from '../ActionMenu/ActionMenu.jsx'
import { BottomNav } from '../BottomNav/BottomNav.jsx'

import styles from './AppShell.module.css'

export function AppShell({ withBottomNav }) {
  const fetchUser = useAuthStore((state) => state.fetchUser)
  const user = useAuthStore((state) => state.user)
  const authLoading = useAuthStore((state) => state.isLoading)
  const authError = useAuthStore((state) => state.error)

  const fetchProducts = useAccountsStore((state) => state.fetchProducts)
  const productsLoaded = useAccountsStore((state) => state.productsLoaded)

  useEffect(() => {
    let cancelled = false

    async function init() {
      await fetchUser()
      if (cancelled) return

      if (useAuthStore.getState().user) {
        await fetchProducts()
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])

  const mainClassName = withBottomNav ? styles.contentWithNav : styles.content

  const isAuthPending = authLoading || (!user && !authError)
  const isProductsPending = Boolean(user) && !productsLoaded
  const isLoading = isAuthPending || isProductsPending

  let mainContent
  if (authError) {
    mainContent = (
      <div className={styles.stateMessage}>
        Не удалось подключиться. Попробуйте позже.
      </div>
    )
  } else if (isLoading) {
    mainContent = <div className={styles.stateMessage}>Загрузка...</div>
  } else {
    mainContent = <Outlet />
  }

  return (
    <div className={styles.root}>
      <main className={mainClassName}>{mainContent}</main>
      <ActionMenu />
      {withBottomNav ? <BottomNav /> : null}
    </div>
  )
}
