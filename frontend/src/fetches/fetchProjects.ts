import { Project } from "../model/project";
import { GETHEADERS, HOSTNAME, POSTHEADERS, PROJECTS } from "../parameters/database";
import { errorHandling } from "../util/error";

import '../util/yymmdd'

export async function fetchProjects() {
    const projects: Project[] = await fetch(HOSTNAME + PROJECTS, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    const returnedProjects: Project[] = []
    for(const project of projects){
        project.deadline = project.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })
        returnedProjects.push(new Project(project))
    }
        

    return returnedProjects
}

export async function fetchUserProjects(userID: number) {
    const userProjects: Project[] = await fetch(HOSTNAME + PROJECTS + "/" + userID, GETHEADERS())
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    const returnedProjects: Project[] = []
    for(const project of userProjects){
        project.deadline = project.deadline.toLocaleString('el-GR', { timeZone: 'UTC' })
        returnedProjects.push(new Project(project))
    }

    return returnedProjects
}

export async function postProject(project: Project) {

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
