import { IUser } from "../interfaces/iUser";
import { User } from "../model/user";
import { GETHEADERS, HOSTNAME, TOKEN, USERS } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function checkToken() {
    const token: string = await fetch(HOSTNAME + TOKEN, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return token
}

export async function fetchTokenID() {
    const id: number = await fetch(HOSTNAME + TOKEN + "/id", GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return id
}

export async function fetchTokenRole() {
    const role: number = await fetch(HOSTNAME + TOKEN + "/role", GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return role
}
