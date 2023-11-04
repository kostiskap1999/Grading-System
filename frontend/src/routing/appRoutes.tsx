import { RouteType } from "./config";

import HomePage from "../pages/home";
import LoginPage from "../pages/login";

import Home from '@mui/icons-material/Home';
import ProjectsPage from "../pages/projects";
import SubjectsPage from "../pages/subjects";
import { Class, Code } from "@mui/icons-material";
import NewProjectPage from "../pages/newProject";

const appRoutes: RouteType[] = [
  {
    index: true,
    protected: 0,
    element: <LoginPage/>,
    path: "/"
  },
  {
    protected: 1,
    element: <HomePage/>,
    path: "/home",
    sidebarProps: {
      displayText: "Home",
      icon: <Home/>
    }
  },
  {
    protected: 1,
    element: <SubjectsPage/>,
    path: "/subjects",
    sidebarProps: {
      displayText: "Subjects",
      icon: <Class/>
    }
  },
  {
    protected: 1,
    element: <ProjectsPage/>,
    path: "/projects",
    sidebarProps: {
      displayText: "Projects",
      icon: <Code/>
    }
  },
  {
    protected: 2,
    element: <NewProjectPage/>,
    path: "/new-project"
  }
]

export default appRoutes;