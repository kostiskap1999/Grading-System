export class Test {
  id: number
  mainFunction: string
  projectId: number
  submissionId: number
  inputs?: Input[]
  output?: Output
  
  constructor(test: any, inputs: Input[], output: Output) {
    this.id = test.id
    this.mainFunction = test.main_function
    this.projectId = test.project_id
    this.submissionId = test.submission_id
    this.inputs = inputs
    this.output = output
  }
}

export class Input {
  id: number
  code: string
  isMainParam: number
  testId: number
  
  constructor(input: any) {
    this.id = input.id
    this.code = input.code
    this.isMainParam = input.is_main_param
    this.testId = input.group_id
  }
}

export class Output {
  id: number
  code: string
  testId: number
  
  constructor(output: any) {
    this.id = output.id
    this.code = output.code
    this.testId = output.group_id
  }
}