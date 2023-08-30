import { IProjectExtraData } from "../interfaces/iProject";
import { Project } from "../model/project";
import { errorHandling } from "../util/error";

export async function fetchProjects() {
    const projects: Project[] = await fetch("mock/projectsMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return projects
}

export async function fetchProjectsExtraData() {
    const projectsExtraData: IProjectExtraData[] = await fetch("mock/projectsExtraDataMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return projectsExtraData
}

