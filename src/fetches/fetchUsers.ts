import { IUser } from "../interfaces/iUser";
import { errorHandling } from "../util/error";

export async function fetchUsers() {
    const users: IUser[] = await fetch("mock/usersMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return users
}
