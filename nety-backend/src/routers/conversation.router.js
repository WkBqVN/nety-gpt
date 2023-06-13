const express = require('express');
const conversationRouter = express.Router();

const { conversationToChatGPT, updateConversationToChatGPT, getConversationByUserId } = require('../controllers/conversation.controller');

conversationRouter.post('/chat',conversationToChatGPT)
conversationRouter.patch('/chat/:userId', updateConversationToChatGPT)
conversationRouter.get('/chat/:userId', getConversationByUserId)

module.exports = conversationRouter;