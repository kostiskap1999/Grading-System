import { useEffect, ChangeEvent, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "../model/project"
import { fetchAllProjectData, fetchAllUserData } from "../fetches/helpers/massFetching"
import FileUpload from "../components/fileUpload";
import { fetchUserRole } from "../fetches/helpers/userHelpers";
import ReactDropdown, { Option } from "react-dropdown";
import { Filter, FilterAlt, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { User } from "../model/user";

export default function NewProjectPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [projects, setProjects] = useState<Project[]>([new Project()])
  const [selectedProject, setSelectedProject] = useState<Project>(new Project())
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([new Project()])
  
  const [user, setUser] = useState<User>(new User())

  const [rerender, setRerender] = useState<number>(0)

  const [userRole, setUserRole] = useState<string>("")

  const filterOptions = [
    {value: "my", label: "My Projects"},
    {value: "all", label: "Available Projects"},
    {value: "supervising", label: "Supervising Projects"}]  // my = my projects, all = all projects, supervising = for profs and admins
  const [filter, setFilter] = useState<string>("")

  
  useEffect(() => {
    const fetchData = async () => {
      const projectsOBJ: Project[] = await fetchAllProjectData()
      setProjects(projectsOBJ)
      // setFilter(filterOptions[0].value)
      const parsedID: string = (params.get('id') == null) ? "" : params.get('id')!.toString()
      for(const project of projectsOBJ){
        if(project.id === parseInt(parsedID)){
          setSelectedProject(project)
          break;
        }
      } 
    }

    fetchData()
  }, [rerender])

  useEffect(() => {
    const fetchRole = async () => {
      setUserRole(await fetchUserRole())
    }
    fetchRole()
  }, [userRole])

  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: User = await fetchAllUserData()
      setUser(userOBJ)
      setFilter(filterOptions[0].value)
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log("filteredProjects")
    if (filter === "my")
      setFilteredProjects(user.getProjects())
    else if (filter === "all")
      setFilteredProjects(projects)
    else if (filter === "supervising")
      setFilteredProjects([])
    else
      console.log("ti")

  }, [filter])

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title row">
      <div style={{flex: 1}}></div>
        <div className="text center column" style={{flex: 4}}>
          <div>New Project Page.</div>
          <div className="row">
            <div>There are pending projects from subjects.</div>
          </div>
        </div>
        <div style={{flex: 1}}></div>
      </div>
    </div>
  );
}
