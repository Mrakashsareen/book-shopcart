import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Admin from '../pages/admin/Admin';
import Login from '../pages/registration/Login';
import Register from '../pages/registration/Register';

const AppRouter: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
};

export default AppRouter;