import { User } from "../model/user";

export interface ISubmission {
    id: number;
    student?: User;
    code: string;
    date: Date;
    grade: number;
    comment: string;
}

export const ISubmissionDefaults = {
    id: -1,
    student: undefined,
    code: "",
    date: new Date(),
    grade: 0,
    comment: ""
}
