import { fetchUser } from "../api/usersApi";
import { ISubmission, ISubmissionDefaults } from "../interfaces/iSubmission";
import { UserModel } from "./UserModel";

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

    constructor({id, name, student, code, date, grade, comment, submitee_id, project_id}: ISubmission = ISubmissionDefaults) {
        this.id = id
        this.name = name
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
