import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewMember from './pages/NewMember';
import AddDetails from './pages/AddDetails';
import Navbar from './Components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import Member from './pages/Member';
import AllMembers from './pages/AllMembers';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newmember" element={<NewMember />} />
        <Route path="/details" element={<AddDetails />} />
        <Route path="/member" element={<Member />} />
        <Route path='/members' element={<AllMembers />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
