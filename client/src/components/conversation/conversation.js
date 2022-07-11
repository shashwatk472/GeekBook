import React from "react";
import "./conversation.css";
import axios from "axios";
import { useState,useEffect } from "react";

const Conversation = ({ conversation, currentUser }) => {

   const [user, setUser] = useState(null);
   const [userPic, setUserPic] = useState(null);
   

   useEffect(() => {
  
     const friendId = conversation.members.find((m) => m !== currentUser);

     const getUser = async () => {
       try {
         const res = await axios("http://localhost:8000/users?userId=" + friendId);
       
         setUser(res.data.name);
         setUserPic(res.data.pic);
       } catch (err) {
         console.log(err);
       }
     };
     getUser();
   }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={userPic}
        alt=""
      />
      <span className="conversationName">{user}</span>
    </div>
  );
};
export default Conversation;