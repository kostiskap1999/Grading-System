import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const auth = useSelector((store) => store.authenticated);

  console.log(auth)
  if (auth) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;
