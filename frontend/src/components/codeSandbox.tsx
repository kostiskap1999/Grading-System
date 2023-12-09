import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { Project } from '../model/project';
import { Submission } from '../model/submission';
import { patchSubmission } from '../fetches/fetchSubmissions';

export default function CodeSandbox({ project, submission }: { project: Project, submission: Submission }) {
  const [code, setCode] = useState<string>('')
  const [log, setLog] = useState<string>('No tests running<br>')
  const [grade, setGrade] = useState<number | null>(null)
  const [lastID, setLastID] = useState<number>(-1)
  
  useEffect(() => {
    setCode(submission.code)
  }, [submission.code])

  useEffect(() => {
    if(grade !== null)
      setLog((prevLog) => `${prevLog}Grade ${grade}<br>
      Grade was not uploaded<br>`)
      setGrade(null)
  }, [grade])


  const runCode = async (grading: boolean) => {
    try{
      setLog(``);
      submission.grade = null
      let passedTests = 0
      project.tests.forEach((test, index) => {
        setLog((prevLog) => `${prevLog}Running test ${index + 1}<br>`)
        let inputCode = test.inputs.map(input => typeof input.code === 'string' && !isNaN(Number(input.code)) ? input.code : `'${input.code}'`).join(', ');

        let finalCode = `${code}
        return ${test.main}(${inputCode});
        `
        let result = Function(finalCode)()
        result = result.toString()

        if (result == test.output.code){
          passedTests++
          setLog((prevLog) => `${prevLog}<span style="color: green;">Test ${index + 1} completed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and <span style="color: darkblue;">${test.output.code}</span> as output<br>`);
        }
        else{
          setLog((prevLog) => `${prevLog}<span style="color: darkred;">Test ${index + 1} failed.</span> Got <span style="color: darkblue;">(${inputCode})</span> as input(s) and expected <span style="color: darkblue;">${test.output.code}</span> as output. Got output <span style="color: darkblue;">${result}</span><br>`);
        }
      });
      let gradeVar = Math.round(passedTests/project.tests.length*10 * 2) / 2
      setGrade(gradeVar)
      
      if(grading){
        submission.grade = gradeVar
        await patchSubmission(submission)

      }
    }
    catch{
      setLog(`There was something wrong with the code parsing. Execution aborted.<br>`)
      setGrade(null)
    }
  }

  return (
    <div>
      <div style={{marginBottom: "50px"}}>
        <CodeMirror value={code} onChange={setCode} height="200px" style={{marginBottom: "10px"}} extensions={[javascript({ jsx: true })]} />
        <div className="row" style={{justifyContent: "space-between"}}>
          <button className="button" onClick={async () => await runCode(false)}>Run tests without grading</button>
          <button className="button" onClick={async () => await runCode(true)}>Run tests and grade</button>
        </div>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: log }} />
    </div>
  );
}
