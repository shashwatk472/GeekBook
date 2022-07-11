import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { useStateValue } from "../State/StateProvider";
import { actions } from "../State/reducer";
const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(false);

  const signindata = (e) => {
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    try {
      axios
        .post("http://localhost:8000/signin", data)
        .then((response) => {
          dispatch({ type: actions.SET_USER, user: data.username });
          localStorage.setItem("userk", data.username);
          setSuccess(true);
        })
        .catch((error) => {
          {
            alert("Login Failed");
          }
          console.log(error.toJSON());
        });
    } catch (error) {
      console.log("signin error");
    }
    if (e) e.preventDefault();
  };

  return (
    <div className="login">
      <form
        action=""
        className="container"
        onSubmit={(e) => {
          signindata(e);
        }}
      >
        <h1 style={{ textAlign: "center" }}>GeekBook</h1>
        Username
        <div>
          <input
            className="login_input"
            type="text"
            size="50"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        Password
        <div>
          <input
            className="login_input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="checkbox" />
          Remember me
        </div>
        <input type="submit" value="Login" className="login_btn" />
        {localStorage.getItem("userk") && <Redirect to="/Home" />}
        Not having an account? &nbsp;
        <Link to="/signUp">sign up</Link>
      </form>
    </div>
  );
};
export default Login;
