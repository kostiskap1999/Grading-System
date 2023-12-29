export interface ITest {
    id: number;
    mainFunction: string;
    inputs: ITestInput[];
    output: ITestOutput;
}

export class TestModel {
    id: number;
    mainFunction: string;
    inputs: TestInputModel[];
    output: TestOutputModel;

    constructor(test: ITest = {} as ITest) {
        this.id = test.id
        this.mainFunction = test.mainFunction
        this.inputs = []
        test.inputs && test.inputs.forEach(input => {
            this.inputs.push(new TestInputModel(input))
        });
        this.output = new TestOutputModel(test.output)
    }
}

export interface ITestInput {
    id: number;
    code: string;
    isMainParam: boolean;
}


export class TestInputModel {
    id: number;
    code: string;
    isMainParam: boolean;

    constructor(input: ITestInput = {} as ITestInput) {
        this.id = input.id
        this.code = input.code
        this.isMainParam = input.isMainParam
    }
}

export interface ITestOutput {
    id: number;
    code: string;
}

export class TestOutputModel {
    id: number;
    code: string;

    constructor(output: ITestOutput = {} as ITestOutput) {
        this.id = output.id
        this.code = output.code
    }
}