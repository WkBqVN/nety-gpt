import React from 'react'

const ModalErrLogin = () => {
  return (
    <div className='ModalErrLogin'>
      <div className='ModalErrLogin_box'>
        <img width={24} height={24} src="/incorrect_icon.svg" alt="" />
        <div>Please enter a chat ID</div>
      </div>
    </div>
  )
}

export default ModalErrLogin
