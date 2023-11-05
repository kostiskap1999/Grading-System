// This is a list of helper functions to mass fetch with one function call

import { Admin } from "../../model/admin";
import { Professor } from "../../model/professor";
import { Project } from "../../model/project";
import { Subject } from "../../model/subject";
import { User } from "../../model/user";
import { fetchProjects } from "../fetchProjects";
import { fetchSubjects } from "../fetchSubjects";
import { fetchUser } from "../fetchUsers";

export async function fetchAllUserData(id: number) {
    const user: User = await fetchUser(id)
    await user.setup()

    if (user instanceof Professor)
        for(const subject of user.subjects)
            for(const project of subject.projects)
                await project.setup()

    return user
}

export async function fetchAllSubjectData() {
    const subjects: Subject[] = await fetchSubjects()

    for(const subject of subjects){
        await subject.setup()
        for(const project of subject.projects)
            await project.setup()
    }

    return subjects
}

export async function fetchAllProjectData() {
    const projects: Project[] = await fetchProjects()

    for(const project of projects)
        await project.setup()
        

    return projects
}
