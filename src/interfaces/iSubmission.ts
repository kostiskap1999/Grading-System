import { User } from "../model/user";

export interface ISubmission {
    id: number;
    student: User;
    code: string;
    date: string;
    grade: number;
}
