import { IProfessor, IProfessorDefaults } from "../interfaces/iProfessor"
import { IStudent, IStudentDefaults } from "../interfaces/iStudent"
import { IUser, IUserDefaults } from "../interfaces/iUser"
import { Student } from "./student"

export class Professor extends Student {
    constructor(props: IUser = IUserDefaults) {
        super(props)
    }
    
    createClass(){
        console.log("hi")
    }

    deleteClass(){}

    createProject(){}

    deleteProject(){}
}
