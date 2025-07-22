import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../globalComonents/loading";

const ProtectedAuthRoute = ({ children }) => {
  const { token, UserRole, loading } = useSelector((state) => state.Token);

  if (loading) {
    return <Loading />;
  }

  if (token) {
    if (UserRole === "admin" || UserRole === "trader") {
      return <Navigate to="/Dashboard/Charts" replace />;
    } else {
      return <Navigate to="/Landing" replace />;
    }
  }

  return children;
};

export default ProtectedAuthRoute;
