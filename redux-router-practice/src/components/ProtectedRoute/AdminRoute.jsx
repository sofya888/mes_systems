import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((s) => s.auth);
  const location = useLocation();
  if (loading) return <div>Загрузка...</div>;
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default AdminRoute;
