import React from 'react'
import '../Styles/Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton,Avatar, Menu,MenuItem, Drawer,Box} from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import Profile from './Profile';
import { useState } from 'react';

function Sidebar({userImg,bio,name}) {

  const [openDrawer,setOpenDrawer]=useState(false)
  const [open, setOpen] = useState(false);
  const navigate= useNavigate()


  const handleClose=()=>{
    setOpen(false);
  }

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };
  const toggleDrawer = () => {
    
    setOpenDrawer(true);
    console.log("drawer opened")
  };
  const handleCloseDraw=()=>{
    setOpenDrawer(false)
  }

  const drawerStyle={
      left:72,
      top:42,
      height:'90%',
      width:'32%',
      boxShadow:'none'
  }
  const handleLogOut=()=>{
    localStorage.removeItem('authToken')
    navigate('/')
  }

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src={userImg} alt='dp' onClick={toggleDrawer} />
        <div className='sidebar_headerRight'>
            <IconButton>
             <DonutLargeIcon/>
            </IconButton>
            <IconButton>
             <ChatIcon/>
            </IconButton>
            <IconButton>
             <MoreVertIcon onClick={handleClick} />
             <Menu 
                anchorEl={open}
                open={open}
                keepMounted
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
               
             >
              <MenuItem onClick={handleLogOut}>Log out</MenuItem>
             </Menu>
            </IconButton>
        </div>
        <Drawer 
            open={openDrawer}
            onClose={handleCloseDraw}
            PaperProps={{sx: drawerStyle}}
         >
          <Box className="profile_header" >
                <ArrowBackIcon onClick={()=>setOpenDrawer(false)} />
                <p className="profile_header_p">Profile</p>
                
          </Box>
          <Box className="profile_content" >
              <Profile img={userImg} bio={bio} name={name}  />
          </Box>
         </Drawer>
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
