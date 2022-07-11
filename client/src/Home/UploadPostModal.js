import { Button, IconButton } from "@material-ui/core";
import { AddAPhoto, TextFields, Code, Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import PostText from "./PostText";
import PostCode from "./PostCode";
import "./UploadPostModal.css";
import Prism from "prismjs";
import "prismjs/components/prism-python";
// import "prismjs/components/prism-clike";
import "prismjs/components/";
import axios from "axios";
// import { useStateValue } from "../State/StateProvider";

function UploadPostModal({ show, handleClose }) {
  // const [{ user }, dispatch] = useStateValue();
  const [postText, setPostText] = useState(null);
  const [codeShow, setCodeShow] = useState(null);

  //descrip, code and lang are used for the final respective values
  const [descrip, setDescrip] = useState("");
  const [code, setCode] = useState(null);
  const [lang, setLang] = useState(null);

  const modal_style = show
    ? "uploadpost display_block"
    : "uploadpost display_none";

  // useEffect(() => {
  //   console.log(user);
  // }, []);
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);
  const uploadpost = () => {
    const userk = localStorage.getItem("userk");
    console.log(userk);
    if (descrip || code) {
      const data = {
        username: userk,
        language: lang.value,
        description: descrip,
        code: code,
      };
      axios
        .post("http://localhost:8000/post", data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("invalid field values");
    }
  };
  return (
    <div className={modal_style}>
      <div className="modal">
        <h3>Post</h3>
        <hr />
        <div className="post_middle">
          <p className="descrip_text">{descrip}</p>
          {lang && (
            <pre>
              <code className={lang.value}>{code}</code>
            </pre>
          )}
        </div>
        <div className="post_bottom">
          <div className="attachments">
            <IconButton>
              <AddAPhoto />
            </IconButton>
            <IconButton
              onClick={() => {
                setCodeShow(true);
              }}
            >
              <Code />
            </IconButton>
            <IconButton
              onClick={() => {
                setPostText(true);
              }}
            >
              <TextFields />
            </IconButton>
          </div>
          <div className="post_submit">
            <Button
              variant="contained"
              onClick={() => {
                setDescrip(null);
                setCode(null);
                setLang(null);
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                uploadpost();
                setDescrip(null);
                setCode(null);
                setLang(null);
                handleClose();
              }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <div className="close_post" onClick={handleClose}>
        <Close />
      </div>
      <PostText
        show={postText}
        handleClose={() => {
          setPostText(null);
        }}
        handleText={(text) => {
          setDescrip(text);
        }}
      />
      <PostCode
        show={codeShow}
        handleClose={() => {
          setCodeShow(null);
        }}
        handleCode={(c) => {
          setCode(c);
        }}
        handleLang={(l) => {
          setLang(l);
        }}
      />
    </div>
  );
}

export default UploadPostModal;
