import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const fromPage = location.state?.from || "/";

  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  } else {
    return <Navigate to={from} />;
  }

  return children;
}

export default ProtectedRoute;
