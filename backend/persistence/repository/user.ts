import { TransactionManager } from "../../manager/transaction";
import { Credentials, User } from "../entities/user";
import * as bcrypt from 'bcrypt'

export class UserRepository {

  constructor(private tm: TransactionManager) {}

  async findById(id: number) {
    return new User((await this.tm.query(`SELECT * FROM users WHERE id = ?`, id) as any[])[0])
  }

  async findUserByCredentials(username: string, password: string) {
    const credentials = (await this.tm.query(`SELECT * FROM credentials WHERE username = ?`, username) as any[])
      .map(creds => new Credentials(creds))[0]

    if (!credentials)
      return null

    if(!(await bcrypt.compare(password, credentials.password)))
        return null

    return (await this.tm.query(`SELECT * FROM users WHERE credentials_id = ?`, credentials.id) as any[])
      .map(user => new User(user))[0]
  }

  async register(user: any, password: string) {
    await this.tm.query(`INSERT INTO credentials (username, password) VALUES (?, ?)`, user.username, password)

    const insertedId = (await this.tm.query(`SELECT id FROM credentials WHERE id >= LAST_INSERT_Id()`) as any[])[0].id
    
    await this.tm.query(`INSERT INTO users (username, first_name, last_name, role, credentials_id) VALUES (?, ?, ?, ?, ?)`, user.username, user.firstName, user.lastName, 2, insertedId)
    return (await this.tm.query(`SELECT * FROM users WHERE id >= LAST_INSERT_Id()`) as any[])[0]
  }
}
