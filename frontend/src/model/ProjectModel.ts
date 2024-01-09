import { fetchAndSetupSubmissions } from '../api/helpers/massSetups';
import { fetchProjectUserSubmission, fetchSubmissions } from "../api/submissionsApi";
import { fetchTests } from "../api/testsApi";
import { SubmissionModel } from "./SubmissionModel";
import { TestModel } from "./TestModel";

export interface IProject {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: SubmissionModel[];
    tests: TestModel[]
    averageGrade: number | null;
}

export class ProjectModel {
    id: number;
    name: string;
    description: string;
    deadline: Date | string;
    submissions: SubmissionModel[];
    tests: TestModel[]
    subjectId: number | null;
    averageGrade: number | null;

    constructor(project: IProject = {} as IProject) {
        this.id = project.id
        this.name = project.name
        this.description = project.description
        this.deadline = project.deadline
        this.submissions = project.submissions ?? []
        this.tests = project.tests ?? []
        this.averageGrade = project.averageGrade

        // only used in posting
        this.subjectId = null
    }

    async setup({userId, setupDepth = 2}: {userId?: number, setupDepth?: number} = {}){
        if(!userId){ //userId is given only when setting up student
            if(setupDepth === 3) // 2 = projects, 3 = only submissions, 4 = only tests, 5 submissions & tests
                this.submissions = await fetchAndSetupSubmissions(this.id) ?? this.submissions
            else if(setupDepth === 4)
                this.tests = await fetchTests(this.id) ?? this.tests
            else if(setupDepth === 5){
                this.submissions = await fetchAndSetupSubmissions(this.id) ?? this.submissions
                this.tests = await fetchTests(this.id) ?? this.tests
            }
            
            let gradeSum = 0
            let submissionsGraded = 0
            this.submissions.forEach(submission => {
                if(submission.grade){
                    gradeSum += submission.grade
                    submissionsGraded++
                }
            })
            this.averageGrade = gradeSum / submissionsGraded

        }else{
            const submission = await fetchProjectUserSubmission(this.id, userId) 
            if(submission){
                this.submissions = []
                this.submissions.push(submission)
            }   
        }
    }

    isWithinDeadline() {
        if (typeof this.deadline === 'string')
            return new Date() <= new Date(this.deadline)
        else
            return this.deadline >= new Date();
    }
    
}
