import { IUser, IUserDefaults } from "../interfaces/iUser";

export class User {
    id: number; // unique id
    username: string; // unique username
    role: string; // admin, professor, student

    constructor({id, username, role}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.role = role
    }
}
