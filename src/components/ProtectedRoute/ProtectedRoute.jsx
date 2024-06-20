import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, anonymous = false }) {
  const location = useLocation();
  const fromPage = location.state?.from || "/";

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" replace state={{ from: fromPage }} />;
  } else {
    return <Navigate to={fromPage} />;
  }
}

export default ProtectedRoute;
