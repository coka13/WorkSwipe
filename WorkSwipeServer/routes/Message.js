import express from "express"
const router = express.Router()

import { 
    sendMessageController, 
    getMessagesController, 
    getOrCreateConversationController,
    getUserConversationsController,
    closeConversationController,
    getUnreadCountController
} from "../controllers/Message.js"
import { verifyUser } from "../utils/verifyUser.js"

// Message routes
router.post('/send', verifyUser, sendMessageController)
router.get('/conversation/:conversationId', verifyUser, getMessagesController)
router.post('/conversation', verifyUser, getOrCreateConversationController)
router.get('/conversations', verifyUser, getUserConversationsController)
router.put('/conversation/:conversationId/close', verifyUser, closeConversationController)
router.get('/unread-count', verifyUser, getUnreadCountController)

export default router