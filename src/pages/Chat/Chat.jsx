import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import iconAdd from '../../assets/icons/icon-add.svg'
import iconCopy from '../../assets/icons/icon-copy.svg'
import iconDislike from '../../assets/icons/icon-dislike.svg'
import iconHackcashAi from '../../assets/icons/icon_hackcash_ai.svg'
import iconLike from '../../assets/icons/icon-like.svg'
import iconMenu from '../../assets/icons/icon-menu.svg'
import iconMicrophone from '../../assets/icons/icon_microphone.svg'
import iconSendWaves from '../../assets/icons/icon-send-waves.svg'
import iconShare from '../../assets/icons/icon-share.svg'
import { messages as initialMessages, quickQuestions } from '../../lib/mocks/chatMocks.js'
import { BackButton } from '../../shared/ui/BackButton/BackButton.jsx'

import styles from './Chat.module.css'

async function copyMessageText(text) {
  await navigator.clipboard.writeText(text)
}

async function shareMessageText(text) {
  if (navigator.share) {
    try {
      await navigator.share({ text })
      return
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
  }

  await copyMessageText(text)
}

function ChatMessage({ message, isActive, onToggleActive }) {
  const isUser = message.role === 'user'

  const handleCopy = () => {
    copyMessageText(message.text).catch(() => {})
  }

  const handleShare = () => {
    shareMessageText(message.text).catch(() => {})
  }

  const handleBubbleClick = () => {
    onToggleActive(message.id)
  }

  return (
    <li
      className={`${styles.messageRow} ${isUser ? styles.messageRowUser : styles.messageRowAi} ${isActive ? styles.messageRowActive : ''}`}
      data-message-id={message.id}
    >
      <div className={styles.messageInner}>
        {!isUser && (
          <div className={styles.aiAvatar} aria-hidden="true">
            <img className={styles.aiAvatarIcon} src={iconHackcashAi} alt="" />
          </div>
        )}

        <div className={styles.messageBody}>
          <button type="button" className={styles.bubble} onClick={handleBubbleClick}>
            {message.text}
          </button>

          <div className={styles.actions} aria-label="Действия с сообщением">
            <button type="button" className={styles.actionButton} aria-label="Нравится">
              <img className={styles.actionIcon} src={iconLike} alt="" aria-hidden="true" />
            </button>
            <button type="button" className={styles.actionButton} aria-label="Не нравится">
              <img className={styles.actionIcon} src={iconDislike} alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.actionButton}
              aria-label="Копировать"
              onClick={handleCopy}
            >
              <img className={styles.actionIcon} src={iconCopy} alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.actionButton}
              aria-label="Поделиться"
              onClick={handleShare}
            >
              <img className={styles.actionIcon} src={iconShare} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isUser && <div className={styles.userAvatar} aria-hidden="true" />}
      </div>
    </li>
  )
}

export function Chat() {
  const navigate = useNavigate()

  // TEMP / TODO: локальный state до подключения backend и AI-интеграции
  const [messages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [activeMessageId, setActiveMessageId] = useState(null)

  useEffect(() => {
    if (!activeMessageId) return undefined

    const handlePointerDown = (event) => {
      if (event.target.closest(`.${styles.bubble}`)) return
      if (event.target.closest(`.${styles.actions}`)) return
      setActiveMessageId(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [activeMessageId])

  const handleToggleMessage = (messageId) => {
    setActiveMessageId((current) => (current === messageId ? null : messageId))
  }

  const goToHistory = () => navigate('/chat/history')

  const handleQuickQuestion = (question) => {
    setInputValue(question)
  }

  // TEMP / TODO: отправка сообщения, вложения и голосовой режим
  const handleSend = () => {}

  const handleVoice = () => {}

  const handleAddAttachment = () => {}

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BackButton />
        <button
          type="button"
          className={styles.historyButton}
          aria-label="История чатов"
          onClick={goToHistory}
        >
          <img className={styles.historyIcon} src={iconMenu} alt="" aria-hidden="true" />
        </button>
        <div className={styles.brandPill} aria-hidden="true">
          Cash Ask
        </div>
      </header>

      <main className={styles.messages} aria-label="Сообщения чата">
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isActive={activeMessageId === message.id}
              onToggleActive={handleToggleMessage}
            />
          ))}
        </ul>

        <ul className={styles.quickList} aria-label="Быстрые вопросы">
          {quickQuestions.map((question) => (
            <li key={question} className={styles.quickItem}>
              <button
                type="button"
                className={styles.quickButton}
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.bottom}>
        <p className={styles.disclaimer}>Нейросеть может допускать ошибки</p>

        <div className={styles.inputBar} aria-label="Поле ввода сообщения">
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Добавить"
            onClick={handleAddAttachment}
          >
            <img className={styles.iconAdd} src={iconAdd} alt="" aria-hidden="true" />
          </button>

          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Спросите Cash Ask"
            aria-label="Спросите Cash Ask"
          />

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Микрофон"
            onClick={handleVoice}
          >
            <img className={styles.iconMic} src={iconMicrophone} alt="" aria-hidden="true" />
          </button>

          <button
            type="button"
            className={styles.sendButton}
            aria-label="Отправить"
            onClick={handleSend}
          >
            <img className={styles.iconSend} src={iconSendWaves} alt="" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  )
}
