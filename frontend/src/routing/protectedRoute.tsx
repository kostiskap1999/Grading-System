import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IProtectedRouteProps{
  children: ReactNode,
  protectionLevel: number
}

const ProtectedRoute = ({children, protectionLevel}: IProtectedRouteProps) => {
  
  const auth = useSelector((store: any) => store.authenticated);
  // var isUnauthorised = true
  // var userRole = ""
  //   useEffect(() => {
  //   async function getUserRole() {
  //     userRole = await fetchUserRole()
  //   }

  //   getUserRole();
  // });
  
  // if(((userRole === 3 && protectionLevel <= 1) ) || (userRole === 2 && protectionLevel <= 1) || (userRole === 1 && protectionLevel <= 2) || (userRole === 0 && protectionLevel <= 3))
  //   isUnauthorised = false

  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
