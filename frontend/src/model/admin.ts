import { IUser, IUserDefaults } from "../interfaces/iUser"
import { Professor } from "./professor"

export class Admin extends Professor {
    constructor(props: IUser = IUserDefaults) {
        super(props)
        
    }

}
