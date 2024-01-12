import { fetchUser } from "../api/usersApi";
import { UserModel } from "./UserModel";

export interface ISubmission {
    id: number;
    name: string;
    student?: UserModel;
    code: string;
    date: Date;
    grade: number | null;
    submiteeId: number
    projectId: number
}


export class SubmissionModel {
    id: number;
    name: string;
    student?: UserModel;
    code: string;
    date: Date;
    grade: number | null;
    
    submiteeId: number; //only used for setup
    projectId: number; //only used for posting

    constructor(submission: ISubmission = {} as ISubmission) {
        this.id = submission.id
        this.name = submission.name
        this.student = submission.student
        this.code = submission.code
        this.date = submission.date
        this.grade = submission.grade
        this.submiteeId = submission.submiteeId
        this.projectId = submission.projectId
    }

    async setup(){
        this.student = await fetchUser(this.submiteeId) ?? this.student
    }

}
