import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";

export default function App() {
    
    return (
       <>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Timeline />} /> 
            </Routes>
        </BrowserRouter>
        </>
    )
}