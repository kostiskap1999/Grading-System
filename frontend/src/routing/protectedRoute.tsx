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
  
  // if(((userRole === "user" && protectionLevel <= 1) ) || (userRole === "student" && protectionLevel <= 1) || (userRole === "professor" && protectionLevel <= 2) || (userRole === "admin" && protectionLevel <= 3))
  //   isUnauthorised = false

  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
