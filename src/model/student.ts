import { IStudent, IStudentDefaults } from "../interfaces/iStudent"
import { IUser, IUserDefaults } from "../interfaces/iUser"
import { User } from "./user"

export class Student extends User{

    constructor(props: IUser = IUserDefaults) {
        super(props)
    }

    joinClass(){
        console.log("hello")
    }

    quitClass(){}

    joinProject(){}

    QuitProject(){}
    
}
