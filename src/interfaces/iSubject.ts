import { Project } from "../model/project";

export interface ISubject {
    id: number;
    name: string;
    description: string;
    projects: Project[];
}
