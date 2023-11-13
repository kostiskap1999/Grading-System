import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import CodeSandbox from "../components/codeSandbox";
import { fetchAndSetupSubmissions, fetchAndSetupUser } from "../fetches/helpers/massFetching";
import { Submission } from "../model/submission";
import { User } from "../model/user";

export default function SubmissionsPage() {

  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [submissions, setSubmissions] = useState<Submission[]>([new Submission()])
  const [selectedSubmission, setSelectedSubmission] = useState<Submission>(new Submission())

  
  const [user, setUser] = useState<User>(new User())

  const [rerender, setRerender] = useState<number>(0)

  const [userRole, setUserRole] = useState<string>("")  
  useEffect(() => {
    const fetchData = async () => {
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
  }, [rerender, userRole])

  useEffect(() => {
    const fetchRole = async () => {
      const cookies: Cookies = new Cookies();
      const userRole: string = cookies.get('role-temp')
      setUserRole(userRole)
    }
    fetchRole()
  }, [userRole])

  useEffect(() => {
    const fetchData = async () => {
      const cookies: Cookies = new Cookies();
      const userID: number = cookies.get('user_id')
      const userOBJ: User = await fetchAndSetupUser(userID)
      setUser(userOBJ)
    }

    fetchData()
  }, [])

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title row">
        {userRole === "professor" || userRole === "admin" ? <>
          <button style={{flex: 1}} onClick={() => navigate('/new-submission')}>New Submission</button>
        </> : <div style={{flex: 1}}></div>}
        <div className="text center column" style={{flex: 4}}>
          <div>This is a list of all the submissions. You can participate in all the submissions whose subjects you follow.</div>
          <div className="row">
            <div>There are pending submissions from subjects.</div>
          </div>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="row"  style={{flex: 6}}>
        <div className="column container" style={{flex: 0.8}}>
          <div>Submission for </div>
          <div className="column" style={{overflow:'scroll'}}>
            {submissions.map((submission, index) => (
              <button key={index} className="button"
                onClick={() => {navigate('/submissions?project='+ params.get('project') +'&id=' + submission.id); setRerender(rerender+1)}}
              >
                {submission.student?.username}
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1, padding:"10px", justifyContent:"space-between"}}>
            {selectedSubmission.id === -1 ? <></> : <>
            <div>
              <div className="center" style={{padding:"30px"}}>
                <div className="header-text">{selectedSubmission.student?.username}</div>
              </div>
              <div style={{margin: "20px"}}>
                <div className="large-text center">Submission Code</div>
                <CodeSandbox paramCode={selectedSubmission.code} />
              </div>
            </div>
            </>}
        </div>
      </div>
    </div>
  );
}
