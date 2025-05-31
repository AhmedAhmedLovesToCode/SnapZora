import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Marketplace from './components/Marketplace';
import Navbar from './components/Navbar';



export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/marketplace" /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/marketplace"
            element={
              user ? <Marketplace /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to={user ? "/marketplace" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}
