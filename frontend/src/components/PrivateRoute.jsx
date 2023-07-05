import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const token = useSelector((store) => store.auth.token);
  return !!token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
