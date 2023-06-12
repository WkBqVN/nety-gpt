const express = require('express');
const conversationRouter = express.Router();

const { conversationToChatGPT } = require('../controllers/conversation.controller');

conversationRouter.post('/chat',conversationToChatGPT)

module.exports = conversationRouter;