import { ITest, ITestDefaults, ITestInput, ITestInputDefaults, ITestOutput, ITestOutputDefaults } from "../interfaces/iTest";

export class Test {
    id: number;
    inputs: TestInput[];
    output: TestOutput;

    constructor({id, inputs, output}: ITest = ITestDefaults) {
        this.id = id
        this.inputs = []
        inputs.forEach(input => {
            this.inputs.push(new TestInput(input))
        });
        this.output = new TestOutput(output)
    }
}

export class TestInput {
    id: number;
    name: string;
    code: string;

    constructor({id, name, code}: ITestInput = ITestInputDefaults) {
        this.id = id
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