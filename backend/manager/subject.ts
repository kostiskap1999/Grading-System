import { BadRequestError, InternalServerError, NotFoundError } from '../errors/errorTypes'
import { SubjectRepository } from '../persistence/repository/subject'
import * as dbtoken from './token'
import { TransactionManager } from './transaction';

export class SubjectManager {

  repository: SubjectRepository

  constructor(tm: TransactionManager) {
    this.repository = new SubjectRepository(tm);
  }

  async getSubjects(token: string) {
    await dbtoken.checkToken(token)
    
    const subjects = await this.repository.findAll()
  
    if(!subjects)
      throw new InternalServerError("There was something wrong while getting subjects")
    
    return subjects
  }

  async getSubject(id: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!id)
      throw new BadRequestError("Incorrect subject id")
    
    const subject = await this.repository.findById(id)
  
    if(!subject)
      throw new NotFoundError("Subject not found")
    
    return subject
  }

  async getUserSubjects(userId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!userId)
      throw new BadRequestError("Incorrect user id")
    
    const subjects = await this.repository.findByUser(userId)
  
    if(!subjects)
      throw new NotFoundError("Subjects not found")
    
    return subjects
  }

  async postUserSubject(body: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!body.userId || !body.subjectId)
      throw new BadRequestError("Incorrect user or subject id")
    
    await this.repository.postUserSubject(body.userId, body.subjectId)
  }

  async deleteUserSubject(body: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!body.userId || !body.subjectId)
      throw new BadRequestError("Incorrect user or subject id")
    
    await this.repository.deleteUserSubject(body.userId, body.subjectId)
  }
  
}
