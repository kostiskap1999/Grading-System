import { fetchUser } from "../api/usersApi";
import { UserModel } from "./UserModel";

export interface ISubmission {
    id: number;
    name: string;
    student?: UserModel;
    code: string;
    date: Date;
    grade: number | null;
    comment: string;
    submitee_id: number
    project_id: number
}


export class SubmissionModel {
    id: number;
    name: string;
    student?: UserModel;
    code: string;
    date: Date;
    grade: number | null;
    comment: string;
    
    submitee_id: number; //only used for setup
    project_id: number; //only used for posting

    constructor(submission: ISubmission = {} as ISubmission) {
        this.id = submission.id
        this.name = submission.name
        this.student = submission.student
        this.code = submission.code
        this.date = submission.date
        this.grade = submission.grade
        this.comment = submission.comment
        this.submitee_id = submission.submitee_id
        this.project_id = submission.project_id
    }

    async setup(){
        this.student = await fetchUser(this.submitee_id) ?? this.student
    }

}
