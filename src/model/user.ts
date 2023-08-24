import { IUser, IUserDefaults } from "../interfaces/iUser";

export class User {
    id: number; // unique id
    username: string; // unique username
    role: string; // admin, professor, student
    subjects: string[];
    projects: string[];

    constructor({id, username, role, subjects, projects}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.role = role
        this.subjects = subjects
        this.projects = projects
    }
}
