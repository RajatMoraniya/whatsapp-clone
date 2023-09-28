import React, { useState } from "react";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar,IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import "./sideBar.css";
import { UserProfile } from "./UserProfile";
import { useEffect } from "react";
import db from "../firebase";

export function SideBar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      //eslint-disable-next-line
      const data = await db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
        );
      });
    };

    const getFriends = async () => {
      const data = await db
        .collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };

    getAllUsers();
    getFriends();
  }, []);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  function confirmLogout() {
    const log = window.confirm("Are you sure?");
    if (log) signOut();
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="slidebar_headerLeft">
          <Avatar src={currentUser?.photoURL}/>
          <IconButton onClick={signOut}>
            <LogoutIcon/>
          </IconButton>
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon/>
          </IconButton> 
          <IconButton>
            <ChatIcon onClick={() => setFriendList(allUsers)} />
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search or Start a new Chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      
      <div className="sidebar-chat-list">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => (
              <UserProfile
                key={friend.data().email}
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}
