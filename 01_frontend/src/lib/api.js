import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

// GET /health -> { status: "healthy" }
export async function checkHealth() {
  try {
    const { data } = await axios.get(`${backendUrl}/health`)
    return data.status === 'healthy'
  } catch (error) {
    console.error('Connection check failed:', error)
    return false
  }
}

// POST /chat { message, conversation_history } -> { response }
// conversationHistory must be the messages array BEFORE the new user message.
export async function sendChat(message, conversationHistory) {
  const { data } = await axios.post(`${backendUrl}/chat`, {
    message,
    conversation_history: conversationHistory,
  })
  return data.response
}
