import Cookies from "universal-cookie";
import { ICredentials, ILoggedIn } from "../interfaces/iCredentials";
import { User } from "../model/user";
import { HOSTNAME, LOGIN, LOGINHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";


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
    
        return new User(user.user)
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
