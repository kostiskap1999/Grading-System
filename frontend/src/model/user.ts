import { fetchUserSubjects } from "../api/subjectsApi";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { Project } from "./project";
import { Subject } from "./subject";

export class User {
    id: number; // unique id
    username: string; // unique username
    firstName: string;
    lastName: string;
    role: number; // 0=admin, 1=professor, 2=student, 3=guest
    subjects: Subject[];

    constructor({id, username, first_name, last_name, role, subjects = []}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.firstName = first_name
        this.lastName = last_name
        this.role = role
        this.subjects = subjects
    }

    async setup(){
        const subjects: Subject[] | null = await fetchUserSubjects(this.id)
        if(subjects){
            for(const subject of subjects)
                await subject.setup(this.role)
            this.subjects = subjects
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
        for(const subject of this.subjects)
            for(const project of subject.projects)
                projects.push(project)
        
        return projects
    }
}
