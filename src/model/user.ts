import { fetchSubjects } from "../fetches/fetchSubjects";
import { fetchUserExtraData } from "../fetches/helpers/userExtraHelpers";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { Project } from "./project";
import { Subject } from "./subject";

export class User {
    id: number; // unique id
    username: string; // unique username
    role: string; // admin, professor, student
    subjects: Subject[];

    constructor({id, username, role, subjects = []}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.role = role
        this.subjects = subjects
    }

    async setup(){
        await this.setSubjects(await this.getSubjects())
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

    async setSubjects(subjects: Subject[]){
        this.subjects = []
        for(const subject of subjects){
            var subjectOBJ = new Subject(subject)
            await subjectOBJ.setup()
            this.subjects.push(subjectOBJ)
        }
    }

    getProjects(){
        var projects: Project[] = []
        for(const subject of this.subjects){
            for(const project of subject.projects)
            projects.push(project)
        }
        return projects
    }
}
