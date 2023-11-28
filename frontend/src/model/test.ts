import { ITest, ITestDefaults, ITestInput, ITestInputDefaults, ITestOutput, ITestOutputDefaults } from "../interfaces/iTest";

export class Test {
    id: number;
    main: string;
    inputs: TestInput[];
    output: TestOutput;

    constructor({id, main, inputs, output}: ITest = ITestDefaults) {
        this.id = id
        this.main = main
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
    isMainParam: boolean;

    constructor({id, name, code, isMainParam}: ITestInput = ITestInputDefaults) {
        this.id = id
        this.name = name
        this.code = code
        this.isMainParam = isMainParam
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