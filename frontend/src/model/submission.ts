import { fetchUser } from "../fetches/fetchUsers";
import { ISubmission, ISubmissionDefaults } from "../interfaces/iSubmission";
import { User } from "./user";

export class Submission {
    id: number;
    student?: User;
    code: string;
    date: Date;
    grade: number;
    comment: string;
    
    submiteeID: number; //only used for setup

    constructor({id, student, code, date, grade, comment, submitee_id}: ISubmission = ISubmissionDefaults) {
        this.id = id
        this.student = student
        this.code = code
        this.date = date
        this.grade = grade
        this.comment = comment
        this.submiteeID = submitee_id
    }

    async setup(){
        this.student = await fetchUser(this.submiteeID) ?? this.student
    }

}
