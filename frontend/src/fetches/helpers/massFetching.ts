// This is a list of helper functions to mass fetch with one function call
import { Project } from "../../model/project";
import { Subject } from "../../model/subject";
import { Submission } from "../../model/submission";
import { User } from "../../model/user";
import { fetchProjects } from "../fetchProjects";
import { fetchSubjects } from "../fetchSubjects";
import { fetchSubmissions } from "../fetchSubmissions";
import { fetchUser } from "../fetchUsers";

export async function fetchAndSetupUser(id: number) {
    const user: User = await fetchUser(id)
    await user.setup()
    
    return user
}

export async function fetchAndSetupSubjects() {
    const subjects: Subject[] = await fetchSubjects()

    for(const subject of subjects)
        await subject.setup()

    return subjects
}

export async function fetchAndSetupProjects() {
    const projects: Project[] = await fetchProjects()

    for(const project of projects)
        await project.setup()

    return projects
}

export async function fetchAndSetupSubmissions(projectID: number) {
    const submissions: Submission[] = await fetchSubmissions(projectID)

    for(const submission of submissions){
        await submission.setup()
        console.log(submission)
    }
        

    
    return submissions
}
