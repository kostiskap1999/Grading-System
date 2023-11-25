import { TestInput, TestOutput } from "../model/test";

export interface ITest {
    id: number;
    inputs: TestInput[];
    outputs: TestOutput[];
}

export interface ITestInput {
    id: number;
    orderNum: number;
    name: string;
    code: string;
}

export interface ITestOutput {
    id: number;
    code: string;
}

export const ITestDefaults = {
    id: -1,
    inputs: [],
    outputs: []
}

export const ITestInputDefaults = {
    id: -1,
    orderNum: -1,
    name: "",
    code: ""

}

export const ITestOutputsDefaults = {
    id: -1,
    code: ""
}