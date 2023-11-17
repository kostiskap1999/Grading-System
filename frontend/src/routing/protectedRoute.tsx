import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface IProtectedRouteProps{
  children: ReactNode,
  protectionLevel: number
}

const ProtectedRoute = ({children, protectionLevel}: IProtectedRouteProps) => {
  
  var auth = useSelector((store: any) => store.authenticated);
  
  const cookies: Cookies = new Cookies();
  const userRole: number = cookies.get('role-temp') // temporary solution

  if(((userRole >= 2 && protectionLevel > 1)) || (userRole === 1 && protectionLevel > 2))
    auth = false

  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
