import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const username = localStorage.getItem("userk");
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [profession, setProfession] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [pic, setPic] = useState(null);
 
  useEffect(() => {
    const data = {
      username: username,
    };
    try {
      axios
        .post("http://localhost:8000/getUser", data)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setCountry(response.data.country);
          setState(response.data.state);
          setCity(response.data.city);
          setProfession(response.data.profession);
          setInstitution(response.data.institution);
          setPic(response.data.pic);
           
        })
        .catch((error) => {
          {
            alert("Error");
          }
          console.log(error);
        });
    } catch (error) {
      console.log("error");
    }
  });

  return (
    <div className = "profile">
    <div className="profile_container">
      <div className="dp_container">
        <img src = {pic} className="profile_avatar" />
        <span className="profile_name">{name}</span>
      </div>
      <hr className="dp_line" />
      <div className="profile_information_container">
        <div className="profile_item">
          <span className="profile_information_item">Username :</span>
          <span className="values">{username}</span>
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          Email : 
          </span><span className="values">{email}</span>
        
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          Country : </span>
          <span className="values">{country}</span>
        
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          State : </span>
          <span className="values">{state}</span>
       
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          City : </span>
          <span className="values">{city}</span>
        
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          Profession : </span>
          <span className="values">{profession}</span>
        
        </div>
        <hr className="profile_information_line"></hr>
        <div className="profile_item">
        <span className="profile_information_item">
          Institution : </span>
          <span className="values">{institution}</span>
        
        </div>
      </div>
    </div>
    </div>
  );
};
export default Profile;
