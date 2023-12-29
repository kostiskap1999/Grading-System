import { BadRequestError, InternalServerError, NotFoundError } from '../errors/errorTypes'
import { ProjectRepository } from '../persistence/repository/project'
import * as dbtoken from './token'
import { TransactionManager } from './transaction';

export class ProjectManager {

  repository: ProjectRepository

  constructor(tm: TransactionManager) {
    this.repository = new ProjectRepository(tm);
  }

  async getProjects(token: string) {
    await dbtoken.checkToken(token)
    
    const projects = await this.repository.findAll()
  
    if(!projects)
      throw new InternalServerError("There was something wrong while getting projects")
    
    return projects
  }

  async getProject(id: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!id)
      throw new BadRequestError("Incorrect project id")
    
    const project = await this.repository.findById(id)
  
    if(!project)
      throw new NotFoundError("Project not found")
    
    return project
  }

  async getUserProjects(userId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!userId)
      throw new BadRequestError("Incorrect user id")
    
    const projects = await this.repository.findByUser(userId)
  
    if(!projects)
      throw new NotFoundError("Projects not found")
    
    return projects
  }

  async getSubjectProjects(subjectId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!subjectId)
      throw new BadRequestError("Incorrect user id")
    
    const projects = await this.repository.findBySubject(subjectId)
  
    if(!projects)
      throw new NotFoundError("Projects not found")
    
    return projects
  }

  async postProject(project: any, token: string) {
    await dbtoken.checkToken(token)
    
    if (!project)
      throw new BadRequestError("Incorrect project")

    await this.repository.postProject(project)
    
    return true
  }
}
