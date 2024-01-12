import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CodeSandbox from "../components/codeSandbox";
import { fetchAndSetupSubmissions } from "../api/helpers/massSetups";
import { SubmissionModel } from "../model/SubmissionModel";
import { ProjectModel } from "../model/ProjectModel";
import { fetchProject } from "../api/projectsApi";
import { ProjectEntry, SubmissionEntry } from "../components/pageComponents";
import { PageButtonDescription } from "../components/pageComponents";

export default function SubmissionsPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [submissions, setSubmissions] = useState<SubmissionModel[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectModel>()
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionModel>()

  const [rerender, setRerender] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
        const selProject: ProjectModel | null = await fetchProject(parseInt(params.get('project')?.toString()!))
        if(selProject){
          await selProject.setup({setupDepth: 5})
          setSelectedProject(selProject)
          setSubmissions(selProject.submissions)
        }
      
    }

    fetchData()
  }, [])


  useEffect(() => {
    if(selectedProject){
        const parsedId: string = (params.get('id') === null) ? "" : params.get('id')!.toString()
        for(const submission of selectedProject.submissions){
            if(submission.id === parseInt(parsedId)){
                setSelectedSubmission(submission)
                break
            }
        }
    }
  })

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="top-header medium-text center column">
        <div>This is a list of all the submissions for project {selectedProject != undefined ? selectedProject.name: "undefined"}.</div>
      </div>
      <div className="row"  style={{flex: 6}}>
        <div className="column container" style={{flex: 0.8}}>
          {selectedProject ? <ProjectEntry project={selectedProject} /> : <></> }
          <div className="column" style={{overflow:'scroll'}}>
            {submissions.map((submission, index) => (
              <button key={index} className="list-button"
                onClick={() => {navigate('/submissions?project='+ params.get('project') +'&id=' + submission.id); setRerender(rerender+1)}}
              >
                <PageButtonDescription component={submission} showGrade={true} />
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1, justifyContent:"space-between"}}>
            {selectedSubmission && selectedProject && <SubmissionEntry project={selectedProject} submission={selectedSubmission} />}
        </div>
      </div>
    </div>
  );
}
