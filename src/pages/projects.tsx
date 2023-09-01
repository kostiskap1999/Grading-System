import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Project } from "../model/project"
import { fetchAllProjectData } from "../fetches/helpers/massFetching"

export default function ProjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [projects, setProjects] = useState<Project[]>([new Project()])
  const [selectedProject, setSelectedProject] = useState<Project>(new Project())
  
  const [rerender, setRerender] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const projectsOBJ: Project[] = await fetchAllProjectData()
      setProjects(projectsOBJ)

      const parsedID: string = (params.get('id') == null) ? "" : params.get('id')!.toString()
      for(const project of projectsOBJ)
        if(project.id === parseInt(parsedID)){
          setSelectedProject(project)
          break;
        }
    }

    fetchData()
  }, [rerender])


  return (
    <div className="page row">
      <div style={{flex: 1.3}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">University Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {projects.map((project, index) => (
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
          <div className="small-text">{selectedProject.description}</div>
          <div className="column" style={{overflow:'scroll'}}>
            {selectedProject.submissions.map((submission, index) => (
              <button key={index} className="button"
              >
                {submission.student}
              </button>
            ))}
          </div>
          </>}
      </div>
    </div>
  );
}
