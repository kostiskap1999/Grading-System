// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do

import { IUserExtraData, IUserExtraDataDefaults } from "../../interfaces/iUser";
import { User } from "../../model/user";
import { fetchUsersExtraData } from "../fetchUsers";
import { fetchIdFromToken } from "./tokenHelpers";

export async function fetchUserExtraData(id?: number) {
    const usersExtraData: IUserExtraData[] = await fetchUsersExtraData()
    var loggedUserExtraData: IUserExtraData = IUserExtraDataDefaults
    var loggedID: number

    if(id == null)
        loggedID = await fetchIdFromToken()
    else
        loggedID = id

    //Extract user from users
    usersExtraData.forEach((userExtraData: IUserExtraData) => {
        if(userExtraData.id === loggedID){
            loggedUserExtraData = userExtraData
        }
    });

    return loggedUserExtraData
}
