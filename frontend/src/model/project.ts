import { fetchSubmissions } from "../fetches/fetchSubmissions";
import { IProject, IProjectDefaults } from "../interfaces/iProject";
import { Submission } from "./submission";
import { Test } from "./test";

export class Project {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: Submission[];
    tests: Test[]
    subjectID: number | null;

    constructor({id, name, description, deadline, submissions, tests}: IProject = IProjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.submissions = submissions
        this.tests = tests

        // only used in posting
        this.subjectID = null
    }

    async setup(){
        this.submissions = await fetchSubmissions(this.id)
    }

}
