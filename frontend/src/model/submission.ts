import { fetchUser } from "../fetches/fetchUsers";
import { ISubmission, ISubmissionDefaults } from "../interfaces/iSubmission";
import { User } from "./user";

export class Submission {
    id: number;
    student?: User;
    code: string;
    date: Date;
    grade: number | null;
    comment: string;
    
    submitee_id: number; //only used for setup
    project_id: number; //only used for posting

    constructor({id, student, code, date, grade, comment, submitee_id, project_id}: ISubmission = ISubmissionDefaults) {
        this.id = id
        this.student = student
        this.code = code
        this.date = date
        this.grade = grade
        this.comment = comment
        this.submitee_id = submitee_id
        this.project_id = project_id
    }

    async setup(){
        this.student = await fetchUser(this.submitee_id) ?? this.student
    }

}
