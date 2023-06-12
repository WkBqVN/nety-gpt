const Conversation = require("../models/conversation.model");
const createError = require("http-errors");
const axios = require("axios");
const crypto = require("crypto");

const conversationToChatGPT = async (req, res, next) => {
  try {
    let { userId, messages: messages } = req.body;
    let conversation = {
      userId,
      messages: messages,
      timestamp: new Date(),
    };
    const savedConversation = await Conversation.create(conversation);
    const API_CHAT_GPT_URL = "https://api.openai.com/v1/chat/completions";
    if (!userId || !messages) {
      return res.status(400).json({
        error: "Invalid request. Please provide userID and message.",
      });
    }
    invokeAPIChatGPT(API_CHAT_GPT_URL, messages)
    res.json({ savedConversation });
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: " Error occurred during chat." });
    next(error);
  }
};

const invokeAPIChatGPT = async (urlEndpoint, messages) => {
  console.log("Prepare to call API chat GPT \n" + urlEndpoint);
  let headers = {
    'Authorization': 'Bearer ',
    'Content-Type': 'application/json'
  }
  // response is not used
  try {
    const response = await axios.post(
      urlEndpoint,
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.6,
      },
      { headers }
    ).then(res => {
      // console.log(res.data.choices[0].message.content);
      return res.data.choices[0].message.content
    });
  } catch (error) {
    console.log("ERROR:| call API chat GPT error: " + error);
    return error
  }
};

module.exports = {
  conversationToChatGPT,
};
