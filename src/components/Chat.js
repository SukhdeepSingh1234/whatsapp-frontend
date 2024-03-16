import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicIcon from "@mui/icons-material/Mic";
import axios from "../axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AccountContext } from "./Context";
import GetAppIcon from "@mui/icons-material/GetApp";
function Chat({ name }) {
  const [text, setText] = useState("");
  // const currTime=new Date().toUTCString()
  const {
    person,
    loggedId,
    setLatestmsg,
    allData,
    setActiveUsers,
    activeUsers,
    socket,
  } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    try {
      axios
        .post("/conversation/sync", {
          senderId: loggedId,
          receiverId: person._id,
        })
        .then((response) => {
          console.log("message sync done!", response.data);
          setConversation(response.data);
          console.log("conversation id sync done");
          setLatestmsg(response.data.message);
        });
    } catch (error) {
      console.log("error while calling /conversation/sync", error.message);
    }
  }, [person._id]);

  // useEffect(() => {
  //   socket.current.emit("addUsers", loggedId);
  //   socket.current.emit("getUsers", (users) => {
  //     setActiveUsers(users);
  //   });
  // }, [allData]);

  useEffect(() => {
    // Emit event to server to add user to active users
    socket.current.emit("addUsers", allData);
    // Add socket event listener to update active users
    socket.current.on("updateUsers", (updatedUsers) => {
      setActiveUsers(updatedUsers);
    });
  }, []);
  console.log(" active users frontend", activeUsers);

  useEffect(() => {
    const data = async () => {
      if (conversation._id) {
        try {
          axios.get(`/messages/sync/${conversation._id}`).then((response) => {
            setMessages(response.data);
          });
        } catch (error) {
          console.log("error while calling /messages/sync", error.message);
        }
      }
    };
    data();
  }, [conversation._id, person._id, newMessageFlag]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log("getMessage called");
      setIncomingMessage({
        ...data,
        sendAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let message = {};
    if (!file) {
      message = {
        conversationId: conversation._id,
        senderId: loggedId,
        receiverId: person._id,
        message: text,
        type: "text",
      };
    } else {
      message = {
        conversationId: conversation._id,
        senderId: loggedId,
        receiverId: person._id,
        message: image,
        type: "file",
      };
    }
    socket.current.emit("sendMessage", message);
    console.log("message sent");
    console.log(message);
    try {
      // Send the message using Axios request
      const response = await axios.post("/messages/new", message);
      console.log("Message sent!", response);

      // Emit the message using socket

      // Clear the input fields and flags
      setText("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const FormatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? "0" + hours : hours} : ${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          let response = await axios.post("/file/upload", data); // Use "await" here to ensure the request completes before setting the state
          console.log(response);
          setImage(response.data);
          console.log(image);
        } catch (error) {
          console.log("error while calling upload file api", error.message);
        }
      }
    };
    getImage(); // Run the function once when the component mounts
  }, [file]);

  useEffect(() => {
    // Scroll to the bottom of the container after messages are updated
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setText(e.target.files[0].name);
  };

  const TextMessage = ({ message }) => {
    return (
      <>
        <p className={`chat_message chat_sent`}>
          <span className="chat_name">{message.name}</span>
          {message.message}
          <span className="chat_timestamp">
            {FormatDate(message.createdAt)}
          </span>
        </p>
      </>
    );
  };
  const pdfimg =
    "https://t3.ftcdn.net/jpg/05/11/25/36/360_F_511253627_zuzpapnIVQueMx4eSL1ilAoH61OBgj0C.jpg";
  const ImageMessage = ({ message }) => {
    console.log(message);
    return (
      <div>
        {message?.text?.include(".pdf") ? (
          <div>
            <img src={pdfimg} alt="pdf" style={{ width: 80, height: 80 }} />
            <p>{message.message}</p>
            <span className="chat_timestamp">
              {FormatDate(message.createdAt)}
            </span>
          </div>
        ) : (
          <p className={`chat_message chat_sent`}>
            <img
              className="chat_imagesent"
              src={message.message}
              alt={message.message}
            />
            <span className="chat_timestamp">
              {FormatDate(message.createdAt)}
            </span>
          </p>
        )}
      </div>
    );
  };
  console.log("Active users ", activeUsers);
  console.log("loggedId:", loggedId);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={person.image} />
        <div className="chat_headerInfo">
          <h3>{person.name}</h3>
          {/* <p>{person.isOnline}</p> */}
          <p>
            {activeUsers?.find((user) => user.id === person._id)
              ? "Online"
              : "Offline"}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body" ref={scrollRef}>
        {messages.map((message) =>
          loggedId === message.senderId ? (
            message.type === "file" ? (
              <ImageMessage message={message} />
            ) : (
              <TextMessage message={message} />
            )
          ) : message.type === "file" ? (
            <div>
              {message?.text?.include(".pdf") ? (
                <div>
                  <img
                    src={pdfimg}
                    alt="pdf"
                    style={{ width: 80, height: 80 }}
                  />
                  <p>{message.message}</p>
                  <span className="chat_timestamp">
                    {FormatDate(message.createdAt)}
                  </span>
                </div>
              ) : (
                <p className={`chat_message `}>
                  <img
                    className="chat_imagesent"
                    src={message.message}
                    alt={message.message}
                  />
                  <span className="chat_timestamp">
                    {FormatDate(message.createdAt)}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <p className={`chat_message`}>
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp">
                {FormatDate(message.createdAt)}
              </span>
            </p>
          )
        )}
      </div>
      <div className="chat_footer">
        <EmojiEmotionsOutlinedIcon
          style={{ color: "gray", marginLeft: "6px" }}
        />

        <label for="fileInput">
          <AttachFileIcon style={{ color: "gray" }} />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => onFileChange(e)}
        />

        <div className="chat_typemsg">
          <form>
            <input
              type="text"
              placeholder="Type a message"
              onChange={(e) => setText(e.target.value)}
              name="msg"
              value={text}
            />
            <button type="submit" onClick={sendMessage}>
              send message
            </button>
          </form>
        </div>

        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
