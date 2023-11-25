import { Submission } from "../model/submission";
import { Test } from "../model/test";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: Submission[];
    tests: Test[]
}

export const IProjectDefaults = {
    id: -1,
    name: "",
    description: "",
    deadline: new Date(),
    submissions: [],
    tests: []
}
