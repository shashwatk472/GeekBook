import React, { useEffect, useState, useRef } from "react";
import "./PostText.css";
import { Button } from "@material-ui/core";
function PostText({ show, handleText, handleClose }) {
  const text_modal_style = show
    ? "posttext display_block"
    : "posttext display_none";
  const [text, setText] = useState("");
  return (
    <div className={text_modal_style}>
      <div className="text_box">
        <h3>Description</h3>
        <hr />
        <textarea
          cols="100"
          autoFocus
          rows="15"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <hr />
        <div className="text_submit">
          <Button
            variant="contained"
            onClick={() => {
              setText("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleText(text);
              setText("");
              handleClose();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostText;
