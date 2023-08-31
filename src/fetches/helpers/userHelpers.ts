// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do

import { IUserExtraData, IUserExtraDataDefaults } from "../../interfaces/iUser";
import { Admin } from "../../model/admin";
import { Professor } from "../../model/professor";
import { Student } from "../../model/student";
import { User } from "../../model/user";
import { fetchUsers } from "../fetchUsers";
import { fetchUsersExtraData } from "../fetchUsers";
import { fetchIdFromToken } from "./tokenHelpers";

export async function fetchUserRole(id: number) {
    const users: User[] = await fetchUsers()
    var role: string = ""

    //Extract role from users
    users.forEach((user: User) => {
        if(user.id === id)
            role = user.role
    });

    return role
}

export async function fetchUser(id?: number) {
    const users: User[] = await fetchUsers()
    var loggedUser: User = new User()
    var loggedID: number

    console.log(loggedUser instanceof User)
    if(id == null)
        loggedID = await fetchIdFromToken()
    else
        loggedID = id

    //Extract user from users
    users.forEach((user: User) => {
        if(user.id === loggedID){
            if(user.role === "admin")
            //     loggedUser = new Admin(user)
            // else if(user.role === "professor")
            //     loggedUser = new Professor(user)
            // else if(user.role === "student")
                loggedUser = new Student(user)
            else
                loggedUser = new User(user)
        }
    });

    return loggedUser
}
