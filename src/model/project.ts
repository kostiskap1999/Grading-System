import { fetchSubmissions } from "../fetches/fetchSubmissions";
import { fetchProjectExtraData } from "../fetches/helpers/projectHelpers";
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

    async setup(){
        this.setSubmissions(await this.getSubmissions())
    }

    async getSubmissions() {
        const submissions: Submission[] = await fetchSubmissions()
        var projectSubmissionObjects: Submission[] = []
    
        const projectSubmissionIDs: number[] = (await fetchProjectExtraData(this.id)).submissions
    
        submissions.forEach(async (submission: Submission) => {
            if(projectSubmissionIDs.includes(submission.id)){
                projectSubmissionObjects.push(submission)
            }
        });
    
        return projectSubmissionObjects
    }

    setSubmissions(submissions: Submission[]){
        submissions.forEach(submission => {
            this.submissions.push(new Submission(submission))
        });
    }
}
