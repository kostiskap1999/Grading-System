import { Submission } from "../model/submission";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: string;
    submissions: Submission[];
}
