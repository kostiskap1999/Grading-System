import { ITest, ITestDefaults, ITestInput, ITestInputDefaults, ITestOutput, ITestOutputDefaults } from "../interfaces/iTest";

export class TestModel {
    id: number;
    main: string;
    inputs: TestInputModel[];
    output: TestOutputModel;

    constructor({id, main, inputs, output}: ITest = ITestDefaults) {
        this.id = id
        this.main = main
        this.inputs = []
        inputs.forEach(input => {
            this.inputs.push(new TestInputModel(input))
        });
        this.output = new TestOutputModel(output)
    }
}

export class TestInputModel {
    id: number;
    code: string;
    isMainParam: boolean;

    constructor({id, code, isMainParam}: ITestInput = ITestInputDefaults) {
        this.id = id
        this.code = code
        this.isMainParam = isMainParam
    }
}

export class TestOutputModel {
    id: number;
    code: string;

    constructor({id, code}: ITestOutput = ITestOutputDefaults) {
        this.id = id
        this.code = code
    }
}