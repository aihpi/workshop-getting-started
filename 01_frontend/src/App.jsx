import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { useChats } from './hooks/useChats'
import { useLocalStorage } from './hooks/useLocalStorage'
import { checkHealth } from './lib/api'

export default function App() {
  const {
    chats,
    activeChatId,
    activeChat,
    createChat,
    selectChat,
    deleteChat,
    appendMessage,
    maybeAutoTitle,
  } = useChats()

  const [collapsed, setCollapsed] = useLocalStorage('kisz-sidebar-collapsed', false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const ok = await checkHealth()
      if (!cancelled) setIsConnected(ok)
    }
    run()
    const id = setInterval(run, 15000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        onNewChat={createChat}
        onSelect={selectChat}
        onDelete={deleteChat}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <ChatWindow
          activeChat={activeChat}
          isConnected={isConnected}
          appendMessage={appendMessage}
          maybeAutoTitle={maybeAutoTitle}
        />
      </main>
    </div>
  )
}
