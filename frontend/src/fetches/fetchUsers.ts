import { IUserExtraData } from "../interfaces/iUser";
import { User } from "../model/user";
import { errorHandling } from "../util/error";

export async function fetchUsers() {
    const users: User[] = await fetch("mock/usersMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return users
}

export async function fetchUsersExtraData() {
    const usersExtraData: IUserExtraData[] = await fetch("mock/usersExtraDataMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return usersExtraData
}
