import { useEffect, useRef, useState } from 'react'
import LogoHeader from './LogoHeader'
import { sendChat } from '../lib/api'

function TypingIndicator() {
  return (
    <div className="flex gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
    </div>
  )
}

export default function ChatWindow({
  activeChat,
  isConnected,
  appendMessage,
  maybeAutoTitle,
}) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const messages = activeChat?.messages ?? []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading || !activeChat) return

    const chatId = activeChat.id
    // History must be the messages BEFORE appending the new user message.
    const history = activeChat.messages
    appendMessage(chatId, { role: 'user', content: text })
    maybeAutoTitle(chatId, text)
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendChat(text, history)
      appendMessage(chatId, { role: 'assistant', content: response })
    } catch (error) {
      console.error('Error sending message:', error)
      appendMessage(chatId, {
        role: 'assistant',
        content:
          'Sorry, I encountered an error. Please make sure the backend is running and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <LogoHeader isConnected={isConnected} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-gray-100 px-4 py-3">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here… (Enter to send, Shift+Enter for newline)"
            disabled={isLoading || !isConnected}
            rows={1}
            className="max-h-40 min-h-[44px] flex-1 resize-y rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !isConnected || !input.trim()}
            className="flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isLoading ? 'Sending…' : 'Send'}
          </button>
        </div>
        {!isConnected && (
          <p className="mx-auto mt-2 max-w-3xl text-xs text-red-500">
            Backend disconnected — start the backend on port 8000 to chat.
          </p>
        )}
      </div>
    </div>
  )
}
