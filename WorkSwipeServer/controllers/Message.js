import Message from '../models/Message.js'
import Conversation from '../models/Conversation.js'
import { serverResponse } from '../utils/serverResponse.js'

// Send a new message
export const sendMessageController = async (req, res) => {
    try {
        const { receiverId, receiverType, message, conversationId, messageType } = req.body
        const { userId: senderId, role: senderType } = req.user

        // Validate required fields
        if (!receiverId || !receiverType || !message || !conversationId) {
            return serverResponse(res, 400, { message: "Missing required fields", data: null, success: false })
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            senderType,
            receiverId,
            receiverType,
            message,
            conversationId,
            messageType: messageType || 'text'
        })

        await newMessage.save()

        // Update conversation with last message
        await Conversation.findOneAndUpdate(
            { _id: conversationId },
            {
                'lastMessage.message': message,
                'lastMessage.timestamp': new Date(),
                'lastMessage.senderId': senderId
            }
        )

        // Populate sender info for response
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('senderId', 'name username')
            .populate('receiverId', 'name username')

        serverResponse(res, 201, { message: "Message sent successfully", data: populatedMessage, success: true })
    } catch (error) {
        console.error('Send message error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}

// Get messages for a conversation
export const getMessagesController = async (req, res) => {
    try {
        const { conversationId } = req.params
        const { page = 1, limit = 50 } = req.query

        const messages = await Message.find({ conversationId })
            .sort({ timestamp: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('senderId', 'name username')
            .populate('receiverId', 'name username')

        // Mark messages as read if user is the receiver
        const { userId } = req.user
        await Message.updateMany(
            { 
                conversationId, 
                receiverId: userId, 
                isRead: false 
            },
            { isRead: true }
        )

        serverResponse(res, 200, { message: "Messages retrieved successfully", data: messages.reverse(), success: true })
    } catch (error) {
        console.error('Get messages error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}

// Get or create conversation
export const getOrCreateConversationController = async (req, res) => {
    try {
        const { participantId, participantType, conversationType = 'support' } = req.body
        const { userId, role: userType } = req.user

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            $and: [
                { 'participants.userId': userId },
                { 'participants.userId': participantId },
                { conversationType }
            ]
        })

        if (!conversation) {
            // Create new conversation
            conversation = new Conversation({
                participants: [
                    { userId, userType },
                    { userId: participantId, userType: participantType }
                ],
                conversationType
            })

            // Generate support ticket ID for support conversations
            if (conversationType === 'support') {
                conversation.supportTicketId = `SUPPORT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            }

            await conversation.save()

            // Send welcome message for support conversations
            if (conversationType === 'support' && participantType === 'Admin') {
                const welcomeMessage = new Message({
                    senderId: participantId,
                    senderType: participantType,
                    receiverId: userId,
                    receiverType: userType,
                    message: "Hello! I'm here to help you with any questions about WorkSwipe. How can I assist you today?",
                    conversationId: conversation._id,
                    messageType: 'support'
                })
                await welcomeMessage.save()

                // Update conversation with welcome message
                conversation.lastMessage = {
                    message: welcomeMessage.message,
                    timestamp: welcomeMessage.timestamp,
                    senderId: participantId
                }
                await conversation.save()
            }
        }

        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants.userId', 'name username email')

        serverResponse(res, 200, { message: "Conversation retrieved successfully", data: populatedConversation, success: true })
    } catch (error) {
        console.error('Get/Create conversation error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}

// Get all conversations for a user
export const getUserConversationsController = async (req, res) => {
    try {
        const { userId } = req.user

        const conversations = await Conversation.find({
            'participants.userId': userId,
            isActive: true
        })
        .populate('participants.userId', 'name username email')
        .sort({ 'lastMessage.timestamp': -1 })

        serverResponse(res, 200, { message: "Conversations retrieved successfully", data: conversations, success: true })
    } catch (error) {
        console.error('Get conversations error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}

// Mark conversation as inactive (soft delete)
export const closeConversationController = async (req, res) => {
    try {
        const { conversationId } = req.params
        const { userId } = req.user

        // Verify user is participant in conversation
        const conversation = await Conversation.findOne({
            _id: conversationId,
            'participants.userId': userId
        })

        if (!conversation) {
            return serverResponse(res, 404, { message: "Conversation not found", data: null, success: false })
        }

        await Conversation.findByIdAndUpdate(conversationId, { isActive: false })

        serverResponse(res, 200, { message: "Conversation closed successfully", data: null, success: true })
    } catch (error) {
        console.error('Close conversation error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}

// Get unread message count
export const getUnreadCountController = async (req, res) => {
    try {
        const { userId } = req.user

        const unreadCount = await Message.countDocuments({
            receiverId: userId,
            isRead: false
        })

        serverResponse(res, 200, { message: "Unread count retrieved successfully", data: { unreadCount }, success: true })
    } catch (error) {
        console.error('Get unread count error:', error)
        serverResponse(res, 500, { message: "Internal server error", data: null, success: false })
    }
}