import { useEffect, useState } from "react";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { SubjectModel } from "../model/SubjectModel";
import '../styles/button.scss';
import '../styles/general.scss';
import '../styles/home.scss';
import '../styles/newProject.scss';
import { fetchTokenID } from "../api/tokenApi";
import { SubmissionModel } from "../model/SubmissionModel";

export default function ProfilePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>(new UserModel())
  
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
      <div className="header-title text center column" style={{flex: 1}}>
        <div>{user.firstName} {user.lastName}</div>
        <div className="row">
          <div>Your average grade is {user.averageGrade}.</div>
        </div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user.subjects.map((subject: SubjectModel, index: number) => (
                  <button key={index} className="button" onClick={() => navigate('/subjects?id=' + subject.id)}>
                    <div style={{backgroundColor:"transparent", justifyContent:"space-between"}} className="row center">
                      <span>{}</span>
                      <span>{subject.name}</span>
                      <span className={`grade-box ${subject.userGrade !== null ? (subject.userGrade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
                        {subject.userGrade !== null ? subject.userGrade : " - "}
                      </span>
                    </div>
                  </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Unsubmitted Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user.getUnsubmittedProjects().map((project: ProjectModel, index: number) => (
                <button key={index} className="button" onClick={() => navigate('/projects?id=' + project.id)}>
                  {project.name}
                </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Submissions</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user.getSubmissions().map((submission: SubmissionModel, index: number) => (
                <button key={index} className="button" onClick={() => navigate('/projects?id=' + submission.project_id)}>
                    <div style={{backgroundColor:"transparent", justifyContent:"space-between"}} className="row center">
                      <span>{}</span>
                      <span>{submission.name}</span>
                      <span className={`grade-box ${submission.grade !== null ? (submission.grade >= 5 ? 'green-box' : 'red-box') : 'gray-box'}`}>
                        {submission.grade !== null ? submission.grade : " - "}
                      </span>
                    </div>
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}