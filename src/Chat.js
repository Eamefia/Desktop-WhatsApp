import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "./axios";
//import axiose from "axios";
//import jwt_decode from "jwt-decode";
import Pusher from "pusher-js";
import "./Chat.css";
import LogOut from "./LogOut";
import TelegramIcon from '@material-ui/icons/Telegram';


function Chat() {
  const [input, setInput] = useState("")
  const { userId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatUserName, setChatUserName] = useState("");
  const senderId = localStorage.getItem("user_id");

  useEffect(() => {
    const pusher = new Pusher('d954810e751705611020', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {

      setChatMessages([...chatMessages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [chatMessages]);




  useEffect(() =>{
    axios.get(`/users/${senderId}`).then((response) =>{
      const chatUsers = response.data;
       chatUsers.forEach( chatUser => {
        const chatUserId = chatUser._id;
        const userName = chatUser.fname;
        if(userId === chatUserId){
            setChatUserName(userName);
        }
       });
    });
  }, [senderId, userId])


  useEffect(() => {
    async function getChats(){
       await axios.get(`/messages/${senderId}/${userId}`).then((response) =>{
          const chats = response.data;
          setChatMessages(chats)
        });
    }
    getChats();
  }, [userId, senderId])

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      receiverId: userId,
      senderId: senderId,
    });
     setInput("");
  };
  
  
    return (
        <div className="chat">
            <div className="chat__header">
               <Avatar />

               <div className="chat__headerInfo">
                   <h3>{chatUserName}</h3>
                   <p>Last seen at yesterday</p>
               </div>

               <div className="chat__headerRight">
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                  <LogOut />
               </div>
            </div>
            <div className="chat__body">
                {chatMessages.map(message =>{
                  return(
                  <p className={`chat__message ${message.senderId===senderId && "chat__receiver"}`}>
                   {message.message}
                  <span className="chat__timestamp">{message.timestamp}</span>
                </p>
                )})}
                
            
              
            </div>
            <div className="chat__footer">
              <InsertEmoticonIcon />
              <form>
                 <input value={input} onChange={(e) =>setInput(e.target.value)} placeholder="type a message" type="text" />
                 <button onClick={sendMessage} type="submit"><TelegramIcon /></button>
              </form>
              <MicIcon />
            </div>
        </div>
    );
}

export default Chat
