import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./Pages/NewPost";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Pages/home/Timeline";
import Trending from "./Pages/trending/Trending";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import UserContext from "./contexts/UserContext";
import HashtagPosts from "./Pages/hashtagPosts/HashtagPosts";

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
            <Route path="/trending" element={<Trending />} /> 
            <Route path="/hashtagPosts/:hashtagName" element={<HashtagPosts />} /> 
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/newPost" element={<NewPost />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
