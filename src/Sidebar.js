import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function Sidebar() {

  const [users, setUsers] = useState([]);
  const [profileImg, setProfileImg] = useState("");
  const userId = localStorage.getItem("user_id");

  useEffect(() =>{
    async function user(){
      //await axios.get(`http://localhost:9000/userprofile/${userId}`).then((response) =>{
      await axios.get(`https://whatsap-mern-clone.herokuapp.com/userprofile/${userId}`).then((response) =>{
        const useres = response.data;
      setProfileImg(useres);
      });
    }
    user();
  });
  

  useEffect(() => {
      async function getUsers(){
        //await axios.get(`http://localhost:9000/users/${userId}`).then((response) =>{
       await axios.get(`https://whatsap-mern-clone.herokuapp.com/users/${userId}`).then((response) =>{
          const usersRes = response.data;
        setUsers(usersRes);
        });
      }
      getUsers();
  }, [userId]);
  
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={`/uploads/${profileImg.profileImg}`}/>
              
                <div className="headerRight">
                   <IconButton>
                     <DonutLargeIcon />
                   </IconButton>
                   <IconButton>
                     <ChatIcon />
                   </IconButton>
                   <IconButton>
                     <MoreVertIcon />
                   </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
              <div className="sidebar__searchContainer">
                <SearchOutlinedIcon />
                <input placeholder="Search to start new chat" type="text" />
              </div>
            </div>
            <div className="sidebar__chats">
                {users.map((user) =>(
                  <SidebarChat key={user._id} id={user._id} name={user.fname} email={user.email} profile={user.profileImg} />
                ))}
               
            </div>
        </div>
    )
}

export default Sidebar;
