import { ProjectModel } from "../model/ProjectModel";

export interface ISubject {
    id: number;
    name: string;
    description: string;
    semester: number;
    projects: ProjectModel[];
    supervisorID: number;
    userGrade: number | null;
    averageGrade: number | null;
}

export const ISubjectDefaults = {
    id: -1,
    name: "",
    description: "",
    semester: -1,
    projects: [],
    supervisorID: -1,
    userGrade: null,
    averageGrade: null
}
