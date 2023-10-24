import React,{ useEffect, useState,useContext } from "react";
import { AccountContext } from "./Context";
import Chat from "./Chat";
import Pusher from "pusher-js";
import Sidebar from "./Sidebar";
import axios from "../axios";
import "../Styles/Application.css";
import EmptyChat from "./EmptyChat";
function Application() {
  // const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("offline");
  const [userImg, setUserImg] = useState("");
  const [bio,setBio]=useState("");
  const [id, setId] = useState("");
  const authToken = localStorage.getItem("authToken");

  const {person,setLoggedId}=useContext(AccountContext)

  useEffect(() => {
    const updateUserActivity = async () => {
      // console.log('Inside updateUserActivity:', status);
      const date = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      // console.log('After updateUserActivity:', status);
      // Implement the logic to update user activity here
      console.log("Status:", status);
      try {
        await axios
          .post(
            "/status",
            {
              isOnline: status,
              lastSeen: date,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          });
      } catch (error) {
        // console.error("Error updating user activity:", error);
      }
    };

    // Set up an event listener to track user activity
    const activityListener = () => {
      // Call the function to update user activity
      setStatus('online')
      updateUserActivity();
      // console.log('After updateUserActivity:', status);
    };

    // Attach event listeners for user activity (e.g., mousemove, keydown)
    document.addEventListener("mousemove", activityListener);
    document.addEventListener("keydown", activityListener);

    // Call a function to update user activity (e.g., by making an API request)
    updateUserActivity();

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousemove", activityListener);
      document.removeEventListener("keydown", activityListener);
    };
  }, [authToken]);
  useEffect(() => {
    axios
      .post(
        "/getUserData",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const {id, username, imageUrl,bio } = response.data;
        setId(id)
        setName(username);
        setUserImg(imageUrl);
        setBio(bio);
        setLoggedId(id)
        console.log(response.data);

      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);
  

  // useEffect(() => {
  //   axios.get("/messages/sync").then((response) => {
  //     setMessages(response.data);
  //     console.log(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("2f97fad1caa7f16732ce", {
  //     cluster: "ap2",
  //   });
  //   // here we are subscribing to the pusher channel from frontend so we know when there is change in channel
  //   const channel = pusher.subscribe("messages"); // here we will give the channel name same as we gave to the Pusher.trigger which is "messages"
  //   channel.bind("inserted", (newMessage) => {
  //     // here we will give bind same as we gave to the Pusher.trigger which is "inserted" means when something is inserted
  //     setMessages([...messages, newMessage]); // [...messages] it is a spread operator which says keep all the current msgs and add newMessage to it .
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  // console.log(messages);

  return (
    <div className="application">
      <div className="application_body">
        <Sidebar userImg={userImg} bio={bio} name={name} />

        {Object.keys(person).length ? <Chat name={name} />:<EmptyChat/>}

      </div>
    </div>
  );
}

export default Application;
