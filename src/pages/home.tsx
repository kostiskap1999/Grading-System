import { useEffect, useState } from "react";
import { IUserDefaults } from "../interfaces/iUser";
import { User } from "../model/user";
import { fetchAllUserData } from "../fetches/helpers/massFetching";
import { Subject } from "../model/subject";
import { Project } from "../model/project";

export default function HomePage() {

  const [user, setUser] = useState<User>(new User())
  
  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: User = await fetchAllUserData()
      setUser(userOBJ)
    }

    fetchData()
  }, [])

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{backgroundColor: "red", flex: 1, display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <div>Welcome {user.username}</div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>You have {user.subjects.length}</div>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", flex: 5}}>
        <div style={{backgroundColor: "green", flex: 1}}>
          {user.subjects.map((subject) => (
                <div>{subject.name}</div>
            ))}
        </div>
        <div style={{backgroundColor: "blue", flex: 1}}>
          {user.getProjects().map((project: Project) => (
              <div>{project.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}