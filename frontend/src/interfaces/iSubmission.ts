import { User } from "../model/user";

export interface ISubmission {
    id: number;
    student?: User;
    code: string;
    date: Date;
    grade: number;
    comment: string;
    submitee_id: number
}

export const ISubmissionDefaults = {
    id: -1,
    student: undefined,
    code: "",
    date: new Date(),
    grade: 0,
    comment: "",
    submitee_id: -1
}

export interface IPostSubmission {
    code: string;
    date: string;
    comment: string;
    submitee_id: number;
    project_id: number;
}

export const IPostSubmissionDefaults = {
    code: "",
    date: "1900-1-1",
    comment: "",
    submitee_id: -1,
    project_id: -1
}