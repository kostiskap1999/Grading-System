import { IUser } from "./iUser";

export interface IStudent extends IUser{}

export const IStudentDefaults = {
    subjects: [],
    projects: []
}
