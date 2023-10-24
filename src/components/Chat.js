import React, { useState ,useContext, useEffect, useRef} from 'react'
import '../Styles/Chat.css'
import { Avatar,IconButton } from '@mui/material'
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicIcon from '@mui/icons-material/Mic';
import axios from '../axios'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AccountContext  } from './Context'
import GetAppIcon from '@mui/icons-material/GetApp';
function Chat({name}) {

  const [text,setText]=useState('')
  // const currTime=new Date().toUTCString()
  const {person,loggedId,setLatestmsg}=useContext(AccountContext)
  const [conversation,setConversation]=useState({})
  const [messages,setMessages]=useState([])
  const [newMessageFlag,setNewMessageFlag]=useState(false)
  const [file,setFile]=useState()
  const [image,setImage]=useState("")
  const scrollRef=useRef()

  useEffect(()=>{
    try {
        axios.post("/conversation/sync",{
        senderId:loggedId,
        receiverId:person._id
    }).then((response) => {
      console.log("message sync done!",response.data);
      setConversation(response.data)
      console.log('conversation id sync done')
      setLatestmsg(response.data.message)
    });
    } catch (error) {
      console.log("error while calling /conversation/sync",error.message)
    }
   
  },[person._id])
  

  useEffect(() => {
    const data= async ()=>{
      if (conversation._id) {
        try {
          axios.get(`/messages/sync/${conversation._id}`).then((response) => {
                setMessages(response.data);
              });
        } catch (error) {
          console.log("error while calling /messages/sync", error.message);
        }
      }
    }
    data();
   
  }, [conversation._id,person._id,newMessageFlag]);

  const sendMessage= async(e)=>{
    e.preventDefault();
    let message={}
    if(!file){
      await axios.post('/messages/new',{
        conversationId:conversation._id,
        senderId:loggedId,
        receiverId:person._id,
        message:text,
        type:'text'
      }).then((response) => {
        console.log("message sent!",response)
      })
    }else{
      await axios.post('/messages/new',{
        conversationId:conversation._id,
        senderId:loggedId,
        receiverId:person._id,
        message:image,
        type:'file'
      }).then((response) => {
        console.log("message sent!",response)
      })
    }
    setText('')
    setFile('')
    setImage('')
    setNewMessageFlag(prev =>!prev)
      
  }
  const FormatDate=(date) =>{
      const hours = new Date(date).getHours();
      const minutes = new Date(date).getMinutes();
      return `${hours < 10 ? '0'+ hours : hours} : ${minutes < 10 ? '0'+ minutes : minutes}`
  }

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          let response = await axios.post("/file/upload", data); // Use "await" here to ensure the request completes before setting the state
          console.log(response)
          setImage(response.data)
          console.log(image)
        } catch (error) {
          console.log("error while calling upload file api", error.message);
        }
      }
    }
    getImage(); // Run the function once when the component mounts
  
  }, [file]);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({transition:'smooth'})
  },[messages])
  
  const onFileChange=(e)=>{
    e.preventDefault();
    setFile(e.target.files[0])
    setText(e.target.files[0].name)
  }

  const TextMessage=({message})=>{
    return(
      <>
      <p className={`chat_message chat_sent`}>
                <span className='chat_name'>{message.name}</span>
                {message.message}
                <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
              </p>
      </>
    )
  }
  const pdfimg="https://t3.ftcdn.net/jpg/05/11/25/36/360_F_511253627_zuzpapnIVQueMx4eSL1ilAoH61OBgj0C.jpg"
  const ImageMessage=({message})=>{
    console.log(message)
    return(
      <div >
        {
          message?.text?.include('.pdf')?
            <div>
              <img src={pdfimg} alt="pdf" style={{width:80,height:80}} />
              <p>{message.message}</p>
              <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
            </div>
            :
            <p className={`chat_message chat_sent`} >
              <img className='chat_imagesent' src={message.message} alt={message.message} />
              <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
            </p>
        }
        
      </div>
    )
  }


  return (
    <div className='chat'>
       
      <div className='chat_header'>
        <Avatar src={person.image} />
        <div className='chat_headerInfo'>
          <h3>{person.name}</h3>
          <p>{person.isOnline}</p>
        </div>
        <div className='chat_headerRight'>
            <IconButton>
              <SearchOutlined/>
            </IconButton>
            <IconButton>
              <MoreVert/>
            </IconButton>
        </div>
      </div>
      <div className='chat_body' ref={scrollRef} >
  {messages.map((message) => (
    loggedId === message.senderId ? (
      message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
    ) : (
      message.type === 'file' ?  <div >
        {
          message?.text?.include('.pdf')?
            <div>
              <img src={pdfimg} alt="pdf" style={{width:80,height:80}} />
              <p>{message.message}</p>
              <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
            </div>
            :
            <p className={`chat_message `} >
              <img className='chat_imagesent' src={message.message} alt={message.message} />
              <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
            </p>
        }
        
      </div>
       : 
      <p className={`chat_message`}>
                <span className='chat_name'>{message.name}</span>
                {message.message}
                <span className='chat_timestamp'>{FormatDate(message.createdAt)}</span>
      </p>
    )
  ))}
</div>
      <div className='chat_footer' >

           <EmojiEmotionsOutlinedIcon style={{ color: "gray",marginLeft: "6px" }}  />

            <label for="fileInput">
              <AttachFileIcon style={{ color: "gray" }}/>
            </label>
            <input type="file" id="fileInput" style={{display:'none'}} onChange={(e)=>onFileChange(e)} />

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
