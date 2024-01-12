import { useEffect, useState } from "react"
import { postSubject } from "../api/subjectsApi"
import { SubjectModel } from "../model/SubjectModel"
import { fetchAndSetupSubjects } from "../api/helpers/massSetups"
import { useNavigate } from 'react-router-dom'
import { fetchTokenId } from '../api/tokenApi'

export default function NewSubjectPage() {
  const navigate = useNavigate()

  const [supervisingSubjects, setSupervisingSubjects] = useState<SubjectModel[]>([])
  const [newSubject, setNewSubject] = useState<SubjectModel>(new SubjectModel())
  const [subjectCreated, setSubjectCreated] = useState<boolean | void>(undefined)
  const [userId, setUserId] = useState<number | null>()

  useEffect(() => {
    const fetchData = async () => {
      setUserId(await fetchTokenId())
      setNewSubject((prevSubject: SubjectModel) => {
        const newSubjectCopy: SubjectModel = { ...prevSubject, setup: prevSubject.setup }
        newSubjectCopy.semester = 1
        return newSubjectCopy
      })

      const supSubjects: SubjectModel[] | null = await fetchAndSetupSubjects()

      supSubjects && setSupervisingSubjects(supSubjects)
    }

    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewSubject((prevSubject: SubjectModel) => {
      const newSubjectCopy: SubjectModel = { ...prevSubject, setup: prevSubject.setup }

      switch (event.target.id) {
        case "name":
          newSubjectCopy.name = event.target.value
          break
        case "semester":
          newSubjectCopy.semester = parseInt(event.target.value)
          break
        case "description":
          newSubjectCopy.description = event.target.value
          break
        default:
          console.log("error")
          break
      }

      return newSubjectCopy
    })
  }


  const createSubject = async (event: React.FormEvent) => {
    event.preventDefault()
    if(userId)
        newSubject.supervisorId = userId
    const created = await postSubject(newSubject)
    setSubjectCreated(created)
    if(created){
        alert('Subject created successfully')
        navigate('/subjects')
    }
        
  }

  return (
    <div className="page column">
      <form className="new-form medium-text" onSubmit={createSubject}>
        <div style={{ overflow: "scroll", padding: "0 50px" }}>
          <section>
            <label>
              <input style={{ fontSize: 30, border: 0, textAlign: "center" }} id="name" placeholder="New Subject Name" value={newSubject.name} required onChange={handleChange} />
            </label>
          </section>

          <section>
            <div>
              <label>
                <span>Semester</span>
                <input id="semester" type="number" defaultValue={1} required onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                <span>Description</span>
                <textarea className="textarea" id="description" rows={5} cols={100} required placeholder="Enter description here" onChange={handleChange} />
              </label>
            </div>
          </section>
          {subjectCreated === undefined ?
            <div></div> :
            subjectCreated === true ?
              <div>Subject created successfully</div> :
              <div>Failed to create subject</div>
          }
        </div>
        <input type="submit" value={"Create Subject"} />
      </form>
    </div>
  )
}
