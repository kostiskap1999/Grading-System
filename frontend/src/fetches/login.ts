import { ICredentials } from "../interfaces/iCredentials";
import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { HOSTNAME, LOGIN, LOGINHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";


export async function login(credentials: ICredentials) {
    
    const user: IUser = await fetch(HOSTNAME + LOGIN, LOGINHEADERS(credentials))
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });
    
    return new User(user)
}
