import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { Redirect } from "react-router-dom";

function EditProfile() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [profession, setProfession] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [pic, setPic] = useState(null);

  const [picMessage, setPicMessage] = useState();

  const [success, setSuccess] = useState(false);

  const updatedata = (e) => {
    const userk = localStorage.getItem("userk");
    console.log(userk);
    const data = {
      username: userk,
      name: name,
      email: email,
      password: password,
      country: country,
      state: state,
      city: city,
      profession: profession,
      institution: institution,
      pic: pic,
    };
    try {
      axios
        .post("http://localhost:8000/updateuser", data)
        .then((response) => {
          setSuccess(true);
        })
        .catch((error) => {
          {
            alert("Update failed");
          }
          console.log(error.toJSON());
        });
    } catch (error) {
      console.log("error occured");
    }
    console.log(data);
    if (e) e.preventDefault();
  };

  const postDetails = (pics) => {
    setPicMessage(null);
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "geekbook");
      data.append("cloud_name", "dszy1buo5");
      fetch("https://api.cloudinary.com/v1_1/dszy1buo5/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      {
        alert("Error in uploading image");
      }
    }
  };

  return (
    <div className="updateuser">
      <form
        className="updateuser_container"
        onSubmit={(e) => {
          updatedata(e);
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          EDIT PROFILE
        </h1>
        {/* <div className="profile_pic"> */}
        <img src={pic} className="profilePic" />

        <label className="updateuser_label" for="image">
          Upload Image
        </label>
        <input
          className="updateuser_input"
          type="file"
          id="image"
          name="image"
          onChange={(e) => postDetails(e.target.files[0])}
        />

        <label className="updateuser_label" for="name">
          Name
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="updateuser_label" for="email">
          Email
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label className="updateuser_label" for="passsword">
          Password
        </label>
        <input
          className="updateuser_input"
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <label className="updateuser_label" for="country">
          Country
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter Country"
          name="country"
          onChange={(e) => setCountry(e.target.value)}
        ></input>

        <label className="updateuser_label" for="state">
          State
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter State"
          name="state"
          onChange={(e) => setState(e.target.value)}
        ></input>

        <label className="updateuser_label" for="city">
          City
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter City"
          name="city"
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <label className="updateuser_label" for="Profession">
          Profession
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter Profession"
          name="profession"
          onChange={(e) => setProfession(e.target.value)}
        ></input>

        <label className="updateuser_label" for="institution">
          Institution
        </label>
        <input
          className="updateuser_input"
          type="text"
          placeholder="Enter Institution"
          name="institution"
          onChange={(e) => setInstitution(e.target.value)}
        ></input>

        <input type="submit" value="Update" className="updateuser_btn" />
        {success && <Redirect to="/Profile" />}
      </form>
    </div>
  );
}
export default EditProfile;
