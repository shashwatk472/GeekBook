import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Home.css";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import UploadPostModal from "./UploadPostModal";
function Home() {
  const [post_show, setPost_show] = useState(null);
  const [postAll, setPostAll] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/fetchAllPost")
      .then((res) => {
        setPostAll(res.data);
      })
      .catch((error) => {
        console.log("ERROR OCCCURRED");
      });
  }, []);
  // useEffect(() => {
  //   console.log(postAll);
  // }, [postAll]);
  return (
    <div className="home">
      <div className="feeds">
        <div className="ask">
          <span> Have something in mind?</span>
          <Button
            variant="contained"
            onClick={() => {
              setPost_show(true);
            }}
          >
            Post Something
          </Button>
        </div>
        <h3 className="latest_posts">Latest Posts</h3>
        {postAll.map((post) => (
          <Posts
            lang={post.language}
            descrip={post.description}
            code={post.code}
            username={post.username}
          />
        ))}
      </div>
      <Sidebar />
      <UploadPostModal
        show={post_show}
        handleClose={() => {
          setPost_show(null);
        }}
      />
    </div>
  );
}

export default Home;
