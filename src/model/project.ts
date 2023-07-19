import { IProject, IProjectDefaults } from "../interfaces/iProject";
import { Submission } from "./submission";

export class Project {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    submissions: Submission[];

    constructor({id, name, description, deadline, submissions}: IProject = IProjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.submissions = submissions
    }
}
