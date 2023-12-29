import { TransactionManager } from "../../manager/transaction";
import { Input, Output, Test } from "../entities/test";

export class TestRepository {

  constructor(private tm: TransactionManager) {}

  async findByProjectId(projectId: number) {

    const tests = (await this.tm.query(`SELECT i.group_id, i.id AS input_id, i.code AS input_code, 
      o.id AS output_id, o.code AS output_code,
      t.id AS id, t.main_function AS main_function, t.project_id AS project_id, t.submission_id AS submission_id
      FROM inputs i
      LEFT JOIN outputs o ON i.group_id = o.group_id
      LEFT JOIN tests t ON i.group_id = t.id
      WHERE i.group_id IN (SELECT id FROM tests WHERE project_id = ?)
      ORDER BY i.group_id;`, projectId) as any[])

    tests.sort((a, b) => a.group_id - b.group_id)

    let currentTestId: number | null = null
    let currentTest: Test = new Test({}, [], new Output({}))
    let allTests: Test[] = []

    for (let i=0; i<tests.length; i++) {
        if (tests[i].group_id !== currentTestId) {
            currentTest = new Test(tests[i], [], new Output({id: tests[i].output_id, code: tests[i].output_code, group_id: tests[i].group_id}))
            allTests.push(currentTest)
            currentTestId = tests[i].group_id
        }

        currentTest?.inputs?.push(new Input({
            id: tests[i].input_id,
            code: tests[i].input_code,
            group_id: tests[i].group_id
        }))
    }

    return allTests
  }

  async postTests(tests: any, projectId: number) {
    for (const test of tests) {
        const testValues = [projectId, test.mainFunction]
        const testResult: any = await this.tm.query('INSERT INTO tests (project_id, main_function) VALUES (?, ?) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID();', ...testValues)
        
        const lastInsertedId = testResult.insertId;

        const inputValues = test.inputs.flatMap((input: any) => [input.code, lastInsertedId])
        await this.tm.query('INSERT INTO inputs (code, group_id) VALUES ' + test.inputs.map(() => '(?, ?)').join(', '), ...inputValues);

        const outputValues = [test.output.code, lastInsertedId]
        await this.tm.query('INSERT INTO outputs (code, group_id) VALUES (?, ?);', ...outputValues);
    }
  }
}
