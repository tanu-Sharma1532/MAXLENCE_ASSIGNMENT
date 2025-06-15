import React, { useState } from "react";
import { register } from "../../services/api";

function Register() {
  const [formData, setFormData] = useState({ 
    email:'', 
    password:'', 
    first_name:'', 
    last_name:'', 
    phone_number:'', 
    address:'', 
    gender:'', 
    dob:''
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
  
  const handleFile = (e) => {
    setProfilePicture(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (profilePicture) form.append('profile_picture', profilePicture);

    try {
      console.log(register);
      await register(form);
      setMessage('Registration successful! Check your email to verify.');

    } catch (err) {
        console.log(err);
      setMessage(err?.response?.data?.message || "Registration failed.");
    }
  };
  
  return (
    <div style={{ 
      maxWidth:'400px', 
      margin:'50px auto', 
      padding:'30px', 
      border:'1px solid #ddd', 
      borderRadius:'10px', 
      boxShadow:'0 4px 10px 0px #0003',
      fontFamily:'Arial,sans-serif'
    }}>
      <h2 style={{ textAlign:'center', marginBottom:'20px' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          onChange={handleChange} 
          placeholder="Email" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="password" 
          onChange={handleChange} 
          type="password" 
          placeholder="Password" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="first_name" 
          onChange={handleChange} 
          placeholder="First Name" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="last_name" 
          onChange={handleChange} 
          placeholder="Last Name" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="phone_number" 
          onChange={handleChange} 
          placeholder="Phone Number" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="address" 
          onChange={handleChange} 
          placeholder="Address" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <input 
          name="dob" 
          onChange={handleChange} 
          type="date" 
          required 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}
        />
        <select 
          name="gender" 
          onChange={handleChange} 
          style={{ display:'block', marginBottom:'15px', padding:'10px', width:'100%' }}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input 
          name="profile_picture" 
          onChange={handleFile} 
          type="file" 
          style={{ display:'block', marginBottom:'15px' }}
        />
        {imagePreview && <img src={imagePreview} alt="Profile preview" style={{width:'100px', marginBottom:'15px'}} />}
        
        <button 
          type="submit" 
          style={{ 
            display:'block', 
            width:'100%', 
            padding:'10px', 
            background:'linear-gradient(90deg, #ff7e5f, #feb47b)', 
            color:'white', 
            border:'none', 
            borderRadius:'5px', 
            fontWeight:'bold',
            cursor:'pointer'
          }}>
          Register
        </button>
        {message && <p style={{ marginTop:'15px', color: message.startsWith('Registration successful') ? 'green' : 'red' }}>{message}</p>}
      </form>
    </div>
  )
}

export default Register;
