import { IProject } from "../interfaces/iProject";
import { Submission } from "./submission";

export class Project {
    id: number;
    name: string;
    description: string;
    deadline: string;
    submissions: Submission[];

    constructor({id, name, description, deadline, submissions}: IProject) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.submissions = submissions
    }
}
