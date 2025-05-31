import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/marketplace" className="logo">SnapZora</Link>
      <div>
        {user ? (
          <>
            <span className="welcome">Welcome, {user.username}!</span>
            <button onClick={logout} className="btn logout-btn"><span>Logout</span></button>
          </>
        ) : (
          <Link to="/login" className="btn login-btn">Log in</Link>
        )}
      </div>
    </nav>
  );
}
