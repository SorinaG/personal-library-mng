import { Navigate } from "react-router-dom";

function PrivateRoute({ isSignedIn, children }) {
  return isSignedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
