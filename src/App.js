import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./Pages/NewPost";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Pages/home/Timeline";
import Register from "./Pages/auth/Register";
import Posts from "./Pages/Posts";
import Login from "./Pages/auth/Login";
import UserContext from "./contexts/UserContext";

export default function App() {
  const [token, setToken] = useState("");
  const contextValue = { token, setToken };

  return (
    <>
      <GlobalStyle />

      <UserContext.Provider value={contextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />;
            <Route path="signup" element={<Register />} />;
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
