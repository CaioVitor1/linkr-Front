import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="signin" element={<Login />} />;
          <Route path="signup" element={<Register />} />;
        </Routes>
      </BrowserRouter>
    </>
  );
}
