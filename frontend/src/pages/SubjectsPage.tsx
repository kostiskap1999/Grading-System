import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel"
import { fetchAndSetupUser } from "../api/helpers/massSetups"
import { UserModel } from "../model/UserModel";
import { fetchTokenId } from "../api/tokenApi";
import { deleteUserSubject, fetchSubjects, postUserSubject } from "../api/subjectsApi";
import { SubjectEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function SubjectsPage() {

  const navigate = useNavigate()
  const url = new URL(window.location.href)
  const params = url.searchParams

  const [user, setUser] = useState<UserModel>()

  const [subjects, setSubjects] = useState<SubjectModel[]>([])
  const [selectedSubject, setSelectedSubject] = useState<SubjectModel>()
  
  const [rerender, setRerender] = useState<number>(0)

  const [filterValues, setFilterValues] = useState<{joined: number, supervising: number}>({
    joined: params.get('joined') ? parseInt(params.get('joined') as string) : 0,
    supervising: params.get('supervising') ? parseInt(params.get('supervising') as string) : 0,
    }) // -1 negative, 0 neutral, 1 positive
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectModel[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const subjectsOBJ: SubjectModel[] | null = await fetchSubjects()
      if(subjectsOBJ)
        setSubjects(subjectsOBJ)

      const tokenId: number | null = await fetchTokenId()
      if(tokenId){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenId)
        userOBJ && setUser(userOBJ)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
      if(subjects){
        const parsedId: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
        for(const subject of subjects)
          if(subject.id === parseInt(parsedId)){
            setSelectedSubject(subject)
            break;
          }
      }
  }, [rerender, subjects])

  useEffect(() => {
    if(user){
        if (filterValues['joined'] === 0)
            setFilteredSubjects(subjects)
        else if (filterValues['joined'] === 1)
            setFilteredSubjects(user.getSubjects(filterValues['supervising']))
        else if (filterValues['joined'] === -1)
            setFilteredSubjects(subjects.filter(
                subject => !user.getSubjects(filterValues['supervising']).some(
                    userSubject => userSubject.id === subject.id
                )
            ))
        else
            console.log("how")
    }
        
  }, [filterValues, user])

  const joinSubject = async () => {
    if(user && selectedSubject){
      await postUserSubject(user.id, selectedSubject.id)
      window.location.reload()
    }
  }

  const leaveSubject = async () => {
    if(user && selectedSubject){
      await deleteUserSubject(user.id, selectedSubject.id)
      window.location.reload()
    }
  }

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
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="top-header medium-text center row" style={{flex: 1}}>
        {user && user.role <= 1 ? <>
          <button className="button" style={{flex: 1, padding: 5, borderRadius: 2}} onClick={() => navigate('/new-subject')}>New Subject</button>
        </> : <div style={{flex: 1}}></div>}
        <div className="medium-text center column" style={{flex: 4}}>This is a list of all the subjects</div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
            <div className="medium-text row center header-title">
                <div className="row" style={{flex: 1, justifyContent: 'flex-start'}}>
                    {user && user.role <= 1 ?
                    <button className="filter-button icon-button-small" title={"Filter supervised subjects"} style={filterValues['supervising'] == -1 ? {color: "firebrick"} : filterValues['supervising'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('supervising')}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                    </button>
                    : <></>
                    }
                </div>
                <div style={{flex: 1}}>Subjects List</div>
                <div className="row" style={{flex: 1, justifyContent: 'flex-end'}}>
                    <button className="filter-button icon-button-small" title={"Filter joined subjects"} style={filterValues['joined'] == -1 ? {color: "firebrick"} : filterValues['joined'] == 1 ? {color: "green"} : {color: "black"}} type="button" onClick={() => changeFilterValue('joined')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </button>
                </div>
            </div>
            <div className="column" style={{overflow:'scroll'}}>
              {filteredSubjects.map((subject, index) => (
                <button key={index} className="list-button"
                  onClick={() => {
                    url.searchParams.set('id', subject.id.toString())
                    window.history.replaceState(null, '', url.toString())
                    setRerender(rerender+1)
                }}
                >
                  <PageButtonDescription component={subject} />
                </button>
              ))}
            </div>
        </div>
        <div className="column container" style={{flex: 1, justifyContent:"space-between"}}>
            {selectedSubject && user && <>
                <SubjectEntry subject={selectedSubject} userRole={user?.role}/>
                {user && user.role > 1 && <>
                  {user.hasSubject(selectedSubject.id) ? <>
                      <button className="list-button" onClick={async () => {await leaveSubject()}}>Leave Subject</button>
                      <div className="column" style={{overflow:'scroll'}}>
                          {selectedSubject.projects.map((project, index) => (
                          <button key={index} className="list-button"
                              onClick={() => {navigate('/projects?id=' + project.id); setRerender(rerender+1)}}
                          >
                              <PageButtonDescription component={project} showGrade={user?.role >= 1} />
                          </button>
                          ))}
                      </div>
                  </>:<>
                      <button className="list-button" onClick={async () => {await joinSubject()}}>Join Subject</button>
                      <div></div>
                  </>}
                </>}
            </>}
        </div>
      </div>
    </div>
  );
}
