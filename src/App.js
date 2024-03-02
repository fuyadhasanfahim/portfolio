import React from "react";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
    return (
        <>
            <SpeedInsights />
            <Navbar />
            <Main />
            <About />
            <Contact />
            <Footer />
        </>
    );
}
