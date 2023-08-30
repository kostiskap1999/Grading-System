export interface ISubmission {
    id: number;
    student: string;
    code: string;
    date: Date;
    grade: number;
    comment: string;
}

export const ISubmissionDefaults = {
    id: -1,
    student: "a",
    code: "",
    date: new Date(),
    grade: 0,
    comment: ""
}
