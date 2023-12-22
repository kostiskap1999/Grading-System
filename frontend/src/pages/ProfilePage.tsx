import { useEffect, useState } from "react";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";

import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel";
import { fetchTokenID } from "../api/tokenApi";
import { SubmissionModel } from "../model/SubmissionModel";
import { PageButtonDescription } from "../components/pageComponents";

export default function ProfilePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>()
  
  useEffect(() => {
    const fetchData = async () => {
      const tokenID: number | null = await fetchTokenID()

      if(tokenID){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenID)
        userOBJ && setUser(userOBJ)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="page column">
      <div className="top-header text center column" style={{flex: 1}}>
        <div>{user && user.firstName} {user && user.lastName}</div>
        <div className="row">
          <div>Your average grade is {user && user.averageGrade?.toFixed(2)}.</div>
        </div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user && user.subjects.map((subject: SubjectModel, index: number) => (
              <button key={index} className="list-button" onClick={() => navigate('/subjects?id=' + subject.id)}>
                <PageButtonDescription component={subject} userRole={1} />
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Unsubmitted Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user && user.getUnsubmittedProjects().map((project: ProjectModel, index: number) => (
                <button key={index} className="list-button" onClick={() => navigate('/projects?id=' + project.id)}>
                  <PageButtonDescription component={project} />
                </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Submissions</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user && user.getSubmissions().map((submission: SubmissionModel, index: number) => (
                <button key={index} className="list-button" onClick={() => navigate('/projects?id=' + submission.project_id)}>
                  <PageButtonDescription component={submission} userRole={1} />
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}