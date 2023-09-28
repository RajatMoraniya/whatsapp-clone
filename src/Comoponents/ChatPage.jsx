import React from "react";
import { Chatcontainer } from "./Chatcontainer";
import { SideBar } from "./SideBar";
import "./ChatPage.css";

export function ChatPage({ currentUser, signOut }) {
  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {/* sideBar */}
        <SideBar currentUser={currentUser} signOut={signOut} />
        {/* chatcontainer */}
        <Chatcontainer currentUser={currentUser} />
      </div>
    </div>
  );
}
