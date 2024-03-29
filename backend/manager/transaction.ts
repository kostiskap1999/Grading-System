import db from "../database/config"

export class TransactionManager {

  transactionOpen = true

  private constructor() {
  }

  static createTransaction(): Promise<TransactionManager> {
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) return reject(err)
        else resolve(new TransactionManager())
      })
    });
  }

  async query(query: string, ...values: any[]) {
    if (!this.transactionOpen) {
      throw new Error("Database queried without transaction in place. This is dangerous");
    }
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, result, fields) => {
        if (error) return reject(error)
        else resolve(result)
      })
    })
  }

  onError() {
    this.transactionOpen && db.rollback()
    this.transactionOpen = false
  }

  commit() {
    this.transactionOpen && db.commit()
    this.transactionOpen = false
  }

}