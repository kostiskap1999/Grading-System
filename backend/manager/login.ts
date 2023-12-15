import { InternalServerError, NotFoundError, UnauthorizedError } from '../errors/errorTypes'
import { UserRepository } from '../persistence/repository/user'
import * as dbtoken from './token'

export class UserManager {

  constructor(private repository = new UserRepository()) {}

  async login({username, password}: {username?: string, password?: string}) {
    if (!username || !password) 
      throw new UnauthorizedError("Incorrect username or password")
    
    const user = await this.repository.findUserByCredentials(username, password)
  
    if(!user)
      throw new UnauthorizedError("Incorrect username or password")
  
    const token = await dbtoken.createToken({userId: user.id, role: user.role})
    
    return {user, token}
  }
}
