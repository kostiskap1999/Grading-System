import { IProfessor } from "../interfaces/iProfessor"
import { IStudent } from "../interfaces/iStudent"
import { IUser } from "../interfaces/iUser"
import { Professor } from "./professor"

export class Admin extends Professor {
    constructor(props: IUser, studProps: IStudent, profProps: IProfessor) {
        super(props, studProps, profProps)
        
    }

}
