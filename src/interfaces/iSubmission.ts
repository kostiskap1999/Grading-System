import { Student } from "../model/student";

export interface ISubmission {
    id: number;
    student: Student;
    code: string;
    date: Date;
    grade: number;
}

export const ISubmissionDefaults = {
    id: -1,
    student: new Student(),
    code: "",
    date: new Date(),
    grade: 0
}
