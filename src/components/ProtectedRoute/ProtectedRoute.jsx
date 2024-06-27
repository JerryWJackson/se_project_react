import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isLoggedIn }) {
  if (isLoggedIn) return null;
  console.log("You are logged in, loading your profile.");
  return loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
