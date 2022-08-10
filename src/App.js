import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./Pages/NewPost"
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";


export default function App() {
    
    return (
       <>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Timeline />} /> 
                <Route path="/newPost" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}