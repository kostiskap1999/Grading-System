import { BadRequestError, InternalServerError, NotFoundError } from '../errors/errorTypes'
import { SubmissionRepository } from '../persistence/repository/submission'
import * as dbtoken from './token'
import { TransactionManager } from './transaction';

export class SubmissionManager {

  repository: SubmissionRepository

  constructor(tm: TransactionManager) {
    this.repository = new SubmissionRepository(tm);
  }

  async getSubmissions(projectId: number, token: string) {
    await dbtoken.checkToken(token)
    
    const submissions = await this.repository.findByProjectId(projectId)
  
    if(!submissions)
      throw new InternalServerError("There was something wrong while getting submissions")
    
    return submissions
  }

  async getSubmissionBySubmitee(projectId: number, submiteeId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!projectId || !submiteeId)
      throw new BadRequestError("Incorrect project id or submitee id")
    
    const submission = await this.repository.findByProjectIdAndSubmiteeId(projectId, submiteeId)
  
    if(!submission)
      throw new NotFoundError("Submission not found")
    
    return submission
  }

  async postSubmission(submission: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!submission)
      throw new BadRequestError("Incorrect submission")
    
    await this.repository.postSubmission(submission)
    
    return true
  }

  async putSubmission(submission: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!submission)
      throw new BadRequestError("Incorrect submission")
    
    await this.repository.patchSubmission(submission)
    
    return true
  }
}
