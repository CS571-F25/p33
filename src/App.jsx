import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import Sidebar from "./components/Sidebar";
import Favorites from './components/Favorites'
import DrinkChoice from './components/DrinkChoice'
import CommunityBulletin from './components/CommunityBulletin'


function App() {
  const [open, setOpen] = useState(false);

  return <HashRouter>
    <button
      onClick={() => setOpen(true)}
      style={{
        position: "fixed",
        left: 20,
        top: 20,
        zIndex: 100,
        padding: "10px 15px",
        fontSize: "16px",
      }}
    >
      ☰
    </button>
    <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="/DrinkChoice" element={<DrinkChoice/>}></Route>
      <Route path="/CommunityBulletin" element={<CommunityBulletin/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
