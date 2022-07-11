import React from "react";
import Conversation from "../components/conversation/conversation";
import Message from "../components/message/message";
import Navbar from "../Navbar/Navbar";
import ChatOnline from "../components/chatOnline/chatOnline";
import "./Messenger.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

var x;

const Messenger = () => {
  const username = localStorage.getItem("userk");

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const[user,setUser] =useState([]);
  const socket = useRef();
  const scrollRef = useRef();

 
  useEffect(() => {
     socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
       
  }, []);

 useEffect(() => {
   arrivalMessage &&
     currentChat?.members.includes(arrivalMessage.sender) &&
     setMessages((prev) => [...prev, arrivalMessage]);
 }, [arrivalMessage, currentChat]);


   useEffect(() => {
     socket.current.emit("addUser", x);
     socket.current.on("getUsers", (users) => {
       var array=users.map(x=> x.userId
       ).filter(e=> e && e!==user._id);
      //  console.log(array);
       setOnlineUsers(array);
     })
   }, [user]);


  useEffect(() => {
    async function getConversations() {
      const data = {
        username: username,
      };
      try {
        await axios
          .post("http://localhost:8000/getUser", data)
          .then(async (response) => {
            // console.log(response.data);
            setUser(response.data);
            const id = response.data._id;
            x = response.data._id;
          
            const res = await axios.get(
              "http://localhost:8000/conversations/" + id
            );
           
            setConversations(res.data);
          })
          .catch((error) => {
            {
              alert("Error");
            }
            console.log(error);
          });
      } catch (error) {
        console.log("error");
      }
    }
    getConversations();
  }, [x]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        
        const res = await axios.get(
          "http://localhost:8000/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: x,
      text: newMessage,
      conversationId: currentChat._id,
    };

     const receiverId = currentChat.members.find(
       (member) => member !== x
     );

     socket.current.emit("sendMessage", {
       senderId: x,
       receiverId,
       text: newMessage,
     });

    try {
      const res = await axios.post("http://localhost:8000/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />

            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={x} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === x} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={x}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
