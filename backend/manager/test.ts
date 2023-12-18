import { InternalServerError } from '../errors/errorTypes'
import { TestRepository } from '../persistence/repository/test'
import * as dbtoken from './token'

export class TestManager {

  constructor(private repository = new TestRepository()) {}

  async getTests(projectId: number, token: string) {
    await dbtoken.checkToken(token)
    
    const tests = await this.repository.findByProjectId(projectId)
  
    if(!tests)
      throw new InternalServerError("There was something wrong while getting the tests")
    
    return tests
  }
}
