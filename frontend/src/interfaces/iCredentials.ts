import { UserModel } from "../model/UserModel";
import { IUser } from "./iUser";

export interface ICredentials {
    username: string;
    password: string;
}

export const ICredentialsDefaults = {
    username: "",
    password: ""
}

export interface ILoggedIn {
    user: IUser;
    token: string;
}

export const ILoggedInDefaults = {
    user: new UserModel(),
    token: ""
}
