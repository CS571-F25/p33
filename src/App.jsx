import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import NavBar from "./components/NavBar";
import Favorites from './components/Favorites'
import DrinkChoice from './components/DrinkChoice'
import CommunityBulletin from './components/CommunityBulletin'
import AboutMia from './components/AboutMia';
import AboutCharlotte from './components/AboutCharlotte';
import Journal from './components/Journal';


function App() {

  return <HashRouter>
     <NavBar />

    <main style={{ paddingTop: "80px" }}>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="/DrinkChoice" element={<DrinkChoice/>}></Route>
      <Route path="/CommunityBulletin" element={<CommunityBulletin/>}></Route>
      <Route path="/AboutMia" element={<AboutMia/>}></Route>
      <Route path="/AboutCharlotte" element={<AboutCharlotte/>}></Route>
      <Route path="/Journal" element={<Journal/>}></Route>
    </Routes>
    </main>
  </HashRouter>
  
}

export default App
