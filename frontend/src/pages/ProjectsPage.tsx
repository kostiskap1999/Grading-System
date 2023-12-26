import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import { useNavigate, useSearchParams } from "react-router-dom";
import FileUpload from "../components/fileUpload";
import { fetchProjects } from "../api/projectsApi";
import { fetchAndSetupProjects, fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";
import { fetchTokenID, fetchTokenRole } from "../api/tokenApi";
import { ProjectEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";

export default function ProjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectModel>()

  
  const [user, setUser] = useState<UserModel>()

  const [rerender, setRerender] = useState<number>(0)

  const [userRole, setUserRole] = useState<number>(3)

  const [filterOptions, setFilterOptions] = useState<{value: string, label: string}[]>([{value: "my", label: "My Projects"}])  // my = my projects, supervising = for profs and admins
  const [filter, setFilter] = useState<string>("")
  const [filteredProjects, setFilteredProjects] = useState<ProjectModel[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const projectsOBJ: ProjectModel[] | null = (userRole <= 1) ? await fetchAndSetupProjects() : await fetchProjects()
      
      if(projectsOBJ){
        setProjects(projectsOBJ)
        const parsedID: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
        for(const project of projectsOBJ){
          if(project.id === parseInt(parsedID)){
            setSelectedProject(project)
            break;
          }
        } 
      }
    }

    fetchData()
  }, [rerender, userRole])

  useEffect(() => {
    const fetchRole = async () => {
      const role: number | null = await fetchTokenRole()
      if(role != null){
        setUserRole(role)
        if(role <= 1)
          setFilterOptions([...filterOptions, { value: "supervising", label: "Supervising Projects" }])
      } 
    }
    fetchRole()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const tokenID: number | null = await fetchTokenID()

      if(tokenID){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenID)
        userOBJ && setUser(userOBJ)
      }

      setFilter(filterOptions[0].value)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (filter === "my" && user)
      setFilteredProjects(user.getProjects())
    else if (filter === "supervising")
      setFilteredProjects([])

  }, [filter])

  return (
    <div className="page column">
      <div className="top-header text row">
        {userRole <= 1 ? <>
          <button style={{flex: 1, padding: 5, borderRadius: 2}} onClick={() => navigate('/new-project')}>New Project</button>
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
            {userRole <= 1 ?
              <ReactDropdown
                controlClassName="row center"
                menuClassName="dropdown-menu"        
                options={filterOptions}
                onChange={(option) => {setFilter(option.value);}}
                value={"My Projects"}
                placeholder={filter}
                arrowClosed={<KeyboardArrowDown/>}
                arrowOpen={<KeyboardArrowUp/>}
                className="dropdown-menu-root"
                baseClassName="center column dropdown-menu "
              />
            : <div>My Projects</div>
            }

          </div>
          <div className="column" style={{overflow:'scroll'}}>
            {filteredProjects.map((project, index) => (
              <button key={index} className="list-button"
                onClick={() => {navigate('/projects?id=' + project.id); setRerender(rerender+1)}}
              >
                <PageButtonDescription component={project} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="column container" style={{flex: 1, justifyContent:"space-between"}}>
            {selectedProject && selectedProject.id === -1 ? <></> : <>
              {selectedProject && <ProjectEntry project={selectedProject && selectedProject} userRole={userRole} />}
              <div className="center">
                {user && selectedProject ? user.hasProject(selectedProject.id) ?
                    <FileUpload user={user} project={selectedProject && selectedProject} />
                :
                    <div className="list-button text">You can not upload a submission because you have not joined this subject.</div>
                : <></>
                }
              </div>

              {userRole <= 1 && selectedProject ? <>
                <button className="list-button" onClick={() => {navigate('/submissions?project=' + selectedProject.id, {state: {project: selectedProject}})}} style={{margin: "20px"}}>See Submissions</button>
              </> : <div></div>}
            </>}
        </div>
      </div>
    </div>
  );
}
