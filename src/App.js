import React from "react";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function App() {
    return (
        <>
            <SpeedInsights />
            <Navbar />
            <Main />
        </>
    );
}
