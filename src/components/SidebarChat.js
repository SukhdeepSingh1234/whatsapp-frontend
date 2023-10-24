import React from 'react'
import '../Styles/SidebarChat.css'
import { Avatar } from '@mui/material'

import { useContext} from 'react'
import { AccountContext  } from './Context'
import axios from '../axios'
function SidebarChat({user}) {

  const {setPerson,loggedId,latestmsg}=useContext(AccountContext)
  const getUser = async () =>{
    setPerson(user)// setting user detail on which the user has clicked to be shown on the chat side
    try {
      await axios.post("/convesation/add",{
        senderId:loggedId,
        receiverId:user._id
    }).then((response) => {
      console.log("conversation added successfully");
    });
    } catch (error) {
      console.log("error while calling /convesation/add",error.message)
    }
    
  }



  return (
    <div className='sidebarChat' onClick={()=> getUser()} >
      <Avatar src={user.image} />
      <div className='sidebarChat_info'>
        <h2>{user.name}</h2>
        <p>{latestmsg}</p>
      </div>
    </div>
  )
}

export default SidebarChat
