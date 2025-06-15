import { Navigate } from "react-router-dom";

// checks for JWT in localStorage
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default ProtectedRoute;
