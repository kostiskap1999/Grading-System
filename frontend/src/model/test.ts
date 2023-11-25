import { ITest, ITestDefaults, ITestInput, ITestInputDefaults, ITestOutput, ITestOutputDefaults } from "../interfaces/iTest";

export class Test {
    id: number;
    inputs: TestInput[];
    output: TestOutput;

    constructor({id, inputs, output}: ITest = ITestDefaults) {
        this.id = id
        this.inputs = inputs
        this.output = output
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

    constructor({id, code}: ITestOutput = ITestOutputDefaults) {
        this.id = id
        this.code = code
    }
}