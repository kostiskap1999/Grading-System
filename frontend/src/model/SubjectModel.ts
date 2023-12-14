import { fetchSubjectProjects } from "../api/projectsApi";
import { fetchProjectUserSubmission } from "../api/submissionsApi";
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
    averageGrade: number | null;

    constructor({id, name, description, semester, projects, supervisorID, userGrade, averageGrade}: ISubject = ISubjectDefaults) {
        this.id = id
        this.name = name
        this.description = description
        this.semester = semester
        this.projects = projects
        this.supervisorID = supervisorID
        this.userGrade = userGrade
        this.averageGrade = averageGrade
    }

    async setup(userID?: number, userRole?: number){
        const projects: ProjectModel[] | null = await fetchSubjectProjects(this.id)
        let gradeSum = 0
        let subjectsGraded = 0
        if(projects){
            for(const project of projects){
                if(userRole != undefined && userRole <= 1)
                    await project.setup()
                else{
                    await project.setup(userID)
                }

                if(userID){
                    const submission = await fetchProjectUserSubmission(project.id, userID)
                    if(submission && submission.grade != null){
                        gradeSum += submission.grade
                        subjectsGraded++
                    }
                }


            }
            this.projects = projects
            this.userGrade = isNaN(gradeSum / subjectsGraded) ? null : gradeSum / subjectsGraded
            console.log('hi')
        }
    }
}
