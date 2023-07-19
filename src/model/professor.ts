import { IProfessor } from "../interfaces/iProfessor"
import { IStudent } from "../interfaces/iStudent"
import { IUser } from "../interfaces/iUser"
import { Student } from "./student"

export class Professor extends Student {
    test: string

    constructor(props: IUser, studProps: IStudent, {test}: IProfessor) {
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
