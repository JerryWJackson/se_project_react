import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
