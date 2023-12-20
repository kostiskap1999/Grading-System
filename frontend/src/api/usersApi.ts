import { UserModel } from "../model/UserModel";
import { GETHEADERS, HOSTNAME, USERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchUsers() {
    return await fetch(HOSTNAME + USERS, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((users: any[]) => {
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
    .then((user: any) => {
        return new UserModel(user)
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });

    
}
