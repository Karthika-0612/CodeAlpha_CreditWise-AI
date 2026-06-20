import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

export default function PublicRoute({ children }) {
  const location = useLocation();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
}
