import { useEffect, useState } from "react";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";

import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel";
import '../styles/button.scss';
import '../styles/general.scss';
import '../styles/home.scss';
import '../styles/newProject.scss';
import { fetchTokenID } from "../api/tokenApi";
import { PageButtonDescription } from "../components/pageComponents";

export default function HomePage() {

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
      <div className="header-title text center column" style={{flex: 1}}>
        <div>{user && user.username}</div>
        <div className="row">
          <div>There are {user && user.getProjects().length} pending projects from {user && user.subjects.length} subjects.</div>
        </div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user?.subjects && user.subjects.map((subject: SubjectModel, index: number) => (
              <button key={index} className="button" onClick={() => navigate('/subjects?id=' + subject.id)}>
                <PageButtonDescription component={subject} />
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Unsubmitted Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user && user.getUnsubmittedProjects().map((project: ProjectModel, index: number) => (
              <button key={index} className="button" onClick={() => navigate('/projects?id=' + project.id)}>
                <PageButtonDescription component={project} userRole={1} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}