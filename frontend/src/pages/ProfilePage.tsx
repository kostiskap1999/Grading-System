import { useEffect, useState } from "react";
import { fetchAndSetupUser } from "../api/helpers/massSetups";
import { ProjectModel } from "../model/ProjectModel";
import { UserModel } from "../model/UserModel";

import { useNavigate } from "react-router-dom";
import { SubjectModel } from "../model/SubjectModel";
import { fetchTokenId } from "../api/tokenApi";
import { PageButtonDescription } from "../components/pageComponents";

export default function ProfilePage() {

  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel>()
  const [profile, setProfile] = useState<UserModel>()

  const url = new URL(window.location.href)
  const params = url.searchParams

  useEffect(() => {
    const fetchData = async () => {
      const tokenId: number | null = await fetchTokenId()

      if(tokenId){
        const userOBJ: UserModel | null = await fetchAndSetupUser(tokenId, 2)
        userOBJ && setUser(userOBJ)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      if(user){
        if(user.role <= 1){
            const parsedId: string = (params.get('id') === null) ? user.id.toString() : params.get('id')!.toString()
            if(parseInt(parsedId) === user.id){
              setProfile(user)
            }
            else{
              const prof: UserModel | null = await fetchAndSetupUser(parseInt(parsedId), 2)
              prof && setProfile(prof)
            }
        }else{
            navigate('/profile')
            setProfile(user)
        }
      }
    }
    fetchProfile()
  }, [user])

  return (
    <div className="page column">
      <div className="top-header medium-text center column" style={{flex: 1}}>
        <div></div>
        <div className="row">{profile && `Welcome to your profile ${profile.firstName} ${profile.lastName}`}</div>
      </div>
      <div className="row" style={{flex: 1}}>
        <div style={{flex: (user && user?.role>1) ? 1 : 3 }}>
          <div className="row">
              <div className="column">
                <div style={{margin: "20px 50px"}}>
                    <div className="large-text">User Profile</div>
                    <div className='profile-data'>
                        <div>Username</div>
                        <div>{profile?.username}</div>
                    </div>
                    <div className='profile-data'>
                        <div>Full Name</div>
                        <div>{profile?.firstName} {profile?.lastName}</div>
                    </div>
                    <div className='profile-data'>
                        <div>Role</div>
                        <div>{profile?.role == 3 ? "Guest" : profile?.role == 2 ? "Student" : profile?.role == 1 ? "Professor" : profile?.role == 0 && "Admin"}</div>
                    </div>
                </div>
                <div style={{margin: "20px 50px"}}>
                    <div className="large-text">Stats</div>
                    <div className='profile-data'>
                        <div>Joined Subjects</div>
                        <div>{profile?.subjects.length}</div>
                    </div>
                    <div className='profile-data'>
                        <div>Total Projects</div>
                        <div>{profile?.getProjects().length}</div>
                    </div>
                    {profile && profile.role > 1 && <>
                        <div className='profile-data'>
                            <div>My Submitted Projects</div>
                            <div>{profile?.getSubmissions().length}</div>
                        </div>
                        <div className='profile-data'>
                            <div>Average Grade</div>
                            <div>{profile?.averageGrade ? profile?.averageGrade?.toFixed(2) : "No data"}</div>
                        </div>
                    </>}
                </div>
              </div>
              {profile && profile.role <= 1 &&
                <div className="column">
                  <div style={{margin: "20px 50px"}}>
                      <div className="large-text">Professor Stats</div>
                      <div className='profile-data'>
                          <div>Supervising Subjects</div>
                          <div>{profile?.getSubjects(1).length}</div>
                      </div>
                  </div>
                </div>
              }
            </div>
        </div>
        <div className="row" style={{flex: profile && profile.role > 1 ? 3 : 1}}>
            <div className="column container" style={{flex: 1}}>
                <div className="medium-text center header-title">My Subjects</div>
                <div className="column" style={{overflow:'scroll'}}>
                    {user && profile && profile.subjects.map((subject: SubjectModel, index: number) => (
                    <button key={index} className="list-button" onClick={() => navigate('/subjects?id=' + subject.id + '&nav-filter=my')}>
                        <PageButtonDescription component={subject} showGrade={profile.role > 1} />
                    </button>
                    ))}
                </div>
            </div>
            {profile && profile.role > 1 && <>
            <div className="column container" style={{flex: 1}}>
                <div className="medium-text center header-title">My Graded Projects</div>
                <div className="column" style={{overflow:'scroll'}}>
                    {profile && profile.getProjects({filterGrades: 1}).map((project: ProjectModel, index: number) => (
                        <button key={index} className="list-button" onClick={() => navigate('/projects?id=' + project.id)}>
                        <PageButtonDescription component={project.getUserSubmission(profile.id)!} displayName={project.name} showGrade={profile.role > 1} />
                        </button>
                    ))}
                </div>
            </div>
            </>}
        </div>
      </div>
    </div>
  );
}