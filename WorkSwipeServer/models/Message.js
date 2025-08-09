import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderType'
    },
    senderType: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Admin', 'Employer']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverType'
    },
    receiverType: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Admin', 'Employer']
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    conversationId: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },
    messageType: {
        type: String,
        enum: ['text', 'system', 'support'],
        default: 'text'
    }
}, {
    timestamps: true
})

// Create indexes for better performance
messageSchema.index({ conversationId: 1, timestamp: -1 })
messageSchema.index({ senderId: 1, receiverId: 1 })

const Message = mongoose.model('Message', messageSchema)

export default Message