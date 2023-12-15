import { TransactionManager } from "../../manager/transaction";
import { Credentials } from "../entities/credentials";
import { User } from "../entities/user";

export class UserRepository {
  constructor(public transactionManager = TransactionManager.createTransaction()) {}

  async findById(id: number) {
    return new User(await this.transactionManager.then(tm => tm.query("SELECT * FROM users WHERE id = ?", id)))
  }

  async findUserByCredentials(username: string, password: string) {
    const credentials = (await this.transactionManager.then(tm => tm.query("SELECT * FROM credentials WHERE username = ? AND password = ?", username, password) as Promise<any[]>))
      .map(creds => new Credentials(creds))[0]

    if (!credentials)
      return null
    
    return (await this.transactionManager.then(tm => tm.query("SELECT * FROM users WHERE credentials_id = ?", credentials.id) as Promise<any[]>))
      .map(user => new User(user))[0]
  }
}
