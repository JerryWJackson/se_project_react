import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, anonymous = false }) {
  const location = useLocation();
  const fromPage = location.state?.from || "/";

  console.log("ProtectedRoute - isLoggedIn:", isLoggedIn);
  console.log("ProtectedRoute - Location State:", location.state);

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: fromPage }} />;
  } else {
    return children;
  }
  children;
}

export default ProtectedRoute;
