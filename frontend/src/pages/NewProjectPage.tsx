import { useEffect, useState } from "react"
import { postProject } from "../api/projectsApi"
import { ProjectModel } from "../model/ProjectModel"
import { SubjectModel } from "../model/SubjectModel"
import { TestModel, TestInputModel } from "../model/TestModel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { fetchAndSetupSubjects } from "../api/helpers/massSetups"
import { useNavigate } from 'react-router-dom'

export default function NewProjectPage() {
  const navigate = useNavigate()

  const [supervisingSubjects, setSupervisingSubjects] = useState<SubjectModel[]>([])
  const [newProject, setNewProject] = useState<ProjectModel>(new ProjectModel())
  const [projectCreated, setProjectCreated] = useState<boolean | void>(undefined)

  useEffect(() => {
    const fetchSupervisingSubjects = async () => {

    }
    fetchSupervisingSubjects()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setNewProject((prevProject: ProjectModel) => {
        const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
        newProjectCopy.deadline = new Date().toISOString().split('T')[0]
        return newProjectCopy
      })
      // const supSubjects: Subject[] = await fetchSupervisingSubjects(await fetchTokenId())
      const supSubjects: SubjectModel[] | null = await fetchAndSetupSubjects()

      supSubjects && setSupervisingSubjects(supSubjects)
    }

    fetchData()
  }, [])

  const createTest = () => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
      const newTest = new TestModel()
      if (newProjectCopy.tests)
        newTest.id = newProjectCopy.tests.length + 1
      else
        newTest.id = 0
      newTest.output.id = newTest.id
      newProjectCopy.tests.push(newTest)
      createInput(newProjectCopy.tests.length - 1)
      return newProjectCopy
    })
  }


  const copyTest = (index: number) => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
      const copiedTest = new TestModel(newProjectCopy.tests[index])
      copiedTest.id = newProjectCopy.tests.length + 1
      copiedTest.output.id = copiedTest.id
      newProjectCopy.tests.push(copiedTest)
      return newProjectCopy
    })
  }

  const deleteTest = (index: number) => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
      newProjectCopy.tests = [
        ...newProjectCopy.tests.slice(0, index),
        ...newProjectCopy.tests.slice(index + 1),
      ]
      return newProjectCopy
    })
  }

  const deleteInput = (testIndex: number, inputIndex: number) => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline };
      newProjectCopy.tests[testIndex].inputs = [
        ...newProjectCopy.tests[testIndex].inputs.slice(0, inputIndex),
        ...newProjectCopy.tests[testIndex].inputs.slice(inputIndex + 1),
      ];
      return newProjectCopy;
    });
  }


  const createInput = (testIndex: number) => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
      const newInput = new TestInputModel()
      newInput.id = newProjectCopy.tests[testIndex].inputs.length + 1
      newProjectCopy.tests[testIndex].inputs.push(newInput)
      return newProjectCopy
    })
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }

      switch (event.target.id) {
        case "name":
          newProjectCopy.name = event.target.value
          break
        case "deadline":
          newProjectCopy.deadline = event.target.value
          break
        case "subject_id":
          if (event.target.value === "")
            break
          const subject = JSON.parse(event.target.value)

          newProjectCopy.subjectId = parseInt(subject.id)
          if (!newProjectCopy.name || newProjectCopy.name === "")
            newProjectCopy.name = `${subject.name} Project ${subject.projects.length + 1}`
          break
        case "description":
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
    setNewProject((prevProject: ProjectModel) => {
      const newProjectCopy: ProjectModel = { ...prevProject, setup: prevProject.setup, isWithinDeadline: prevProject.isWithinDeadline }
      switch (event.target.id) {
        case `main-function-${testIndex}`:
          newProjectCopy.tests[testIndex].mainFunction = event.target.value
          break
        case `input-code-${inputIndex}`:
          newProjectCopy.tests[testIndex].inputs[inputIndex!].code = event.target.value
          break
        case `input-is-main-param-${inputIndex}`:
          newProjectCopy.tests[testIndex].inputs[inputIndex!].isMainParam = (event.target as HTMLInputElement).checked
          break
        case `output-code-${testIndex}`:
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
    if(created){
        alert('Project created successfully')
        navigate('/projects')
    }
        
  }

  return (
    <div className="page column">
      <form className="new-form medium-text" onSubmit={createProject}>
        <div style={{ overflow: "scroll", padding: "0 50px" }}>
          <section>
            <label>
              <input style={{ fontSize: 30, border: 0, textAlign: "center" }} id="name" placeholder="New Project Name" value={newProject.name} required onChange={handleChange} />
            </label>
          </section>

          <section>
            <div>
              <label>
                <span>Deadline</span>
                <input id="deadline" disabled type="date" required onChange={handleChange} />
              </label>
              <label>
                <span>Subject</span>
                <select id="subject_id" required onChange={handleChange}>
                  <option id="no" value="">No Subject Selected</option>
                  {supervisingSubjects.map((subject, index) =>
                    <option key={subject.id} id={subject.name} value={JSON.stringify(subject)}>{subject.name}</option>
                  )}
                </select>
              </label>
            </div>
            <div>
              <label>
                <span>Description</span>
                <textarea className="textarea" id="description" rows={5} cols={100} required placeholder="Enter description here" onChange={handleChange} />
              </label>
            </div>
          </section>

          <section className="row" style={{ border: "none", flexWrap: "wrap" }}>
            {newProject.tests && newProject.tests.map((test, index) => (
              <section className="test-container" key={test.id}>
                <div className='center'>
                  <button className="alt-button icon-button-small" type="button" onClick={() => copyTest(index)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <label className='row center' style={{ flex: 2 }}>
                      <input
                        style={{textAlign: "center"}}
                        id={`main-function-${index}`}
                        defaultValue={test.mainFunction}
                        placeholder='Main Function Name'
                        onChange={(event) => handleTestChange(event, index)}
                        required
                      />
                  </label>

                  <button className="alt-button remove-button icon-button-small" type="button" onClick={() => deleteTest(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <div style={{ flex: 1 }}>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "20px" }}>#</th>
                          <th style={{ width: "250px" }}>Input</th>
                          <th style={{ width: "30px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.inputs && test.inputs.map((input, idx) => (
                          <tr key={input.id}>
                            <td>
                              <div>{idx + 1}</div>
                            </td>
                            <td>
                              <textarea
                                id={`input-code-${idx}`}
                                rows={3}
                                cols={5}
                                placeholder='Enter input value here'
                                defaultValue={input.code}
                                onChange={(event) => handleTestChange(event, index, idx)}
                                required
                              />
                            </td>
                            <td>
                              <button
                                type="button" // Add this line to prevent form submission
                                id={`trash-${idx}`}
                                className="remove-button icon-button-small"
                                style={{ padding: "13px" }}
                                onClick={() => deleteInput(index, idx)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>

                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button type="button" className='alt-button' onClick={() => createInput(index)}>Add Input</button>
                  </div>

                  <div style={{ flex: 0.6, marginLeft: "10px" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ flex: 0.5 }}>
                            <textarea
                              id={`output-code-${index}`}
                              defaultValue={test.output.code}
                              rows={3}
                              cols={5}
                              placeholder='Enter output value here'
                              onChange={(event) => handleTestChange(event, index)}
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ))}
          </section>
          <button style={{ width: "100%" }} type="button"  className='button' onClick={createTest}>Add Test</button>
          {projectCreated === undefined ?
            <div></div> :
            projectCreated === true ?
              <div>Project created successfully</div> :
              <div>Failed to create project</div>
          }
        </div>
        <input type="submit" value={"Create Project"} />
      </form>
    </div>
  )
}
