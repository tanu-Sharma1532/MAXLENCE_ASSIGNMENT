import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      style={{ 
        padding:'20px 40px',
        background:'linear-gradient(90deg, #ff7e5f, #feb47b)', 
        color:'white',
        position:'relative'
      }}
    >
      <div
        style={{ 
          display:'flex', 
          justifyContent:'space-between', 
          alignItems:'center'
        }}
      >
        <h2 style={{ margin:'0' }}>MyApp</h2>

        {/* Menu button for small screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            color:'white', 
            background:'none', 
            border:'none', 
            fontSize:'1.5rem',
            cursor:'pointer',
            display:'none'
          }}
          className="menuBtn"
        >
          ☰
        </button>

        {/* Links */}
        <ul
          style={{ 
            listStyle:'none', 
            display:'flex', 
            gap:'20px', 
            margin:'0', 
            padding:'0'
          }}
          className="desktopMenu"
        >
          <li>
            <Link to="/" style={{ color:'white', textDecoration:'none' }}>Home</Link>
          </li>

          {token && (
            <>
              <li>
                <Link to="/dashboard" style={{ color:'white', textDecoration:'none' }}>Dashboard</Link>
              </li>
              <li>
                <Link to="/user-profile" style={{ color:'white', textDecoration:'none' }}>Profile</Link>
              </li>
              <li>
                <Link to="/reset-password" style={{ color:'white', textDecoration:'none' }}>Reset Password</Link>
              </li>
              <li>
                <button 
                   onClick={handleLogout} 
                   style={{ color:'white', background:'none', border:'none', cursor:'pointer' }}>
                   Logout
                 </button>
               </li>
            </>
          )}

          {!token && (
            <>
              <li>
                <Link to="/login" style={{ color:'white', textDecoration:'none' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ color:'white', textDecoration:'none' }}>Register</Link>
              </li>
            </>
          )}

        </ul>
      </div>

      {/* Small screens Menu */}
      {isOpen && (
        <ul
          style={{ 
            listStyle:'none', 
            padding:'20px 0', 
            margin:'0',
            background:'linear-gradient(90deg, #ff7e5f, #feb47b)', 
            color:'white'
          }}
          className="mobileMenu"
        >
          <li>
            <Link to="/" style={{ color:'white', textDecoration:'none' }}>Home</Link>
          </li>

          {token && (
            <>
              <li>
                <Link to="/dashboard" style={{ color:'white', textDecoration:'none' }}>Dashboard</Link>
              </li>
              <li>
                <Link to="/user-profile" style={{ color:'white', textDecoration:'none' }}>Profile</Link>
              </li>
              <li>
                <Link to="/reset-password" style={{ color:'white', textDecoration:'none' }}>Reset Password</Link>
              </li>
              <li>
                <button 
                   onClick={handleLogout} 
                   style={{ color:'white', background:'none', border:'none', cursor:'pointer' }}>
                   Logout
                 </button>
              </li>
            </>
          )}

          {!token && (
            <>
              <li>
                <Link to="/login" style={{ color:'white', textDecoration:'none' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ color:'white', textDecoration:'none' }}>Register</Link>
              </li>
            </>
          )}

        </ul>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktopMenu {
            display: none;
          }
          .menuBtn {
            display: block;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar;
