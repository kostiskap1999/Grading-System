export interface ITestOutput {
    id: number;
    code: string;
}

export interface ITestInput {
    id: number;
    name: string;
    code: string;
}

export interface ITest {
    id: number;
    inputs: ITestInput[];
    output: ITestOutput;
}

export const ITestOutputDefaults = {
    id: -1,
    code: "",
};

export const ITestInputDefaults = {
    id: -1,
    name: "",
    code: "",
};

export const ITestDefaults = {
    id: -1,
    inputs: [],
    output: ITestOutputDefaults as ITestOutput,
};
