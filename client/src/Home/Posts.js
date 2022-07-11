import { Avatar, IconButton } from "@material-ui/core";
import {
  Comment,
  Favorite,
  MoreVert,
  PersonAdd,
  Share,
  ThumbDown,
  ThumbUp,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
// import "prismjs/components/prism-clike";
import "prismjs/components/";
import "../prism.css";
import "./Posts.css";
import axios from "axios";
// import { useStateValue } from "../State/StateProvider";
function Posts({ lang, code, descrip, username }) {
  const [info, setInfo] = useState({});
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  useEffect(() => {
    const req1 = {
      username: username,
    };
    axios
      .post("http://localhost:8000/getUser", req1)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        console.log("ERROR OCCCURRED");
      });
  }, []);
  // useEffect(() => {
  //   console.log(info);
  // }, [info]);
  return (
    <div className="posts">
      <div className="posts_top">
        <Avatar src={info.pic} />
        <div className="posts_info">
          <h3 className="posts_name">{info.name}</h3>
          <p>{info.institution}</p>
        </div>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton>
          <PersonAdd />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <p className="posts_desc">{descrip}</p>
      <div className="code">
        <pre className="custom_prism">
          <code className={lang}>{code}</code>
          <div className="posts_language">
            <h4>{lang}</h4>
          </div>
        </pre>
      </div>
      <div className="posts_bottom">
        <div className="posts_activity">
          <ThumbUp />
          <span>Like</span>
        </div>
        <div className="posts_activity">
          <ThumbDown />
          <span>Dislike</span>
        </div>
        <div className="posts_activity">
          <Comment />
          <span>Response</span>
        </div>
        <div className="posts_activity">
          <Favorite />
          <span>Add to Favorite</span>
        </div>
      </div>
    </div>
  );
}
export default Posts;
