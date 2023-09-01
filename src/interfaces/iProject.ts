import { Submission } from "../model/submission";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: Submission[];
}

export interface IProjectExtraData {
    id: number,
    submissions: number[]
}

export const IProjectDefaults = {
    id: -1,
    name: "",
    description: "",
    deadline: new Date(),
    submissions: []
}

export const IProjectExtraDataDefaults = {
    id: -1,
    submissions: []
}