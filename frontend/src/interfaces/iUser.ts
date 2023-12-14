import { SubjectModel } from "../model/SubjectModel";

export interface IUser {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    role: number; // 0=admin, 1=professor, 2=student
    subjects: SubjectModel[];
    averageGrade: number | null;
}

export const IUserDefaults = {
    id: -1,
    username: "",
    first_name: "",
    last_name: "",
    role: 3,
    subjects: new Array(),
    averageGrade: null
}
