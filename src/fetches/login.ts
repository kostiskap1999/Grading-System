import { ICredentials } from "../interfaces/iCredentials";
import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { checkUserbase } from "./helpers/loginHelpers";
import { fetchUser } from "./helpers/userHelpers";

export async function login(credentials: ICredentials) {
    const loggedID: number = await checkUserbase(credentials)
    var loggedUser: IUser = new User()

    if (loggedID !== -1)
        loggedUser = await fetchUser(loggedID)

    return loggedUser
}
