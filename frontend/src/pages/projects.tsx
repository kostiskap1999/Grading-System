import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import FileUpload from "../components/fileUpload";
import { fetchProjects } from "../fetches/fetchProjects";
import { fetchAndSetupProjects, fetchAndSetupUser } from "../fetches/helpers/massFetching";
import { Project } from "../model/project";
import { User } from "../model/user";
import { fetchTokenID, fetchTokenRole } from "../fetches/fetchToken";

export default function ProjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [projects, setProjects] = useState<Project[]>([new Project()])
  const [selectedProject, setSelectedProject] = useState<Project>(new Project())

  
  const [user, setUser] = useState<User>(new User())

  const [rerender, setRerender] = useState<number>(0)

  const [userRole, setUserRole] = useState<number>(3)

  const filterOptions = [
    {value: "my", label: "My Projects"},
    {value: "available", label: "Available Projects"},
    {value: "all", label: "All Projects"},
    {value: "supervising", label: "Supervising Projects"}]  // my = my projects, all = all projects, supervising = for profs and admins
  const [filter, setFilter] = useState<string>("")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([new Project()])
  
  useEffect(() => {
    const fetchData = async () => {
      const projectsOBJ: Project[] = (userRole <= 1) ? await fetchAndSetupProjects() : await fetchProjects()
      setProjects(projectsOBJ)
      const parsedID: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
      for(const project of projectsOBJ){
        if(project.id === parseInt(parsedID)){
          setSelectedProject(project)
          break;
        }
      } 
    }

    fetchData()
  }, [rerender, userRole])

  useEffect(() => {
    const fetchRole = async () => {
      setUserRole(await fetchTokenRole())
    }
    fetchRole()
  }, [userRole])

  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: User = await fetchAndSetupUser(await fetchTokenID())
      setUser(userOBJ)
      setFilter(filterOptions[0].value)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (filter === "my")
      setFilteredProjects(user.getProjects())
    else if (filter === "available")
      setFilteredProjects(projects.filter(project => !user.getProjects().map(project => project.id).includes(project.id))) //get user project' ids and if they are included in the total projects list, filter them out
    else if (filter === "all")
      setFilteredProjects(projects)
    else if (filter === "supervising")
      setFilteredProjects([])

  }, [filter])

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title row">
        {userRole <= 1 ? <>
          <button style={{flex: 1}} onClick={() => navigate('/new-project')}>New Project</button>
        </> : <div style={{flex: 1}}></div>}
        <div className="text center column" style={{flex: 4}}>
          <div>This is a list of all the projects. You can participate in all the projects whose subjects you follow.</div>
          <div className="row">
            <div>There are pending projects from subjects.</div>
          </div>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="row"  style={{flex: 6}}>
        <div className="column container" style={{flex: 0.8}}>
          <div className="text center header-title">
            <ReactDropdown
              controlClassName="row center"
              menuClassName="dropdown-menu"        
              options={filterOptions}
              onChange={(option) => {setFilter(option.value);}}
              value={"My Projects"}
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
        
        <div className="column container" style={{flex: 1, padding:"10px", justifyContent:"space-between"}}>
            {selectedProject.id === -1 ? <></> : <>
            <div>
              <div className="center" style={{padding:"30px"}}>
                <div className="header-text">{selectedProject.name}</div>
                <div className="small-text">Deadline: {selectedProject.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })}</div>
              </div>
              <div style={{margin: "20px"}}>
                <div className="large-text center">Project Description</div>
                <div className="small-text">{selectedProject.description}</div>
              </div>
            </div>
            {user.hasProject(selectedProject.id) ?
              <FileUpload user={user} pID={selectedProject.id} />
            :
              <div className="button">You can not upload a submission for a subject you are not joined. Please join subject and try again.</div>
            }
            
            
            {userRole <= 1 ? <>
              <button className="button" onClick={() => {navigate('/submissions?project=' + selectedProject.id, {state: {project: selectedProject}})}} style={{margin: "20px"}}>See Submissions</button>
            </> : <></>}
            </>}
        </div>
      </div>
    </div>
  );
}
