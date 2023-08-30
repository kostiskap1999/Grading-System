
import { fetchProjects } from "../fetches/fetchProjects";
import { fetchSubjectExtraData } from "../fetches/helpers/subjectHelpers";
import { ISubject, ISubjectDefaults } from "../interfaces/iSubject";
import { Project } from "./project";

export class Subject {
    id: number;
    name: string;
    description: string;
    projects: Project[];

    constructor({id, name, description, projects}: ISubject = ISubjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.projects = projects
    }

    async setup(){
        this.setProjects(await this.getProjects())
    }

    async getProjects() {
        const projects: Project[] = await fetchProjects()
        var subjectProjectObjects: Project[] = []
    
        const subjectProjectIDs: number[] = (await fetchSubjectExtraData(this.id)).projects
    
        projects.forEach(async (project: Project) => {
            if(subjectProjectIDs.includes(project.id)){
                subjectProjectObjects.push(project)
            }
        });
    
        return subjectProjectObjects
    }

    setProjects(projects: Project[]){
        projects.forEach(project => {
            this.projects.push(new Project(project))
        });
    }
}
