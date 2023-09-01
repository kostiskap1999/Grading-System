import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Subject } from "../model/subject"
import { fetchAllSubjectData } from "../fetches/helpers/massFetching"

export default function SubjectsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [subjects, setSubjects] = useState<Subject[]>([new Subject()])
  const [selectedSubject, setSelectedSubject] = useState<Subject>(new Subject())
  
  const [rerender, setRerender] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const subjectsOBJ: Subject[] = await fetchAllSubjectData()
      setSubjects(subjectsOBJ)

      const parsedID: string = (params.get('id') == null) ? "" : params.get('id')!.toString()
      for(const subject of subjectsOBJ)
        if(subject.id === parseInt(parsedID)){
          setSelectedSubject(subject)
          break;
        }
    }

    fetchData()
  }, [rerender])


  return (
    <div className="page row">
      <div style={{flex: 1.3}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">University Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {subjects.map((subject, index) => (
              <button key={index} className="button"
                onClick={() => {navigate('/subjects?id=' + subject.id); setRerender(rerender+1)}}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="column" style={{flex: 1, padding:"10px"}}>
          {selectedSubject.id == -1 ? <></> : <>
          <div className="center" style={{padding:"30px"}}>
            <div className="header-text">{selectedSubject.name}</div>
            <div className="small-text">Semester: {selectedSubject.semester}</div>
          </div>
          <div className="small-text">{selectedSubject.description}</div>
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
  );
}
