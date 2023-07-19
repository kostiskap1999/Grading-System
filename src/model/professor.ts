import { IProfessor, IProfessorDefaults } from "../interfaces/iProfessor"
import { IStudent, IStudentDefaults } from "../interfaces/iStudent"
import { IUser, IUserDefaults } from "../interfaces/iUser"
import { Student } from "./student"

export class Professor extends Student {
    test: string

    constructor(props: IUser = IUserDefaults, studProps: IStudent = IStudentDefaults, {test}: IProfessor = IProfessorDefaults) {
        super(props, studProps)
        this.test = test
    }
    
    createClass(){
        console.log("hi")
    }

    deleteClass(){}

    createProject(){}

    deleteProject(){}
}
