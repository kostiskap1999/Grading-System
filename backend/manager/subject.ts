import { BadRequestError, InternalServerError, NotFoundError } from '../errors/errorTypes'
import { Subject } from '../persistence/entities/subject';
import { SubjectRepository } from '../persistence/repository/subject'
import { UserRepository } from '../persistence/repository/user';
import * as dbtoken from './token'
import { TransactionManager } from './transaction';

export class SubjectManager {

  repository: SubjectRepository

  constructor(tm: TransactionManager, private userRepository = new UserRepository(tm)) {
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

  async postSubject(subject: any, token: string) {
    await dbtoken.checkToken(token)

    if (!subject)
      throw new BadRequestError("Incorrect user or subject id")
    
    await this.repository.postSubject(subject)
    return true
  }

  async putSubject(subject: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!subject)
      throw new BadRequestError("Incorrect subject id")
    
    await this.repository.patchSubject(subject)
    return true
  }

  async deleteSubject(id: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!id)
      throw new BadRequestError("Incorrect subject id")
    
    await this.repository.deleteSubject(id)
    return true
  }


  /* *** USER-SUBJECTS JOINT TABLE *** */

  async getUserSubjects(userId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!userId)
      throw new BadRequestError("Incorrect user id")
    
    const userRole = (await this.userRepository.findById(userId)).role

    let subjects: Subject[] = []
    const joinedSubjects = await this.repository.findByUser(userId)
    subjects.push(...(joinedSubjects && Array.isArray(joinedSubjects) ? joinedSubjects : []))
    if(userRole <= 1){
        const supSubjects = await this.repository.findBySupervisor(userId)        
        subjects.push(...(supSubjects && Array.isArray(supSubjects) ? supSubjects : []))
    }
  
    if(!subjects)
      throw new NotFoundError("Subjects not found")
    
    return subjects
  }

  async postUserSubject(body: any, token: string) {
    await dbtoken.checkToken(token)

    if (!body.userId || !body.subjectId)
      throw new BadRequestError("Incorrect user or subject id")
    
    await this.repository.postUserSubject(body.userId, body.subjectId)
    return true
  }

  async deleteUserSubject(userId: number, subjectId: number, token: string) {
    await dbtoken.checkToken(token)

    if (!userId || !subjectId)
      throw new BadRequestError("Incorrect user or subject id")
    
    await this.repository.deleteUserSubject(userId, subjectId)
    return true
  }

  async getSubjectUsers(subjectId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!subjectId)
      throw new BadRequestError("Incorrect subject id")
    
    const users = await this.repository.findBySubject(subjectId)
  
    if(!users)
      throw new NotFoundError("Users not found")
    
    return users
  }
}