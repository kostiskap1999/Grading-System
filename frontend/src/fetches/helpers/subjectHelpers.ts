// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do

import { ISubjectExtraData, ISubjectExtraDataDefaults } from "../../interfaces/iSubject";
import { Project } from "../../model/project";
import { fetchProjects } from "../fetchProjects";
import { fetchSubjectsExtraData } from "../fetchSubjects";

export async function fetchSubjectExtraData(id: number) {
    const subjectsExtraData: ISubjectExtraData[] = await fetchSubjectsExtraData()
    var returnedSubjectExtraData: ISubjectExtraData = ISubjectExtraDataDefaults

    subjectsExtraData.forEach((subjectExtraData: ISubjectExtraData) => {
        if(subjectExtraData.id === id){
            returnedSubjectExtraData = subjectExtraData
        }
    });
    
    return returnedSubjectExtraData
}

export async function fetchSubjectProjects(id: number) {
    const projects: Project[] = await fetchProjects()
    var subjectProjectObjects: Project[] = []

    const subjectProjectsID: number[] = (await fetchSubjectExtraData(id)).projects

    //Extract user from users
    projects.forEach((project: Project) => {
        if(subjectProjectsID.includes(project.id)){
            subjectProjectObjects.push(project)
        }
    });

    return subjectProjectObjects
}
