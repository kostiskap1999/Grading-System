import { useEffect, useState } from "react"
import { postProject } from "../api/projectsApi"
import { fetchSubjects } from "../api/subjectsApi"
import { ProjectModel } from "../model/ProjectModel"
import { SubjectModel } from "../model/SubjectModel"
import { TestModel, TestInputModel } from "../model/TestModel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { fetchAndSetupSubjects } from "../api/helpers/massSetups"

export default function NewProjectPage() {

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
      // const supSubjects: Subject[] = await fetchSupervisingSubjects(await fetchTokenID())
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

          newProjectCopy.subjectID = parseInt(subject.id)
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

      console.log(newProjectCopy)
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
  }

  return (
    <div className="page column">
      <form className="new-form text" onSubmit={createProject}>
        <div style={{ overflow: "scroll", padding: "0 200px" }}>
          <section>
            <label>
              <input style={{ fontSize: 30, border: 0, textAlign: "center" }} id="name" placeholder="New Project Name" value={newProject.name} required onChange={handleChange} />
            </label>
          </section>

          <section>
            <div>
              <label>
                <span>Deadline</span>
                <input id="deadline" type="date" defaultValue={new Date().toISOString().split('T')[0]} required onChange={handleChange} />
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
                <textarea id="description" rows={5} cols={100} required placeholder="Enter description here" onChange={handleChange} />
              </label>
            </div>
          </section>

          <section style={{ border: "none" }}>
            {newProject.tests && newProject.tests.map((test, index) => (
              <section className="test-container" key={test.id}>
                <header>
                  <button className="icon-button-small" type="button" onClick={() => copyTest(index)}>
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <label style={{ flex: 2 }}>
                    <div>
                      <span>Test {index + 1} to run for function</span>
                    </div>
                    <input id={`main-function-${index}`} defaultValue={test.mainFunction} onChange={(event) => handleTestChange(event, index)} />
                  </label>

                  <button className="remove-button icon-button-small" type="button" onClick={() => deleteTest(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </header>
                <div style={{ marginTop: "30px" }}>
                  <div style={{ flex: 1 }}>
                    <span>Inputs</span>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ flex: 0.01 }}>#</th>
                          <th style={{ flex: 0.01 }}>Is Param?</th>
                          <th style={{ flex: 0.5 }}>Parameter value</th>
                          <th style={{ flex: 0.01 }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {test.inputs && test.inputs.map((input, idx) => (
                          <tr key={input.id}>
                            <td style={{ flex: 0.01 }}>
                              <div>{idx + 1}.</div>
                            </td>
                            <td style={{ flex: 0.01, padding: 0 }}>
                              <label style={{ padding: 0, margin: 0 }}>
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
                            <td style={{ flex: 0.5 }}>
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
                    <button type="button" onClick={() => createInput(index)}>Add Input</button>
                  </div>

                  <div style={{ flex: 0.5, marginLeft: "10px" }}>
                    <span>Output</span>
                    <table>
                      <thead>
                        <tr>
                          <th>Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ flex: 0.5 }}>
                            <textarea
                              id={`output-code-${index}`}
                              defaultValue={test.output.code}
                              rows={1}
                              onChange={(event) => handleTestChange(event, index)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            ))}

            <button style={{ width: "100%" }} type="button" onClick={createTest}>Add Test</button>
          </section>
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
