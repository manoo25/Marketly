import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../globalComonents/loading";

const ProtectedDashboardRoute = ({ children }) => {
  const { token, UserRole, loading } = useSelector((state) => state.Token);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return <Navigate to="/SigninPage" state={{ from: location }} replace />;
  }

  if (UserRole === "user") {
    return <Navigate to="/Landing" replace />;
  }

  return children;
};

export default ProtectedDashboardRoute;
