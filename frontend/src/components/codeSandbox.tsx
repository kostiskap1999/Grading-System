import {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { ConnectedTvOutlined } from '@mui/icons-material';

export default function CodeSandbox({ code }: { code: string }) {
  const [codae, setCode] = useState<string>(`var j = 0
for (let i=0; i<5; i++)
  j +=i
console.log(j); //should be 10
`)

  return (
    <div>
      <CodeMirror value={code} onChange={setCode} height="200px" extensions={[javascript({ jsx: true })]} />
      <button onClick={() => Function(code)()}>Run Code</button>
    </div>
  );
}
