import { IUser } from "../interfaces/iUser";
import { Project } from "./project";
import { Subject } from "./subject";

export class User {
    id: number; // unique id
    username: string; // unique username
    role: string; // admin, professor, student

    constructor({id, username, role}: IUser) {
        this.id = id
        this.username = username
        this.role = role
    }
}
