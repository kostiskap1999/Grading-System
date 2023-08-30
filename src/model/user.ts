import { fetchSubjects } from "../fetches/fetchSubjects";
import { fetchUserExtraData } from "../fetches/helpers/userHelpers";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { Project } from "./project";
import { Subject } from "./subject";

export class User {
    id: number; // unique id
    username: string; // unique username
    role: string; // admin, professor, student
    subjects: Subject[];
    projects: Project[];

    constructor({id, username, role, subjects = [], projects = []}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.role = role
        this.subjects = subjects
        this.projects = projects
    }

    hi(){
        console.log("ho")
    }

    async setup(){
        this.setSubjects(await this.getSubjects())
    }

    async getSubjects() {
        const subjects: Subject[] = await fetchSubjects()
        var userSubjectObjects: Subject[] = []
    
        const userSubjectIDs: number[] = (await fetchUserExtraData(this.id)).subjects
    
        subjects.forEach(async (subject: Subject) => {
            if(userSubjectIDs.includes(subject.id)){
                userSubjectObjects.push(subject)
            }
        });
    
        return userSubjectObjects
    }

    setSubjects(subjects: Subject[]){
        subjects.forEach(subject => {
            var subjectOBJ = new Subject(subject)
            subjectOBJ.setup()
            this.subjects.push(subjectOBJ)
        });
    }
}
