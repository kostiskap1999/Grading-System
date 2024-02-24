import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchTokenRole } from '../api/tokenApi';

interface IPublicRouteProps{
  children: ReactNode
}

const PublicRoute: React.FC<IPublicRouteProps> = ({ children }) => {
    const [auth, setAuth] = useState<boolean>(useSelector((store: any) => store.authenticated))
    const [loaded, setLoaded] = useState<boolean>(false)
    useEffect(() => {
      const fetchData = async () => {
        const role = await fetchTokenRole()
        if(role == null || role == undefined)
          setAuth(false)
          
        setLoaded(true)
      }
      fetchData()
    }, [])
  
    if(loaded){
      if (auth)
          return <Navigate to="/home" replace />
      else
          return children
    }
}

export default PublicRoute;
