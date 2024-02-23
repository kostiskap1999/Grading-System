import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchTokenRole } from "../api/tokenApi";

interface IProtectedRouteProps{
  children: ReactNode,
  protectionLevel: number
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, protectionLevel }) => {
  const [auth, setAuth] = useState<boolean>(useSelector((store: any) => store.authenticated))
  const [loaded, setLoaded] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      const role = await fetchTokenRole()
      if(role == null || role == undefined)
        setAuth(false)
      else
        if (((role >= 2 && protectionLevel > 1) || (role === 1 && protectionLevel > 2)))
            setAuth(false)
        
      setLoaded(true)
    }
    fetchData()
  }, [])

  if(loaded){
    if (!auth){
        return <Navigate to="/" replace />
      }else
        
    
      return children
  }
}

export default ProtectedRoute
