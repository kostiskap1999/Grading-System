import { useEffect, useState } from "react";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { fetchUser } from "../fetches/helpers/userHelpers";
import { IAdmin, IAdminDefaults } from "../interfaces/iAdmin";
import { IProfessor, IProfessorDefaults } from "../interfaces/iProfessor";
import { IStudent, IStudentDefaults } from "../interfaces/iStudent";

export default function HomePage() {

  const [user, setUser] = useState(IUserDefaults)
  
  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: IUser = await fetchUser()
      setUser(userOBJ)
    }

    fetchData()
  })

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{backgroundColor: "red", flex: 1, display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <div>Welcome {user.username}</div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>You have {}</div>
        </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", flex: 5}}>
        <div style={{backgroundColor: "green", flex: 1}}>Subjects List</div>
        <div style={{backgroundColor: "blue", flex: 1}}>Projects List</div>
      </div>
    </div>
  );
}