import { useEffect, useState } from "react";
import { postProject } from "../fetches/fetchProjects";
import { fetchSubjects } from "../fetches/fetchSubjects";
import { Project } from "../model/project";
import { Subject } from "../model/subject";
import { Test, TestInput } from "../model/test";

export default function NewProjectPage() {
  
  const [supervisingSubjects, setSupervisingSubjects] = useState<Subject[]>([])
  const [newProject, setNewProject] = useState<Project>(new Project())
  const [projectCreated, setProjectCreated] = useState<boolean | void>(undefined)

  const [rerender, setRerender] = useState<number>(0)

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
    const project: Project = newProject
    project.tests.push(new Test())
    project.tests[project.tests.length-1].id = project.tests.length
    project.tests[project.tests.length-1].output.id = project.tests.length
    createInput(project.tests.length-1)
    setRerender(rerender+1)
  }

  const copyTest = (index: number) => {
    const project: Project = newProject
    console.log(project.tests)
    project.tests.push(project.tests[index])
    project.tests[project.tests.length-1].id = project.tests.length
    project.tests[project.tests.length-1].output.id = project.tests.length
    console.log(project.tests)
    setRerender(rerender+1)
  }

  const createInput = (testIndex: number) => {
    const project: Project = newProject
    project.tests[testIndex].inputs.push(new TestInput())
    project.tests[testIndex].inputs[project.tests[testIndex].inputs.length-1].id = project.tests[testIndex].inputs.length //I promise this line is necessary and completely not hansaplast
    setRerender(rerender+1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
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

  const handleTestChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, testIndex: number, inputIndex?: number) => {
    const project: Project = newProject
    switch(event.target.id) {
      case `main-function-${testIndex}` :
        project.tests[testIndex].main = event.target.value
        break
      case `input-name-${inputIndex}` :
        project.tests[testIndex].inputs[inputIndex!].name = event.target.value
        break
      case `input-code-${inputIndex}` :
        project.tests[testIndex].inputs[inputIndex!].code = event.target.value
        break
      case `input-is-main-param-${inputIndex}` :
        project.tests[testIndex].inputs[inputIndex!].isMainParam = (event.target as HTMLInputElement).checked
        break
      case `output-code-${testIndex}` :
        project.tests[testIndex].output.code = event.target.value
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
                  <option key={index} id={subject.name} value={subject.id}>{subject.name}</option>
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
            <span key={index}>
              <header>
                <div style={{flex: 0.3}}></div>
                <label style={{flex: 2}}>
                  <div>
                    <span>Test {index+1} to run for function</span>
                  </div>
                  <input id={`main-function-${index}`} defaultValue={test.main} onChange={(event) => handleTestChange(event, index)}/>
                </label>
                <button style={{flex: 0.3}} type="button" onClick={() => copyTest(index)}>Copy Test</button>
              </header>
              <div>
                <div style={{flex: 1}}>
                  <span>Inputs</span>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ flex: 0.01 }}>Is Param?</th>
                        <th style={{ flex: 0.4 }}>Parameter name</th>
                        <th style={{ flex: 0.5 }}>Parameter value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.inputs.map((input, idx) => (
                        <tr key={idx}>
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
                          <td style={{ flex: 0.4 }}>
                            <textarea
                              id={`input-name-${idx}`}
                              rows={1}
                              defaultValue={input.name}
                              onChange={(event) => handleTestChange(event, index, idx)}
                            />
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
            </span>
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
  );
}
