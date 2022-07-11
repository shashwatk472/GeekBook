import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./PostCode.css";
import "prismjs/components/";
import Select from "react-select";
function PostCode({ show, handleCode, handleLang, handleClose }) {
  const code_modal_style = show
    ? "postcode display_block"
    : "postcode display_none";
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("");
  const options = [
    { value: "language-clike", label: "C/C++" },
    { value: "language-py", label: "Python" },
    { value: "language-java", label: "Java" },
    { value: "language-js", label: "Java Script" },
    { value: "language-c-sharp", label: "C#" },
    { value: "language-go", label: "Go" },
    { value: "language-PHP", label: "PHP" },
  ];
  return (
    <div className={code_modal_style}>
      <div className="code_box">
        <h3>Code</h3>
        <Select
          value={lang}
          options={options}
          onChange={(e) => {
            setLang(e);
          }}
        />
        <textarea
          cols="100"
          autoFocus
          rows="15"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <hr />
        <div className="code_submit">
          <Button
            variant="contained"
            onClick={() => {
              setCode("");
              setLang(null);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCode(code);
              handleLang(lang);
              setCode("");
              setLang(null);
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

export default PostCode;
