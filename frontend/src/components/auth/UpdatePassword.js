import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    // Extract token from URL
    const token = new URLSearchParams(location.search).get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setMessage("Please enter a password.");
            return;
        }
        if (!token) {
            setMessage("Invalid or missing token.");
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const authToken = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/auth/reset-password",
                { password, token },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );

            setMessage(res?.data?.message || "Your password has been reset.");
        } catch (err) {
            setMessage(err?.response?.data?.message || "Reset failed.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center', 
            height:'100vh', 
            background:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 
            fontFamily:'Arial,sans-serif'
        }}>
            <form 
                onSubmit={handleSubmit} 
                style={{ 
                    background:'white', 
                    padding:'30px', 
                    borderRadius:'10px', 
                    boxShadow:'0 6px 20px -5px #0003', 
                    width:'300px',
                    textAlign:'center'
                }}
            >
                <h2 style={{ color:'#ff7e5f', marginBottom:'20px' }}>Reset Password</h2>

                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    disabled={loading}
                    value={password}
                    style={{ 
                        width:'100%', 
                        padding:'10px', 
                        marginBottom:'20px', 
                        border:'1px solid #ff7e5f', 
                        borderRadius:'5px'
                    }}
                />
                
                <button
                    disabled={loading}
                    style={{ 
                        width:'100%', 
                        padding:'10px', 
                        background:'#ff7e5f', 
                        color:'white', 
                        border:'none', 
                        borderRadius:'5px', 
                        fontWeight:'bold',
                        cursor:'pointer'
                    }}
                >
                    {loading ? "Resetting…" : "Reset Password"}
                </button>

                {message && (
                    <p style={{ marginTop:'20px', color:'#ff7e5f' }}>{message}</p>
                )}

            </form>
        </div>
    )
}

export default UpdatePassword;
