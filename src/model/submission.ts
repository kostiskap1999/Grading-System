import { ISubmission } from "../interfaces/iSubmission";
import { User } from "./user";

export class Submission {
    id: number;
    student: User;
    code: string;
    date: string;
    grade: number;

    constructor({id, student, code, date, grade}: ISubmission) {
        this.id = id
        this.student = student
        this.code = code
        this.date = date
        this.grade = grade
    }
}
