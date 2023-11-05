import { ICredentials } from "../interfaces/iCredentials";
import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { HOSTNAME, LOGIN, LOGINHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";
import { checkUserbase } from "./helpers/loginHelpers";
import { fetchToken } from "./helpers/tokenHelpers";
import { fetchUser } from "./helpers/userHelpers";


export async function login(credentials: ICredentials) {
    
    const user: User = await fetch(HOSTNAME + LOGIN, LOGINHEADERS(credentials))
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });
    
    console.log(user)
    var loggedUser: IUser = new User(user)

    return loggedUser
}
