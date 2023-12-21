import { InternalServerError } from '../errors/errorTypes'
import { TestRepository } from '../persistence/repository/test'
import * as dbtoken from './token'
import { TransactionManager } from './transaction';

export class TestManager {

  repository: TestRepository
  
  constructor(tm: TransactionManager) {
    this.repository = new TestRepository(tm);
  }

  async getTests(projectId: number, token: string) {
    await dbtoken.checkToken(token)
    
    if(!projectId)
      return null

    const tests = await this.repository.findByProjectId(projectId)
  
    if(!tests)
      throw new InternalServerError("There was something wrong while getting the tests")
    
    return tests
  }
}
