import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CodeSandbox from "../components/codeSandbox";
import { fetchAndSetupSubmissions } from "../api/helpers/massSetups";
import { SubmissionModel } from "../model/SubmissionModel";
import { ProjectModel } from "../model/ProjectModel";
import { fetchProject } from "../api/projectsApi";
import { ProjectEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";

export default function SubmissionsPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [submissions, setSubmissions] = useState<SubmissionModel[]>([new SubmissionModel()])
  const [selectedProject, setSelectedProject] = useState<ProjectModel>(location.state?.project)
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionModel>(new SubmissionModel())

  const [rerender, setRerender] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      if(selectedProject == undefined){
        const selProject: ProjectModel | null = await fetchProject(parseInt(params.get('project')?.toString()!))
        
        if(selProject){
          selProject.setup()
          setSelectedProject(selProject)
        }

      }
      
      const submissionsOBJ: SubmissionModel[] | null = await fetchAndSetupSubmissions(parseInt(params.get('project')?.toString()!))
      
      if(submissionsOBJ){
        setSubmissions(submissionsOBJ)
        const parsedID: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
        for(const submission of submissionsOBJ){
          if(submission.id === parseInt(parsedID)){
            setSelectedSubmission(submission)
            break;
          }
        } 
      }
    }

    fetchData()
  }, [rerender])

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title row">
        <div style={{flex: 1}}></div>
        <div className="text center" style={{flex: 4}}>
          <div>This is a list of all the submissions for project {selectedProject != undefined ? selectedProject.name: "undefined"}.</div>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="row"  style={{flex: 6}}>
        <div className="column container" style={{flex: 0.8}}>
          {selectedProject ? <ProjectEntry project={selectedProject} /> : <></>}
          <div className="column" style={{overflow:'scroll'}}>
            {submissions.map((submission, index) => (
              <button key={index} className="button"
                onClick={() => {navigate('/submissions?project='+ params.get('project') +'&id=' + submission.id); setRerender(rerender+1)}}
              >
                <PageButtonDescription component={submission} />
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1, padding:"10px", justifyContent:"space-between"}}>
            {selectedSubmission.id === -1 ? <></> : <>
            <div>
              <div className="center" style={{padding:"30px"}}>
                <div className="header-text">{selectedSubmission.student?.firstName + " " + selectedSubmission.student?.lastName}</div>
              </div>
              <div style={{margin: "20px"}}>
                <div className="large-text center">Submission Code</div>
                
                <div className="center" style={{padding:"10px"}}>
                  <div className="small-text">
                    <span>Submission Grade: </span>
                    <span className={`grade-box ${selectedSubmission.grade !== null ? (selectedSubmission.grade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
                      {selectedSubmission.grade !== null ?
                        (selectedSubmission.grade % 1 !== 0 ? selectedSubmission.grade?.toFixed(1) : selectedSubmission.grade)
                      : " - "}
                    </span>
                  </div>
                </div>
                <CodeSandbox project={selectedProject} submission={selectedSubmission} />
              </div>
            </div>
            </>}
        </div>
      </div>
    </div>
  );
}
