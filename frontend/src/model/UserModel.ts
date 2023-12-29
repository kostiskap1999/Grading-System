import { fetchUserSubjects } from "../api/subjectsApi";
import { ProjectModel } from "./ProjectModel";
import { SubjectModel } from "./SubjectModel";
import { SubmissionModel } from "./SubmissionModel";

export interface IUser {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    role: number; // 0=admin, 1=professor, 2=student
    subjects: SubjectModel[];
    averageGrade: number | null;
}

export class UserModel {
    id: number; // unique id
    username: string; // unique username
    firstName: string;
    lastName: string;
    role: number; // 0=admin, 1=professor, 2=student, 3=guest
    subjects: SubjectModel[];
    averageGrade: number | null;

    constructor(user: IUser = {} as IUser) {
        this.id = user.id
        this.username = user.username
        this.firstName = user.first_name
        this.lastName = user.last_name
        this.role = user.role
        this.subjects = user.subjects ?? []
        this.averageGrade = user.averageGrade
    }

    async setup(){
        const subjects: SubjectModel[] | null = await fetchUserSubjects(this.id)
        let gradeSum = 0
        let subjectsGraded = 0
        if(subjects){
            for(const subject of subjects){
                await subject.setup(this.id, this.role)
                if(subject.userGrade){
                    gradeSum += subject.userGrade ?? 0
                    subjectsGraded++
                }
                    
            }
            this.subjects = subjects
            this.averageGrade = gradeSum / subjectsGraded
        }
    }

    hasSubject(id: number){
        return this.subjects.some((subject) => subject.id == id)
    }

    hasProject(id: number){
        return this.getProjects().some((project) => project.id == id)
    }
    
    getSubjectsWithProjects(){
        var subjects: SubjectModel[] = []
        for(const subject of this.subjects){
            if(subject.projects.length > 0)
            subjects.push(subject)
        }
        return subjects
    }

    getSubjects(filterSupervising?: number) {
        const submittedSubjects: SubjectModel[] = []
    
        for (const subject of this.subjects){
            const isSupervising =
                !filterSupervising ||
                (filterSupervising === -1 && (subject.supervisorID !== this.id)) ||
                (filterSupervising === 1 && (subject.supervisorID === this.id))
    
            if (isSupervising)
                submittedSubjects.push(subject)
        }
    
        return submittedSubjects
    }

    getProjects({filterSubmitted, filterDeadline, filterGrades, filterSupervising}: Partial<{filterSubmitted?: number, filterDeadline?: number, filterGrades?: number, filterSupervising?: number}> = {}) {
        const submittedProjects: ProjectModel[] = []
    
        for (const subject of this.subjects){
            const isSupervising =
                !filterSupervising ||
                (filterSupervising === -1 && (subject.supervisorID !== this.id)) ||
                (filterSupervising === 1 && (subject.supervisorID === this.id))
    
            if (isSupervising)
                for (const project of subject.projects) {
                    const isWithinDeadline =
                        !filterDeadline ||
                        (filterDeadline === -1 && (project.deadline as Date).getTime() < new Date().getTime()) ||
                        (filterDeadline === 1 && (project.deadline as Date).getTime() > new Date().getTime())
    
                    const userSubmission = project.submissions.find(submission => submission.submiteeId === this.id);
                    const shouldConsiderSubmission =
                        !filterSubmitted ||
                        (filterSubmitted === -1 && !userSubmission) ||
                        (filterSubmitted === 1 && userSubmission)
                    const isGraded =  // if userSubmission exists, then check if it is graded, otherwise always false
                        !filterGrades ||
                        (filterGrades === -1 && !(userSubmission?.grade ?? false)) ||
                        (filterGrades === 1 && userSubmission?.grade)
    
                    if (shouldConsiderSubmission && isWithinDeadline && isGraded)
                        submittedProjects.push(project)
                }
        }
    
        return submittedProjects
    }
    
    
    getSubmissions(){
        var submissions: SubmissionModel[] = []
        for(const subject of this.subjects)
            for(const project of subject.projects)
                for(const submission of project.submissions)
                    if(submission.submiteeId == this.id)
                        submissions.push(submission)
        
        return submissions
    }
}
