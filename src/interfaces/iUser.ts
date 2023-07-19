export interface IUser {
    id: number;
    username: string;
    role: string;
}

export const IUserDefaults = {
    id: -1,
    username: "",
    role: ""
}
