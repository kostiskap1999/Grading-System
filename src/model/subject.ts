import { IProject } from "../interfaces/iProject";
import { ISubject } from "../interfaces/iSubject";
import { Project } from "./project";

export class Subject {
    id: number;
    name: string;
    description: string;
    projects: Project[];

    constructor({id, name, description, projects}: ISubject) {
        this.id = id
        this.name = name
        this.description = description
        this.projects = projects
    }
}
