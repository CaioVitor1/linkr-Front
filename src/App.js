import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./Pages/NewPost";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Pages/home/Timeline";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />;
          <Route path="signup" element={<Register />} />;
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/newPost" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
