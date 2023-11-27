import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import CodeSandbox from "../components/codeSandbox";
import { fetchAndSetupSubmissions, fetchAndSetupUser } from "../fetches/helpers/massFetching";
import { Submission } from "../model/submission";
import { User } from "../model/user";
import { Project } from "../model/project";
import { fetchProject, fetchProjects } from "../fetches/fetchProjects";

export default function SubmissionsPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [submissions, setSubmissions] = useState<Submission[]>([new Submission()])
  const [selectedProject, setSelectedProject] = useState<Project>(location.state?.project)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission>(new Submission())

  const [rerender, setRerender] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      if(selectedProject == undefined)
        setSelectedProject(await fetchProject(parseInt(params.get('project')?.toString()!)))
      
      const submissionsOBJ: Submission[] = await fetchAndSetupSubmissions(parseInt(params.get('project')?.toString()!))
      setSubmissions(submissionsOBJ)
      const parsedID: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
      for(const submission of submissionsOBJ){
        if(submission.id === parseInt(parsedID)){
          setSelectedSubmission(submission)
          break;
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
          {selectedProject != undefined ?
            <div>
              <div className="center" style={{padding:"30px"}}>
                <div className="header-text">{selectedProject.name}</div>
                <div className="small-text">Deadline: {selectedProject.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })}</div>
              </div>
              <div style={{margin: "20px"}}>
                <div className="large-text center">Project Description</div>
                <div className="small-text">{selectedProject.description}</div>
              </div>
            </div>
          : <></>}
          <div className="column" style={{overflow:'scroll'}}>
            {submissions.map((submission, index) => (
              <button key={index} className="button"
                onClick={() => {navigate('/submissions?project='+ params.get('project') +'&id=' + submission.id); setRerender(rerender+1)}}
              >
                {submission.student?.firstName + " " + submission.student?.lastName}
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
                <CodeSandbox project={selectedProject} paramCode={selectedSubmission.code} />
              </div>
            </div>
            </>}
        </div>
      </div>
    </div>
  );
}
