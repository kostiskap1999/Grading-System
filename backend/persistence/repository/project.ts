import { TransactionManager } from "../../manager/transaction";
import { Project } from "../entities/project";
import { TestRepository } from './test'

export class ProjectRepository {

  constructor(private tm: TransactionManager) {}

  async findAll() {
    return (await this.tm.query(`SELECT * FROM projects`) as any[])
      .map(project => new Project(project))
  }

  async findById(id: number) {
    return new Project((await this.tm.query(`SELECT * FROM projects WHERE id = ?`, id) as any[])[0])
  }

  async findByUser(userId: number) {
    const subjectIDs = (await this.tm.query(`SELECT subject_id FROM user_subject WHERE user_id = ?`, userId) as any[])
      .map(subject => subject.subject_id)

    if(!subjectIDs)
      return null

    return (await this.tm.query(`SELECT * FROM projects WHERE ${subjectIDs.map(() => 'id = ?').join(' OR ')}`, subjectIDs) as any[])
      .map(project => new Project(project))[0]
  }

  async findBySubject(subjectId: number) {
    return (await this.tm.query(`SELECT * FROM projects WHERE subject_id = ?`, subjectId) as any[])
      .map(project => new Project(project))
  }

  async postProject(project: any) {
    await this.tm.query(`INSERT INTO projects (name, description, deadline, subject_id) VALUES (?, ?, ?, ?)`, project.name, project.description, project.deadline, project.subject_id)
    
    const insertedID = (await this.tm.query(`SELECT id FROM projects WHERE id >= LAST_INSERT_ID()`) as any[])[0]

    const testRepository = new TestRepository(this.tm)
    testRepository.postTests(project.tests, insertedID.id)
  }
}
