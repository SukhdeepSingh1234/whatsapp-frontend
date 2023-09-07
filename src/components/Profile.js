import { Avatar, Box, IconButton } from '@mui/material'
import React from 'react'
import "../Styles/Profile.css"
import ModeIcon from '@mui/icons-material/Mode';

function Profile({img,bio,name}) {
  return (
    <>
        <Box className="box_1" >
            <Avatar sx={{ width: 170, height: 170 }}  src={img} />
        </Box>
        <Box className="box_2" >
            <p>Your name</p>
            <div className='box2_content' >
                <h4>{name}</h4>
                <IconButton>
                    <ModeIcon/>
                </IconButton>
                

            </div>
        </Box>
        <Box className="box_3" >
            <div className='box3_content' >This is not your username or pin. This name will be visible to your WhatsApp contacts.</div>
        </Box>
        <Box className="box_4" >
            <p className='box4_p' >About</p>
            <div className='box4_content' >
                <p>{bio}</p>
                <IconButton>
                    <ModeIcon/>
                </IconButton>
            </div>
        </Box>
    </>
  )
}

export default Profile
