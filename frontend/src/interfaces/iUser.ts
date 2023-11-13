import { Project } from "../model/project";
import { Subject } from "../model/subject";

export interface IUser {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    role: string,
    subjects: Subject[]
}


export const IUserDefaults = {
    id: -1,
    username: "",
    first_name: "",
    last_name: "",
    role: "",
    subjects: new Array()
}
