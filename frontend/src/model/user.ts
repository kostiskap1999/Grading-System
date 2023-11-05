import { fetchSubjects, fetchUserSubjects } from "../fetches/fetchSubjects";
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
        await this.setSubjects(await fetchUserSubjects(this.id))
    }

    // async getSubjects() {
    //     const subjects: [] = await fetchUserSubjects(this.id)
    //     return subjects
    // }

    async setSubjects(subjects: []){
        this.subjects = []
        for(const subject of subjects){
            const subjectOBJ = new Subject(subject)
            await subjectOBJ.setup()
            this.subjects.push(subjectOBJ)
        }
    }

    hasSubject(id: number){
        return this.subjects.some((subject) => subject.id == id)
    }

    hasProject(id: number){
        return this.getProjects().some((project) => project.id == id)
    }
    
    getSubjectsWithProjects(){
        var subjects: Subject[] = []
        for(const subject of this.subjects){
            if(subject.projects.length > 0)
            subjects.push(subject)
        }
        return subjects
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
