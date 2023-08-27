import React from "react";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";
import axios from "../axios"; 
import "../Styles/Application.css"
function Application() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [userImg, setUserImg] = useState("");
  const authToken = localStorage.getItem("authToken");
  

  useEffect(() => {
    axios
      .post(
        '/getUserData',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
        }
      )
      .then((response) => {
        const { username, imageUrl } = response.data;
        setName(username)
        setUserImg(imageUrl)
        
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);


  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("2f97fad1caa7f16732ce", {
      cluster: "ap2",
    });
    // here we are subscribing to the pusher channel from frontend so we know when there is change in channel
    const channel = pusher.subscribe("messages"); // here we will give the channel name same as we gave to the Pusher.trigger which is "messages"
    channel.bind("inserted", (newMessage) => {
      // here we will give bind same as we gave to the Pusher.trigger which is "inserted" means when something is inserted
      setMessages([...messages, newMessage]); // [...messages] it is a spread operator which says keep all the current msgs and add newMessage to it .
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="application" >
      <div className="application_body" >
      <Sidebar userImg={userImg} />
      <Chat messages={messages} name={name} />
    </div>
    </div>
    
  );
}

export default Application;