import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./Pages/NewPost"
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";
import SignIn from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

export default function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="signin" element={<SignIn />} />;
          <Route path="signup" element={<Register />} />;
          <Route path="/newPost" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

