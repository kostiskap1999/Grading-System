import { Project } from "../model/project";

export interface ISubject {
    id: number;
    name: string;
    description: string;
    semester: number;
    projects: Project[];
    supervisorID: number;
}

export interface ISubjectExtraData {
    id: number,
    projects: number[]
}

export const ISubjectDefaults = {
    id: -1,
    name: "",
    description: "",
    semester: -1,
    projects: [],
    supervisorID: -1
}

export const ISubjectExtraDataDefaults = {
    id: -1,
    projects: []
}
