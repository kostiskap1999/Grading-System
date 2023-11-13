import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IPublicRouteProps{
  children: ReactNode
}

const PublicRoute = ({children}: IPublicRouteProps) => {
  const auth = useSelector((store: any) => store.authenticated);

  if (auth) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default PublicRoute;
