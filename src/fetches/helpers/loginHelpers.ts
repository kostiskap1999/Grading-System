// This is a helper fetch that only checks credentials for local mock data for login. Since in a real scenario,
// the user's credentials would get checked in the database, there would be no need for such a function.
import { ICredentials } from "../../interfaces/iCredentials";
import { ICredentialsWithID, ICredentialsWithIDDefaults } from "../../interfaces/iCredentialsWithID";
import { errorHandling } from "../../util/error";


async function fetchCredentials() {
    var userbase: ICredentialsWithID[] = await fetch("mock/userbase.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return userbase
}


export async function checkUserbase({username, password}: ICredentials) {
    var loggedID: number = ICredentialsWithIDDefaults.id // -1 if no user is found, id of the user otherwise
    var userbase: ICredentialsWithID[] = await fetchCredentials()

    //Extract user from userbase
    userbase.forEach((user: ICredentialsWithID) => {
        if(user.username == username && user.password == password)
            loggedID = user.id
    });

    return loggedID
}
