
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
}
