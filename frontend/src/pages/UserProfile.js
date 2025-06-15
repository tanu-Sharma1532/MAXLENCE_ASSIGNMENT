import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
    const [user, setUser] = useState({});
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [profile_file, setProfileFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:3000/user/getUserById", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data.user);
                setFirstName(res.data.user?.first_name);
                setLastName(res.data.user?.last_name);
                setPhone(res.data.user?.phone_number);
                setAddress(res.data.user?.address);
                setDob(res.data.user?.dob?.split('T')[0]);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch profile.");
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("phone_number", phone_number);
        formData.append("address", address);
        formData.append("dob", dob);
        if (profile_file) formData.append("profile_picture", profile_file);

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post("http://localhost:3000/user/update", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess("Profile updated successfully!");
            setUser(res.data.user);
        } catch (err) {
            setError("Profile update failed.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color:'red'}}>{error}</p>;
    return (
        <div
            style={{ 
                maxWidth:'500px',
                margin:'100px auto',
                padding:'30px',
                background:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius:'20px',
                boxShadow:'0 6px 20px -5px #0003',
                fontFamily:'Helvetica, Arial, sans-serif',
                transition:'all 0.3s ease',
                width:'90%' // responsive, adjusts to small screens
            }}
        >
            <h2 style={{ color: "#ff7e5f", marginBottom:'30px', textAlign:'center', fontSize:'24px', fontWeight:'bold' }}>User Profile</h2>

            {success && <p style={{ color:'green', marginBottom:'20px', fontWeight:'bold'}}>{success}</p>}

            {user?.profile_picture && (
                <div style={{ textAlign:'center', marginBottom:'20px' }}>
                    <img src={`http://localhost:3000${user.profile_picture}`}
                         alt="Profile"
                         style={{ width:'100px', height:'100px', borderRadius:'50%', boxShadow:'0 4px 6px -1px #0003' }} />
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>First Name</label>
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>Last Name</label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>Phone Number</label>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <div style={{ marginBottom:'20px' }}>
                    <label style={{ display:'block', marginBottom:'8px', fontWeight:'bold' }}>Profile Picture</label>
                    <input
                        type="file"
                        onChange={(e) => setProfileFile(e.target.files[0])}
                        style={{ width:'100%', padding:'10px', border:'none', borderRadius:'10px', boxShadow:'0 4px 6px -1px #0003' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{ width:'100%', padding:'10px 20px', background:'#ff7e5f', color:'white', fontWeight:'bold', border:'none', borderRadius:'10px', cursor:'pointer', boxShadow:'0 4px 6px -1px #0003', transition:'all 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.background = "#ff956f"}
                    onMouseOut={(e) => e.target.style.background = "#ff7e5f"}
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default UserProfile;
