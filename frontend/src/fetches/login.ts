import { ICredentials } from "../interfaces/iCredentials";
import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { HOSTNAME, LOGIN, LOGINHEADERS } from "../parameters/database";
import { errorHandling } from "../util/error";
import { checkUserbase } from "./helpers/loginHelpers";
import { fetchToken } from "./helpers/tokenHelpers";
import { fetchUser } from "./helpers/userHelpers";


export async function loginNew(credentials: ICredentials) {
    
    const user: User = await fetch(HOSTNAME + LOGIN, LOGINHEADERS(credentials))
    .then(response => {
        if(!response.ok) {console.log(response); throw new Error(JSON.stringify(response.status));}
        else return response.json();
    })
    .catch((error) => {
        console.log(error)
        // errorHandling(error)
    });
    
    console.log(user)
    // var loggedUser: IUser = new User(user)
    // var token: string = ""

    // return {loggedUser, token}
}

export async function login(credentials: ICredentials) {
    const loggedID: number = await checkUserbase(credentials)
    var loggedUser: IUser = new User()
    var token: string = ""

    if (loggedID !== -1){
        loggedUser = await fetchUser(loggedID)
        token = await fetchToken(loggedID)
    }

    return {loggedUser, token}
}
