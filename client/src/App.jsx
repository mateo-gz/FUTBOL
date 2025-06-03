import './App.css'
import Home from './pages/home.jsx'
import Admin from './pages/admin.jsx'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}/>
    </Routes>
  );
}


export default App;
