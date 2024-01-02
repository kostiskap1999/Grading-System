import { TransactionManager } from "../../manager/transaction";
import { Submission } from "../entities/submission";

export class SubmissionRepository {
  
  constructor(private tm: TransactionManager) {}

  private formatDate(date: Date) {
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    let res: string = year + '-' + month + '-' + day
    return res
  }

  async findByProjectId(projectId: number) {
    return (await this.tm.query(`SELECT * FROM submissions WHERE project_id = ?`, projectId) as any[])
      .map(submission => new Submission(submission))
  }

  async findByProjectIdAndSubmiteeId(projectId: number, submiteeId: number) {
    return (await this.tm.query(`SELECT * FROM submissions WHERE project_id = ? AND submitee_id = ?`, projectId, submiteeId) as any[])
      .map(submission => new Submission(submission))
  }

  async postSubmission(submission: any) {
    await this.tm.query(`INSERT INTO submissions (name, code, date, submitee_id, project_id) VALUES (?, ?, ?, ?, ?)`, submission.name, submission.code, this.formatDate(new Date()), submission.submiteeId, submission.projectId)
  }

  async patchSubmission(submission: any) {
    await this.tm.query(`UPDATE submissions 
    SET 
      name = COALESCE(NULLIF(?, 'undefined'), name),
      code = COALESCE(NULLIF(?, 'undefined'), code),
      date = COALESCE(NULLIF(?, 'undefined'), date),
      grade = COALESCE(NULLIF(?, 'undefined'), grade),
      comment = COALESCE(NULLIF(?, 'undefined'), comment)
    WHERE id = ?`, submission.name, submission.code, this.formatDate(new Date(submission.date)), submission.grade, submission.comment, submission.id)
  }
}
