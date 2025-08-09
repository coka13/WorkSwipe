import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'participants.userType'
        },
        userType: {
            type: String,
            required: true,
            enum: ['JobSeeker', 'Admin', 'Employer']
        }
    }],
    conversationType: {
        type: String,
        enum: ['support', 'match', 'direct'],
        default: 'support'
    },
    lastMessage: {
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        senderId: mongoose.Schema.Types.ObjectId
    },
    isActive: {
        type: Boolean,
        default: true
    },
    supportTicketId: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
})

// Create compound index for participants
conversationSchema.index({ 'participants.userId': 1, 'participants.userType': 1 })
conversationSchema.index({ conversationType: 1, isActive: 1 })

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation