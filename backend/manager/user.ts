import { BadRequestError, NotFoundError } from '../errors/errorTypes'
import { UserRepository } from '../persistence/repository/user'
import * as dbtoken from './token'
import { TransactionManager } from './transaction'
import * as bcrypt from 'bcrypt'
import { config } from 'dotenv'
config()

export class UserManager {

  repository: UserRepository

  constructor(tm: TransactionManager) {
    this.repository = new UserRepository(tm);
  }

  async login({username, password}: {username?: string, password?: string}) {
    if (!username || !password) 
      throw new BadRequestError("Incorrect username or password")
    
    const user = await this.repository.findUserByCredentials(username, password)
  
    if(!user)
      throw new NotFoundError("User not found")
  
      
    const token = await dbtoken.createToken({userId: user.id, role: user.role})

    return {user, token}
  }

  async register(user: any) {
    if (!user || !user.username || !user.password || !user.firstName || !user.lastName)
      throw new BadRequestError("Incorrect register credentials")
    
    const saltRounds = parseInt(process.env.SALT_ROUNDS!)
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    const newUser = await this.repository.register(user, hashedPassword)
    
    if(!newUser)
        throw new NotFoundError("Something went wrong with registering user")
    
    const token = await dbtoken.createToken({userId: newUser.id, role: newUser.role})
    
    return {user, token}
  }

  async getUser(id: number, token: string) {
    await dbtoken.checkToken(token)
    
    if (!id)
      throw new BadRequestError("Incorrect user id")
    
    const user = await this.repository.findById(id)
  
    if(!user)
      throw new NotFoundError("User not found")
    
    return user
  }
}
