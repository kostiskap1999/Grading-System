export class Submission {
  id: number
  name: string
  code: string
  date: Date
  grade: number
  comment: string
  submiteeId: number
  projectId: number
  
  constructor(submission: any) {
    this.id = submission.id
    this.name = submission.name
    this.code = submission.code
    this.date = submission.date
    this.grade = submission.grade
    this.submiteeId = submission.submitee_id
    this.projectId = submission.project_id
  }
}