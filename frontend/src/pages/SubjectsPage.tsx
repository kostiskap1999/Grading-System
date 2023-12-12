import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel"
import { fetchAndSetupSubjects, fetchAndSetupUser } from "../api/helpers/massSetups"

import '../styles/general.scss';
import '../styles/home.scss';
import '../styles/button.scss';
import { UserModel } from "../model/UserModel";
import ReactDropdown from "react-dropdown";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Cookies from "universal-cookie";
import { fetchTokenID } from "../api/tokenApi";
import { deleteUserSubject, postUserSubject } from "../api/subjectsApi";

export default function SubjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [user, setUser] = useState<UserModel>(new UserModel())

  const [subjects, setSubjects] = useState<SubjectModel[]>([new SubjectModel()])
  const [selectedSubject, setSelectedSubject] = useState<SubjectModel>(new SubjectModel())
  
  const [rerender, setRerender] = useState<number>(0)

  const filterOptions = [
    {value: "my", label: "My Subjects"},
    {value: "available", label: "Available Subjects"},
    {value: "all", label: "All Subjects"},
    {value: "supervising", label: "Supervising Subjects"}]  // my = my subjects, all = all subjects, supervising = for profs and admins
  const [filter, setFilter] = useState<string>("")
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectModel[]>([new SubjectModel()])

  useEffect(() => {
    const fetchData = async () => {
      const subjectsOBJ: SubjectModel[] | null = await fetchAndSetupSubjects()
      if(subjectsOBJ){
        setSubjects(subjectsOBJ)

        const parsedID: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
        for(const subject of subjectsOBJ)
          if(subject.id === parseInt(parsedID)){
            setSelectedSubject(subject)
            break;
          }
      }
    }

    fetchData()
  }, [rerender])

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
    console.log(filter + " ga")
    if (filter === "my")
      setFilteredSubjects(user.subjects)
    else if (filter === "available")
      setFilteredSubjects(subjects.filter(subject => !user.subjects.map(subject => subject.id).includes(subject.id))) //get user subjects' ids and if they are included in the total subjects list, filter them out
    else if (filter === "all")
      setFilteredSubjects(subjects)
    else if (filter === "supervising")
      setFilteredSubjects([])
      console.log(filter + " y")
  }, [filter])

  const joinSubject = async () => {
    setFilter(prevFilter => (prevFilter === "my" ? "" : "my"))
    await postUserSubject(user.id, selectedSubject.id)
    window.location.reload()
  }

  const leaveSubject = async () => {
    setFilter(prevFilter => (prevFilter === "my" ? "" : "my"))
    await deleteUserSubject(user.id, selectedSubject.id)
    navigate('/subjects')
    window.location.reload()
  }

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title text center column" style={{flex: 1}}>
        <div>This is a list of all the subjects</div>
        <div className="row">
          <div>There are pending projects from subjects.</div>
        </div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">
              <ReactDropdown
                controlClassName="row center"
                menuClassName="dropdown-menu"        
                options={filterOptions}
                onChange={(option) => {setFilter(option.value);}}
                value={filter}
                placeholder={filter}
                arrowClosed={<KeyboardArrowDown/>}
                arrowOpen={<KeyboardArrowUp/>}
              />
            </div>
            <div className="column" style={{overflow:'scroll'}}>
              {filteredSubjects.map((subject, index) => (
                <button key={index} className="button"
                  onClick={() => {navigate('/subjects?id=' + subject.id); setRerender(rerender+1)}}
                >
                  {subject.name}
                </button>
              ))}
            </div>
        </div>
        <div className="column container" style={{flex: 1, padding:"10px", justifyContent:"space-between"}}>
            {selectedSubject.id === -1 ? <></> : <>
            <div>
              <div className="center">
                <div className="header-text">{selectedSubject.name}</div>
                <div className="small-text">Semester: {selectedSubject.semester}</div>
              </div>
              <div className="small-text">{selectedSubject.description}</div>
            </div>
            {user.hasSubject(selectedSubject.id) ?
              <button className="button" onClick={async () => {await leaveSubject()}}>Leave Subject</button>
            :
              <button className="button" onClick={async () => {await joinSubject()}}>Join Subject</button>
            }
            <div className="column" style={{overflow:'scroll'}}>
              {selectedSubject.projects.map((project, index) => (
                <button key={index} className="button"
                  onClick={() => {navigate('/projects?id=' + project.id); setRerender(rerender+1)}}
                >
                  {project.name}
                </button>
              ))}
            </div>
            </>}
        </div>
      </div>
    </div>
  );
}
