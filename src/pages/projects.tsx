import { useEffect, ChangeEvent, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "../model/project"
import { fetchAllProjectData, fetchAllUserData } from "../fetches/helpers/massFetching"
import FileUpload from "../components/fileUpload";
import { fetchUserRole } from "../fetches/helpers/userHelpers";
import ReactDropdown, { Option } from "react-dropdown";
import { Filter, FilterAlt, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { User } from "../model/user";

export default function ProjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [projects, setProjects] = useState<Project[]>([new Project()])
  const [selectedProject, setSelectedProject] = useState<Project>(new Project())
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([new Project()])
  
  const [user, setUser] = useState<User>(new User())

  const [rerender, setRerender] = useState<number>(0)

  const [userRole, setUserRole] = useState<string>("")

  const filterOptions = [
    {value: "all", label: "University Projects"},
    {value: "my", label: "My Projects"},
    {value: "supervising", label: "Supervising Projects"}]  // my = my projects, all = all projects, supervising = for profs and admins
  const [filter, setFilter] = useState<string>("")

  
  useEffect(() => {
    const fetchData = async () => {
      const projectsOBJ: Project[] = await fetchAllProjectData()
      setProjects(projectsOBJ)
      setFilter(filterOptions[0].value)
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
    <div className="page row">
      <div style={{flex: 0.8}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">
            <ReactDropdown
              controlClassName="row center"
              menuClassName="dropdown-menu"        
              options={filterOptions}
              onChange={(option) => {console.log(option); setFilter(option.value);}}
              value={"University Projects"}
              placeholder={filter}
              arrowClosed={<KeyboardArrowDown/>}
              arrowOpen={<KeyboardArrowUp/>}
            />
          </div>
          <div className="column" style={{overflow:'scroll'}}>
            {filteredProjects.map((project, index) => (
              <button key={index} className="button"
                onClick={() => {navigate('/projects?id=' + project.id); setRerender(rerender+1)}}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="column" style={{flex: 1, padding:"10px"}}>
          {selectedProject.id == -1 ? <></> : <>
          <div className="center" style={{padding:"30px"}}>
            <div className="header-text">{selectedProject.name}</div>
            <div className="small-text">Deadline: {selectedProject.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })}</div>
          </div>
          <div style={{margin: "20px"}}>
            <div className="large-text center">Project Description</div>
            <div className="small-text">{selectedProject.description}</div>
          </div>
          
          <FileUpload />
          
          {userRole == "professor" || userRole == "admin" ? <>          
            <div className="large-text center" style={{margin: "20px"}}>List of Submissions</div>
            <div className="column" style={{overflow:'scroll'}}>
              {selectedProject.submissions.map((submission, index) => (
                <button key={index} className="button" style={{padding: "20px"}}
                >
                  {submission?.student?.username}
                </button>
              ))}
            </div>
          </> : <></>}
          </>}
      </div>
    </div>
  );
}
