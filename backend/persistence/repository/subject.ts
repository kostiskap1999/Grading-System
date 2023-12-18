import { TransactionManager } from "../../manager/transaction";
import { Subject } from "../entities/subject";

export class SubjectRepository {
  constructor(public transactionManager = TransactionManager.createTransaction()) {}

  async findAll() {
    const tm = await this.transactionManager
    return (await tm.query(`SELECT * FROM subjects`) as any[])
      .map(subject => new Subject(subject))[0]
  }

  async findById(id: number) {
    const tm = await this.transactionManager
    return new Subject((await tm.query(`SELECT * FROM subjects WHERE id = ?`, id) as any[])[0])
  }

  async findByUser(userId: number) {
    const tm = await this.transactionManager
    const subjectIDs = (await tm.query(`SELECT subject_id FROM user_subject WHERE user_id = ?`, userId) as any[])
      .map(subject => subject.subject_id)

    if(!subjectIDs)
      return null

    return (await tm.query(`SELECT * FROM subjects WHERE ${subjectIDs.map(() => 'id = ?').join(' OR ')}`, ...subjectIDs) as any[])
      .map(subject => new Subject(subject))
  }
  
  async postUserSubject(userId: number, subjectId: number) {
    const tm = await this.transactionManager
    await tm.query(`INSERT INTO user_subject (user_id, subject_id) VALUES (?, ?)`, userId, subjectId)
  }

  async deleteUserSubject(userId: number, subjectId: number) {
    const tm = await this.transactionManager
    await tm.query(`DELETE FROM user_subject WHERE user_id = ? AND subject_id = ?`, userId, subjectId)
  }
}
