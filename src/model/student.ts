import { IStudent, IStudentDefaults } from "../interfaces/iStudent"
import { IUser, IUserDefaults } from "../interfaces/iUser"
import { User } from "./user"

export class Student extends User{
    subjects: string[] = []
    projects: string[] = []

    constructor(props: IUser = IUserDefaults, {subjects, projects}: IStudent = IStudentDefaults) {
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
