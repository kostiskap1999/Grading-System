import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAllUserData } from "../fetches/helpers/massFetching"
import { User } from "../model/user";
import Cookies from "universal-cookie";
import { Project } from "../model/project";
import { Subject } from "../model/subject";
import { fetchSubjects, fetchSupervisingSubjects } from "../fetches/fetchSubjects";
import { postProject } from "../fetches/fetchProjects";

export default function NewProjectPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()
  
  const [user, setUser] = useState<User>(new User())

  const [supervisingSubjects, setSupervisingSubjects] = useState<Subject[]>([])
  
  const [newProject, setNewProject] = useState<Project>(new Project())

  const [projectCreated, setProjectCreated] = useState<boolean | void>(undefined)

  useEffect(() => {
    const fetchSupervisingSubjects = async () => {
      
    }
    fetchSupervisingSubjects()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const cookies: Cookies = new Cookies();
      const userID: number = cookies.get('user_id')
      const userOBJ: User = await fetchAllUserData(userID)
      setUser(userOBJ)
    
      // const supSubjects: Subject[] = await fetchSupervisingSubjects(userID)
      const supSubjects: Subject[] = await fetchSubjects()
      setSupervisingSubjects(supSubjects)
    }

    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    const project: Project = newProject
    switch(event.target.id) {
      case "name" :
        project.name = event.target.value
        break
      case "deadline" :
        project.deadline = event.target.value
        break
      case "subject_id" :
        project.subjectID = parseInt(event.target.value)
        break
      case "description" :
        project.description = event.target.value
        break
      default:
        console.log("error")
        break
    }
  }

  const createProject = async (event: React.FormEvent) => {
    event.preventDefault()
    const created = await postProject(newProject)
    setProjectCreated(created)
  }

  return (
    <div className="page column">
      <div className="header-title text center column">
        New Project Page
      </div>
      <form className="form text" onSubmit={createProject}>
        <section>
          <header className="header-text">Characteristics</header>
          <div>
            <label>
              <span>Name</span>
              <input id="name" placeholder="Enter project here" required onChange={handleChange}/>
            </label>
            <label>
              <span>Deadline</span>
              <input id="deadline" type="date" required onChange={handleChange}/>
            </label>
            <label>
              <span>Subject</span>
              <select id="subject_id" required onChange={handleChange}>
                <option id="no" value="">No Subject Selected</option>
                {supervisingSubjects.map((subject, index) => 
                  <option key={index} id={subject.name} value={subject.id}>{subject.name}</option>
                )}
              </select>
            </label>
            <label>
              <span>Description</span>
              <textarea id="description" rows={5} cols={30} required placeholder="Enter description here" onChange={handleChange}/>
            </label>
          </div>
        </section>
        {projectCreated == undefined ?
          <div></div> :
          projectCreated == true ?
            <div>Project created successfully</div> :
            <div>Failed to create project</div>
        }
        <input type="submit" value={"Create Project"}/>
      </form>
    </div>
  );
}
