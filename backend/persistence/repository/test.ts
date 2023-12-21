import { TransactionManager } from "../../manager/transaction";
import { Input, Output, Test } from "../entities/test";

export class TestRepository {

  async findByProjectId(projectId: number) {
    const tm = await TransactionManager.instance

    const tests = (await tm.query(`SELECT i.group_id, i.id AS input_id, i.code AS input_code, 
      i.is_main_param AS input_is_main_param, o.id AS output_id, o.code AS output_code,
      t.main_function AS main
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
            currentTest = new Test(tests[i], [], new Output({id: tests[i].output_id, code: tests[i].output_code, testId: tests[i].group_id}))
            allTests.push(currentTest)
            currentTestId = tests[i].group_id
        }

        currentTest?.inputs?.push(new Input({
            id: tests[i].input_id,
            code: tests[i].input_code,
            isMainParam: tests[i].input_is_main_param,
            testId: tests[i].group_id
        }))
    }

    return allTests
  }

  async postTests(tests: any, projectId: number) {
    const tm = await TransactionManager.instance

    const sqlValues = tests
    .map((test: any) => {
      const testValues = [projectId, test.main];
      const inputValues = test.inputs.map((input: any) => [input.code]);
      const outputValue = [test.output.code];
      return [testValues, inputValues, outputValue];
    })
    .flat();

    await tm.query(`INSERT INTO tests (project_id, main_function) VALUES ${tests.map(() => '(?, ?)').join(', ')}
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID();
    INSERT INTO inputs (code, group_id) VALUES ${tests.flatMap((test: any, index: number) => test.inputs.map(() => '(?, LAST_INSERT_ID() + ?)')).join(', ')};
    INSERT INTO outputs (code, group_id) VALUES ${tests.map(() => '(?, LAST_INSERT_ID())').join(', ')}`, sqlValues.flat())
  }
}
