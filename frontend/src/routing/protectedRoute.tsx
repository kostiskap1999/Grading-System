import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { fetchTokenRole } from "../api/tokenApi";

interface IProtectedRouteProps{
  children: ReactNode,
  protectionLevel: number
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, protectionLevel }) => {
  var auth = useSelector((store: any) => store.authenticated)
  const [userRole, setUserRole] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const role = await fetchTokenRole()
      if(!role)
        return
      setUserRole(role);
      
      if (((role >= 2 && protectionLevel > 1) || (role === 1 && protectionLevel > 2)))
        auth = false
    }
    fetchData()
  }, [])

  if (!auth)
    return <Navigate to="/" replace />

  return children
}

export default ProtectedRoute
