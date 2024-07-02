import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) return null;
  console.log("You are logged in, loading your profile.");
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
