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
      var codeBefore = ""
      var codeAfter = ""
      var finalCode = ""
      setLog("")
      project.tests.forEach((test, index) => {
        setLog(log + "Running test " + index + "\n")
        test.inputs.forEach(input => {
          codeBefore += "var " + input.name + " = " + input.code + ";\n"
          codeAfter += input.name
          if (index != test.inputs.length-1)
            codeAfter += ", "
        });
        finalCode += codeBefore + code + "\nreturn main(" + codeAfter +");"
        console.log(finalCode)
        var result = Function(finalCode)()
        if (result == test.output)
          setLog(log + "Test " + index + " completed successfully\n")
        else
          setLog(log + "Test " + index + " failed\n")
      });
    }
    catch{
      setLog("There was something wrong with the code parsing. Execution aborted.\n")
    }
  }

  return (
    <div>
      <CodeMirror value={code} onChange={setCode} height="200px" extensions={[javascript({ jsx: true })]} />
      <button className="button" onClick={() => runCode()}>Run Code</button>
      <div>{log}</div>
    </div>
  );
}
