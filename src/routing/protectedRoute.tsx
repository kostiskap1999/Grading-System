import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode, useEffect, useState } from "react";
import { CheckToken } from "../fetches/helpers/tokenHelpers";

interface IProtectedRouteProps{
  children: ReactNode
}

const ProtectedRoute = ({children}: IProtectedRouteProps) => {
  var isAuthorised = false
  const auth = useSelector((store: any) => store.authenticated);

  useEffect(() => {
    async function checkAuthorization() {
      const authorized = await CheckToken()
      isAuthorised = authorized
    }

    checkAuthorization();
  }, []);

  if (!auth || isAuthorised) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
