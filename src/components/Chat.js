import React, { useState } from 'react'
import '../Styles/Chat.css'
import { Avatar,IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicIcon from '@mui/icons-material/Mic';


function Chat() {
  const [text,setText]=useState('')
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar/>
        <div className='chat_headerInfo'>
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className='chat_headerRight'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <AttachFile/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
        </div>
      </div>
      <div className='chat_body'>
          <p className='chat_message' >
            <span className='chat_name'>Sukhdeep</span>
            this is a message
            <span className='chat_timestamp' >{new Date().toUTCString()}</span>
          </p>
          <p className='chat_message chat_receiver' >
            <span className='chat_name'>Sukhdeep</span>
            this is a message
            <span className='chat_timestamp' >{new Date().toUTCString()}</span>
          </p>
          <p className='chat_message' >
            <span className='chat_name'>Sukhdeep</span>
            this is a message
            <span className='chat_timestamp' >{new Date().toUTCString()}</span>
          </p>
        
      </div>
      <div className='chat_footer' >
        <IconButton>
           <EmojiEmotionsOutlinedIcon style={{ color: "gray" }}  />
        </IconButton>
        <div className='chat_typemsg' >
          <input type="text" placeholder='Type a message' onChange={e=> setText(e.target.value)} name="msg" value={text} />
        </div>

        <IconButton>
            <MicIcon />
        </IconButton>
        
      </div>
    </div>
  )
}

export default Chat
