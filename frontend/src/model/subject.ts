
import { fetchProjects, fetchUserProjects } from "../fetches/fetchProjects";
import { fetchSubjectExtraData } from "../fetches/helpers/subjectHelpers";
import { ISubject, ISubjectDefaults } from "../interfaces/iSubject";
import { Project } from "./project";

export class Subject {
    id: number;
    name: string;
    description: string;
    semester: number;
    projects: Project[];

    constructor({id, name, description, semester, projects}: ISubject = ISubjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.semester = semester
        this.projects = projects
    }

    async setup(){
        this.setProjects(await fetchUserProjects(this.id))
    }

    // async getProjects(id: number) {
    //     const projects: Project[] = await fetchUserProjects(id)
    //     var subjectProjectObjects: Project[] = []
    
    //     const subjectProjectIDs: number[] = (await fetchSubjectExtraData(this.id)).projects
    
    //     projects.forEach(async (project: Project) => {
    //         if(subjectProjectIDs.includes(project.id)){
    //             subjectProjectObjects.push(project)
    //         }
    //     });
    
    //     return subjectProjectObjects
    // }

    setProjects(projects: Project[]){
        this.projects = []
        for(const project of projects)
            this.projects.push(new Project(project))
    }
}
