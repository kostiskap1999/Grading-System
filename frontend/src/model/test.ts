import { fetchUser } from "../fetches/fetchUsers";
import { ISubmission, ISubmissionDefaults } from "../interfaces/iSubmission";
import { ITest, ITestDefaults, ITestInput, ITestInputDefaults, ITestOutput, ITestOutputsDefaults } from "../interfaces/iTest";
import { User } from "./user";

export class Test {
    id: number;
    inputs: TestInput[];
    outputs: TestOutput[];

    constructor({id, inputs, outputs}: ITest = ITestDefaults) {
        this.id = id
        this.inputs = inputs
        this.outputs = outputs
    }
    
    addNewTestInput() {
        this.inputs.push(new TestInput())
    }
}

export class TestInput {
    id: number;
    orderNum: number;
    name: string;
    code: string;

    constructor({id, orderNum, name, code}: ITestInput = ITestInputDefaults) {
        this.id = id
        this.orderNum = orderNum
        this.name = name
        this.code = code
    }
}

export class TestOutput {
    id: number;
    code: string;

    constructor({id, code}: ITestOutput = ITestOutputsDefaults) {
        this.id = id
        this.code = code
    }
}