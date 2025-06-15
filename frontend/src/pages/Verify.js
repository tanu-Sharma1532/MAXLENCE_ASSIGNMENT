import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function Verify() {
  const [message, setMessage] = useState("Verifying your email, please wait...");
  const isCalled = useRef(false);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (isCalled.current) return;
    isCalled.current = true;

    if (token) {
      axios
        .get(`http://localhost:3000/auth/verify?token=${token}`)
        .then((res) => setMessage("Your email has been successfully verified!"))
        .catch((err) =>
          setMessage(err?.response?.data?.message || "Invalid or expire link.")
        );
    }
  }, [token]);

  return (
    <div
      style={{ 
        textAlign:'center',
        padding:'50px',
        fontFamily:'Arial,sans-serif',
        maxWidth:'500px',
        margin:'50px auto',
        background:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        borderRadius:'20px',
        boxShadow:'0 6px 20px -5px #0003'
      }}
    >
      <h1>{message}</h1>

      {message === "Your email has been successfully verified!" && (
        <>
          <p>Your account is now active and ready to use.</p>
          <p>Click below to login and start exploring.</p>
          <Link to="/login">
            <button
              style={{ 
                marginTop:'20px',
                padding:'10px 20px',
                background:'#ff7e5f',
                color:'white',
                fontSize:'1rem',
                fontWeight:'bold',
                border:'none',
                borderRadius:'8px',
                cursor:'pointer',
                boxShadow:'0 4px 10px 0px #0003'
              }}
            >
              Log in now
            </button>
          </Link>
        </>
      )}

      {message !== "Your email has been successfully verified!" && (
        <p>Please check your link or try again later.</p>
      )}

    </div>
  )
}

export default Verify;
