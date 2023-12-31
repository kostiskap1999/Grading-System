import { GETHEADERS, HOSTNAME, TOKEN } from "../parameters/database";
import { errorHandling } from "../util/error";

export async function checkToken() {
    await fetch(HOSTNAME + TOKEN, GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((token: string) => {
        return token
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchTokenId() {
    return await fetch(HOSTNAME + TOKEN + "/id", GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((id: number) => {
        return id
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchTokenRole() {
    return await fetch(HOSTNAME + TOKEN + "/role", GETHEADERS())
    .then(async response => {
        if(!response.ok)
            throw new Error(JSON.stringify({ status: response.status, message: (await response.json()).error }));
        else
            return response.json();
    })
    .then((role: number) => {
        return role
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}
