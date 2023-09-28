import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

export function UserProfile({ name, photoURL, email, lastMessage }) {
  const navigate = useNavigate();
  const goToUser = (emailId) => {
    if (emailId) {
      navigate(`/${emailId}`);
    }
  };
  return (
    <div className="user-profile" onClick={() => goToUser(email)}>
      {/* img of user */}
      <Avatar src={photoURL}/>
      {/* name of user */}
      <div className="user-info">
        <h2>{name}</h2>
        {lastMessage && <p>{lastMessage}</p>}
      </div>
    </div>
  );
}
