import { fetchUserSubjects } from "../api/subjectsApi";
import { IUser, IUserDefaults } from "../interfaces/iUser";
import { ProjectModel } from "./ProjectModel";
import { SubjectModel } from "./SubjectModel";
import { SubmissionModel } from "./SubmissionModel";

export class UserModel {
    id: number; // unique id
    username: string; // unique username
    firstName: string;
    lastName: string;
    role: number; // 0=admin, 1=professor, 2=student, 3=guest
    subjects: SubjectModel[];

    constructor({id, username, first_name, last_name, role, subjects = []}: IUser = IUserDefaults) {
        this.id = id
        this.username = username
        this.firstName = first_name
        this.lastName = last_name
        this.role = role
        this.subjects = subjects
    }

    async setup(){
        const subjects: SubjectModel[] | null = await fetchUserSubjects(this.id)
        if(subjects){
            for(const subject of subjects)
                await subject.setup(this.role)
            this.subjects = subjects
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

    getProjects(){
        var projects: ProjectModel[] = []
        for(const subject of this.subjects)
            for(const project of subject.projects)
                projects.push(project)
        
        return projects
    }

    getUnsubmittedProjects() {
        const unsubmittedProjects: ProjectModel[] = [];
    
        for (const subject of this.subjects)
            for (const project of subject.projects) {
                const userSubmission = project.submissions.find(submission => submission.submitee_id === this.id)
                if (!userSubmission)
                    unsubmittedProjects.push(project)
            }
    
        return unsubmittedProjects;
    }
    

    getSubmissions(){
        var submissions: SubmissionModel[] = []
        for(const subject of this.subjects)
            for(const project of subject.projects)
                for(const submission of project.submissions)
                    if(submission.submitee_id == this.id)
                        submissions.push(submission)
        
        return submissions
    }
}
