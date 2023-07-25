import { ICredentials } from "../interfaces/iCredentials";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { Admin } from "../model/admin";
import { Professor } from "../model/professor";
import { Student } from "../model/student";
import { User } from "../model/user";
import { errorHandling } from "../util/error";
import { checkUserbase } from "./checkUserbase";

export async function login(credentials: ICredentials) {
    const loggedID: number = await checkUserbase(credentials)
    var loggedUser: IUser = new User()

    if (loggedID != -1){
        const users = await fetch("mock/usersMock.json")
        .then(response => {
            if(!response.ok) throw new Error(JSON.stringify(response.status));
            else return response.json();
        })
        .catch((error) => {
            errorHandling(error)
        });

        //Extract user from users
        users.forEach((user: IUser) => {
            if(user.id == loggedID){
                if(user.role == "admin")
                    loggedUser = new Admin(user)
                else if(user.role == "professor")
                    loggedUser = new Professor(user)
                else if(user.role == "student")
                    loggedUser = new Student(user)
                else
                    loggedUser = new User(user)
            }
        });
    }

    return loggedUser
}
