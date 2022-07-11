// import logo from './logo.svg';
import "./App.css";
import Navbar from "./Navbar/Navbar.js";
import Login from "./Login/Login.js";
import Profile from "./Profile/Profile.js";
import EditProfile from "./Profile/EditProfile.js";
import Home from "./Home/Home";
import Chat from "./Home/Chats/Chat";
import Messenger from "./Messenger/Messenger.js";
import { useState } from "react";
import Signup from "./Login/Signup.js";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  const [chat_show, setChat_show] = useState(null);
  return (
    <div className="app">
      <Switch>
        <Route path="/messenger">
          <Messenger />
        </Route>
        <Route path="/signUp">
          <Signup />
        </Route>
        <Route path="/Home">
          <Navbar />
          <Home />
        </Route>
        <Route path="/profile">
          <Navbar />
          <Profile />
        </Route>
        <Route path="/editprofile">
          <Navbar />
          <EditProfile />
        </Route>
        <Route path="/">
          <Login />
        </Route>

        {/* <Login /> */}
        {/* <Home /> */}
        {/* <Profile /> */}
        {/* <Chat
        show={chat_show}
        handleClose={() => {
          setChat_show(null);
        }}
      />
      <div
        className="chat_open_button"
        style={chat_show && { display: "none" }}
        onClick={() => {
          setChat_show(true);
        }}
      >
        Chat a Geek */}
        {/* </div> */}
      </Switch>
    </div>
  );
}

export default App;
