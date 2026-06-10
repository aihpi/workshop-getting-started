function IconButton({ title, onClick, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
    >
      {children}
    </button>
  )
}

export default function Sidebar({
  chats,
  activeChatId,
  collapsed,
  onToggle,
  onNewChat,
  onSelect,
  onDelete,
}) {
  return (
    <aside
      className={`flex h-full flex-col border-r border-gray-200 bg-gray-50 text-gray-800 transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-64'
      }`}
    >
      {/* Top bar: collapse toggle */}
      <div className="flex items-center justify-between p-2">
        <IconButton
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggle}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </IconButton>
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-600">Chats</span>
        )}
      </div>

      {/* New chat */}
      <div className="px-2">
        <button
          onClick={onNewChat}
          title="New chat"
          className={`flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors ${
            collapsed ? 'w-9 justify-center px-0' : 'w-full'
          }`}
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {!collapsed && <span>New chat</span>}
        </button>
      </div>

      {/* Chat list */}
      <nav className="mt-3 flex-1 overflow-y-auto px-2 pb-3">
        {!collapsed &&
          chats.map((chat) => {
            const active = chat.id === activeChatId
            return (
              <div
                key={chat.id}
                onClick={() => onSelect(chat.id)}
                className={`group mb-1 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="truncate">{chat.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(chat.id)
                  }}
                  title="Delete chat"
                  className="ml-2 hidden shrink-0 text-gray-400 hover:text-red-600 group-hover:block"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )
          })}
      </nav>
    </aside>
  )
}
