import React, { useState } from "react";
import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import HowToPlay from "./components/HowtoPlay";
import Hero from "./components/Hero";
import Charts from "./components/Charts";
import AboutUs from "./components/AboutUs";
import GameRules from "./components/GameRules";
import TermsAndConditions from "./components/TermsAndConditions";
import JodiChart from "./components/JodiChart";
import PannaChart from "./components/PanelChart";
import JackpotChart from "./components/JackpotChart";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen w-full overflow-y-hidden bg-white text-black">
      {/* Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/howtoplay" element={<HowToPlay />} />
        <Route path="/gamerules" element={<GameRules />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/panna-chart/:gameNamePanna" element={<PannaChart />} />
        <Route path="/jackpot-chart/:gameNameJackpot" element={<JackpotChart />} />
        <Route path="/jodi-chart/:gameName" element={<JodiChart />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
