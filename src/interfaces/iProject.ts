import { Submission } from "../model/submission";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    submissions: Submission[];
}

export const IProjectDefaults = {
    id: -1,
    name: "",
    description: "",
    deadline: new Date(),
    submissions: []
}
