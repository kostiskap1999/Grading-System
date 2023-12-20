import Cookies from "universal-cookie";
import { IUser, UserModel } from "../model/UserModel";
import { HOSTNAME, LOGIN, LOGINHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export interface ICredentials {
    username: string;
    password: string;
}


interface ILoggedIn {
    user: IUser;
    token: string;
}

export async function login(credentials: ICredentials) {
    return await fetch(HOSTNAME + LOGIN, LOGINHEADERS(credentials))
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((user: ILoggedIn) => {
        const cookies = new Cookies()
        cookies.set('token', JSON.stringify(user.token), { path: '/' })
    
        return new UserModel(user.user)
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
