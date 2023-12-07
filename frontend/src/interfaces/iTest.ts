export interface ITestOutput {
    id: number;
    code: string;
}

export interface ITestInput {
    id: number;
    code: string;
    isMainParam: boolean;
}

export interface ITest {
    id: number;
    main: string;
    inputs: ITestInput[];
    output: ITestOutput;
}

export const ITestOutputDefaults = {
    id: -1,
    code: "",
};

export const ITestInputDefaults = {
    id: -1,
    code: "",
    isMainParam: true
};

export const ITestDefaults = {
    id: -1,
    main: "",
    inputs: [],
    output: ITestOutputDefaults as ITestOutput,
};
