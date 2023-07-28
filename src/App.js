
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Pusher from 'pusher-js';
import Sidebar from './components/Sidebar'
import axios from './axios'

function App() {

  const [messages,setMessages]=useState([])
  const [name,setName]=useState('')

  useEffect(()=>{
    axios.get('/messages/sync')
      .then(response=>{
        setMessages(response.data)
      })
  },[])


  useEffect(()=>{
    const pusher = new Pusher('2f97fad1caa7f16732ce', {
      cluster: 'ap2'
    });
    // here we are subscribing to the pusher channel from frontend so we know when there is change in channel
    const channel = pusher.subscribe('messages'); // here we will give the channel name same as we gave to the Pusher.trigger which is "messages"
    channel.bind('inserted', (newMessage)=> { // here we will give bind same as we gave to the Pusher.trigger which is "inserted" means when something is inserted
      setMessages([...messages,newMessage]) // [...messages] it is a spread operator which says keep all the current msgs and add newMessage to it .
    });

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }

  },[messages])

  useEffect(()=>{
    setName(prompt("enter your name")) 
  },[0])

  console.log(messages)

  return (
    <div className="app">
      <div className='app_body' >
        
        <Sidebar />
        <Chat messages={messages} name={name} />
      </div>
    </div>
  );
}

export default App;
