import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Comoponents/Home";
import { ChatPage } from "./Comoponents/ChatPage";
import { useState } from "react";
import { Login } from "./Comoponents/Login";
import { auth } from "./firebase";

function App() {  
  const[user,setUser]=useState(JSON.parse(localStorage.getItem("user")));
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };  
  console.log(user);
  return (
    <BrowserRouter>
      <div className="App">
     { user ? (
        <Routes>
          <Route path="/:emailID" element={<ChatPage currentUser={user} signOut={signOut}/>}/>
          <Route path="/" element={<Home currentUser={user} signOut={signOut} />}/>
        </Routes>
      ) : (
        <Login setUser={setUser}/>
      )}
      </div>
    </BrowserRouter>
  );
}

export default App;
