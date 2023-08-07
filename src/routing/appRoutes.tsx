import { RouteType } from "./config";

import HomePage from "../pages/home";
import LoginPage from "../pages/login";

import Home from '@mui/icons-material/Home';
import ProjectsPage from "../pages/projects";
import SubjectsPage from "../pages/subjects";
import { Class, Code } from "@mui/icons-material";

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
    path: "/home",
    sidebarProps: {
      displayText: "Home",
      icon: <Home/>
    }
  },
  {
    protected: true,
    element: <SubjectsPage/>,
    path: "/subjects",
    sidebarProps: {
      displayText: "Subjects",
      icon: <Class/>
    }
  },
  {
    protected: true,
    element: <ProjectsPage/>,
    path: "/projects",
    sidebarProps: {
      displayText: "Projects",
      icon: <Code/>
    }
  }
]

export default appRoutes;