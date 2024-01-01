import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/fileUpload";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";
import { fetchTokenId } from "../api/tokenApi";
import { ProjectEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCheckCircle, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

export default function ProjectsPage() {
  const navigate = useNavigate()
  const url = new URL(window.location.href)
  const params = url.searchParams

  const [user, setUser] = useState<UserModel>()

  const [selectedProject, setSelectedProject] = useState<ProjectModel>()
  
  const [rerender, setRerender] = useState<number>(0)

  const [filterValues, setFilterValues] = useState<{submitted: number, graded: number, deadline: number, supervising: number}>({
    submitted: params.get('submitted') ? parseInt(params.get('submitted') as string) : 0,
    graded: params.get('graded') ? parseInt(params.get('graded') as string) : 0,
    deadline: params.get('deadline') ? parseInt(params.get('deadline') as string) : 0,
    supervising: params.get('supervising') ? parseInt(params.get('supervising') as string) : 0,
    }) // -1 negative, 0 neutral, 1 positive
  const [filteredProjects, setFilteredProjects] = useState<ProjectModel[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const tokenId: number | null = await fetchTokenId()

      if(tokenId){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenId)
        userOBJ && setUser(userOBJ)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if(user){
      const parsedId: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
      for(const project of user.getProjects())
        if(project.id === parseInt(parsedId)){
          setSelectedProject(project)
          break;
        }
    }
}, [rerender, user])

  useEffect(() => {
    if(user)
        setFilteredProjects(user.getProjects({filterSubmitted: filterValues['submitted'], filterDeadline: filterValues['deadline'], filterGrades: filterValues['graded'], filterSupervising: filterValues['supervising']}))
  }, [filterValues, user])

  const changeFilterValue = (prop: keyof typeof filterValues) => {
    if (filterValues[prop] === 1) {
      setFilterValues((prevFilterValues) => {
        const updatedValues = { ...prevFilterValues }
        updatedValues[prop] = -1
        url.searchParams.set(prop, '-1')
        window.history.replaceState(null, '', url.toString())
        return updatedValues
      })
    } else {
      setFilterValues((prevFilterValues) => {
        const updatedValues = { ...prevFilterValues }
        updatedValues[prop] = updatedValues[prop] + 1
        url.searchParams.set(prop, (updatedValues[prop]).toString())
        window.history.replaceState(null, '', url.toString())
        return updatedValues
      })
    }
  }
  
  return (
    <div className="page column">
      <div className="top-header medium-text row">
        {user && user.role <= 1 ? <>
          <button className="button" style={{flex: 1, padding: 5, borderRadius: 2}} onClick={() => navigate('/new-project')}>New Project</button>
        </> : <div style={{flex: 1}}></div>}
        <div className="medium-text center column" style={{flex: 4}}>
          <div>This is a list of all the projects. You can participate in all the projects whose subjects you follow.</div>
          <div className="row">
            <div>There are pending projects from subjects.</div>
          </div>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="row"  style={{flex: 6}}>
        <div className="column container" style={{flex: 0.8}}>
          <div className="medium-text row center header-title">
              <div className="row" style={{flex: 1, justifyContent: 'flex-start'}}>
                {user && user.role <= 1 ?
                  <button className="filter-button icon-button-small" title={"Filter supervised projects"} style={filterValues['supervising'] == -1 ? {color: "firebrick"} : filterValues['supervising'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('supervising')}>
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </button>
                : <></>
                }
              </div>
                <div style={{flex: 1}}>Project List</div>
              <div className="row" style={{flex: 1, justifyContent: 'flex-end'}}>
                <button className="filter-button icon-button-small" title={"Filter submitted projects"} style={filterValues['submitted'] == -1 ? {color: "firebrick"} : filterValues['submitted'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('submitted')}>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
                <button className="filter-button icon-button-small" title={"Filter graded projects"} style={filterValues['graded'] == -1 ? {color: "firebrick"} : filterValues['graded'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('graded')}>
                  <FontAwesomeIcon icon={faStar} />
                </button>
                <button className="filter-button icon-button-small" title={"Filter by active deadline"} style={filterValues['deadline'] == -1 ? {color: "firebrick"} : filterValues['deadline'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('deadline')}>
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </div>
          </div>
          <div className="column" style={{overflow:'scroll'}}>
            {filteredProjects.map((project, index) => (
              <button key={index} className="list-button"
                onClick={() => {
                    url.searchParams.set('id', project.id.toString())
                    window.history.replaceState(null, '', url.toString())
                    setRerender(rerender+1)
                }}
              >
                <PageButtonDescription component={project} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="column container" style={{flex: 1, justifyContent:"space-between"}}>
            {selectedProject && selectedProject.id === -1 ? <></> : <>
              {selectedProject && <ProjectEntry project={selectedProject && selectedProject} userRole={user?.role} />}
              <div className="center">
                {selectedProject && <>
                  {user && user.role > 1 ? <>
                    {user.hasProject(selectedProject.id) ?
                      <FileUpload user={user} project={selectedProject} />
                    :
                      <div className="list-button medium-text">You can not upload a submission because you have not joined this subject.</div>
                    }
                  </>:
                    <button className="list-button" onClick={() => {navigate('/submissions?project=' + selectedProject.id, {state: {project: selectedProject}})}} style={{margin: "20px"}}>See Submissions</button>
                  }
                </>}
              </div>
            </>}
        </div>
      </div>
    </div>
  );
}
