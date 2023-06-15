import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import "../lib/ApiProcess"
import axios from 'axios';

const BaseURL = "http://localhost:5000/conversation"
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

  const [firstMessage, setFirstMessage] = useState(true)
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Firt Message
  const handleSendFirstMessage = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (message.trim() === '') return;

    const inPut = {
      content: message,
      role: 'user',
    };

    setChats((prevMessages) => [...prevMessages, inPut]);
    setMessage('');

    let url = BaseURL + "/chat";
    let body = {
      userId: chatId,
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    }
    await axios.post(url, body).then(response =>{
      if (response.status === 200) {
        const data = response.data.savedConversation.messages;
        const answer = data[data.length - 1];
        const outPut = answer
        setChats((prevMessages) => [...prevMessages, outPut]);
        console.log("Login success")
        setIsLoading(false);
      } else {
        console.log(response.message)
      }
    })
    setFirstMessage(false);
  }

  //send more message
  const handleSendMoreMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (message.trim() === '') return;

    const inPut = {
      content: message,
      role: 'user',
    };
    setChats((prevMessages) => [...prevMessages, inPut]);
    setMessage('');
    let url = BaseURL + `/chat/${chatId}`;
    let body = {
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    }
    axios.patch(url, body).then(response =>{
      if (response.status === 200) {
        const data = response.data.updatedConversation.messages;
        const answer = data[data.length - 1];
        const outPut = answer
        setChats((prevMessages) => [...prevMessages, outPut]);
        console.log("Login success")
        setIsLoading(false);
      } else {
        console.log(response.message)
      }
    })
    setMessage('');
  }

  useEffect(() => {
    // get chat
    const fetchData = async () => {
      let body = {
        userId: chatId,
      }
      let url = BaseURL + `/chat/${chatId}`;
      axios.get(url, body).then(response =>{
        if (response.status === 200) {
          if(response.data.statusCode === 404) {
            console.log('dont have data')
          } else {
            const data = response.data.conversation.messages;
            setFirstMessage(false);
            setChats(data);
            console.log("Data success")
          }
        } else {
          console.log(response.message)
        }
      })
    };
    fetchData();
  }, [chatId]);

  //scroll to botom
  const chatContainerRef = useRef(null);
  useEffect(() => {
      // Scroll to the bottom when loading state changes and isLoading is false
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className='Chatbox'>
      <div className='Chatbox_head'>
        <button onClick={handClickNewChat}>New Chat</button>
        <div className='Chatbox_head_id'>
          <div>Chat ID</div>
          <input type="text" value={chatId} disabled />
        </div>
      </div>
      <div className='Chatbox_box'>
        <div className='Chatbox_box_content' >
          {chats.map((item, index) => {
            return (
              <div className={`Chatbox_box_content_${item.role}`} key={index}>
                <div className='Chatbox_box_content_message'>
                  {item.role === 'user' && <img width={36} height={36} src="/user-profile.svg" alt="" />}
                  {item.role === 'assistant' && <img width={34} height={34} src="/openai.svg" alt="" />}
                  <div className='Chatbox_box_content_text'>{item.content}</div>
                </div>
              </div>
            )
          })}
          {isLoading && 
          <div className='Chatbox_box_content_assistant'>
            <div className='Chatbox_box_content_message'>
              <img width={34} height={34} src="/openai.svg" alt="" />
              <div className='Chatbox_box_content_text'>
                Loading...
              </div>
            </div>
          </div>}
          <div ref={chatContainerRef}/>
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
          {
            firstMessage===true && 
            <button>
              <img width={24} height={24} src="/send-icon.svg" alt="send_message" onClick={handleSendFirstMessage} />
            </button>
          }
          {
            firstMessage===false && 
            <button>
              <img width={24} height={24} src="/send-icon.svg" alt="send_message" onClick={handleSendMoreMessage} />
            </button>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Chat
