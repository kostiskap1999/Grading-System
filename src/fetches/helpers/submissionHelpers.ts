// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do
import { User } from "../../model/user";
import { fetchUsers } from "../fetchUsers";

export async function fetchUserRef(id?: number) {
    const users: User[] = await fetchUsers()
    var refUser: User = new User()

    //Extract user from users
    users.forEach((user: User) => {
        if(user.id === id){
            refUser = new User({id: user.id, username: user.username, role: user.role, subjects: []})
        }
    });

    return refUser
}
