import { fetchSubmissions } from "../fetches/fetchSubmissions";
import { IProject, IProjectDefaults } from "../interfaces/iProject";
import { Submission } from "./submission";

export class Project {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: Submission[];
    subjectID: number | null;

    constructor({id, name, description, deadline, submissions}: IProject = IProjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.submissions = submissions

        // only used in posting
        this.subjectID = null
    }

    async setup(){
        this.submissions = await fetchSubmissions(this.id)
    }

}
