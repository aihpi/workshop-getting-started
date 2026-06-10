import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const GREETING = {
  role: 'assistant',
  content:
    "Hello! I'm an AI assistant powered by Ollama running locally. Ask me anything!",
}

function newChat() {
  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `chat-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    title: 'New chat',
    messages: [GREETING],
    createdAt: Date.now(),
  }
}

// Manages the chat list + active chat, persisted to localStorage.
export function useChats() {
  const [chats, setChats] = useLocalStorage('kisz-chats', [])
  const [activeChatId, setActiveChatId] = useLocalStorage(
    'kisz-active-chat-id',
    null
  )

  // Ensure there is always at least one chat and a valid active id.
  useEffect(() => {
    if (chats.length === 0) {
      const chat = newChat()
      setChats([chat])
      setActiveChatId(chat.id)
    } else if (!chats.some((c) => c.id === activeChatId)) {
      setActiveChatId(chats[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, activeChatId])

  const activeChat = chats.find((c) => c.id === activeChatId) || null

  const createChat = useCallback(() => {
    const chat = newChat()
    setChats((prev) => [chat, ...prev])
    setActiveChatId(chat.id)
  }, [setChats, setActiveChatId])

  const selectChat = useCallback(
    (id) => setActiveChatId(id),
    [setActiveChatId]
  )

  const deleteChat = useCallback(
    (id) => {
      setChats((prev) => {
        const remaining = prev.filter((c) => c.id !== id)
        if (remaining.length === 0) {
          const chat = newChat()
          setActiveChatId(chat.id)
          return [chat]
        }
        if (id === activeChatId) setActiveChatId(remaining[0].id)
        return remaining
      })
    },
    [activeChatId, setChats, setActiveChatId]
  )

  const appendMessage = useCallback(
    (chatId, message) => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
        )
      )
    },
    [setChats]
  )

  const setChatMessages = useCallback(
    (chatId, messages) => {
      setChats((prev) =>
        prev.map((c) => (c.id === chatId ? { ...c, messages } : c))
      )
    },
    [setChats]
  )

  // Title an untitled chat from the first user message (~40 chars).
  const maybeAutoTitle = useCallback(
    (chatId, firstUserText) => {
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId || c.title !== 'New chat') return c
          const title =
            firstUserText.trim().slice(0, 40) +
            (firstUserText.trim().length > 40 ? '…' : '')
          return { ...c, title: title || 'New chat' }
        })
      )
    },
    [setChats]
  )

  return {
    chats,
    activeChatId,
    activeChat,
    createChat,
    selectChat,
    deleteChat,
    appendMessage,
    setChatMessages,
    maybeAutoTitle,
  }
}
