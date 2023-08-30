import { Project } from "../model/project";
import { Subject } from "../model/subject";

export interface IUser {
    id: number,
    username: string,
    role: string,
    subjects: Subject[],
    projects: Project[]
}

export interface IUserExtraData {
    id: number,
    subjects: number[]
}

export const IUserDefaults = {
    id: -1,
    username: "",
    role: "",
    subjects: new Array(),
    projects: new Array()
}

export const IUserExtraDataDefaults = {
    id: -1,
    subjects: new Array()
}
