import { ProjectModel } from "../model/ProjectModel";
import { GETHEADERS, HOSTNAME, POSTHEADERS, PROJECTS, SUBJECTPROJECTS, USERPROJECTS } from "../parameters/database";
import { errorHandling } from "../util/error";

import '../util/yymmdd';

export async function fetchProjects() {
    return await fetch(HOSTNAME + PROJECTS, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((projects: any[]) => {
        const returnedProjects: ProjectModel[] = []
        for(const project of projects){
            project.deadline = new Date(project.deadline) // .toLocaleString('el-GR', { timeZone: 'UTC' })
            returnedProjects.push(new ProjectModel(project))
        }
            
    
        return returnedProjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchProject(id: number) {
    return await fetch(HOSTNAME + PROJECTS + "/" + id, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((project: any) => {
        project.deadline = new Date(project.deadline) // .toLocaleString('el-GR', { timeZone: 'UTC' })
        return new ProjectModel(project)
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchUserProjects(userId: number) {
    return await fetch(HOSTNAME + USERPROJECTS + "/" + userId, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((userProjects: any[]) => {
        const returnedProjects: ProjectModel[] = []
        for(const project of userProjects){
            project.deadline = new Date(project.deadline) // .toLocaleString('el-GR', { timeZone: 'UTC' })
            returnedProjects.push(new ProjectModel(project))
        }
    
        return returnedProjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function fetchSubjectProjects(subjectId: number) {
    return await fetch(HOSTNAME + SUBJECTPROJECTS + "/" + subjectId, GETHEADERS())
    .then(response => {
        if(!response.ok)
            throw new Error(JSON.stringify(response.status))
        else
            return response.json()
    })
    .then((userProjects: any[]) => {
        const returnedProjects: ProjectModel[] = []
        for(const project of userProjects){
            project.deadline = new Date(project.deadline) // .toLocaleString('el-GR', { timeZone: 'UTC' })
            returnedProjects.push(new ProjectModel(project))
        }

        return returnedProjects
    })
    .catch((error) => {
        errorHandling(error)
        return null
    });
}

export async function postProject(project: ProjectModel) {
    const response: boolean | void = await fetch(HOSTNAME + PROJECTS, POSTHEADERS(project))
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.ok;
    })
    .catch((error) => {
        errorHandling(error)
    });

    return response
}
