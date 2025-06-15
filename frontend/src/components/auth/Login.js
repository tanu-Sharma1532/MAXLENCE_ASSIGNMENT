import React, { useState } from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data?.token);
            setMessage('Login successful');
            navigate('/dashboard'); // Redirect after successful login
        } catch (err) {
            setMessage(err?.response?.data?.message || "Login failed.");
        }
    };
  
    return (
      <div
        style={{ 
          maxWidth:'400px',
          margin:'100px auto',
          padding:'30px',
          background:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          borderRadius:'20px',
          boxShadow:'0 6px 20px -5px #0003',
          fontFamily:'Arial,sans-serif',
          textAlign:'center'
        }}
      >
        <h2 style={{ marginBottom:'20px', color:'#ff7e5f' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ 
              display:'block',
              width:'100%',
              marginBottom:'15px',
              padding:'10px',
              border:'none',
              borderRadius:'8px',
              boxShadow:'inset 0 2px 4px #0003'
            }}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Pass"
            type="password"
            required
            style={{ 
              display:'block',
              width:'100%',
              marginBottom:'15px',
              padding:'10px',
              border:'none',
              borderRadius:'8px',
              boxShadow:'inset 0 2px 4px #0003'
            }}
          />
          <button
            style={{ 
              padding:'10px 20px',
              background:'#ff7e5f',
              color:'white',
              fontWeight:'bold',
              border:'none',
              borderRadius:'8px',
              cursor:'pointer',
              boxShadow:'0 4px 10px 0px #0003'
            }}
          >Login</button>
        </form>

        {message && <p style={{ marginTop:'20px', color: message === "Login successful" ? "green" : "red" }}>{message}</p>}
      </div>
    )
}

export default Login;
