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
    createInput(project.tests.length-1)
    setRerender(rerender+1)
    
  }

  const createInput = (testIndex: number) => {
    const project: Project = newProject
    project.tests[testIndex].inputs.push(new TestInput())
    project.tests[testIndex].inputs[project.tests[testIndex].inputs.length-1].id = project.tests[testIndex].inputs.length //I promise this line is necessary and completely not hansaplast
    setRerender(rerender+1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> ) => {
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

  const handleTestChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, testIndex: number, inputIndex?: number) => {
    const project: Project = newProject
    switch(event.target.id) {
      case "main-function" :
        project.tests[testIndex].main = event.target.value
        break
      case "input-name" :
        project.tests[testIndex].inputs[inputIndex!].name = event.target.value
        break
      case "input-code" :
        project.tests[testIndex].inputs[inputIndex!].code = event.target.value
        break
      case "input-is-main-param" :
        project.tests[testIndex].inputs[inputIndex!].isMainParam = (event.target as HTMLInputElement).checked
        break
      case "output-code" :
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
      <div className="header-title text center column">
        New Project Page
      </div>
      <form className="form text" onSubmit={createProject}>
        <section>
          <header className="header-text">Characteristics</header>
          <div>
            <label>
              <span>Name</span>
              <input id="name" placeholder="Enter project here" required onChange={handleChange}/>
            </label>
            <label>
              <span>Deadline</span>
              <input id="deadline" type="date" required onChange={handleChange}/>
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
            <label>
              <span>Description</span>
              <textarea id="description" rows={5} cols={30} required placeholder="Enter description here" onChange={handleChange}/>
            </label>
          </div>
        </section>

        <section>
          <header className="header-text">Tests</header>
          {newProject.tests.map((test, index) => (
            <div key={index}>
              <label style={{flex: 0.5}}>
                <span>Main Function</span>
                <textarea id="main-function" rows={1} onChange={(event) => handleTestChange(event, index)}/>
              </label>
              <label style={{flex: 3}}>
                <span>Inputs</span>
                {test.inputs.map((input, idx) => (
                  <div key={idx}>
                    <label style={{flex: 0.01}}>
                      <span style={{fontSize: 12}}>Is Param?</span>
                      <input id="input-is-main-param" type="checkbox" onChange={(event) => handleTestChange(event, index, idx)}/>
                    </label>
                    <label style={{flex: 0.4}}>
                      <span>Parameter name</span>
                      <textarea id="input-name" rows={1} defaultValue={input.name} onChange={(event) => handleTestChange(event, index, idx)}/>
                    </label>
                    <label style={{flex: 0.5}}>
                      <span>Parameter value</span>
                      <textarea id="input-code" rows={1} defaultValue={input.code} onChange={(event) => handleTestChange(event, index, idx)}/>
                    </label>
                  </div>
                ))}
                <button type="button" onClick={() => createInput(index)}>Add Input</button>
              </label>
              <label style={{flex: 0.5}}>
                <span>Output Code</span>
                <textarea id="output-code" rows={1} onChange={(event) => handleTestChange(event, index)}/>
              </label>
            </div>
          ))}
          
          <button type="button" className="button" onClick={createTest}>Add Test</button>

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
