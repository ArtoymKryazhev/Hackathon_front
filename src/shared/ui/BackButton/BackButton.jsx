import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import styles from './BackButton.module.css'

export function BackButton({ onClick }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) return onClick()
    navigate(-1)
  }

  return (
    <button
      type="button"
      className={styles.root}
      aria-label="Назад"
      onClick={handleClick}
    >
      <ChevronLeft className={styles.icon} aria-hidden="true" />
    </button>
  )
}

