import React, { useState } from 'react'
import { IconCircleChevronRight, IconLoader2 } from '@tabler/icons-react';
// import ModalErrLogin from '../components/ModalErrLogin';
import axios from 'axios';

const BaseURL = "http://localhost:5000/users"
const Login = () => {
  const [isLoading, setLoading] = useState(false);
  //const [interChatID, setInterChatID] = useState('');
  //const [modalOpen, setModalOpen] = useState(false);

  const handClickChat = () => {
    setLoading(true);
    sendRegisterRequest();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  return (
    <>
      <div className='Login'>
        {/* {modalOpen && <ModalErrLogin />} */}
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
          {/* <hr className='Login_box_hr' />
          <div className='Login_box_login'>
            <input type="text" placeholder='Enter User ID' disabled />
            <button className='Login_box_login_button' disabled>Join</button>
          </div> */}
        </div>
      </div>
    </>

  )
}

async function sendRegisterRequest() {
  let url = BaseURL + "/register";
  let headers = {
    'Access-Control-Allow-Origin': '*',
  };
  let body = {
    userId: Math.floor(Math.random() * 10000) + Date.now()
  }
  axios.post(url, body , { headers })
    .then(response => {
      if (response.status === 200) {
        console.log("Login success")
        window.location.href = `/chat/${body.userId}`;
      } else {
        console.log(response.message)
      }
    });
}
export default Login
