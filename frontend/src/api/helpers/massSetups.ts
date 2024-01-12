// This is a list of helper functions to mass fetch with one function call
import { ProjectModel } from "../../model/ProjectModel";
import { SubjectModel } from "../../model/SubjectModel";
import { SubmissionModel } from "../../model/SubmissionModel";
import { UserModel } from "../../model/UserModel";
import { fetchProjects } from "../projectsApi";
import { fetchSubjects } from "../subjectsApi";
import { fetchSubmissions } from "../submissionsApi";
import { fetchUser } from "../usersApi";

export async function fetchAndSetupUser(id: number, setupDepth?: number) {
    const user: UserModel | null = await fetchUser(id)

    if(user)
        await user.setup(setupDepth)
    
    return user
}

export async function fetchAndSetupSubjects(setupDepth?: number) {
    const subjects: SubjectModel[] | null = await fetchSubjects()

    if(subjects)
        for(const subject of subjects)
            await subject.setup({setupDepth: setupDepth})

    return subjects
}

export async function fetchAndSetupProjects(setupDepth?: number) {
    const projects: ProjectModel[] | null = await fetchProjects()

    if(projects)
        for(const project of projects)
            await project.setup({setupDepth: setupDepth})

    return projects
}

export async function fetchAndSetupSubmissions(projectId: number) {
    const submissions: SubmissionModel[] | null = await fetchSubmissions(projectId)

    if(submissions)
        for(const submission of submissions)
            await submission.setup()
        

    
    return submissions
}
