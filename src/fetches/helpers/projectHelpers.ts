// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do

import { IProjectExtraData, IProjectExtraDataDefaults } from "../../interfaces/iProject";
import { Project } from "../../model/project";
import { fetchProjects, fetchProjectsExtraData } from "../fetchProjects";

export async function fetchProjectExtraData(id: number) {
    const projectsExtraData: IProjectExtraData[] = await fetchProjectsExtraData()
    var returnedProjectExtraData: IProjectExtraData = IProjectExtraDataDefaults

    projectsExtraData.forEach((projectExtraData: IProjectExtraData) => {
        if(projectExtraData.id === id){
            returnedProjectExtraData = projectExtraData
        }
    });

    return returnedProjectExtraData
}

export async function fetchProjectSubmissions(id: number) {
    const projects: Project[] = await fetchProjects()
    var projectProjectObjects: Project[] = []

    const projectProjectsID: number[] = (await fetchProjectExtraData(id)).submissions

    //Extract user from users
    projects.forEach((project: Project) => {
        if(projectProjectsID.includes(project.id)){
            projectProjectObjects.push(project)
        }
    });

    return projectProjectObjects
}
