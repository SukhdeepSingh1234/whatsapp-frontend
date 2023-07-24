import React from 'react'
import '../Styles/Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton,Avatar } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src='https://wallpapercave.com/wp/wp5388908.jpg'/>
        <div className='sidebar_headerRight'>
            <IconButton>
             <DonutLargeIcon/>
            </IconButton>
            <IconButton>
             <ChatIcon/>
            </IconButton>
            <IconButton>
             <MoreVertIcon/>
            </IconButton>
        </div>
      </div>
      <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
                <SearchOutlined/>
                <input placeholder='Search or start new chat' type='text' />
            </div>
        </div>
        <div className='sidebar_chats' >
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>

        </div>
    </div>
  )
}

export default Sidebar
