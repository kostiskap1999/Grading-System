export interface IUser {
    id: number;
    username: string;
    role: string;
    subjects: string[],
    projects: string[]
}

export const IUserDefaults = {
    id: -1,
    username: "",
    role: "",
    subjects: new Array(),
    projects: new Array()
}
