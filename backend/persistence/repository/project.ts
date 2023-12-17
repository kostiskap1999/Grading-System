import { TransactionManager } from "../../manager/transaction";
import { Credentials, User } from "../entities/user";

export class UserRepository {
  constructor(public transactionManager = TransactionManager.createTransaction()) {}

  async findById(id: number) {
    const tm = await this.transactionManager
    return new User(await tm.query("SELECT * FROM users WHERE id = ?", id))
  }

  async findUserByCredentials(username: string, password: string) {
    const tm = await this.transactionManager
    const credentials = (await tm.query("SELECT * FROM credentials WHERE username = ? AND password = ?", username, password) as any[])
      .map(creds => new Credentials(creds))[0]

    if (!credentials)
      return null
    
    return (await tm.query("SELECT * FROM users WHERE credentials_id = ?", credentials.id) as any[])
      .map(user => new User(user))[0]
  }
}
