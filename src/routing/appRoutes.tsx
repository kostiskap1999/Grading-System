import { RouteType } from "./config";

import HomePage from "../pages/home";
import LoginPage from "../pages/login";


const appRoutes: RouteType[] = [
  {
    index: true,
    protected: false,
    element: <LoginPage/>,
    path: "/"
  },
  {
    protected: true,
    element: <HomePage/>,
    path: "/home"
  }
]

export default appRoutes;