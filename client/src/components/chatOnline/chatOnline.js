import React from 'react';
import './chatOnline.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

      let allOnline = [];
       const get = () =>{
      onlineUsers.map( async (e) =>{
       
        let r = await axios.get("http://localhost:8000/getUser/"+ e); 
        allOnline.push(r.data[0]);
        console.log(allOnline.length);
        });
       
      };
    
 
 
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {get()}
      {/* {allOnline.map((o) =>  ( */}
      {/* onClick={() => handleClick(o)} */}
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Sarthak Dubey</span>
      </div>
      {/* ))} */}
    </div>
  );
};
export default ChatOnline;