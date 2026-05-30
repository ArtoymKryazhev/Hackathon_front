import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'

import { ACTION_MENU_DIALOG_ID } from '../../lib/actionMenu/actionMenuConstants.js'
import { runActionMenuHandler } from '../../lib/actionMenu/actionMenuHandlers.js'
import { useActionMenuAnimation } from '../../lib/actionMenu/useActionMenuAnimation.js'
import { useActionMenuEffects } from '../../lib/actionMenu/useActionMenuEffects.js'
import { useActionMenuItems } from '../../lib/actionMenu/useActionMenuItems.js'
import { useActionMenuStore } from '../../stores/useActionMenuStore.js'

import { ActionMenuList } from './ActionMenuList.jsx'

import styles from './ActionMenu.module.css'

export { ACTION_MENU_DIALOG_ID } from '../../lib/actionMenu/actionMenuConstants.js'

export function ActionMenu() {
  const { pathname } = useLocation()
  const isOpen = useActionMenuStore((state) => state.isOpen)
  const close = useActionMenuStore((state) => state.close)

  const panelRef = useRef(null)
  const [isClosing, setIsClosing] = useState(false)
  const dialogTitleId = useId()

  const { isMounted, isVisible } = useActionMenuAnimation(isOpen)
  const displayItems = useActionMenuItems(isOpen, pathname, close)

  const handleClose = useCallback(() => {
    if (!isOpen || isClosing) return
    setIsClosing(true)
    close()
  }, [close, isClosing, isOpen])

  useActionMenuEffects(isOpen, handleClose)

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isVisible || !panelRef.current) return
    panelRef.current.focus({ preventScroll: true })
  }, [isVisible])

  const handleOverlayClick = () => {
    handleClose()
  }

  const handleItemSelect = (item) => {
    if (item.disabled || isClosing || !isVisible) return
    runActionMenuHandler(item.actionKey)
    handleClose()
  }

  if (!isMounted) {
    return null
  }

  const panelClassName = [styles.panel, isVisible ? styles.panelVisible : null]
    .filter(Boolean)
    .join(' ')

  const isInteractive = isVisible && !isClosing

  return createPortal(
    <div className={styles.root}>
      <button
        type="button"
        className={styles.overlay}
        aria-label="Закрыть меню"
        tabIndex={isInteractive ? 0 : -1}
        onClick={handleOverlayClick}
      />
      <div
        ref={panelRef}
        id={ACTION_MENU_DIALOG_ID}
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
      >
        <p id={dialogTitleId} className={styles.srOnly}>
          Быстрые действия
        </p>
        <ActionMenuList items={displayItems} isInteractive={isInteractive} onSelect={handleItemSelect} />
      </div>
    </div>,
    document.body,
  )
}
