import React, { useState } from 'react'
import { IconCircleChevronRight, IconLoader2 } from '@tabler/icons-react';
import ModalErrLogin from '../components/ModalErrLogin';
import axios from 'axios';

const BaseURL = "http://localhost:5000/users"
const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [interChatID, setInterChatID] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handClickJoin = () => {
    if (interChatID.trim().length !== 0) {
      sendLoginRequest(interChatID, test);
    } else {
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 5000);
    }
  }
  // test = (isLogin) => {
  //   console.log(isLogin)
  //   if (isLogin === true) {
  //     console.log("Login success")
  //     window.location.href = `/chat/${interChatID}`;
  //   } else {
  //     console.log("Login fail")
  //   }
  // }
  const handClickChat = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = '/chat/123456789';
    }, 1000);
  }
  return (
    <>
      <div className='Login'>
        {modalOpen && <ModalErrLogin />}
        <div className='Login_box'>
          {!isLoading &&
            <button className='Login_box_button' onClick={handClickChat}>
              <div>Start New Chat</div>
              <IconCircleChevronRight />
            </button>}
          {isLoading &&
            <button className='Login_box_button'>
              <div className='Login_box_button_icon'>
                <IconLoader2 />
              </div>
              <div>Loading...</div>
            </button>}
          <hr className='Login_box_hr' />
          <div className='Login_box_login'>
            <input type="text" placeholder='Enter User ID' onChange={e => setInterChatID(e.target.value)} />
            <button className='Login_box_login_button' onClick={handClickJoin}>Join</button>
          </div>
        </div>
      </div>
    </>

  )
}

async function sendLoginRequest(userId, callbackFunc) {
  let url = BaseURL + "/login";
  // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  let headers = {
    'Access-Control-Allow-Origin': '*',
  };
  axios.post(url, { userId: userId, }, { headers })
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        console.log("Login success")
        callbackFunc(userId)
      } else {
        console.log(response.message)
      }
    });
  // return false
}
function test(interChatID) {
  window.location.href = `/chat/${interChatID}`;
}
export default Login
