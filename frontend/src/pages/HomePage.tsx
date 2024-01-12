import { useEffect, useState } from "react";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";

import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel";
import { fetchTokenId } from "../api/tokenApi";
import { PageButtonDescription } from "../components/pageComponents";

export default function HomePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>()
  
  useEffect(() => {
    const fetchData = async () => {
      const tokenId: number | null = await fetchTokenId()

      if(tokenId){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenId, 1)
        userOBJ && setUser(userOBJ)
      }      
    }

    fetchData()
  }, [])

  return (
    <div className="page column">
      <div className="top-header medium-text center column" style={{flex: 1}}>
        <div>{user && `Hello ${user.firstName} ${user.lastName}`}</div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="center header-title">My Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user?.subjects && user.subjects.map((subject: SubjectModel, index: number) => (
              <button key={index} className="list-button" onClick={() => navigate('/subjects?id=' + subject.id + '&joined=1')}>
                <PageButtonDescription component={subject} />
              </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="center header-title">My Unsubmitted Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user && user.getProjects({filterDeadline: 1}).map((project: ProjectModel, index: number) => (
              <button key={index} className="list-button" onClick={() => navigate('/projects?id=' + project.id)}>
                <PageButtonDescription component={project} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}