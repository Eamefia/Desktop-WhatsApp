import React, { useState, useEffect } from 'react';
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { Link } from 'react-router-dom';
import axios from "axios";

function SidebarChat({ id, name, profile }) {
      const [messages, setMessages] = useState([]);

      useEffect(() => {
        async function getChats(){
          //const usersRes = await axios.get(`http://localhost:9000/messages/${id}`);
           const usersRes = await axios.get(`https://whatsap-mern-clone.herokuapp.com/messages/${id}`);
          setMessages(usersRes.data);
        }
        getChats();
      }, [id])
    return (
        <div className="sidebarChat">
         <Link to={`/users/${id}`}>
           <div className="sidebarChat_items">
           <Avatar src={`/uploads/${profile}`}/>
           <div className="sidebarChat__info">
                 <h2>{name}</h2>
                    <p maxLength={10}>{messages[0]?.message}</p>
           </div>
          </div>
        </Link>

        </div>
    );
}

export default SidebarChat
