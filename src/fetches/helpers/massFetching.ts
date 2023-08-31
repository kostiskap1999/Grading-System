// This is a list of helper functions to mass fetch with one function call

import { User } from "../../model/user";
import { fetchUser } from "./userHelpers";

export async function fetchAllUserData(id?: number) {
    const user: User = await fetchUser(id)
    user.setup()

    if (user instanceof User){
        user.projects.forEach(project => {
            project.setup()
        });
    }

    return user
}