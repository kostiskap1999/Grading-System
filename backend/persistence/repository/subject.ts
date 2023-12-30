import { TransactionManager } from "../../manager/transaction";
import { Subject } from "../entities/subject";

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
    const subjectIDs = (await this.tm.query(`SELECT subject_id FROM user_subject WHERE user_id = ?`, userId) as any[])
      .map(subject => subject.subject_id)

    if(!subjectIDs || subjectIDs.length === 0)
      return null

    return (await this.tm.query(`SELECT * FROM subjects WHERE ${subjectIDs.map(() => 'id = ?').join(' OR ')}`, ...subjectIDs) as any[])
      .map(subject => new Subject(subject))
  }
  
  async postUserSubject(userId: number, subjectId: number) {
    await this.tm.query(`INSERT INTO user_subject (user_id, subject_id) VALUES (?, ?)`, userId, subjectId)
  }

  async deleteUserSubject(userId: number, subjectId: number) {
    await this.tm.query(`DELETE FROM user_subject WHERE user_id = ? AND subject_id = ?`, userId, subjectId)
  }
}
