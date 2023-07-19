import { Project } from "../model/project";

export interface ISubject {
    id: number;
    name: string;
    description: string;
    projects: Project[];
}

export const ISubjectDefaults = {
    id: -1,
    name: "",
    description: "",
    projects: []
}