import { ISubmission, ISubmissionDefaults } from "../interfaces/iSubmission";
import { Student } from "./student";

export class Submission {
    id: number;
    student: Student;
    code: string;
    date: Date;
    grade: number;

    constructor({id, student, code, date, grade}: ISubmission = ISubmissionDefaults) {
        this.id = id
        this.student = student
        this.code = code
        this.date = date
        this.grade = grade
    }
}
