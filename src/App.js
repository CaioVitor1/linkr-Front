import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";
import SignIn from "./Pages/auth/Login";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="signin" element={<SignIn />} />;
        </Routes>
      </BrowserRouter>
    </>
  );
}
