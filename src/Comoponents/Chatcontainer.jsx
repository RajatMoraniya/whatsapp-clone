import React, { useEffect, useRef } from "react";
import "./Chatcontainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from '@mui/icons-material/Search';
import { MicOutlined } from '@mui/icons-material';
import SendIcon from "@mui/icons-material/Send";
import { ChatMessage } from "./ChatMessage";
import { useState } from "react";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { Avatar,IconButton  } from "@mui/material";

export function Chatcontainer({ currentUser }) {
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const { emailID } = useParams();
  const [chatUser, setChatUser] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const chatBox = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
    };
    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );

          setChatMessages(newMessage);
        });
    };
    getUser();
    getMessages();
  }, [emailID]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behaviour: "smooth" });
    });
  }, [chatMessages]);

  const send = (e) => {
    e.preventDefault();

    if (emailID && message.trim()!=="") {
      // Message
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      // sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);
      // reciever
      db.collection("chats").doc(emailID).collection("messages").add(payload);

      //friendlist - current User
      db.collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      //friendlist - second User
      db.collection("Friendlist")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });

      }
      setMessage("");
  };

  return (
    <div className="chat-container">
      {/* chat container header */}
      <div className="chat-container-header">
        <div className="chat-header-info">
          <Avatar src={chatUser?.photoURL} />
          <div className="chat-user-name">
            <h3>{chatUser?.fullname}</h3>
            {/* <p>Last Seen at {
                    new Date(chatMessages[chatMessages.length-1]?.timestamp?.seconds*1000)
                    .toLocaleTimeString()
            }</p> */}
          </div>
        </div>
        <div className="chat-header-right">
            <IconButton>
                <SearchIcon/>
            </IconButton>

            <IconButton> 
                <AttachFileIcon/>
            </IconButton>

            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </div>
      </div>

      {/* chats container body */}
      <div className="chat-display-container" ref={chatBox}>
        {chatMessages.map((message) => (
          <ChatMessage
            message={message.text}
            time={message.timeStamp}
            sender={message.senderEmail}
          />
        ))}
      </div>

      {/* chatinput */}
      <div className="chat-footer">
    
        {openEmojiBox && (
          <Picker
            onEmojiClick={(event, emojiData) =>
              setMessage(message + emojiData.emoji)
            }
          />
        )}

        <IconButton onClick={() => setOpenEmojiBox(!openEmojiBox)}>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        
        {/* text input element */}
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>

        <IconButton>
                <MicOutlined/>
        </IconButton>
        <IconButton className="sendButton" onClick={send}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
