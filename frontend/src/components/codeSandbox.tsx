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

        var inputCode = test.inputs.map(input => typeof input.code === 'string' ? `'${input.code}'` : input.code).join(', ');
        
        var finalCode = `${code}
        return ${test.main}(${inputCode});
        `
        console.log(finalCode)
        var result = Function(finalCode)()
        result = result.toString()
        console.log(result)
        if (result == test.output.code){
          logVar += `<span style="color: green;">Test ${index+1} completed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and <span style="color: darkblue;">${test.output.code}</span> as output<br>`
          setLog(logVar)
        }
        else{
          logVar += `<span style="color: darkred;">Test ${index+1} failed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and expected <span style="color: darkblue;">${test.output.code}</span> as output. Got output <span style="color: darkblue;">${result}</span><br>`
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
