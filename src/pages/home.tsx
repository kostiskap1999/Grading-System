import { useEffect, useState } from "react";
import { User } from "../model/user";
import { fetchAllUserData } from "../fetches/helpers/massFetching";
import { Project } from "../model/project";

import '../styles/general.scss';
import '../styles/home.scss';
import '../styles/button.scss';
import { Subject } from "../model/subject";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>(new User())
  
  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: User = await fetchAllUserData()
      setUser(userOBJ)
    }

    fetchData()
  }, [])

  return (
    <div className="page column" style={{overflow: 'hidden'}}>
      <div className="header-title text center column" style={{flex: 1}}>
        <div>{user.username}</div>
        <div className="row">
          <div>There are {user.getProjects().length} pending projects from {user.getSubjectsWithProjects().length} subjects.</div>
        </div>
      </div>
      <div className="row" style={{flex: 6}}>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Subjects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user.subjects.map((subject: Subject, index: number) => (
                  <button key={index} className="button" onClick={() => navigate('/subjects?id=' + subject.id)}>
                    {subject.name}
                  </button>
            ))}
          </div>
        </div>
        <div className="column container" style={{flex: 1}}>
          <div className="text center header-title">My Projects</div>
          <div className="column" style={{overflow:'scroll'}}>
            {user.getProjects().map((project: Project, index: number) => (
                <button key={index} className="button" onClick={() => navigate('/projects?id=' + project.id)}>
                  {project.name}
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}