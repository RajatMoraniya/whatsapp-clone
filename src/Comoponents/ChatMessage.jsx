import React from "react";
import "./ChatMessage.css";
import { auth } from "../firebase";

export function ChatMessage({ message, time, sender }) {
  return (
    <div
      className="chat-message"
      style={{
        alignSelf:
          sender === auth?.currentUser?.email ? "flex-end" : "flex-start",
        backgroundColor:
          sender === auth?.currentUser?.email ? "#dcf8c6" : "#fff",
      }}
    >
      <div className="chat-message-text">
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
