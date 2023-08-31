// This is a list of helper functions to mass fetch with one function call

import { Admin } from "../../model/admin";
import { Professor } from "../../model/professor";
import { Subject } from "../../model/subject";
import { User } from "../../model/user";
import { fetchUser } from "./userHelpers";

export async function fetchAllUserData(id?: number) {
    const user: User = await fetchUser(id)
    await user.setup()

    if (user instanceof Professor)
        for(const subject of user.subjects)
            for(const project of subject.projects)
                project.setup()

    return user
}