import { fetchSubjectProjects } from "../fetches/fetchProjects";
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

    async setup(userRole?: number){
        const projects: Project[] = await fetchSubjectProjects(this.id)
        if(userRole != undefined && userRole <= 1)
            for(const project of projects)
                await project.setup()
        this.projects = projects
    }
}
