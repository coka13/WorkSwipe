import { baseUrl } from '../utils/routes'

const CHAT_API_BASE = `${baseUrl}/api/message`

class ChatService {
  constructor() {
    this.token = localStorage.getItem('token')
  }

  updateToken() {
    this.token = localStorage.getItem('token')
  }

  getAuthHeaders() {
    this.updateToken()
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
  }

  // Get or create a conversation
  async getOrCreateConversation(participantId, participantType, conversationType = 'support') {
    try {
      const response = await fetch(`${CHAT_API_BASE}/conversation`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          participantId,
          participantType,
          conversationType
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get conversation')
      }

      return data.data
    } catch (error) {
      console.error('Error getting conversation:', error)
      throw error
    }
  }

  // Send a message
  async sendMessage(conversationId, receiverId, receiverType, message, messageType = 'text') {
    try {
      const response = await fetch(`${CHAT_API_BASE}/send`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          conversationId,
          receiverId,
          receiverType,
          message,
          messageType
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      return data.data
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  // Get messages for a conversation
  async getMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await fetch(`${CHAT_API_BASE}/conversation/${conversationId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get messages')
      }

      return data.data
    } catch (error) {
      console.error('Error getting messages:', error)
      throw error
    }
  }

  // Get all conversations for current user
  async getUserConversations() {
    try {
      const response = await fetch(`${CHAT_API_BASE}/conversations`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get conversations')
      }

      return data.data
    } catch (error) {
      console.error('Error getting conversations:', error)
      throw error
    }
  }

  // Get unread message count
  async getUnreadCount() {
    try {
      const response = await fetch(`${CHAT_API_BASE}/unread-count`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get unread count')
      }

      return data.data.unreadCount
    } catch (error) {
      console.error('Error getting unread count:', error)
      return 0
    }
  }

  // Close a conversation
  async closeConversation(conversationId) {
    try {
      const response = await fetch(`${CHAT_API_BASE}/conversation/${conversationId}/close`, {
        method: 'PUT',
        headers: this.getAuthHeaders()
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to close conversation')
      }

      return data.data
    } catch (error) {
      console.error('Error closing conversation:', error)
      throw error
    }
  }

  // Get admin user for support chat
  async getAdminUser() {
    try {
      // This assumes there's an endpoint to get an available admin
      // For now, we'll return a mock admin ID - you might want to implement
      // a more sophisticated admin assignment system
      return {
        _id: '507f1f77bcf86cd799439011', // Mock admin ID
        name: 'WorkSwipe Support',
        userType: 'Admin'
      }
    } catch (error) {
      console.error('Error getting admin user:', error)
      // Return fallback admin
      return {
        _id: '507f1f77bcf86cd799439011',
        name: 'WorkSwipe Support',
        userType: 'Admin'
      }
    }
  }

  // Poll for new messages (simple polling implementation)
  startPolling(conversationId, callback, interval = 5000) {
    const pollInterval = setInterval(async () => {
      try {
        const messages = await this.getMessages(conversationId)
        callback(messages)
      } catch (error) {
        console.error('Polling error:', error)
      }
    }, interval)

    return () => clearInterval(pollInterval)
  }
}

export default new ChatService()