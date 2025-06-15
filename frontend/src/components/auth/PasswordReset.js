import React, { useState } from "react";
import axios from "axios";

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter a valid email.");
            return;
        }
        
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem("token"); // if you need Auth

            const res = await axios.post(
                "http://localhost:3000/auth/request-reset",
                { email },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(res?.data?.message || "Reset password link has been sent.");
        } catch (err) {
            setMessage(err?.response?.data?.message || "Reset failed.");
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <div
            style={{ 
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                height:'100vh',
                background:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                fontFamily:'Arial,sans-serif',
                padding:'20px'
            }}
        >
            <form 
                onSubmit={handleSubmit} 
                style={{ 
                    background:'white',
                    padding:'30px',
                    borderRadius:'10px',
                    boxShadow:'0 6px 20px -5px #0003',
                    width:'100%',
                    maxWidth:'350px',
                    textAlign:'center'
                }}
            >
                <h2 style={{ color: '#ff7e5f', marginBottom:'20px' }}>Reset Password</h2>

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    value={email}
                    style={{ 
                        width:'100%',
                        padding:'10px',
                        marginBottom:'20px',
                        border:'1px solid #ff7e5f',
                        borderRadius:'5px',
                        outline:'none',
                        fontSize:'1em'
                    }}
                />

                <button
                    disabled={loading}
                    style={{ 
                        width:'100%',
                        padding:'10px',
                        background:'#ff7e5f',
                        color:'white',
                        fontWeight:'bold',
                        border:'none',
                        borderRadius:'5px',
                        cursor:'pointer',
                        fontSize:'1em'
                    }}
                >
                    {loading ? "Sending…" : "Send Reset Link"}
                </button>

                {message && (
                    <p style={{ marginTop:'20px', color:'#ff7e5f', fontWeight:'bold' }}>
                        {message}
                    </p>
                )}

            </form>
        </div>
    )
}

export default PasswordReset;
