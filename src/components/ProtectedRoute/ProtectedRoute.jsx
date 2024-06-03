import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
