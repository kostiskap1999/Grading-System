import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { GETHEADERS, HOSTNAME, USERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchUsers() {
    return await fetch(HOSTNAME + USERS, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status));
        else
            return response.json();
    })
    .then((users: IUser[]) => {
        return users
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });

    
}

export async function fetchUser(id: number) {
    return await fetch(HOSTNAME + USERS + "/" + id, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((user: IUser) => {
        return new User(user)
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });

    
}
