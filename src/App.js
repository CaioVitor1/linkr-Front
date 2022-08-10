import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Timeline from "./Timeline";
import Trending from "./Pages/trending/Trending";

export default function App() {
    
    return (
       <>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Timeline />} /> 
                <Route path="/trending" element={<Trending />} /> 
            </Routes>
        </BrowserRouter>
        </>
    )
}