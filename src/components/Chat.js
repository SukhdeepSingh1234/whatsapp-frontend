import React, { useState } from 'react'
import '../Styles/Chat.css'
import { Avatar,IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../axios'


function Chat({messages,name}) {

  const [text,setText]=useState('')
  const currTime=new Date().toUTCString()

  

  const sendMessage= async(e)=>{
    e.preventDefault();
    await axios.post('/messages/new',{
      message:text,
      name:name,
      timestamp:currTime,
      received:false
    })
    setText('')
      
  }
  
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
        {
          messages.map((message) =>(
            <p className={`chat_message ${message.received?'':'chat_receiver'}`} >
              <span className='chat_name'>{message.name}</span>
                {message.message} 
              <span className='chat_timestamp' >{message.timestamp}</span> {/*{new Date().toUTCString()} */}
            </p>
          ))
        }
 
      </div>
      <div className='chat_footer' >
        <IconButton>
           <EmojiEmotionsOutlinedIcon style={{ color: "gray" }}  />
        </IconButton>
        <div className='chat_typemsg' >
          <form>
            <input type="text" placeholder='Type a message' onChange={e=> setText(e.target.value)} name="msg" value={text} />
            <button type='submit' onClick={sendMessage} >send message</button>
          </form>
        </div>

        <IconButton>
            <MicIcon />
        </IconButton>
        
      </div>

    </div>
  )
}

export default Chat
