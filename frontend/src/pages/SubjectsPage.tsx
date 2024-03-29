import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel"
import { fetchAndSetupSubjects, fetchAndSetupUser } from "../api/helpers/massSetups"
import { UserModel } from "../model/UserModel";
import { fetchTokenId } from "../api/tokenApi";
import { deleteSubject, deleteUserSubject, fetchSubjectUsers, fetchSubjects, postUserSubject } from "../api/subjectsApi";
import { SubjectEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faL, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function SubjectsPage() {

  const navigate = useNavigate()
  const url = new URL(window.location.href)
  const params = url.searchParams

  const [user, setUser] = useState<UserModel>()

  const [subjects, setSubjects] = useState<SubjectModel[]>([])
  const [selectedSubject, setSelectedSubject] = useState<SubjectModel>()
  const [participants, setParticipants] = useState<UserModel[]>([])

  const [showProjects, setShowProjects] = useState<boolean>(false)
  const [showUsers, setShowUsers] = useState<boolean>(false)
  
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
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenId, 2)
        userOBJ && setUser(userOBJ)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const setupSubject = async () => {
        if(subjects){
            const parsedId: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
            for(const subject of subjects)
              if(subject.id === parseInt(parsedId)){
                await subject.setup()
                setSelectedSubject(subject)
                setShowProjects(false)
                const users = await fetchSubjectUsers(subject.id)
                setParticipants(users ? users : [])
                setShowUsers(false)
                break;
              }
          }
    }
    setupSubject()
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
        
  }, [filterValues, user, rerender])

  const joinSubject = async () => {
    if(user && selectedSubject){
      await user.addSubject(selectedSubject)
      setRerender(rerender+1)
    }
  }

  const leaveSubject = async () => {
    if(user && selectedSubject){
      await user.removeSubject(selectedSubject.id)
      setRerender(rerender+1)
    }
  }

  const delSubject = async () => {
    if(selectedSubject){
        const userConfirmed = window.confirm("Are you sure you want to delete this subject? This action can't be taken back.");

        if (userConfirmed) {
            const index = subjects.findIndex(subject => subject.id === selectedSubject.id)
            if (index !== -1)
                subjects.splice(index, 1)
            setRerender(rerender+1)
            await deleteSubject(selectedSubject.id)
            navigate("/subjects")
            setSelectedSubject(undefined)
        }
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
        <div className="column container" style={{flex: 2.5, justifyContent:"space-between"}}>
            {selectedSubject && user && <>
                <SubjectEntry delSubject={delSubject} subject={selectedSubject} userRole={user?.role}/>
                {user && <>
                  {user.hasSubject(selectedSubject.id) ? <>
                        <div className='row'>
                            <div className='column' style={{flex: 2}}>
                                {user.role <=1 && user.id === selectedSubject.supervisorId ?
                                    <button className="list-button" style={{margin: "30px auto"}} disabled>You can't leave a subject you supervise</button>
                                :
                                    <button className="list-button" style={{margin: "30px auto"}} onClick={async () => {await leaveSubject()}}>Leave Subject</button>
                                }
                                <div className='row'>
                                    <button className="list-button" style={{margin: "0 20px", flex: 1}} onClick={() => {setShowProjects(!showProjects); setShowUsers(false)}}>Show Projects</button>
                                    {user && user.role <= 1 && <button className="list-button" style={{margin: "0 20px", flex: 1}} onClick={() => {setShowUsers(!showUsers); setShowProjects(false)}}>Show Users</button>}
                                </div>
                                <div style={{flex: 1}}></div>
                            </div>
                            <div className="column container" style={{overflow:'scroll', flex: 1, display: (showProjects || showUsers) ? "flex" : "none"}}>
                                    <div className="medium-text center" style={{margin: "20px"}}>{showProjects ? "Projects" : showUsers ? "Users" : ""}</div>
                                    {showProjects ?
                                        user.getProjects({filterSubject: selectedSubject.id}).map((project, index) => (
                                            <button key={index} className="list-button"
                                                onClick={() => {navigate('/projects?id=' + project.id); setRerender(rerender+1)}}
                                            >
                                                <PageButtonDescription component={project.getUserSubmission(user.id)!} displayName={project.name} showGrade={user.role >= 1} />
                                                {/* <PageButtonDescription component={project} showGrade={user?.role >= 1} /> */}
                                            </button>
                                        ))
                                    : showUsers ?
                                        participants.map((participant, index) => (
                                            <button key={index} className="list-button"
                                                onClick={() => {navigate('/profile?id=' + participant.id); setRerender(rerender+1)}}
                                            >
                                                <PageButtonDescription component={participant} />
                                            </button>
                                        ))
                                    : <></>}
                            </div>
                        </div>
                        <div style={{flex: 1}}></div>
                  </>:<>
                      <button className="list-button" style={{margin: "30px auto"}} onClick={async () => {await joinSubject()}}>Join Subject</button>
                      <div></div>
                  </>}
                </>}
            </>}
        </div>
      </div>
    </div>
  );
}
