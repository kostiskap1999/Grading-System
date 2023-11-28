import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { Project } from '../model/project';

export default function CodeSandbox({ project, paramCode }: { project: Project, paramCode: string }) {
  const [code, setCode] = useState<string>('')
  const [log, setLog] = useState<string>('No tests running. Click "Run Code" to see the result of every test.')

  useEffect(() => {
    setCode(paramCode)
  }, [paramCode])

  const runCode = () => {
    try{
      var logVar = ""
      setLog(logVar)
      project.tests.forEach((test, index) => {
        logVar += `Running test ${index+1}<br>`
        setLog(logVar)

        var codeBefore = ""
        var codeAfter = ""
        var finalCode = ""
        test.inputs.forEach((input, idx) => {
          codeBefore += "var " + input.name + " = " + input.code + ";\n"
          codeAfter += input.name
          console.log(test.inputs.length)
          if (idx != test.inputs.length-1)
            codeAfter += ", "
        });
        finalCode += codeBefore + code + "\nreturn main(" + codeAfter +");"
        var result = Function(finalCode)()
        result = result.toString()
        if (result == test.output.code){
          logVar += `Test ${index+1} completed successfully<br>`
          setLog(logVar)
        }
        else{
          logVar += `Test ${index+1} failed<br>`
          setLog(logVar)
        }
      });
    }
    catch{
      setLog("There was something wrong with the code parsing. Execution aborted.<br>")
    }
  }

  return (
    <div>
      <CodeMirror value={code} onChange={setCode} height="200px" extensions={[javascript({ jsx: true })]} />
      <button className="button" onClick={() => runCode()}>Run Code</button>
      <div dangerouslySetInnerHTML={{ __html: log }} />
    </div>
  );
}
