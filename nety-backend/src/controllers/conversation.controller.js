const Conversation = require("../models/conversation.model");
const createError = require("http-errors");
const axios = require("axios");
const crypto = require("crypto");
const API_CHAT_GPT_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY_GPT = process.env.API_KEY_GPT;

const conversationToChatGPT = async (req, res, next) => {
  try {
    let { userId, messages: messages } = req.body;
    let conversation = {
      userId,
      messages: messages,
      timestamp: new Date(),
    };
    if (!userId || !messages) {
      return res.json({
        statusCode: 400,
        error: "Invalid request. Please provide userID and message.",
      });
    }
    //get reply from chat GPT
    const responseAssistant = await invokeAPIChatGPT(API_CHAT_GPT_URL, messages);
    // console.log(replyAssistantMsg);
    conversation.messages.push(responseAssistant);
    // console.log(conversation);
    const savedConversation = await Conversation.create(conversation);
    res.json({ savedConversation });
  } catch (error) {
    console.error("Error during chat:", error);
    res.json({
      statusCode: 500,
      error: " Error occurred during chat." 
    });
    next(error);
  }
};

const updateConversationToChatGPT = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.json({
        statusCode: 400,
        error: "Invalid request. Please provide userID",
      });
    }
    const currentConversation = await Conversation.findOne({ userId });
    if(!currentConversation) {
      return res.json({
        statusCode: 404,
        error: 'Conversation is not exits'
      })
    }
    // console.log(JSON.stringify(currentConversation));
    let { messages } = req.body;
    //get reply from chat GP
    const responseAssistant = await invokeAPIChatGPT(API_CHAT_GPT_URL, messages);
    messages.push(responseAssistant);
    //loop messages and add new conversation into current conversation
    messages.forEach(element => {
      currentConversation.messages.push(element);
    });
    currentConversation.timestamp = new Date();

    const updatedConversation = await Conversation.findOneAndUpdate({userId}, currentConversation, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ updatedConversation });
  } catch (error) {
    console.error("Error during chat:", error);
    res.json({ 
      statusCode: 500,
      error: " Error occurred during chat." 
    });
    next(error);
  }
};

const getConversationByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.json({
        statusCode: 400,
        error: "Invalid request. Please provide userID",
      });
    }

    const conversation = await Conversation.findOne({ userId });
    // console.log(JSON.stringify(conversation));
    if(!conversation) {
      return res.json({
        statusCode: 404,
        error: 'Conversation is not exits'
      })
    }
    res.status(200).json({ conversation });
  } catch (error) {
    res.json({
      statusCode: 500,
      error, 
    })
    next(error);
  }
}

const invokeAPIChatGPT = async (urlEndpoint, messages) => {
  console.log("Prepare to call API chat GPT \n" + urlEndpoint);
  let headers = {
    "Authorization": `Bearer ${API_KEY_GPT}`,
    "Content-Type": "application/json",
  };
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
    );
    // console.log(response.data.choices[0].message.content);
    // return response.data.choices[0].message.content;
    let reply = response.data.choices[0].message;
    return reply;
  } catch (error) {
    console.log("ERROR:| call API chat GPT error: " + error);
    return error;
  }
};

module.exports = {
  conversationToChatGPT,
  updateConversationToChatGPT,
  getConversationByUserId
};
