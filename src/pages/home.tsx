import { useEffect, useState } from "react";
import { IUserDefaults } from "../interfaces/iUser";
import { User } from "../model/user";
import { fetchAllUserData } from "../fetches/helpers/massFetching";

export default function HomePage() {

  const [user, setUser] = useState(IUserDefaults)
  
  useEffect(() => {
    const fetchData = async () => {
      const userOBJ: User = await fetchAllUserData()
      
      setUser(userOBJ)
      console.log(userOBJ)
    }

    fetchData()
  }, [])

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