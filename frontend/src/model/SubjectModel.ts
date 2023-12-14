import { fetchSubjectProjects } from "../api/projectsApi";
import { ISubject, ISubjectDefaults } from "../interfaces/iSubject";
import { ProjectModel } from "./ProjectModel";

export class SubjectModel {
    id: number;
    name: string;
    description: string;
    semester: number;
    projects: ProjectModel[];
    supervisorID: number;
    userGrade: number | null;

    constructor({id, name, description, semester, projects, supervisorID, userGrade}: ISubject = ISubjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.semester = semester
        this.projects = projects
        this.supervisorID = supervisorID
        this.userGrade = userGrade
    }

    async setup(userRole?: number){
        const projects: ProjectModel[] | null = await fetchSubjectProjects(this.id)
        if(projects){
            if(userRole != undefined && userRole <= 1)
                for(const project of projects)
                    await project.setup()
            this.projects = projects
        }
    }
}
