import { SubmissionModel } from "../model/SubmissionModel";
import { TestModel } from "../model/TestModel";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: SubmissionModel[];
    tests: TestModel[]
    averageGrade: number | null;
}

export const IProjectDefaults = {
    id: -1,
    name: "",
    description: "",
    deadline: new Date(),
    submissions: [],
    tests: [],
    averageGrade: null
}
