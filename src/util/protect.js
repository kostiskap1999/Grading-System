import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((store) => store.authenticated);

  console.log(auth)
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
