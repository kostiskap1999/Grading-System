import { fetchSubmissions } from "../fetches/fetchSubmissions";
import { IProject, IProjectDefaults } from "../interfaces/iProject";
import { Submission } from "./submission";

export class Project {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: Submission[];

    constructor({id, name, description, deadline, submissions}: IProject = IProjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.submissions = submissions
    }

    async setup(){
        this.setSubmissions(await fetchSubmissions())
    }

    // async getSubmissions() {
    //     const submissions: Submission[] = await fetchSubmissions()
    //     var projectSubmissionObjects: Submission[] = []
    
    //     const projectSubmissionIDs: number[] = (await fetchProjectExtraData(this.id)).submissions    
    //     for (const submission of submissions){
    //         if(projectSubmissionIDs.includes(submission.id)){
    //             var studentID: string = submission?.student?.toString() == undefined ? "0" : submission.student.toString() //hansaplast method
    //             submission.student = await fetchUserRef(parseInt(studentID)) //hansaplast method
    //             projectSubmissionObjects.push(submission)
    //         }
    //     };
    
    //     return projectSubmissionObjects
    // }

    setSubmissions(submissions: Submission[]){
        this.submissions = []
        submissions.forEach(submission => {
            this.submissions.push(new Submission(submission))
        });
    }
}
