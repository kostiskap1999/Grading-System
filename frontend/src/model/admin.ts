import { IAdmin, IAdminDefaults } from "../interfaces/iAdmin"
import { IProfessor, IProfessorDefaults } from "../interfaces/iProfessor"
import { IStudent, IStudentDefaults } from "../interfaces/iStudent"
import { IUser, IUserDefaults } from "../interfaces/iUser"
import { Professor } from "./professor"

export class Admin extends Professor {
    constructor(props: IUser = IUserDefaults) {
        super(props)
        
    }

}
