import { useEffect, useState } from "react"
import { postProject } from "../api/projectsApi"
import { fetchSubjects } from "../api/subjectsApi"
import { Project } from "../model/project"
import { Subject } from "../model/subject"
import { Test, TestInput } from "../model/test"

export default function NewProjectPage() {
  
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
      // const supSubjects: Subject[] = await fetchSupervisingSubjects(await fetchTokenID())
      const supSubjects: Subject[] | null = await fetchSubjects()
      
      supSubjects && setSupervisingSubjects(supSubjects)
    }

    fetchData()
  }, [])

  const createTest = () => {
    setNewProject((prevProject: Project) => {
        const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }
        const newTest = new Test()
        newTest.id = newProjectCopy.tests.length+1
        newTest.output.id = newTest.id
        newProjectCopy.tests.push(newTest)
        createInput(newProjectCopy.tests.length - 1)
        return newProjectCopy
    })
  }


  const copyTest = (index: number) => {
    setNewProject((prevProject: Project) => {
        const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }
        const copiedTest = new Test(newProjectCopy.tests[index])
        copiedTest.id = newProjectCopy.tests.length + 1
        copiedTest.output.id = copiedTest.id
        newProjectCopy.tests.push(copiedTest)
        return newProjectCopy
    })
  }

  const deleteTest = (index: number) => {
      setNewProject((prevProject: Project) => {
          const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }
          newProjectCopy.tests = [
              ...newProjectCopy.tests.slice(0, index),
              ...newProjectCopy.tests.slice(index + 1),
          ]
          return newProjectCopy
      })
  }


  const createInput = (testIndex: number) => {
    setNewProject((prevProject: Project) => {
        const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }
        const newInput = new TestInput()
        newInput.id = newProjectCopy.tests[testIndex].inputs.length + 1
        newProjectCopy.tests[testIndex].inputs.push(newInput)
        return newProjectCopy
    })
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewProject((prevProject: Project) => {
        const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }

        switch(event.target.id) {
            case "name" :
                newProjectCopy.name = event.target.value
                break
            case "deadline" :
                newProjectCopy.deadline = event.target.value
                break
            case "subject_id" :
                newProjectCopy.subjectID = parseInt(event.target.value)
                break
            case "description" :
                newProjectCopy.description = event.target.value
                break
            default:
                console.log("error")
                break
        }

        return newProjectCopy
    })
  }


  const handleTestChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, testIndex: number, inputIndex?: number) => {
    setNewProject((prevProject: Project) => {
        const newProjectCopy: Project = { ...prevProject, setup: prevProject.setup }
        switch(event.target.id) {
            case `main-function-${testIndex}` :
                newProjectCopy.tests[testIndex].main = event.target.value
                break
            case `input-code-${inputIndex}` :
                newProjectCopy.tests[testIndex].inputs[inputIndex!].code = event.target.value
                break
            case `input-is-main-param-${inputIndex}` :
                newProjectCopy.tests[testIndex].inputs[inputIndex!].isMainParam = (event.target as HTMLInputElement).checked
                break
            case `output-code-${testIndex}` :
                newProjectCopy.tests[testIndex].output.code = event.target.value
                break
            default:
                console.log("error")
                break
        }
        return newProjectCopy
    })
  }

  
  const createProject = async (event: React.FormEvent) => {
    event.preventDefault()
    const created = await postProject(newProject)
    setProjectCreated(created)
  }

  return (
    <div className="page column">
      <form className="form text" onSubmit={createProject}>
        <section>
          <header>
              <label>
                <input style={{fontSize: 30, border: 0, textAlign: "center"}} id="name" placeholder="New Project Name" defaultValue="New Project Name" required onChange={handleChange}/>
              </label>
            </header>
        </section>
        
        <section>
          <div>
            <label>
              <span>Deadline</span>
              <input id="deadline" type="date" defaultValue={new Date().toISOString().split('T')[0]} required onChange={handleChange}/>
            </label>
            <label>
              <span>Subject</span>
              <select id="subject_id" required onChange={handleChange}>
                <option id="no" value="">No Subject Selected</option>
                {supervisingSubjects.map((subject, index) => 
                  <option key={subject.id} id={subject.name} value={subject.id}>{subject.name}</option>
                )}
              </select>
            </label>
          </div>
          <div>
            <label>
              <span>Description</span>
              <textarea id="description" rows={5} cols={100} required placeholder="Enter description here" onChange={handleChange}/>
            </label>
          </div>
        </section>

        <section>
          {newProject.tests.map((test, index) => (
            <section key={test.id}>
              <header>
                <button style={{flex: 0.3, padding: 20, borderRadius: "2px"}} type="button" onClick={() => copyTest(index)}>Copy Test</button>
                <label style={{flex: 2}}>
                  <div>
                    <span>Test {index+1} to run for function</span>
                  </div>
                  <input id={`main-function-${index}`} defaultValue={test.main} onChange={(event) => handleTestChange(event, index)}/>
                </label>
                
                <button style={{flex: 0.3, padding: 20, borderRadius: "2px", backgroundColor: "firebrick" }} type="button" onClick={() => deleteTest(index)}>Delete Test</button>
              </header>
              <div>
                <div style={{flex: 1}}>
                  <span>Inputs</span>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ flex: 0.01 }}>#</th>
                        <th style={{ flex: 0.01 }}>Is Param?</th>
                        <th style={{ flex: 0.5 }}>Parameter value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.inputs.map((input, idx) => (
                        <tr key={input.id}>
                          <td style={{ flex: 0.01 }}>
                            <div>{idx+1}.</div>
                          </td>
                          <td style={{flex: 0.01, padding: 0}}>
                            <label style={{padding: 0, margin: 0}}>
                              <input
                                id={`input-is-main-param-${idx}`}
                                type="checkbox"
                                defaultChecked={input.isMainParam}
                                onChange={(event) => handleTestChange(event, index, idx)}
                              />
                            </label>
                          </td>
                          <td style={{ flex: 0.5 }}>
                            <textarea
                              id={`input-code-${idx}`}
                              rows={1}
                              defaultValue={input.code}
                              onChange={(event) => handleTestChange(event, index, idx)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <button type="button" onClick={() => createInput(index)}>Add Input</button>
                </div>
                <div style={{flex: 0.5}}>
                  <label>
                    <span>Output Code</span>
                    <textarea id={`output-code-${index}`} defaultValue={test.output.code} rows={1} onChange={(event) => handleTestChange(event, index)}/>
                  </label>
                </div>
              </div>
            </section>
          ))}
          
          <button style={{marginTop: "50px"}} type="button" onClick={createTest}>Add Test</button>
        </section>
        {projectCreated === undefined ?
          <div></div> :
          projectCreated === true ?
            <div>Project created successfully</div> :
            <div>Failed to create project</div>
        }
        <input type="submit" value={"Create Project"}/>
      </form>
    </div>
  )
}
