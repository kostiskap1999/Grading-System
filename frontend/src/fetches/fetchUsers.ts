import { IUserExtraData } from "../interfaces/iUser";
import { User } from "../model/user";
import { GETHEADERS, HOSTNAME, USER, USERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function fetchUser(id: number) {
    const user: User = await fetch(HOSTNAME + USER + "/" + id, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return user
}


export async function fetchUsers() {
    const users: User[] = await fetch(HOSTNAME + USERS, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return users
}
