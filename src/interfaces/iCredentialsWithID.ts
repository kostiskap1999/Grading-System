export interface ICredentialsWithID {
    id: number;
    username: string;
    password: string;
}

export const ICredentialsWithIDDefaults = {
    id: -1,
    username: "",
    password: ""
}
