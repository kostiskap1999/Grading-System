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

  const placeholderText = "Line 1\n Line 2\nLine 3\n\nLine 4";
  return (
    <div className="page column">
      <div className="header-title text center column">
        New Project Page
      </div>
      <form className="form text">
        <section>
          <header className="header-text">Characteristics</header>
          <div>
            <label>
              <span>Name</span>
              <input placeholder="Enter project here" />
            </label>
            <label>
              <span>Description</span>
              <textarea rows={5} cols={30} placeholder="Enter description here" />
            </label>
            <label>
              <span>Subject (TODO)</span>
              <input placeholder="Pick a supervising subject" />
            </label>
            <label>
              <span>Deadline</span>
              <input type="date" />
            </label>
          </div>
        </section>
        <section>
          <header className="header-text">Technical Details</header>
          <section>
            <header className="large-text">Desired Outcomes</header>
            <div>
              <label>
                <span>Mandatory Terms (separate with comma)</span>
                <textarea rows={5} cols={30} placeholder="console.log,<html>,setState" />
              </label>
              <label>
                <span>Wanted Terms (separate with comma)</span>
                <textarea rows={5} cols={30} placeholder="console.log,<html>,setState" />
              </label>
            </div>
            <div>
              <label>
                <span>Mandatory code (separate with empty line)</span>
                <textarea rows={10} cols={50} placeholder={"for (let i=0; i<students.length; i++){\n students.grade = grade\n}\n\nconsole.log(teachers)"} />
              </label>
              <label>
                <span>Wanted code (separate with empty line)</span>
                <textarea rows={10} cols={50} placeholder={"for (let i=0; i<students.length; i++){\n students.grade = grade\n}\n\nconsole.log(teachers)"} />
              </label>
            </div>
            <div>
              <label>
                <span>Mandatory return value</span>
                <input placeholder="0" />
              </label>
              <label>
                <span>Wanted return value</span>
                <input placeholder="1" />
              </label>
            </div>
          </section>

          <section>
            <header className="large-text">Undesired Outcomes</header>
            <div>
              <label>
                <span>Forbidden Terms (separate with comma)</span>
                <textarea rows={5} cols={30} placeholder="console.log,<html>,setState" />
              </label>
              <label>
                <span>Unwanted Terms (separate with comma)</span>
                <textarea rows={5} cols={30} placeholder="console.log,<html>,setState" />
              </label>
            </div>
            <div>
              <label>
                <span>Forbidden code (separate with empty line)</span>
                <textarea rows={10} cols={50} placeholder={"for (let i=0; i<students.length; i++){\n students.grade = grade\n}\n\nconsole.log(teachers)"} />
              </label>
              <label>
                <span>Unwanted code (separate with empty line)</span>
                <textarea rows={10} cols={50} placeholder={"for (let i=0; i<students.length; i++){\n students.grade = grade\n}\n\nconsole.log(teachers)"} />
              </label>
            </div>
            <div>
              <label>
                <span>Forbidden return value</span>
                <input placeholder="0" />
              </label>
              <label>
                <span>Unwanted return value</span>
                <input placeholder="1" />
              </label>
            </div>
          </section>

        </section>
        <input type="submit" value={"Create Project"}/>
      </form>
    </div>
  );
}
