import { TransactionManager } from "../../manager/transaction";
import { Subject } from "../entities/subject";

export class SubjectRepository {
  constructor(public transactionManager = TransactionManager.createTransaction()) {}

  async findAll() {
    const tm = await this.transactionManager
    return new Subject(await tm.query("SELECT * FROM subjects"))
  }

  async findById(id: number) {
    const tm = await this.transactionManager
    return new Subject((await tm.query("SELECT * FROM subjects WHERE id = ?", id) as any[])[0])
  }

  async findByUser(userId: number) {
    const tm = await this.transactionManager
    const subjectIDs = (await tm.query("SELECT subject_id FROM user_subject WHERE user_id = ?", userId) as any[])
      .map(subject => subject.subject_id)

    if(!subjectIDs)
      return null

    
  }
  
}
