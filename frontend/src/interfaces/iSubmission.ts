import { User } from "../model/user";

export interface ISubmission {
    id: number;
    student?: User;
    code: string;
    date: Date;
    grade: number | null;
    comment: string;
    submitee_id: number
    project_id: number
}

export const ISubmissionDefaults = {
    id: -1,
    student: undefined,
    code: "",
    date: new Date(),
    grade: null,
    comment: "",
    submitee_id: -1,
    project_id: -1
}
