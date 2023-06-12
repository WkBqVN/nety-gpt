import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import "../lib/ApiProcess"

const Chat = () => {
  //get id
  const location = useLocation();
  const chatId = location.pathname.split("/")[2];

  // click btn new chat
  const handClickNewChat = () => {
    window.location.href = '/';
  }

  // resize height text area
  const [message, setMessage] = useState('');
  const textAreaRef = useRef(null);
  const resizeTextArea = () => {
    textAreaRef.current.style.height = "50px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };
  useEffect(resizeTextArea, [message]);
  let chat = {
    assistant: [],
    user: []
  }
  const handleSendMessage = (chat) => {
    sendObj = {
      
    }
  }
  return (
    <div className='Chatbox'>
      <div className='Chatbox_head'>
        <button onClick={handClickNewChat}>New Chat</button>
        <div className='Chatbox_head_id'>
          <div>Chat ID</div>
          <input type="text" value={chatId} disabled />
        </div>
      </div>
      <div className='Chatbox_chat'>
        <div className='Chatbox_chat_box'>
          <textarea
            ref={textAreaRef}
            value={message}
            placeholder='Send a message'
            onChange={e => setMessage(e.target.value)}
          />
          <button>
            <img width={24} height={24} src="/send-icon.svg" alt="send_message" onClick={handleSendMessage} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
