
import { fetchProjects, fetchUserProjects } from "../fetches/fetchProjects";
import { ISubject, ISubjectDefaults } from "../interfaces/iSubject";
import { Project } from "./project";

export class Subject {
    id: number;
    name: string;
    description: string;
    semester: number;
    projects: Project[];
    supervisorID: number;

    constructor({id, name, description, semester, projects, supervisorID}: ISubject = ISubjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.semester = semester
        this.projects = projects
        this.supervisorID = supervisorID
    }

    async setup(userRole?: string){
        const projects: Project[] = await fetchUserProjects(this.id)
        if(userRole == "professor" || userRole == "admin")
            for(const project of projects)
                await project.setup()
        this.projects = projects
    }
}
