import { Avatar } from "@material-ui/core";
import { ChatOutlined, Search } from "@material-ui/icons";
import * as React from "react";
import { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import "./Chat.css";
function Chat({ show, handleClose }) {
  const display_c = show ? "chat display_chat_block" : "display_chat_none";
  const ref = React.useRef(null);
  useOnClickOutside(ref, handleClose);
  return (
    <div className={display_c} ref={ref}>
      <div className="chat_list_top">Chats</div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">
        <Avatar />
        <h4>noob dev</h4>
        <p>active 27m ago</p>
      </div>
      <div className="chat_user">New Chat</div>
      <div className="chat_search">
        <input type="text" placeholder="Search a geek" />
        <Search />
      </div>
    </div>
  );
}

export default Chat;
