import iconFolder from '../../../assets/icons/icon_folder.svg'

import styles from './CategoryFolderCard.module.css'

export function CategoryFolderCard({ tag, color, onClick }) {
  const name = tag?.name ?? ''
  const tagId = tag?.id

  return (
    <button
      type="button"
      className={styles.root}
      onClick={onClick}
      aria-label={name}
      data-tag-id={tagId}
    >
      <span className={styles.iconWrap}>
        <img className={styles.folderIcon} src={iconFolder} alt="" aria-hidden="true" />
        <svg
          className={styles.colorDot}
          viewBox="-1 -1 14 14"
          width={12}
          height={12}
          aria-hidden="true"
        >
          <circle cx="6" cy="6" r="6" fill={color} />
        </svg>
      </span>
      <span className={styles.label}>{name}</span>
    </button>
  )
}
