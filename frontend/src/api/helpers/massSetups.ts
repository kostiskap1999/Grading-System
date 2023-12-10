// This is a list of helper functions to mass fetch with one function call
import { Project } from "../../model/project";
import { Subject } from "../../model/subject";
import { Submission } from "../../model/submission";
import { User } from "../../model/user";
import { fetchProjects } from "../projectsApi";
import { fetchSubjects } from "../subjectsApi";
import { fetchSubmissions } from "../submissionsApi";
import { fetchUser } from "../usersApi";

export async function fetchAndSetupUser(id: number) {
    const user: User | null = await fetchUser(id)
    
    if(user)
        await user.setup()
    
    return user
}

export async function fetchAndSetupSubjects() {
    const subjects: Subject[] | null = await fetchSubjects()

    if(subjects)
        for(const subject of subjects)
            await subject.setup()

    return subjects
}

export async function fetchAndSetupProjects() {
    const projects: Project[] | null = await fetchProjects()

    if(projects)
        for(const project of projects)
            await project.setup()

    return projects
}

export async function fetchAndSetupSubmissions(projectID: number) {
    const submissions: Submission[] | null = await fetchSubmissions(projectID)

    if(submissions)
        for(const submission of submissions)
            await submission.setup()
        

    
    return submissions
}
