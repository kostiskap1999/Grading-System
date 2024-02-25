export interface ITest {
    id: number;
    mainFunction: string;
    inputs: ITestInput[];
    output: ITestOutput;
}

export class TestModel implements ITest {
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
    
    isValidJSONorArray?: boolean; // used only in new projects
}


export class TestInputModel implements ITestInput {
    id: number;
    code: string;
    isMainParam: boolean;
    isValidJSONorArray?: boolean; // used only in new projects

    constructor(input: ITestInput = {} as ITestInput) {
        this.id = input.id
        this.code = input.code
        this.isMainParam = input.isMainParam
    }
}

export interface ITestOutput {
    id: number;
    code: string;

    isValidJSONorArray?: boolean; // used only in new projects
}

export class TestOutputModel implements ITestOutput {
    id: number;
    code: string;
    isValidJSONorArray?: boolean; // used only in new projects

    constructor(output: ITestOutput = {} as ITestOutput) {
        this.id = output.id
        this.code = output.code
    }
}