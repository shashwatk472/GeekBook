import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Signup.css";
import { Redirect } from "react-router-dom";

function Signup() {
  const [username, setUserName] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [profession, setProfession] = useState(null);
  const [institution, setInstitution] = useState(null);

  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  useEffect(() => {
    console.log(
      `${username} ${name} ${email} ${password} ${country} ${state} ${city} ${profession} ${institution}`
    );
  }, [
    username,
    name,
    email,
    password,
    country,
    state,
    city,
    profession,
    institution,
  ]);
  const signupdata = (e) => {
    const data = {
      username: username,
      name: name,
      email: email,
      password: password,
      country: country,
      state: state,
      city: city,
      profession: profession,
      institution: institution,
    };
    try {
      axios
        .post("http://localhost:8000/signup", data)
        .then((response) => {
          setSuccess(true);
        })
        .catch((error) => {
          {
            alert("Signup Failed");
          }
          console.log(error.toJSON());
        });
    } catch (error) {
      console.log("error occured");
    }
    console.log(data);
    if (e) e.preventDefault();
  };

  return (
    <div className="signup">
      <form
        className="signup_container"
        onSubmit={(e) => {
          signupdata(e);
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SignUp</h1>

        <label className="signup_label" for="username">
          Username
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={(e) => setUserName(e.target.value)}
        ></input>

        <label className="signup_label" for="name">
          Name
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="signup_label" for="email">
          Email
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label className="signup_label" for="passsword">
          Password
        </label>
        <input
          className="signup_input"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label className="signup_label" for="country">
          Country
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Country"
          name="country"
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>

        <label className="signup_label" for="state">
          State
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter State"
          name="state"
          required
          onChange={(e) => setState(e.target.value)}
        ></input>

        <label className="signup_label" for="city">
          City
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter City"
          name="city"
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <label className="signup_label" for="Profession">
          Profession
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Profession"
          name="profession"
          required
          onChange={(e) => setProfession(e.target.value)}
        ></input>

        <label className="signup_label" for="institution">
          Institution
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Institution"
          name="institution"
          required
          onChange={(e) => setInstitution(e.target.value)}
        ></input>

        <input type="submit" value="Submit" className="signup_btn" />
        {success && <Redirect to="/login" />}
      </form>
    </div>
  );
}
export default Signup;
