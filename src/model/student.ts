import { IStudent } from "../interfaces/iStudent"
import { IUser } from "../interfaces/iUser"
import { User } from "./user"

export class Student extends User{
    subjects: string[]
    projects: string[]

    constructor(props: IUser, {subjects, projects}: IStudent) {
        super(props)

        this.subjects = subjects
        this.projects = projects
    }

    joinClass(){
        console.log("hello")
    }

    quitClass(){}

    joinProject(){}

    QuitProject(){}
    
}
