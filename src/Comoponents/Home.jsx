import React from "react";
import { SideBar } from "./SideBar";
import "./Home.css";

export function Home({ currentUser, signOut }) {
  return (
    <div className="home">
      <div className="home-container">
        {/* sideBar */}
        <SideBar currentUser={currentUser} signOut={signOut} />
        {/* a container with whatapp logo */}
        <div className="home-bg">
          <img src="./WhatsAppbg.png" alt="" />
        </div>
      </div>
    </div>
  );
}
