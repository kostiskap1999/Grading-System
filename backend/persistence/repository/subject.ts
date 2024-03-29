import { TransactionManager } from "../../manager/transaction";
import { Subject } from "../entities/subject";
import { User } from '../entities/user';

export class SubjectRepository {

  constructor(private tm: TransactionManager) {}

  async findAll() {
    return (await this.tm.query(`SELECT * FROM subjects`) as any[])
      .map(subject => new Subject(subject))
  }

  async findById(id: number) {
    return new Subject((await this.tm.query(`SELECT * FROM subjects WHERE id = ?`, id) as any[])[0])
  }

  async findBySupervisor(id: number) {
    return (await this.tm.query(`SELECT * FROM subjects WHERE supervisor_id = ?`, id) as any[])
        .map(subject => new Subject(subject))
  }

  async findByUser(userId: number) {
    const subjectIds = (await this.tm.query(`SELECT subject_id FROM user_subject WHERE user_id = ?`, userId) as any[])
      .map(subject => subject.subject_id)

    if(!subjectIds || subjectIds.length === 0)
      return null

    return (await this.tm.query(`SELECT * FROM subjects WHERE ${subjectIds.map(() => 'id = ?').join(' OR ')}`, ...subjectIds) as any[])
      .map(subject => new Subject(subject))
  }

  async findBySubject(subjectId: number) {
    const userIds = (await this.tm.query(`SELECT user_id FROM user_subject WHERE subject_id = ?`, subjectId) as any[])
      .map(user => user.user_id)

    if(!userIds || userIds.length === 0)
      return null

    return (await this.tm.query(`SELECT * FROM users WHERE ${userIds.map(() => 'id = ?').join(' OR ')}`, ...userIds) as any[])
      .map(user => new User(user))
  }

  async postSubject(subject: any) {
    await this.tm.query(`INSERT INTO subjects (name, description, semester, supervisor_id) VALUES (?, ?, ?, ?)`, subject.name, subject.description, subject.semester, subject.supervisorId)
  }

  async patchSubject(subject: any) {
    const setClauses = [
        subject.name !== undefined ? 'name = ?' : null,
        subject.description !== undefined ? 'description = ?' : null,
        subject.semester !== undefined ? 'semester = ?' : null,
        subject.supervisorId !== undefined ? 'supervisor_id = ?' : null
    ].filter(clause => clause !== null).join(', ')

    await this.tm.query(`
    UPDATE subjects 
    SET ${setClauses}
    WHERE id = ?
    `, subject.name, subject.description, subject.semester, subject.supervisorId, subject.id)
  }

  async deleteSubject(id: number) {
    await this.tm.query(`DELETE FROM subjects WHERE id = ?`, id)
  }

  async postUserSubject(userId: number, subjectId: number) {
    await this.tm.query(`INSERT INTO user_subject (user_id, subject_id) VALUES (?, ?)`, userId, subjectId)
  }

  async deleteUserSubject(userId: number, subjectId: number) {
    await this.tm.query(`DELETE FROM user_subject WHERE user_id = ? AND subject_id = ?`, userId, subjectId)
  }
}