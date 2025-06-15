import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Verify from "./pages/Verify";
import Dashboard from "./pages/DashBoard";
import UserProfile from "./pages/UserProfile";
import UpdatePassword from "./components/auth/UpdatePassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/verify" element={<Verify />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
        <Route path="/update-password" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;
