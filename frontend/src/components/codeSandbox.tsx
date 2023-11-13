import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';

export default function CodeSandbox({ paramCode }: { paramCode: string }) {
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    setCode(paramCode)
  }, [paramCode])

  const runCode = () => {
    try{
      Function(code)()
    }
    catch{
      alert("There was something wrong with the code. Execution aborted.")
    }
  }

  return (
    <div>
      <CodeMirror value={code} onChange={setCode} height="200px" extensions={[javascript({ jsx: true })]} />
      <button onClick={() => runCode()}>Run Code</button>
    </div>
  );
}
