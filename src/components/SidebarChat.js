import React from 'react'
import '../Styles/SidebarChat.css'
import { Avatar } from '@mui/material'
function SidebarChat() {
  return (
    <div className='sidebarChat' >
      <Avatar/>
      <div className='sidebarChat_info'>
        <h2>Room name</h2>
        <p>this was the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat
