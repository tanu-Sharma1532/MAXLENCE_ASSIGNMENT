import React from "react";
import img from "../public/images/english-for-chatting.jpg";

function Home() {
  return (
    <div
      style={{ 
        textAlign: "center", 
        padding: "50px 20px", 
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        marginTop:("-30px"), // <- this pulls everything up a bit
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Welcome to Our Platform</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Your account, your way. Update your profile or explore other members! 
      </p>
      <img 
        src={img}
        alt="Welcome" 
        style={{ 
          marginTop: "20px", 
          borderRadius: "10px", 
          boxShadow: "0 4px 10px 0px #0003", 
          maxWidth: "100%", 
          height: "auto" 
        }}
      />
    </div>
  )
}

export default Home;
